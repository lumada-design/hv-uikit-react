pipeline {
    
    agent none
    tools {nodejs "node-js-11.9-auto"}
    options { 
        timestamps () 
        timeout(time: 20, unit: 'MINUTES') 
    }
    triggers {
        pollSCM 'H/10 * * * *'
    }
    
    parameters {
        booleanParam(name: 'skipClean', defaultValue: false, description: 'when true, skip clean of workspace.')
        booleanParam(name: 'skipCheckout', defaultValue: false, description: 'when true, skip checkouts.')
        booleanParam(name: 'skipBuild', defaultValue: false, description: 'when true, skip build.')
        booleanParam(name: 'skipTest', defaultValue: false, description: 'when true, skip tests.')
        booleanParam(name: 'skipDeploy', defaultValue: false, description: 'when true, skip deploy to nexus.')
        choice(choices: ['prerelease', 'minor', 'major'], description: 'What type of deploy.', name: 'deploy')
        choice(choices: ['#ui-kit-eng', '#ui-kit'], description: 'What channel to send notification.', name: 'channel')
    }
   
    stages {
        stage('Clean') {
            agent { label 'non-master' } 
            when {
                expression { !params.skipClean }
            }
            steps {
                dir( WORKSPACE ){
                    deleteDir()
                }
            }
        }
        stage('Checkout') {
            agent { label 'non-master' } 
            when {
                expression { !params.skipCheckout }
            }
            steps {
                sh 'git init'
                sh 'git config http.sslVerify "false"'
                git url: 'git@10.76.48.133:hv-design-system/hv-ui.git', credentialsId: 'buildteam-gitlab'
            }
        }
        stage('Build') {
            agent { label 'non-master' } 
            when {
                expression { !params.skipBuild }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    sh 'npm install'
                    sh 'npm run bootstrap'
                }
            }
        }
        stage('Test') {
            agent { label 'non-master' } 
            when {
                expression { !params.skipTest }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    script {
                        def RESULT = sh returnStatus: true, script: 'npm run test'
                        if ( RESULT != 0 ) {
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                    junit '**/junit.xml'
                }
            }
        }
        stage('Deploy') {
            agent { label 'non-master' } 
            when {
                expression { !params.skipDeploy }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    sshagent (credentials: ['buildteam-gitlab']) {
                        sh 'git update-index --assume-unchanged .npmrc'
                        sh 'cp .npmrc ~/.npmrc'
                        sh "npm run publish:${deploy}"
                    }
                }
            }  
        }
    }
    
    post {
        always {
            script {
                if ( currentBuild.currentResult == "SUCCESS" ) {
                    slackSend channel: "${channel}", color: "good", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was successful"
                }
                else if( currentBuild.currentResult == "UNSTABLE" ) { 
                    slackSend channel: "${channel}", color: "warning", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was unstable"
                }
                else { 
                    slackSend channel: "${channel}", color: "danger", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} failed!"
                }
            }
        }
    }
}