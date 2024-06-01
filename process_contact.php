<?php

require('conn.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

function sendEmail($fname, $contact_num, $email, $subject, $message){
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'leemichael2992@gmail.com';             //SMTP username
    $mail->Password   = 'fveefpscivwvtrzr';                     //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('from@example.com', 'Reset Password');
    $mail->addAddress('imroshni3@gmail.com');                   //Add a recipient

    //Content
    $mail->isHTML(true);                                        //Set email format to HTML
    $mail->Subject = 'Contact Form'.$subject;

    $mail_template="Name: $fname<br>Email: $email<br>Contact Number: $contact_num<br><br>Message: $message" ;

    $mail->Body    = $mail_template;

    $mail->send();
    echo 'Message has been sent';
}



if(isset($_POST['submitContact'])){
    $fname= $_POST['fname'];
    $contact_num= $_POST['contact_num'];
    $email= $_POST['email'];
    $subject= $_POST['subject'];
    $message= $_POST['message'];
    
    sendEmail($fname, $email, $contact_num, $company, $message);
    header('location:index.php?q=msg_sent');
}
?>