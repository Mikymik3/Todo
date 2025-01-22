import "./style.css";

// Références
const ulElement = document.querySelector("ul");
const form = document.querySelector("form"); // Référence au formulaire
const input = document.querySelector("input[type='text']"); // Référence au champ texte

// Tableau des tâches
const todos = [
  { text: "je suis une todo", done: false, editMode: false },
  { text: "faire du javascript", done: true, editMode: false },
];

// Fonction pour créer un élément de todo
function createTodoElement(todo, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.classList.add("todo");
  if (todo.done) {
    span.classList.add("done");
  }

  // if (todo.editMode) {
  //   const editInput = document.createElement("input");
  // } else {
  const paragraph = document.createElement("p");
  paragraph.textContent = todo.text;
  // }

  // Créer le bouton "editer"
  const editButton = document.createElement("button");
  editButton.textContent = "Edition";
  
  // Créer le bouton "Supprimer"
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";

  // Empêcher la propagation de l'événement clic
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche l'exécution du gestionnaire du <li>
    deleteTodo(index); // Supprime la tâche
  });
  
    // Empêcher la propagation de l'événement clic
    editButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche l'exécution du gestionnaire du <li>
      toggleEditMode(index); // mode edition de la tâche
    });
  // Ajouter un gestionnaire d'événement pour le clic sur <li>
  li.addEventListener("click", () => toggleTodo(index)); // Inverse "done" au clic

  // Ajouter les éléments au <li>
    li.appendChild(span);
    li.appendChild(paragraph);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  
  return li;
}

// Fonction pour afficher les todos
function displayTodo() {
  ulElement.innerHTML = ""; // Réinitialiser la liste
  
  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    ulElement.appendChild(todoElement);
  });
}

// Fonction pour ajouter une tâche
function addTodo(text) {
  if (text.trim() === "") return; // Ne rien faire si le champ est vide

  todos.push({ text: text.trim(), done: false });
  displayTodo();
}

// Fonction pour supprimer une tâche
function deleteTodo(index) {
    todos.splice(index, 1); // Supprime 1 élément à l'index donné
    displayTodo(); // Réaffiche les todos
  }
  
  // Fonction pour inverser le statut d'une tâche
  function toggleTodo(index) {
    todos[index].done = !todos[index].done; // Inverse la valeur de "done"
    displayTodo(); // Réaffiche les todos pour refléter les changements
  }
  
  //Fonction pour inverser le statut editMode d'une tâche
  function toggleEditMode(index) {
    todos[index].editMode = !todos[index].editMode; // Inverse la valeur de "editMode"
    displayTodo(); // Réaffiche les todos suite au changement
  }

  //Fonction changer la tâche avec les nouvelles valeurs
  function editTodo(index, text) {
    todos[index].text = text;
    todos[index].editMode = false;
    displayTodo();
  }

  // Fonction d'édition de tâche
  function createTodoEditElement(todo, index) {
    
    li.appendChild(editInput);
    return li;
  }
    
    // Écouteur d'événement sur le formulaire
    form.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page
  addTodo(input.value); // Ajouter la tâche avec le texte saisi
  input.value = ""; // Réinitialiser le champ texte
});

// Afficher les todos au chargement
document.addEventListener("DOMContentLoaded", displayTodo);
