const Allure = require('allure-js-commons');
const { event, output } = require('codeceptjs');

const defaultConfig = {
  outputDir: global.output_dir,
};

/**
 * Creates an instance of the allure reporter
 * @param {Config} [config={ outputDir: global.output_dir }] - Configuration for the allure reporter
 * @returns {Object} Instance of the allure reporter
 */
module.exports = (config) => {
  defaultConfig.outputDir = global.output_dir;
  config = Object.assign(defaultConfig, config);

  const plugin = {};

  /**
   * @type {Allure}
   */
  const reporter = new Allure();
  reporter.setOptions({ targetDir: config.outputDir });

  let currentMetaStep = [];
  let currentStep;

  /**
   * Mark a test case as pending
   * @param {string} testName - Name of the test case
   * @param {number} timestamp - Timestamp of the test case
   * @param {Object} [opts={}] - Options for the test case
   */
  reporter.pendingCase = function (testName, timestamp, opts = {}) {
    reporter.startCase(testName, timestamp);

    plugin.addCommonMetadata();
    if (opts.description) plugin.setDescription(opts.description);
    if (opts.severity) plugin.severity(opts.severity);
    if (opts.severity) plugin.addLabel('tag', opts.severity);

    reporter.endCase('pending', { message: opts.message || 'Test ignored' }, timestamp);
  };

  /**
   * Add an attachment to the current test case
   * @param {string} name - Name of the attachment
   * @param {Buffer} buffer - Buffer of the attachment
   * @param {string} type - MIME type of the attachment
   */
  plugin.addAttachment = (name, buffer, type) => {
    reporter.addAttachment(name, buffer, type);
  };

  /**
   Set description for the current test case
   @param {string} description - Description for the test case
   @param {string} [type='text/plain'] - MIME type of the description
   */
  plugin.setDescription = (description, type) => {
    const currentTest = reporter.getCurrentTest();
    if (currentTest) {
      currentTest.setDescription(description, type);
    } else {
      logger.error(`The test is not run. Please use "setDescription" for events:
      "test.start", "test.before", "test.after", "test.passed", "test.failed", "test.finish"`);
    }
  };

  /**
   A method for creating a step in a test case.
   @param {string} name - The name of the step.
   @param {Function} [stepFunc=() => {}] - The function that should be executed for this step.
   @returns {any} - The result of the step function.
   */
  plugin.createStep = (name, stepFunc = () => { }) => {
    let result;
    let status = 'passed';
    reporter.startStep(name);
    try {
      result = stepFunc(this.arguments);
    } catch (error) {
      status = 'broken';
      throw error;
    } finally {
      if (!!result
        && (typeof result === 'object' || typeof result === 'function')
        && typeof result.then === 'function'
      ) {
        result.then(() => reporter.endStep('passed'), () => reporter.endStep('broken'));
      } else {
        reporter.endStep(status);
      }
    }
    return result;
  };

  plugin.createAttachment = (name, content, type) => {
    if (typeof content === 'function') {
      const attachmentName = name;
      const buffer = content.apply(this, arguments);
      return createAttachment(attachmentName, buffer, type);
    } reporter.addAttachment(name, content, type);
  };

  plugin.severity = (severity) => {
    plugin.addLabel('severity', severity);
  };

  plugin.epic = (epic) => {
    plugin.addLabel('epic', epic);
  };

  plugin.feature = (feature) => {
    plugin.addLabel('feature', feature);
  };

  plugin.story = (story) => {
    plugin.addLabel('story', story);
  };

  plugin.issue = (issue) => {
    plugin.addLabel('issue', issue);
  };

  /**
   Adds a label with the given name and value to the current test in the Allure report
   @param {string} name - name of the label to add
   @param {string} value - value of the label to add
 */
  plugin.addLabel = (name, value) => {
    const currentTest = reporter.getCurrentTest();
    if (currentTest) {
      currentTest.addLabel(name, value);
    } else {
      logger.error(`The test is not run. Please use "addLabel" for events:
      "test.start", "test.before", "test.after", "test.passed", "test.failed", "test.finish"`);
    }
  };

  /**
   Adds a parameter with the given kind, name, and value to the current test in the Allure report
   @param {string} kind - kind of the parameter to add
   @param {string} name - name of the parameter to add
   @param {string} value - value of the parameter to add
   */
  plugin.addParameter = (kind, name, value) => {
    const currentTest = reporter.getCurrentTest();
    if (currentTest) {
      currentTest.addParameter(kind, name, value);
    } else {
      logger.error(`The test is not run. Please use "addParameter" for events:
      "test.start", "test.before", "test.after", "test.passed", "test.failed", "test.finish"`);
    }
  };

  /**
   * Add a special screen diff block to the current test case
   * @param {string} name - Name of the screen diff block
   * @param {string} expectedImg - string representing the contents of the expected image file encoded in base64
   * @param {string} actualImg - string representing the contents of the actual image file encoded in base64
   * @param {string} diffImg - string representing the contents of the diff image file encoded in base64.
   * Could be generated by image comparison lib like "pixelmatch" or alternative
   */
  plugin.addScreenDiff = (name, expectedImg, actualImg, diffImg) => {
    const screenDiff = {
      name,
      expected: `data:image/png;base64,${expectedImg}`,
      actual: `data:image/png;base64,${actualImg}`,
      diff: `data:image/png;base64,${diffImg}`,
    };
    reporter.addAttachment(name, JSON.stringify(screenDiff), 'application/vnd.allure.image.diff');
  };

  plugin.addCommonMetadata = () => {
    plugin.addLabel('language', 'javascript');
    plugin.addLabel('framework', 'codeceptjs');
  };

  event.dispatcher.on(event.suite.before, (suite) => {
    reporter.startSuite(suite.fullTitle());
  });

  event.dispatcher.on(event.suite.before, (suite) => {
    for (const test of suite.tests) {
      if (test.pending) {
        reporter.pendingCase(test.title, null, test.opts.skipInfo);
      }
    }
  });

  event.dispatcher.on(event.suite.after, () => {
    reporter.endSuite();
  });

  event.dispatcher.on(event.test.before, (test) => {
    reporter.startCase(test.title);
    plugin.addCommonMetadata();
    if (config.enableScreenshotDiffPlugin) {
      const currentTest = reporter.getCurrentTest();
      currentTest.addLabel('testType', 'screenshotDiff');
    }
    currentStep = null;
  });

  event.dispatcher.on(event.test.started, (test) => {
    const currentTest = reporter.getCurrentTest();
    for (const tag of test.tags) {
      currentTest.addLabel('tag', tag);
    }
  });

  event.dispatcher.on(event.test.failed, (test, err) => {
    if (currentStep) reporter.endStep('failed');
    if (currentMetaStep.length) {
      currentMetaStep.forEach(() => reporter.endStep('failed'));
      currentMetaStep = [];
    }

    err.message = err.message.replace(ansiRegExp(), '');
    if (reporter.getCurrentTest()) {
      reporter.endCase('failed', err);
    } else {
      // this means before suite failed, we should report this.
      reporter.startCase(`BeforeSuite of suite ${reporter.getCurrentSuite().name} failed.`);
      plugin.addCommonMetadata();
      reporter.endCase('failed', err);
    }
  });

  event.dispatcher.on(event.test.passed, () => {
    if (currentStep) reporter.endStep('passed');
    if (currentMetaStep.length) {
      currentMetaStep.forEach(() => reporter.endStep('passed'));
      currentMetaStep = [];
    }
    reporter.endCase('passed');
  });

  event.dispatcher.on(event.test.skipped, (test) => {
    let loaded = true;
    if (test.opts.skipInfo.isFastSkipped) {
      loaded = false;
      reporter.startSuite(test.parent.fullTitle());
    }
    reporter.pendingCase(test.title, null, test.opts.skipInfo);
    if (!loaded) {
      reporter.endSuite();
    }
  });

  event.dispatcher.on(event.step.started, (step) => {
    startMetaStep(step.metaStep);
    if (currentStep !== step) {
      // In multi-session scenarios, actors' names will be highlighted with ANSI
      // escape sequences which are invalid XML values
      step.actor = step.actor.replace(ansiRegExp(), '');
      reporter.startStep(step.toString());
      currentStep = step;
    }
  });

  event.dispatcher.on(event.step.comment, (step) => {
    reporter.startStep(step.toString());
    currentStep = step;
    reporter.endStep('passed');
    currentStep = null;
  });

  event.dispatcher.on(event.step.passed, (step) => {
    if (currentStep === step) {
      reporter.endStep('passed');
      currentStep = null;
    }
  });

  event.dispatcher.on(event.step.failed, (step) => {
    if (currentStep === step) {
      reporter.endStep('failed');
      currentStep = null;
    }
  });

  let maxLevel;
  function finishMetastep(level) {
    const metaStepsToFinish = currentMetaStep.splice(maxLevel - level);
    metaStepsToFinish.forEach(() => {
      // only if the current step is of type Step, end it.
      if (reporter.suites && reporter.suites.length && reporter.suites[0].currentStep && reporter.suites[0].currentStep.constructor.name === 'Step') {
        reporter.endStep('passed');
      }
    });
  }

  function startMetaStep(metaStep, level = 0) {
    maxLevel = level;
    if (!metaStep) {
      finishMetastep(0);
      maxLevel--;
      return;
    }

    startMetaStep(metaStep.metaStep, level + 1);

    if (metaStep.toString() !== currentMetaStep[maxLevel - level]) {
      finishMetastep(level);
      currentMetaStep.push(metaStep.toString());
      reporter.startStep(metaStep.toString());
    }
  }

  return plugin;
};


const ansiRegExp = function ({ onlyFirst = false } = {}) {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|');

  return new RegExp(pattern, onlyFirst ? undefined : 'g');
};
