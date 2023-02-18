
function autoSuggestUsername(event){
    // Grab the input email
    let email = event.target.value;
    // Check that it's a valid looking email (contains an @ symbol)
    let atSymbolIndex = email.indexOf("@");
    // Return if the email isn't valid
    if(atSymbolIndex == -1){
        return;
    }
    // Grab the username field
    let username = document.getElementById("formUsername");
    // Return if it's not empty
    if(username.value != ""){
        return;
    }
    // Create substring to populate empty username field
    let sub = email.substring(0, atSymbolIndex);
    username.value = sub;
}

function addConcernMessage(){
    // Grab the div corresponding to the message box that pops up when the concern button is selected
    let concernMessage = document.getElementById("concernMessageBoxContainer");
    // Make the box visibile
    concernMessage.style.setProperty("visibility", "visible");
}

function removeConcernMessage(){
    // Grab the div corresponding to the message box that pops up when the concern button is selected
    let concernMessage = document.getElementById("concernMessageBoxContainer");
    // Make the box hidden
    concernMessage.style.setProperty("visibility", "hidden");
}

function addListeners(){
    // Adds an event listener for the email input field
    // Anytime this field is changed, it will call autoSuggestUsername
    let emailInput = document.getElementById("formEmail");
    emailInput.addEventListener("change", autoSuggestUsername);

    // Adds an event listener for when the concern button is clicked
    let concernButton = document.getElementById("formConcern");
    concernButton.addEventListener("click", addConcernMessage);

    // Adds event listeners for when the comment/question buttons are clicked
    let commentButton = document.getElementById("formComment");
    commentButton.addEventListener("click", removeConcernMessage);

    let questionButton = document.getElementById("formQuestion");
    questionButton.addEventListener("click", removeConcernMessage);
}

addListeners();