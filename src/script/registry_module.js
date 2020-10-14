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
            let $user = $('.phone');
            let $usernameflag = true;
            $user.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.11.7/js/suningitem_test/php/registry.php',
                    data: {
                        username: $user.val()
                    }
                }).done(function(result) {
                    if (!result) { //不存在
                        $('span').html('√').css('color', 'green');
                        $usernameflag = true;
                    } else {
                        $('span').html('该用户名已经存在').css('color', 'red');
                        $usernameflag = false;
                    }
                })
            });

            $('form').on('submit', function() {
                if ($user.val() == '') {
                    $('span').html('用户名不能为空').css('color', 'red');
                    $usernameflag = false;
                }
                if (!$usernameflag) {
                    return false; //阻止提交
                }
            });
        }()
    }
})