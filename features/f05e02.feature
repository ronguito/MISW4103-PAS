Feature: Crear y gestionar tags 
@user1 @web
Scenario: F05E04 Eliminar tag
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 2 seconds
  
  When I navigate to page "<Host>" "<Port>" "<UrlTag>"
  #leer nombre del tag y url
  And I wait for 5 seconds
  And I click on first tag
  And I wait for 10 seconds
  And I get the tag name
  And I wait for 1 seconds
  And I get the tag url
  And I wait for 1 seconds
  #asignar tag al post
  And I navigate to page "<Host>" "<Port>" "<UrlPost>"
  And I wait for 5 seconds
  And I select first post 'Published'
  And I wait for 5 seconds
  And I open setting post
  And I wait for 1 seconds
  And I set tag to post
  And I wait for 5 seconds
  And I close setting post
  And I wait for 1 seconds
  And I click on button update

  Then I wait for 2 seconds
  And I navigate to page "<Host>" "<Port>" "tag"
  And I wait for 5 seconds
  And The main page should contain "postTitle"