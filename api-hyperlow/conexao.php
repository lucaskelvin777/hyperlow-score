<?php
function connection(){
  $username = "";
  $password = "";
  $pdo = new PDO('mysql:host=localhost;dbname=hyperlow', $username, $password);
  return $pdo;
}

  
