/* ---------- CONSTANTS ---------- */
const UPDATE_ALLOWED_COLUMNS = ['backlog', 'todo'];

/* ---------- STATE ---------- */
let draggedCard = null;
let editingCard = null;

/* ---------- ELEMENTS ---------- */
const columns = document.querySelectorAll('.column');
const cards = document.querySelectorAll('.card');

const addTaskBtn = document.querySelector('#add-column-btn');

const modalOverlay = document.querySelector('#modal-overlay');
const addTaskForm = document.querySelector('#add-task-form');
const cancelBtn = document.querySelector('#cancel-btn');
const modalTitle = modalOverlay.querySelector('h2');
const modalSubmitBtn = modalOverlay.querySelector('.btn-submit');

/* ---------- INITIALIZE EXISTING CARDS ---------- */
cards.forEach(card => attachDragEvents(card));

/* ---------- DRAG LOGIC ---------- */
function attachDragEvents(card) {
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    draggedCard = null;
    card.classList.remove('dragging');
  });
}

/* ---------- COLUMN EVENTS ---------- */
columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault();
    column.classList.add('drag-over');
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over');
  });

  column.addEventListener('drop', () => {
    column.classList.remove('drag-over');
    if (!draggedCard) return;

    column.appendChild(draggedCard);
    updateCardButtons(draggedCard, column.id);
  });
});

/* ---------- BUTTON VISIBILITY ---------- */
function updateCardButtons(card, columnId) {
  const actions = card.querySelector('.card-actions');
  if (!actions) return;

  let updateBtn = actions.querySelector('.update');
  const needsUpdate = UPDATE_ALLOWED_COLUMNS.includes(columnId);

  if (needsUpdate && !updateBtn) {
    updateBtn = document.createElement('button');
    updateBtn.className = 'update';
    updateBtn.textContent = 'Update';
    actions.prepend(updateBtn);
  }

  if (!needsUpdate && updateBtn) {
    updateBtn.remove();
  }
}

/* ---------- EVENT DELEGATION (BUTTONS) ---------- */
document.addEventListener('click', e => {
  const updateBtn = e.target.closest('.update');
  const deleteBtn = e.target.closest('.delete');

  if (updateBtn) {
    const card = updateBtn.closest('.card');
    openEditModal(card);
  }

  if (deleteBtn) {
    const card = deleteBtn.closest('.card');
    if (confirm('Are you sure you want to delete this task?')) {
      card.remove();
    }
  }
});

/* ---------- MODAL HELPERS ---------- */
function openEditModal(card) {
  editingCard = card;

  document.querySelector('#task-title').value =
    card.querySelector('h3').textContent;

  document.querySelector('#task-desc').value =
    card.querySelector('p').textContent;

  modalTitle.textContent = 'Edit Task';
  modalSubmitBtn.textContent = 'Save Changes';
  modalOverlay.classList.remove('hidden');
}

function openAddModal() {
  editingCard = null;
  addTaskForm.reset();
  modalTitle.textContent = 'Add New Task';
  modalSubmitBtn.textContent = 'Add Task';
  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  addTaskForm.reset();
}

/* ---------- MODAL EVENTS ---------- */
addTaskBtn.addEventListener('click', openAddModal);

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

/* ---------- FORM SUBMIT ---------- */
addTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.querySelector('#task-title').value.trim();
  const desc = document.querySelector('#task-desc').value.trim();

  if (!title) return;

  if (editingCard) {
    // UPDATE CARD
    editingCard.querySelector('h3').textContent = title;
    editingCard.querySelector('p').textContent = desc;
  } else {
    // CREATE CARD
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.draggable = true;

    newCard.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="card-actions">
        <button class="update">Update</button>
        <button class="delete">Delete</button>
      </div>
    `;

    attachDragEvents(newCard);
    document.querySelector('#todo').appendChild(newCard);
  }

  closeModal();
});
