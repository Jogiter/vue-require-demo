define(['Vue'], function(Vue) {
    var temp, siderbar;
    temp = '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
        <h1>左侧导航</h1>\
        <ul class="list-group">\
            <li class="list-group-item" v-for="item in items">{{item}}</li>\
        </ul>\
    </div>';

    siderbar = Vue.extend({
        template: temp,
        data: function() {
            return {
                items: ['item1', 'item2', 'item3', 'item4', 'item5', 'ietmasd', 'asdfas']
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
