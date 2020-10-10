define([], function() {
    return {
        render: ! function() { //渲染
            let list = $('.tab-content ul');
            $.ajax({
                url: 'http://192.168.11.7/js/suningitem_test/php/taobaodata.php',
                dataType: 'json'
            }).done(function(data) {
                //进行渲染结构代码。
                // console.log(data);
                let strhtml = '';
                $.each(data, function(index, value) {
                    // console.log(value);
                    strhtml += `
                    <li>
                    <a href="#">
                        <img class="lazy" data-original="${value.url}" alt="" width="190" height="190">
                        <p class="title">${value.title}</p>
                        <p class="price-box">
                            <span class="price">
                                <i>¥</i>
                                <em>${value.price}</em>
                            </span>
                            <span class="refprice">
                                <i>¥</i>
                                <em>66.60</em>
                            </span>
                        </p>
                        <p class="cxIcon">
                            <span>${value.activity}</span>
                        </p>
                    </a>
                </li>
                `;
                });
                list.html(strhtml);
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });
        }(),
        floatbar: ! function() {
            function scroll() {
                let top = $(window).scrollTop();
                // console.log(top);
                if (top >= 500 && top <= 5500) {
                    $('.floatbar-w').show();
                } else {
                    $('.floatbar-w').hide();
                }
                $('.louceng').each(function(index, elemt) {
                    let loucengtop = $(this).offset().top;
                    if (loucengtop >= top) {
                        // console.log(this);
                        $('#floatbar1 ul li').removeClass('active');
                        // console.log($(this));
                        $('#floatbar1 ul li').eq(index).addClass('active');
                        return false;
                    }
                });
                // $('.louceng').each(function(index, element) {
                //     let loucengtop = $(this).offset().top; //每一个楼层的top值
                //     if (loucengtop >= top) {
                //         $('#loutinav li').removeClass('active');
                //         $('#loutinav li').eq($(this).index()).addClass('active');
                //         return false; //返回 'false' 将停止循环，有一个满足条件终止循环。
                //     }
                // });
            }
            scroll();
            $(window).on('scroll', function() {
                scroll();
            })
            $('#floatbar1 ul li').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                let loucengtop = $('.louceng').eq($(this).index()).offset().top; //获取楼梯对应楼层固定的top值。
                $('html').animate({
                    scrollTop: loucengtop //运动不仅可以改变css，还可以设置html属性
                });
            });
            $('.to-top').on('click', function() {
                $('html').animate({
                    scrollTop: 0 //运动不仅可以改变css，还可以设置html属性
                });
            });
        }(),
        topeffect: ! function() { //top效果
            $('.ng-fix-bar').hide();

            function top() {
                let $top = $(window).scrollTop(); //滚动条顶部的偏移
                if ($top >= 1000) {
                    $('.ng-fix-bar').show();
                } else {
                    $('.ng-fix-bar').hide();
                }
            }
            top();
            $(window).on('scroll', top);
        }(),
        towmenu: ! function() {
            // 1.鼠标经过li，cartlist显示，否则隐藏。
            $('.index-list li').hover(function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('.index-sort-detail').show();
                //3.切换li元素，cartlist里面内容跟着切换(索引匹配)
                $('.index-sort-detail .item').eq($(this).index()).show().siblings().hide();

                //4.切换li元素，cartlist始终全部显示。
                $(window).on('scroll', function() {
                    let bannertop = $('.index-sort-list-box').offset().top; //banner的top值
                    let scrolltop = $(window).scrollTop(); //滚动条的top值。
                    if (scrolltop > bannertop) {
                        $('.index-sort-detail').css({
                            top: scrolltop - bannertop
                        });
                    } else {
                        $('.index-sort-detail').css({
                            top: 0
                        });
                    }
                });

            }, function() {
                $('.index-sort-detail').hide();
            });
            //2.cartlist显示，鼠标经过cartlist，显示自身，否则隐藏。
            $('.index-sort-detail').hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });
        }(),
        // tb: function() {
        //     let search = $('.search-keyword');
        //     let list = $('.g-ac-results ul');

        //     function taobao(data) {
        //         console.log(data.words);
        //         let arr = data.words;
        //         let str = '';
        //         for (let value of arr) {
        //             str += `
        //                 <li>${value.keyword}</li>
        //             `;
        //         }
        //         list.html(str);
        //     }
        //     return taobao;
        // },
        searchk: ! function() {
            // $('.search-keyword').val('华为/HUAWEI nova 7');
            $('.search-keyword').attr({
                placeholder: "华为/HUAWEI nova 7"
            })
            $('.search-keyword').on('click', function() {
                $('.g-ac-results').show();
                // $('.search-keyword').val('');
                $('.search-keyword').attr({
                    placeholder: ""
                })
                $('.g-ac-results ul li').each(function(index, element) {
                    $(this).on('click', function() {
                        console.log($('.g-ac-results ul li').eq(index).html());
                    })
                })
                console.log($('.g-ac-results ul> li'));
            })

            // $('.search-keyword').on('blur', function() {
            //     $('.g-ac-results').hide();
            // })
            $('.search-keyword').on('input', function() {
                if ($('.search-keyword').val() == '') {
                    $('.g-ac-results').hide();
                } else {
                    $('.g-ac-results').show();
                }
            })
            if ($('.s-close')) {
                $('.s-close').on('click', function() {
                    $('.g-ac-results').hide();
                })
            }

            //搜索数据渲染
            let search = $('.search-keyword');
            // let list = $('.g-ac-results ul');

            // function taobao(data) {
            //     console.log(data.words);
            //     let arr = data.words;
            //     let str = '';
            //     for (let value of arr) {
            //         str += `
            //             <li>${value.keyword}</li>
            //         `;
            //     }
            //     list.html(str)
            // }
            search.on('input', function() {
                    let scriptelement = $('#scriptelement');
                    if (scriptelement) { //如果存在script元素，删除
                        scriptelement.remove();
                    }
                    let sr = 'https://ds.suning.com/ds/his/new/-' + $(this).val() + '-0-1_0-taobao.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&_=1602328849162'
                    $('body').append('<script id="scriptelement" src="' + sr + '"></script>');
                    // this.tb();
                })
                // return taobao;
                //<script id="scriptelement" src="https://ds.suning.com/ds/his/new/-111111-0-1_0-taobao.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&amp;_=1602328849162"></script>
                //<script src="https://ds.suning.com/ds/his/new/-1-0-1_0-taobao.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&amp;_=1602328849162" id="scriptelement"></script>            
                // search.oninput = function() {
                //     //随着用户的输入，数据接口发送变化。
                //     let scriptelement = document.querySelector('#scriptelement');
                //     //如果存在上面的元素对象，带有此id名的script已经创建了。
                //     if (scriptelement) { //如果存在script元素，删除
                //         document.body.removeChild(scriptelement);
                //     }
                //     let cS = document.createElement('script');
                //     //autoComplateCallback_184b31b125a59d8c382d3d8382d23350
                //https://ds.suning.com/ds/his/new/-nishi-0-1_0-%E4%BD%A0%E5%A5%BD.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&_=1602328849162
                //     // https://ds.suning.com/ds/his/new/-%E8%A1%A3%E6%9C%8D-0-1_0-taobao.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&_=1602328849162
                //     cS.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1600326651998_256&callback=taobao';
                //     cS.id = 'scriptelement';
                //     document.body.appendChild(cS);
                // };
                // $('.g-ac-results ul').on('click', 'nihao', function() {
                //     console.log($('.g-ac-results ul li').eq($(this).index()));;
                //     console.log(1);
                // })


        }()
    }
});