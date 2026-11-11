const ville = document.getElementById("ville")

const loading = document.getElementById("loading")

const la_ville_selectionner = document.getElementById("la_ville_selectionner")

const temperature_en_C = document.getElementById("temperature_en_°C")

const description = document.getElementById("description")

const icone = document.getElementById("icone")

const humidite = document.getElementById("humidite")

const vent = document.getElementById("vent")

const message_derreur = document.getElementById("message_derreur")

const recherche = document.getElementById("recherche")

const url = "https://geocoding-api.open-meteo.com/v1/search?name="

recherche.addEventListener("click", function() {

    const nomVille = ville.value.trim()

    if (nomVille === "") {
        message_derreur.textContent = "Veuillez saisir une ville !"
        message_derreur.classList.remove("hidden")
        return;
    }

    message_derreur.classList.add("hidden")
    loading.classList.remove("hidden")

    const urlVille = url + encodeURIComponent(nomVille)

    fetch(urlVille)
    .then(response => response.json())
    .then(data => {
        const resultat = data.results[0];

        const latitude = resultat.latitude;
        const longitude = resultat.longitude;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh&timezone=auto`

        return fetch(weatherUrl)
    })
    .then(response => response.json())
    .then(meteo => {
        console.log(meteo)

        console.log(meteo.current.temperature_2m)
        console.log(meteo.current.relative_humidity_2m)
        console.log(meteo.current.wind_speed_10m)
        console.log(meteo.current.weather_code)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => {
        loading.classList.add("hidden")
    });
})