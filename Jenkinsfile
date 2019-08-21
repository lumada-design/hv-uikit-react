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
                    agent {
                      label 'robotframework-unix'
                    }
                    when {
                        expression { !params.skipAutomationTest }
                    }
                    steps {
                        script {
                            withNPM(npmrcConfig: 'hv-ui-nprc') {
                                def dockerRegistry = 'https://nexus.pentaho.org:8002'
                                def dockerRegistryCredentialsId = 'buildguynexus'
                                def dockerImageTag = "${env.GIT_BRANCH}.${env.BUILD_NUMBER}"
                                docker.withRegistry(dockerRegistry, dockerRegistryCredentialsId) {
                                    def automationImage = docker.build("hv/uikit-react-automation-storybook:${dockerImageTag}", "-f ./automation/storybook/Dockerfile .")
                                    automationImage.push("${dockerImageTag}")
                                }
                            }
                            sh 'docker system prune -f' // docker remove all unused objects
                            def port = "9002"
                            def URL = 'http://' + sh(script: 'hostname -I', returnStdout: true).split(' ')[0] + ":" + port
                            sh "docker run -d -p ${port}:9002 --name ${dockerImageTag} nexus.pentaho.org/hv/uikit-react-automation-storybook:${dockerImageTag}"
                            waitUntilServerUp(URL)
                            build job: 'storybook-core-tests', parameters: [
                              string(name: 'STORYBOOK_URL', value: URL),
                              string(name: 'BRANCH', value: env.GIT_BRANCH)
                            ]
                            
                        }
                    }
                    post {
                      always {
                        script {
                          def container = sh(script: "docker ps -f name=${dockerImageTag} -q", returnStdout: true)
                          sh "docker kill ${container}"
                        }
                      }
                    }
                }
            }
        }
        stage('Publish Packages') {
            when {
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
                            sh "npm run publish"
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
                if ( currentBuild.currentResult == "SUCCESS" ) {
                    slackSend channel: "${params.channel}", color: "good", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was successful"
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

void waitUntilServerUp(String url) {
  script {
    sleep(time: 15, unit: "SECONDS") // time to start docker machine
    timeout(2) {
      waitUntil {
        script {
          def r = sh(script: "wget -q ${url} -O /dev/null", returnStatus: true)
          return (r == 0);
        }
      }
    }
  }
}