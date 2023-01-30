let genButton = document.getElementById("genbutton")
let inputBox = document.getElementById("input")
let caps = document.getElementById("capsCheck");
let special = document.getElementById("specialCheck");
let numbers = document.getElementById("numbersCheck");
let passwordBox = document.getElementById("password-text-box");
let count = 0;
let oldPasswords = [];

let copyBtn = document.getElementsByClassName("copy-button");

console.log(genButton);
console.log(inputBox);
console.log(caps);
console.log(special);
console.log(numbers);
console.log(passwordBox);
console.log(copyBtn);

genButton.addEventListener("click", () => {
    let length = inputBox.value;
    length == 0? console.log("Length: null"): console.log("Length: " + length);
    CreatePassword(length);
})

function CreatePassword(length) {
    let min = 0;
    let max;
    let password = "";
    let numbs = "0123456789";
    let capsChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let specialChars = "!@#$%^&*()";
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let j = 0;
    while(password.length < length) {
        j = Math.round(Math.random() * (4 - 0) + 0);
        switch (j) {
            case 0:
                if(caps.checked) {
                    max = capsChars.length;
                    password += capsChars.charAt(Math.round(Math.random() * (max - min) + min));
                }
                break;
            case 1:
                if(special.checked) {
                    max = specialChars.length;
                    password += specialChars.charAt(Math.round(Math.random() * (max - min) + min));
                }
                break;
            case 2:
                if(numbers.checked) {
                    max = numbs.length;
                    password += numbs.charAt(Math.round(Math.random() * (max - min) + min));
                }
                break;
            case 3:
                max = chars.length;
                password += chars.charAt(Math.round(Math.random() * (max - min) + min));
                break;
        }
    }
    password.length == 0? console.log("Password: null"): console.log("Password: " + password);
    passwordBox.value = password.substring(0, length);
    password.length != 0? AddPasswordToList(password): console.log("Element not created");
}

function AddPasswordToList(password) {
    let grandparent = document.getElementById("old-passwords");
    let parent = document.createElement("li");
    let storePass = document.createElement("textarea");
    let storeCopyBtn = document.createElement("button");
    grandparent.appendChild(parent);

    //Setting up textbox element
    storePass.id = "password".concat(count);
    storePass.cols = "30";
    storePass.rows = "1";
    storePass.readOnly = true;
    storePass.type = "text"
    storePass.className = "password-saved password-textbox";
    storePass.value = password;
    if(storePass.value.length > 20) {
        console.log("Password Length: " + password.length);
        console.log("Store Pass Length: " + storePass.value.length);
        storePass.rows = ((password.length / 20)) + "";
        passwordBox.rows = ((password.length / 20)) + "";
        console.log("Divided: " +  password.length / 20);
    } else {
        passwordBox.rows = 1;
    }

    //Setting up copy button element
    storeCopyBtn.id = "copy-btn" + count;
    storeCopyBtn.textContent = "Copy";
    storeCopyBtn.className = "copy-button";

    //Finalizing
    parent.appendChild(storePass);
    parent.appendChild(storeCopyBtn);
    storeCopyBtn.addEventListener("click", () => {
        console.log("Copy button id: " + storeCopyBtn.id);
        storePass.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(storePass.value);
        console.log("Copied Text: " + storePass.value);
    }) 
    oldPasswords.push(storePass.id);
    console.log("Old Password " + count + ": " + oldPasswords[count].value);
    console.log(grandparent);
    console.log("Password Array: " + oldPasswords[count]);
    console.log(copyBtn)
    count++;
}

function CopyToClipboard() {
    console.log("Here");
}