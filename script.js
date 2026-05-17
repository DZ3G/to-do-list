// ========== VARIABLES GLOBALES ==========
let tasks = [];
let currentFilter = 'all';

// Éléments du DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const themeToggle = document.getElementById('themeToggle');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Charger les tâches depuis localStorage
    loadTasks();
    
    // Charger le thème sauvegardé
    loadTheme();
    
    // Mettre à jour l'affichage
    render();
    
    // Ajouter les écouteurs d'événements
    setupEventListeners();
});

// ========== ÉCOUTEURS D'ÉVÉNEMENTS ==========
function setupEventListeners() {
    // Ajouter une tâche au clic du bouton
    addBtn.addEventListener('click', addTask);
    
    // Ajouter une tâche à la pression d'Entrée
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Bouton mode sombre
    themeToggle.addEventListener('click', toggleTheme);
    
    // Bouton supprimer les complétées
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // Filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            render();
        });
    });
}

// ========== AJOUTER UNE TÂCHE ==========
function addTask() {
    const text = taskInput.value.trim();
    
    // Vérifier que l'input n'est pas vide
    if (text === '') {
        taskInput.focus();
        return;
    }
    
    // Créer un nouvel objet tâche
    const newTask = {
        id: Date.now(), // Utiliser le timestamp comme ID unique
        text: text,
        completed: false,
        createdAt: new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Ajouter la tâche au tableau
    tasks.unshift(newTask);
    
    // Vider l'input
    taskInput.value = '';
    taskInput.focus();
    
    // Sauvegarder et afficher
    saveTasks();
    render();
}

// ========== SUPPRIMER UNE TÂCHE ==========
function deleteTask(id) {
    // Trouver l'élément tâche
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    
    // Ajouter l'animation de suppression
    taskElement.classList.add('removing');
    
    // Attendre la fin de l'animation avant de supprimer
    setTimeout(() => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        render();
    }, 300);
}

// ========== BASCULER L'ÉTAT COMPLÉTÉ ==========
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        render();
    }
}

// ========== MODIFIER UNE TÂCHE ==========
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    const taskContent = taskElement.querySelector('.task-content');
    
    // Créer le formulaire d'édition
    const editHTML = `
        <input type="text" class="task-edit-input" value="${escapeHtml(task.text)}">
        <button class="btn-save">✓</button>
        <button class="btn-cancel">✕</button>
    `;
    
    // Entrer en mode édition
    taskElement.classList.add('edit-mode');
    taskContent.style.display = 'none';
    taskElement.querySelector('.task-actions').innerHTML = editHTML;
    
    // Récupérer les nouveaux boutons
    const saveBtn = taskElement.querySelector('.btn-save');
    const cancelBtn = taskElement.querySelector('.btn-cancel');
    const editInput = taskElement.querySelector('.task-edit-input');
    
    // Focus sur l'input et sélectionner tout le texte
    editInput.focus();
    editInput.select();
    
    // Fonction pour sauvegarder les modifications
    function saveChanges() {
        const newText = editInput.value.trim();
        if (newText !== '') {
            task.text = newText;
            saveTasks();
            render();
        }
    }
    
    // Sauvegarder au clic
    saveBtn.addEventListener('click', saveChanges);
    
    // Sauvegarder à la pression d'Entrée
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveChanges();
        }
    });
    
    // Annuler à la pression d'Échap ou clic sur Annuler
    cancelBtn.addEventListener('click', () => {
        render();
    });
    
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Escape') {
            render();
        }
    });
}

// ========== SUPPRIMER LES COMPLÉTÉES ==========
function clearCompleted() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les tâches terminées?')) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        render();
    }
}

// ========== FILTRER LES TÂCHES ==========
function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(t => t.completed);
        case 'active':
            return tasks.filter(t => !t.completed);
        default:
            return tasks;
    }
}

// ========== SAUVEGARDER LES TÂCHES ==========
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ========== CHARGER LES TÂCHES ==========
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}

// ========== GÉRER LE MODE SOMBRE ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Sauvegarder le préférence
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Changer l'icône
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

function loadTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

// ========== METTRE À JOUR L'AFFICHAGE ==========
function render() {
    const filteredTasks = getFilteredTasks();
    
    // Nettoyer la liste
    tasksList.innerHTML = '';
    
    // Afficher les tâches filtrées
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        filteredTasks.forEach(task => {
            tasksList.appendChild(createTaskElement(task));
        });
    }
    
    // Mettre à jour le compteur
    updateTaskCount();
    
    // Afficher/masquer le bouton supprimer les complétées
    const hasCompleted = tasks.some(t => t.completed);
    clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
}

// ========== CRÉER UN ÉLÉMENT TÂCHE ==========
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            aria-label="Marquer la tâche comme terminée"
        >
        <div class="task-content">
            <p class="task-text">${escapeHtml(task.text)}</p>
            <p class="task-date">📅 ${task.createdAt}</p>
        </div>
        <div class="task-actions">
            <button class="btn-edit" aria-label="Modifier la tâche">✏️ Éditer</button>
            <button class="btn-delete" aria-label="Supprimer la tâche">🗑️ Supprimer</button>
        </div>
    `;
    
    // Ajouter les écouteurs d'événements
    const checkbox = li.querySelector('.task-checkbox');
    const editBtn = li.querySelector('.btn-edit');
    const deleteBtn = li.querySelector('.btn-delete');
    
    checkbox.addEventListener('change', () => toggleTask(task.id));
    editBtn.addEventListener('click', () => editTask(task.id));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    return li;
}

// ========== METTRE À JOUR LE COMPTEUR ==========
function updateTaskCount() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    taskCount.textContent = activeTasks;
}

// ========== FONCTION UTILITAIRE : ÉCHAPPER LE HTML ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}