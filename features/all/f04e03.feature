Feature: Crear y gestionar paginas

@user1 @web
Scenario: F04E03 Modificar URL a la pagina
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds

  When I navigate to page "<Host>" "<Port>" "<UrlPage>"
  And I wait for 10 seconds
  And I select first post 'Published'
  And I wait for 5 seconds
  And I open setting post
  And I wait for 2 seconds
  And I read url page
  And I wait for 2 seconds
  And I enter url page "random"
  And I wait for 2 seconds 
  And I close setting post 
  And I wait for 1 seconds
  And I click on button update

  Then I wait for 10 seconds
  And I navigate to page "<Host>" "<Port>" "old"
  And I wait for 5 seconds
  And The main page should contain "Page not found"
  And I wait for 2 seconds
  And I navigate to page "<Host>" "<Port>" "new"
  And I wait for 5 seconds
  And The main page should contain "postTitle"



