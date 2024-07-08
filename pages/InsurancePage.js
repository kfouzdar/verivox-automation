const { I } = inject();

module.exports = {
  ageInput: "Alter",
  singleWithoutChildren: "Familienstand",

  enterAgeAndStatus() {
    I.fillField(this.ageInput, '30');
    I.selectOption(this.singleWithoutChildren,'Single ohne Kinder');
  },

  goToPersonalInfoPage() {
    I.click("Jetzt vergleichen");
    I.wait(10);
    I.see(" Privathaftpflicht ");
  }
};
