<?php
require_once '../config/util.php';

if (!empty($_POST)) {
  $contra = ($_POST['contra']);
  $_POST['contra'] = md5($contra);
  $recontra = ($_POST['recontra']);
  $_POST['recontra'] = md5($recontra);

  try {
    $usuario = new Usuario($_POST);
    //$usuario2 = Usuario::usuario();//objeto vacio
    $info = $usuario->registrarUsuario();
    if ($info) {
      echo ($info);}
  } catch (Exception $e) {
    echo ($error = $e->getMessage());
  }
}
