# Verivox Automation Framework

This project is an automation framework for Verivox using CodeceptJS, Playwright, JavaScript, and Cucumber. It follows the Page Object Model (POM) framework approach to ensure scalable and maintainable test automation.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)

## Installation

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:
    ```bash
    git clone https://github.com/kfouzdar/verivox-automation.git
    cd verivox-automation
    ```

2. Install the dependencies:
    ```bash
    npm init -y
    ```

## Setup

1. Initialize CodeceptJS with Playwright:
    ```bash
    npm install codeceptjs playwright --save-dev
    npm install codeceptjs-cucumber --save-dev
    npx codeceptjs init playwright
    ```

2. Install the necessary plugins and reporters:
    ```bash
   npm install chai --save-dev
   npm install mochawesome --save-dev
   npm install @codeceptjs/allure-legacy --save-dev

   npx codeceptjs init
    ```

3. configuration file `codecept.conf.js`:
    ```javascript
    exports.config = {
      tests: './tests/*.js',
      output: './output',
      helpers: {
        Playwright: {
          url: 'https://www.verivox.de',
          show: true,
          browser: 'chromium'
        }
      },
      include: {
        I: './steps_file.js',
        homePage: './pages/HomePage.js',
        resultPage: './pages/ResultPage.js'
      },
      bootstrap: null,
      mocha: {},
      name: 'verivox-automation',
      plugins: {
        allure: {
          enabled: true
        }
      },
      gherkin: {
        features: './features/*.feature',
        steps: ['./step_definitions/steps.js']
      }
    };
    ```

## Project Structure

Explore the Project Structure
Once the project is open in VS Code, navigate through the folders and files using the Explorer pane on the left. Here’s a quick overview of the folders:

features/: Contains the feature file.
step_definitions/: Contains the step definitions.
pages/: Contains the Page Object Model files.
codecept.config.js: Configuration file for CodeceptJS.
package.json: Configuration file for all dependencies.

## Running Tests

   ```bash
   npx codeceptjs run --features --steps
   ```


Test Scenarios:

Scenario 1: 
1. Verify the DSL calculator
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

## Generating Reports

 ```bash
   npx codeceptjs run --reporter mochawesome
   ```
