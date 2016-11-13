# ![My Pet Pal Logo](https://github.com/SarahPappas/virtual-pet/tree/master/public/img/pickpet1.png) My Pet Pal

## Brief Description

My Pet Pal is an interactive virtual pet application that allows a user to create and take care of their own pet. Your pet can be fed, played with, cleaned, and more as you nurture a strong bond with your animal. 

## Instalation instructions

-Clone the repository 
  `git clone https://github.com/SarahPappas/virtual-pet.git`

-Install dependencies   
  `npm install`

-Run mongo
  `mongod`

## User Guide 

### First step is to create a new account 
  This ensures your pet and relevant data can be saved and loaded next time you play.
### Select a pet and give it a name
  You can't change your pet type or name unless it dies, so choose carefully!
### Gameplay
  Login and you are ready to interact with your new pet.
  #### Health and Mood
    Your pet's health and mood will always be displayed at the top. Missing certain activities (feeding, sleeping, etc.) will decrease these stats, while participating in activities will raise the stats. When your pet's health gets to 0, your pet will die and you will be forced to pick a new pet. When your pet's mood gets to 0 , your pet will start losing health at an increased rate. The health and mood bars will change color based on your pet's overall health and mood. In addition your pet will look sick and tired when your health gets below a certain level.
  #### Alerts
    An alert will come up when your pet requires your attention with a certain activity. You will have to complete this action quickly or else your pet will lose mood and/or overall health.  
  #### Feeding
    Feeding your pet is important as it will increase both its mood and overall health. Conversely failure to feed your pet will result in a decrease in both its overall health and mood. Feeding can only be done once every so often to prevent your pet from overeating getting sick. 
  #### Playing games
    Playing with your pet is essential to keeping it in a good mood. Clicking on the games button will bring up a list of games you can play with your pet. Failure to play with your pet every so often will result in a loss of modd. Losing a game will suffer no consequences, but winning a game will boost your pet's mood.
    ##### Whack-A-Pet
      This game is similar to whack-a-mole but instead you need to click your pet 5 times in order to win.
    ##### Guess Which Way!
      In this game you have to correctly guess which way your pet will go. You have 5 guesses and need to guess correctly 3 times in order to win.
    ##### Dodge This
      Dodge the falling objects! Your pet needs to get to the other side while avoiding the hazards falling from the sky. Every time you switch sides you gain 10 points, 60 points are needed to secure a victory.
  #### Nurse
    It is tough taking care of your pet! Every once in a while you can forget to give it the attention they need. The nurse is available to heal your pet back to full health once in a while free of charge.
  #### Clean
    Everybody poops, and your pet is no different. It is essential to clean up after your pet to ensure it doesn't get sick and has good hygiene. Failure to pick up after your pet will negatively affect its health. 
  #### Sleep
    After a long day of fun activities, your pet will need to wind down and get some rest. Tuck your pet in and it will sleep for a set amount of time. Your pet will not be able to do any activities while it is asleep so make sure you do everything you need to before your pet retires for the night. Your health and mood cannot be negatively affected while your pet is asleep so you can rest easy knowing your pet will still be alive when it wakes up. 

## Technologies

This application uses HTML, CSS, Javascript, Node/Express, & mongo. 

## Problems