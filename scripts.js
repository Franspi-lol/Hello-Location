document.addEventListener("DOMContentLoaded", function () {
    const doxeado = document.getElementById('doxeado');
    const ubicacion = document.getElementById('ubicacion');
    const temperatura = document.getElementById('temperatura');
    let localizacion;
    getLocation();
    
    
    async function getLocation() {
        const response = await fetch('https://ipapi.co/json/');
        localizacion = await response.json();
        console.log(localizacion);
        doxeado.innerHTML = localizacion.ip+' '+localizacion.country+' '+localizacion.city+' '+localizacion.postal;
        /* const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'http://stefanbohacek.com/hellosalut/?cc='+localizacion.country;
        const saludoResponse = await fetch(proxyUrl + targetUrl);
        const saludoLocalizacion = await saludoResponse.json();
        saludo.innerHTML = saludoLocalizacion.hello; */
        getWeather();
        getCoordinates();
         
    }

    async function getWeather(){
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+localizacion.latitude+'&longitude='+localizacion.longitude+'&hourly=temperature_2m&timezone=America%2FSao_Paulo&forecast_days=1');
        const weather = await response.json();
        console.log(weather);
        const now = new Date();
        const currentHour = now.getHours();
        temperatura.innerHTML = weather.hourly.temperature_2m[currentHour]+'ºC';
    }

    async function getCoordinates() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                console.log("Latitude: " + position.coords.latitude);
                console.log("Longitude: " + position.coords.longitude);
    
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBu8VxO23kfgxZn6IoXTc53T2v7RCU13gc`);
                const data = await response.json();
                console.log(data.results[0].formatted_address);
                ubicacion.innerHTML = data.results[0].formatted_address;
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    //https://api.open-meteo.com/v1/forecast?latitude=-37.9954&longitude=-57.5351&hourly=temperature_2m&forecast_days=1
    
});