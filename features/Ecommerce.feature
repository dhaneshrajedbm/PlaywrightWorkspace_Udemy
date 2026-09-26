
Feature: ECommerce Validations

 @Regression  
Scenario: Place product Order

Given User is login to Application with Uname "at@gmail.comtdm" and Pword "Attdm@1234"
When  user add the product "ZARA COAT 3" to the cart
Then  verify the product "ZARA COAT 3 " displayed in cart
When user verify email as "at@gmail.comtdm" and provide valid shipping info and place the Order
Then verify the orderid present in the order history table

@VAlidations @smoke
Scenario Outline: Invalid Login

Given User login to Application with invalid Uname "<username>" and Pword "<password>"
When verify error message is displayed

Examples:
|username        |password  |
|at@gmail.comtdm |Attdm@1234|
|Demo@1234       |Attdm@1234|


