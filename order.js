class Clock2 extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: 'dds'};
        this.orders = this.props.orders;
    }


    render() {

        const customers = this.props.customers;

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
        chkmodelfields.push("orderid");
        chkmodelfields.push("orderno");
        chkmodelfields.push("customername");//customerid
        chkmodelfields.push("orderdate");
        chkmodelfields.push("ordersource");
        chkmodelfields.push("deliverydate");
        chkmodelfields.push("deliverycost");
        chkmodelfields.push("customershippingpaid");



        var chkgfield0 = {
            text: "orderid",
            dataIndex: "orderid",
            hidden:true

        };
        var chkgfield1 = {
            text: "Order No",
            dataIndex: "orderno",
            width: 100,
            editor : 'textfield',
            type : 'text'

        };


	Ext.define('comboCustomerNames', {
		extend : 'Ext.data.Model',
		fields : [ 
                   {
		      type : 'string',
		      name : 'customername'
		   }
                   , 
                   {
		      type : 'string',
		      name : 'customerid'
		   }
		   

                       ]
	});


       var x={};
       x.customername="";
       x.customerid = "";
       customers.push(x);


	var comboCustomerStore = Ext.create('Ext.data.Store', {
                id:'comboCustomerStore',
		model : 'comboCustomerNames',
		data : customers
	});

	var chkgfield2 = {
		xtype : 'gridcolumn',
		text : 'Customer',
		dataIndex : 'customername',//id

		editor : {
			xtype : 'combobox',
                        extend : 'Ext.form.field.ComboBox',
                        ////listClass: 'x-combo-list-small',

                        //multiSelect: true,

			//allowBlank : true,
                        //forceSelection: true,
                        typeAhead: false,
			editable: false,
			displayField : 'customername',
			valueField : 'customername',
			queryMode : 'local',
			store : comboCustomerStore,
                        triggerAction: 'all'
			,displayTpl: '<tpl for=".">' + // for multiSelect
				     '{customername}<tpl if="xindex < xcount">,</tpl>' +
				     '</tpl>'
		       , listConfig: {
			  getInnerTpl: function() {
			    return '<div class="x-combo-list-item"><img src="' +
			    Ext.BLANK_IMAGE_URL +
			    '" class="chkCombo-default-icon chkCombo" /> {customername} </div>';
			   }

                        }
		}//end editor


		/*           
		,renderer: function(value,metaData,record) {
				if(value) {
				    var Categories = comboCustomerStore;
				    var catRecord = Categories.findRecord('customerid', value);
				    return 
		catRecord ? catRecord.get('customername'): record.get('customername');
				} //else return "";
			    }
		*/


		/*
		      ,renderer: function(value, meta, record, rowIdx, colIdx, store, view) {
			    var idx = comboCustomerStore.find('customerid', value);
			    
			    return (idx >= 0) ? (comboCustomerStore.getAt(idx).get('customername')) : value;
			}
		*/
      

       };//end var chkgfield2

        var chkgfield3 = {
            text: "order date",
            dataIndex: "orderdate",
	    editor : 'datefield',
            xtype : 'datecolumn',
            format : 'Y-m-d',
	    width : 150
        };


        var chkgfield4 = {
            text: "order source",
            dataIndex: "ordersource",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };


        var chkgfield5 = {
            text: "delivery date",
            dataIndex: "deliverydate",
	    editor : 'datefield',
            xtype : 'datecolumn',
            format : 'Y-m-d',
	    width : 150
        };

        var chkgfield6 = {
            text: "delivery cost",
            dataIndex: "deliverycost",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield7 = {
            text: "customer shipping paid",
            dataIndex: "customershippingpaid",
            width: 125,
            editor : 'numberfield',
            type : 'number'
        };

       var chkgfield8 = {
            xtype: 'actioncolumn',
            text: "Save",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  
                tooltip: 'Save Order',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var orderid = rec.get('orderid');
                    var orderno = rec.get('orderno');
                    var orderdate = rec.get('orderdate');
                    var ordersource = rec.get('ordersource');
                    var deliverydate = rec.get('deliverydate');
                    var deliverycost = rec.get('deliverycost');
                    var customershippingpaid = rec.get('customershippingpaid');

                    var customername = rec.get('customername');

                    var customerid = 0;
		    var idx = comboCustomerStore.find('customername', customername);
		    if (idx>-1)
		    {
			 customerid = comboCustomerStore.getAt(idx).get('customerid');
		    }

                 

                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateOrder";

                    var params = {
                        orderid: orderid,
                        orderno: orderno,
			customerid : customerid,
                        orderdate: orderdate,
                        ordersource: ordersource,
                        deliverydate: deliverydate,
                        deliverycost: deliverycost,
                        customershippingpaid: customershippingpaid                      
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
        }


      var chkgfield9 = {
            xtype: 'actioncolumn',
            text: "open details",
            width: 70,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Open order details',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var orderid = rec.get('orderid');

                    var url = "orderdetail.html?id=" + orderid;
                    window.location.href = url;


                }//end handler
            }]
        }


	var chkgfield10 = {
		xtype : 'actioncolumn',
		width : 26,
		header : '',
		sortable : false,
		items : [ {
			iconCls : 'wif-grid-row-delete',
			tooltip : 'Delete',
			handler : function(grid, rowIndex, colIndex) {
				Ext.Msg.show({
		                               title : 'Deleting Order?',
						msg : 'Are you sure?',
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION,
						fn : function(btn) {
							if (btn === 'yes') {
							    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
							    var url = "api/deleteOrder";

							    var params = {
									 orderid: grid.store.data.items[rowIndex].data.orderid,
									 };


							    Ext.Ajax.request({
								url: url,
								method: 'delete',
								jsonData: params,
								headers: {
								    'contentType': 'application/json; charset=utf-8',
								    'accept': 'application/json',
								},
								success: function (response) {

								    //second ajax call
								    Ext.Ajax.request({
									url: 'api/orders',
									method: 'get',
									headers: {
									    'contentType': 'application/json; charset=utf-8',
									    'accept': 'application/json',
									},
					 				success: function (response) {
									     waitingMsg2.hide();

								             grid.store.removeAt(rowIndex); 
									     
									     this.orders = JSON.parse(response.responseText);	
									     Ext.getCmp('orderlists').store.removeAll();
									     Ext.getCmp('orderlists').store.loadData(this.orders);

								                
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
									    Ext.MessageBox.alert(response.responseText);
									}
								    }); //End Ext.Ajax

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

      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: this.orders
        });

        var chkgridfields = [];
        chkgridfields.push(chkgfield0);
        chkgridfields.push(chkgfield1);
        chkgridfields.push(chkgfield2);
        chkgridfields.push(chkgfield3);
        chkgridfields.push(chkgfield4);
        chkgridfields.push(chkgfield5);
        chkgridfields.push(chkgfield6);
        chkgridfields.push(chkgfield7);
        chkgridfields.push(chkgfield8);
        chkgridfields.push(chkgfield9);
        chkgridfields.push(chkgfield10);

    	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});

      var gr = Ext.create('Ext.grid.Panel', {
            id: 'orderlists',
            title: 'orders',
            //selType: 'cellmodel',
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
            selModel: {
                selType: 'cellmodel'
            },
            plugins : [ cellEditor ]

        });

    // create the grid


      return (
           <div></div>
        );

    }

}



//var messages = ['React', 'Re: React', 'Re:Re: React'];

$.ajax({url: "api/orders", success: function(result){

    var orders = result;
//alert(orders);
    $.ajax({url: "api/customers", success: function(resultnew){

    var customers = resultnew;

     ReactDOM.render(
        <Clock2 orders={orders}
                customers={customers} />,
        document.getElementById('example-grid')
     );



    }});


}});




