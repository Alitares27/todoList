document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('todo-input');
    const task = input.value.trim();

    if (task) {
        const li = document.createElement('li');
        li.className = 'task-row';
        li.setAttribute('draggable', 'true'); // Habilita el arrastre

        const span = document.createElement('span');
        span.textContent = task;
        span.className = 'task-text';

        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.className = 'check-btn';
        checkBtn.addEventListener('click', () => {
            span.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(checkBtn);
        li.appendChild(deleteBtn);

        document.getElementById('todo-list').appendChild(li);
        input.value = '';
    }
});

let draggedItem = null;

document.getElementById('todo-list').addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'LI') {
        draggedItem = e.target;
        e.target.classList.add('dragging');
    }
});

document.getElementById('todo-list').addEventListener('dragend', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.remove('dragging');
    }
});

document.getElementById('todo-list').addEventListener('dragover', function (e) {
    e.preventDefault();
});

document.getElementById('todo-list').addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.target.tagName === 'LI' && draggedItem !== e.target) {
        const list = document.getElementById('todo-list');
        const children = Array.from(list.children);
        const draggedIndex = children.indexOf(draggedItem);
        const targetIndex = children.indexOf(e.target);

        if (draggedIndex < targetIndex) {
            list.insertBefore(draggedItem, e.target.nextSibling);
        } else {
            list.insertBefore(draggedItem, e.target);
        }
    }
});
