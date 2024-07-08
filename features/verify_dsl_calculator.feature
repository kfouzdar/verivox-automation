Feature: Verivox Privathaftpflicht calculator
  In order to use the Privathaftpflicht calculator and tariff search pages
  As a Verivox user
  I can select the best available tariff based on price

  Scenario: Verify the DSL calculator
    Given I open the Verivox website
    When I navigate to Versicherungen and select Privathaftpflicht
    And I enter my age and Single ohne Kinder
    Then I go to the Privathaftpflicht personal information page
    And I enter my birthdate
    And I enter my zip code
    And I click the Jetzt vergleichen button
    Then I should see a page that lists the available tariffs for my selection
    And at least 5 tariffs should be shown

Scenario: Load multiple tariff result pages
    Given I open the Verivox website
    When I navigate to Versicherungen and select Privathaftpflicht
    And I enter my age and Single ohne Kinder
    Then I go to the Privathaftpflicht personal information page
    And I enter my birthdate
    And I enter my zip code
    And I click the Jetzt vergleichen button
    Then I should see the total number of available tariffs listed above all the result list
    When I scroll to the end of the result list page
    Then I should see only the first 20 tariffs displayed
    When I click on the button labeled 20 weitere Tarife laden
    Then I should see the next 20 tariffs displayed
    #And I can continue to load any additional tariffs until all tariffs have been displayed
    #Then the weitere Tarife laden button is no longer displayed when all the tariffs are visible
    #And the total number of tariffs displayed matches the total listed number of tariffs above result list

  Scenario: Verify offer details for a selected tariff
    Given I open the Verivox website
    When I navigate to Versicherungen and select Privathaftpflicht
    And I enter my age and Single ohne Kinder
    Then I go to the Privathaftpflicht personal information page
    And I enter my birthdate
    And I enter my zip code
    And I click the Jetzt vergleichen button
    Then I should see the tariff price of the first tariff
    When I open tariff details
    Then I see tariff details sections: "Weitere Leistungen", "Allgemein", "Tätigkeiten und Hobbys"
    And I see tariff details sections: "Miete & Immobilien" and "Dokumente"
    And I see the ZUM ONLINE-ANTRAG button