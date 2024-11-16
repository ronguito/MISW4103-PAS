Feature: Crear y gestionar suscripciones y members 
@user1 @web
Scenario: F02E03 Modificar la información de un suscriptor
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<Host>" "<Port>" "<UrlMember>"
  And I wait for 5 seconds
  And I click on new member
  And I wait for 10 seconds
  And I enter member full name "random"
  And I enter member email "random"
  And I wait for 2 seconds
  And I click on button "Save"
  And I wait for 1 seconds
  And I navigate to page "<Host>" "<Port>" "<UrlMember>"
  And I wait for 5 seconds
  And I click on first member
  And I wait for 10 seconds
  And I enter member full name "random"
  And I wait for 2 seconds
  And I click on button "Save"

  Then I wait for 2 seconds
  And I verify edited member "current"