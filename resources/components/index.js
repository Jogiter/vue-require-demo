define(['Vue', 'magnific'], function(Vue, magnific) {
    var temp, index;
    temp = '<!-- 数据填充模板 -->\
            <table class="table table-hover">\
                <thead>\
                    <tr>\
                        <th v-for="title in titles">{{title}}</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr v-for="item in items">\
                        <td v-for="it in item">{{it}}</td>\
                    </tr>\
                </tbody>\
            </table>\
            <div class="img-pop">\
                <a href="http://www.myvue.com/images/vue_logo_square.png">\
                    <img src="http://www.myvue.com/images/vue_logo_square.png" class="img-responsive" alt="Image">\
                </a>\
            </div>\
            <ul class="pager">\
                <li><a href="#" @click.stop.prevent="prev">Previous</a></li>\
                <li><a href="#" @click.stop.prevent="next">Next</a></li>\
            </ul>';

    index = Vue.extend({
        template: temp,
        data: function() {
            return {
                titles: ['title', 'name', 'mininame'],
                items: [
                    ['angular', 'vue', 'test'],
                    ['angular', 'vue', 'bootstrap'],
                    ['angular', 'vue', 'bootstrap']
                ]
            };
        },
        methods: {
            prev: function() {
                alert('click the previous button');
            },
            next: function() {
                alert('click the next button');
            }
        }
    })

    Vue.component('my-index', index);



    return {
        set: function(el, data) {
            new Vue({
                el: el
            });

        },
        get: function() {
            return index;
        },
        events: function() {
             $('.img-pop').magnificPopup({
                delegate: 'a',
                type: 'image'
            });
        }
    }

});
