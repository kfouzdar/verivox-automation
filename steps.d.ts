/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type homePage = typeof import('./pages/HomePage.js');
type insurancePage = typeof import('./pages/InsurancePage.js');
type personalInfoPage = typeof import('./pages/PersonalInfoPage.js');
type resultsPage = typeof import('./pages/ResultsPage.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, homePage: homePage, insurancePage: insurancePage, personalInfoPage: personalInfoPage, resultsPage: resultsPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
