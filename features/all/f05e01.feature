Feature: Crear y gestionar tags 
@user1 @web
Scenario: F05E01 creat tag
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<UrlTag>"
  And I wait for 5 seconds
  And I click on new tag
  And I wait for 10 seconds
  And I enter tag full name "random"
  And I wait for 2 seconds
  And I click on save tag
  And I wait for 1 seconds
  And I navigate to page "<UrlTag>"

  Then I wait for 2 seconds
  And I verify new tag "current"