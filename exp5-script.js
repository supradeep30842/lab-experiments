const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const phoneError = document.getElementById('phoneError');
const success = document.getElementById('success');

// Regex helpers
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^[0-9]{10}$/;

function validateName() {
    if (!nameInput.value.trim()) {
        nameError.textContent = "Name is required";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }
}
function validateEmail() {
    if (!email.value.trim()) {
        emailError.textContent = "Email is required";
        return false;
    } else if (!emailPattern.test(email.value)) {
        emailError.textContent = "Invalid email format";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}
function validatePassword() {
    if (!password.value) {
        passError.textContent = "Password is required";
        return false;
    } else if (password.value.length < 6) {
        passError.textContent = "At least 6 characters";
        return false;
    } else {
        passError.textContent = "";
        return true;
    }
}
function validatePhone() {
    if (!phone.value.trim()) {
        phoneError.textContent = "Phone required";
        return false;
    } else if (!phonePattern.test(phone.value)) {
        phoneError.textContent = "10 digit number only";
        return false;
    } else {
        phoneError.textContent = "";
        return true;
    }
}

// Real-time validation listeners
nameInput.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
phone.addEventListener('input', validatePhone);

// Form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const validName = validateName();
    const validEmail = validateEmail();
    const validPass = validatePassword();
    const validPhone = validatePhone();

    if (validName && validEmail && validPass && validPhone) {
        success.textContent = "Registration successful!";
        setTimeout(() => { success.textContent = ""; form.reset(); }, 2000);
    } else {
        success.textContent = "";
    }
});
