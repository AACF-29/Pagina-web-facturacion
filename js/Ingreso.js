const boton = document.querySelector('#btnIngresar');

boton.addEventListener('click', function (e) {
    // Este método cancela el evento
    e.preventDefault();
        let datos = new FormData(document.getElementById('formIngreso'));
        const url = "../control/procesoIngreso.php";
        fetch(url, {
            method: 'POST',
            body : datos
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                alert('Respuesta ' + response);
                //clearData();
                if(response === true){
                window.location.href = "../index.html";
                }else{
                    alert('Error');
                }
            })
            .catch(error => {
                console.error(" error : "+error);
            })        

});