import Handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import Convert from 'ansi-to-html';
const convert = new Convert({
  fg: '#000',
  newline: true
});
const __dirname = path.resolve();

const reportFilename = 'transformation tests.html';
const reportsPath = './reports';
const outputFile = path.join(reportsPath, reportFilename);

Handlebars.registerHelper('fileOrSuiteSuccess', function (value) {
  return value.numFailingTests == 0;
});

Handlebars.registerHelper('testSuccess', function (value) {
  return value.status == 'passed';
});

Handlebars.registerHelper('getFailureMessage', function (value) {
  return convert.toHtml(value.failureMessages[0]);
});

Handlebars.registerHelper('getSuiteName', function (value) {
  return value.testFilePath.split('\\').pop().split('/').pop().replace('test.js', '');
});

export default class CustomReporter {
  /**
   * Event hook for onRunComplete, is triggered on completion
   * @param _
   * @param results
   */
  async onRunComplete(_, aggregated) {
    let files = aggregated.testResults.map(result => {
      let modifiedResult = {
        numFailingTests: result.numFailingTests,
        title: result.testFilePath
      };
      let suites = [];
      result.testResults.forEach(test => {
        const testId = test.title.split(' ')[0];
        const testMap = JSON.parse(readFileSync(path.join(reportsPath, 'testMap.json')));
        if (testMap[testId]) {
          test.imageData = testMap[testId];
        }
        let suiteTitle = test.ancestorTitles.reduce((acc, item) => acc + '/' + item, '');
        suiteTitle = suiteTitle == '' ? 'root' : suiteTitle;
        let suite = suites.find(suite => suite.title == suiteTitle);
        if (suite) {
          suite.numFailingTests = test.status == 'passed' ? suite.numFailingTests : suite.numFailingTests + 1;
          suite.tests.push(test);
        } else {
          suites.push({
            numFailingTests: test.status == 'passed' ? 0 : 1,
            title: suiteTitle,
            tests: [test]
          });
        }
      });
      modifiedResult.suites = suites;
      return modifiedResult;
    });

    try {
      const templateFile = readFileSync(path.join(__dirname, 'reporters/htmlReporter.hbs'));
      var template = templateFile.toString();
      // merge the template with the test results data
      var html = Handlebars.compile(template)({
        results: files,
        timestamp: new Date().toString(),
        totalTests: aggregated.numPassedTests + aggregated.numFailedTests,
        failedTests: aggregated.numFailedTests,
        passedTests: aggregated.numPassedTests
      });

      // write the html to a file
      writeFileSync(outputFile, html);
      console.log('Report generated: ' + outputFile);
    } catch (err) {
      console.log('error in the reporter');
      console.log(err);
    }
  }
}
