class Clock2 extends React.Component
{
     constructor(props) {
        super(props);
        //this.state = {value: 'dds'};
        this.products = this.props.products;
    }


    render() {
        //const orderdetails = this.props.orderdetails;

        const orderid = this.props.orderid;
        const orderdetailid = this.props.orderdetailid;
        const productcode = this.props.productcode;
	const customername = this.props.customername;
	
        Ext.Loader.setPath('resources', '/resources');
	Ext.Loader.setPath('Ext', 'resources/themes');
  	Ext.Loader.setPath('Ext.ux', 'resources/themes'); 
 
        Ext.Loader.setConfig({ enabled: true});  
      

	Ext.require([
	    'Ext.data.*',
	    'Ext.grid.*',
            'Ext.ux.*',
            'Ext.selection.CheckboxModel',
            'Ext.selection.CellModel',
            'Ext.form.*',
            'Ext.util.*'
	]);


        var customStyle = 
        ".x-boundlist-item img.chkCombo { width: 13px; height: 13px; background: transparent url('resources/themes/images/default/grid/unchecked.gif'); }" + 
        ".x-boundlist-selected img.chkCombo { background-position: 0 -13px; width: 13px; height: 13px; background: transparent url('resources/themes/images/default/grid/checked.gif'); }";
    
	Ext.util.CSS.createStyleSheet(customStyle);


        var chkmodelfields = [];

        chkmodelfields.push("orderdetailid");
        chkmodelfields.push("purchasedetailid");
        chkmodelfields.push("productcode");
        chkmodelfields.push("productname");
        chkmodelfields.push("quantity");
	chkmodelfields.push("remaining");
        chkmodelfields.push("orderquantity");
        chkmodelfields.push("unitsaleprice");

        /*var chkgfield0 = {
            text: "orderdetailid",
            dataIndex: "orderdetailid",
            hidden : true

        };*/

        var chkgfield00 = {
            text: "orderdetailid",
            dataIndex: "orderdetailid",
            //hidden : true

        };

        var chkgfield0 = {
            text: "purchasedetailid",
            dataIndex: "purchasedetailid",
            //hidden : true

        };


        var chkgfield1 = {
            text: "productcode",
            dataIndex: "productcode",
            width: 100,
        };

        var chkgfield2 = {
            text: "productname",
            dataIndex: "productname",
            width: 100,
        };


        var chkgfield3 = {
            text: "buy quantity",
            dataIndex: "quantity",
            width: 100,
        };

        var chkgfield30 = {
            text: "remaining",
            dataIndex: "remaining",
            width: 100,
        };

        var chkgfield4 = {
            text: "order quantity",
            dataIndex: "orderquantity",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield5 = {
            text: "unit sale price",
            dataIndex: "unitsaleprice",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };


       var chkgfield6 = {
            xtype: 'actioncolumn',
            text: "update",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Update title and availability',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var orderdetailidrec = rec.get('orderdetailid');
                    var purchasedetailid = rec.get('purchasedetailid');
                    var quantity = rec.get('orderquantity'); 
		    var unitsaleprice = rec.get('unitsaleprice'); 
		    var buycount = rec.get('quantity'); 

                    console.log('orderdetailidrec: ' + orderdetailidrec);
                    if (purchasedetailid != '')
                    {
                        console.log('purchasedetailid: ' + purchasedetailid);
                    }
                    console.log('quantity: ' + quantity);

                    
      
                    
                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateOrderDetail";

                    var params = {
                        orderdetailid: orderdetailidrec,
                        purchasedetailid: purchasedetailid,
                        unitsaleprice: unitsaleprice,
                        quantity: quantity,
                        orderid : orderid,
			buycount : buycount,
			productcode : productcode,
                    };

                    
                    Ext.Ajax.request({
                        url: url,
                        method: 'post',
                        jsonData: params,
                        headers: {
                            'contentType': 'application/json; charset=utf-8',
                            'accept': 'application/json',
                        },
                        success: function (response) {

                            //second ajax call

                            if (JSON.parse(response.responseText).status == 'Error')
                            {
				          
                                	 Ext.defer(function() {
                                         var box = Ext.MessageBox.show({
                                             title: "ERROR",
                                             msg: JSON.parse(response.responseText).msg,
                                             modal: true,
                                             buttons: Ext.Msg.OK,
                                             icon: Ext.MessageBox.ERROR});
                                     }, 100);
			    }
			    else
			    {
				    Ext.Ajax.request({
				        url: 'api/purchaseproducts?productcode=' + productcode + '&orderid=' + orderid,
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
			     
		                             this.products = JSON.parse(response.responseText);	
					     Ext.getCmp('orderlists').store.removeAll();
					     Ext.getCmp('orderlists').store.loadData(this.products);


				             Ext.defer(function () {
				                   var box = Ext.Msg.alert({
				                        title: "Update values",
				                        msg: "Updated Successfully",
				                        modal: true,
				                        buttons: Ext.Msg.OK,
				                        icon: Ext.Msg.INFO
				                    });
				              }, 100);
		                        },
				        failure: function (response, options) {

				            waitingMsg2.hide();
					    Ext.MessageBox.alert(jresp);
				        }
				    }); //End Ext.Ajax
			    }





                            

                        },
                        failure: function (response, options) {

                            waitingMsg2.hide();
                            var jresp = response.responseText;
                            Ext.MessageBox.alert(jresp);
                        }
                    }); //End Ext.Ajax
                    


                }//end handler
            }]
        }


	var chkgfield7 = {
		xtype : 'actioncolumn',
		width : 26,
		header : '',
		sortable : false,
		items : [ {
			iconCls : 'wif-grid-row-delete',
			tooltip : 'Delete',
			handler : function(grid, rowIndex, colIndex) {

						           if (grid.store.data.items[rowIndex].data.orderdetailid == "")
                                                            {
                                                                waitingMsg2.hide();
								grid.store.removeAt(rowIndex); 
                                                                return;

							    }
				grid.store.removeAt(rowIndex);
			}
		} ]
	};


      var chkmodel = Ext.define('DataSet', {
            extend: 'Ext.data.Model',
            fields: chkmodelfields
        });

      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: this.products
        });

        var chkgridfields = [];
	chkgridfields.push(chkgfield00);
        chkgridfields.push(chkgfield0);
        chkgridfields.push(chkgfield1);
        chkgridfields.push(chkgfield2);
        chkgridfields.push(chkgfield3);
        chkgridfields.push(chkgfield30);
        chkgridfields.push(chkgfield4);
	chkgridfields.push(chkgfield5);
	chkgridfields.push(chkgfield6);
	//chkgridfields.push(chkgfield7);

	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});    



      var gr = Ext.create('Ext.grid.Panel', {
            id: 'orderlists',
            title: 'order details for customer name: '+ customername,
            border: 0,
            margin: '0 5 5 5',
            store: chkstore,
            autoScroll: true,
            height: "100%",
            width: "100%",        
            //autoRender: true,
            renderTo:'div-grid',
            autoScroll: true,
            columns: chkgridfields,
            flex: 1,
	    viewConfig: {
		stripeRows: true,
		enableTextSelection: true
	    },
            plugins : [ cellEditor ]

        });


        return (

            <div></div>
          
        );

    }

}



//var messages = ['React', 'Re: React', 'Re:Re: React'];

var searchParams = new URLSearchParams(window.location.search);
var orderdetailid = searchParams.get('id');
var productcode = searchParams.get('productcode');
var orderid = searchParams.get('orderid');
var customername = searchParams.get('customername');



//$.ajax({url: "api/orderdetailsforOne?id=" + param, success: function(result){

    //var orderdetails = result;
    $.ajax({url: "api/purchaseproducts?productcode=" + productcode + "&orderid=" + orderid , success: function(resultnew){

    var products = resultnew;

    var data = [];
    if (products.length == 0)
    {
	products = data;
    } 

     ReactDOM.render(
        <Clock2 
                products={products} 
                productcode={productcode} 
                orderdetailid={orderdetailid}
                customername={customername}  
                orderid = {orderid}/>,
        document.getElementById('example-grid')
     );



   }});


//}});




