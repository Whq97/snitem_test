define([], function() {
    return {
        render: ! function() { //渲染
            let list = $('.tab-content ul');
            $.ajax({
                url: 'http://10.31.163.207/js/suningitem_test/php/taobaodata.php',
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
            })
            $('.search-keyword').on('change', function() {
                console.log(1);
                $('.g-ac-results ul li').each(function(index, element) {
                    $(this).on('click', function() {
                        console.log(1);
                        let con = $('.g-ac-results ul li').eq(index).html();
                        $('.search-keyword').val(con);
                        $('.g-ac-results').hide();
                        $('.s-close').on('click', function() {
                            $('.g-ac-results').hide();
                        })
                    })
                })
            })

            //失去焦点
            // $('.search-keyword').on('blur', function() {
            //     if (!$('.g-ac-results ul li')) {
            //         console.log(1);
            //         $('.g-ac-results').hide();
            //     }
            //     //     $('.g-ac-results').hide();
            // })

            $('.search-keyword').on('input', function() {
                if ($('.search-keyword').val() == '') {
                    $('.g-ac-results').hide();
                } else {
                    $('.g-ac-results').show();
                }
            })

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


        }(),
        lunbou: ! function() { //轮播图
            class Lunbo {
                constructor() {
                    this.lunbo = $('.banner-wrapper');
                    this.piclist = $('.banner ul li');
                    this.btnlist = $('.page-item');
                    this.leftarrow = $('.btn-left');
                    this.rightarrow = $('.btn-right');
                    this.index = 0;
                    this.timer = null;
                }
                init() {
                    // console.log($('.banner-nav a'));
                    // console.log(this.lunbo);
                    // console.log(this.piclist);
                    // console.log(this.btnlist);
                    // 1.鼠标移入lunbo,显示左右箭头，反之隐藏
                    //事件里面的this指向当前操作的元素对象。方法里面的this指向实例。
                    let _this = this; //实例对象
                    this.lunbo.hover(function() {
                        _this.leftarrow.show();
                        _this.rightarrow.show();
                        // 5.鼠标移入lunbo,停止。
                        clearInterval(_this.timer);
                    }, function() {
                        _this.leftarrow.hide();
                        _this.rightarrow.hide();
                        //继续轮播
                        _this.timer = window.setInterval(function() {
                            _this.rightarrowclick();
                        }, 3000);
                    });
                    // 2.点击对应得小圆圈，当前点击的小圆圈添加类名，其他的隐藏（和小圆圈对应的图片显示）
                    this.btnlist.on('click', function() {
                        _this.index = $(this).index(); //将当前按钮对应的索引存储下来
                        _this.tabswitch();
                    });

                    //3.点击左右箭头进行图片切换
                    this.rightarrow.on('click', function() {
                        _this.rightarrowclick();
                    });

                    this.leftarrow.on('click', function() {
                        _this.leftarrowclick();
                    });

                    //4.自动轮播
                    this.timer = window.setInterval(function() {
                        _this.rightarrowclick();
                    }, 3000);
                }

                tabswitch() {
                    this.btnlist.eq(this.index).addClass('current').siblings().removeClass('current');
                    this.piclist.eq(this.index).stop(true).animate({
                        opacity: 1
                    }).siblings().stop(true).animate({
                        opacity: 0
                    });
                }

                rightarrowclick() {
                    this.index++;
                    if (this.index > this.btnlist.size() - 1) {
                        this.index = 0;
                    }
                    this.tabswitch();
                }

                leftarrowclick() {
                    this.index--;
                    if (this.index < 0) {
                        this.index = this.btnlist.size() - 1;
                    }
                    this.tabswitch();
                }
            }
            new Lunbo().init();
        }(),
        lunbou1: ! function() {
            function Taobao() {
                this.banner = $('.content-box');
                this.list = $('.content-box ul');
                this.picli = $('.content-box ul li'); //6张图
                // this.picbtn = document.querySelectorAll('.banner ol li'); //5个圆圈
                // this.leftarrow = document.querySelector('#left');
                // this.rightarrow = document.querySelector('#right');
                this.index = 0; //存储索引的变量。
                this.timer = null;
            }

            Taobao.prototype.init = function() {
                this.liwidth = this.picli[0].offsetWidth;
                console.log(this.banner);
                console.log(this.list);
                console.log(this.picli);
                // this.list.style.width = this.picli.length * this.picli[0].offsetWidth + 'px';
                this.list.attr({ top: this.picli.size() * this.picli[0].attr("height") });
                //给每个小圆点添加点击事件
                // for (let i = 0; i < this.picbtn.length; i++) {
                //     this.picbtn[i].onclick = () => {
                //         this.index = i - 1;
                //         this.tabswitch();
                //     }
                // }
            }

            Taobao.prototype.tabswitch = function() {
                this.index++;
                if (this.index === this.picbtn.length + 1) {
                    this.index = 1;
                    this.list.style.left = 0 + 'px';
                }
                if (this.index === -1) {
                    this.list.style.left = -this.liwidth * this.picbtn.length + 'px';
                    this.index = this.picbtn.length - 1;
                    console.log(this.list.style.left, this.liwidth * 5);
                }
                for (let i = 0; i < this.picbtn.length; i++) {
                    this.picbtn[i].className = '';
                }
                if (this.index === this.picbtn.length) {
                    this.picbtn[0].className = 'active';
                } else {
                    this.picbtn[this.index].className = 'active';
                }
                bufferMove(this.list, {
                    left: -this.index * this.liwidth
                });

            }
            new Taobao().init();
        },
        login: ! function() {
            if (sessionStorage.getItem('username')) {
                $('.loginname').html('亲爱的' + sessionStorage.getItem('username') + '用户');
            }
        }()
    }
});