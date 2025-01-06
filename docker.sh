#!/bin/bash
# 本地构建docker镜像并推送到仓库
APP_NAME=triones-admin-frontend
IMAGE_NAME=registry.cn-shanghai.aliyuncs.com/epiboly/demo
TAG=${APP_NAME}-$(git rev-parse HEAD)

pnpm pnpm install
pnpm pnpm run build

docker build -f Dockerfile --force-rm=true --rm -t ${IMAGE_NAME}:"${TAG}" .

docker push ${IMAGE_NAME}:"${TAG}"