// Initialisation des variables
let gold = 150;
let minerCost = 100;
let miners = 200;
let cafeCost = 200; // Coût initial du café
let goldPerCafe = 150; // Gain initial d'or par café donné
let goldMultiplierBase = 50; // Multiplicateur de gold de base : 15
let minersGoldMultiplier = 2; // Définition de la variable et initialisation à 2
let goldMultiplierIncrement = 1.5; // Incrément du multiplicateur à chaque amélioration
let redbull = 2000;
let dynamite = 200000;

// Fonction pour extraire de l'or manuellement
function clickGold() {
    gold += goldMultiplierBase; // Ajouter le gain de base d'or par clic
    updateUI();
    playClickSound(); // Appel de la fonction pour jouer le son
}

// Fonction pour jouer le son du clic
function playClickSound() {
    clickSound.play(); // Jouer le son
}

// Fonction pour améliorer le mineur
function upMiner() {
    if (gold >= minerCost) {
        gold -= minerCost;
        miners++;
        minerCost = Math.ceil(minerCost * 1.5); // Augmentation exponentielle du coût de l'amélioration
        // Ajuster le gain d'or du mineur en fonction de l'amélioration
        goldMultiplierBase *= 1.5; // Augmenter le multiplicateur de gold de base
        updateUI();
    } else {
        alert("Vous n'avez pas assez d'or pour acheter cette amélioration.");
    }
    lvlupSound.play();
}

// Fonction pour mettre à jour l'affichage du coût du café
function updateCafeCost() {
    document.getElementById("cafeCost").textContent = cafeCost;
}

// Appelez updateCafeCost() dans la fonction upCafe() après avoir modifié cafeCost
function upCafe() {
    if (gold >= cafeCost) {
        gold -= cafeCost;
        goldMultiplierBase *= 1.5; // Augmenter le multiplicateur de gold de base
        cafeCost = Math.ceil(cafeCost * 1.5); // Augmentation du coût du café
        goldPerCafe = Math.ceil(goldPerCafe * 2.5); // Augmentation du gain d'or par café
        updateUI();
    } else {
        alert("Vous n'avez pas assez d'or pour donner un café au mineur.");
    }
    cafeSound.play(); // Jouer le son du café
}

// Variable pour stocker la durée du boost en millisecondes (30 secondes)
const boostDuration = 30000; 

function upRedbull() {
    if (gold >= redbull) {
        gold -= redbull;
        miners++;
        redbull = Math.ceil(redbull * 1.5); // Augmentation progressive du coût de l'amélioration
        // Ajuster le gain d'or du mineur en fonction de l'amélioration
        goldMultiplierBase *= 2; // Augmenter le multiplicateur de gold de base
        updateUI();

        // Appliquer le boost sur le mineur pendant 30 secondes
        minersGoldMultiplier *= 2; // Doubler le multiplicateur

        // Annuler le boost après la durée spécifiée
        setTimeout(function() {
            minersGoldMultiplier /= 2; // Réinitialiser le multiplicateur
            updateUI(); // Mettre à jour l'interface utilisateur après l'expiration du boost
        }, boostDuration);
    } else {
        alert("Vous n'avez pas assez d'or pour acheter cette amélioration.");
    }
    redbullSound.play();
}

// Fonction pour mettre à jour le GIF du mineur en fonction de l'action
function updateMiners(action) {
    document.getElementById("miner").innerHTML = "";
    if (miners > 0) {
        let img = document.createElement("img");
        img.src = "images/gif.gif";
        img.style.position = "absolute";
        img.style.top = Math.random() * -400 + "px";
        img.style.left = Math.random() * 400 + "px";
        img.style.width = "600px";
        img.style.height = "600px";
        document.getElementById("miner").appendChild(img);
    }

    if (action === "dynamite") {
        updateDynamite();
    }
}

// Fonction pour mettre à jour le GIF de l'explosion de dynamite
function updateDynamite() {
    document.getElementById("dynamite").innerHTML = "";
    if (miners > 0) {
        let img = document.createElement("img");
        img.src = "images/boom.gif";
        img.style.position = "absolute";
        img.style.top = Math.random() * 400 + "px";
        img.style.left = Math.random() * 1000 + "px";
        document.getElementById("dynamite").appendChild(img);

        // Supprimer l'image après une seconde
        setTimeout(function() {
            document.getElementById("dynamite").removeChild(img);
        }, 1000);
    }
}

