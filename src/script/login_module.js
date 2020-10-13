define([], function() {
    return {
        dianji: ! function() {
            $('.username-box').on('click', function() {
                // console.log(1);
                $('.username-box .placehode').hide();
                $('.username-box #userName').focus();
            })
            $('.password-box').on('click', function() {
                // console.log(1);
                $('.password-box .placehode').hide();
                $('.password-box #userName').focus();
            })
            $('.username-box #userName').blur(function() {
                if ($('.username-box #userName').val() == '') {
                    $('.username-box .placehode').show();
                }
            })
            $('.password-box #userName').blur(function() {
                if ($('.password-box #userName').val() == '') {
                    $('.password-box .placehode').show();
                }
            })

            // if ($('.password-box #userName').val() !== '') {
            //     console.log(1);
            // }
            // $('.username-box #userName')
            $('.username-box #userName').on('input', function() {
                if ($('.username-box #userName').val() !== '') {
                    $('.username-box .clear').show();
                } else {
                    $('.username-box .clear').hide();
                }
            })
            $('.password-box #userName').on('input', function() {
                    if ($('.password-box #userName').val() !== '') {
                        $('.password-box .clear').show();
                    } else {
                        $('.password-box .clear').hide();
                    }
                })
                //清空表单
            $('.username-box .clear').on('click', function() {
                $('.username-box #userName').val('');
                $('.username-box .clear').hide();
            })
            $('.password-box .clear').on('click', function() {
                $('.password-box #userName').val('');
                $('.password-box .clear').hide();
            })
        }(),
        yanzheng: ! function() {
            $('.yhbtn .btn').on('click', function() {
                console.log(1);
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.163.207/js/suningitem_test/php/login.php',
                    data: {
                        user: $('#userName').val(),
                        pass: hex_sha1($('#password').val())
                    }
                }).done(function(result) {
                    if (result) {
                        // console.log(1);
                        location.href = "index1.html";
                        window.sessionStorage.username = $('#userName').val();
                    } else {
                        // $('.password').val('');
                        alert('用户名或者密码错误');
                    }
                });
            })
        }()
    }
})