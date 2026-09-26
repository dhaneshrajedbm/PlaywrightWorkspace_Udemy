Feature: Error Validations

@VAlidations @smoke
Scenario Outline: Invalid Login

Given User login to Application with invalid Uname "<username>" and Pword "<password>"
When verify error message is displayed

Examples:
|username        |password  |
|at@gmail.comtdm |Attdm@1234|
|Demo@1234       |Attdm@1234|