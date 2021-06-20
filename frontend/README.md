# project-s2-t4-mafia

* backend: https://github.com/ucsb-cs48-s20/project-s2-t4-mafia-backend
* [Deployment Instructions](./docs/DEPLOY.md)
- We will be using next.js

## Description:

- A web app that allows users to play the competitive, chat-based Mafia Game
- Mafia is a game where the group of players is divided into two roles: villagers and Mafia. The players only know their own role, not the roles of the other players. The goal of the game for the villagers is to execute all the Mafia through the power of democracy. The goal of the game for the Mafia is to kill enough villagers that they can outvote the villagers. The game has two phases: day and night. At night, the Mafia players decide collectively which villager to kill. During the day, the player who is killed by the Mafia is revealed and the villagers will be given a chance to vote on a player to execute. In both cases, more than 50% of the votes are needed to kill the other player.

## User Roles:

- Player: Every user that plays the game is a player, unless the moderator option is enabled. They will be assigned a role (Villager, Mafia, etc.) at the beginning of the game and retain that role for the duration of the game.
- Moderator: An optional role that can be turned on or off (default: off for public games, on for private games). The moderator preforms the tasks usually done automatically by the game, such as moving from day to night or night to day, decribing player deaths, handling accusations and voting, and other such tasks.


## feedback:
https://imgur.com/a/DcOOw6c
add color to differentiate messages
add music
private messages

## Team Members:

- Edwin Zhang (ezhang7423)
- Cambria Tolsma (CMT-UCSB)
- Vikram Pasupathy (vpasupathyucsb)
- Mingyu Xie (BrownieYi)
