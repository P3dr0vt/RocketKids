<?php
include './connection.php';

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonUser = file_get_contents("php://input");
    $data = json_decode($jsonUser, true);
    $email = $data['email'];
    $senha = $data['senha'];

    // Consulta o banco de dados para obter o usuário com o email fornecido
    $stmt = $conn->prepare("SELECT email, password FROM user WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $emailExists = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($emailExists) {
        // Verifica se a senha fornecida corresponde ao hash de senha armazenado no banco de dados
        if (password_verify($senha, $emailExists['password'])) {
            session_start();
            $_SESSION['email'] = $emailExists['email'];
            // Retorna uma resposta para o cliente (ex: login realizado com sucesso)
            echo 'Login realizado com sucesso!';
        } else {
            // Senha incorreta
            echo 'Senha incorreta!';
        }
    } else {
        // Email não cadastrado
        echo 'Email não cadastrado!';
    }
} else {
    // Método de requisição inválido
    echo 'Método de requisição inválido!';
}
?>
