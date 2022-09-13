<?php
require_once("../config/configOrigin.php");
class ConDB
{
    public $conexion;
    public function __construct()
    {
        try {

            $this->conexion = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASS, DB_NAME);
        } catch (Exception $e) {
            echo ($e->getMessage());
        }
    }
}

$miObjeto = new ConDB();
