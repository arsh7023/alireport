class Clock2 extends React.Component
{
    constructor(props) {


        super(props);
        this.state = {value: 'dds'};
        this.suppliers = this.props.suppliers;
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }


    render() {

        //const suppliers = this.props.suppliers;

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
        chkmodelfields.push("suppliercode");
        chkmodelfields.push("suppliername");
        chkmodelfields.push("country");
        chkmodelfields.push("email");
        chkmodelfields.push("address");
        chkmodelfields.push("contactname");
        chkmodelfields.push("phone");
        chkmodelfields.push("fax");
        chkmodelfields.push("mobile");
        chkmodelfields.push("website");
        chkmodelfields.push("supplierdesc");
        chkmodelfields.push("paypalacc");




        var chkgfield0 = {
            text: "supplier code",
            dataIndex: "suppliercode",
            hidden: true

        };

        var chkgfield1 = {
            text: "supplier name",
            dataIndex: "suppliername",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield2 = {
            text: "country",
            dataIndex: "country",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield3 = {
            text: "email",
            dataIndex: "email",
            width: 150,
            editor : 'textfield',
            type : 'textfield'
        };

        var chkgfield4 = {
            text: "address",
            dataIndex: "address",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield5 = {
            text: "contact name",
            dataIndex: "contactname",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield6 = {
            text: "phone",
            dataIndex: "phone",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };
	

        var chkgfield7 = {
            text: "fax",
            dataIndex: "fax",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield8 = {
            text: "mobile",
            dataIndex: "mobile",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };
        var chkgfield9 = {
            text: "website",
            dataIndex: "website",
            width: 250,
            editor : 'textfield',
            type : 'text'
        };
        var chkgfield10 = {
            text: "supplier desc",
            dataIndex: "supplierdesc",
            width: 150,
            editor : 'textfield',
            type : 'text'
        };
        var chkgfield11 = {
            text: "paypalacc",
            dataIndex: "paypalacc",
            width: 150,
            editor : 'textfield',
            type : 'text'
        };


       var chkgfield12 = {
            xtype: 'actioncolumn',
            text: "Save",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  
                tooltip: 'Save Supplier Information',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

		    var suppliercode= rec.get('suppliercode');
	            var suppliername= rec.get('suppliername');
		    var country= rec.get('country');
		    var email= rec.get('email');
		    var address= rec.get('address');
		    var contactname= rec.get('contactname');
		    var phone= rec.get('phone');
		    var fax= rec.get('fax');
		    var mobile= rec.get('mobile');
		    var website= rec.get('website');
		    var supplierdesc= rec.get('supplierdesc');
		    var paypalacc= rec.get('paypalacc');

                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateSupplier";



                    var params = {
				 suppliercode: suppliercode,
				 suppliername: suppliername,
				 country: country,
				 email: email,
				 address: address,
				 contactname: contactname,
				 phone: phone,
				 fax: fax,
				 mobile: mobile,
				 website: website,
				 supplierdesc: supplierdesc,
				 paypalacc: paypalacc
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
                            var retval = JSON.parse(response.responseText);
                            var msg = retval.msg;
		            if (msg == 'Success!')
                            {
				    Ext.Ajax.request({
				        url: 'api/suppliers',
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
					     
		                             this.suppliers = JSON.parse(response.responseText);	
					     Ext.getCmp('datasetlists').store.removeAll();
					     Ext.getCmp('datasetlists').store.loadData(this.suppliers);


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

	var chkgfield13 = {
		xtype : 'actioncolumn',
		width : 26,
		header : '',
		sortable : false,
		items : [ {
			iconCls : 'wif-grid-row-delete',
			tooltip : 'Delete',
			handler : function(grid, rowIndex, colIndex) {

				Ext.Msg.show({
		                               title : 'Delete Supplier?',
						msg : 'Are you sure?',
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION,
						fn : function(btn) {
							if (btn === 'yes') {
							    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
							    var url = "api/deleteSupplier";

							    var params = {
									 suppliercode: grid.store.data.items[rowIndex].data.suppliercode,
									 };

						           if (grid.store.data.items[rowIndex].data.suppliercode == "")
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

									    //second ajax call
									    Ext.Ajax.request({
										url: 'api/suppliers',
										method: 'get',
										headers: {
										    'contentType': 'application/json; charset=utf-8',
										    'accept': 'application/json',
										},
						 				success: function (response) {
										     waitingMsg2.hide();

										     grid.store.removeAt(rowIndex); 
										     
										     this.suppliers = JSON.parse(response.responseText);	
										     Ext.getCmp('datasetlists').store.removeAll();
										     Ext.getCmp('datasetlists').store.loadData(this.suppliers);

										        
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
            data: this.suppliers
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
	chkgridfields.push(chkgfield11);
	chkgridfields.push(chkgfield12);
        chkgridfields.push(chkgfield13);
	

	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});     


      var gr = Ext.create('Ext.grid.Panel', {
            id: 'datasetlists',
            title: 'Suppliers',
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
	    viewConfig: {
		stripeRows: true,
		enableTextSelection: true
	    },
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

            plugins : [ cellEditor ]

        });

    // create the grid


        return (
           <div></div>
        );

    }

}



//var murl = window.location.protocol + "//" + window.location.host + window.location.pathname.split('/').slice(0, -1).join('/');
var murl = "api/suppliers";

$.ajax({url: murl , success: function(result){

    var suppliers = result;

    var data = [];
    if (suppliers.length == 0)
    {
	suppliers = data;
    } 
    console.log(suppliers);
     ReactDOM.render(
        <Clock2 suppliers={suppliers}/>,
        document.getElementById('example-grid')
     );


}});





