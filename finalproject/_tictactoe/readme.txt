///------------------------------
///     GAME DESCRIPTION
///------------------------------
Tic-Tac-Toe is the traditional pen-and-paper game brought to a digital platform. 
There are no differences in how it plays here. 
It is suggested to be played with another person at your computer or through a stream.

///------------------------------
///     HOW TO PLAY
///------------------------------
In order to play the game, there must be two players. 
The first player will always be assigned the blue team, while the second player will be assigned the red team. 
The objective is to have three squares marked in a row - either horizontal, vertical, or diagonal - on the 3x3 board, all by one team. 
If the blue team clicks the top left square, the square's background color will become blue. 
Then, it will be the red team's turn to play. 
The red team cannot click a square that the blue team holds, and vice versa. 
Most games will end in a tie. Due to a bug, players will have to click refresh to play another match.

///------------------------------
///     CURRENT BUGS
///------------------------------
1)  Although the game can still be played, the script does not correctly check the users' inputs. 
    This means that the game does not end through the code. 
    Players will have to refresh the page in order to play another match. 
    The issue should be resolved by editing the RowCheck() function, specifically in the if statements. 

2)  Additionally, the red team's squares can be overwritten if the blue team presses on them.
    However, this does not occur in the if the red team presses on a blue team square.
    The bug is located in the main event listener, where the classes are added and removed.
    The square class is removed correctly, but the function will add another class on top of the one previously.
    So, if a red player clicked a square, 'square-red' class is added and 'square' is removed.
    On the next turn, when the blue player clicks the square, 'square-blue' class is added on top.
    The CSS for 'square-blue' is then used on the square, instead of 'square-red'.
    This issue will also cause issues with the RowCheck() function.

3)  If a player presses on a square that they already own, their turn will end. This is not intended.
    The issue can be solved with the same fix listed in bug #2.

///------------------------------
///     FILE DIRECTORY
///------------------------------
finalproject
    -> _tictactoe
        -> css
            -> tictactoe.css
        -> js
            -> tictactoe.js
        -> tictactoe.html
        -> readme.txt
    -> css
        -> alt.css
    -> js
        -> alt.js
    -> media
        -> dice.gif

///------------------------------
///     CONTACT INFORMATION
///------------------------------
Author: Colin Haroutunian
Email:  haroutc@mail.nmc.edu

///------------------------------
///     COPYRIGHT INFORMATION
///------------------------------
If a .html file is reproduced, please provide credits to the author in the page interface.
If a .js or .css file is reproduced, please provide credits to the author in the comments or documentation.