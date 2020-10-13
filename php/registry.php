<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registry1 where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    echo 111;
    $username = $_POST['phone'];
    $password = sha1($_POST['password']);
    $conn->query("insert registry1 values(default,'$username','$password',NOW())");
    header('location:http://10.31.163.207/js/suningitem_test/src/login.html');
}
