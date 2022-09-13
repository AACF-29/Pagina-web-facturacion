<?php
require_once '../config/util.php';

if(isset($_POST['usuario']) && $_POST['contra']){
    try {
        $usuario = new Usuario($_POST);
        $ini = $usuario->inicioSesion();
        if (isset($_SESSION['logged_in'])) {
          $ini = true;
        }
        echo json_encode($ini);
      } catch (Exception $e) {
        echo ($error = $e->getMessage());
      }
}