Feature: Configurar opciones generales del sitio

@user1 @web
Scenario: F01E01 Configurar el titulo del sitio
  Given I navigate to page "<UrlLogin>"
  And I wait for 10 seconds
  And I enter email "<UserName>"
  And I wait for 3 seconds
  And I enter password "<UserPass>"
  And I wait for 3 seconds
  And I click next
  And I wait for 10 seconds
  And I click general config
  When I clic on title
  And I wait for 2 seconds
  And enter text "Titulo Cambiado Con Kraken"
  And I wait for 2 seconds
  And I save config
  Then I verify title on interface "Titulo Cambiado Con Kraken"
  And I verify title on navigate "Titulo Cambiado Con Kraken"



