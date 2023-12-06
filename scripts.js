document.addEventListener("DOMContentLoaded", function () {
    const doxeado = document.getElementById('doxeado');
    const saludo = document.getElementById('saludo');
    const boton = document.getElementById('boton');
    getLocation();
    
    async function getLocation() {
        const response = await fetch('https://ipapi.co/json/');
        const localizacion = await response.json();
        console.log(localizacion);
        doxeado.innerHTML = localizacion.ip+' '+localizacion.country+' '+localizacion.city+' '+localizacion.postal;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'http://stefanbohacek.com/hellosalut/?cc='+localizacion.country;
        const saludoResponse = await fetch(proxyUrl + targetUrl);
        const saludoLocalizacion = await saludoResponse.json();
        saludo.innerHTML = saludoLocalizacion.hello;
    }
});