<?php

 class Rest {
	
	public $servername = "127.0.0.1";
	public $username = "root";
	public $password = "123456";
	public $db = "arshdb";
	public $_code = 200;
	public $_content_type = "application/json";
	
	public function __construct(){
			$this->inputs();
		}
	
	public function processApi(){
		
		
		
		//$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
		//echo $func;
		//echo $_REQUEST['x'];


$func = explode('/', trim($_SERVER['PATH_INFO'],'/'));
echo $func;
//$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
		if((int)method_exists($this,$func) > 0)
		    {
			$this->$func();
			echo "hi";
			}
		else
		{
			$this->response('',404); // If the method not exist with in this class "Page not found".
			echo "bbhi";
		}
	}
	
	public function users()
	{
		// Create connection
		
		$mysqli = mysqli_connect($this->servername, $this->username, $this->password, $this->db);
		
		// Check connection
		if (!$mysqli) {
			die("Connection failed: " . mysqli_connect_error());
		}
		//echo "Connected successfully";
						
		$query="SELECT * from users";
		$r = $mysqli->query($query) or die($mysqli->error.__LINE__);
		if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				 }
		
		 //echo "sdsd";
		 
		   $this->response($this->json($result), 200);  // send user details
		}
	}
	
	
	
	private function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
	
	 private function response($data,$status){
		$_code = ($status)?$status:200;
		$this->set_headers();
		echo $data;
		exit;
	}
	
	 private function set_headers(){
		header("HTTP/1.1 200 OK");
		header("Content-Type:".$this->_content_type);
	
	}
	
	private function get_referer(){
		return $_SERVER['HTTP_REFERER'];
	}
	
	public function get_request_method(){
		
		return $_SERVER['REQUEST_METHOD'];
	}
	
	private function inputs(){
		switch($this->get_request_method()){
			case "POST":
				$this->_request = $this->cleanInputs($_POST);
				break;
			case "GET":
			case "DELETE":
				$this->_request = $this->cleanInputs($_GET);
				break;
			case "PUT":
				parse_str(file_get_contents("php://input"),$this->_request);
				$this->_request = $this->cleanInputs($this->_request);
				break;
			default:
				$this->response('',406);
				break;
		}
	}		
		
	private function cleanInputs($data){
		$clean_input = array();
		if(is_array($data)){
			foreach($data as $k => $v){
				$clean_input[$k] = $this->cleanInputs($v);
			}
		}else{
			if(get_magic_quotes_gpc()){
				$data = trim(stripslashes($data));
			}
			$data = strip_tags($data);
			$clean_input = trim($data);
		}
		return $clean_input;
	}		
	
	
}
	


	$api = new Rest;
        
        $api->processApi(); 
	
	//$api->users();
?>

