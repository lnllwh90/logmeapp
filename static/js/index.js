
// Function to move an element after the parent
function insertAfter(referenceNode, newNode){
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// assigns user_icon_001.png to email icon element in the HTML
var email_logo = new Image(25, 25);
email_logo.src = '/static/img/user_icon_001.png';
var emg = document.createElement("img").appendChild(email_logo);
emg.setAttribute("id", "email_icon")

var email_icon = document.getElementById("email_logo");
// email_icon.appendChild(email_logo);
insertAfter(email_icon, emg)

// assign password logo to password_icon element in the HTML
var password_logo = new Image(25,25);
password_logo.src = '/static/img/pw.png';
var pmg = document.createElement("img").appendChild(password_logo);
pmg.setAttribute("id", "password_icon")

var password_icon = document.getElementById("pw_logo");
insertAfter(password_icon, pmg)

