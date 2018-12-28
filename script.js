// Declaring DOM objects
const task = document.querySelector(".new-task");
const tasks = document.querySelector("#tasks");
const addBtn = document.querySelector(".bg-aquamarine");
const clearBtn = document.querySelector(".btn-dark");
const filter = document.querySelector(".filter-task");
// Declaring variables
let counter = 0;
let i = 0;
let storedTasks;

// Initializing Local Storage
if (localStorage.getItem("Tasks") == null) {
	storedTasks = [];
} else {
	storedTasks = JSON.parse(localStorage.getItem("Tasks"));
	storedTasks.forEach(Task => {
		counter += 1;
		let t = document.createElement("li");
		t.setAttribute("class", `list-group-item item-${counter}`);
		t.textContent = Task;
		const deleteButton = document.createElement("a");
		const cross = document.createElement("i");
		deleteButton.setAttribute("href", "#");
		cross.setAttribute("class", "fas fa-times");
		cross.setAttribute("style", "color:red; float:right");
		tasks.appendChild(t);
		t.appendChild(deleteButton);
		deleteButton.appendChild(cross);
		deleteList(counter);
	});
}

// Adding a task to the list and to local storage
addBtn.addEventListener("click", e => {
	e.preventDefault();
	if (task.value !== "") {
		counter += 1;
		const newTask = document.createElement("li");
		newTask.setAttribute("class", `list-group-item item-${counter}`);
		storedTasks.push(task.value);
		localStorage.setItem("Tasks", JSON.stringify(storedTasks));
		newTask.textContent = task.value;
		const deleteButton = document.createElement("a");
		const cross = document.createElement("i");
		deleteButton.setAttribute("href", "#");
		cross.setAttribute("class", "fas fa-times");
		cross.setAttribute("style", "color:red; float:right");
		tasks.appendChild(newTask);
		newTask.appendChild(deleteButton);
		deleteButton.appendChild(cross);
		task.value = "";
		deleteList(counter);
		const listOfTasks = document.querySelectorAll(".list-group-item");
		filter.addEventListener("input", e => {
			e.preventDefault;
			console.log(listOfTasks);
			for (let j = 0; j < listOfTasks.length; j++) {
				listOfTasks[j].style.display = "none";
				console.log(listOfTasks[j]);
				console.log(filter.value);
				if (listOfTasks[j].textContent.includes(filter.value)) {
					listOfTasks[j].style.display = "block";
				}
			}
		});
	}
});

// Prevent enter key from submitting clear tasks form
filter.onkeypress = function(e) {
	var key = e.charCode || e.keyCode || 0;
	if (key == 13) {
		e.preventDefault();
	}
};
// Clear all tasks
clearBtn.addEventListener("click", e => {
	e.preventDefault();
	localStorage.clear();
	const clear = document.getElementsByClassName("list-group-item");
	while (clear.length > 0) {
		for (var li of clear) {
			li.remove();
		}
	}
});
// Remove a task from local storage
function removeFromStorage(s) {
	let r = localStorage.getItem("Tasks");
	r = JSON.parse(r);
	let i = r.indexOf(s);
	console.log(i);
	r.splice(i, 1);
	console.log(r);
	r = JSON.stringify(r);
	localStorage.setItem("Tasks", r);
}

// Delete a task from the list
function deleteList(c) {
	const taskDel = document.querySelector(`.item-${c}`);
	taskDel.firstElementChild.addEventListener("click", () => {
		if (confirm("Are you sure?")) {
			taskDel.remove();
			console.log(taskDel.textContent);
			removeFromStorage(taskDel.textContent);
		}
	});
}
