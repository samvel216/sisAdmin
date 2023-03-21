<?php
use PHPMailer/PHPMailer/PHPMailer;
use PHPMailer/PHPMailer/Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setForm('donad11@i.ua', 'Самвел');

$mail->addAddress('donadsamvel@gmail.com');

$mail->Subject = 'Приветики пистолетики';

// $hand = 'Правая';
// if($_POST['hand'] == "left") {
//     $hand = "Левая";
// }
$body = '<h1>Новая заявка</h1>';
$body = '<p>'.$_POST['name']'</p>';
$body = '<p>'.$_POST['email']'</p>';
$body = '<p>'.$_POST['phone']'</p>';
$body = '<p>'.$_POST['message']'</p>';

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}
   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
   ?>


