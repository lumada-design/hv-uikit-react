pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-12.14-auto"}
    triggers {
        cron('@midnight')
    }
    options {
        timestamps ()
        timeout(time: 360, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Automation Regression Tests') {
            steps {
                build job: "ui-kit/react/alpha", parameters: [
                    booleanParam(name: 'skipAutomationTest', value: false)
                ]
            }
        }
    }
}
