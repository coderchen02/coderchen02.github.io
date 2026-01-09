---
title: Git的原理与应用
date: 2026-01-09 17:10:42
tags: [Git, 教程] 
categories: 工具        # 分类
toc: true                   # 是否显示目录
comments: true              # 是否开启评论
---

# GIT原理与使用

## 1、Git的安装

## linux

## windows

1. 工作区、暂存区、版本库

   + 工作区：是在电脑上你要写代码或文件的目录

   + 暂存区：英文叫stage或index.一般存放在**.git**目录下的index文件（.git/index)中，我们把暂存区有时也叫索引（index)

   + 版本库：又叫仓库。工作区有一个隐藏目录.git，它不算工作区，而是Git的版本库，这个版本库里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

     ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/4a7220512b2c4206ab1f973ed8cbe8da.png)


     + 图中左侧为工作区，右侧为版本库。Git的版本库里存了很多东西，其中最重要的就是暂存区。
     + 在创建Git版本库时，Git会为我们自动创建一个唯一的master（这个是主分支，但是在2020 年后，GitHub、GitLab 等平台以及 Git 官方（Git 2.28+ 支持配置默认分支名）都将默认主分支名改为了 main,本文仍使用master)分支，以及指向master的一个指针叫HEAD。
     + 当对工作区修改（或新增）的文件执行**git add**命令时，暂存区目录树的文件索引会被更新。
     + 当执行提交操作**git commit**时，master分支会做相应的更新，可以简单理解为暂存区的目录树才会被真正写到版本库中。

2. git 的常见命令

   > 最常见的是git add/git commit/git push

+ **git status**

  用于查看在你上次提交之后是否有对文件进行再次修改(本例是在已提交成功的工作区里新建一个test.txt内容空白文本文件)

  ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/b42062791530490aa95c1e9771053fc7.png)


+ **git diff**

  用来显示暂存区和工作区文件的差异（本例是将test.text添加内容并且提交到暂存区之后再在工作区内更改）

  ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/fc18c0f6f0c14a698fa8f95d7494b14a.png)


  + **git reset**

  用于回退版本，可以指定退回某一次提交的版本。回退的本质是要将版本库中的内容进行回退，工作区或暂存区是否回退由命令参数决定   

  git reset命令语法格式为：git reset [--soft|--mixed--|--hard] [HEAD]

  HEAD说明:

  		可直接写成commit id,表示指定退回的版本
  	
  		HEAD表示当前版本
  	
  		HEAD^上一个版本
  	
  		HEAD^^上上一个版本 以此类推

  **--soft**参数对于工作区和暂存区的内容都不变，只是将版本库回退到某个指定版本。通俗理解是“反悔提交，但保留所有修改”----相当于撤销了git commit，但git add的内容还在暂存区，工作区的修改也还在。适用场景是刚提交完发现提交信息写错了，想重新提交：git reset --soft HEAD^ ,然后修改提交信息重新git commit.这是最温和的一个回退参数。

  **--mixed** 为默认选项，使用时可以不用带该参数。该参数将暂存区的内容退回为指定版本提交内容，工作区文件保持不变。通俗理解是“反悔提交+反悔暂存”----相当于撤销了git commit和git add,但工作区的修改还在，需要重新git add。适用场景：1.提交后发现漏加了文件，想重新选择要提交的文件：git reset HEAD^，然后重新git add需要的文件再git commit。2.误把不需要提交的文件git add 了，想取消暂存。

  **--hard**参数将暂存区与工作区都退回到指定版本。工作区有未提交的代码不要使用这个命令，因为工作区会回滚，你没有提交的代码就~~再也找不回了~~(git还提供了一个保底的命令：git reflog,该命令记录本地的每一次命令，通过这个命令找到删除前提交的HEAD ID来找回文件），所以使用该参数前一定要慎重。通俗理解就是“彻底回退”----让仓库完全回到指定提交的状态，所有未提交的修改都消失。适用场景：1.本地修改完全错误，想彻底放弃，回到之前的稳定版本：git reset --HEAD^, 2.拉取远程最新代码前，清空本都所有未提交的修改（避免冲突）

  + **git checkout -- [file]**: 对于工作区的代码，还没有add的时候，我们可以使用这个命令让工作区的文件回到最近一次add或commit时的状态

  ## 2、分支管理
  ### 2.1 理解分支

  >如何理解分支呢？
  >分支就是平行宇宙，当你在学习c++的时候，另一个你正在另一个平行宇宙里努力学习JAVA。当有一天两个平行宇宙合并到了一起，那么你就既学会了C++也学会了JAVA；

git支持我们查看或者创建其他分支，可以通过git branch查看本地现有的分支 ，并且通过git branch [分支名] 创建新分支。
                ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9e9b353c7f3d438ca72d0cf42732aeab.png)
