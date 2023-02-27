class Validator {
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-valid-mail',
            'data-equal-password',
            'data-password-validate'     
        ]
    }

    validate(form) {
        // GET CURRENT FIELDS VALIDATED
        let currentValidations = document.querySelectorAll('form .error-validation');
        // CLEAN VALIDATIONS
        if(currentValidations.length){
            this.cleanValidations(currentValidations);
        }
        // GET ALL INPUTS
        let inputs = form.getElementsByTagName("input")
        // CONVERT HTMLCollections TO ARRAY
        let inputsArray = [...inputs];
        // ARRAY LOOP
        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {
                    let method = this.validations[i].replace("data-", "").replace("-","");
                    let value = input.getAttribute(this.validations[i]);
                    this[method](input, value);
                }
            }
        }, this);
    }

    // PASSWORD VALIDATION
    passwordvalidate(input) {
        let charArray = input.value.split("");

        let upperCount = 0;
        let numCount = 0;
        let specCharCount = 0
        let specChars = ['!','@','#', '$','%','&','*','(',')',];

        for(let i = 0; charArray.length > i; i++)  {
            for(let j = 0; j < charArray.length; j++){
                if(charArray[i] === specChars[j]) {
                   specCharCount++;                   
                }
            }
            if(charArray[i] === charArray[i].toUpperCase() && isNaN(parseInt(charArray[i]))) {
                upperCount++;                
            } else if(!isNaN(parseInt(charArray[i]))) {
                numCount++;                
            }
        }

        if(upperCount === 0 || numCount === 0 || specCharCount === 0) {
            let errorMessage = "Password does not meet the requirements";
            this.printMessage(input, errorMessage);
        }
    }

    // COMPARE VALUES 
    equalpassword(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = 'The passwords are not equals';

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    // MIN CHARACTERS VALIDATION
    minlength(input, minValue) {

        let inputLength = input.value.length;
        let errorMessage = 'This field require at least ' + minValue + ' characters';

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }

    }

    // EMAIL VALIDATION
    validmail(input) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let email = input.value;
        let errorMessage = 'Insert a valid email address, like mail@mail.com';

        if(!validRegex.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    // REQUIRED FIELDS
    required(input){
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = 'Required field';
            this.printMessage(input, errorMessage);
        }
    }

    // PRINT MESSAGE IN INPUT
    printMessage(input, msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
    
            let inputParent = input.parentNode;
            template.classList.remove('template');
    
            inputParent.appendChild(template);
        }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("reg-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

submit.addEventListener('click', function(e){
    
    e.preventDefault();

    validator.validate(form);

})