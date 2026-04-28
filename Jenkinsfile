pipeline {
    
    agent   any
    
    environment {
        IMAGE_NAME =  "chaitanyaaaa/notes-api"
        TAG        =  "1.${BUILD_NUMBER}"
    }
    stages  {
        stage('INSTALL') {
            steps { 
                dir('src') {
                    sh 'npm install'
                }
            }
        }
        stage('TEST') {
            steps {
                dir('src') {
                    sh 'npm test'
                }
            }
        }
        stage("BUILD") {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${TAG} . "
            }
        }
        stage ("PUSH") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerHub-Creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push ${IMAGE_NAME}:${TAG}'
                }
            }
        }
        stage ("Deploy") {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """ 
                        sed -i 's|${IMAGE_NAME}:latest|${IMAGE_NAME}:${TAG}|g' k8s/notes-api-app.yml
                        kubectl apply -f k8s/
                        """
                }
            }
        }
    }   
}   
