class Clock2 extends React.Component
{
     constructor(props) {
        super(props);
        //this.state = {value: 'dds'};
    }


    render() {
        const orderdetails = this.props.orderdetails;
        const products = this.props.products;
        const orderid = this.props.orderid;
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
        chkmodelfields.push("productcode");
        //chkmodelfields.push("quantity");


        var chkgfield0 = {
            text: "orderdetailid",
            dataIndex: "orderdetailid",
            hidden : true

        };



	Ext.define('comboProductNames', {
		extend : 'Ext.data.Model',
		fields : [ 
                   {
		      type : 'string',
		      name : 'productcode'
		   }
                   , 
                   {
		      type : 'string',
		      name : 'productname'
		   }
		   

                ]
	});
  
         
        var x={};
        x.productcode="";
        x.productname = "";
        products.push(x);

	var comboProductStore = Ext.create('Ext.data.Store', {
                id:'comboProductStore',
		model : 'comboProductNames',
		data : products
	});

        var chkgfield1 = {
		xtype : 'gridcolumn',
		text : 'productcode',
		dataIndex : 'productcode',//id
                width: 500,
		editor : {
			xtype : 'combobox',
                        extend : 'Ext.form.field.ComboBox',
                        ////listClass: 'x-combo-list-small',

                        //multiSelect: true,

			//allowBlank : true,
                        //forceSelection: true,
                        typeAhead: false,
			editable: false,
			displayField : 'productcode',
			valueField : 'productcode',
			queryMode : 'local',
			store : comboProductStore,
                        triggerAction: 'all',

                        displayTpl: '<tpl for=".">' + // for multiSelect
				     '{productcode}.{productname}<tpl if="xindex < xcount">,</tpl>' +
				     '</tpl>'

                       //displayTpl: new Ext.XTemplate('<p style="color:red;">{productcode}.{productname}</p>')

		        , listConfig: {
			    getInnerTpl: function() {
			    return '<div class="x-combo-list-item"><img src="' +
			    Ext.BLANK_IMAGE_URL +
			    '" class="chkCombo-default-icon chkCombo" /> {productcode}.{productname} </div>';
			    }//end function
                         }

		}//end editor


		/*           
		,renderer: function(value,metaData,record) {
				if(value) {
				    var Categories = comboProductStore;
				    var catRecord = Categories.findRecord('productid', value);
				    return 
		catRecord ? catRecord.get('productname'): record.get('productname');
				} //else return "";
			    }
		*/


		/*
		      ,renderer: function(value, meta, record, rowIdx, colIdx, store, view) {
			    var idx = comboProductStore.find('productid', value);
			    
			    return (idx >= 0) ? (comboProductStore.getAt(idx).get('productname')) : value;
			}
		*/
		      

       };//end var chkgfield1


        /*var chkgfield2 = {
            text: "quantity",
            dataIndex: "quantity",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };*/


       var chkgfield2 = {
            xtype: 'actioncolumn',
            text: "open details",
            width: 70,
            items: [{
                icon: 'resources/icons/edit.png', 
                tooltip: 'Open details',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var productcode = rec.get('productcode');
		    var orderdetailid = rec.get('orderdetailid');
                    

                    var url = "orderdetail.html?id=" + orderdetailid + "&productcode=" + productcode + "&orderid=" + orderid + "&customername=" + customername;
                    window.location.href = url;


                }//end handler
            }]
        }



       /*var chkgfield4 = {
            xtype: 'actioncolumn',
            text: "update",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Update title and availability',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var orderdetailid = rec.get('orderdetailid');
                    var productcode = rec.get('productcode');
                    var quantity = rec.get('quantity'); 

                    console.log('orderdetailid: ' + orderdetailid);
                    if (productcode != '')
                    {
                        console.log('productcode: ' + productcode);
                    }
                    console.log('quantity: ' + quantity);

                    
      
                    
                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateOrderDetail";

                    var params = {
                        orderdetailid: orderdetailid,
                        productcode: productcode,
                        quantity: quantity,
                        orderid : orderid
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
                            waitingMsg2.hide();
                                Ext.defer(function () {
                                    var box = Ext.Msg.alert({
                                        title: "Update values",
                                        msg: response.responseText,
                                        modal: true,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                }, 100);
                            

                        },
                        failure: function (response, options) {

                            waitingMsg2.hide();
                            var jresp = response.responseText;
                            Ext.MessageBox.alert(jresp);
                        }
                    }); //End Ext.Ajax
                    


                }//end handler
            }]
        }*/


