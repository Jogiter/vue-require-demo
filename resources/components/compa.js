define(['Vue'], function(Vue) {
    // 创建组件构造器
    var compA = Vue.extend({
        template: '<h2 msg="abc">comp A , say {{msg1}}</h2>',
        // props: ['msg1'],
        data: function() {
            return {
                msg1: 'vue'
            };
        }
    });

    // 创建组件构造器
    var compB = Vue.extend({
        template: '<h2>comp B , say {{msg2}}</h2>',
        // props: ['msg2'],
        data: function() {
            return {
                msg2: 'angular'
            };
        }
    });

    // 创建组件构造器
    var comps = Vue.extend({
        template: '<div>{{msg1}}{{typeof msg2}}<a-a></a-a><b-b></b-b></div>',
        props: ['msg1', 'msg2'],
        components: {
            'a-a': compA,
            'b-b': compB
        }
    });

    // 全局注册组件
    Vue.component('my-footer', comps);

    return {
        set: function(el) {
            // 创建vue实例
            new Vue({
                el: el
            });
        }
    };
});
