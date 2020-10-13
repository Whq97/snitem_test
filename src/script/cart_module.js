define([], function() {
    return {
        cart_list: ! function() {
            //1.渲染购物车列表
            //获取cookie，进行渲染。
            if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                var sid = $.cookie('cookiesid').split(','); //[1,2,3]
                let num = $.cookie('cookienum').split(','); //[100,200,300]
                for (let i = 0; i < sid.length; i++) {
                    rendercart(sid[i], num[i]);
                }
            }
            console.log(sid);
            //封装函数实现渲染。
            function rendercart(sid, num) { //sid:渲染的商品编号    num:渲染的商品的数量。
                console.log(parseInt(num));
                $.ajax({
                    url: 'http://10.31.163.207/js/suningitem_test/php/taobaodata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        // console.log(value);
                        if (value.sid == sid) { //数据接口的sid和当前商品的sid进行比较，如果相等，直接赋值。
                            var strhtml = '';
                            // strhtml += ' <li class="'+sid+'"><input type="checkbox" name="" id="sel-check" class="fudong"><div class="td-item fudong"><div class="td-item fudong"><div class="td-item fudong"><img src="'+value.url+'" alt=""><a class="item-c" href="#"><h3>'+value.title+'</h3></a></div><div class="td-specs fudong"><p>颜色：白色</p><p>规格：128G</p></div><div class="td-price fudong"><div class="price-line "><i>¥</i><em>'+value.price+'</em></div><div class="icon-promo-price ">'+value.activity+'</div></div><div class="nums fudong"><div class="cont"><button class="jian">-</button><input type="text" name="" id="count" value="'+parseInt(num)+'"><button class="jia">+</button></div></div><div class="td-sum fudong"><i>¥</i><em>'+(value.price*num).toFixed(2)+'</em></div><div class="td-op fudong"><a href="javascript:;">删除</a></div></li>';
                            strhtml += `
                                <li class="${sid}">
                                <input type="checkbox" name="" id="sel-check" class="fudong">
                                <div class="td-item fudong">
                                    <img src="${value.url}" alt="">
                                    <a class="item-c" href="#">
                                        <h3>${value.title}</h3>
                                    </a>
                                </div><div class="td-specs fudong"><p>颜色：白色</p><p>规格：128G</p></div><div class="td-price fudong"><div class="price-line "><i>¥</i>
                                        <em>${value.price}</em>
                                    </div><div class="icon-promo-price ">${value.activity}</div>
</div><div class="nums fudong"><div class="cont"><button class="jian">-</button><input type="text" name="" id="count" value="${parseInt(num)}">
                                        <button class="jia">+</button></div></div><div class="td-sum fudong"><i>¥</i><em>${(value.price*num).toFixed(2)}</em>
                                </div><div class="td-op fudong"><a href="javascript:;">删除</a></div></li>`;

                            $('.cart-list ul').append(strhtml);
                            // console.log($('.cart-list ul li').children('#sel-check').prop('checked'));
                            // getcookie();
                            // status.push(Number($('.cart-list ul li').children('#sel-check').prop('checked')));
                            // calc(); //总算总价
                            // status.push(Number($('.cart-list ul li').children('#sel-check').prop('checked')));
                            // fn(status);
                        }
                    });
                })
            }
            var arrsid = []; //商品的sid
            var arrnum = []; //商品的数量
            // var status = []; //勾选状态
            /* function fn(data) {
                console.log(data);
                $.cookie('cookiesta', data, { expires: 10, path: '/' });
                $('.cart-list ul').on('change', '#sel-check', function() {
                    // console.log($(this).prop('checked'));
                    // getcookie();

                    // if ($(this).prop('checked')) {
                    //     console.log($(this).parent("li").attr("class"));
                    //     var s_sid = $(this).parent("li").attr("class");
                    //     var index = $.inArray(s_sid, arrsid); //sid在数组中的位置
                    // }
                })
            } */
            /* $('.cart-list ul').on('load', '#sel-check', function() {
                console.log($(this).prop('checked'));
            }) */

            console.log(status);
            $('.cart-list ul').on('click', '.jia', function() {
                console.log(1);
                var s_sid = $(this).parent(".cont").parent(".nums").parent("li").attr("class");
                console.log($(this).parent(".cont").parent(".nums").parent("li"));
                console.log(s_sid);
                var nums = $(this).siblings("#count").val();
                nums++;
                $(this).siblings("#count").val(nums);
                // var danj = $(this).parent(".cont").parent(".nums").siblings(".td-price").children(".price-line").children("em").html();

                // $('.cart-list ul li').eq($(this).index()).children(".nums").children(".cont").children("#count").val(nums);

                // $(this).parent(".cont").parent(".nums").siblings(".td-sum").children("em").html(danj * nums.toFixed(2));
                var danj = parseFloat($(this).parent(".cont").parent(".nums").siblings(".td-price").children(".price-line").children("em").html() * nums).toFixed(2);
                $(this).parent(".cont").parent(".nums").siblings(".td-sum").children("em").html(danj);
                getcookie();
                // console.log(arrsid);
                // console.log(arrnum);
                var index = $.inArray(s_sid, arrsid); //sid在数组中的位置
                console.log(index);
                arrnum[index] = parseInt(nums); //原来的数量+新添加数量进行赋值
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                calcprice()
            })
            $('.cart-list ul').on('click', '.jian', function() {
                // console.log(2);
                var nums = $(this).siblings("#count").val();
                var s_sid = $(this).parent(".cont").parent(".nums").parent("li").attr("class");
                // console.log(s_sid);
                nums--;
                if (nums <= 1) {
                    nums = 1;
                }
                $(this).siblings("#count").val(nums);
                var danj = parseFloat($(this).parent(".cont").parent(".nums").siblings(".td-price").children(".price-line").children("em").html() * nums).toFixed(2);
                $(this).parent(".cont").parent(".nums").siblings(".td-sum").children("em").html(danj);
                getcookie();
                var index = $.inArray(s_sid, arrsid); //sid在数组中的位置
                arrnum[index] = parseInt(nums); //原来的数量+新添加数量进行赋值
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                // console.log(arrnum);
                calcprice()
            })
            $('.cart-list ul').on('input', '#count', function() {
                var $reg = /^\d+$/g;
                var nums = $(this).val();
                if (!$reg.test(nums)) {
                    $(this).val(1);
                    nums = 1;
                }
                var s_sid = $(this).parent(".cont").parent(".nums").parent("li").attr("class");
                var danj = parseFloat($(this).parent(".cont").parent(".nums").siblings(".td-price").children(".price-line").children("em").html() * nums).toFixed(2);
                $(this).parent(".cont").parent(".nums").siblings(".td-sum").children("em").html(danj);
                getcookie();
                var index = $.inArray(s_sid, arrsid); //sid在数组中的位置
                arrnum[index] = parseInt(nums); //原来的数量+新添加数量进行赋值
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                calcprice()
            })

            //全选
            //1.点击全选按钮
            //1.点击全选按钮
            // var inputs = $('input').not('.all') //除了全选按钮之外的input
            // $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
            $('#allsel').on('change', function() {
                $('.cart-list ul li:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('#allsel').prop('checked', $(this).prop('checked'));
                $('#cart-all').prop('checked', $(this).prop('checked'));
                calcprice() //计算总价
            });
            $('#cart-all').on('change', function() {
                $('.cart-list ul li:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('#cart-all').prop('checked', $(this).prop('checked'));
                $('#allsel').prop('checked', $(this).prop('checked'));
                calcprice() //计算总价
            });
            var $inputs = $('.cart-list ul li:visible').find(':checkbox');
            $('.cart-list ul').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                // getcookie();

                // var s_sid = $(this).parent(".cont").parent(".nums").parent("li").attr("class");
                if ($('.cart-list ul li:visible').find(':checkbox').length === $('.cart-list ul li:visible').find('input:checked').size()) {
                    $('#allsel').prop('checked', true);
                    $('#cart-all').prop('checked', true);
                } else {
                    $('#allsel').prop('checked', false);
                    $('#cart-all').prop('checked', false);
                }
                calcprice()
            });
            /* $('.cart-list ul').on('change', '#sel-check', function() {
                console.log($(this).prop('checked'));
                getcookie();

                if ($(this).prop('checked')) {
                    console.log($(this).parent("li").attr("class"));
                    var s_sid = $(this).parent("li").attr("class");
                    var index = $.inArray(s_sid, arrsid); //sid在数组中的位置
                }
            }) */
            // 计算总价--使用次数很多--函数封装

            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.cart-list ul li:visible').each(function(index, ele) {
                    // console.log($(ele).find('#sel-check').prop('checked'));
                    if ($(ele).find('#sel-check').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.cont #count').val());
                        $count += parseFloat($(ele).find('.td-sum em').html());
                    }
                });
                $('.now-select-goods').find('b').html($sum);
                $('#cart1PayAmount').html($count.toFixed(2));
            }


            // $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
            function getcookie() {
                // if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                // status = $.cookie('cookiesta').split(','); //获取cookie的数量，存放到数组中。
                // } else { //cookie不存在
                // arrsid = [];
                // arrnum = [];
                // status = [];
                // }
                // }
            }

            //删除
            function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
                let $index = -1; //删除的索引位置
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                // jscookie.add('cookiesid', arrsid, 10);
                // jscookie.add('cookienum', arrnum, 10);
            }
            $('.cart-list ul').on('click', '.td-op a', function() {
                // console.log($(this).parent(".td-op").parent("li").attr("class"));
                getcookie();
                var s_sid = $(this).parent(".td-op").parent("li").attr("class");
                if (window.confirm('你确定删除吗?')) {
                    $(this).parents('.cart-list ul li').remove();
                    delcookie(s_sid, arrsid);
                    calcprice();
                }
            })
            $('.del a').on('click', function() {
                // console.log(1);
                getcookie();
                // var s_sid = $(this).parent(".td-op").parent("li").attr("class");
                if (window.confirm('你确定要全部删除吗?')) {
                    $('.cart-list ul li:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                            $(this).remove();
                            // console.log($(this).attr("class"));
                            delcookie($(this).attr("class"), arrsid);
                            // delcookie($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    calcprice();
                    // calcprice(); //计算总价
                }
            })

        }(),
        login: ! function() {
            if (sessionStorage.getItem('username')) {
                $('.loginname').html('亲爱的' + sessionStorage.getItem('username') + '用户');
            }
        }()
    }
})