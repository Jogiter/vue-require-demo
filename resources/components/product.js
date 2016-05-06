define(['Vue'], function(Vue) {
    var temp, index;
    temp = '<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">\
        <!-- 数据填充模板 -->\
        <table class="table table-hover" id="boot">\
            <thead>\
                <tr>\
                    <th v-for="title in titles">{{title}}</th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr v-for="item in items">\
                    <td v-for="i in item">{{i}}</td>\
                </tr>\
            </tbody>\
        </table>\
        <ul class="pager">\
            <li><a href="#">Previous</a></li>\
            <li><a href="#">Next</a></li>\
        </ul>\
    </div>';

    index = Vue.extend({
        template: temp,
        data: function() {
            return {
                titles: ['title', 'name', 'mininame', 'mininame1', 'mininame2'],
                items: [
                    ['angular', 'vue', 'test', 'vue3', 'vue1'],
                    ['angular', 'vue', 'bootstrap', 'vue4', 'vue2'],
                    ['angular', 'vue', 'bootstrap', 'vue5', 'vue3']
                ]
            };
        }
    })

    Vue.component('my-product', index);

    return {
        set: function(el) {
            new Vue({
                el: el
            });
        },
        get: function() {
            return index;
        }
    }

});
