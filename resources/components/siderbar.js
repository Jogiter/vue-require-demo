define(['Vue', 'css!../../resources/css/siderbar'], function(Vue) {
    var temp, siderbar;
    temp = '<h4 class="text-center"><a href="{{title.url}}"><strong>{{title.name}}</strong></a></h4>\
            <ul class="list-group">\
                <li class="list-group-item item-title" v-for="item in items">\
                    <h4><a href="{{item.url}}"><strong>{{item.name}}</strong></a></h4>\
                    <ul>\
                        <li class="list-group-item item-title" v-for="it in item.subItems">\
                            <a href="{{it.url}}">{{it.name}}</a>\
                        </li>\
                    </ul>\
                </li>\
            </ul>';

    siderbar = Vue.extend({
        template: temp,
        data: function() {
            return {
                title: {
                    name: '卖家首页',
                    url: '#'
                },
                items: [
                    {
                        name: '订单管理',
                        url: '#订单管理',
                        subItems: [
                            {
                                name: '退款订单',
                                url: '#退款订单'
                            }, {
                                name: '评价管理',
                                url: '#评价管理'
                            }
                        ]
                    },{
                        name: '订单管理',
                        url: '#订单管理',
                        subItems: [
                            {
                                name: '退款订单',
                                url: '#退款订单'
                            }, {
                                name: '评价管理',
                                url: '#评价管理'
                            }
                        ]
                    },{
                        name: '商品管理',
                        url: '#商品管理',
                        subItems: [
                            {
                                name: '发布商品',
                                url: '#发布商品'
                            }, {
                                name: '库存管理',
                                url: '#库存管理'
                            }, {
                                name: '采购单管理',
                                url: '#采购单管理'
                            }
                        ]
                    },{
                        name: '消息公告',
                        url: '#消息公告',
                        subItems: []
                    }
                ]
            };
        }
    });

    Vue.component('my-siderbar', siderbar);

    return {
        set: function(el) {
            new Vue({
                el: el
            });
        }
    };
});
