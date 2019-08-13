pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    options { 
        timestamps () 
        timeout(time: 20, unit: 'MINUTES') 
        disableConcurrentBuilds()
    }

    parameters {
        booleanParam(name: 'skipLint', defaultValue: false, description: 'when true, skip lint.')
        booleanParam(name: 'skipBuild', defaultValue: false, description: 'when true, skip build.')
        booleanParam(name: 'skipJavascriptTest', defaultValue: false, description: 'when true, skip javascript tests.')
        booleanParam(name: 'skipAutomationTest', defaultValue: true, description: 'when true, skip automation tests.')
        booleanParam(name: 'skipPublish', defaultValue: true, description: 'when true, skip publish to nexus and documentation.')
        choice(name: 'publishType', choices: ['', 'prerelease', 'prepatch', 'patch', 'preminor', 'minor', 'premajor', 'major'], description: 'when true, skip publish to nexus and documentation.')
        choice(choices: ['#ui-kit-eng-ci', '#ui-kit'], description: 'What channel to send notification.', name: 'channel')
    }
   
    stages {
        stage('Build') {
            when {
                expression { !params.skipBuild }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    sh 'npm ci --silent'
                    sh 'npm run bootstrap'
                }
            }
        }
        stage('Lint') {
            when {
                expression { !params.skipLint }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    script {
                        def RESULT_LINT = sh returnStatus: true, script: 'npm run lint'
                        if ( RESULT_LINT != 0 ) {
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                }
            }
        }
        stage('Tests') {
            parallel {
                stage('Tests Javascript') {
                    when {
                        expression { !params.skipJavascriptTest }
                    }
                    steps {
                        withNPM(npmrcConfig: 'hv-ui-nprc') {
                            script {
                                def RESULT_TESTS = sh returnStatus: true, script: 'npm run test'
                                if ( RESULT_TESTS != 0 ) {
                                    currentBuild.result = 'UNSTABLE'
                                }
                            }
                            junit '**/junit.xml'
                        }
                    }
                }

                stage('Tests Automation') {
                    when {
                        triggeredBy 'UpstreamCause'
                        expression { !params.skipAutomationTest }
                    }
                    steps {
                        script {
                            withNPM(npmrcConfig: 'hv-ui-nprc') {
                                def dockerRegistry = 'https://nexus.pentaho.org:8002'
                                def dockerRegistryCredentialsId = 'buildguynexus'
                                def dockerImageTag = "${GIT_BRANCH}.${BUILD_NUMBER}"
                                docker.withRegistry(dockerRegistry, dockerRegistryCredentialsId) {
                                    def automationImage = docker.build("hv/uikit-react-automation-storybook:${dockerImageTag}", "-f ./automation/storybook/Dockerfile .")
                                    automationImage.push("${dockerImageTag}")
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Publish Packages') {
            when {
                triggeredBy 'UpstreamCause'
                branch 'master'
                expression {  !params.skipPublish && !env.CHANGE_ID }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    withCredentials([string(credentialsId: 'github-api-token', variable: 'GH_TOKEN')]) {
                        sshagent (credentials: ['github-buildguy']) {
                            sh "git checkout ${env.BRANCH_NAME}"
                            sh 'cp .npmrc ~/.npmrc'
                            sh 'git status'
                            sh "npm run publish-${params.publishType}"
                            sh "npm run publish-documentation"
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                def githubReleasesURL = "https://github.com/pentaho/hv-uikit-react/releases"
                if ( currentBuild.currentResult == "SUCCESS" ) {
                    slackSend channel: "#ui-kit-eng-ci", color: "good", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was successful"
                    if ( env.BRANCH_NAME == "master" ) {
                        def commitMessage = sh(returnStdout: true, script: 'git show -s --format=%B HEAD').trim()
                        def commitTimestamp = sh(returnStdout: true, script: 'git show -s --format=%ct HEAD').trim()

                        if ( commitMessage.startsWith("chore") ) {
                            def dateNow = (currentBuild.startTimeInMillis / 1000) as long
                            def dateCommit = commitTimestamp as long
                            def difference = dateNow - dateCommit
                            if( ((difference % 3600) % 60) < 30 ) {
                                def slackMessage = "*ui-kit new artifacts are available and documentation is updated*\n${commitMessage.replace('chore(release): publish', '')}\nFor more details about the changes please check the CHANGELOG in ${githubReleasesURL}\n"
                                slackSend channel: "#ui-kit", color: "good", message: slackMessage
                            }
                        }
                    }
                }
                else if( currentBuild.currentResult == "UNSTABLE" ) { 
                    slackSend channel: "${params.channel}", color: "warning", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was unstable"
                }
                else { 
                    slackSend channel: "${params.channel}", color: "danger", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} failed!"
                }
            }
        }
    }
}
