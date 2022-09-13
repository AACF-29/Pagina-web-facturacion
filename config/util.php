<?php
function autocargador($clase)
{
    $file = "../modelo/" . $clase . ".php";
    require_once($file);
}

spl_autoload_register('autocargador');
