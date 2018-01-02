---
layout: post
title: 关于用vscode编写jsx问题
category: 技术
tags: react
keywords: react
description: react
---

用vscode写react项目时，发现render()中写JSX语法时，不能像在正常html文件中那样，快速补全html标签，如我要div.class 然后tab，不行。

这样写真的好慢。。要逐个标签敲。。头尾标签都要。。。

解决办法:


```
// 在设置里面 先启用tab热键  配置如下： 

"emmet.triggerExpansionOnTab": true,


//emmet默认是不支持jsx文件 这里需要手动添加，配置如下：

"emmet.includeLanguages": {"javascript": "javascriptreact"},

```
