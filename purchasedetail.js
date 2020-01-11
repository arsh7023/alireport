class Clock2 extends React.Component
{
     constructor(props) {
        super(props);
        this.purchasedetails = this.props.purchasedetails;
        //this.state = {value: 'dds'};
    }


    render() {
        
        const products = this.props.products;
        const purchaseid = this.props.purchaseid;
	const pinumber = this.props.pinumber;

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
        chkmodelfields.push("purchasedetailid");
        chkmodelfields.push("productcode");
	chkmodelfields.push("unitpriceaud");
        chkmodelfields.push("unitpriceusd");
        chkmodelfields.push("quantity");
        chkmodelfields.push("purchasedesc");
        chkmodelfields.push("reciveddate");
        chkmodelfields.push("hasdelay");
        chkmodelfields.push("delaydays");
        chkmodelfields.push("cogaaud");
	chkmodelfields.push("remaining");



        var chkgfield0 = {
            text: "purchasedetailid",
            dataIndex: "purchasedetailid",
            //hidden : true

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
                width: 200,
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


        var chkgfield2 = {
            text: "Unit Price AUD",
            dataIndex: "unitpriceaud",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield3 = {
            text: "Unit Price USD",
            dataIndex: "unitpriceusd",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield4 = {
            text: "quantity",
            dataIndex: "quantity",
            width: 70,
            editor : 'numberfield',
            type : 'number'
        };
	

        var chkgfield5 = {
            text: "purchase description",
            dataIndex: "purchasedesc",
            width: 200,
            editor : 'textfield',
            type : 'text'
        };

        var chkgfield6 = {
            text: "recieve date",
            dataIndex: "reciveddate",
	    editor : 'datefield',
            xtype : 'datecolumn',
            format : 'Y-m-d',
	    width : 150
        };

        var chkgfield7 = {
            text: "Has Delay",
            dataIndex: "hasdelay",
            width: 70,
            editor : 'checkbox',
        };

        var chkgfield8 = {
            text: "Delay Days",
            dataIndex: "delaydays",
            width: 70,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield9 = {
            text: "COGA aud",
            dataIndex: "cogaaud",
            width: 100,
            editor : 'numberfield',
            type : 'number'
        };

        var chkgfield90 = {
            text: "remaining",
            dataIndex: "remaining",
            width: 100,
        };


       var chkgfield10 = {
            xtype: 'actioncolumn',
            text: "Save",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Save values',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var purchasedetailid = rec.get('purchasedetailid');
                    var productcode = rec.get('productcode');
                    var quantity = rec.get('quantity');
                    var purchasedesc = rec.get('purchasedesc'); 
                    var reciveddate = rec.get('reciveddate'); 
 		    var unitpriceaud = rec.get('unitpriceaud'); 
                    var unitpriceusd = rec.get('unitpriceusd'); 
                    var hasdelay = rec.get('hasdelay');                    
                    var delaydays = rec.get('delaydays'); 
                    var cogaaud = rec.get('cogaaud');  


                    console.log('purchasedetailid: ' + purchasedetailid);
                    if (productcode != '')
                    {
                        console.log('productcode: ' + productcode);
                    }

      
                    
                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "api/updatePurchaseDetail";

                    var params = {
                        purchasedetailid: purchasedetailid,
                        productcode: productcode,
                        quantity: quantity,
                        purchasedesc: purchasedesc,
                        reciveddate: reciveddate,
			unitpriceaud : unitpriceaud,
			unitpriceusd : unitpriceusd,
                        hasdelay: hasdelay,
                        delaydays: delaydays,
                        cogaaud: cogaaud,
                        purchaseid : purchaseid
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
				        url: 'api/purchasedetailsforOne?id=' + purchaseid,
				        method: 'get',
				        headers: {
				            'contentType': 'application/json; charset=utf-8',
				            'accept': 'application/json',
				        },
	 				success: function (response) {
		                             waitingMsg2.hide();
					     
		                             this.purchasedetails = JSON.parse(response.responseText);	
					     Ext.getCmp('datasetlists').store.removeAll();
					     Ext.getCmp('datasetlists').store.loadData(this.purchasedetails);


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
		                               title : 'Deleting Purchase Detail?',
						msg : 'Are you sure?',
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION,
						fn : function(btn) {
							if (btn === 'yes') {
							    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
							    var url = "api/deletePurchaseDetail";

							    var params = {
									 purchasedetailid: grid.store.data.items[rowIndex].data.purchasedetailid,
									 };

						           if (grid.store.data.items[rowIndex].data.purchasedetailid == "")
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
										url:'api/purchasedetailsforOne?id=' + purchaseid,
										method: 'get',
										headers: {
										    'contentType': 'application/json; charset=utf-8',
										    'accept': 'application/json',
										},
						 				success: function (response) {
										     waitingMsg2.hide();

										     grid.store.removeAt(rowIndex); 
										     
										     this.purchasedetails = JSON.parse(response.responseText);	
										     Ext.getCmp('datasetlists').store.removeAll();
										     Ext.getCmp('datasetlists').store.loadData(this.purchasedetails);

										        
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
            data: this.purchasedetails
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
	chkgridfields.push(chkgfield90);
	chkgridfields.push(chkgfield10);
	chkgridfields.push(chkgfield11);


	var cellEditor = Ext.create(
		'Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	});    



      var gr = Ext.create('Ext.grid.Panel', {
            id: 'datasetlists',
            title: 'purchase details for pinumber: ' + pinumber,
            bpurchase: 0,
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
var pinumber = searchParams.get('pinumber');


$.ajax({url: "api/purchasedetailsforOne?id=" + param, success: function(result){

    var purchasedetails = result;
    $.ajax({url: "api/products", success: function(resultnew){

    var products = resultnew;

    var data = [];
    if (purchasedetails.length == 0)
    {
	purchasedetails = data;
    } 


     ReactDOM.render(
        <Clock2 purchasedetails={purchasedetails}
                products={products} 
                pinumber={pinumber} 
                purchaseid = {param}/>,
        document.getElementById('example-grid')
     );



   }});


}});




