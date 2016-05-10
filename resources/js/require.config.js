require.config({
    baseUrl: '../resources/',
    paths: {
        jquery: 'js/plugins/jquery/jquery.2.2.1',
        Vue: 'js/plugins/vue/vue.1.0.17',
        VueRouter: 'js/plugins/vue/vue-router.0.7.11',
        VueResource: 'js/plugins/vue/vue-resource.0.7.0',
        bootstrap: 'js/plugins/bootstrap/js/bootstrap',
        pager: 'js/plugins/bootstrap-table/dist/bootstrap-table.min',
        magnific: 'js/plugins/magnific/jquery.magnific-popup.min'
        // amaze: ie == 8 ? 'third/amazeui.legacy.min' : 'third/amazeui.min',
        // doT: 'third/doT.min',
        // moment: 'third/moment.min',
        // pager: 'plugins/pager/kd-pager',
        // switchs: 'plugins/switch/kd-switch',
        // sortRow: 'plugins/sortable/kd-sort',
        // sortable: 'plugins/sortable/sortable.min',
        // underscore: 'third/underscore.min',
        // validate: 'third/jquery.validate.min',
        // placeholder: 'third/jquery.placeholder',
        // copy: 'plugins/copy/copy',
        // address: 'plugins/address',
        // upload: 'plugins/upload/upload',
        // qrcode: 'plugins/qrcode/qrcode',
        // jiathis: 'third/jiathis',
        // icheck: 'third/icheck.min',
        // chosen: 'plugins/chosen/chosen.jquery.min',
        // my97datepicker: 'plugins/My97DatePicker/WdatePicker',
        // kindEditor: 'plugins/kindeditor',
        // product: 'page/product',
    },
    map: {
        '*': {
            'css': 'js/require-css',
            'less': 'js/require-less'
        }
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        bootstrap: {
            deps: ['jquery', 'css!js/plugins/bootstrap/css/bootstrap'],
            exports: '$.fn.popover'
        },
        pager: ['css!js/plugins/bootstrap-table/dist/bootstrap-table.min'],
        product: ['css!../css/product'],
        magnific: ['jquery', 'css!js/plugins/magnific/magnific-popup.min']
    },
    // enforceDefine: true,
    urlArgs: 'v=' + new Date().getTime()
});
