define([], function() {
    return {
        render: ! function() {
            //1.获取sid
            console.log(location.href);
            console.log(location.search);
            let sid = location.search.substring(1).split('=')[1];
            console.log(sid);
            if (!sid) {
                sid = 1;
            }
            // 2.将获取sid传给后端，后端获取sid，将对应的数据返回给前端。
            $.ajax({
                url: 'http://192.168.11.7/js/suningitem_test/php/getsid.php',
                data: {
                    datasid: sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                $('.imgzoom-main img').attr('src', data.url);
                $('.imgzoom-daf img').attr('src', data.url);
                $('.proinfo-title h3').html(data.title);
                $('.price p span').html(parseInt(data.price));
                $('.price p .xsd').html(data.price.substr(-3));
                console.log(data.piclisturl.split(','));
                let picarr = data.piclisturl.split(',');
                let strhtml = '';
                $.each(picarr, function(index, value) {
                    strhtml += `
                        <li class="cur">
                            <a href="#">
                            <img src="${value}" alt="">
                            </a>
                        </li>`;
                })
                $('.imgzoom-thumb ul').html(strhtml);
            })


            //3.网页效果 - 放大镜
            class Scale {
                constructor() { //构造函数
                    //1.获取元素
                    this.scale = $('.proinfo-left');
                    this.spic = $('.imgzoom-main');
                    this.sf = $('.imgzoom-xiaof');
                    this.bf = $('.imgzoom-daf');
                    this.bpic = $('.bpic');
                }
                init() {
                    //1.鼠标移入小图，小放和大放显示，否则隐藏
                    let _this = this;
                    this.spic.hover(function() { //移入
                        _this.sf.css("visibility", "visible");
                        _this.bf.css("visibility", "visible");
                        _this.spic.mousemove(function(ev) {
                            var ev = ev || window.event;
                            // console.log(ev.clientX);
                            // console.log(parseInt(_this.sf.css('width')));
                            let left = ev.pageX - _this.spic.offset().left - parseInt(_this.sf.css('width')) / 2;
                            let top = ev.pageY - _this.spic.offset().top - parseInt(_this.sf.css('height')) / 2;
                            // console.log(parseInt(_this.sf.css('height')));
                            // console.log(top);
                            // console.log(left);
                            // console.log(_this.spic.offset());
                            if (left <= 0) {
                                left = 0;
                            } else if (left >= parseInt(_this.spic.css('width')) - parseInt(_this.sf.css('width'))) {
                                left = parseInt(_this.spic.css('width')) - parseInt(_this.sf.css('width'));
                            }
                            if (top <= 0) {
                                top = 0;
                            } else if (top >= parseInt(_this.spic.css('height')) - parseInt(_this.sf.css('width'))) {
                                top = parseInt(_this.spic.css('height')) - parseInt(_this.sf.css('height'));
                            }
                            // console.log(top, left);
                            _this.sf.css({ "top": top, "left": left })
                                //求比例
                            this.bili = parseInt(_this.bpic.css('width')) / parseInt(_this.spic.css('width'));
                            // console.log(parseInt(_this.bpic.css('width')));
                            // console.log(parseInt(_this.spic.css('width')));
                            // console.log(this.bili);
                            _this.bpic.css({ "top": -this.bili * top, "left": -this.bili * left })
                                // console.log(-this.bili * top);
                                // console.log(-this.bili * left);
                                // this.bpic.style.left = -this.bili * left + 'px';
                                // this.bpic.style.top = -this.bili * top + 'px';
                        })

                    }, function() { //移出
                        _this.sf.css("visibility", "hidden");
                        _this.bf.css("visibility", "hidden");
                    })
                }
            }
            new Scale().init();

            // 4. 购物车(cookie或者本地存储)。
            // 购物车的思路。
            // 4.1.详情页通过cookie存储商品的信息 - details.html - > (存储)
            // 存储商品的数量和商品的sid(新建两个数组， 以数组的形参存储)
            let arrsid = []; //商品的sid
            let arrnum = []; //商品的数量

            //第一次购买商品创建商品列表(cart.html)，多次不需要创建，数量累计。
            //通过判断确定是第一次还是多次。
            //直接获取cookie - 如果cookie里面存在当前的商品的sid，商品不是第一次。
            //通过jquery下面的cookie插件，进行cookie读取删 - $.cookie()

            //提前设定cookie的键值
            //目的就是判断商品是第一次添加进购物车，还是多次。
            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                    arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                } else { //cookie不存在
                    arrsid = [];
                    arrnum = [];
                }
            }
            let num = $('#count').val();
            $('.jia').on('click', function() {
                num++;
                $('#count').val(num);
            })
            $('.jian').on('click', function() {
                num--;
                if (num <= 1) {
                    num = 1;
                }
                $('#count').val(num);

            })

            $('.togoodscart').on('click', function() {
                getcookie(); //如果cookie存在，取到cookie的值，并且变成了数组。
                //如果arrsid里面存在当前商品的sid，说明商品已经存在，否则商品是第一次购买。
                //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
                //value:查找的值
                //array:数组
                if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
                    arrsid.push(sid); //添加当前商品的sid
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                    arrnum.push($('#count').val()); //添加商品的数量
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                } else { //存在,商品的数量累加
                    //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
                    let index = $.inArray(sid, arrsid); //sid在数组中的位置
                    let num = parseInt(arrnum[index]); //sid对应的数量
                    //原来的数量+新添加数量，一起存入cookie
                    arrnum[index] = num + parseInt($('#count').val()); //原来的数量+新添加数量进行赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                }

                alert('按钮被点击了');
            });
        }()
    }
})