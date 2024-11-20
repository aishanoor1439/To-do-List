const inputSection = document.getElementById("input-section");
const listContainer = document.getElementById("list-container");

function addTask() {
    console.log("Add button clicked");
    
    if (inputSection.value === '') {
        alert("Write something!");
    } else {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        
        let label = document.createElement("label");
        label.className = "form-check-label d-flex align-items-center";
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input mr-2";
        
        checkbox.addEventListener("change", saveData);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(inputSection.value));

        let closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "btn btn-close";
        closeButton.innerHTML = '<span class="bi bi-x"></span>';
        closeButton.ariaLabel = "Close";
        
        closeButton.addEventListener("click", function() {
            listContainer.removeChild(li);
            saveData();
        });

        li.appendChild(label);
        li.appendChild(closeButton);
        listContainer.appendChild(li);
        
        inputSection.value = '';
        saveData();
    }
}

function saveData() {
    const listItems = listContainer.querySelectorAll("li");
    const tasks = [];

    listItems.forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const text = item.querySelector("label").innerText;
        tasks.push({
            text: text,
            checked: checkbox.checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displaySavedData() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            let li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            
            let label = document.createElement("label");
            label.className = "form-check-label d-flex align-items-center";
            
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input me-2";
            checkbox.checked = task.checked;
            
            checkbox.addEventListener("change", saveData);

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(task.text));

            let closeButton = document.createElement("button");
            closeButton.type = "button";
            closeButton.className = "btn btn-close";
            closeButton.innerHTML = '<span class="bi bi-x"></span>';
            closeButton.ariaLabel = "Close";
            
            closeButton.addEventListener("click", function() {
                listContainer.removeChild(li);
                saveData();
            });

            li.appendChild(label);
            li.appendChild(closeButton);
            listContainer.appendChild(li);
        });
    }
}

displaySavedData();
