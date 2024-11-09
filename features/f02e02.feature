Feature: Crear y gestionar suscripciones y members 
@user1 @web
Scenario: F02E02 Intentar agregar un suscriptor con un correo electrónico duplicado
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<UrlMember>"
  And I wait for 3 seconds
  And I click on new member
  And I wait for 3 seconds
  And I enter member full name "random"
  And I enter member email "random"
  And I wait for 2 seconds
  And I click on save member
  And I wait for 1 seconds
  And I navigate to page "<UrlMember>"
  And I click on new member
  And I wait for 3 seconds
  And I enter member full name "random"
  And I enter member email "current"
  And I wait for 2 seconds
  And I click on save member

  Then I wait for 2 seconds
  And I verify new member on list for email "current"