当我们创建新的分支以后，Git新建了一个指针叫test,*表示当前HEAD指向的分支是master分支，

### 2.2 切换分支
我们可以通过命令 ==git checkout== 进行切换分支。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/d10e54e19ac8496f929033abcdefeca7.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/d34af21d53984f78a3bfa6da2390cdfa.png)

可以看到切换分支成功，HEAD指向了test分支。接下来在test分支下创建一个hello.md文件并且进行提交。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/f1d5ad5fe1274f8cb667bd06bdaef019.png)
这个时候我们切换回master分支，查看hello.md文件，发现在master分支下没有这个文件
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/cd76517057b04461b835daa0b971b52b.png)那我们在test分支下是否还有这个文件？经验证在test分支下这个文件是存在的，但是为什么在master分支下这个文件就看不到呢？？？
我们查看一下master和test分支的指向，发现两者的指向是不一样的
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/17ae3ca0a50043bea94b0a64671febd5.png)
看到这里就明白了，因为我们是在test分支上提交的，而master分支此刻的提交点没有变化，此时的状态图如下：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0da2fe47e3b947bd9bbea8741accad86.png)
当切换到master分支时，HEAD就指向了master,当然看不到创建的文件了。

## 2.3 合并分支
为了在master分支上能看到最新的提交，就需要将test分支合并到master分支
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/ecc98bcd036149b8a68c342b2a5c8c12.png)

==git merge== 命令用于合并指定分支到当前分支。合并后，master分支就能看到test分支提交的文件。此时的状态如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/04e8ee50664842d390552b00adf949de.png)
## 2.4 删除分支
合并完成后，test分支对于我们就没有用了，那么test分支就可以删除了，注意如果当前正处于某
分⽀下，就不能删除当前分⽀。⽽可以在其他分⽀下删除当前分⽀。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/f484a11084cc4705b49860f7e3c45195.png)
此时的状态图如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0220a1e8d1c64d0fa3065bad738a6d20.png)
## 2.5 合并冲突
在实际的分⽀合并的时候，并不是想合并就能合并成功的，有时候可能会遇到代码冲突的问题。
我们这里创建一个dev分支用来演示，创建dev分支并切换到dev分支。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/249fdf619b52474da199b214534bd196.png)
在dev分支下修改hello.md文件并且进行提交一次。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/608f1d9c33884816977528bfdaa860b4.png)
此时按照我们之前所示切换回master分支，应该是看不到在dev分支下添加的文字的，事实也是这样的。这个时候我们在master分支下也对hello文件进行添加内容并提交，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/ce3c26abad3342049c1afb8f43fe30d2.png)
现在master分支和dev分支都有了各自的提交，此时的状态变成了这样：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/cfd42e7844c8479a9673e75a118b9f4b.png)
这种情况下，Git 只能试图把各⾃的修改合并起来，但这种合并就可能会有冲突，如下所⽰：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/826a055efdb741e0939023ccabe5edd4.png)
发现 ReadMe ⽂件有冲突后，可以直接查看⽂件内容，要说的是 Git 会⽤ <<<，  ===，>>>
来标记出不同分⽀的冲突内容，如下所⽰:
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/596e7521f8704621980d1e059e16c5fa.png)
此时我们必须要手动调整冲突代码，并需要再次提交修正后的结果！
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/468dd1ddd2cb4185b81073ed4ca38b20.png)
到这里冲突就解决结束了，此时的状态为：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/765b9717fbd2499e93bdb5741cd4b5d6.png)
最后删除这个示例用的dev分支。
