Feature: Crear y gestionar Publicaciones (posts) 

@user1 @web
Scenario: F03E01 Crear un nuevo post en estado de borrador
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

  Then I wait for 2 seconds
  And I verify new member on list for email "current"