const container = document.querySelector('.container');

const renderTasks = (data) => {
  let html = '';
  data.forEach((task) => {
    html += `
    <div class="task">
      <h2>${task.task}</h2>
      <p>Status: ${task.status}</p>
      <p>Priority: ${task.priority}</p>
      <p>Deadline: ${task.deadline}</p>
    </div>
    `;
  });
  container.innerHTML = html;
};

async function init() {
  const data = await asyncJson('json/dev.json');
  renderTasks(data);
}

init();