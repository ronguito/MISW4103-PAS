Feature: Configurar opciones generales del sitio

@user1 @web
Scenario: F01E03 Cambiar color de los botones
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I wait for 3 seconds
  And I click on signin
  And I wait for 7 seconds

  When I open setting site
  And I wait for 2 seconds
  And I click on button edit design
  And I wait for 5 seconds
  And I enter color
  And I wait for 2 seconds
  And I click on button "Save"
  And I wait for 5 seconds

  Then I wait for 2 seconds
  And I navigate to page "<Host>" "<Port>" "<UrlPublic>"
  And I wait for 5 seconds
  And The head should contain color




