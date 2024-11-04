Feature: My feature

@user1 @web
Scenario: Primer escenario de prueba usando kraken
  Given I navigate to page "https://www.messenger.com/login"
  And I wait for 7 seconds
  When I enter email "raul.ramosgu@hotmail.com"
  And I wait for 3 seconds
  And I enter password "MiBella17+"
  And I wait for 3 seconds
  And I click next
  And I wait for 15 seconds
  Then I click on the first conversation
  And I wait for 6 seconds
  And click on the redact message inputbox
  And I wait for 6 seconds
  And enter text "Hola Amor, este es un mensaje automatico probando la herramienta kraken"
  And I wait for 6 seconds
  And I send the message
