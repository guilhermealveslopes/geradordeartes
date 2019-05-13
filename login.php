<?php

$user = '';
$pass = '';

if(!empty($_POST)) {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
}

if($user == "admin"
&& $pass == "admin")
{
        include("app.php");
}
else
{
    if(isset($_POST))
    {?>
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link rel="stylesheet" href="assets/css/login.css">
        <div class="app">

            <div class="bg"></div>

            <form method="POST" id="formLogin">
                <header>
                    <img src="assets/imgs/logo.png"">
                </header>

                <div class="inputs">
                    <input type="text" name="user" placeholder="Login">
                    <input type="password" name="pass" placeholder="Senha">

                </div>
            </form>

            <footer>
                <input class="connect" type="submit" value="Conectar">
            </footer>

        </div>
    <?}
}
?>

<script>

    jQuery(function($){
        $('.connect').on('click',function(){
            $("#formLogin").submit();
        })
    })

</script>