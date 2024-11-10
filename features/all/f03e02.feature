Feature: Crear y gestionar Publicaciones (posts) 

@user1 @web
Scenario: F03E02 Publicar post
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds

  When I navigate to page "<UrlPost>"
  And I wait for 10 seconds
  And I select first post 'Draft'
  And I wait for 5 seconds
  And I click on button publish
  And I wait for 1 seconds
  And I click on button continue
  And I wait for 1 seconds 
  And I click on button confirm 
  And I wait for 5 seconds
  And I click on close publish

  Then I wait for 2 seconds
  And The status for post "postTitle" should be "Published"
  And I wait for 2 seconds
  And I navigate to page "<UrlPublic>"
  And I wait for 5 seconds
  And The main page should contain "postTitle"




