# Nim two

## Requirements

[x] npm start should start the application
[x] npm test should run all tests
[x] Create a GitHub repo
[] Two player game (1 human & 1 PC)
[] Playground should include 13 sticks
[] In one turn a player could pick 1, 2 or 3 sticks, but max the amount of sticks which are one the board
[] The artificial player should be replaceable
[] Ci/Cd pipeline

## Notes on states

- Which states do we have?
  o In general the human player starts and picks an amount
  o After the player picks the amount the amount of stick will be decreased and the artificial player picks an random amount.
  o A check has to be executed if there are enough sticks on the board. If there not enough sticks it should decrease the amount of sticks (random pick)
  o After each pick a check has to be executed if the game has a winner

## Prototypes

### 1 - Stick counter

A player could only input the amount of sticks and the amount will be decreased by the given amount

#### Tasks

[x] Install jest
[x] Add husky
[x] Create a component with a module which represents the board
[x] Create a buttons which represent the amount
[x] Create a GameEngine in class in the shared folder

- It should provide a method _executePlay_
- It should include a BehaviorSubject

### 2 - Extended Stick Counter Example

Implement a dynamic form. Each form control represents a stick.

#### Tasks

[x] Create a board model (map within a map)
[x] Create a board form component
[x] Create a board form builder
[x] Create a board builder
[] Create a match component
[] Create a validator of the form
[] Disable all checked checkboxes
[] Remove all unused imports
[] Save the player data within the state
[] Add bootstrap
[] Implement the oponent
