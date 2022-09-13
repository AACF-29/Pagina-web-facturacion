<?php
//require_once("ConDB.php");
require_once '../config/util.php';

class Usuario
{
	private $_con;
	private $trimmed_data;
	private $documento;
	private $nombres;
	private $apellidos;
	private $direccion;
	private $correo;
	private $usuario;
	private $contra;
	private $recontra;
	private $ciudad;


	public function __construct(array $data)
	{
		$db = new ConDB(); //instancia de un objeto Conexion DB
		$this->_con = $db->conexion;
		if (!empty($data)) {
			//validar que elementos del arreglo vienen vacias
			$this->trimmed_data = array_map('trim', $data);
			if(!empty($this->trimmed_data['documento']))$this->documento = $this->trimmed_data['documento'];
			//$this->dni = $data['dni'];
			if(!empty($this->trimmed_data['nombres']))$this->nombres = $this->trimmed_data['nombres'];
			if(!empty($this->trimmed_data['apellidos']))$this->apellidos = $this->trimmed_data['apellidos'];
			if(!empty($this->trimmed_data['direccion']))$this->direccion = $this->trimmed_data['direccion'];
			if(!empty($this->trimmed_data['correo']))$this->correo = $this->trimmed_data['correo'];
			if(!empty($this->trimmed_data['usuario']))$this->usuario = $this->trimmed_data['usuario'];
			if(!empty($this->trimmed_data['contra']))$this->contra = $this->trimmed_data['contra'];
			if(!empty($this->trimmed_data['recontra']))$this->recontra = $this->trimmed_data['recontra'];
			if(!empty($this->trimmed_data['ciudad']))$this->ciudad = $this->trimmed_data['ciudad'];
		} else {
			throw new Exception('Error en arreglo vacio');
		}
	}

	//Crear un objeto vacio
	static function usuario()
	{
		return new self(array(''));
	}

	public function registrarUsuario()
	{
		$this->compararPass();

		$query = "INSERT INTO datos
			VALUES ($this->documento, '$this->nombres'
			, '$this->apellidos', '$this->direccion'
			, '$this->correo' , '$this->usuario'
			, '$this->contra' , '$this->ciudad'
			)";
		//echo ($query);
		if (mysqli_query($this->_con, $query)) {
			mysqli_close($this->_con);
			$mensaje = ("Se registró");
			return $mensaje;
		} else {
			throw new Exception('Error en registro');
		}
	}

	public function compararPass()
	{
		if ($this->contra !== $this->recontra) {

			throw new Exception('Error en comparar contraseñas');
		}
	}

	public function cerSesion()
	{
		session_unset();
		session_destroy();
		header('Location: ../index.html');
	}
	public function inicioSesion()
	{
		//escapar datos
		$usuario = mysqli_real_escape_string($this->_con,  $this->trimmed_data['usuario']);
		$contra = mysqli_real_escape_string($this->_con,  $this->trimmed_data['contra']);

		if ((!$usuario) || (!$contra)) {
			throw new Exception('Faltan Campos-Inicio de Sesión');
		}

		$query = "SELECT * 
			FROM datos 
			where usuario = '$usuario' 
			and contra = '$contra'";
			//echo $query;
		$resultado = mysqli_query($this->_con, $query);
		$dato = mysqli_fetch_assoc($resultado);
		$contadorDato = mysqli_num_rows($resultado);
		mysqli_close($this->_con);
		//echo $contadorDato;
		if ($contadorDato == 1) {
			$_SESSION = $dato;
			$_SESSION['logged_in'] = true;
			return true;
			//echo "Ingreso";
		} else {
			throw new Exception('Fallo la Sesión');
		}
	}
}
