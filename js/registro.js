import { Validacion } from "./Validacion.js";
const validacion = new Validacion();
const boton = document.querySelector('#btnRegistrar');
const nombres = document.getElementById('inputNombres');
const apellidos = document.getElementById('inputApellidos');
const documento = document.getElementById('inputDocumento');
const ciudad = document.getElementById('ciudad');
const form = document.getElementById('formRegistro');

//console.log(ciudad);

const formValid = {
    nombres: false,
    apellidos: false,
    documento: false,   
    correo: false,    
    ciudad: false,
    pass: false,
    repass:false
}
const clearData = () => {
    const formValid = {
    nombres: false,
    apellidos: false,
    documento: false,
    ciudad: false
}
}


boton.addEventListener('click', function (e) {
    // Este método cancela el evento
    e.preventDefault();
    if (validacion.validarFormulario(formValid) === -1) {
        alert('Enviando Formulario');
        let datos = new FormData(document.getElementById('formRegistro'));
        const url = "../control/procesoRegistro.php";
        fetch(url, {
            method: 'POST',
            body : datos
        })
            .then(response => response.status)
            .then(response => {
                alert('Respuesta ' + response);
                //clearData();
                //window.location.href = "../index.html";
            })
            .catch(error => {
                console.error(" error : "+error);
            })        

    } else {
        alert('No se envía');
    }
});

form.addEventListener('change', (e) => {
    const inputId = e.target.id;
    console.log(inputId);
    const miValue = (e.target.value);  
    const miClass = e.target.classList;  
    const validClass = () => {
        miClass.add('is-valid');
        miClass.remove('is-invalid');
    };
    const inValidClass = () => {
        miClass.remove('is-valid');
        miClass.add('is-invalid');
    }
    switch (inputId) {
       
        case 'inputNombres':
            formValid.nombres = validacion.validName(miValue);
            (formValid.nombres) ? validClass() : inValidClass();//ternario
            console.log(Object.values(formValid));
           break;
       case 'inputApellidos':
            formValid.apellidos = validacion.validName(miValue);
            (formValid.apellidos) ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case 'inputDocumento':
            formValid.documento = validacion.validDocument(miValue);
            (formValid.documento) ? validClass() : inValidClass();           
            console.log(Object.values(formValid));
           break;
        case 'inputDir':           
            break;
        case 'inputEmail':
            formValid.correo = validacion.validCorreo(miValue);
            (formValid.correo) ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case 'inputUsuario':           
            break;
        case 'ciudad':
            formValid.ciudad = validacion.validCity(e.target.selectedIndex);
            (formValid.ciudad) ? validClass() : inValidClass();   
             console.log(Object.values(formValid));
             break;
        case ('inputRePassword'):           
            let contra = document.getElementById('inputPassword');
            formValid.repass = validacion.validContras(contra.value, miValue);          
            if (formValid.repass) {
                formValid.pass = true;
                validClass();
                contra.classList.remove('is-invalid');
                contra.classList.add('is-valid');
            } else {
                formValid.pass = false;
                inValidClass();
                contra.classList.remove('is-valid');
                contra.classList.add('is-invalid');
            }
           
            console.log(Object.values(formValid));
            break;
        case ('inputPassword'):
             let recontra = document.getElementById('inputRePassword');
            formValid.pass = validacion.validContras(recontra.value, miValue);          
            if (formValid.pass) {
                formValid.repass = true;
                validClass();
                recontra.classList.remove('is-invalid');
                recontra.classList.add('is-valid');
               
            } else {
                formValid.repass = false;
                inValidClass();
                recontra.classList.remove('is-valid');
                recontra.classList.add('is-invalid');
            }
            console.log(Object.values(formValid));
            break;
        default:
            break;
    }
    
});
/*Validación de inputDocumento
documento.addEventListener('change', (e) => {
    const docRgx = /^([\d]{4,11})$/g;
    formValid.documento = e.target.value.match(docRgx) ? true : false;  
    console.log(Object.values(formValid));
});
nombres.addEventListener('change', (e) => {
    const nomRgx = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{4,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
    formValid.nombres = e.target.value.match(nomRgx) ? true : false;  
    console.log(Object.values(formValid));
});

apellidos.addEventListener('change', (e) => {
    const apeRgx = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{4,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
    formValid.apellidos = e.target.value.match(apeRgx) ? true : false;  
    console.log(Object.values(formValid));
});
ciudad.addEventListener('change', (e) => {    
    if (e.target.selectedIndex > 0) {
        formValid.ciudad = true;
        console.log(Object.values(formValid));
    }
});*/