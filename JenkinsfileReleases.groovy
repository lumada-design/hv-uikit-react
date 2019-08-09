pipeline {
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    trigger {
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
                build job: 'react', parameters: [
                    bool(name: 'skipLint', value: false),
                    bool(name: 'skipBuild', value: false),
                    bool(name: 'skipJavascriptTest', value: false),
                    bool(name: 'skipAutomationTest', value: true),
                    bool(name: 'skipPublish', value: false)
                ]
            }
        }
    }
}
