pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 14.x', type: 'NodeJSInstallation'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Clean and install dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run the tests
                    sh 'npx codeceptjs run'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    // Generate the Allure report
                    sh 'npx allure serve ./output/allure-results --clean'
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'output/allure-results']]
                ])
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
