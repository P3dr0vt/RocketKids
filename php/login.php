<?php
include './connection.php';

if (!isset($_REQUEST['email']) || !isset($_REQUEST['senha'])) {
    $response = array('status' => 'error', 'message' => 'Campos não preenchidos corretamente');
    echo json_encode($response);
    exit;
}

$email = $_REQUEST['email'];
$password = $_REQUEST['senha'];

$user_consult = $conn->prepare("SELECT * FROM user WHERE email = :email");
$user_consult->bindParam(":email", $email, PDO::PARAM_STR);
$user_consult->execute();
$user = $user_consult->fetch();

if ($user) {
    if (password_verify($password, $user["password"])) {
        session_start();
        $_SESSION['name'] = $user['name'];
        $_SESSION['email'] = $user['email'];
        $response = array('status' => 'success', 'redirect' => 'home.php');
        echo json_encode($response);
        exit;
    } else {
        $response = array('status' => 'error', 'message' => 'Senha incorreta!');
        echo json_encode($response);
        exit;
    }
} else {
    $response = array('status' => 'error', 'message' => 'Usuário não cadastrado!');
    echo json_encode($response);
    exit;
}

?>
