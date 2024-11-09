Feature: Crear y gestionar Publicaciones (posts) 

@user1 @web
Scenario: F03E04 Eliminar un post publicado
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds

  When I navigate to page "<UrlPost>"
  And I wait for 10 seconds
  And I select first post 'Published'
  And I wait for 5 seconds
  And I open setting post
  And I wait for 1 seconds
  And I click on button delete post
  And I wait for 1 seconds 
  And I click on button delete post confirm 
  And I wait for 5 seconds

  Then I wait for 2 seconds
  And I navigate to page "<UrlPublic>"
  And I wait for 5 seconds
  And The post "current" should not be published




