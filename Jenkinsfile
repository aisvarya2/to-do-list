pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'         // Replace with your AWS region, e.g., 'us-east-1'
        ECR_REGISTRY = "920373020319.dkr.ecr.${AWS_REGION}.amazonaws.com"
        ECR_REPOSITORY = 'devops-repo' // Replace with your ECR repository name
        IMAGE_TAG = 'latest'
    }

    triggers {
        // Automatically triggers the pipeline when a GitHub webhook is triggered
        githubPush()
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git branch: 'main', url: 'https://github.com/aisvarya2/to-do-list.git' // Update URL and branch
            }
        }


        stage('Build Docker Image') {
            steps {
                script {
                    // Use AWS credentials stored in Jenkins
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                      credentialsId: 'ecr-push']]) { 

                        // Log in to AWS ECR,
                        sh '''
                        #!/usr/bin/env
                        ## aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY


                        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
                        docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:$TIME_STAMP

                        # aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com

                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                        
                        TIME_STAMP=$(date '+%Y-%m-%d-%H-%M-%S')
                        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$TIME_STAMP
                        '''
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution complete.'
        }
    }
}
