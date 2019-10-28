<?php

header('Content-Type: application/json');

session_start();

$id = session_id();

$message = file_get_contents("php://input");

if ($message == 200) {
    $message = "--------------------------------------------------------------\nPronto para começar a partida."
        ."\n\nUNIQUE_ID: {$_SERVER['UNIQUE_ID']},"
        ."\nHTTP_USER_AGENT: {$_SERVER['HTTP_USER_AGENT']},"
        ."\nREMOTE_ADDR: {$_SERVER['REMOTE_ADDR']},"
        ."\nREMOTE_PORT: {$_SERVER['REMOTE_PORT']}"
        ."\n--------------------------------------------------------------\n\n";
} else {
    $message = json_encode(json_decode($message, true), JSON_PRETTY_PRINT);
}

file_put_contents("logs/{$id}.log", print_r($message, true) . "\r\n\r\n", FILE_APPEND);

?>