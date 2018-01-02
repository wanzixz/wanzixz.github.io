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

配置文件：

```
{
    // 控制字体系列。
    "editor.fontFamily": "Consolas, 'Courier New', monospace,'宋体'",
    "workbench.colorTheme": "Monokai",
    "editor.tabSize": 2,
    "editor.fontSize": 20,
    "editor.wordWrap": "on",
    //终端路径
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
     // 以像素为单位控制终端的字号，这是 editor.fontSize 的默认值。
     "terminal.integrated.fontSize": 14,
    // 控制终端游标是否闪烁。
    "terminal.integrated.cursorBlinking": true,
    "window.zoomLevel": -1,
    "open-in-browser.default": "[ 'chrome', 'google chrome', 'google-chrome', 'gc', '谷歌浏览器' ]",
    "workbench.iconTheme": "seti",
    "workbench.sideBar.location": "left",
    //"team.showWelcomeMessage": false,
    "php.validate.executablePath": "C:\\wamp\\bin\\php\\php5.5.12\\php.exe",
    "emmet.triggerExpansionOnTab": true,
    //jsx 文件
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "[html]": {
        "editor.tabSize": 2
    },
    "[css]": {
        "editor.tabSize": 2
    },
    "[javascript]": {
        // 按 "Tab" 时插入空格。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
        "editor.insertSpaces": true,
        // 一个制表符等于的空格数。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
        "editor.tabSize": 2
    },
    "[typescript]": {
        "editor.tabSize": 2
    }
}

```
