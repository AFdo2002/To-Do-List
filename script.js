const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");
const feedbackMessage = document.getElementById("feedback-message"); // Add a reference to the feedback message element

let taskCounter = 0;
let editingTask = null; // Variable to track the task being edited

function updateTaskCount() {
    taskCount.innerText = `You have ${taskCounter} task${taskCounter !== 1 ? 's' : ''} to be done.`;
}

function showFeedbackMessage(message) {
    feedbackMessage.innerText = message; // Set the text content of the feedback message
    setTimeout(() => {
        feedbackMessage.innerText = ""; // Clear the message after a certain time period (e.g., 3 seconds)
    }, 2500); // Adjust the time period as needed (in milliseconds)
}

function AddTask() {
    if (inputBox.value == "") {
        showFeedbackMessage("Please enter a task!"); // Show feedback message under the input box
    } else {
        if (editingTask) {
            // Update the task text of the existing task being edited
            editingTask.querySelector('.task-text').textContent = inputBox.value;
            editingTask = null; // Clear the editingTask reference
        } else {
            // Create a new list item element
            let li = document.createElement("li");

            // Create a checkbox element
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            // Create the task text span element
            let taskText = document.createElement("span");
            taskText.classList.add('task-text');
            taskText.textContent = inputBox.value;

            // Add a change event listener to the checkbox to update the task count and strike out the task text
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    taskCounter--;
                    taskText.classList.add('strikethrough');
                } else {
                    taskCounter++;
                    taskText.classList.remove('strikethrough');
                }
                updateTaskCount();
            });

            let deleteIcon = document.createElement("i");
            deleteIcon.classList.add('fa-solid', 'fa-trash');
            deleteIcon.onclick = function() {
                if (!checkbox.checked) {
                    taskCounter--;
                    updateTaskCount();
                }
                li.classList.add('fade-out'); // Add fade-out class to trigger animation
                setTimeout(() => {
                    li.remove(); // Remove the element from the DOM after the animation
                }, 500); // Match the timeout to the duration of the CSS transition
            };

            // Create the edit icon element
            let editIcon = document.createElement("i");
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');

            // Add a click event listener to the edit icon to edit the task
            editIcon.onclick = function() {
                inputBox.value = taskText.textContent;
                editingTask = li; // Set the current task as the one being edited
            };

            // Append the checkbox to the list item
            li.appendChild(checkbox);

            // Append the task text to the list item
            li.appendChild(taskText);

            // Append the edit icon to the list item
            li.appendChild(editIcon);

            // Append the delete icon to the list item
            li.appendChild(deleteIcon);

            // Append the list item to the container
            listContainer.appendChild(li);

            // Increment the task counter and update the display
            taskCounter++;
            updateTaskCount();
        }

        
    }
    // Clear the input box
    inputBox.value = "";
}
