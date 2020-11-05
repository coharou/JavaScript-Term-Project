// Used for the homepage, main.html

function Main(){
    $(window).on('resize', function() {PageSizing();});
    $(document).ready(function(){AlterVisibility(); AlterBackgroundIMG(); PageSizing();}); 

    // On clicking the menu's navigation buttons, the user's tab will be switched to the respective game.
    $('#ttt').on('click', function(){location.assign("_tictactoe/tictactoe.html");});
    $('#ctf').on('click', function(){location.assign("_checkers/checkers.html");});
    $('#scr').on('click', function(){location.assign("_hooked/hooked.html");});

    function PageSizing(){
        var windowSize = GetViewport();
        SetViewport(windowSize);
        var menuSize = GetMenuSize();
        SetMenuPosition(menuSize, windowSize);
    }

    function GetViewport() {
        // Retrieves the window width and window height from the window object.
        var windowX = $(window).width();
        var windowY = $(window).height();

        // Stores the window width and height into an array, returning them to the calling function.
        var windowSize = [windowX, windowY];
        return windowSize;
    }

    function SetViewport(windowSize) {
        // Using the values retrieved from GetViewport(), the window width and window height are applied to the container.
        // The width and height is then inherited by the translucent overlay, which fades in alongside the page content.
        $('#container').width(windowSize[0]);
        $('#container').height(windowSize[1]);
    }

    function GetMenuSize(){
        // Gets the width and height of the menu.
        var menuX = $('#menu').width();
        var menuY = $('#menu').height();

        // Stores the menu width and height into an array, returning them to the calling function.
        var menuSize = [menuX, menuY];
        return menuSize;
    }

    function SetMenuPosition(menuSize, windowSize){
        // The purpose of the function is to center the menu on the page.
        // The equations take the window width (and height), subtracts them by the menu width (and height), then divides them by 2 to get the exact center of the menu in the viewport.
        var posX = (windowSize[0] - menuSize[0]) * 0.5;
        var posY = (windowSize[1] - menuSize[1]) * 0.5;

        // The absolute positions of the menu are set.
        // The menu will already be above the overlay, these functions just set it to the center of the viewport.
        $('#menu').css('left', `${posX}px`);
        $('#menu').css('top', `${posY}px`);

        var gifX = (windowSize[0] - 600) * 0.5;
        var gifY = (windowSize[1] - 600) * 0.5;
        $('#backimg').css('left', `${gifX}px`);
        $('#backimg').css('top', `${gifY}px`);
    }

    function AlterBackgroundIMG(){
        // Finds a random number between 0 - 1, multiplies this by 4, then rounds it for the variable.
        var randomNum = Math.round(4 * Math.random());

        // The 'colors' array is used with the random number to set a random background color for the container.
        var colors = ['#C0DCED', '#C0E1EB', '#C7EBE8', '#d1e2dc'];
        $('#container').css('background-color', `${colors[randomNum]}`);

        // OPTIONAL: used to input a random image.
        // var images = ['../finalproject/media/bg1.png', '../finalproject/media/bg2.png', '../finalproject/media/bg3.png', '../finalproject/media/bg4.png'];
        // $('#container').css('background-image', `url(${images[randomNum]})`);
    }

    function AlterVisibility(){
        // Hides the menu and the overlay.
        $('#menu').hide();
        $('#overlay').hide();

        // The menu and overlay wait 1.75 seconds, and are then slowly faded in to the scene in 0.75 seconds.
        $('#menu').delay(1750).fadeIn(750);
        $('#overlay').delay(1750).fadeTo(750, '60%');
    }
}

Main();