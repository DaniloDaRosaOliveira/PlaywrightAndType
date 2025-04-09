Feature: Interact with the Demo QA Web Tables

  Scenario: Fill in the registration form with valid data
     Given the user is on demo QA web table page
      When the user clicks on the add button
       And the user fills the form with "<FirstName>", "<LastName>", "<Email>", "<Age>", "<Salary>", "<Department>"
       And the user clicks on the submit button       
      Then the record is included with "<FirstName>", "<LastName>", "<Email>", "<Age>", "<Salary>", "<Department>"
Examples:
  | FirstName | LastName | Email              | Age | Salary | Department  |
  | Danilo    | QA       | danilo@test.com    | 30  | 6000   | Testing     |
