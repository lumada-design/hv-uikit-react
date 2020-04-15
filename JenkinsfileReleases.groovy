boolean shouldBuild = true

pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-12.14-auto"}
    triggers {
        cron('0 18 * * *')
    }
    options { 
        timestamps () 
        timeout(time: 360, unit: 'MINUTES') 
        disableConcurrentBuilds()
    }
   
    stages {
        stage('Skip Build?') {
            steps {
                script {
                    def result = sh (script: "git log -1 | grep 'chore(release): publish'", returnStatus: true)
                    if (result == 0) {
                        echo ("This build will be skipped because it is a trigger from chore. Aborting.")
                        shouldBuild = false
                    } 
                }
            }    
        }

        stage('Release') {
            when {
                expression { shouldBuild }
            }

            steps {
                build job: "ui-kit/react/v1.x", parameters: [
                    booleanParam(name: 'skipLint', value: false),
                    booleanParam(name: 'skipJavascriptTest', value: false),
                    booleanParam(name: 'skipAutomationTest', value: false),
                    booleanParam(name: 'skipPublish', value: false),
                    booleanParam(name: 'skipPublishDoc', value: false)
                ]
            }
        }
    }
}
