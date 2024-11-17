Feature: Crear y gestionar tags 
@user1 @web
Scenario: F05E03 editar tag
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<Host>" "<Port>" "<UrlTag>"
  And I wait for 5 seconds
  And I click on first tag
  And I wait for 10 seconds
  And I enter tag full name "random"
  And I wait for 2 seconds
  And I click on button "Save"
  And I wait for 1 seconds
  And I navigate to page "<Host>" "<Port>" "<UrlTag>"

  Then I wait for 2 seconds
  And I verify new tag "current"