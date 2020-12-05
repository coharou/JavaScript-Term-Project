$(function() {
    // Used as the image name and as the ID for the pieces. Image file names are blue.png and red.png.
    var baseID;

    // The combination of baseID and its position in the for loop. It is the ID as found in the elements.
    var pieceID;

    // Creates a total of 24 pieces, 12 of which are red, and the other 12 are blue.
    for (let i = 1; i < 25; i++) {
        // Sets the baseID to red as long as there are fewer than 12 pieces. The first 12 pieces will be red.
        if(i < 13) { baseID = 'red'; }

        // Sets the baseID to blue as long as there are more than 12 pieces. The last 12 pieces will be blue.
        if ( i > 12) { baseID = 'blue'; }  

        // Combines the baseID with the position in the loop.
        pieceID = `${baseID}${i}`;

        // Creates a new element via the pieceID. If this were the second piece created, pieceID = 'red2' and the image file would be red.png.
        $('#pieceholder').prepend(`<div id = "${pieceID}" class = "item"><img src = 'media/${baseID}.png'></div>`);

        // Sets the new element to be draggable.
        $(`#${pieceID}`).draggable();
    }
});