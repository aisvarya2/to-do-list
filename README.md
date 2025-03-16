# to-do-list

* This repo contains a simple node.js based to-do app.
* A dockerfile to build the image.
* Kubernetes deployment and service files
* Webhooks are configured to trigger a CI build on Jenkins when code changes are pushed to Jenkins
* The CI pipeline builds the docker image and pushed to ECR repo
* Once the CI job is done CD job is triggered as part of post action to deploy the application on EKS cluster