define(['Vue', 'jquery', 'bootstrap'], function(Vue, $, bootstrap) {
    var utils = {},
        alert,
        _alert,
        comfirm,
        _comfirm,
        loading,
        _loading;

    alert = '';

    comfirm = '<div class="modal fade" id="modal-id">\
                    <div class="modal-dialog">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                <h4 class="modal-title">{{title}}</h4>\
                            </div>\
                            <div class="modal-body">\
                                {{{msg}}}\
                            </div>\
                            <div class="modal-footer" v-if="btns.length > 0">\
                                <button type="button" class="btn btn-default" data-dismiss="modal" @click="no">{{btns[0]}}</button>\
                                <button type="button" class="btn btn-primary" @click="yes" v-if="btns.length==2">{{btns[1]}}</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>';

    loading = '';

    return {
        init: function() {
            console.log('init')
            new Vue({
                el: 'body'
            })
        },
        alert: function() {

        },
        comfirm: function(option) {
            var comp = Vue.extend({
                template: comfirm,
                data: function() {
                    return {
                        title: option.title || '提示',
                        msg: option.msg || '',
                        btns: option.btns || ['取消', '确定']
                    }
                },
                methods: {
                    yes: function() {
                        $('#modal-id').modal('hide');
                       typeof option.yes === 'function' && option.yes();
                    },
                    no: function() {
                        $('#modal-id').modal('hide');
                        typeof option.no === 'function' && option.no();
                    }
                }
            });
            Vue.component('seller-comfirm', comp);

            this.init();

            $('#modal-id').modal('show');
        },
        loading: function() {

        }
    }
});
