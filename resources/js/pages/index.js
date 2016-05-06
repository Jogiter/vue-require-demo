require(['jquery', 'Vue', './components/footer', './components/header', 'bootstrap', 'VueRouter', 'VueResource', './components/siderbar', './components/index', './components/product', 'css!../resources/css/index'], function($, Vue, footer, header, bootstrap, VueRouter, VueResource, siderbar, index, product) {

    // 使用插件
    Vue.use(VueRouter);
    Vue.use(VueResource);

    var App = Vue.extend({})

    var router = new VueRouter()

    router.map({
        '/product': {
            component: product.get()
        },
        '/index': {
            component: index.get()
        },
        '/': {
            component: index.get()
        }
    })

    router.start(App, '#main')


    // 创建vue实例，用组件替换el元素
    // 组件替换需要在路由创建之后，否则会报错
    header.set('#main');
    siderbar.set('#main');
    footer.set('#main');

    // 初始化各组件的事件
    index.events();
    // product.event();
});
