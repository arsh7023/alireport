class Clock2 extends React.Component
{
    constructor(props) {


        super(props);
        this.state = {value: 'dds'};
        this.customers = this.props.customers;
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }


    render() {

        //const customers = this.props.customers;

        Ext.Loader.setPath('resources', '/resources');
	Ext.Loader.setPath('Ext', 'resources/themes');
  	Ext.Loader.setPath('Ext.ux', 'resources/themes'); 
 
        Ext.Loader.setConfig({ enabled: true});  
      

	Ext.require([
	     'Ext.grid.*',
	     'Ext.chart.*',
	     'Ext.panel.*',
	     'Ext.tab.*',
	     'Ext.data.*',
	     'Ext.form.*',
	     'Ext.util.*',
	     'Ext.window.*',
	     'Ext.ux.*',
	     'Ext.tree.*',
	     'Ext.selection.CheckboxModel'
	]);


        var customStyle = 
        ".x-boundlist-item img.chkCombo { width: 13px; height: 13px; background: transparent url('resources/themes/images/default/grid/unchecked.gif'); }" + 
        ".x-boundlist-selected img.chkCombo { background-position: 0 -13px; width: 13px; height: 13px; background: transparent url('resources/themes/images/default/grid/checked.gif'); }";
    
	Ext.util.CSS.createStyleSheet(customStyle);


        var chkmodelfields = [];
        chkmodelfields.push("customerid");
        chkmodelfields.push("customername");
        chkmodelfields.push("address");
        chkmodelfields.push("suburb");
        chkmodelfields.push("postcode");
        chkmodelfields.push("phone");
        chkmodelfields.push("email");
        chkmodelfields.push("cussource");

        var chkgfield0 = {
            text: "customerid",
            dataIndex: "customerid",
            hidden: true

        };

        var chkgfield1 = {
            text: "customer name",
            dataIndex: "customername",
            width: 150,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield2 = {
            text: "address",
            dataIndex: "address",
            width: 250,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield3 = {
            text: "suburb",
            dataIndex: "suburb",
            width: 150,
            editor : 'textfield',
            type : 'textfield'
        };

        var chkgfield4 = {
            text: "postcode",
            dataIndex: "postcode",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield5 = {
            text: "phone",
            dataIndex: "phone",
            width: 150,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield6 = {
            text: "email",
            dataIndex: "email",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };
	

        var chkgfield7 = {
            text: "customer source",
            dataIndex: "cussource",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

      

       var chkgfield8 = {
            xtype: 'actioncolumn',
            text: "Save",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  
                tooltip: 'Save customer Information',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

		    var customerid= rec.get('customerid');
	            var customername= rec.get('customername');
		    var address= rec.get('address');
		    var suburb= rec.get('suburb');
		    var postcode= rec.get('postcode');
		    var phone= rec.get('phone');
		    var email= rec.get('email');
		    var cussource= rec.get('cussource');

                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateCustomer";



                    var params = {
				 customerid: customerid,
				 customername: customername,
				 address: address,
				 email: email,
				 address: address,
				 suburb: suburb,
				 postcode: postcode,
				 phone: phone,
				 email: email,
				 cussource: cussource
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

                            var retval = JSON.parse(response.responseText);
                            var msg = retval.msg;
		            if (msg == 'Success!')
                            {

		                    //second ajax call
				    Ext.Ajax.request({
				        url: 'api/customers',
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
					     
		                             this.customers = JSON.parse(response.responseText);	
					     Ext.getCmp('datasetlists').store.removeAll();
					     Ext.getCmp('datasetlists').store.loadData(this.customers);


				             Ext.defer(function () {
				                   var box = Ext.Msg.alert({
				                        title: "Update values",
				                        msg: msg,
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
			    else
			    {
				     Ext.defer(function() {
					 var box = Ext.MessageBox.show({
					     title: "ERROR",
					     msg: "Error in Saving , SQL Error is:  " + msg,
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


                }//end handler
            }]
       }


      var chkgfield9 = {
            xtype: 'actioncolumn',
            text: "open orders",
            width: 70,
            items: [{
                icon: 'resources/icons/edit.png', 
                tooltip: 'Open orders',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var customerid = rec.get('customerid');

                    var url = "ordernew.html?id=" + customerid;
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
		                               title : 'Delete customer?',
						msg : 'Are you sure?',
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION,
						fn : function(btn) {
							if (btn === 'yes') {
							    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
							    var url = "api/deleteCustomer";

							    var params = {
									 customerid: grid.store.data.items[rowIndex].data.customerid,
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

                            					    var retval = JSON.parse(response.responseText);
					                            var msg = retval.msg;
								    if (msg == 'Success!')
								    {

									    //second ajax call
									    Ext.Ajax.request({
										url: 'api/customers',
										method: 'get',
										headers: {
										    'contentType': 'application/json; charset=utf-8',
										    'accept': 'application/json',
										},
						 				success: function (response) {
										     waitingMsg2.hide();

										     grid.store.removeAt(rowIndex); 
										     
										     this.customers = JSON.parse(response.responseText);	
										     Ext.getCmp('datasetlists').store.removeAll();
										     Ext.getCmp('datasetlists').store.loadData(this.customers);

										        
										     Ext.defer(function () {
											   var box = Ext.Msg.alert({
												title: "Update values",
												msg: msg,
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
								     else
								     {
									     Ext.defer(function() {
										 var box = Ext.MessageBox.show({
										     title: "ERROR",
										     msg: "Error in Saving , SQL Error is:  " + msg,
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
		
			}//end handler
		} ]
	};

      var chkmodel = Ext.define('DataSet', {
            extend: 'Ext.data.Model',
            fields: chkmodelfields
        });

      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: this.customers
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
            id: 'datasetlists',
            title: 'customers',
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
				var datafield = {
					"customerid" : "",
					"customername" : "",
				        "address" : "",
					"suburb" : "",
				        "postcode" : "",
				        "phone" : "",
				        "email" : "",
				        "cussource" : "",
				};
                                var x=[];
                                x.push(datafield);
				store.insert(gridCount, x);
				cellEditor.startEdit(gridCount, 0);

			}
		    } ],
		} ],

            plugins : [ cellEditor ]

        });

    // create the grid


        return (
           <div></div>
        );

    }

}



//var murl = window.location.protocol + "//" + window.location.host + window.location.pathname.split('/').slice(0, -1).join('/');
var murl = "api/customers";

$.ajax({url: murl , success: function(result){

    var customers = result;
    var data = [];
    if (customers.length == 0)
    {
	customers = data;
    } 
    console.log(customers);
     ReactDOM.render(
        <Clock2 customers={customers}/>,
        document.getElementById('example-grid')
     );


}});





