const { I } = inject();

module.exports = {
  birthdateInput: "//input[@placeholder='TT.MM.JJJJ']",
  zipCodeInput: "//input[@id='prestep_postcode-input']",
  compareButton: "//span[@class='icn-angle-right-filled']",

  enterBirthdate() {
    I.fillField(this.birthdateInput, '11.11.1987');
  },

  enterZipCode() {
    I.fillField(this.zipCodeInput, '13088');
    I.wait(5);
  },

  clickCompare() {
    I.click(this.compareButton);
    I.wait(20);
  }
};
