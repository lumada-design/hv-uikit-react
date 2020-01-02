pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-12.14-auto"}
    triggers {
        cron('@midnight')
    }
    options {
        timestamps ()
        timeout(time: 145, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Automation Regression Tests') {
            steps {
                build job: "ui-kit/react/alpha", parameters: [
                    booleanParam(name: 'skipLint', value: false),
                    booleanParam(name: 'skipBuild', value: false),
                    booleanParam(name: 'skipJavascriptTest', value: true),
                    booleanParam(name: 'skipAutomationTest', value: false),
                    booleanParam(name: 'skipPublishDoc', value: true),
                    booleanParam(name: 'skipPublish', value: true)
                ]
            }
        }
    }
}
