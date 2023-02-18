// TODO: Based on the rules here, return an object with a properties `className` and `message`
//
// - A password with length less than 6 has `message` 'Short' and `className` 'short'
//
// Otherwise, we assign the password a score representing its strength. The
// score starts at 0 and will be incremented by one for each of the following
// conditions the password satisfies:
//
// - The password has length longer than 7
// - The password has at least one capital and lowercase letter
// - The password has at least one letter and at least one number
// - The password contains at two or more symbols
//
// We define symbols to be the following characters:
//    '!', '%', '&', '@', '#', '$', '^', '*', '?', '_', '~'
//
// Based on the value from the rules above, return the object with the correct
// values from the corresponding table:
//
// | Score | Class Name | Message         |
// |-------+------------+-----------------|
// | s < 2 | weak       | Weak Password   |
// | s = 2 | good       | Good Password   |
// | s > 2 | strong     | Strong Password |
function checkStrength(password) {
  let score = 0;
  let symbols = ['!', '%', '&', '@', '#', '$', '^', '*', '?', '_', '~'];

  // Check that the password is at least 6 characters
  if (password.length < 6) {
    return {
      message: 'Short',
      className: 'short'
    };
  }

  // + 1 score if password is longer than 7 characters
  if (password.length > 7){
    score++;
  }
  
  let symbolCount = 0;
  for(let i = 0; i < password.length; i++){
    for(let j = 0; j < symbols.length; j++){
      if(password[i] === symbols[j]){
        symbolCount++;
      }
    }
  }

  // + 1 score if password contains 2 or more symbols
  if (symbolCount >= 2){
    score++;
  }

  let capitalLetter = false;
  let lowercaseLetter = false;
  let number = false;
  // ***
  // Idea for charCodeAt() function use and conditional from example 6.11.5 in the textbook
  // ***
  for(let i = 0; i < password.length; i++){
    if(!capitalLetter){
      // Checks for the presence of a capital letter. Unicode values 65 <= x <= 90
      if(password[i].charCodeAt(0) >= 65 && password[i].charCodeAt(0) <= 90){
        capitalLetter = true;
      }
    }
    if(!lowercaseLetter){
      // Checks for the presence of a lowercase letter. Unicode values 97 <= x <= 122
      if(password[i].charCodeAt(0) >= 97 && password[i].charCodeAt(0) <= 122){
        lowercaseLetter = true;
      }
    }
    if(!number){
      // Checks for the presence of a number/digit. Unicode values 48 <= x <= 57
      if(password[i].charCodeAt(0) >= 48 && password[i].charCodeAt(0) <= 57){
        number = true;
      }
    }
  }

  // + 1 score if password contains at least 1 capital and 1 lowercase letter
  if (capitalLetter && lowercaseLetter){
    score++;
  }

  // + 1 score if password contains at least 1 letter and at least 1 number 
  if ((capitalLetter || lowercaseLetter) && number){
    score++;
  }

  if (score < 2){
    return {
      message: 'Weak Password',
      className: 'weak'
    };
  }
  else if (score == 2){
    return {
      message: 'Good Password',
      className: 'good'
    };
  }
  else if (score > 2){
    return {
      message: 'Strong Password',
      className: 'strong'
    };
  }
  
}

// You do not need to change this function. You may want to read it -- as you will find parts of it helpful with
// the countdown widget.
function showResult(password) {

  const { message, className } = checkStrength(password);

  if(!message || !className) {
    console.error("Found undefined message or className");
    console.log("message is", message);
    console.log("className is", className);
  }

  // This gets a javascript object that represents the <span id="pwdresult"></span> element
  // Using this javascript object we can manipulate the HTML span by
  // changing it's class and text content
  const resultElement = document.getElementById("pwdresult");

  // This sets the class to one specific element (since you can have multiple classes it's a list)
  resultElement.classList = [className];
  // This sets the text inside the span
  resultElement.innerText = message;
}

// Add a listener for the strength checking widget
function addPasswordListener() {
  let passwordEntry = document.getElementById('password');
  passwordEntry.addEventListener("keyup", () => {
    const password = passwordEntry.value;
    showResult(password);
  });
}

addPasswordListener();