// Fonction pour améliorer le mineur avec la dynamite
function upDynamite() {
    console.log('Gold:', gold);
    console.log('Dynamite cost:', dynamite);
    if (gold >= dynamite) {
        gold -= dynamite;
        // Ajouter les fonctionnalités spécifiques à la dynamite
        // Par exemple, augmenter la puissance du mineur, débloquer de nouvelles zones de minage, etc.
        dynamiteExplosion(); // Appel de la fonction d'explosion de dynamite
        updateUI();
        updateDynamite(); // Afficher le GIF de l'explosion de la dynamite
        powerSound.play(); // Jouer le son de la dynamite
    } else {
        alert("Vous n'avez pas assez d'or pour acheter de la dynamite.");
    }
}

function dynamiteExplosion() {
    // Logique de l'explosion de dynamite
    console.log("Boom! Dynamite exploded!");
}

// Définir un facteur d'augmentation du gain d'or
let goldGainIncrement = 4; // Facteur d'augmentation (ajustez selon vos besoins)

function upDynamite() {
    if (gold >= dynamite) {
        gold -= dynamite;
        
        // Ajouter les fonctionnalités spécifiques à la dynamite
        dynamiteExplosion(); // Appel de la fonction d'explosion de dynamite
        
        // Augmenter le coût de la dynamite de 225 000
        dynamite += 225000;

        // Mettre à jour l'interface utilisateur et sauvegarder les données
        updateUI();
        saveGame();
        
        updateDynamite(); // Afficher le GIF de l'explosion de la dynamite
        powerSound.play(); // Jouer le son de la dynamite
    } else {
        alert("Vous n'avez pas assez d'or pour acheter de la dynamite.");
    }
}

// Fonction de mise à jour de l'interface utilisateur
function updateUI() {
    document.getElementById("gold").textContent = gold;
    document.getElementById("minerCost").textContent = minerCost;

    // Mettez à jour les affichages des prix des améliorations
    document.getElementById("cafeCost").textContent = cafeCost; // Affiche le coût du café
    document.getElementById("dynamiteCost").textContent = dynamite; // Affiche le coût de la dynamite
    document.getElementById("redbullCost").textContent = redbull; // Affiche le coût de Red Bull

    updateMiners();
}


// Fonction pour générer de l'or automatiquement grâce aux mineurs
function autoMine() {
    gold += miners;
    updateUI();
}

// Fonction de mise à jour de l'interface utilisateur
function updateUI() {
    // Arrondir la valeur de gold à l'entier le plus proche avant de l'afficher
    document.getElementById("gold").textContent = Math.round(gold);

    // Mettre à jour le coût de l'amélioration du mineur
    document.getElementById("minerCost").textContent = Math.round(minerCost);
    
    // Mettre à jour l'interface du mineur
    updateMiners();
}



// Mise à jour automatique de l'or toutes les secondes
setInterval(autoMine, 1000);

////LOCALE STORAGE
// Sauvegarde de l'état du jeu dans le localStorage
function saveGame() {
    localStorage.setItem("gold", gold);
    localStorage.setItem("minerCost", minerCost);
    localStorage.setItem("miners", miners);
    localStorage.setItem("cafeCost", cafeCost);
    localStorage.setItem("redbull", redbull);
    localStorage.setItem("dynamite", dynamite);
}


// Chargement de l'état du jeu depuis le localStorage
function loadGame() {
    gold = parseInt(localStorage.getItem("gold")) || gold;
    minerCost = parseInt(localStorage.getItem("minerCost")) || minerCost;
    miners = parseInt(localStorage.getItem("miners")) || miners;
    cafe = parseInt(localStorage.getItem("cafeCost")) || cafe;
    redbull = parseInt(localStorage.getItem("redbull")) || redbull;
    dynamite = parseInt(localStorage.getItem("dynamite")) || dynamite;
    updateUI();
}

// Chargement du jeu au chargement de la page
window.onload = loadGame;

// Sauvegarde du jeu toutes les 1 seconde
setInterval(saveGame, 1000);

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialiser les variables du jeu
    gold = 0;
    minerCost = 100;
    miners = 0;
    cafe = 200
    goldMultiplierBase = 15; // Multiplicateur de gold de base : 1.5
    goldMultiplierIncrement = 1.5; // Incrément du multiplicateur à chaque amélioration
    redbull = 2000;
    dynamite = 200000;
    
    // Réinitialiser l'interface utilisateur
    updateUI();
    
    // Effacer les données sauvegardées dans le localStorage
    localStorage.clear();
    resetSound.play(); // Jouer le son du café
}

