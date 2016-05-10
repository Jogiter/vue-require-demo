## Sellerpc demo

现在的卖家中心正在使用的[requirejs](http://requirejs.org/)&&[vue](https://vuejs.org.cn/)

**已完成功能：**

- [x] 基础数据绑定的实现
- [x] 模块组件化
- [x] 组件的复用
- [x] 样式文件的引入
- [x] 图片的引入
- [x] 第三方插件的引入


**issues**


### 学习链接

-   [Vue.js官网](http://vuejs.org.cn/)
    +   [Vue学习资源汇总](https://github.com/vuejs/awesome-vue#tutorials)
    +   [官方demo:vue-loader-example](https://github.com/vuejs/vue-loader-example/)
-   [requirejs](http://requirejs.org/)

## 开发指北

指北不包含[requirejs](http://requirejs.org/)和[vuejs](http://vuejs.org.cn/)的用法，具体的可见[学习链接](#学习链接)

1.如何添加新页面？

+   在`./resources/js/seller.js`的`router.map({})`中添加页面链接

+   在`resources`目录下的`css`&`components`目录下分别添加`pageName.[js|css]`。在`.js`文件中去实现各自的页面和逻辑(目前基本完成product-list和order-list，具体可参照页面代码)

2.如何使用插件，如何使用css？

可参照问题1中的已完成页面。

3.如何使用第三方插件？

所有的第三方插件均在`./resources/js/plugins/`目录下，然后打开`require.config.js`将第三方插件放置到`paths`下，如有`css`依赖，则将css依赖添加到`shim`配置中

第三方插件可以去[bootcdn.cn](bootcdn.cn)拷贝，或者使用[bower](http://bower.io/)来安装

```sh
## 查找第三方插件
bower search jquery

## 查找插件信息
bower info jquery

## 安装插件
bower install --save-dev jquery
```

4.如何开启web服务？

在当前目录，执行`gulp`开启web服务和livereload监控。默认页面`http://localhost:8080`, 修改代码，页面会自动刷新。

具体配置在`gulpfile.js`的任务`connect`中，可自行修改`host`和`port`，修改后再执行`gulp`即可。
