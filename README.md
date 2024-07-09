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
   npm install --save-dev allure-codeceptjs

   npx codeceptjs init
    ```

3. configuration file `codecept.conf.js`:
```javascript
exports.config = {
output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.verivox.de',
      show: true,
      chromium: {
        args: ['--no-sandbox', '--window-size=1920,919'],
        defaultViewport: null
      },
      windowSize: '1920x919'
    }
  },
  include: {
    I: './steps_file.js',
    homePage: './pages/HomePage.js',
    insurancePage: './pages/InsurancePage.js',
    personalInfoPage: './pages/PersonalInfoPage.js',
    resultsPage: './pages/ResultsPage.js',
    tariffDetailsPage: './pages/TariffDetailsPage.js'
  },
  mocha: {
    reporterOptions: {
      reportDir: "output"
    }
  },
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {},
    stepByStepReport: {
      enabled: true,
      deleteSuccessful: false,
    },
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      outputDir: './output/allure-results'
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.js',
  name: 'verivox-automation'
}
```

## Project Structure

Explore the Project Structure
Once the project is open in VS Code, navigate through the folders and files using the Explorer pane on the left. 

Here’s a quick overview of the folders:

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

Scenario-1: Verify the DSL calculator

Scenario-2: Load multiple tariff result pages

Scenario-3: Verify offer details for a selected tariff

## Generating Reports

Mocha report:
 ```bash
   npx codeceptjs run --reporter mochawesome
   ```
Allure report:
```bash
npx codeceptjs run
npx allure serve allure-results
```
