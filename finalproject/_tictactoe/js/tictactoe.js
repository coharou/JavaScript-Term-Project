$(function() {
    var player = 'blue';                            // assign a fresh player variable
    var win = 0;                                    // assign a fresh neutral win value
    var sq;             
                                
    $('.square').on('click', function() {           // on clicking any square, call function
        sq = this.id;                               // save id of the clicked square
        $(`#${sq}`).removeClass('square');          // remove the default square class from the chosen square
        $(`#${sq}`).addClass(`square-${player}`);   // add the player's team name as the new square class
        win = RowCheck();                           // call the function to check for victory
        
        if (win == 0){ 
            player = PlayerTeam(player);            // call the function to change the playing team
        }
        else if (win == 1){
            window.alert(`${player} ${win}`);       // alert the players of a win or a tie
            for (let i = 0; i < 9; i++) {           // refresh the squares' classes to 'square'
                $(`#sq${i}`).attr('class', 'square');     
            }
            player = 'blue';                        // reset the player team
            win = 0;                                // reset the current win value
        }
    });

    function RowCheck() {
        var win = 0;
        var sq0 = $('#sq0').attr('class');          // gets the classes of the squares
        var sq1 = $('#sq1').attr('class');          // making these into variables increases code legibility
        var sq2 = $('#sq2').attr('class');
        var sq3 = $('#sq3').attr('class');
        var sq4 = $('#sq4').attr('class');
        var sq5 = $('#sq5').attr('class');
        var sq6 = $('#sq6').attr('class');
        var sq7 = $('#sq7').attr('class');
        var sq8 = $('#sq8').attr('class');

        /*
            -----------
            sq0 sq1 sq2
            sq3 sq4 sq5
            sq6 sq7 sq8
            -----------
        */

        if (sq0 !== 'square' && (sq0 == sq1 == sq2 || sq0 == sq3 == sq6 || sq0 == sq4 == sq8 )){
            win = 1;
        }
        if (sq4 !== 'square' && (sq3 == sq4 == sq5 || sq1 == sq4 == sq7 ||  sq2 == sq4 == sq6 )){
            win = 1;
        }
        if (sq8 !== 'square' && (sq6 == sq7 == sq8 || sq2 == sq5 == sq8 )){
            win = 1;
        }
        return win;
    }
    
    function PlayerTeam(player) {
        var newPlayer;                          // set a new variable to be returned
        switch (player) {
            case 'red':                         // if prior round was red's turn, switch to blue
                newPlayer = 'blue';
                break;
            case 'blue':                        // if prior round was blue's turn, switch to red
                newPlayer = 'red';
                break;
        }
        return newPlayer;                       // return player for the upcoming round to ProcessGame() function
    }
});
