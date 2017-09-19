---
layout: post
title: 二维码识别
category: 技术
tags: viewport
keywords: viewport
description: viewport
---

## vue-cli工具搭建vue项目

### 一、使用vue-cli工具搭建vue项目

#### 以下步骤基于已经安装了node、npm(cnpm)

- 第一步，安装vue： `$ npm install vue`

- 第二步，安装命令行工具：cli
	
	- 全局安装： `$ npm install --global vue-cli`


- 第三步，在需要的文件夹位置创建一个基于webpack模版的项目

	- `$ vue init webpack my-project`

- 第四步，cd到创建的项目文件夹，安装依赖

	- `cd my-project`
	
	- `$ npm install`

- 第五步，试运行项目： `npm run dev`

- 第六步，打包项目： `npm run build`

#### 注意事项

- 1.以上步骤需按顺序执行，否则命令行的时候容易报错：**vue不是内部命令 vue-cli不是内部命令**

- 2.运行`npm run dev`不能启动项目，可能是端口占用，建议将端口调整为不常用端口，具体参见：`http://www.cnblogs.com/wisewrong/p/6255817.html`


### 二、修改vue-cli工具搭建vue项目的项目结构及依赖

- 第一步，在src文件夹添加部分常用文件，如：页面.vue文件、过滤器文件、公共插件

	- |-- pages
	 - |-- home.vue
	- |-- filter
	 - |-- index.js
	- |-- utils
	 - |-- common.js
	 - |-- env.js

- 第二步，配置编译环境和线上环境之间的切换：如env.js(utils/env.js)

			let baseUrl;  // 请求路径
			let routerMode; // 路由模式hash、history
			let buildDir; // 发布路径
			let homeUrl;
			
			if (process.env.NODE_ENV == 'development') {
			  baseUrl = '';
			  routerMode = 'hash';
			  buildDir = '/';
			  homeUrl = '';
			} else {
			  baseUrl = '';
			  routerMode = 'hash';
			  buildDir = '/';
			  homeUrl = '';
			}

		export {baseUrl, routerMode, buildDir, homeUrl}

- 第三步，配置项目路由： 使用vue-router，但不使用cli生成的路由结构(不使用App.vue形式)

	- 1.修改index.html文件，在vue挂在的div上嵌入路由出口：

			<div id="app">
			  <router-view></router-view>
			</div>	

	- 2.设置main.js主入口文件
			
			// 引入vue、vue-router及routes配置
			import Vue from 'vue'
			import VueRouter from 'vue-router'
			import routes from './router'
			
			// 安装路由功能
			Vue.use(VueRouter)

			// 创建router实例，传入routes配置
			const router = new VueRouter({
			  routes
			})
			
			// 创建和挂载根实例,通过 router 配置参数注入路由
			const app = new Vue({
			  router
			}).$mount('#app')

	- 3.配置routes（router/index.js): 如嵌套路由

			export default [
			  {
			    path: '/app/',
			    name: 'app',
			    component: (resolve) => {
			      require(['../components/Hello.vue'], resolve)
			    },
			    children: [
			      {
			        path: 'bb',
			        name: 'home',
			        component: (resolve) => {
			          require(['../components/bb.vue'], resolve)
			        }
			      },
			      {
			        path: 'child',
			        name: 'aa',
			        component: (resolve) => {
			          require(['../pages/child.vue'], resolve)
			        }
			      }
			    ]
			  }
			]


- 第四步，配置项目http请求：如使用axios或fetch，以axios为例：

	- 1.npm 安装 axios（fetch）
	- 2.配置符合项目情况的http请求

	- `https://www.npmjs.com/package/axios`
	- 中文说明： `https://www.kancloud.cn/yunye/axios/234845`
	

- 第五步，配置项目UI组件库，如：iView（bootstrap参见三）
	
	- 1.npm 安装 iView
	- 2.在 webpack 入口文件 main.js 中配置：

			...
			import iView from 'iview'
			import 'iview/dist/styles/iview.css'
			Vue.use(iView)
			...

	- iView官网：`https://www.iviewui.com/docs/guide/introduce`


### 三、在vue-cli项目中引入jq及bootstrap

- `http://www.cnblogs.com/haimishasha/p/6556410.html`
- `http://blog.csdn.net/tanhao_282700/article/details/68955607`



### 四、在vue-cli项目中打包后 运行 打包文件index.html无法显示 请求文件404报错
- `http://www.dabaipm.cn/static/frontend/346.html`
