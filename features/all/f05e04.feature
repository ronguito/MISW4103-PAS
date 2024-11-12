Feature: Crear y gestionar tags 
@user1 @web
Scenario: F05E04 Eliminar tag
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<UrlTag>"
  And I wait for 5 seconds
  And I click on first tag
  And I wait for 10 seconds
  And I click on delete tag  
  And I click on confirm delete tag
  And I wait for 1 seconds
  And I navigate to page "<UrlTag>"

  Then I wait for 2 seconds
  And I verify new tag "current"