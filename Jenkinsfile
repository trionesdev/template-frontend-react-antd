pipeline{
   agent {
       node { label env.NODE }
   }
    environment {
        IMAGE_NAME="registry-vpc.cn-shanghai.aliyuncs.com/epiboly/epiboly-base"
        APP_NAME="triones-frontend"
        HELM_NAME="${APP_NAME}"
        DING_DING_TOKEN="11c11816930d227dea96f6c159065e586c995c0c25412512e919206e870be527"
    }
    stages {
        stage('Clone') {
            steps{
                checkout scm
               sh '''
               curl -X POST \
                'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
                -H 'Content-Type: application/json' \
                -d '

                {
                   "msgtype": "markdown",
                   "markdown": {
                       "title":"Jenkins工程构建开始",
                       "text": "##### 构建开始 \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
                   }
                }

                '
               '''
            }
        }
        stage('Build Code') {
            when {
                allOf{
                    expression { env.BUILD=='true'  }
                    expression { env.ENV != 'prod'  }
                }
            }
            steps{
                sh "yarn"
                sh "yarn run build"
            }
        }
        stage('Build Image') {
            when {
                allOf{
                    expression { env.BUILD=='true'  }
                    expression { env.ENV != 'prod'  }
                }
            }
            steps{
                script {
                    if( env.TAG == '' || env.TAG == null ){
                        env.TAG = GIT_COMMIT
                    }
                }
//                 sh "docker login --username=${DOCKER_REPOSITORY_USERNAME} --password=${DOCKER_REPOSITORY_PASSWORD} ${DOCKER_REPOSITORY_URL}"
                sh "docker build -f Dockerfile --force-rm=true --rm -t ${IMAGE_NAME}:${env.TAG} ."
                sh "docker push ${IMAGE_NAME}:${env.TAG}"
                sh "docker images | grep none |awk '{print \$3}' |xargs -i docker rmi {}"
            }
        }
       stage('Install Helm App') {
           when {
                expression { env.INSTALL=='true' }
           }
           steps{
               sh "helm upgrade --install --namespace ${env.ENV} --create-namespace --set image.tag=${env.TAG} ${HELM_NAME} kubernetes/chart -f kubernetes/env/${ENV}.yaml"
           }
           post {
             failure {
                  sh '''
                  curl -X POST \
                   'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
                   -H 'Content-Type: application/json' \
                   -d '

                   {
                      "msgtype": "markdown",
                      "markdown": {
                          "title":"Jenkins工程构建失败",
                          "text": "##### 构建<font color=Red>失败</font> \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
                      }
                   }

                   '
                  '''
             }
             success {
                  sh '''
                  curl -X POST \
                   'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
                   -H 'Content-Type: application/json' \
                   -d '

                   {
                      "msgtype": "markdown",
                      "markdown": {
                          "title":"Jenkins工程构建成功",
                          "text": "##### 构建<font color=Green>成功</font> \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
                      }
                   }

                   '
                  '''
             }
           }

       }
       stage('Uninstall Helm App') {
           when {
             expression { env.INSTALL=='false' }
           }
           steps{
                sh "helm uninstall ${HELM_NAME} --namespace ${env.ENV}"
           }
       }
    }

}
