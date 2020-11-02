#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn docs:build

# cd 到构建输出的目录下
cd example/public  

git init

# 部署到自定义域域名 echo 'yanhaixiang.com' > CNAME


git add -A
git commit -m 'deploy'

# 部署到 Github
git push -f git@github.com:HongKongSun/hongkongsun.github.io.git master

# 部署到自定义域域名 echo 'yanhaixiang.cn' > CNAME


git add -A
git commit -m 'deploy'

cd - # 退回开始所在目录
rm -rf example/public  


