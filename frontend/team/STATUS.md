# Status, Monday 04/27/2020

## Sprint Goal for Monday 04/27 through Monday 05/04

The user shoud be able to vote on who to kill (as Mafia or as a Villager).

## Brief description of MVP

Mafia is a game where the group of players is divided into two roles: Villagers and Mafia. The players only know their own role, not the roles of the other players. The goal of the game for the villagers is to execute all the Mafia through the power of democracy. The goal of the game for the Mafia is to kill enough Villagers that they can outvote the Villagers. The game has two phases: day and night. At night, the Mafia players decide collectively which Villager to kill. During the day, the player who is killed by the Mafia is revealed and the Villagers will be given a chance to vote on a player to execute. In both cases, more than 50% of the votes are needed to kill the other player. 

As the host, your job is to facilitate the game. You are in charge of the transition between day and night, voting, and announcing who the Mafia has killed. (Hint: to make sure the players don't know each other's roles, make sure they cannot see/hear one another during the night. Either turn off video/sound or have everyone close their eyes. Have the Mafia in a seperate chat or have them individually message you.)

This app allows the host to randomly assign their players roles. Can be used for an in-person game, or one done over a video/audio platform. Ex: Zoom, Skype, Discord, etc. 
Enter the number of players playing. Each player should be given a number (starting with 1). A list of those chosen to be the Mafia will be displayed based on their number. All other players automatically become Villagers.

## Production App Mafia

https://cs48-s20-s2-t4-prod.herokuapp.com

* Team has completed production app placeholder

## MVP Status

* Team has completed all stories for MVP

# Sprint Planning, 05/12/2020
  
* Leader: Edwin Zhang
* Present: All
* Absent: None

## Sprint Goal for 05/12-05/21

Which of the 10 powerful questions did you ask?

If suddenly half the team was not here, what would we have to do to be ok with the outcome? What would we let go of?
  
Describe your sprint goal here.

Our sprint goal is to get all components of voting done. 
  
Describe briefly how you came up with that goal.

That is the very minimal thing we need to do for the app to fully work. 
  
## Discussion of previous Sprint Goal
  
Briefly: was the sprint goal acheived?  Was it too ambitious?  Too modest?

The last sprint goal was not fully achieved, because we ran into roadblocks such as porting our code over to React, and creating the backbone infrastructure of the players themselves. We also did not realize that we had to implement databases to help our logic. It was too ambitious because we did not properly plan. 