	var chkgfield3 = {
		xtype : 'actioncolumn',
		width : 26,
		header : '',
		sortable : false,
		items : [ {
			iconCls : 'wif-grid-row-delete',
			tooltip : 'Delete',
			handler : function(grid, rowIndex, colIndex) {



                                Ext.Msg.show({
	                               title : 'Delete Product?',
					msg : 'Are you sure?',
					buttons : Ext.Msg.YESNO,
					icon : Ext.Msg.QUESTION,
					fn : function(btn) {
						if (btn === 'yes') {
						    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
						    var url = "api/deleteOrderProduct";

						    var params = {
							 productcode: grid.store.data.items[rowIndex].data.productcode,
							 orderid : orderid
							 };

					           if (grid.store.data.items[rowIndex].data.productcode == "")
                                                    {
                                                        waitingMsg2.hide();
							grid.store.removeAt(rowIndex); 
                                                        return;

						    }

						    Ext.Ajax.request({
							url: url,
							method: 'delete',
							jsonData: params,
							headers: {
							    'contentType': 'application/json; charset=utf-8',
							    'accept': 'application/json',
							},
							success: function (response) {

                    					    var retval = JSON.parse(response.responseText);
				                            var msg = retval.msg;
							    if (msg == 'Success!')
							    {

							     	            waitingMsg2.hide();
							     		    grid.store.removeAt(rowIndex); 

					                                    Ext.defer(function () {
										   var box = Ext.Msg.alert({
											title: "Delete record",
											msg: msg,
											modal: true,
											buttons: Ext.Msg.OK,
											icon: Ext.Msg.INFO
										    });
									      }, 100);
							     }
							    else
							     {

								     Ext.defer(function() {
									 var box = Ext.MessageBox.show({
									     title: "ERROR",
									     msg: "Error in Deleting , SQL Error is:  " + msg,
									     modal: true,
									     buttons: Ext.Msg.OK,
									     icon: Ext.MessageBox.ERROR});
								     }, 100);

							     }
								    

							},
							failure: function (response, options) {

							    waitingMsg2.hide();
							    var jresp = response.responseText;
							    Ext.MessageBox.alert(jresp);
							}
						    }); //End Ext.Ajax

						}//end if (btn === 'yes') {
					}//end fn : function(btn) {
				});//end Ext.Msg.show({




			}
		} ]
	};


      var chkmodel = Ext.define('DataSet', {
            extend: 'Ext.data.Model',
            fields: chkmodelfields
        });

	var y=[];
	var arrout = [];


	for (var k = 0; k<orderdetails.length; k++)
	{



	    var itempc = orderdetails[k].productcode;

	    var lsw = false; 
	    for (var i =0; i <y.length; i++)
	    {
		if (y[i] == itempc)
		{
		    lsw = true;
		}

	    }  
	    if (lsw == false)
	    {
               y.push(itempc);
	       arrout.push(orderdetails[k]); 
	    }
	}


      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: arrout//orderdetails
        });

        var chkgridfields = [];
        chkgridfields.push(chkgfield0);
        chkgridfields.push(chkgfield1);
        chkgridfields.push(chkgfield2);
        chkgridfields.push(chkgfield3);


	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});    



      var gr = Ext.create('Ext.grid.Panel', {
            id: 'orderlists',
            title: 'product order list for customer  name: ' + customername,
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
	    dockedItems : [ {
		 xtype : 'toolbar',
		 items : [ {
			text : 'Add New Item',
			tooltip : 'Add a new row',
			handler : function() {

				var grid = this.findParentByType('grid');
				var store = grid.getStore();
				var gridCount = store.getCount();
				var datafield = {};
				store.insert(gridCount, datafield);
				cellEditor.startEdit(gridCount, 0);

			}
		    } ],
		} ],
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
var param = searchParams.get('id');
var customername = searchParams.get('customername');


$.ajax({url: "api/orderProductdetailsforOne?id=" + param, success: function(result){

    var orderdetails = result;

    var data = [];
    if (orderdetails.length == 0)
    {
	orderdetails = data;
    } 


    $.ajax({url: "api/products", success: function(resultnew){

    var products = resultnew;

     ReactDOM.render(
        <Clock2 orderdetails={orderdetails}
                products={products} 
		customername= {customername} 
                orderid = {param}/>,
        document.getElementById('example-grid')
     );



   }});


}});



	
