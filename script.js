// Initialize all message on red color

document.querySelectorAll('.message-login, .message-signin').forEach(function (element) {
    element.style.color = "red"
})

// Switch buttons form

document.getElementById('form-login').classList.add('hide');

function hideForm(formId) {
    var forms = document.querySelectorAll('#form-login, #form-signin');
    var btns = document.querySelectorAll('#signup_btn, #login_btn');

    forms.forEach(function (element) {
        if (formId == element.id) {
            element.classList.add('hide');
        } else {
            element.classList.remove('hide');
        }
    })


    btns.forEach(function (element) {
        if (formId == element.getAttribute('data-form')) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    })

    resetForm();
}

// Creation of a user's class

class User {
    constructor(lastname, firstname, username, password) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.username = username;
        this.password = password;
    }

    setLastname(value) {
        this.lastname = value;
    }

    getLastname() {
        return this.lastname;
    }

    setFirstname(value) {
        this.firstname = value;
    }

    getFirstname() {
        return this.firstname;
    }

    setUsername(value) {
        this.username = value;
    }

    getUsername() {
        return this.username;
    }

    setPassword(value) {
        this.password = value;
    }

    getPassword() {
        return this.password;
    }
}

tabUser = []; // Array for stock all users

function checkAlreadySignUp(tabUsers, username) {
    for (let i = 0; i < tabUsers.length; i++) {
        if (tabUsers[i].getUsername() == username) {
            return 1;
        }
    }

    return 0;
}

// Function to recover user with 2 parameters : username and password that enter by the user

function getUser(username, password) {
    for (var i = 0; i <= tabUser.length; i++) {
        var user = tabUser[i];

        for (var property in user) {
            if (username == user.getUsername() && password == user.getPassword()) {
                return user;
            } 
        }
    }
}

// Function to record on the tabUser the user 

function signin() {
    // Initialize variables
    var user;

    // Fields value 
    var lastnameInput = document.getElementById('lastname').value;
    var firstnameInput = document.getElementById('firstname').value;
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    let inputs = document.querySelectorAll('.form-signin input');

    inputs.forEach(function (element) {
        if (element.value == '') {
            element.style.borderBottom = '1px solid red';
            document.querySelector('.message-signin').innerHTML = 'Veuillez remplir les champs manquants';
        } else {
            element.style.borderBottom = '1px solid #5CB85C';
            if (lastnameInput && firstnameInput && usernameInput && passwordInput) {
                if (checkAlreadySignUp(tabUser, usernameInput) == 1) {
                    document.querySelector('.message-signin').style.color = "red";
                    document.querySelector('.message-signin').innerHTML = 'Pseudo fdp';
                } else {
                    user = new User(lastnameInput, firstnameInput, usernameInput, passwordInput); // Create a new user with all fields value at the top
                    tabUser.push(user);
                    document.querySelector('.message-login').style.color = "#5CB85C";
                    document.querySelector('.message-login').innerHTML = 'Votre compte à été crée';

                    hideForm('form-signin');
                }

                
            }
        }
    })
}

// Function to login user on his account

function login() {
    var usernameInput = document.getElementById('username_log').value;
    var passwordInput = document.getElementById('password_log').value;

    let inputs = document.querySelectorAll('.form-login input');

    inputs.forEach(function (element) {
        if (element.value == '') {
            element.style.borderBottom = '1px solid red';
            document.querySelector('.message-login').innerHTML = 'Veuillez remplir les champs manquants';
        } else {
            element.style.borderBottom = '1px solid #5CB85C';
            if (element.value !== '') {
                if (getUser(usernameInput, passwordInput)) {
                    document.querySelector('.message-login').style.color = "#5CB85C";
                    document.querySelector('.message-login').innerHTML = 'Vous êtes connecté en tant que ' + usernameInput + '';
                } else {
                    element.style.borderBottom = '1px solid red';
                    document.querySelector('.message-login').innerHTML = 'Mauvais mail ou mauvais mot de passe';
                }
            }
        }
    })
}

function resetForm() {
    document.querySelector('.message-signin').innerHTML = '';

    let inputs = document.querySelectorAll('.form-signin input');

    inputs.forEach(function (element) {
        element.style.borderBottom = '1px solid #000';
        element.value = '';
    })
}