# 本地代码上传到github
###  1.  **git init** （如果代码之前有关联git则本地新建文件夹然后把代码复制进去，再git init）

###  2.  **$ ssh-keygen -t rsa -C "youremail@example.com"**（一路回车）
            如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心的告诉任何人。
            
###  3.  **登陆GitHub，打开“Account settings”，“SSH Keys”页面：然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容**
    当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。(mac电脑 输入open ~/.ssh)
    
### 4. **新建远程仓库 不要创建readme.md 不选它git后续有提示，根据提示执行 $ git remote add origin git@github.com:michaelliao/learngit.git**（这里填你自己的地址）

### 5. **$git add.  $git commit -m 'first commit' $ git push -u origin master**(由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令成：**$ git push origin master**)

### 6. **关联远程仓库 git remote add origin https://github.com/bigrain220/video-project.git

### 7. ** 创建并切换分支 git checkout -b william  合并分支 git merge william  切换分支 git checkout master

