define(['Vue', 'css!../../resources/css/header', 'css!../../resources/css/thirds/fontawesome/css/font-awesome'], function(Vue) {

    var temp = '',
        header;

    temp = '<nav class="navbar bgc2d3242" role="navigation">\
                <div class="container">\
                    <div class="navbar-header">\
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\
                            <span class="sr-only">Toggle navigation</span>\
                            <span class="icon-bar"></span>\
                            <span class="icon-bar"></span>\
                            <span class="icon-bar"></span>\
                        </button>\
                        <a class="navbar-brand" href="{{brand.url}}">{{brand.name}}</a>\
                    </div>\
                    <div class="collapse navbar-collapse navbar-ex1-collapse navbar-right">\
                        <ul class="nav navbar-nav seller-login">\
                            <li v-for="login in logins" class="{{login.className}}">\
                                <a href="{{login.url}}"><i class="{{login.icon}}"></i><span>{{login.name}}</span></a>\
                            </li>\
                        </ul>\
                        <ul class="nav navbar-nav navbar-right seller-control">\
                            <li v-for="control in controls"><a href="{{control.url}}">{{control.name}}</a></li>\
                        </ul>\
                    </div>\
                </div>\
            </nav>';

    header = Vue.extend({
        template: temp,
        data: function() {
            return {
                brand: {
                    name: '美啦，装载全世界的美',
                    url: '#'
                },
                logins: [{
                    url: '#微信登录',
                    name: '微信登录',
                    icon: 'fa fa-lg fa-wechat'
                }, {
                    url: '#微博登录',
                    name: '微博登录',
                    icon: 'fa fa-lg fa-weibo'
                }, {
                    url: '#QQ登录',
                    name: 'QQ登录',
                    icon: 'fa fa-lg fa-qq'
                }, {
                    url: '#人人登录',
                    name: '人人登录',
                    icon: 'fa fa-lg fa-renren'
                }],
                controls: [
                    {
                         url: '#卖家中心',
                         name: '卖家中心'
                    },
                    {
                         url: '#买手招募',
                         name: '买手招募'
                    }
                ]
            };
        }
    });

    Vue.component('my-header', header);

    return {
        set: function(el) {
            new Vue({
                el: el
            });
        }
    }
});
