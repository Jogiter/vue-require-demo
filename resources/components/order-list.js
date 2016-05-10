define(['Vue', 'css!../../resources/css/order-list'], function(Vue) {
    var temp, productList;
    temp = '<form action="" method="POST" class="form-inline list-control" role="form">\
                <div class="form-group pd-0-10">\
                    <label class="" for="">商品状态</label>\
                    <select name="" id="input" class="form-control" required="required">\
                        <option value="">待发货</option>\
                        <option value="">待退款</option>\
                        <option value="">代付款</option>\
                        <option value="" selected>全部</option>\
                        <option value="">已完成</option>\
                    </select>\
                </div>\
                <div class="form-group pd-0-10">\
                    <label class="" for="">订单号</label>\
                    <input type="email" class="form-control" id="" placeholder="订单号">\
                </div>\
                <div class="form-group pd-0-10">\
                    <label class="" for="">收货人</label>\
                    <input type="email" class="form-control" id="" placeholder="收货人">\
                </div>\
                <button type="submit" class="btn btn-primary" @click.prevent.stop="search">搜索</button>\
                <button type="submit" class="btn btn-primary" @click.prevent.stop="export">导出</button>\
            </form>\
            <div class="table-responsive table-list">\
                <table class="table table-hover">\
                    <thead>\
                        <tr>\
                            <th v-for="item in titles" @click="order">\
                                {{item}}\
                            </th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr v-for="list in lists">\
                            <td class="col1">\
                                <a href="">\
                                    <p>{{list.name}}</p>\
                                </a>\
                            </td>\
                            <td>\
                                <p>{{list.price}}</p>\
                            </td>\
                            <td>\
                                <p>{{list.amount}}</p>\
                            </td>\
                            <td>\
                                <p>{{list.realAmount}}</p>\
                            </td>\
                            <td>\
                                <p>{{list.sales}}</p>\
                            </td>\
                            <td>\
                                <a class="link" href="#订单详情">订单详情</a><br/>\
                            </td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
            <ul class="pagination pull-right">\
                <li class="page-pre"><a href="javascript:void(0)">‹</a></li>\
                <li class="page-number active"><a href="javascript:void(0)">1</a></li>\
                <li class="page-number"><a href="javascript:void(0)">2</a></li>\
                <li class="page-number"><a href="javascript:void(0)">3</a></li>\
                <li class="page-number"><a href="javascript:void(0)">4</a></li>\
                <li class="page-number"><a href="javascript:void(0)">5</a></li>\
                <li class="page-last-separator disabled"><a href="javascript:void(0)">...</a></li>\
                <li class="page-last"><a href="javascript:void(0)">10</a></li>\
                <li class="page-next"><a href="javascript:void(0)">›</a></li>\
            </ul>';

    productList = Vue.extend({
        template: temp,
        data: function() {
            return {
                titles: ['商品名称', '售价', '数量', '实付金额', '订单状态', '操作'],
                lists: []
            };
        },
        methods: {
            search: function() {
                console.info('do search');
            },
            export: function() {
                console.info('do export');
            },
            order: function() {
                // 排序：TODO(利用filter实现)
            },
            goPrev: function() {
                var url = '../json/order-list.json';
                this.$http.get(url).then(function(response) {
                    // 初始化数据
                    console.info('Prev: get by ajax');
                    this.$set('lists', response.data.data.lists)
                }, function(response) {
                    // error callback
                    console.error(response);
                });
            },
            goNext: function() {
                var url = '../json/product-list.json';
                this.$http.get(url).then(function(response) {
                    // 初始化数据
                    console.info('Next: get by ajax');
                    this.$set('lists', response.data.data.lists)
                }, function(response) {
                    // error callback
                    console.error(response);
                });
            }
        },
        ready: function() {
            console.log('do ajax here');
            var url = '../json/product-list.json';
            this.$http.get(url).then(function(response) {
                // 初始化数据
                this.$set('lists', response.data.data.lists)
                console.log(response);console.log(response);
            }, function(response) {
                // error callback
                console.error(response);
            });
        }
    });

    return {
        get: function() {
            return productList;
        }
    }
});
