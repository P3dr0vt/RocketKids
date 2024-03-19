<?php
include './connection.php';

try {
    $jsonUser = file_get_contents("php://input");
    $data = json_decode($jsonUser, true);
    $name = $data['nome'];
    $email = $data['email'];
    $password = $data['senha'];
    $passwordHashed = password_hash($password, PASSWORD_DEFAULT);

    $checkstmt = $conn->prepare("SELECT email FROM user WHERE email = ?");
    $checkstmt->bindParam(1, $email);
    $checkstmt->execute();
    $emailExists = $checkstmt->fetch();

    if ($emailExists) {
        echo 'Este email já está cadastrado!';
    } else {
        $stmt = $conn->prepare("INSERT INTO user (name, email, password) VALUES (:name, :email, :password)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $passwordHashed);
        $stmt->execute();
        echo 'Cadastro realizado com sucesso!';
    }
} catch (PDOException $e) {
    echo 'Erro: ' . $e->getMessage();
}
?>
