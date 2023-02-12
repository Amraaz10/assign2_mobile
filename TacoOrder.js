const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING:  Symbol("welcoming"),
  NAME: Symbol("name"),
  PHONE:Symbol("phone"),
  VEG: Symbol("veg"),
  NONVEG: Symbol("nonveg"),
  SIDE: Symbol("side"),
  DIPPING:Symbol("dipping"),
  OPTION: Symbol("option"),
  VEGSIZE: Symbol("Vegsize"),
  NONSIZE: Symbol("Nonveg size"),
  DRINKS:  Symbol("drinks"),
  BILL: Symbol ("bill"),
  PAYMENT: Symbol("payment")
});

module.exports = class TacoOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sName="";
        this.sPhone="";
        this.sSize = "";
        this.sSide="";
        this.sDipping = "";
        this.sDrinks = "";
        this.sOption="";
        this.sItem1 = "veg-taco";
        this.sItem2="nonveg-taco";
        this.sItem="Taco"
        this.price=0;

    }
    handleInput(sInput){
      let aReturn = [];
        switch(this.stateCur){
            // case for welcoming
        case OrderState.WELCOMING:   
        this.price=0;
        
        this.stateCur=OrderState.NAME;
            aReturn.push("Welcome to Taco bell");
            aReturn.push("Enter your  Name ");
            break;
            
            // case for name 
            case OrderState.NAME:
                this.stateCur = OrderState.PHONE;
                this.sName=sInput;
                aReturn.push("Please enter your phone number");
            break;

             // case for phone
             case OrderState.PHONE:
                this.stateCur = OrderState.OPTION;
                this.sPhone=sInput;
                const phoneregex=/^\d{10}$/;
                if(phoneregex.test(this.sPhone)){
                    this.stateCur= OrderState.OPTION;
                    aReturn.push("What Taco would you like to have. VEG OR NON-VEG ?");
                    aReturn.push("Press '1' for VEG Taco and '2' for NON-VEG Taco");
                }
                else{
                    this.stateCur=OrderState.PHONE;
                    this.sPhone=sInput;
                    aReturn.push("Wrong format!! Please enter a valid 10 digit phone number")
                }
                break;
                

                // case for veg/nonveg selection
                case OrderState.OPTION:
                this.sOption=sInput;
                if(sInput==1){
                    this.stateCur=OrderState.VEGSIZE;
                    this.sOption=sInput;
                    aReturn.push("what size of Veg-taco would you like?")
                    aReturn.push("Small=$5,Medium=$10,Large=$15")
                    aReturn.push("Press 'S' for small, 'M' for medium, 'L' for large")
                }
                else if(sInput==2){
                    this.stateCur=OrderState.NONSIZE;
                    this.sOption=sInput;
                    aReturn.push("what size of non-veg taco would you like?")
                    aReturn.push("Small=$6,Medium=$11,Large=$16")
                    aReturn.push("Press 'S' for small, 'M' for medium, 'L' for large")
                }
                else{
                    this.stateCur=OrderState.OPTION;
                    this.sOption=sInput;
                    aReturn.push("INVALID INPUT!! SELECT '1' or '2'")
                }
                break;

                //case for veg taco size
                case OrderState.VEGSIZE:
                this.stateCur = OrderState.SIDE
                this.sSize = sInput;
                if(this.sSize =="s" || this.sSize== "S"){
                    this.price= this.price + 5;
                }
                else if(this.sSize =="m" || this.sSize== "M"){
                    this.price= this.price + 10;
                }
                else if(this.sSize =="l" || this.sSize== "L"){
                    this.price= this.price + 15;
                }
                else{
                    this.stateCur=OrderState.VEGSIZE;
                    this.sSize=sInput;
                    aReturn.push("INVALID INPUT!! PRESS 'S' or 'M' or 'L'");
                    break;
                    }
                aReturn.push("What side item would you like to have? ");
                aReturn.push("Fries=$5,Poutine=$7,Onion rings=$9 ");
                aReturn.push("Press F for fries, P for Poutine, O for onion rings");
                aReturn.push("Press 'No' if you do not want to add any side item ");

                break;

                //case for non veg taco size
                case OrderState.NONSIZE:
                    this.stateCur = OrderState.SIDE
                    this.sSize = sInput;
                    if(this.sSize =="s" || this.sSize== "S"){
                        this.price= this.price + 6;
                    }
                    else if(this.sSize =="m" || this.sSize== "M"){
                        this.price= this.price + 11;
                    }
                    else if(this.sSize =="l" || this.sSize== "L"){
                        this.price= this.price + 16;
                    }
                    else{
                        this.stateCur=OrderState.NONSIZE;
                        this.sSize=sInput;
                        aReturn.push("INVALID INPUT!! PRESS 'S' or 'M' or 'L'");
                        break;
                         }
                         aReturn.push("What side item would you like to have? ");
                         aReturn.push("Fries=$5,Poutine=$7,Onion rings=$9 ");
                         aReturn.push("Press F for fries, P for Poutine, O for onion rings");
                         aReturn.push("Press 'No' if you do not want to add any side item ");
                    break;

                 
                    //Side case   
                case OrderState.SIDE:
                    this.stateCur= OrderState.DIPPING
                    this.sSide=sInput;
                    if(this.sSide =="f" || this.sSide== "F"){
                        this.price= this.price + 5;
                    }
                    else if(this.sSide =="p" || this.sSide== "P"){
                        this.price= this.price + 7;
                    }
                    else if(this.sSide =="o" || this.sSide == "O"){
                        this.price= this.price + 9;
                    }
                    else if(this.sSide =="no" || this.sSide == "NO" || this.sSide == "No" || this.sSide == "nO" ){
                        this.price= this.price + 0;
                    }
                    else{
                        this.stateCur=OrderState.SIDE;
                        this.sSize=sInput;
                        aReturn.push("INVALID INPUT!! PRESS 'F' or 'P' or 'O' or 'NO'  ");
                        break;
                         }
                    aReturn.push("Add any dipping for $1 ");
                    aReturn.push(" Dippings availaible - Mayo, Ranch, Chipotle ");
                    aReturn.push(" Press 'M' for mayo, 'R' for ranch, 'C' for chipotle ");
                    aReturn.push("Press 'No' if you do not want any dipping ");

                   break;



                    //toppings case
                 case OrderState.DIPPING:
                this.stateCur = OrderState.DRINKS
                this.sDipping = sInput;
                if(this.sDipping =="m" || this.sDipping== "M"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="r" || this.sDipping== "R"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="c" || this.sDipping == "C"){
                    this.price= this.price + 1;
                }
                else if(this.sDipping =="no" || this.sDipping == "NO" || this.sDipping == "No" || this.sDipping == "nO" ){
                    this.price= this.price + 0;
                }
                else{
                    this.stateCur=OrderState.DIPPING;
                    this.sDipping=sInput;
                    aReturn.push("INVALID INPUT!! PRESS 'M' or 'R' or 'C' or 'NO'  ");
                    break;
                     }     
                aReturn.push("Grab any drink for 5$");
                aReturn.push("Press 'C' for Coke, 'S' for Sprite,'F' for Fanta ");
                aReturn.push("Type 'No' if you do not want any drink");
                 break;
            
                 //drinks case
                case OrderState.DRINKS:
                // this.isDone(true);
                this.stateCur = OrderState.PAYMENT;
                this.sDrinks = sInput;
                if(this.sDrinks =="c" || this.sDrinks== "C"){
                    this.price= this.price + 5;
                }
                else if(this.sDrinks =="s" || this.sDrinks== "S"){
                    this.price= this.price + 5;
                }
                else if(this.sDrinks =="f" || this.sDrinks =="F"){
                    this.price= this.price + 5;
                }     

                else if(this.sDrinks == "no" || this.sDrinks=="NO" || this.sDrinks=="No" || this.sDrinks=="nO" ){
                    this.price=this.price + 0;
                }
                else{
                    this.stateCur=OrderState.DRINKS;
                    this.sDrinks= sInput; 
                    aReturn.push("INVALID INPUT!! PRESS 'C' or 'S' or 'F' or 'NO'")
                    break;
                }
                
                //bill
                // size output print
                aReturn.push(`Hey ${this.sName} `)
                if(this.sSize=="s" || this.sSize=="S"){
                    this.sSize="small";
                }
                else if(this.sSize=="m" || this.sSize=="M"){
                    this.sSize="medium";
                }
                else{
                    this.sSize="large";
                }

                //veg non veg item output print
                if(this.sOption==1){
                    this.sItem= "Veg taco"
                }
                else{
                    this.sItem="Non veg taco"
                }

               //name, size , item output  print 
                 aReturn.push(` Thank you for your order of ${this.sSize} ${this.sItem} `);



                //dippings output print 
                if(this.sDipping=='c' || this.sDipping=='C'){
                    this.sDipping="chipotle";
                    aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else if(this.sDipping=='r' || this.sDipping=='R')
                    {
                    this.sDipping="ranch";
                      aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else if(this.sDipping=='m' || this.sDipping=='M')
                    {
                    this.sDipping="mayo" ;
                    aReturn.push(`with dipping- ${this.sDipping} `);
                    }
                    else{
                        this.sDipping="(no dipping selected) ";
                        aReturn.push(` ${this.sDipping} `);
                        }

                
                
                //side item output print
                if(this.sSide=='f' || this.sSide=='f'){
                this.sSide="fries";
                aReturn.push(`with side item - ${this.sSide} `);
                }
                else if(this.sSide=='p' || this.sSide=='P')
                {
                this.sSide="poutine";
                  aReturn.push(`with side item - ${this.sSide} `);
                }
                else if(this.sSide=='o' || this.sSide=='O')
                {
                this.sSide="onion rings" ;
                aReturn.push(`with side item - ${this.sSide} `);
                }

                else{
                    this.sSide="(no side item selected) ";
                    aReturn.push(`${this.sSide} `);
                    }


                // drink item output print
                if(this.sDrinks=='c' || this.sDrinks=='C'){
                    this.sDrinks="Coke";
                    aReturn.push(`with drink- ${this.sDrinks} `);
                    }
                    else if(this.sDrinks=='s' || this.sDrinks=='S')
                    {
                    this.sDrinks="Sprite";
                      aReturn.push(`with drink- ${this.sDrinks} `);
                    }
                    else if(this.sDrinks=='f' || this.sDrinks=='F')
                    {
                    this.sDrinks="Fanta" ;
                    aReturn.push(`with drink- ${this.sDrinks} `);
                    }    


                // if(this.sDrinks == "no" || this.sDrinks=="NO" || this.sDrinks=="No" || this.sDrinks=="nO"){
                //     aReturn.push("(no drinks selected)");
                // }
                else{
                    aReturn.push ( `(no drink selected)`);
                }
                 
                
                //
                this.nOrder= this.price;
                aReturn.push(`Please pay for your order here`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                this.stateCur = OrderState.PAYMENT;
                break;

                // aReturn.push(`contact-${this.sPhone} `);
                // aReturn.push(`Total amount is $ ${this.price}`);
                // let d = new Date(); 
                // d.setMinutes(d.getMinutes() + 20);
                // aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                // this.stateCur=OrderState.WELCOMING;
                // break;
            
                case OrderState.PAYMENT:
                console.log(sInput);
                this.isDone(true);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
        this.nOrder = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'ATEej68kYCJoJLbWWel-ICXzAITRxFbEtCCYnUkTEdEQudZIwBtQcUsTOM44zEV-Nv7PFjsTkvy3Mxub'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> 
        </script>
        Thank you  ${this.sName},contact-${this.sPhone} for your ${this.sItem} order of $${this.nOrder}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.nOrder}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}