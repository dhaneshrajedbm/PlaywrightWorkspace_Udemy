/*

Cucumber Installation

1.Goto Official documentation - https://github.com/cucumber/cucumber-js
2. run CMD for installation   - npm install @cucumber/cucumber
3. Then in package.json cucumber dependacies is added
4. Install Cucumber Gherkin plugin -> goto Extentions -> search Cucumber grerkin -> install
5.Restart the vs code

6. Craete the Folder -feature to maintain features files
7. create the file with .feature extention and write the scnariao in given ,when ,then gherkin steps
*/
8. //To generate the step definations and to execute any feature file run the cmd->  npx cucumber-js
 // or -> npx cucumber-js BDD_CucumberFramework\A_Features/**/*.feature 
 //npx cucumber-js BDD_CucumberFramework/A_Features/**/*.feature --require BDD_CucumberFramework/B_StepDefinations/steps.js

 //9. npx find the cucumber executable files from the node modules to execute feature files
//10. cucumber executable files(cucumber.js) search the  files with extention .feature
//and execute them.


/* we are gettin the error while running the feature file with hooks because cucumber is ignoring the 
// hooks file or he dont know the where the hooks file is
// so fix this we have created on custom script in package.json file by explicitly adding/defining 
// the path of feature ,path of step definations and path of Hooks
*/  //as -
//   "scripts": {
//   //  "CucumberTestWithHooks": "cucumber-js features/**/*.feature --require features/step_Definations/stepsWithHooks.js --require features/support/*.js"
//      },

// to run it use cmd - npm run CucumberTestWithHooks

//*************  HOOKS and TAgs *************
// or we can run directly specific feature with specific steps and hooks wih cmd

//npx cucumber-js --require features/step_Definations/stepsWithHooks.js --require features/support/hooks.js
  
// Run Feature file with specific tag--> 

// npx cucumber-js --tags "@Regression" --require features\step_Definations\stepsWithHooks.js --require features\support\hooks.js

/************ Parallel test Execution *****************

# we can run multiple scenarios parallely which are present in same feature file
#  But we cannot run multiple feature files parallely because tis is limitation of cucumber

just we have use in cmd as - --parallel 3   -  3 is the total no of scenarios in the feature file    

npx cucumber-js features\Ecommerce.feature --parallel 2 --require features\step_Definations\stepsWithHooksTags.js --require features\support\hooks.js


*******Generate HTML report***********

# To generate Diferent report just mention in cmd ->  --format html:cucumber-report.html
# then html report with name cucumber-report.html is generated in project

npx cucumber-js features\Ecommerce.feature --format html:cucumber-report.html --require features\step_Definations\stepsWithHooksTags.js --require features\support\hooks.js


*****ReRun Only failed test scenarios******

# To rerun failed scnarios just mention in cmd -> --retry 1 /2/5
# then failed scenrios will run one more time

npx cucumber-js features\Ecommerce.feature --retry 1 --require features\step_Definations\stepsWithHooksTags.js --require features\support\hooks.js

*/

