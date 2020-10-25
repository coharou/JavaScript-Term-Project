// Used for checkers.html, tictactoe.html, and hooked.html
// Please check 'js/main.js' for documentation of how these functions work.
// The difference between the two scripts is the removal of a few features relating to menu orientation and webpage linking.

function Main(){
    $(window).on('resize', function() {PageSizing();});
    $(document).ready(function(){AlterVisibility(); AlterBackgroundIMG(); PageSizing();});

    function PageSizing(){
        var windowSize = GetViewport();
        SetViewport(windowSize);
    }

    function GetViewport() {
        var windowX = $(window).width();
        var windowY = $(window).height();
        var windowSize = [windowX, windowY];
        return windowSize;
    }

    function SetViewport(windowSize) {
        $('#container').width(windowSize[0]);
        $('#container').height(windowSize[1]);

        var gifX = (windowSize[0] - 600) * 0.5;
        var gifY = (windowSize[1] - 600) * 0.5;
        $('#backimg').css('left', `${gifX}px`);
        $('#backimg').css('top', `${gifY}px`);
    }
    
    function AlterBackgroundIMG(){
        var randomNum = Math.round(4 * Math.random());
        //var images = ['../finalproject/media/bg1.png', '../finalproject/media/bg2.png', '../finalproject/media/bg3.png', '../finalproject/media/bg4.png'];
        var colors = ['#C0DCED', '#C0E1EB', '#C7EBE8', '#d1e2dc'];
        //$('#container').css('background-image', `url(${images[randomNum]})`);
        $('#container').css('background-color', `${colors[randomNum]}`);
    }

    function AlterVisibility(){
        $('#content').hide();
        $('#overlay').hide();
        $('#content').delay(1750).fadeIn(750);
        $('#overlay').delay(1750).fadeTo(750, '60%');
    }
}

Main();