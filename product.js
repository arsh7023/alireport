class Clock2 extends React.Component
{
    constructor(props) {


        super(props);
        this.products = this.props.products;
        
        
        //this.state = {value: 'dds'};
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

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
	chkmodelfields.push("pid");
        chkmodelfields.push("productcode");
        chkmodelfields.push("productname");
        chkmodelfields.push("suppliername");
	chkmodelfields.push("suppliermodelno");
	chkmodelfields.push("productdesc");
	chkmodelfields.push("weight");
	chkmodelfields.push("width");
	chkmodelfields.push("length");
	chkmodelfields.push("height");
	chkmodelfields.push("color");
	chkmodelfields.push("inventory");

        var chkgfield00 = {
            text: "pid",
            dataIndex: "pid",
	    hidden : true,

        };

        var chkgfield0 = {
            text: "productcode",
            dataIndex: "productcode",
	    editor : 'textfield',

        };

        var chkgfield1 = {
            text: "productName",
            dataIndex: "productname",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield2 = {
            text: "Supplier Model No",
            dataIndex: "suppliermodelno",
            width: 100,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield3 = {
            text: "Product Description",
            dataIndex: "productdesc",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield4 = {
            text: "Weight",
            dataIndex: "weight",
            width: 50,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield5 = {
            text: "Width",
            dataIndex: "width",
            width: 50,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield6 = {
            text: "length",
            dataIndex: "length",
            width: 50,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield7 = {
            text: "height",
            dataIndex: "height",
            width: 50,
            editor : 'numberfield',
            type : 'number'
        };


        var chkgfield8 = {
            text: "Inventory",
            dataIndex: "inventory",
            width: 55,
            //editor : 'numberfield',
            //type : 'number',
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

        var chkgfield9 = {
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




       var chkgfield10 = {
            xtype: 'actioncolumn',
            text: "update",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Update values',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

		    var pid = rec.get('pid');
                    var productcode = rec.get('productcode');
                    var productname = rec.get('productname');
		    var suppliername = rec.get('suppliername');
                    var productdesc = rec.get('productdesc');
		    var suppliermodelno = rec.get('suppliermodelno');
		    var weight = rec.get('weight');
		    var width = rec.get('width');
		    var length = rec.get('length');
		    var height = rec.get('height');
		    var color = rec.get('color');
		    var inventory = rec.get('inventory');


                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updateProduct";



                    var suppliercode = '';
		    var idx = comboSupplierStore.find('suppliername', suppliername);
		    if (idx>-1)
		    {
			 suppliercode = comboSupplierStore.getAt(idx).get('suppliercode');
		    }

                    var params = {
			pid: pid,
                        productcode: productcode,
                        productname: productname,
			productdesc: productdesc,
                        suppliercode: suppliercode,
                        suppliermodelno: suppliermodelno,
                        weight: weight,
                        width: width,
                        length: length,
                        height: height,
                        color: color,
                        inventory: inventory,
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
				    Ext.Ajax.request({
				        url: 'api/products',
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
					     
		                             this.products = JSON.parse(response.responseText);	
					     Ext.getCmp('datasetlists').store.removeAll();
					     Ext.getCmp('datasetlists').store.loadData(this.products);


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

	var chkgfield11 = {
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
							    var url = "api/deleteProduct";

							    var params = {
									 productcode: grid.store.data.items[rowIndex].data.productcode,
									 };

						           if (grid.store.data.items[rowIndex].data.pid == "")
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
										url: 'api/products',
										method: 'get',
										headers: {
										    'contentType': 'application/json; charset=utf-8',
										    'accept': 'application/json',
										},
						 				success: function (response) {
										     waitingMsg2.hide();

										     grid.store.removeAt(rowIndex); 
										     
										     this.products = JSON.parse(response.responseText);	
										     Ext.getCmp('datasetlists').store.removeAll();
										     Ext.getCmp('datasetlists').store.loadData(this.products);

										        
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
            data: this.products
        });

        var chkgridfields = [];
	chkgridfields.push(chkgfield00);
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

	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});     


      var gr = Ext.create('Ext.grid.Panel', {
            id: 'datasetlists',
            title: 'Products',
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



var Products = ['React', 'Re: React', 'Re:Re: React'];


$.ajax({url: "api/suppliers", success: function(result){

    var suppliers = result;

    $.ajax({url: "api/products", success: function(resultnew){

    var products = resultnew;

    var data = [];
    if (products.length == 0)
    {
	products = data;
    } 

     ReactDOM.render(
        <Clock2 suppliers={suppliers}
                products={products} />,
        document.getElementById('example-grid')
     );



   }});


}});





