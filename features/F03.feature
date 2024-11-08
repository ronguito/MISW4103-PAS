Feature: Crear y gestionar Publicaciones (posts) 

@user31 @web
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
  And I enter title "Post creado con Kraken"
  And I wait for 2 seconds
  And I click on save post

  Then I wait for 10 seconds
  And I verify status "Draft" for "Post creado con Kraken"

@user32 @web
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
  And I click on publish
  And I wait for 10 seconds
  And I click on close publish

  Then I wait for 5 seconds
  And I verify status "Published" for "Post creado con Kraken"
  And I navigate to page "<UrlPublic>"
  And I wait for 10 seconds
  And I verify "Post creado con Kraken" is published




