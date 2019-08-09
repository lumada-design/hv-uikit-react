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
        stage('Release') {
            steps {
                build job: "ui-kit/react/master", parameters: [
                    booleanParam(name: 'skipLint', value: false),
                    booleanParam(name: 'skipBuild', value: false),
                    booleanParam(name: 'skipJavascriptTest', value: false),
                    booleanParam(name: 'skipAutomationTest', value: true),
                    booleanParam(name: 'skipPublish', value: false)
                    choice(name: 'publishType', value: 'minor')
                ]
            }
        }
    }
}
