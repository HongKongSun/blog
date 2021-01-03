#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn docs:build



# cd 到构建输出的目录下
cd example/public  


git init
# 部署到自己的域名下面
echo 'sunxianggang.com' > CNAME

git add -A
git commit -m 'deploy'
# 部署到 github 上
git push -f git@github.com:HongKongSun/hongkongsun.github.io.git master # 发布到github

# coding
# echo 'sunxianggang.com' > CNAME
git add -A
git commit -m 'deploy'
# git push -f git@git.dev.tencent.com:xugaoyi/xugaoyi.git master # 发布到coding

# git push -f git@e.coding.net:cugb1/cugb1.blog.blog.git master
git push -f git@e.coding.net:cugb1/hongkong.coding.me.git master
# https://e.coding.net/cugb1/blog/blog.git

cd - # 退回开始所在目录


