properties([
    parameters([
        booleanParam(name: 'skipLint', defaultValue: false, description: 'when true, skip lint.'),
        booleanParam(name: 'skipJavascriptTest', defaultValue: false, description: 'when true, skip javascript tests.'),
        booleanParam(name: 'skipAutomationTest', defaultValue: false, description: 'when true, skip automation tests.'),
        choice(name: 'skipPublishDoc', choices: ['auto', 'true', 'false'], description: 'when true, skip publish documentation.'),
        choice(choices: ['#ui-kit-eng-ci', '#ui-kit-internal'], description: 'In what channel publish the build result.', name: 'ci_channel'),
        choice(choices: ['#ui-kit', '#ui-kit-eng-ci', '#ui-kit-internal'], description: 'In what channel announce a release.', name: 'release_channel')
    ])
])

node('non-master') {
    def githubURL = "https://github.com/pentaho/hv-uikit-react"

    def commitMessage = null
    def commitTimestamp = null

    try {
        // Because each command (sh) is being run with docker exec we need to cd
        // on each command, otherwise the default $PWD is the jenkins workspace
        def uikit_folder = '/home/node/hv-uikit-react'

        if(env.CHANGE_FORK == null) {
            // Success will mark the build as ok. The real status should be NOT_BUILT, but its status isn't captured by the plugin correctly
            currentBuild.result = 'SUCCESS'
            return
        }

        def image

        // failing tests in master are a critical FAILURE
        def failing_tests_result = "UNSTABLE"

        stage('Checkout') {
            tryStep ({
                checkout scm
            })
        }

        stage('Build image') {
            tryStep ({
                docker.withRegistry('nexus.pentaho.org:8000') {
                    image = docker.build("hv-uikit-react:${env.BUILD_TAG}", '-f build/Dockerfile .')
                }
            })
        }

        def test_stages = [:]

        test_stages["license-check"] = {
            stage('License check') {
                if(!params.skipLint) {
                    tryStep ({
                        image.inside(containerRunOptions('uikit_license_check')) {
                            sh label: 'npm run license-check', script: """
                                #! /bin/sh -
                                cd ${uikit_folder}
                                npm run license-check
                            """
                        }
                    }, failing_tests_result)
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] License check skipped'
                }
            }
        }

        test_stages["lint"] = {
            stage('Lint') {
                if(!params.skipLint) {
                    tryStep ({
                        image.inside(containerRunOptions('uikit_lint')) {
                            sh label: 'npm run lint', script: """
                                #! /bin/sh -
                                cd ${uikit_folder}
                                npm run lint
                            """
                        }
                    }, failing_tests_result)
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Lint skipped'
                }
            }
        }

        test_stages["jest"] = {
            stage('Tests (jest)') {
                if(!params.skipJavascriptTest) {
                    tryStep ({
                        image.inside(containerRunOptions('uikit_jest')) {
                            sh label: 'npm run test', script: """
                                #! /bin/sh -
                                cd ${uikit_folder}
                                npm run test
                            """

                            sh label: 'cp **/junit.xml', script: """
                                #! /bin/sh -
                                cp ${uikit_folder}/packages/core/junit.xml ./packages/core/junit.xml
                                cp ${uikit_folder}/packages/lab/junit.xml ./packages/lab/junit.xml
                            """
                        }
                    }, failing_tests_result)

                    junit '**/junit.xml'
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] JavaScript (jest) tests skipped'
                }
            }
        }

        test_stages["robot"] = {
            stage('Tests (robot)') {
                if(!params.skipAutomationTest) {
                    def hostname = sh(script: 'hostname -I', returnStdout: true).split(' ')[0]
                    def port = '9001'

                    image.withRun("${containerRunOptions('uikit_automation_storybook')} -p ${port}:${port}", "npm run doc -- -p ${port}") { container ->
                        tryStep ({
                            // TODO: Scripts not permitted to use method [...]Container port. Administrators can decide whether to approve or reject this signature.
                            // Without this we can only run one container at a time
                            // def URL = "http://${hostname}:${container.port(port)}"
                            def URL = "http://${hostname}:${port}"

                            waitUntilServerUp(URL)

                            def REFSPEC = getRefspec(env.CHANGE_ID, env.BRANCH_NAME)
                            echo "[INFO] REFSPEC: " + REFSPEC

                            def jobResultAccessibility =
                                build job: 'ui-kit/automation/storybook-core-accessibility', parameters: [
                                    string(name: 'STORYBOOK_URL', value: URL),
                                    string(name: 'REFSPEC', value: REFSPEC),
                                    string(name: 'BRANCH_STRING', value: env.BRANCH_NAME)
                                ], propagate: true, wait: true

                            echo "[INFO] BUILD JOB storybook-core-accessibility RESULT: " + jobResultAccessibility.getCurrentResult()

                            def jobResult =
                                build job: 'ui-kit/automation/storybook-core-tests', parameters: [
                                    string(name: 'STORYBOOK_URL', value: URL),
                                    string(name: 'REFSPEC', value: REFSPEC),
                                    string(name: 'BRANCH_STRING', value: env.BRANCH_NAME)
                                ], propagate: true, wait: true

                            echo "[INFO] BUILD JOB RESULT: " + jobResult.getCurrentResult()
                        }, failing_tests_result)
                    }
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Cross-browser (robot) tests skipped'
                }
            }
        }

        test_stages.failFast = true

        parallel test_stages

        stage('Publish Documentation') {
            // skipPublishDoc set to auto assumes we should publish
            // a different logic can be added later, i.e. to avoid publishing
            // on every PR commit
            if(params.skipPublishDoc != 'true') {
                def folder = env.BRANCH_NAME;
                def message = "docs: storybook for branch ${env.BRANCH_NAME}";
                if(env.CHANGE_ID) {
                    folder = "pr-${env.CHANGE_ID}"
                    message = "docs: storybook for PR #${env.CHANGE_ID}";
                }

                image.inside(containerRunOptions('uikit_publish_packages')) {
                    withCredentials([
                        string(credentialsId: 'github-api-token', variable: 'GH_TOKEN'),
                        sshUserPrivateKey(credentialsId: 'ssh-buildguy-github', usernameVariable: 'GIT_USERNAME', keyFileVariable: 'GIT_KEY')
                    ]) {
                        withEnv([
                            "GIT_AUTHOR_NAME=$GIT_USERNAME",
                            "GIT_COMMITTER_NAME=$GIT_USERNAME",
                            "GIT_AUTHOR_EMAIL=$GIT_USERNAME@hitachivantara.com",
                            "GIT_COMMITTER_EMAIL=$GIT_USERNAME@hitachivantara.com",
                            "GIT_SSH_COMMAND=ssh -i $GIT_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=no"
                        ]) {
                            sh label: 'npm run publish-documentation', script: """
                                #! /bin/sh -
                                # copy the git repository
                                cp -R ./.git ${uikit_folder}/.git
                                cd ${uikit_folder}
                                npm run build-documentation
                                NODE_DEBUG=gh-pages npm run publish-documentation -- --folder ${folder} --message '${message}'
                            """
                        }
                    }
                }
            } else {
                // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                echo '[INFO] Documentation (storybook) publishing skipped'
            }
        }
        
    } finally {
        def githubReleasesURL = "${githubURL}/releases"

        def githubBranchURL = "${githubURL}/tree/${env.BRANCH_NAME}"
        if(env.CHANGE_ID) {
            githubBranchURL = "${githubURL}/pull/${env.CHANGE_ID}"
        }

        def ci_slack_channel = "${params.ci_channel}"
        def releases_slack_channel = "${params.release_channel}"

        def currentResult = currentBuild.currentResult

        if (currentResult == 'UNSTABLE') {
            slackSend channel: ci_slack_channel, color: "warning", message: "<${githubBranchURL}|${env.JOB_NAME}> - build <${env.BUILD_URL}|${env.BUILD_NUMBER}> is unstable!"
        } else if (currentResult == 'FAILURE') {
            slackSend channel: ci_slack_channel, color: "danger", message: "<${githubBranchURL}|${env.JOB_NAME}> - build <${env.BUILD_URL}|${env.BUILD_NUMBER}> failed!"
        } else if (currentResult == 'SUCCESS') {
            slackSend channel: ci_slack_channel, color: "good", message: "<${githubBranchURL}|${env.JOB_NAME}> - build <${env.BUILD_URL}|${env.BUILD_NUMBER}> was successful"
        }
    }
}

// ================== FUNCTIONS =================================================

def containerRunOptions(String name) {
    def user = 'node'

    return "-u=${user} --name=${name}_${env.BUILD_TAG}"
}

void waitUntilServerUp(String url) {
    echo "[INFO] Waiting for ${url}"

    timeout(time: 5, unit: 'MINUTES') {
        waitUntil {
            def r = sh(script: "wget -q ${url} -O /dev/null", returnStatus: true)
            return (r == 0)
        }
    }
}

def getRefspec(String changeId, String branch) {
    def refspec = ''
    if (changeId) {
        refspec = "+refs/pull/" + changeId + "/head:refs/remotes/origin/PR-" + changeId
    } else {
        refspec = "+refs/heads/" + branch + ":refs/remotes/origin/" + branch
    }

    return refspec
}

def tryStep(Closure block, String resultIfFail = null) {
    try {
        block()
    } catch (Throwable t) {
        currentBuild.result = resultIfFail != null ? resultIfFail : 'FAILURE'

        if(currentBuild.result == 'FAILURE') {
            throw t
        }
    }
}
