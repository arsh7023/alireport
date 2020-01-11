class Clock2 extends React.Component
{
    constructor(props) {


        super(props);
        this.state = {value: 'dds'};
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }



    handleSubmit(event) {

        /*alert('A name was submitted: ' + document.getElementById("demo").value); // this.state.value
        Ext.getCmp('datasetlists').getStore().each(function(rec) {
		      alert(rec.get("name"));
        });*/

         
        var customername = document.getElementById("customername").value
        var address = document.getElementById("address").value

var x = {};
x.productcode = productcode;
x.productname = productname;

        
              Ext.Ajax.request({url : 'http://localhost/react/rest/api/insertProduct',
                     method : 'post',
                     jsonData : x,
                      headers : {contentType : 'application/json; charset=utf-8','accept' : 'application/json'},
        	       success : function(response) {
                            alert(response.responseText);
       		        }
                        ,
			failure : function(response,options) {
                            alert(response.responseText);
                        }

               });


        event.preventDefault();

    }


    render() {
        const messages = this.props.myjson;
//alert(JSON.stringify(messages));


///////


      /*
Ext.Loader.setPath({
        'Ext.ux.desktop': 'resources',
      }); 

         Ext.Loader.setPath('resources', '/resources');
        Ext.Loader.setConfig({ enabled: true}); 
*/

     Ext.Loader.setPath({
        'Ext': 'resources',
      }); 

	Ext.require([
	    'Ext.data.*',
	    'Ext.grid.*'
	]);


        var chkmodelfields = [];
        chkmodelfields.push("customername");
        chkmodelfields.push("address");


        var chkgfield0 = {
            text: "customername",
            dataIndex: "customername",

        };

        var chkgfield1 = {
            text: "address",
            dataIndex: "address",
            width: 400,
            editor : 'textfield',
            type : 'text'
        };

       var chkgfield2 = {
            xtype: 'actioncolumn',
            text: "update",
            width: 50,
            items: [{
                icon: 'resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: 'Update title and availability',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    var customername = rec.get('customername');
                    var address = rec.get('address');


   

                    var waitingMsg2 = Ext.MessageBox.wait('Please wait...', 'Please wait');
                    var url = "http://localhost/react/rest/api/updateCustomer";

                    var params = {
                        customername: customername,
                        address: address,
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

      var chkmodel = Ext.define('DataSet', {
            extend: 'Ext.data.Model',
            fields: chkmodelfields
        });

      var chkstore = Ext.create('Ext.data.Store', {
            model: chkmodel,
            data: messages
        });

        var chkgridfields = [];
        chkgridfields.push(chkgfield0);
        chkgridfields.push(chkgfield1);
        chkgridfields.push(chkgfield2);

    

      var gr = Ext.create('Ext.grid.Panel', {
            id: 'customerlists',
            title: 'Customers',
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
            flex: 1,
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]

        });

    // create the grid


        return (


           <form onSubmit={this.handleSubmit}>
                <label>


                </label>
                <input type="submit" value="Submit" /><br/>
                 Enter No:<input type="text" id="demo" name="demo"/><br/> 


		product code:<input type="text" id="customername" name="customername"/><br/> 

		product name:<input type="text" id="address" name="address"/><br/> 

            <button type="button" onClick={this.handleSubmit}>Save</button>

            </form>
          
           


        );

    }

}



var messages = ['React', 'Re: React', 'Re:Re: React'];

$.ajax({url: "api/customers", success: function(result){

     ReactDOM.render(

        <Clock2 myjson={result}/>,
        document.getElementById('example-grid')
    );

}});




