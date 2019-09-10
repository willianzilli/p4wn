<?php

session_start();

$message = file_get_contents("php://input");

if ($message == 200)
    $message = "--------------------------------------------------------------\nPronto para começar a partida."
        ."\n\nUNIQUE_ID: {$_SERVER['UNIQUE_ID']},"
        ."\nHTTP_USER_AGENT: {$_SERVER['HTTP_USER_AGENT']},"
        ."\nREMOTE_ADDR: {$_SERVER['REMOTE_ADDR']},"
        ."\nREMOTE_PORT: {$_SERVER['REMOTE_PORT']}"
        ."\n--------------------------------------------------------------\n\n";

file_put_contents("logs/{$_COOKIE['PHPSESSID']}.log", print_r($message, true), FILE_APPEND);

?>