pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    options {
        timestamps ()
        timeout(time: 140, unit: 'MINUTES')
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
                    agent {
                      label 'robotframework-unix'
                    }
                    when {
                        beforeAgent true
                        anyOf {
                            changeRequest target: 'master'
                            branch 'master'    
                            branch 'alpha' && !params.skipAutomationTest
                        }
                    }
                    steps {
                        script {
                            withNPM(npmrcConfig: 'hv-ui-nprc') {
                                sh 'npm ci --silent'
                                sh 'npm run bootstrap'
                                sh 'npm run automation &'
                            }
                            def port = "9002"
                            def URL = 'http://' + sh(script: 'hostname -I', returnStdout: true).split(' ')[0] + ":" + port
                            waitUntilServerUp(URL)
                            def (REFSPEC, BRANCH_STRING) = getRefspec(env.CHANGE_ID, env.BRANCH_NAME)
                            echo "[INFO] REFSPEC: " + REFSPEC

                            def jobResultAccessibility =
                                            build job: 'ui-kit/automation/storybook-core-accessibility', parameters: [
                                                string(name: 'STORYBOOK_URL', value: URL),
                                                string(name: 'REFSPEC', value: REFSPEC),
                                                string(name: 'BRANCH_STRING', value: BRANCH_STRING)
                                            ], propagate: true, wait: true

                            echo "[INFO] BUILD JOB storybook-core-accessibility RESULT: " + jobResultAccessibility.getCurrentResult()

                            def jobResult =
                                            build job: 'ui-kit/automation/storybook-core-tests', parameters: [
                                                string(name: 'STORYBOOK_URL', value: URL),
                                                string(name: 'REFSPEC', value: REFSPEC),
                                                string(name: 'BRANCH_STRING', value: BRANCH_STRING)
                                            ], propagate: true, wait: true

                            echo "[INFO] BUILD JOB RESULT: " + jobResult.getCurrentResult()                             
                            
                        }
                    }
                    post {
                        failure {
                            echo ("This build is unstable. Please check the automation tests.")
                            script {
                                currentBuild.result = "UNSTABLE"
                            }
                        }

                      always {
                        script {
                            sh 'pkill -f node'
                        }
                      }
                    }
                }
            }
        }
        stage('Publish') {
            when {
                branch 'master'
                expression {  !params.skipPublish && !env.CHANGE_ID }
            }
            parallel {
                stage('Publish Documentation') {
                    steps {
                        withNPM(npmrcConfig: 'hv-ui-nprc') {
                            withCredentials([string(credentialsId: 'github-api-token', variable: 'GH_TOKEN')]) {
                                sshagent (credentials: ['github-buildguy']) {
                                    sh "npm run publish-documentation"
                                }
                            }
                        }
                    }
                }
                
                stage('Publish Packages') {
                    when {
                        triggeredBy 'UpstreamCause'
                    }
                    steps {
                        withNPM(npmrcConfig: 'hv-ui-nprc') {
                            withCredentials([string(credentialsId: 'github-api-token', variable: 'GH_TOKEN')]) {
                                sshagent (credentials: ['github-buildguy']) {
                                    sh "git checkout ${env.BRANCH_NAME}"
                                    sh 'cp .npmrc ~/.npmrc'
                                    sh 'git status'
                                    sh "npm run publish-${params.publishType}"
                                }
                            }
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

// ================== FUNCTIONS =================================================

void waitUntilServerUp(String url) {
  script {
    sleep(time: 45, unit: "SECONDS") // time to start docker machine
    timeout(time: 5, unit: 'MINUTES') {
      waitUntil {
        script {
          def r = sh(script: "wget -q ${url} -O /dev/null", returnStatus: true)
          return (r == 0)
        }
      }
    }
  }
}

def getRefspec(String changeId, String branch) {
  def refspec = ''
  def branchString = ''
  if (changeId) {
    refspec = "+refs/pull/" + changeId + "/head:refs/remotes/origin/PR-" + changeId
    branchString = branch
  } else {
    refspec = "+refs/heads/" + branch + ":refs/remotes/origin/" + branch
    branchString = "*/" + branch
  }
  return [refspec, branchString]
}
