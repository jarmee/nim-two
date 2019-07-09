# Nim two

## Requirements

[x] npm start should start the application
[x] npm test should run all tests
[x] Create a GitHub repo
[x] Ci/Cd pipeline
[] Two player game (1 human & 1 PC)
[] Playground should include 13 sticks
[] In one turn a player could pick 1, 2 or 3 sticks, but max the amount of matches which are one the board
[] The artificial player should be replaceable

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
[x] Create a match component
[x] Disable all checked checkboxes
[x] Save the player data within the state
[x] Create a validator of the board state
[x] Remove all unused imports
[x] Add column errorMessages to mark them as invalid
[x] Add game status
[x] Implement unsubscribe service
[x] Implement the oponent
[x] Add bootstrap
[x] Change all boards in test to the board builder
[] Fix failing tests
[] Add missing tests
[] fix imports
[] Move helper functions of game-engine.service to game-engine.helpers
[] Improve isGameOver rule
[] Review all components of the game
[] Think of better game status
[] Improve match control
[] Get rid of the valueChanges handler
[] Add improved error messages
[] Fix failing test in board-form component
[] Add default error handling
[] Write Readme
[] Implement [smarter oponent](http://www.imn.htwk-leipzig.de/~jahn/Cprog/Alg_Inf_Jahr_pdf/streichholzspiel.pdf)

### Pre-Release

[] Is the prod build working
[] Is a clean setup of the project possible
[] Are all tests green
[] Is the application working in different browsers
[] Is the demo working
