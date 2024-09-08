// Select elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCategory = document.getElementById('taskCategory');
const congratulationsMessage = document.getElementById('congratulationsMessage');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.className = 'task-item'; // Add a class for styling
        listItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            taskList.removeChild(listItem);
            saveTasks();
            completeTask();
        };

        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);

        taskInput.value = '';
        saveTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        tasks.push(item.textContent.replace('X', '').trim());
    });
    localStorage.setItem(taskCategory.value + 'Tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(taskCategory.value + 'Tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const listItem = document.createElement('li');
            listItem.className = 'task-item'; // Add a class for styling
            listItem.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                taskList.removeChild(listItem);
                saveTasks();
                completeTask();
            };

            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);
        });
    }
}

// Function to show congratulations message
function completeTask() {
    congratulationsMessage.classList.remove('hidden');
    setTimeout(() => {
        congratulationsMessage.classList.add('hidden');
    }, 3500);
}

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listeners
addTaskBtn.addEventListener('click', addTask);
taskCategory.addEventListener('change', () => {
    taskList.innerHTML = '';
    loadTasks();
});

// Review Slider
let currentReview = 0;
const reviews = document.querySelectorAll('.review');
reviews[currentReview].style.display = 'block';

setInterval(() => {
    reviews[currentReview].style.display = 'none';
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].style.display = 'block';
}, 3000);

// Handle review form submissions
const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userReview = document.getElementById('userReview').value;
    const newReview = `"${userReview}" - ${userName}`;
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.textContent = newReview;
    document.getElementById('reviewSlider').appendChild(reviewElement);
    reviewForm.reset();
});

// Handle contact form submissions
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
    contactForm.reset();
});
