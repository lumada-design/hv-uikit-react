properties([
    parameters([
        booleanParam(name: 'skipLint', defaultValue: false, description: 'when true, skip lint.'),
        booleanParam(name: 'skipJavascriptTest', defaultValue: false, description: 'when true, skip javascript tests.'),
        booleanParam(name: 'skipAutomationTest', defaultValue: true, description: 'when true, skip automation tests.'),
        booleanParam(name: 'skipPublish', defaultValue: true, description: 'when true, skip publish to nexus.'),
        booleanParam(name: 'skipPublishDoc', defaultValue: true, description: 'when true, skip publish documentation.'),
        choice(name: 'publishType', choices: ['', 'prerelease', 'prepatch', 'patch', 'preminor', 'minor', 'premajor', 'major'], description: 'when true, skip publish to nexus and documentation.'),
        choice(choices: ['#ui-kit-eng-ci', '#ui-kit-internal'], description: 'In what channel publish the build result.', name: 'ci_channel'),
        choice(choices: ['#ui-kit', '#ui-kit-eng-ci', '#ui-kit-internal'], description: 'In what channel announce a release.', name: 'release_channel')
    ])
])

node('non-master') {
    def releases_branch = 'master'

    def commitMessage = null
    def commitTimestamp = null

    try {
        // Because each command (sh) is being run with docker exec we need to cd
        // on each command, otherwise the default $PWD is the jenkins workspace
        def uikit_folder = '/home/node/hv-uikit-react'

        def image

        def is_master = env.BRANCH_NAME == releases_branch && !env.CHANGE_ID
        // failing tests in master are a critical FAILURE
        def failing_tests_result = is_master ? "FAILURE" : "UNSTABLE"

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
                    def automation_storybook_port = '9002'

                    image.withRun("${containerRunOptions('uikit_automation_storybook')} -p ${automation_storybook_port}:${automation_storybook_port}", 'npm run automation') { container ->
                        tryStep ({
                            // TODO: Scripts not permitted to use method [...]Container port. Administrators can decide whether to approve or reject this signature.
                            // Without this we can only run one container at a time
                            // def URL = "http://${hostname}:${container.port(automation_storybook_port)}"
                            def URL = "http://${hostname}:${automation_storybook_port}"

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

        if(is_master) {
            tryStep ({
                // publish to npm repo
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
                            stage('Publish Packages') {
                                if(!params.skipPublish) {
                                    withNPM(npmrcConfig: 'hv-ui-nprc') {
                                        sh label: 'npm run publish-x', script: """
                                            #! /bin/sh -

                                            # copy the npm configuration
                                            cp .npmrc ${uikit_folder}/../.npmrc
                                            cp .npmrc ${uikit_folder}/.npmrc

                                            # copy the git repository
                                            cp -R ./.git ${uikit_folder}/.git

                                            cd ${uikit_folder}

                                            # restore the files we didn't include in the docker image
                                            git checkout ${env.BRANCH_NAME}
                                            git reset --hard

                                            npm run publish-${params.publishType} -- --no-git-reset
                                        """

                                        commitMessage = sh(returnStdout: true, script: """
                                            #! /bin/sh -
                                            cd ${uikit_folder}
                                            git show -s --format=%B HEAD
                                        """).trim()

                                        commitTimestamp = sh(returnStdout: true, script: """
                                            #! /bin/sh -
                                            cd ${uikit_folder}
                                            git show -s --format=%ct HEAD
                                        """).trim()
                                    }
                                } else {
                                    echo '[INFO] Packages publishing skipped'
                                }
                            }

                            stage('Publish Documentation') {
                                if(!params.skipPublishDoc) {
                                    sh label: 'npm run publish-documentation', script: """
                                        #! /bin/sh -

                                        cd ${uikit_folder}
                                        npm run build -- --scope @hv/uikit-react-doc
                                        npm run publish-documentation --  --ci
                                    """
                                } else {
                                    echo '[INFO] Documentation (storybook) publishing skipped'
                                }
                            }
                        }
                    }
                }
            })
        } else {
            stage('Publish Packages') {
                if(!params.skipPublish) {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Not publishing non-release packages'
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Packages publishing skipped'
                }
            }

            stage('Publish Documentation') {
                if(!params.skipPublishDoc) {
                    // TODO: publish storybook for PR review

                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Not publishing non-release documentation'
                } else {
                    // Unable to skip stages in scripted pipelines (https://issues.jenkins-ci.org/browse/JENKINS-54322)
                    echo '[INFO] Documentation (storybook) publishing skipped'
                }
            }
        }
    } finally {
        def githubReleasesURL = "https://github.com/pentaho/hv-uikit-react/releases"

        def ci_slack_channel = "${params.ci_channel}"
        def releases_slack_channel = "${params.release_channel}"

        def currentResult = currentBuild.currentResult

        if (currentResult == 'UNSTABLE') {
            slackSend channel: ci_slack_channel, color: "warning", message: "${env.JOB_NAME} - build ${env.BUILD_NUMBER} is unstable"
        } else if (currentResult == 'FAILURE') {
            slackSend channel: ci_slack_channel, color: "danger", message: "${env.JOB_NAME} - build ${env.BUILD_NUMBER} failed!"
        } else if (currentResult == 'SUCCESS') {
            slackSend channel: ci_slack_channel, color: "good", message: "${env.JOB_NAME} - build ${env.BUILD_NUMBER} was successful"

            if ( env.BRANCH_NAME == releases_branch ) {
                if ( commitMessage != null && commitMessage.startsWith("chore") ) {
                    def dateNow = (currentBuild.startTimeInMillis / 1000) as long
                    def dateCommit = commitTimestamp as long
                    def difference = dateNow - dateCommit

                    if( ((difference % 3600) % 60) < 30 ) {
                        def slackMessage = "*ui-kit new artifacts are available and documentation is updated*\n${commitMessage.replace('chore(release): publish', '')}\nFor more details about the changes please check the CHANGELOG in ${githubReleasesURL}\n"
                        slackSend channel: releases_slack_channel, color: "good", message: slackMessage
                    }
                }
            }
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
