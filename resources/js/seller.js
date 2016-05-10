require(['css!../resources/css/index',
         'jquery',
         'Vue',
         './components/footer',
         './components/header',
         'bootstrap',
         'VueRouter',
         'VueResource',
         './components/siderbar',
         './components/index',
         './components/product',
         './components/product-list',
         './components/order-list',
         './components/utils'
     ], function(css,
                $,
                Vue,
                footer,
                header,
                bootstrap,
                VueRouter,
                VueResource,
                siderbar,
                index,
                product,
                productList,
                orderList,
                utils
    ) {
    // 使用插件
    Vue.use(VueRouter);
    Vue.use(VueResource);

    var App = Vue.extend({});

    var router = new VueRouter();

    router.map({
        '/卖家中心': {
            component: product.get()
        },
        '/买手招募': {
            component: index.get()
        },
        '/商品管理': {
            component: productList.get()
        },
        '订单管理': {
            component: orderList.get()
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
    // footer.set('#main');

    // utils.comfirm({
    //     msg: '<h2>Hello wolrd 123</h2>',
    //     yes: function() {
    //         // 成功回调
    //         console.log('yes');
    //     },
    //     no: function() {
    //         // 失败回调
    //         console.log('no');
    //     }
    // });

    // 初始化各组件的事件
    index.events();
    // product.event();
});

