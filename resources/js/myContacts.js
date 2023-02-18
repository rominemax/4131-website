
// Sets the display image according to which location is being hovered over
// Idea for "event" parameter and target use from the class textbook
function setDisplayImage(event) {
    // children[0] should always be the image because the image comes first in the HTML file
    let source = event.target.children[0].src;
    let altText = event.target.children[0].alt;
    document.getElementById("previewImage").src = source;
    document.getElementById("previewImage").alt = altText;
}

// Resets the display image to be goldy if the mouse is no longer hovering over any of the locations
function setDefault() {
    document.getElementById("previewImage").src = "resources/images/gophers-mascot.png";
    document.getElementById("previewImage").alt = "Gopher's Mascot";
}

// Alphabetically sorts the rows of the contacts table based on which column header was clicked on
function tableSort(event) {
    let rows = [];              // List for holding row elements of the table
    let columnElements = []     // List for holding column elements of the targeted sort column

    // -1 indicates no column selected
    let column = -1;    

    // Grab the table element so we can pull out its rows and index its columns
    let table = document.getElementById("contactsTable");

    // Assign the column variable based on which column was clicked on
    // This determines which column inside of each row's "cells" attribute will be looked at
    if(event.target.id == "nameColumn")     {column = 0;}
    if(event.target.id == "locationColumn") {column = 1;}
    if(event.target.id == "contactColumn")  {column = 2;}
    if(event.target.id == "emailColumn")    {column = 3;}
    if(event.target.id == "websiteColumn")  {column = 4;}

    // Put the HTMLCollection of row elements into a list
    // Start at 1 to skip the headers row
    for(let i = 1; i < table.rows.length; i++){
        rows[i - 1] = table.rows[i];
    }
    // console.log(rows);
    // Populate columnElements with the innerText of the specified column for sorting
    for(let i = 0; i < rows.length; i++){
        columnElements[i] = rows[i].cells[column].innerText;
    }
    // console.log(columnElements);

    // Sort the elements in alphabetical order
    // Idea for sort structure from question 2 in participation activity 6.8.10 in the class textbook
    // https://learn.zybooks.com/zybook/UMNCSCI4131KluverFall2022/chapter/6/section/8?content_resource_id=67107164
    columnElements.sort(function(a, b){
        if(a > b){
            return 1;
        }
        else {
            return -1;
        }
    })
    // console.log(columnElements);

    // Reorder the nodes in the DOM tree with appendChild()
    // Also reassign the even/odd row attribute of each row based on its
    // new ordering so the table rows still alternate colors
    for(let i = 0; i < columnElements.length; i++){
        for(let j = 0; j < rows.length; j++){
            // If statement should catch 1 row everytime we go through the inner loop.
            // Only true when the jth row is the row containing the sorted column element.
            // Since we're looping through columnElements sequentially, this adds the rows
            // back to the table in the correct sorted order.
            if(rows[j].cells[column].innerText == columnElements[i]){
                if(i % 2 == 0){
                    rows[j].className = "evenRow";
                }
                else {
                    rows[j].className = "oddRow";
                }
                table.append(rows[j]);
            }
        }
    }
}

// Adds event listeners to each location table datum. When the mouse is hovered over each of the locations in the table,
// their respective image will be displayed in the preview image on the right side of the page.
// Idea for event listeners assignment from example 7.4.6 in the textbook
function addListeners() {
    // Event listeners for thumbnail images
    let wendtLocation = document.getElementById("wendtLocation");
    wendtLocation.addEventListener("mouseenter", setDisplayImage);
    wendtLocation.addEventListener("mouseleave", setDefault);

    let kluverLocation = document.getElementById("kluverLocation");
    kluverLocation.addEventListener("mouseenter", setDisplayImage);
    kluverLocation.addEventListener("mouseleave", setDefault);

    let orbanLocation = document.getElementById("orbanLocation");
    orbanLocation.addEventListener("mouseenter", setDisplayImage);
    orbanLocation.addEventListener("mouseleave", setDefault);

    let goldyLocation = document.getElementById("goldyLocation");
    goldyLocation.addEventListener("mouseenter", setDisplayImage);
    goldyLocation.addEventListener("mouseleave", setDefault);

    let gabelLocation = document.getElementById("gabelLocation");
    gabelLocation.addEventListener("mouseenter", setDisplayImage);
    gabelLocation.addEventListener("mouseleave", setDefault);

    // Event listeners for sorting
    // Index 0
    let nameColumn = document.getElementById("nameColumn");
    nameColumn.addEventListener("click", tableSort);

    // Index 1
    let locationColumn = document.getElementById("locationColumn");
    locationColumn.addEventListener("click", tableSort)

    // Index 2
    let contactColumn = document.getElementById("contactColumn");
    contactColumn.addEventListener("click", tableSort)

    // Index 3
    let emailColumn = document.getElementById("emailColumn");
    emailColumn.addEventListener("click", tableSort)

    // Index 4
    let websiteColumn = document.getElementById("websiteColumn");
    websiteColumn.addEventListener("click", tableSort)
}

addListeners();