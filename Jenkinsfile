pipeline {
    
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    options { 
        timestamps () 
        timeout(time: 20, unit: 'MINUTES') 
    }
    triggers {
        pollSCM 'H/10 * * * *'
    }
    
    parameters {
        booleanParam(name: 'skipBuild', defaultValue: false, description: 'when true, skip build.')
        booleanParam(name: 'skipTest', defaultValue: false, description: 'when true, skip tests.')
        booleanParam(name: 'skipDeploy', defaultValue: false, description: 'when true, skip deploy to nexus.')
        choice(choices: ['prerelease', 'preminor', 'minor', 'major'], description: 'What type of deploy.', name: 'deploy')
        choice(choices: ['#ui-kit-eng', '#ui-kit'], description: 'What channel to send notification.', name: 'channel')
    }
   
    stages {
        stage('Build') {
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
            when {
                expression { !params.skipDeploy }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    sshagent (credentials: ['github-buildguy']) {
                        sh 'git checkout master'
                        sh 'cp .npmrc ~/.npmrc'
                        sh 'git status'
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
            cleanWs()
        }
    }
}
