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
  multiple: {
    basic: {
      browsers: [
        {
          browser: 'chromium',
          windowSize: '1920x919'
        },
        {
          browser: 'firefox',
          windowSize: '1920x919'
        }
      ]
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
      enabled: true,
      retries: 3
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