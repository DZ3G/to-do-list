// ===== VARIABLES PRINCIPALES =====

// Récupérer les éléments du HTML
let inputTache = document.getElementById('inputTache');
let btnAjouter = document.getElementById('btnAjouter');
let listeTaches = document.getElementById('listeTaches');
let messageVide = document.getElementById('messageVide');

// Tableau pour stocker toutes les tâches
let taches = [];

// ===== DEBUT =====

// Au chargement de la page, charger les tâches sauvegardées
document.addEventListener('DOMContentLoaded', function() {
    chargerTaches();
    afficherTaches();
});

// Ajouter une tâche quand on clique le bouton
btnAjouter.addEventListener('click', ajouterTache);

// Ajouter une tâche quand on appuie sur Entrée
inputTache.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        ajouterTache();
    }
});

// ===== FONCTION: AJOUTER UNE TÂCHE =====

function ajouterTache() {
    // Récupérer le texte entré par l'utilisateur
    let texte = inputTache.value.trim();

    // Vérifier que le texte n'est pas vide
    if (texte === '') {
        alert('Veuillez entrer une tâche!');
        return;
    }

    // Créer un objet tâche avec les informations nécessaires
    let nouvelleTache = {
        id: Date.now(),  // Utiliser l'heure actuelle comme ID unique
        texte: texte,
        complete: false,
        dateCreation: new Date().toLocaleDateString('fr-FR')
    };

    // Ajouter la tâche au tableau
    taches.push(nouvelleTache);

    // Sauvegarder les tâches dans localStorage
    sauvegarderTaches();

    // Vider l'input
    inputTache.value = '';

    // Redessiner la liste à l'écran
    afficherTaches();
}

// ===== FONCTION: SUPPRIMER UNE TÂCHE =====

function supprimerTache(id) {
    // Utiliser filter() pour garder seulement les tâches qui n'ont pas cet ID
    taches = taches.filter(function(tache) {
        return tache.id !== id;
    });

    // Sauvegarder les changements
    sauvegarderTaches();

    // Redessiner la liste
    afficherTaches();
}

// ===== FONCTION: MARQUER UNE TÂCHE COMME TERMINÉE =====

function terminerTache(id) {
    // Parcourir le tableau pour trouver la tâche
    for (let i = 0; i < taches.length; i++) {
        if (taches[i].id === id) {
            // Inverser l'état (terminée ou non)
            taches[i].complete = !taches[i].complete;
            break;
        }
    }

    // Sauvegarder les changements
    sauvegarderTaches();

    // Redessiner la liste
    afficherTaches();
}

// ===== FONCTION: AFFICHER TOUTES LES TÂCHES =====

function afficherTaches() {
    // Nettoyer la liste
    listeTaches.innerHTML = '';

    // Si pas de tâches, afficher un message
    if (taches.length === 0) {
        messageVide.classList.add('show');
        return;
    }

    // Cacher le message vide
    messageVide.classList.remove('show');

    // Parcourir toutes les tâches
    taches.forEach(function(tache) {
        // Créer un élément <li> pour chaque tâche
        let li = document.createElement('li');

        // Ajouter les classes CSS
        li.className = 'item-tache';
        if (tache.complete) {
            li.classList.add('completed');
        }

        // Créer le HTML pour la tâche
        li.innerHTML = `
            <div class="contenu-tache">
                <p class="texte-tache">${tache.texte}</p>
                <p class="date-tache">Créée le: ${tache.dateCreation}</p>
            </div>
            <div class="boutons-tache">
                <button class="btn-terminer">Terminer</button>
                <button class="btn-supprimer">Supprimer</button>
            </div>
        `;

        // Ajouter les écouteurs d'événements pour les boutons
        let btnTerminer = li.querySelector('.btn-terminer');
        let btnSupprimer = li.querySelector('.btn-supprimer');

        btnTerminer.addEventListener('click', function() {
            terminerTache(tache.id);
        });

        btnSupprimer.addEventListener('click', function() {
            supprimerTache(tache.id);
        });

        // Ajouter l'élément à la liste
        listeTaches.appendChild(li);
    });
}

// ===== FONCTION: SAUVEGARDER LES TÂCHES =====

function sauvegarderTaches() {
    // Convertir le tableau en texte JSON
    let json = JSON.stringify(taches);

    // Sauvegarder dans localStorage
    localStorage.setItem('mesTaches', json);
}

// ===== FONCTION: CHARGER LES TÂCHES =====

function chargerTaches() {
    // Récupérer les tâches sauvegardées depuis localStorage
    let json = localStorage.getItem('mesTaches');

    // Si rien n'est sauvegardé, garder un tableau vide
    if (json === null) {
        taches = [];
    } else {
        // Sinon, convertir le texte JSON en objet JavaScript
        taches = JSON.parse(json);
    }
}
