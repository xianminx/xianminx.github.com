---
layout: "post"
title: 'Git 多账号'
published: "true"
tags: [git]
date: "2015-03-03"
---

### git 账号

git 用户经常混淆用户和ssh key 等概念。git码农们经常泡在github，bitbucket 等网站，一方面需要给公司写代码，另外一方面不干寂寞的写开源代码，需要两个Email账户。一个是个人的(personal use)，用户在github等网站使用， 比如 gitfan@gmail.com, 另一个是工作用公司邮箱， 比如叫 xiaoming@corp.com
在commit 时候如何区分开来呢？

- 对于个人项目， 可以在项目下，使用 `git config user.email gitfan@gmail.com` 添加email

- 对于公司项目， 可以使用 `git config user.email xiaoming@corp.com`

但是如果每一个项目都这样配置， 又太麻烦了。 如果公司项目比较多， 可以将xiaoming@corp.com 加到git global 配置中

```bash
git config —global user.email xiaoming@corp.com
```

相反， 如果个人项目比较多， 可以

```bash
git config —global user.email gitfan@gmail.com
```

使用git log 可以看到使用哪个账户commit的：

```
commit 977277ecc9ebccb2ddb93b99e69d71efbce9e7e3
Author: lucas <xuxianming@umeng.com>
Date:   Fri Feb 27 13:47:57 2015 +0800

    inital project setup

commit 1a82f9456f86dca4d284a56024834ebfb6f26c4a
Author: lucas <xianminx@gmail.com>
Date:   Fri Feb 27 13:37:57 2015 +0800

    Initial commit
(END)
```

同样，email前面的名字也同理可以配置。
对于—global的配置， git 存储在~/.git/config 当中
对于项目的配置， git 存储在 ./.git/config 项目multi下

```bash
➜  SwipeBack git:(master) less .git/config

[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:xianminx/SwipeBack.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
[user]
        email = xianminx@gmail.com
.git/config (END)
```

这样配置项目使用的user.email和user.name 就能为公司项目和个人项目区分开用户账户了。

## 关于git 和 ssh key

ssh key 和git 本地使用没有关系。 如果需要同服务器同步代码， 才会用到。 git通信协议底层使用ssh， 故需要ssh key。
公司用的ssh key 多是用公司邮箱生成的， 如xiaoming@corp.com , 同公司代码库通信或者登陆公司服务器，都使用此key。
ssh key 默认存储在~/.ssh/目录下，如果将公司和个人区分开来呢？

简单回答是不需要， 只用将pub key 加到github 上就可以了， 这个pub key 是可以公开的， 故将公司用的ssh key pubkey 放到github.com 也无妨。
SSH key 和git 用户是两个独立的概念， 不应该混淆在一起
但是如果说一定要区分呢？
可以参考 [http://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config](http://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config)

在~/.ssh/config 中为每一个ssh server 使用IdentityFile 参数配置好private key.

> Step 2: ssh config
> Set up multiple ssh profiles by creating/modifying ~/.ssh/config. Note the slightly differing 'Host' values:

```bash
# Default GitHub
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa

# Work GitHub
Host work.github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_work
```