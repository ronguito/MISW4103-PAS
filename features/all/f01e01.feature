Feature: Configurar opciones generales del sitio

@user1 @web
Scenario: F01E01 Configurar el titulo del sitio
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I wait for 3 seconds
  And I click on signin
  And I wait for 7 seconds

  When I open setting site
  And I wait for 2 seconds
  And I click on button edit title
  And I wait for 2 seconds
  And I enter title site "random"
  And I wait for 2 seconds
  And I click on button save
  And I wait for 2 seconds
  And I close setting site

  Then I wait for 2 seconds
  And The page title should be "current"
  


