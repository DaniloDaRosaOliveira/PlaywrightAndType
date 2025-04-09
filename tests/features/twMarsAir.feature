@ignore
Feature: Book a ticket to the red planet

  Scenario: Book a ticket with valid departure and return data without a promo code with seats available
    Given I am at the MarsAir home page
     When I select "July" as a departure
      And I select "December (two years from now)" as a return
      And I click Search
     Then it should show the message "Seats available!"
      And it should show the message "Call now on 0800 MARSAIR to book!"

  Scenario: Book a ticket with valid departure and return data with a promo code with seats available
    Given I am at the MarsAir home page
     When I select "July" as a departure
      And I select "December (two years from now)" as a return
      And I write the promo code "DG1-HMJ-225"
      And I click Search
     Then it should show the message "Seats available!"
      And it should show the message "Promotional code DG1-HMJ-225 used: 10% discount!"
      And it should show the message "Call now on 0800 MARSAIR to book!"