////AUDIO
let isBackgroundMusicEnabled = true;

// Fonction pour activer ou désactiver la musique de fond
function toggleBackgroundMusic() {
    if (isBackgroundMusicEnabled) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    isBackgroundMusicEnabled = !isBackgroundMusicEnabled;
}


// Création de l'élément audio pour la musique de fond
const backgroundMusic = new Audio('sons/idleminer.mp3');
backgroundMusic.loop = true; // Lecture en boucle

// Fonction pour démarrer la musique de fond
function startBackgroundMusic() {
    backgroundMusic.play();
}

// Fonction pour arrêter la musique de fond
function stopBackgroundMusic() {
    backgroundMusic.pause();
}

// Démarrer la musique lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', startBackgroundMusic);

// Arrêter la musique lorsque la page est quittée
window.addEventListener('unload', stopBackgroundMusic);

// Création des éléments audio
const clickSound = new Audio('sons/click.mp3'); // Son pour le clic d'extraction d'or
clickSound.volume = 0.3; // Réglage du volume à 30%
const lvlupSound = new Audio('sons/lvlup.mp3'); // Son pour l'achat d'un niveau
clickSound.volume = 0.3; // Réglage du volume à 30%
const cafeSound = new Audio('sons/cafe.mp3'); // Son pour donner un café au mineur
clickSound.volume = 0.3; // Réglage du volume à 30%
const redbullSound = new Audio('sons/canette.mp3') //Son pour donner une redbull
clickSound.volume = 0.3; // Réglage du volume à 30%
const powerSound = new Audio('sons/dynamite.mp3')
clickSound.volume = 0.3; // Réglage du volume à 30%
const resetSound = new Audio('sons/reset.mp3');
clickSound.volume = 0.3; // Réglage du volume à 30%

let soundEnabled = true; // Variable pour suivre l'état du son

// Fonction pour activer ou désactiver le son de tous les effets sonores des boutons
function muteSoundEffects() {
    if (soundEnabled) {
        clickSound.volume = 0;
        lvlupSound.volume = 0;
        cafeSound.volume = 0;
        redbullSound.volume = 0;
        powerSound.volume = 0;
        resetSound.volume = 0;
    } else {
        clickSound.volume = 0.2;
        lvlupSound.volume = 0.2;
        cafeSound.volume = 0.2;
        redbullSound.volume = 0.2;
        powerSound.volume = 0.2;
        resetSound.volume = 0.2;
    }
    soundEnabled = !soundEnabled; // Inversion de l'état du son
}

///PLEIN ECRAN
// Sélectionnez le bouton pour activer le mode plein écran
const fullscreenButton = document.getElementById('fullscreen-button');

// Écoutez l'événement click sur le bouton
fullscreenButton.addEventListener('click', toggleFullscreen);

// Fonction pour activer ou désactiver le mode plein écran
function fullScreen() {
    if (!document.fullscreenElement) {
      // Si le mode plein écran n'est pas activé, demandez-le
      document.documentElement.requestFullscreen();
    } else {
      // Si le mode plein écran est déjà activé, quittez-le
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
// Écoutez les événements de changement d'état du plein écran
document.addEventListener('fullscreenchange', updateFullscreenButton);

// Mettez à jour l'apparence du bouton en fonction de l'état du plein écran
function updateFullscreenButton() {
  if (document.fullscreenElement) {
    // Si le mode plein écran est activé, affichez un bouton pour quitter le plein écran
    fullscreenButton.textContent = 'Exit Fullscreen';
  } else {
    // Sinon, affichez un bouton pour activer le plein écran
    fullscreenButton.textContent = 'Fullscreen';
  }
}

function updateUI() {
    // Arrondir la valeur de gold à l'entier le plus proche avant de l'afficher
    document.getElementById("gold").textContent = Math.round(gold);

    // Mettre à jour le coût de l'amélioration du mineur
    document.getElementById("minerCost").textContent = Math.round(minerCost);
    
    // Mettre à jour les coûts des améliorations
    document.getElementById("cafeCost").textContent = Math.round(cafeCost);
    document.getElementById("redbullCost").textContent = Math.round(redbull);
    document.getElementById("dynamiteCost").textContent = Math.round(dynamite);
    
    // Mettre à jour l'interface du mineur
    updateMiners();
}
