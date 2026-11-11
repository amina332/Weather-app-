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
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        loading.classList.add("hidden");
    });
});