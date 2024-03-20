<?php
include './connection.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $conn->prepare("SELECT email FROM user WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$emailExists = $stmt->fetch(PDO::FETCH_ASSOC);

if ($emailExists) {

}
else{
    echo'<script>alert("Email não cadastrado!"); window.location.href="http://localhost/RocketKids/login.html"</script>';

};

?>