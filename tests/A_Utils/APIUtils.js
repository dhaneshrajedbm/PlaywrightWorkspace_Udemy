
class APIUtils{
// ************** Precondition Data Setup ^^^^^^^^^^^
    /* we have creates the APIContext in actual test as -->     //const requestContext = await request.newContext()
       and we have to access in this  class . so create the constructor of class and intialise in it
       when we create obj of this class in test class the this constructor is automatically invoked and parameter we defined is catched here
    */  
constructor(requestContext , loginPayload){ // Here we are making the login /info as mandatory by passing and 
                                           // initialise in constructor becaue without login we cannot run any test case. so that whenever we create object of this classs in test class to run any utils method we have to pass the login payload to call login api before run every test case

    this.requestContext = requestContext;
    this.loginPayload   = loginPayload;
}

async getToken() {
     
       // Login To App API
    
       const loginResponseObject = await this.requestContext.post( "https://rahulshettyacademy.com/api/ecom/auth/login" ,
                                                             {
                                                               data : this.loginPayload 
                                                             }
                                                         );
                             const responseJson       = await loginResponseObject.json();      // store login response json in one object
                             const tokenValue          = responseJson.token;              // extract the token value from response jason
                             console.log(tokenValue);
                             
                             return tokenValue;
    

}

async placeOrder(placeOrderPayload){

       // Place Oreder Api
       
       let dummyRespObj   = {};   // we create the dummy object to store the token and  order id we get from api
       dummyRespObj.tokenValue = await this.getToken();   // Here we have store generated token from login api in dummy object

       const placeOrderResponse = await this.requestContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                                                          {
                                                            data : placeOrderPayload,
                                                            headers:{
                                                                      'authorization' : dummyRespObj.tokenValue ,     //  // we store token in dummy response so we write-> response.token instead of this ->'authorization' : this.getToken()
                                                                      'content-type'  : 'application/json'
                                                                    }
                                                         });
                               const placeOrderJson = await placeOrderResponse.json(); 
                              const  orderIdValue   = await placeOrderJson.orders[0];  
                               const successmsg     = await  placeOrderJson.message;  
                               console.log(successmsg);
                               console.log(placeOrderJson);
    
                               console.log("Extracted Order Id = "+orderIdValue);
                               dummyRespObj.orderIdValue = orderIdValue;   // we store orderIdValue in created dummy object

                              return dummyRespObj;
}     
}
module.exports = {APIUtils}  // to visible and accessible this class globally throughout the project