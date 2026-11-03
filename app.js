
const list = document.getElementById('list');
const input = document.getElementById('text');
const form = document.getElementById('form');
const message = document.getElementById('message');

let tasks = [];

try {
  const saved = JSON.parse(localStorage.getItem('practice-tasks') || '[]');
  if (Array.isArray(saved)) {
    tasks = saved.filter(x => typeof x === 'string');
  }
} catch {}

function save() {
  localStorage.setItem('practice-tasks', JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();

  tasks.forEach((text, index) => {
    const row = document.createElement('li');
    row.textContent = text;

    const button = document.createElement('button');
    button.textContent = 'Delete';

    button.onclick = () => {
      tasks.splice(index, 1);
      save();
      render();
    };

    row.append(button);
    list.append(row);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();

  const text = input.value.trim();

  if (!text) {
    message.textContent = 'Please enter a task.';
    return;
  }

  tasks.push(text);
  save();
  render();

  input.value = '';
  message.textContent = 'Task added successfully.';
};

render();
