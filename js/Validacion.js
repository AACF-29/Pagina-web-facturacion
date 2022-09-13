class Validacion {
    
    constructor() { 
        
    }

    inputValid(input,regex) {
        return input.match(regex) ? true : false; 
    }
    validCorreo(value) {
        const correoRegex = /^([\w.]+[^#$%&\/()='"!?¡]\w*-*)([@])(\w)+(\.[a-z]{2,3})$/g;
        const resp = this.inputValid(value, correoRegex);
        return resp;
    }
    validDocument(value) {
        const docuRegex = /^([\d]{4,11})$/g;
        const resp = this.inputValid(value, docuRegex);
        return resp;
    }
    validName(value) {
        const nombresRegex = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{4,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
        const resp = this.inputValid(value, nombresRegex);
        return resp;
    }
    validCity(seIndex) {
        let resp = false;
        if (seIndex > 0) {
            resp = true;        
        } else {
            resp = false;
        }
        return resp;
    }
    validContras(contra1,contra2) {
        const resp = contra1 === contra2 ? true : false;
        return resp;
    }

    validarFormulario = (object) => {
        const formsValues = Object.values(object);    
        let valores = formsValues.findIndex(v => v === false);   
        return valores;
    }

}

export { Validacion }

