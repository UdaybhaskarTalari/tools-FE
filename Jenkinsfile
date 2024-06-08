pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                nodejs('Hackathon') {           
                        sh 'npm install'
                        sh 'npm run build'
                    }
            }
        }
        stage('deployment'){
            steps{
                sh 'tar -czvf dist.tar.gz dist'
                sh 'scp dist.tar.gz jenkins@13.232.55.192:/var/www/html/qa-automation-fe/'
                sh 'ssh jenkins@13.232.55.192 "cd /var/www/html/qa-automation-fe/ && sudo chown jenkins:jenkins *"'
                sh 'ssh jenkins@13.232.55.192 "cd /var/www/html/qa-automation-fe/ && tar -xvzf dist.tar.gz"'        
            } 
        }
    }
    post{
        always {
            cleanWs()
        }
     }
 
}
