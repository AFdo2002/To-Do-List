const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");
const feedbackMessage = document.getElementById("feedback-message");

let taskCounter = 0;
let editingTask = null;

function updateTaskCount() {
  taskCount.innerText = `You have ${taskCounter} task${
    taskCounter !== 1 ? "s" : ""
  } to complete.`;
}

function showFeedbackMessage(message) {
  feedbackMessage.innerText = message;
  setTimeout(() => {
    feedbackMessage.innerText = "";
  }, 2500);
}

function AddTask() {
  if (inputBox.value == "") {
    showFeedbackMessage("Please enter a task!");
  } else {
    if (editingTask) {
      editingTask.querySelector(".task-text").textContent = inputBox.value;
      editingTask = null;
    } else {
      let li = document.createElement("li");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      let taskText = document.createElement("span");
      taskText.classList.add("task-text");
      taskText.textContent = inputBox.value;

      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskCounter--;
          taskText.classList.add("strikethrough");
        } else {
          taskCounter++;
          taskText.classList.remove("strikethrough");
        }
        updateTaskCount();
      });

      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash");
      deleteIcon.onclick = function () {
        if (!checkbox.checked) {
          taskCounter--;
          updateTaskCount();
        }
        li.classList.add("fade-out");
        setTimeout(() => {
          li.remove();
        }, 500);
      };

      let editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square");

      editIcon.onclick = function () {
        inputBox.value = taskText.textContent;
        editingTask = li;
      };

      li.appendChild(checkbox);

      li.appendChild(taskText);

      li.appendChild(editIcon);

      li.appendChild(deleteIcon);

      listContainer.appendChild(li);

      taskCounter++;
      updateTaskCount();
    }
  }

  inputBox.value = "";
}

window.addEventListener("resize", function () {
  const inputBox = document.getElementById("input-box");
  if (window.innerWidth < 768) {
    inputBox.placeholder = "Enter tasks";
  } else {
    inputBox.placeholder = "Enter the tasks you need to complete.";
  }
});

window.dispatchEvent(new Event("resize"));

function formatDateTime() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date();
  const date = now.toLocaleDateString("en-US", options);
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${date} - ${time}`;

  document.getElementById("date-time").textContent = formattedDateTime;
}

formatDateTime();

setInterval(formatDateTime, 60000);

setInterval(() => {
  const now = new Date();

  document.getElementById("date-time").textContent = `${
    document.getElementById("date-time").textContent.split(" - ")[0]
  } - ${now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
}, 1000);
