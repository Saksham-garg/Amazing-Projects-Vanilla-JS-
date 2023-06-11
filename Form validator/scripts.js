const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.getElementById('form')

function showError(elementField,message){
    let formControl = elementField.parentElement;
    console.log("nfkd")
    formControl.className = 'form-control error';
    let errorElement = formControl.querySelector('small');
    errorElement.innerText = message;
}

function showSuccess(elementField){
    const formControl = elementField.parentElement;
    formControl.className = "form-control success";
}

function isValidEmail(email){
    
    return re.test(String(email).toLowerCase());
}

function getInputName(elementField){
    return elementField.id[0].toUpperCase() + elementField.id.slice(1);
}

function checkEmail(input){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.value.trim() == ''){
        showError(input,`${getInputName(input)} is required`)
    }
    else if(re.test(String(input.value.trim()).toLowerCase())){
        showSuccess(input)
    }else{
        showError(input,`${getInputName(input)} is not Valid`)
    }
}

function checkRequired(elementFields){
    elementFields.forEach(function(input){
        console.log("Hello")
        if(input.value.trim() === ''){
            showError(input,`${getInputName(input)} is required`)
        }else{
            showSuccess(input)
        }
    })
}

function checkLength(input,min,max){
    if(input.value.length>max){
        showError(input,`${getInputName(input)} must be less than ${max} characters`)
    }
    if(input.value.length < min){
        showError(input,`${getInputName(input)} should be atleast ${min} long`)
    }
}

function checkPassword(input1,input2){
    if(input1.value.trim() != input2.value.trim()){
        showError(input2,`${getInputName(input2)} not match`)
    }
}

//EVENT LISTENER
form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,email,password,password2])
    checkEmail(email)
    checkLength(username,3,20)
    checkLength(password,6,25)
    checkPassword(password,password2)
})
