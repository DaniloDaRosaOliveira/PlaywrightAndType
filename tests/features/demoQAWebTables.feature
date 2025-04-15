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


Scenario: Edit an item in the table with valid data
     Given the user is on demo QA web table page
      When the user clicks on the edit button for line with name "Alden"
       And the user fills the name with "John"
       And the user clicks on the submit button       
      Then the record is updated with name "John"

Scenario: Delete an item from the table
     Given the user is on demo QA web table page
      When the user clicks on the delete button for line with name "Alden"
      Then the record is removed with name "John" from the table