pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    options {
        timestamps ()
        timeout(time: 75, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Automation Regression Tests') {
            steps {
                build job: "ui-kit/react/automationFix", parameters: [
                    booleanParam(name: 'skipLint', value: false),
                    booleanParam(name: 'skipBuild', value: false),
                    booleanParam(name: 'skipJavascriptTest', value: true),
                    booleanParam(name: 'skipAutomationTest', value: false),
                    booleanParam(name: 'skipPublish', value: true)
                ]
            }
        }
    }
}
