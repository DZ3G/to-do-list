# 📝 My Tasks - Application de Gestion de Tâches

## 🎯 C'est quoi ce projet ?

**My Tasks** est une application web moderne pour gérer vos tâches quotidiennes. C'est comme un bloc-notes numérique mais plus intelligent : vous pouvez ajouter des tâches, les cocher quand elles sont terminées, les modifier, les filtrer... et tout se sauvegarde automatiquement!

Ce projet a été créé par un étudiant en **Terminale STI2D SIN** (option Système d'Information et Numérique) pour apprendre les bases du développement web.

---

## ✨ Fonctionnalités principales

### 📌 Gestion des tâches
- ➕ **Ajouter** une nouvelle tâche (cliquez sur le bouton ou appuyez sur Entrée)
- ✏️ **Modifier** une tâche existante
- ✅ **Cocher** une tâche pour la marquer comme terminée
- 🗑️ **Supprimer** une tâche

### 🎛️ Filtres
- 📋 **Toutes** : Voir toutes vos tâches
- ⚙️ **En cours** : Voir seulement celles qui ne sont pas terminées
- ✅ **Terminées** : Voir seulement vos tâches complétées

### 🌙 Mode sombre
- Activez le mode sombre pour une meilleure expérience la nuit
- Votre préférence se sauvegarde automatiquement

### 💾 Sauvegarde automatique
- Vos tâches ne disparaissent jamais, même si vous fermez votre navigateur
- Les données sont sauvegardées localement dans votre ordinateur

### 📅 Dates de création
- Chaque tâche affiche la date et l'heure de sa création

### 📊 Compteur de tâches
- Voyez en un coup d'œil combien de tâches vous reste à faire

### 🎨 Design responsive
- L'application fonctionne parfaitement sur **ordinateur**, **tablette** et **téléphone**

---

## 🚀 Comment utiliser ?

### 1️⃣ Ouvrir l'application
- Téléchargez les 3 fichiers : `index.html`, `style.css` et `script.js`
- Placez-les dans le même dossier
- Double-cliquez sur `index.html` pour ouvrir dans votre navigateur

### 2️⃣ Ajouter une tâche
```
1. Tapez votre tâche dans le champ de texte
2. Cliquez sur "Ajouter" ou appuyez sur Entrée
3. Voilà! La tâche apparaît dans la liste
```

### 3️⃣ Cocher une tâche comme terminée
- Cliquez sur la case à cocher (☑️) à côté de la tâche
- La tâche devient grisée et apparaît barrée

### 4️⃣ Modifier une tâche
- Cliquez sur le bouton "✏️ Éditer"
- Modifiez le texte
- Cliquez sur "✓" pour sauvegarder ou "✕" pour annuler

### 5️⃣ Supprimer une tâche
- Cliquez sur le bouton "🗑️ Supprimer"
- La tâche disparaît avec une belle animation

### 6️⃣ Filtrer vos tâches
- Cliquez sur les boutons de filtre
- "Toutes", "En cours" ou "Terminées"

### 7️⃣ Activer le mode sombre
- Cliquez sur le bouton 🌙/☀️ en haut à droite
- L'application devient sombre (idéal pour la nuit!)

### 8️⃣ Supprimer les tâches terminées
- Un bouton "Supprimer les tâches terminées" apparaît si vous avez des tâches complétées
- Cliquez dessus pour les nettoyer (attention: confirmez avant!)

---

## 🛠️ Comprendre la structure technique

### 3 fichiers = 3 rôles

#### 📄 **index.html** - La structure
C'est la **fondation** de l'application, comme les murs d'une maison.

```html
<input id="taskInput" class="task-input" placeholder="Ajouter une tâche...">
<button id="addBtn" class="btn-add">Ajouter</button>
<ul id="tasksList"></ul>
```

- **`<input>`** : Champ de texte
- **`<button>`** : Bouton cliquable
- **`<ul>`** : Liste (les tâches vont ici)
- **`id="..."`** : Étiquette pour trouver l'élément en JavaScript

#### 🎨 **style.css** - L'apparence
C'est la **décoration** et le design, comme la peinture d'une maison.

```css
.title {
    font-size: 2.5rem;
    color: #ffffff;
}
```

- Couleurs, polices, animations
- Adapte aussi l'affichage pour mobile
- Les variables CSS (`--color-primary`) permettent de réutiliser les mêmes couleurs partout

#### ⚙️ **script.js** - Le fonctionnement
C'est le **cerveau** de l'application, comme l'électricité d'une maison.

```javascript
function addTask() {
    const text = taskInput.value;
    tasks.unshift({id: Date.now(), text: text, completed: false});
    saveTasks();
    render();
}
```

- Récupère ce que vous tapez
- Crée une nouvelle tâche
- Sauvegarde dans `localStorage`
- Redessine l'affichage

---

## 💡 Concepts clés expliqués simplement

### 📦 **Tableau (Array)**
```javascript
let tasks = [];  // Un panier vide
tasks.unshift({text: "Faire les courses"});  // Ajouter au début
tasks = tasks.filter(t => !t.completed);  // Garder seulement les actives
```
Pensez à un panier : vous pouvez ajouter, enlever, ou filtrer les objets.

### 💾 **localStorage**
```javascript
localStorage.setItem('tasks', JSON.stringify(tasks));  // Sauvegarder
const saved = localStorage.getItem('tasks');  // Récupérer
```
C'est comme une petite "boîte de mémoire" dans votre navigateur. Les données y restent même quand vous fermez.

### 🎯 **Écouteurs d'événements (Event Listeners)**
```javascript
addBtn.addEventListener('click', addTask);  // Écouter les clics
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();  // Si c'est Entrée, ajouter
});
```
C'est comme dire : "Navigateur, regarde si je clique, et si je le fais, fais ça!"

### 🔄 **Rendu (Rendering)**
```javascript
function render() {
    tasksList.innerHTML = '';  // Vider l'écran
    tasks.forEach(task => {  // Pour chaque tâche
        tasksList.appendChild(createTaskElement(task));  // La dessiner
    });
}
```
C'est le moment où on redessine toute l'interface après chaque action.

### 🌐 **DOM (Document Object Model)**
Le DOM c'est la représentation de la page HTML en JavaScript.
```javascript
const element = document.getElementById('taskInput');  // Trouver un élément
element.value = '';  // Changer sa valeur
element.classList.add('active');  // Ajouter une classe CSS
```
C'est comme une télécommande pour contrôler la page!

---

## 🎓 Améliorations possibles pour apprendre

### 1️⃣ **Ajouter des catégories**
Groupez vos tâches par type (travail, école, maison, etc.)

### 2️⃣ **Ajouter des priorités**
Marquez les tâches comme : Important ⚡ ou Peu urgent 🟢

### 3️⃣ **Ajouter des sous-tâches**
Divisez une grosse tâche en petites étapes

### 4️⃣ **Ajouter des rappels**
Recevez une notification avant une deadline

### 5️⃣ **Exporter les tâches**
Sauvegardez vos tâches en PDF ou CSV

### 6️⃣ **Partager une liste**
Utilisez une base de données pour partager avec d'autres

### 7️⃣ **Ajouter des statistiques**
Voyez combien de tâches vous avez complétées par jour/semaine

### 8️⃣ **Intégrer une API**
Connectez-vous avec Google Calendar, Trello, etc.

---

## 🔧 Technos utilisées

| Tech | Rôle | Pourquoi ? |
|------|------|----------|
| **HTML5** | Structure | Standard web moderne |
| **CSS3** | Style & Animations | Design fluide et responsive |
| **JavaScript Vanilla** | Logique | Sans framework (pur JS!) |
| **localStorage API** | Sauvegarde | Données persistantes |
| **CSS Grid/Flexbox** | Mise en page | Responsive et moderne |

**Aucun framework!** ➜ Code pur et léger, parfait pour apprendre les bases.

---

## 📱 Responsive Design

L'application fonctionne sur 3 tailles d'écran :

```
🖥️  ORDINATEUR (>768px)  : Affichage complet, côte à côte
📱 TABLETTE (768px-480px) : Mise en page ajustée
📲 TÉLÉPHONE (<480px)    : Affichage optimisé mobile
```

Cela se fait avec **CSS Media Queries** :
```css
@media (max-width: 768px) {
    .title { font-size: 2rem; }  /* Plus petit sur mobile */
}
```

---

## 🎨 Design & UX

### Couleurs principales
- 🔵 **Bleu primaire** : Boutons et accents (`#3b82f6`)
- ✅ **Vert succès** : Boutons de confirmation (`#10b981`)
- ❌ **Rouge erreur** : Boutons de suppression (`#ef4444`)
- ⭐ **Gris texte** : Texte secondaire (`#64748b`)

### Animations
- ✨ **Slide Down** : En-tête qui glisse vers le bas
- 📍 **Slide In Left** : Tâches qui arrivent par la gauche
- 📤 **Slide Out Right** : Tâches qui partent à droite
- 🎯 **Hover Effects** : Légers décalages au survol

---

## 🐛 Débogage & Conseils

### Si l'app ne fonctionne pas :

1. **Vérifiez la console** (F12 → Onglet "Console")
   - Cherchez les messages d'erreur rouges

2. **Vérifiez localStorage**
   - Dans DevTools → Application → localStorage
   - Regardez les tâches sauvegardées

3. **Videz le cache**
   - Ctrl+Shift+Suppr (ou Cmd+Shift+Suppr sur Mac)
   - Réchargez la page (F5)

### Raccourcis utiles :
| Raccourci | Effet |
|-----------|-------|
| **Entrée** | Ajouter une tâche |
| **Échap** | Annuler l'édition |
| **Tab** | Naviguer entre les boutons |
| **F12** | Ouvrir les DevTools |

---

## 📚 Ressources pour approfondir

### Apprendre HTML
- [MDN HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- Comprendre la structure des pages

### Apprendre CSS
- [MDN CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- Flexbox et Grid pour le responsive

### Apprendre JavaScript
- [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- DOM, Events, Arrays, Objects

### Pratiquer en ligne
- [CodePen](https://codepen.io) : Partager du code
- [JSFiddle](https://jsfiddle.net) : Tester rapidement
- [Replit](https://replit.com) : IDE en ligne

---

## 👨‍💻 Notes pour les STI2D SIN

### Pourquoi ce projet est important ?

1. **Vraie application** : Elle fonctionne réellement
2. **Sans framework** : Vous comprenez les bases
3. **Responsive** : Utile pour tous les appareils
4. **Persistance** : Vraie donnée (localStorage)
5. **UX moderne** : Animations et design professionnel

### Concepts STI2D couverts :

- ✅ **Algorithmique** : Fonctions, boucles, conditions
- ✅ **Programmation orientée données** : Tableaux, objets
- ✅ **Interface homme-machine** : Design responsive, UX
- ✅ **Stockage persistant** : localStorage (mini-base de données)
- ✅ **Architecture logicielle** : Séparation HTML/CSS/JS

### Pour améliorer votre note :

1. **Ajoutez des commentaires détaillés** dans le code
2. **Créez une documentation technique** (ce README!)
3. **Testez sur plusieurs appareils**
4. **Implémentez une amélioration** (voir section ci-dessus)
5. **Faites des captures d'écran** avant/après

---

## 📄 Licence

Ce projet est libre d'utilisation à des fins éducatives. Vous pouvez le modifier et l'améliorer!

---

## 💬 Questions fréquentes

### **Q: Où mes tâches sont-elles sauvegardées ?**
A: Dans `localStorage` du navigateur, sur votre ordinateur local. Pas de serveur, pas de cloud.

### **Q: Si je vide mon cache, mes tâches disparaissent ?**
A: Oui, malheureusement. C'est pour ça qu'on pourrait ajouter une vraie base de données plus tard.

### **Q: Je peux utiliser ça sur mon téléphone ?**
A: Oui! Ouvrez juste le HTML dans votre navigateur mobile. Ou installez l'app comme Progressive Web App (PWA).

### **Q: Comment ajouter une vrai base de données ?**
A: Apprenez Node.js et une base de données (MongoDB, PostgreSQL). Ensuite, connectez-y votre front-end!

### **Q: Je peux vendre cette app ?**
A: Oui, c'est votre code! Mais en l'état, c'est un MVP (Minimum Viable Product). Il faudrait l'améliorer.

---

**Créé avec 💚 par un étudiant STI2D SIN en apprentissage**

*Dernière mise à jour : 17 Mai 2026*