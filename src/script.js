const ville = document.getElementById("ville")

const loading = document.getElementById("loading")

const la_ville_selectionner = document.getElementById("la_ville_selectionner")

const temperature_en_C = document.getElementById("temperature_en_°C")

const description = document.getElementById("description")

const icone = document.getElementById("icone")

const humidite = document.getElementById("humidite")

const vent = document.getElementById("vent")

const jour_container = document.getElementById("jour_container")

const message_derreur = document.getElementById("message_derreur")

const recherche = document.getElementById("recherche")


const WEATHER_CODES = {
    0: { label: "Ciel dégagé", icon: "☀️" },
    1: { label: "Plutôt dégagé", icon: "🌤️" },
    2: { label: "Partiellement nuageux", icon: "⛅" },
    3: { label: "Couvert", icon: "☁️" },
    45: { label: "Brouillard", icon: "🌫️" },
    48: { label: "Brouillard givrant", icon: "🌫️" },
    51: { label: "Bruine légère", icon: "🌦️" },
    53: { label: "Bruine", icon: "🌦️" },
    55: { label: "Bruine forte", icon: "🌦️" },
    56: { label: "Bruine verglaçante", icon: "🌧️" },
    57: { label: "Bruine verglaçante", icon: "🌧️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    66: { label: "Pluie verglaçante", icon: "🌧️" },
    67: { label: "Pluie verglaçante", icon: "🌧️" },
    71: { label: "Neige légère", icon: "🌨️" },
    73: { label: "Neige", icon: "🌨️" },
    75: { label: "Neige forte", icon: "❄️" },
    77: { label: "Grains de neige", icon: "🌨️" },
    80: { label: "Averses légères", icon: "🌦️" },
    81: { label: "Averses", icon: "🌧️" },
    82: { label: "Averses violentes", icon: "⛈️" },
    85: { label: "Averses de neige", icon: "🌨️" },
    86: { label: "Fortes averses de neige", icon: "❄️" },
    95: { label: "Orage", icon: "⛈️" },
    96: { label: "Orage avec grêle", icon: "⛈️" },
    99: { label: "Orage avec forte grêle", icon: "⛈️" },
};

const url = "https://geocoding-api.open-meteo.com/v1/search?name="   /*rechercher une ville et de recuperer ses coordonnees geographiques : latitude et longitude*/

recherche.addEventListener("click", function () {

    const nomVille = ville.value.trim()  /*Recuperer le nom de la ville */

    if (nomVille === "") {    /*Verifier si le champ est vide */
        message_derreur.textContent = "Veuillez saisir une ville !"
        message_derreur.classList.remove("hidden")
        return;
    }

    message_derreur.classList.add("hidden")   /*Cacher erreur et afficher Loading */
    loading.classList.remove("hidden")

    const urlVille = url + encodeURIComponent(nomVille)

    fetch(urlVille)
        .then(response => {
            if (!response.ok) {
            throw new Error("Erreur lors de la recherche de la ville")
        }

        return response.json()
        })
        .then(data => {

    if (!data.results || data.results.length === 0) {
        throw new Error("Ville introuvable")
    }
    const resultat = data.results[0]
    la_ville_selectionner.textContent = resultat.name
    const latitude = resultat.latitude
    const longitude = resultat.longitude
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&wind_speed_unit=kmh&timezone=auto`
    return fetch(weatherUrl)
})
        .then(response => {
             if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la météo")
    }
    return response.json()
        })
       .then(meteo => {
    const codeMeteo = meteo.current.weather_code

    if (WEATHER_CODES[codeMeteo]) {   /*verifier que le code meteo existe dans mon objet WEATHER_CODES */
        description.textContent = WEATHER_CODES[codeMeteo].label   /*label et icon */
        icone.textContent = WEATHER_CODES[codeMeteo].icon
    }
    else {
        description.textContent = "Météo inconnue" /*sinon affichage description et icone par défaut */
        icone.textContent = "🌡️"
    }

    temperature_en_C.textContent = meteo.current.temperature_2m + " °C"
    humidite.textContent = meteo.current.relative_humidity_2m + " %"
    vent.textContent = meteo.current.wind_speed_10m + " km/h"

    return meteo
})
        .then(jours => {  /*affichage de prevision de 5 jours */
            jour_container.innerHTML = ""
            jours.daily.temperature_2m_max.forEach((jour, index) => {         /*affichage des prochains jours */
                const date = new Date(jours.daily.time[index])
                        const dateEnClair = date.toLocaleDateString("fr-FR", {   /*afficher la date clair */
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    })

                jour_container.innerHTML += ` 
                    <div class="bg-white p-5 w-full">
                        <h3>${dateEnClair}</h3>
                        <p>☀️</p>
                        <p>${jour} °C</p>
                        <p>${jours.daily.temperature_2m_min[index]} °C</p>
                    </div> `
            });

            return jours
        })
        .catch(error => {
            message_derreur.textContent = error.message
            message_derreur.classList.remove("hidden")
        })
        .finally(() => {
            loading.classList.add("hidden")
        });
})