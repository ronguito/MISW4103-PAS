Feature: Crear y gestionar Publicaciones (posts) 

@user1 @web
Scenario: F03E01 Crear un nuevo post en estado de borrador
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds
  
  When I navigate to page "<UrlPost>"
  And I wait for 10 seconds
  And I click on new post
  And I wait for 5 seconds
  And I enter title post "random"
  And I wait for 2 seconds
  And I click on save post

  Then I wait for 10 seconds
  And The status for post "current" should be "Draft"
