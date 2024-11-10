Feature: Crear y gestionar Publicaciones (posts) 

@user1 @web
Scenario: F04E01 Crear una nueva pagina en estado borrador
  Given I navigate to page "<UrlLogin>"
  And I wait for 5 seconds
  And I enter email "<UserName>"
  And I enter password "<UserPass>"
  And I click on signin
  And I wait for 10 seconds
  
  When I navigate to page "<UrlPage>"
  And I wait for 10 seconds
  And I click on new page 
  And I wait for 5 seconds
  And I enter title page "random"
  And I wait for 2 seconds
  And I click on save page

  Then I wait for 10 seconds
  And The status for page "pageTitle" should be "Draft"
