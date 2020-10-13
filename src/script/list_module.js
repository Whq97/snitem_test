define([], function() {
    return {
        render: ! function() { //渲染
            let list = $('.product-list .general');
            let array_default = []; //排序前的li数组
            let array = []; //排序中的数组
            //冒泡排序，比较相邻的两个数字。
            let prev = null; //前一个商品价格
            let next = null; //后一个商品价格
            $.ajax({
                url: 'http://10.31.163.207/js/suningitem_test/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                //进行渲染结构代码。
                let strhtml = '';
                $.each(data, function(index, value) {
                    // console.log(value);
                    strhtml += `
                    <li>
                    <div class="item-bg">
                        <div class="product-box">
                            <div class="res-img">
                                <div class="img-block">
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img class="lazy" data-original="${value.url}" alt="">
                                    </a>
                                </div>
                                <div class="focus-box ">
                                    <div class="focus-img">
                                        <dl>
                                            <dd>
                                                <a href="javascript:;">
                                                    <img class="lazy" data-original="${value.url}" alt="">
                                                </a>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="res-info">
                                <div class="price-box">
                                    <span>
                                        <i>¥</i><em>${parseInt(value.price)}</em><i>.00</i>
                                        <i class="price-bybt"></i>
                                    </span>
                                </div>
                                <div class="title-selling-point">
                                    <a href="#">${value.title}</a>
                                </div>
                                <div class="info-config">
                                    <em> 128GB <i>|</i>6.1英寸</em>
                                </div>
                                <div class="evaluate-old">
                                    <a href="#" class="a1">
                                        <i>${value.sailnumber}+</i>评价
                                    </a>
                                    <a href="#" class="a2">
                                        去淘二手
                                    </a>
                                </div>
                                <div class="store-stock">
                                    <p>苏宁自营</p>
                                </div>
                                <div class="sales-label">
                                    <span>${value.activity}</span>
                                </div>
                            </div>
                            <div class="res-opt">
                                <a href="javascript:;" class="duibi">
                                    <i></i> 对比
                                </a>
                                <a href="javascript:;" class="guanzhu">
                                    <i></i> 关注
                                </a>
                                <a href="javascript:;" class="gouwuc">
                                    <i></i> 购物车
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                `;
                });
                list.html(strhtml);
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
                $('.product-list .general li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

            });
            //2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。-240px -228px;
            $('#page').pagination({
                pageCount: 5, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页', //将图标改成上一页下一页。
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的点击的页码。
                    $.ajax({
                        url: 'http://10.31.163.207/js/suningitem_test/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输数据
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '';
                        $.each(data, function(index, value) {
                            strhtml += `
                                <li>
                                <div class="item-bg">
                                    <div class="product-box">
                                        <div class="res-img">
                                            <div class="img-block">
                                                <a href="detail.html?sid=${value.sid}" target="_blank">
                                                    <img class="lazy" data-original="${value.url}" alt="">
                                                </a>
                                            </div>
                                            <div class="focus-box ">
                                                <div class="focus-img">
                                                    <dl>
                                                        <dd>
                                                            <a href="javascript:;">
                                                                <img class="lazy" data-original="${value.url}" alt="">
                                                            </a>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="res-info">
                                            <div class="price-box">
                                                <span>
                                                    <i>¥</i><em>${parseInt(value.price)}</em><i>.00</i>
                                                    <i class="price-bybt"></i>
                                                </span>
                                            </div>
                                            <div class="title-selling-point">
                                                <a href="#">${value.title}</a>
                                            </div>
                                            <div class="info-config">
                                                <em> 128GB <i>|</i>6.1英寸</em>
                                            </div>
                                            <div class="evaluate-old">
                                                <a href="#" class="a1">
                                                    <i>${value.sailnumber}+</i>评价
                                                </a>
                                                <a href="#" class="a2">
                                                    去淘二手
                                                </a>
                                            </div>
                                            <div class="store-stock">
                                                <p>苏宁自营</p>
                                            </div>
                                            <div class="sales-label">
                                                <span>${value.activity}</span>
                                            </div>
                                        </div>
                                        <div class="res-opt">
                                            <a href="javascript:;" class="duibi">
                                                <i></i> 对比
                                            </a>
                                            <a href="javascript:;" class="guanzhu">
                                                <i></i> 关注
                                            </a>
                                            <a href="javascript:;" class="gouwuc">
                                                <i></i> 购物车
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `;
                        });
                        list.html(strhtml);
                        $("img.lazy").lazyload({
                            effect: "fadeIn" //图片显示方式
                        });

                        //将页面的li元素加载到两个数组中
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        // console.log(flag);
                        flag = -1;
                        $('.product-list .general li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                        $('.second-up .sort .price').css("background-position", "-67px -374px");
                    });
                }

            });
            //3.排序，排序前的数组都已经具有li元素
            // 默认-67px -375px
            var flag = 1;
            $('.sort span').eq(0).on('click', function() {
                flag *= -1;
                $('.second-up .sort .price').css("background-position", "-67px -374px");
                $.each(array_default, function(index, value) {
                    $('.product-list .general').append(value);
                });
                return;
            });
            // $('.product-list .general li').each(function(index, element) {
            //     array[index] = $(this);
            //     array_default[index] = $(this);
            // });
            // 升序

            $('.sort span').eq(3).on('click', function() {
                flag *= -1;
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseInt(array[j].find('.price-box span em').html()); //取上个价格
                        next = parseInt(array[j + 1].find('.price-box span em').html()); //下一个的价格
                        // console.log(prev, next);
                        //通过价格的判断，改变的是数组li的位置。
                        if (flag > 0) {
                            $('.second-up .sort .price').css("background-position", "-28px -374px");
                            console.log($('.second-up .sort .price'));
                            if (prev > next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        } else {
                            $('.second-up .sort .price').css("background-position", "-48px -374px");
                            if (prev < next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }

                    }
                }
                $('.list ul').empty(); //清空原来的列表
                $.each(array, function(index, value) {
                    $('.product-list .general').append(value);
                });
            });
            flag = -1;

        }(),
        login: ! function() {
            if (sessionStorage.getItem('username')) {
                $('.loginname').html('亲爱的' + sessionStorage.getItem('username') + '用户');
            }
        }()
    }
})