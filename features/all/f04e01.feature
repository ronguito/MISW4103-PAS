Feature: Crear y gestionar paginas 

@user1 @web
Scenario: F04E01 Crear una nueva pagina en estado borrador
  Given I navigate to page "<Host>" "<Port>" "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds
  
  When I navigate to page "<Host>" "<Port>" "<UrlPage>"
  And I wait for 10 seconds
  And I click on new page 
  And I wait for 5 seconds
  And I enter title post "random"
  And I wait for 2 seconds
  And I click on save post

  Then I wait for 10 seconds
  And I navigate to page "<Host>" "<Port>" "<UrlPage>"
  And I wait for 5 seconds
  And The status for post "postTitle" should be "Draft"
