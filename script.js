const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message
}

function showSuccess (input) {
    const formControl = input.parentElement;
    console.log(formControl);
    formControl.className = 'form-control success';
}

function checkValidEmail (input) {
    const mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailFormat.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkRquired(inputArray) {
    inputArray.forEach((input) => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be minimum ${min} characters long`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be no longer than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Message passwords do not match');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRquired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 3, 15);
    checkValidEmail(email);
    checkPasswordMatch(password, password2);
})
