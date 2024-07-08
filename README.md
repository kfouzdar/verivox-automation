# Verivox Automation

## Setup and Installation

1. Install Node.js and npm
2. Clone the repository and navigate to the project directory.
3. Initialize the project and install dependencies: (Install CodeceptJS, Playwright, Cucumber, chai, mochawesome and other required packages by following commands:)

   ```bash
   npm init -y
   npm install codeceptjs playwright --save-dev
   npm install codeceptjs-cucumber --save-dev
   npm install chai --save-dev
   npm install mochawesome --save-dev
   npm install @codeceptjs/allure-legacy --save-dev

   npx codeceptjs init

4. Run the Test by using either below commands:
   
   ```bash
   npx codeceptjs run --features --steps

   (or with HTML report generated)
   npx codeceptjs run --reporter mochawesome 

Test Scenarios:
Scenario 1: Verify the DSL calculator
Open www.verivox.de
Navigate to Versicherungen and select Privathaftpflicht
Enter age and Single ohne Kinder
Go to the Privathaftpflicht personal information page
Enter birthdate and zip code (13088)
Click the Jetzt vergleichen button
Verify that at least 5 tariffs are shown

Scenario 2: Load multiple tariff result pages
Same tariff calculation criteria from scenario 1
Display the tariff Result List page
Verify the total number of available tariffs listed above all the result list
Scroll to the end of the result list page
Verify only the first 20 tariffs displayed
Click on the button labeled 20 weitere Tarife laden
Verify the next 20 tariffs displayed and continue to load additional tariffs
Verify that the weitere Tarife laden button is no longer displayed when all the tariffs are visible
Verify the total number of tariffs displayed matches the total listed number of tariffs above result list

Scenario 3: Verify offer details for a selected tariff
Same tariff calculation criteria from scenario 1
Display the tariff result list page
Verify the tariff price of the first tariff
Open tariff details
Verify tariff details sections: “Weitere Leistungen”, “Allgemein“, „ Tätigkeiten und Hobbys”
Verify tariff details sections: “Miete & Immobilien” and “Dokumente”
Verify the ZUM ONLINE-ANTRAG button
