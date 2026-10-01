/* Playwright AI Agents , Paywright MCP , Paywright CLI - 

1.AI Agents inside vs code with Github Copilot

 Install Github Copilot
Goto vscode -> Extentions -> search Github Copilot -> install 'Github Copilot' /'Github Copilot chat'

#. 'Github Copilot' is the AI coworker works parallely within VScode as an extention which helps to 
fixing the errors, optimize code, search methods, write new quick code.
#. It acts like Chat GPT
#. 
Open new copilot Chat Editor or chat(click upper + sign select new Chat Editor )-> select file 
in which we have to edit code (click bottom + sign btn to select ) give cmds to edit the code in that file

 we can give commands to perform the tasks like write code, edit code, refactor code, write test cases, 
 write manual test cases, write automation test cases, write API test cases, write SQL queries, 
 write DB queries, write scripts etc.
 eg - Test12.spec.js file is created by giving command to Github Copilot to write API test cases for 
 GET call and verify status code, response time, headers, response body data and data count.
*/

/*

*************Playwright MCP servers - Model context protocols***************

MCP servers are the key componants that enables the AI models specially large lang models LLMs to interact
  securly and effectivly  with external tools , data sources , and services to achieve web Automation tasks
They provide the necessary infrastructure and resources like mcp tools for the AI Agents to function effectively. 
The MCP servers handle tasks such as processing user requests, managing data, and facilitating communication 
between the AI Agents and other components of the system.

Official doc - https://github.com/microsoft/playwright-mcp

// Integration of MCP servers

Goto opilot window -> cilick setting -> click on 'MCP Servers' tab -> select Playwright-> install
 -> then .vscode/mcp.json file is generated in project




********Playwright Test AI Agents***********

official doc - https://playwright.dev/docs/test-agents

Introduction
Playwright comes with three Playwright Test Agents out of the box:
 🎭 planner, 🎭 generator and 🎭 healer.

These agents can be used independently, sequentially,  will produce test coverage for your product.

🎭 planner :  explores the app and produces a Markdown test plan
🎭 generator:  transforms the Markdown plan into the Playwright Test files/test cases
🎭 healer: executes the test suite and automatically repairs failing tests

to Install cmd  PW agents run cmd ---> npx playwright init-agents --loop=vscode
When run this cmd 2 files craated 1. .github/agents and 2. .platwright-mcp
and one seed.spec.js file created in tests folder. 
And In AI chat window above  3 agents are listed on click of agent
when we giving any cmd to agent then provide this file in context
or 

To Explore those concepts We make a dummy project(PlaywrightAIAgents) -> Install pw in project
-> install PW agents -run cmd - npx playwright init-agents --loop=vscode-> there is agents files 
created and one seed.spec.js file created in tests folder



****************PLayWright CLI **********************

It is same as mcp servers but for this we have to install the claud code Ai agent  

Diff BEtween Playwright MCP and Playwright CLI

In case of MCP servers-->
 natural lang cmd prompt --->copilot/Ai Agents  ---> MCP servers(MCP Tools)

 We are giving natural language commands to ai Agents which uses MCP servers and its tools to automamate 
 or perform the actions.
 MCP servers have its Tools which are used by ai agents to perform the actions on webpage or webelement
 
 If we want automate the webpage or perform action on webelement then Ai agent takes entire HTML DOM in its
  context and then search the path of webelemnt to perform actions 
so that everytime it loading lots of data in its AI context so that it consumes more tokens


In case of Playwright CLI-->
 natural lang cmd prompt --->copilot/Ai Agents  ---> Playwright CLI(Skill Documents of Commamnds)

 We are giving natural language commands to ai Agents which uses  Playwright CLI-Skill Documents of 
 Commamnds that ai agents understand to automamate or perform the actions

 Playwright CLI-Skill Documents of Commamnds which are used by ai agents to perform the actions on webpage or webelement

 If we want automate the webpage or perform action on webelement then in case of clI it downloads the entire
  Html dom Accessibility tree in file and store in project directory by running the skill doc cmd -  'playwright cli snapshot'
 then Ai agent read doc file and search the path of webelemnt to perform actions from that
so that everytime instead loading lots of data in its ai context and burn more tokens it simply downlods the 
Dom in local project workspace so  it consumes very less tokens and makes token efficient and cost effective

	                 Playwright CLI	                                 MCP

How it works	    Agent runs shell commands	                  LLM calls MCP tools with structured parameters
Token cost	      Lower 	                                    Higher — tool schemas + snapshots in context
Default mode	   Headless	                                    Headed
Setup	          npm install -g @playwright/cli               	JSON config in MCP client


To Explore Playwright CLI concepts We make a dummy project(PlaywrightCLI) -> Install pw in project
-> install PW CLI run cmd ---> npm install -g @playwright/cli@latest
-> install skill cmds     --->  playwright-cli install --skills

*/