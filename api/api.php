<?php
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "127.0.0.1";
		const DB_USER = "aliuser";
		const DB_PASSWORD = "Alireza1354";
		const DB = "1sunshare";



		//private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
//echo $func;	
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		public function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$email = $this->_request['email'];		
			$password = $this->_request['pwd'];
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}
		
		public function customers(){	
			$query="SELECT * from customer";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0)
                        {
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				 }
                        
			   $this->response($this->json($result), 200);  // send user details
                        }
		}

		private function orders()
                {	
			//$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a, customer as b where a.customerid= b.customerid ";
                        //$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a left join customer as b on a.customerid= b.customerid ";
			$query="SELECT a.*,b.customername from `order` as a left join customer as b on a.customerid= b.customerid ";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0)
                        {
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				 }
                        
			   $this->response($this->json($result), 200);  // send user details
                        }
		}

		private function ordersforCustomer()
                {	
			$id = (int)$this->_request['id'];
			//$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a, customer as b where a.customerid= b.customerid ";
                        //$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a left join customer as b on a.customerid= b.customerid ";
			$query="SELECT a.*,b.customername from `order` as a inner join customer as b on a.customerid= b.customerid and a.customerid =".$id;
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0)
                        {
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				 }
                        
			   $this->response($this->json($result), 200);  // send user details
                        }
		}

		private function findcustomername()
                {	
			$id = (int)$this->_request['id'];
			//$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a, customer as b where a.customerid= b.customerid ";
                        //$query="SELECT a.orderid, a.OrderNo,ordersource,b.customername,a.customerid FROM `order` as a left join customer as b on a.customerid= b.customerid ";
			$query="SELECT customername from customer where customerid =".$id;
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0)
                        {
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				 }
                        
			   $this->response($this->json($result), 200);  // send user details
                        }
		}

		private function orderdetailsforOne(){
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="select * from orderdetail where orderid = $id";
                                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0)
		                {
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		                
				   $this->response($this->json($result), 200);  // send user details
		                }
			}
		}


		private function orderProductdetailsforOne(){
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="select a.*,b.productcode from orderdetail as a, purchasedetail as b where a.purchasedetailid=b.purchasedetailid and orderid =".$id;
                                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0)
		                {
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		                
				   $this->response($this->json($result), 200);  // send user details
		                }
			}
		}

		private function purchasedetailsforOne(){
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="select * from purchasedetail where purchaseid = $id";
                                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0)
		                {
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		                
				   $this->response($this->json($result), 200);  // send user details
		                }
			}
		}

		private function purchaseproducts(){
			$productcode = (string)$this->_request['productcode'];
			$orderid = (int)$this->_request['orderid'];
			//if($productcode != '' && $orderdetailid>0){
			if($productcode != ''){	



$query="select b1.orderdetailid,a1.purchasedetailid, a1.productcode,a1.productname,a1.quantity, a1.remaining, b1.quantity as orderquantity,b1.unitsaleprice from (select a.*,b.productname from purchasedetail as a, product as b where a.productcode=b.productcode and a.productcode ='".$productcode."') as a1 left join orderdetail as b1 on a1.purchasedetailid = b1.purchasedetailid and b1.orderid=".$orderid;

//file_put_contents('/var/log/apache2/myphp.log', $query);

error_log($query);
			
				//$query="select a.*,b.productname from purchasedetail as a, product as b  where a.productcode ='".$productcode."' and b.productcode ='".$productcode."' and a.productcode=b.productcode";
                                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

				if($r->num_rows > 0)
		                {

					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		                 error_log($this->json($result));
				   $this->response($this->json($result), 200);  
				 
		                }

			}
		}


	     private function products()
		{
			// Create connection
		
			//$mysqli = mysqli_connect($this->DB_SERVER, $this->DB_USER, $this->DB_PASSWORD, $this->DB);
		        //$mysqli = mysqli_connect($this->servername, $this->username, $this->password, $this->db);
		
			// Check connection
			//if (!$mysqli) {
			//	die("Connection failed: " . mysqli_connect_error());
			//}
			//echo "Connected successfully";
						
			$query="SELECT a.*,b.suppliername from product as a left join supplier as b on a.suppliercode = b.suppliercode";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		
			 //echo "sdsd";
			 
			   $this->response($this->json($result), 200);  // send user details
			}
		}

	     private function purchases()
		{
			$query="SELECT a.*,b.suppliername from purchase as a left join supplier as b on a.suppliercode = b.suppliercode";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }
		
			 //echo "sdsd";
			 
			   $this->response($this->json($result), 200);  // send user details
			}
		}


	     private function suppliers()
		{
						
			//$query="SELECT * from supplier";
                        $query="SELECT * from supplier";

			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					 }

			 
			   $this->response($this->json($result), 200);  // send user details
			}
		}



		private function listusers()
               {	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
				$query="SELECT * FROM users";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
		}




		private function findcustomer(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM angularcode_customers c where c.customerNumber=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function insertProduct(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$customer = json_decode(file_get_contents("php://input"),true);
			$column_names = array('productcode', 'productname');
			$keys = array_keys($customer);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $customer[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO product(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($customer)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Product Created Successfully.", "data" => $customer);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}


		 private function updateProduct(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			 $product = json_decode(file_get_contents("php://input"),true);

			 $pid= $product['pid'];
		         $suppliercode= $product['suppliercode'];
			 $productcode= $product['productcode'];
			 $productname= $product['productname'];
			 $productdesc= $product['productdesc'];
			 $suppliermodelno= $product['suppliermodelno'];
			
			 $weight= $product['weight'];
			 $width= $product['width'];
			 $length= $product['length'];
			 $height= $product['height'];


                        if ($pid != '')
			{


	                    $query = "UPDATE product SET productcode='".$productcode."', productname='".$productname."', productdesc ='".$productdesc."'".
				     ", suppliermodelno ='".$suppliermodelno."'".
				     ", weight =".$weight."".
				     ", width =".$width."".
				     ", height =".$height."".
				     ", length =".$length."".
				     ", suppliercode =".$suppliercode."".
	                              " WHERE pid=".$pid."";
	                    /*
			    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			    $success = array('status' => "Success", "msg" => "Product ".$productcode." Updated Successfully.", "data" => $product);
			    $this->response($this->json($success),200);
                            */

			    error_log($query);
                            $msg = "Success!";  
			    if (!$this->mysqli->query($query)) {
			        $msg = $this->mysqli->error;
			        error_log($msg);
			    }
			    $success = array('status' => "Success", "msg" => $msg);
			    $this->response($this->json($success),200);



			}
			else
                        {

			    if($productcode != '') 
			    {
	                    	$query = "Insert into product(productcode, productname, productdesc,suppliermodelno,weight,width,height,length,suppliercode)".
	                    	" values('".$productcode."','".$productname."','".$productdesc."','".$suppliermodelno."',".$weight.",".$width.",".$height.",".$length.",".$suppliercode.")";
	                    	     /*
				    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				    $success = array('status' => "Success", "msg" => "Product ".$productcode." Updated Successfully.", "data" => $product);
				    $this->response($this->json($success),200);*/

				    error_log($query);
		                    $msg = "Success!";  
				    if (!$this->mysqli->query($query)) {
					$msg = $this->mysqli->error;
					error_log($msg);
				    }
				    $success = array('status' => "Success", "msg" => $msg);
				    $this->response($this->json($success),200);

			    }
			    else
			    {
				$this->response('',204);	// "No Content" status
			    }

                        } 
		}

		private function updateOrderDetail(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$order = json_decode(file_get_contents("php://input"),true);

                        $orderdetailid= $order['orderdetailid'];
                        $purchasedetailid=  $order['purchasedetailid'];
                        $quantity=  $order['quantity'];
                        $orderid =   $order['orderid'];
			$buycount =   $order['buycount'];
			$unitsaleprice =  $order['unitsaleprice'];
			$productcode =  $order['productcode'];

			if ($unitsaleprice == '')
			{
			    $unitsaleprice = 0;
			}
                        
			if ($orderdetailid != '')
                        { 
			    $query = "SELECT sum(quantity) as sumvalue FROM orderdetail WHERE purchasedetailid =".$purchasedetailid." and orderdetailid !=".$orderdetailid;
			}
			else
			{
			    $query = "SELECT sum(quantity) as sumvalue FROM orderdetail WHERE purchasedetailid =".$purchasedetailid;
			}
			error_log($query);
                        $soldcount = 0;

			$result = $this->mysqli->query($query);
			
			while ($obj=mysqli_fetch_object($result))
			{
			    $soldcount = $obj->sumvalue;
			}

			error_log("soldcount: " + $soldcount);
			  // Free result set
			mysqli_free_result($result);
			

			//$total = $soldcount + $quantity;

			$remaining = $buycount - $soldcount;

			if ($remaining >= $quantity)
                        {
		                if ($orderdetailid != '')
				{
		                    $query = "UPDATE orderdetail SET unitsaleprice=".$unitsaleprice.", quantity =".$quantity.", purchasedetailid =".$purchasedetailid.", orderid =".$orderid." WHERE orderdetailid=".$orderdetailid."";
		                    //echo $query; 
				}
				else
				{
		                    $query = "Insert into orderdetail(orderid,purchasedetailid, quantity,unitsaleprice) values(".$orderid.",".$purchasedetailid.",".$quantity.",".$unitsaleprice.")";
		                    //echo $query; 

				}

                                 
				if(!empty($purchasedetailid))
		                       {
						error_log($query);
						$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

						$this->updatePurchasesDetailQuantity();
		          
		                                /*$diff = $remaining - $quantity;

						error_log("diff: " + $diff);
	 		                        $query = "update purchasedetail set remaining =".$diff." where purchasedetailid =".$purchasedetailid;
						error_log($query);
						$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);


						$query="select   b.sumquantity - a.totalvalue as inventory from ( SELECT sum(quantity) as totalvalue FROM orderdetail WHERE purchasedetailid in ( select purchasedetailid from purchasedetail where productcode='".$productcode."') ) as a , ( select sum(quantity) as sumquantity from purchasedetail where productcode='".$productcode."') as b";
						error_log($query);
						$inventory = 0;

						$result1 = $this->mysqli->query($query);
			
						while ($obj1=mysqli_fetch_object($result1))
						{
						    $inventory = $obj1->inventory;
						}

						error_log("inventory: " + $inventory);
						  // Free result set
						mysqli_free_result($result1);


	 		                        $query = "update product set inventory =".$inventory." where  productcode='".$productcode."'";
						error_log($query);
						$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);*/
                                         


						$success = array('status' => "Success", "msg" => "OrderDetail ".$purchasedetailid." Updated Successfully.", "data" => $order);
				                // $success = array('status' => "Success", "msg" => "Customer ".$query." Updated Successfully.", "data" => $customer);
						$this->response($this->json($success),200);
					}
		                        else
		                        {
					    $this->response('',204);	// "No Content" status                             
				        } 
                        }
			else
			{
				$success = array('status' => "Error", "msg" => "The order quantity is greater than remaining.", "data" => $quantity);
				$this->response($this->json($success),200);
				//$this->response('The order quantity is greater than remaining',204);
			}

                

		}




	       private function updatePurchaseDetail(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$purchase = json_decode(file_get_contents("php://input"),true);

 			$purchaseid= $purchase['purchaseid'];
                        $purchasedetailid= $purchase['purchasedetailid'];
                        $productcode=  $purchase['productcode'];
                        $quantity=  $purchase['quantity'];
                        $purchasedesc =  $purchase['purchasedesc'];
                        $reciveddate =  $purchase['reciveddate'];
                        $unitpriceaud =  $purchase['unitpriceaud'];
                        $unitpriceusd =  $purchase['unitpriceusd'];

			$hasdelay = 0;
                        if($purchase['hasdelay'] == true)
                        {
                           $hasdelay = 1;
			}
			
                        $delaydays =  $purchase['delaydays'];
                        $cogaaud =  $purchase['cogaaud'];




                        if ($purchasedetailid != '')
			{
                            $query = "UPDATE purchasedetail SET productcode='".$productcode."', quantity =".$quantity.", purchasedesc='".$purchasedesc."', reciveddate ='".$reciveddate."', hasdelay =".$hasdelay.", delaydays =".$delaydays.", cogaaud =".$cogaaud.", unitpriceaud =".$unitpriceaud.", unitpriceusd =".$unitpriceusd." WHERE purchasedetailid=".$purchasedetailid."";
                            //echo $query; 
			}
			else
			{
                            $query = "Insert into purchasedetail(purchaseid,productcode, quantity,purchasedesc,reciveddate,hasdelay,delaydays,cogaaud,unitpriceaud,unitpriceusd) values(".$purchaseid.",'".$productcode."',".$quantity.",'".$purchasedesc."','".$reciveddate."',".$hasdelay.",".$delaydays.",".$cogaaud.",".$unitpriceaud.",".$unitpriceusd.")";
                            //echo $query; 

			}


			if(!empty($productcode)){
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "PurchaseDetail ".$hasdelay." Updated Successfully.", "data" => $hasdelay);
				$this->response($this->json($success),200);*/
				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

		private function updateSupplier(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			 $supplier = json_decode(file_get_contents("php://input"),true);

		         $suppliercode= $supplier['suppliercode'];
			 $suppliername= $supplier['suppliername'];
			 $country= $supplier['country'];
			 $email= $supplier['email'];
			 $address= $supplier['address'];
			 $contactname= $supplier['contactname'];
			 $phone= $supplier['phone'];
			 $fax= $supplier['fax'];
			 $mobile= $supplier['mobile'];
			 $website= $supplier['website'];
			 $supplierdesc= $supplier['supplierdesc'];
			 $paypalacc= $supplier['paypalacc'];

                        if ($suppliercode != '')
			{
                            $query = "UPDATE supplier SET suppliername='".$suppliername."', country ='".$country."'".
				     ", email ='".$email."'".
				     ", address ='".$address."'".
				     ", contactname ='".$contactname."'".
				     ", phone ='".$phone."'".
				     ", fax ='".$fax."'".
				     ", mobile ='".$mobile."'".
				     ", website ='".$website."'".
				     ", supplierdesc ='".$supplierdesc."'".
				     ", paypalacc ='".$paypalacc."'".
                                      " WHERE suppliercode=".$suppliercode."";
                            //echo $query; 
			}
			else
			{
                            $query = "Insert into supplier(suppliername, country, email,address,contactname,phone,fax,mobile,website,supplierdesc,paypalacc)".
                            " values('".$suppliername."','".$country."','".$email."','".$address."','".$contactname."','".$phone."','".$fax."','".$mobile."','".$website."','".$supplierdesc."','".$paypalacc."')";
                            //echo $query; 

			}


			if(!empty($suppliername)){

				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Supplier ".$suppliername." Updated Successfully.", "data" => $supplier);
				$this->response($this->json($success),200);*/

				error_log($query);
                                $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
				    $msg = $this->mysqli->error;
				    error_log($msg);
				}			
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);


			}else
				$this->response('',204);	// "No Content" status
		}

		private function deleteSupplier(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $supplier = json_decode(file_get_contents("php://input"),true);

		         $suppliercode= $supplier['suppliercode'];
			if($suppliercode > 0){				
				$query="DELETE FROM supplier WHERE suppliercode = $suppliercode";

				error_log($query);
                                $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
				    $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);


				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);*/
			}else
				$this->response('',204);	// If no records "No Content" status
		}


	        private function updatePurchasesDetailQuantity()
                {

                    //$query = "update purchasedetail set remaining = ( select IFNULL(sum(quantity),0) FROM orderdetail where orderdetail.purchasedetailid =purchasedetail.purchasedetailid)";
		    $query="update purchasedetail set remaining = purchasedetail.quantity - ( select IFNULL(sum(quantity),0) FROM orderdetail where orderdetail.purchasedetailid =purchasedetail.purchasedetailid)";
                    //echo $query; 

		    error_log($query);
		    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);


		   // $query = "update product set inventory = IFNULL(( (select sum(quantity) as sumquantity from purchasedetail where productcode=product.productcode) ) - (SELECT sum(quantity) as totalvalue FROM orderdetail WHERE purchasedetailid in ( select purchasedetailid from purchasedetail where productcode=product.productcode)),0)";

$query = "update product set inventory = (IFNULL((select sum(quantity) as sumquantity from purchasedetail where productcode=product.productcode),0)) - (IFNULL((SELECT sum(quantity) as totalvalue FROM orderdetail WHERE purchasedetailid in ( select purchasedetailid from purchasedetail where productcode=product.productcode)),0))";
                    //echo $query; 
		    error_log($query);
		    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);


                }

		private function deleteOrderProduct(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $order = json_decode(file_get_contents("php://input"),true);

		         $productcode= $order['productcode'];
		         $orderid= $order['orderid'];
			if($orderid > 0 && $productcode != ''){				
				$query="DELETE FROM orderdetail WHERE orderid=".$orderid." and purchasedetailid in (select purchasedetailid from purchasedetail where productcode ='".$productcode."')";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				error_log($query);

				$this->updatePurchasesDetailQuantity();

				$success = array('status' => "Success", "msg" => "Success!");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}




		private function updateCustomer(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			 $customer = json_decode(file_get_contents("php://input"),true);

		         $customerid= $customer['customerid'];
			 $customername= $customer['customername'];
			 $address= $customer['address'];
			 $suburb= $customer['suburb'];
			 $postcode= $customer['postcode'];
			 $email= $customer['email'];
			 $phone= $customer['phone'];
			 $cussource= $customer['cussource'];

                        if ($customerid != '')
			{
                            $query = "UPDATE customer SET customername='".$customername."', address ='".$address."'".
				     ", suburb ='".$suburb."'".
				     ", postcode ='".$postcode."'".
				     ", phone ='".$phone."'".
				     ", email ='".$email."'".
				     ", cussource ='".$cussource."'".
                                      " WHERE customerid=".$customerid."";
                            //echo $query; 
			}
			else
			{
                            $query = "Insert into customer(customername, address, suburb,postcode,phone,email,cussource)".
                            " values('".$customername."','".$address."','".$suburb."','".$postcode."','".$phone."','".$email."','".$cussource."')";
                            //echo $query; 

			}


			if(!empty($customername)){
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Supplier ".$customername." Updated Successfully.", "data" => $customer);
				$this->response($this->json($success),200);*/

				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				//$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status

		}


		private function deleteCustomer(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $customer = json_decode(file_get_contents("php://input"),true);

		         $customerid= $customer['customerid'];
			if($customerid > 0){				
				$query="DELETE FROM customer WHERE customerid = $customerid";
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);*/

				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}





		private function updatePurchase(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			 $purchase = json_decode(file_get_contents("php://input"),true);

		         $purchaseid= $purchase['purchaseid'];
			 $pinumber= $purchase['pinumber'];
			 $pidate= $purchase['pidate'];
			 $shippingcostaud= $purchase['shippingcostaud'];
			 $shippingcostusd= $purchase['shippingcostusd'];
			 $suppliercode= $purchase['suppliercode'];
			 $tariffcostaud= $purchase['tariffcostaud'];
			 $othercostaud= $purchase['othercostaud'];


                        if ($purchaseid != '')
			{
                            $query = "UPDATE purchase SET pinumber='".$pinumber."', pidate ='".$pidate."'".
				     ", shippingcostaud =".$shippingcostaud."".
				     ", shippingcostusd =".$shippingcostusd."".
				     ", suppliercode =".$suppliercode."".
				     ", tariffcostaud =".$tariffcostaud."".
				     ", othercostaud =".$othercostaud."".
                                      " WHERE purchaseid=".$purchaseid."";
                            //echo $query; 
			}
			else
			{
                            $query = "Insert into purchase(pinumber, pidate, shippingcostaud,shippingcostusd,suppliercode,tariffcostaud,othercostaud)".
                            " values('".$pinumber."','".$pidate."',".$shippingcostaud.",".$shippingcostusd.",".$suppliercode.",".$tariffcostaud.",".$othercostaud.")";
                            //echo $query; 

			}


			if(!empty($pinumber)){
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "purchase ".$pinumber." Updated Successfully.", "data" => $purchase);
				$this->response($this->json($success),200);*/

				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);


			}else
				$this->response('',204);	// "No Content" status
		}

		private function updateOrder(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			 $order = json_decode(file_get_contents("php://input"),true);

		         $orderid= $order['orderid'];
			 $orderno= $order['orderno'];
			 $customerid= $order['customerid'];
			 $orderdate= $order['orderdate'];
			 $ordersource= $order['ordersource'];
			 $deliverydate= $order['deliverydate'];
			 $deliverycost= $order['deliverycost'];
			 $customershippingpaid= $order['customershippingpaid'];


                        if ($orderid != '')
			{
                            $query = "UPDATE `order` SET orderno=".$orderno.", customerid =".$customerid."".
				     ", orderdate ='".$orderdate."'".
				     ", ordersource ='".$ordersource."'".
				     ", deliverydate ='".$deliverydate."'".
				     ", deliverycost =".$deliverycost."".
				     ", customershippingpaid =".$customershippingpaid."".
                                      " WHERE orderid=".$orderid."";
                            //echo $query; 
			}
			else
			{
                            $query = "Insert into `order`(orderno, customerid, orderdate,ordersource,deliverydate,deliverycost,customershippingpaid)".
                            " values(".$orderno.",".$customerid.",'".$orderdate."','".$ordersource."','".$deliverydate."',".$deliverycost.",".$customershippingpaid.")";
                            //echo $query; 

			}


			if(!empty($orderno)){
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "order ".$orderid." Updated Successfully.", "orderno" => $orderno);
				$this->response($this->json($success),200);*/

				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				//$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);

			}else
				$this->response('',204);	// "No Content" status
		}

		private function deleteOrder(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $order = json_decode(file_get_contents("php://input"),true);

		         $orderid= $order['orderid'];
			if($orderid != ''){				
				$query="DELETE FROM `order` WHERE orderid =".$orderid."";
				error_log($query);
				//$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				//$r = $this->mysqli->query($query);

                                $msg = "Success!"; 
				if (!$this->mysqli->query($query)) {
				    $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		private function deleteProduct(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $product = json_decode(file_get_contents("php://input"),true);

		         $productcode= $product['productcode'];
			if($productcode != ''){				
				$query="DELETE FROM product WHERE productcode ='".$productcode."'";
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);*/

				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		private function deletePurchase(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $purchase = json_decode(file_get_contents("php://input"),true);

		         $purchaseid= $purchase['purchaseid'];
			if($purchaseid > 0){				
				$query="DELETE FROM purchase WHERE purchaseid = $purchaseid";
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);*/
				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		private function deletePurchaseDetail(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			 
                         $purchase = json_decode(file_get_contents("php://input"),true);

		         $purchasedetailid= $purchase['purchasedetailid'];
			if($purchasedetailid > 0){				
				$query="DELETE FROM purchasedetail WHERE purchasedetailid = $purchasedetailid";
				/*$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);*/
				error_log($query);
			        $msg = "Success!";  
				if (!$this->mysqli->query($query)) {
			            $msg = $this->mysqli->error;
				    error_log($msg);
				}
				$this->updatePurchasesDetailQuantity();
				$success = array('status' => "Success", "msg" => $msg);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>
