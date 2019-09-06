pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    triggers {
        cron('@midnight')
    }
    options { 
        timestamps () 
        timeout(time: 20, unit: 'MINUTES') 
        disableConcurrentBuilds()
    }
   
    stages {
        stage('Skip Build?') {
            steps {
                script {
                    def result = sh (script: "git log -1 | grep 'chore(release): publish'", returnStatus: true)
                    if (result == 0) {
                        echo ("This build will be skipped because it is a trigger from chore. Aborting.")
                        env.shouldBuild = false
                    } else {
                        env.shouldBuild = true
                    }
                }
            }    
        }

        stage('Release') {
            when {
                expression { env.shouldBuild }
            }

            steps {
                build job: "ui-kit/react/master", parameters: [
                    booleanParam(name: 'skipLint', value: false),
                    booleanParam(name: 'skipBuild', value: false),
                    booleanParam(name: 'skipJavascriptTest', value: false),
                    booleanParam(name: 'skipAutomationTest', value: true),
                    booleanParam(name: 'skipPublish', value: false)
                ]
            }
        }
    }
}
