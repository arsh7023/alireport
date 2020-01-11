class Clock2 extends React.Component
{
    constructor(props) {


        super(props);
        //this.state = {value: 'dds'};
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.purchases = this.props.purchases;

    }


    render() {

        const suppliers = this.props.suppliers;

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
        chkmodelfields.push("purchaseid");
        chkmodelfields.push("pinumber");
        chkmodelfields.push("pidate");
	chkmodelfields.push("shippingcostaud");
	chkmodelfields.push("shippingcostusd");
	chkmodelfields.push("suppliername");
	chkmodelfields.push("tariffcostaud");
	chkmodelfields.push("othercostaud");



        var chkgfield0 = {
            text: "purchaseid",
            dataIndex: "purchaseid",
            hidden: true
        };

        var chkgfield1 = {
            text: "purchaseNumber",
            dataIndex: "pinumber",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };
        var chkgfield2 = {
            text: "date",
            dataIndex: "pidate",
	    editor : 'datefield',
            xtype : 'datecolumn',
            format : 'Y-m-d',
	    width : 150
        };
        var chkgfield3 = {
            text: "shippingcostaud",
            dataIndex: "shippingcostaud",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };
        var chkgfield4 = {
            text: "shippingcostusd",
            dataIndex: "shippingcostusd",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };


	Ext.define('comboSupplierNames', {
		extend : 'Ext.data.Model',
		fields : [ 
                   {
		      type : 'string',
		      name : 'suppliercode'
		   }
                   , 
                   {
		      type : 'string',
		      name : 'suppliername'
		   }
		   

                ]
	});

        var x={};
        x.suppliercode="";
        x.suppliername = "";
        suppliers.push(x);
       	var comboSupplierStore = Ext.create('Ext.data.Store', {
                id:'comboSupplierStore',
		model : 'comboSupplierNames',
		data : suppliers
	});

        var chkgfield5 = {
		xtype : 'gridcolumn',
		text : 'supplier',
		dataIndex : 'suppliername',//id
                width: 100,
		editor : {
			xtype : 'combobox',
                        extend : 'Ext.form.field.ComboBox',
                        ////listClass: 'x-combo-list-small',

                        //multiSelect: true,

			//allowBlank : true,
                        //forceSelection: true,
                        typeAhead: false,
			editable: false,
			displayField : 'suppliername',
			valueField : 'suppliername',
			queryMode : 'local',
			store : comboSupplierStore,
                        triggerAction: 'all',

			displayTpl: '<tpl for=".">' + // for multiSelect
				     '{suppliername}<tpl if="xindex < xcount">,</tpl>' +
				     '</tpl>'
		       , listConfig: {
			  getInnerTpl: function() {
			    return '<div class="x-combo-list-item"><img src="' +
			    Ext.BLANK_IMAGE_URL +
			    '" class="chkCombo-default-icon chkCombo" /> {suppliername} </div>';
			   }

                        }

		}//end editor

         };

        var chkgfield6 = {
            text: "tariffcostaud",
            dataIndex: "tariffcostaud",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield7 = {
            text: "othercostaud",
            dataIndex: "othercostaud",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };


       var chkgfield8 = {
            xtype: 'actioncolumn',
            text: "Save",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Save values',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var purchaseid = rec.get('purchaseid');
                    var pinumber = rec.get('pinumber');
                    var pidate = rec.get('pidate');
                    var shippingcostaud = rec.get('shippingcostaud');
                    var shippingcostusd = rec.get('shippingcostusd');
                    var suppliername = rec.get('suppliername');
                    var tariffcostaud = rec.get('tariffcostaud');
                    var othercostaud = rec.get('othercostaud');

                    var suppliercode = '';
		    var idx = comboSupplierStore.find('suppliername', suppliername);
		    if (idx>-1)
		    {
			 suppliercode = comboSupplierStore.getAt(idx).get('suppliercode');
		    }	

                    
                    var url = "api/updatePurchase";

                    var params = {
                        purchaseid: purchaseid,
                        pinumber: pinumber,
                        pidate: pidate,
                        shippingcostaud: shippingcostaud,
                        shippingcostusd: shippingcostusd,
                        suppliercode: suppliercode,
                        tariffcostaud: tariffcostaud,
                        othercostaud: othercostaud,
                    };

                   
                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');

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

				    Ext.Ajax.request({
				        url: 'api/purchases',
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
					     
		                             this.purchases = JSON.parse(response.responseText);	
					     Ext.getCmp('datasetlists').store.removeAll();
					     Ext.getCmp('datasetlists').store.loadData(this.purchases);


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
            text: "open details",
            width: 70,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Open purchase details',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var purchaseid = rec.get('purchaseid');
		    var pinumber = rec.get('pinumber');
                    var url = "purchasedetail.html?id=" + purchaseid + "&pinumber=" + pinumber;
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
		                               title : 'Deleting Purchase?',
						msg : 'Are you sure?',
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION,
						fn : function(btn) {
							if (btn === 'yes') {
							    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
							    var url = "api/deletePurchase";

							    var params = {
									 purchaseid: grid.store.data.items[rowIndex].data.purchaseid,
									 };

						           if (grid.store.data.items[rowIndex].data.purchaseid == "")
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
										url: 'api/purchases',
										method: 'get',
										headers: {
										    'contentType': 'application/json; charset=utf-8',
										    'accept': 'application/json',
										},
						 				success: function (response) {
										     waitingMsg2.hide();

										     grid.store.removeAt(rowIndex); 
										     
										     this.purchases = JSON.parse(response.responseText);	
										     Ext.getCmp('datasetlists').store.removeAll();
										     Ext.getCmp('datasetlists').store.loadData(this.purchases);

										        
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
										    Ext.MessageBox.alert(response.responseText);
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
			}
		} ]
	};

      var chkmodel = Ext.define('DataSet', {
            extend: 'Ext.data.Model',
            fields: chkmodelfields
        });

      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: this.purchases
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
            title: 'purchases',
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
	    viewConfig: {
		stripeRows: true,
		enableTextSelection: true
	    },
            plugins : [ cellEditor ]

        });

    // create the grid


        return (
           <div></div>
        );

    }

}



var purchases = ['React', 'Re: React', 'Re:Re: React'];


$.ajax({url: "api/suppliers", success: function(result){

    var suppliers = result;

    $.ajax({url: "api/purchases", success: function(resultnew){

    var purchases = resultnew;

    var data = [];
    if (purchases.length == 0)
    {
	purchases = data;
    } 

     ReactDOM.render(
        <Clock2 suppliers={suppliers}
                purchases={purchases} />,
        document.getElementById('example-grid')
     );



   }});


}});





