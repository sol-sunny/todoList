let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);

taskInput.addEventListener("focus", function () {
    taskInput.value = "";
});

taskInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        taskContent: taskInput.value,
        isComplete: false,
        id: randomIDGenerate()
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHtml = "";
    let list = [];
    if (mode == "all") {
        list = taskList;
    } else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHtml += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
        } else {
            resultHtml += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    //render();
    filter();
}

function filter(event) {
    filterList = [];
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
            event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    if (mode == "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}