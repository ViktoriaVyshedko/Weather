/*innerhtml, Document.CreateElement, appendChild
fetch*/

function getTemperature() {
    let latitudeField = document.getElementById('latitude');
    let longitudeField = document.getElementById('longitude');
    let button = document.getElementById('button');
    button.onclick = async function() {       
        let latitude = parseFloat(latitudeField.value);
        let longitude = parseFloat(longitudeField.value);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            throw new Error('WrongArgumentType');
        };
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new Error('WrongValue');
        };
        let promise = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto&forecast_days=1`);
        let temperature = await promise.json();
        let span = document.createElement('span');
        span.innerHTML = await temperature.current.temperature_2m + '&deg;';
        await document.body.append(span);
    };
}

getTemperature();