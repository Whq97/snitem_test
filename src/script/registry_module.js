define([], function() {
    return {
        dianji: ! function() {
            $('.phone-field .input-box').on('click', function() {
                $('.phone-field .placeholder').hide();
                $('.phone-field .phone-box input').focus();
            })
            $('.password-field .input-box').on('click', function() {
                $('.password-field .placeholder').hide();
                $('.password-field .phone-box input').focus();
            })
            $('.phone-field .phone-box input').blur(function() {
                if ($('.phone-field .phone-box input').val() == '') {
                    $('.phone-field .placeholder').show();
                }
            })
            $('.password-field .phone-box input').blur(function() {
                if ($('.password-field .phone-box input').val() == '') {
                    $('.password-field .placeholder').show();
                }
            })
        }(),
        yanzheng: ! function() {
            let $user = $('#phone');
            let $usernameflag = true;
            var passflag = true;
            $user.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.163.207/js/suningitem_test/php/registry.php',
                    data: {
                        username: $user.val()
                    }
                }).done(function(result) {
                    if ($('#phone').val() !== '') {
                        if (!result) { //不存在
                            var reg = /^1[3578]\d{9}$/;
                            if (reg.test($('#phone').val())) {
                                $('.ok').show();
                                $('.phone-field .aliasTip').html('验证完成后可以使用该手机登录或找回密码').css('color', '#ccc');
                                $usernameflag = true;

                            } else {
                                $('.phone-field .aliasTip').html('该手机号格式有误').css('color', 'red');
                                $('.ok').hide();
                                $usernameflag = false;
                            }
                            $usernameflag = true;
                        } else {
                            $('.phone-field .aliasTip').html('该手机号已经注册').css('color', 'red');
                            $('.ok').hide();
                            $usernameflag = false;
                        }
                    } else {
                        $('.phone-field .aliasTip').html('手机号不能为空').css('color', 'red');
                        $('.ok').hide();
                        $usernameflag = false;
                    }
                })
            });
            $('#password').on('input', function() {
                if ($(this).val().length >= 8 && $(this).val().length <= 20) {
                    $('.password-field .aliasTip').hide();
                    $('.security-level').show();
                    var regnum = /\d+/g;
                    var reglower = /[a-z]+/g;
                    var regupper = /[A-Z]+/g;
                    var other = /[\W\_]+/g;
                    var count = 0; //统计字符的种类
                    if (regnum.test($(this).val())) {
                        count++;
                    }

                    if (reglower.test($(this).val())) {
                        count++;
                    }

                    if (regupper.test($(this).val())) {
                        count++;
                    }

                    if (other.test($(this).val())) {
                        count++;
                    }
                    switch (count) {
                        case 1:
                            $('.level1').css('background', '#fa0');
                            $('.level2').css('background', '#cacaca');
                            $('.level3').css('background', '#cacaca');
                            passflag = false;
                            break;
                        case 2:
                        case 3:
                            $('.level1').css('background', '#cacaca');
                            $('.level2').css('background', '#fa0');
                            $('.level3').css('background', '#cacaca');
                            passflag = true;
                            break;
                        case 4:
                            $('.level1').css('background', '#cacaca');
                            $('.level2').css('background', '#cacaca');
                            $('.level3').css('background', '#fa0');
                            passflag = true;
                            break;
                    }
                } else {
                    $('.password-field .aliasTip').html('密码长度有问题').css('color', 'red');
                    $('.password-field .aliasTip').show();
                    passflag = false;
                }
            })

            $('#password').on('blur', function() {
                if ($('#password').val() !== '') {
                    if (passflag) {
                        $('.password-field .aliasTip').hide();
                    }
                } else {
                    $('.password-field .aliasTip').html('密码不能为空').css('color', 'red');
                }
            })

            $('form').on('submit', function() {
                if ($user.val() == '') {
                    $('.phone-field .aliasTip').html('手机号不能为空').css('color', 'red');
                    $usernameflag = false;
                }
                if ($('#password').val() == '') {
                    $('.password-field .aliasTip').html('密码不能为空').css('color', 'red');
                    passflag = false;
                }
                if (!$usernameflag || !passflag) {
                    return false; //阻止提交
                }
            });
        }()
    }
})