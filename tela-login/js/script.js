class Validator {
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-valid-mail'     
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