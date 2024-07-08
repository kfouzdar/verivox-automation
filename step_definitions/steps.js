const { I, homePage, insurancePage, personalInfoPage, resultsPage, tariffDetailsPage } = inject();
let assert;

(async () => {
  assert = (await import('chai')).assert;
})();

Given('I open the Verivox website', () => {
    I.amOnPage('/');
    homePage.acceptAllCookies();  
});

When('I navigate to Versicherungen and select Privathaftpflicht', () => {
    homePage.navigateToInsurance();
    homePage.selectPrivathaftpflicht();
});

When('I enter my age and Single ohne Kinder', () => {
    insurancePage.enterAgeAndStatus();
});

Then('I go to the Privathaftpflicht personal information page', () => {
    insurancePage.goToPersonalInfoPage();
});

When('I enter my birthdate', () => {
    personalInfoPage.enterBirthdate();
});

When('I enter my zip code', () => {
    personalInfoPage.enterZipCode();
});

When('I click the Jetzt vergleichen button', () => {
    personalInfoPage.clickCompare();
});

Then('I should see a page that lists the available tariffs for my selection', async () => {
  await resultsPage.seeProductList();
});

Then('at least 5 tariffs should be shown', async () => {
  const productItemsCount = await resultsPage.getTotalProductItems();
  assert.isAbove(productItemsCount, 5, 'Less than 5 tariffs are shown');
});

Then('I should see the total number of available tariffs listed above all the result list', async () => {
  const totalTariffs = await resultsPage.getTotalTariffs();
  assert.isAbove(totalTariffs, 0, 'Total number of tariffs should be listed');
});

When('I scroll to the end of the result list page', async () => {
  await resultsPage.scrollToBottomUntilLoadingButtonVisible();
});

Then('I should see only the first 20 tariffs displayed', async () => {
  const productItemsCount = await resultsPage.getTotalProductItems();
  assert.equal(productItemsCount, 20, 'More than 20 tariffs are displayed initially');
});

When('I click on the button labeled 20 weitere Tarife laden', async () => {
    I.click(resultsPage.loadMoreButtonLocator);
    I.wait(5); // Wait for new tariffs to load
});

Then('I should see the next 20 tariffs displayed', async () => {
  const productItemsCount = await resultsPage.getTotalProductItems();
  assert.equal(productItemsCount, 40, 'Next 20 tariffs are not displayed');
}); 


Then('I can continue to load any additional tariffs until all tariffs have been displayed', async () => {
  await resultsPage.loadMoreTariffs();
});


Then('the weitere Tarife laden button is no longer displayed when all the tariffs are visible', async () => {
  const loadMoreVisible = await resultsPage.isLoadMoreButtonVisible();
  assert.isFalse(loadMoreVisible, 'Load more button is still visible');
});

Then('the total number of tariffs displayed matches the total listed number of tariffs above result list', async () => {
  const productItemsCount = await resultsPage.getTotalProductItems();
  const totalTariffs = await resultsPage.getTotalTariffs();
  assert.equal(productItemsCount, totalTariffs, 'Displayed tariffs do not match total listed tariffs');
});

Then('I should see the tariff price of the first tariff', async () => {
  await resultsPage.seeFirstTariffPrice();
});

When('I open tariff details', async () => {
  await resultsPage.openFirstTariffDetails();
});

Then('I see tariff details sections: {string}, {string}, {string}', async (section1, section2, section3) => {
  await tariffDetailsPage.seeTariffDetailsSections();
});

Then('I see tariff details sections: {string} and {string}', async (section4, section5) => {
  await tariffDetailsPage.seeTariffDetailsSections();
});

Then('I see the ZUM ONLINE-ANTRAG button', async () => {
  await tariffDetailsPage.seeZumOnlineAntragButton();
});