Feature: Configurar opciones generales del sitio

@user1 @web
Scenario: F01E02 Configurar descripcion de la pagina
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I wait for 3 seconds
  And I click on signin
  And I wait for 7 seconds

  When I open setting site
  And I wait for 2 seconds
  And I click on button edit in "title-and-description"
  And I wait for 2 seconds
  And I enter description site "random"
  And I wait for 2 seconds
  And I click on button save
  And I wait for 2 seconds
  And I close setting site

  Then I wait for 2 seconds
  And I navigate to page "<UrlPublic>"
  And I wait for 5 seconds
  And The main page should contain "pageDescription"




