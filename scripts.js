document.addEventListener("DOMContentLoaded", function () {

const doxeado=document.getElementById('doxeado');
const saludo = document.getElementById('saludo');
const boton = document.getElementById('boton');

boton.addEventListener('click', getLocation);
async function getLocation()
{
    const response = await fetch('https://ipapi.co/json/');
    const localizacion = await response.json();
    console.log(localizacion);
    doxeado.innerHTML = localizacion.ip+' '+localizacion.country+' '+localizacion.city+' '+localizacion.postal;
    const saludoResponse = await fetch('http://stefanbohacek.com/hellosalut/?cc='+localizacion.country);
    const saludoLocalizacion = await saludoResponse.json();
    saludo.innerHTML = saludoLocalizacion.hello;

}
})

