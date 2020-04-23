//Event on button click to change theme
window.addEventListener('load', function load(event) {
    ['dark','white','gradient'].forEach(function(color) {
        document.getElementById(color).onclick = function() {
            changeTheme(color);
        };
    });

    chrome.storage.local.get('todo_theme', function(data){
        if(data !== null){
            changeTheme(data.todo_theme);
        }
        else{
            chrome.local.set({'todo_theme': white});
        }
    });

    //Sync the data from the older session and display it in Tasks
    chrome.storage.local.get('todo_data', function(data) {
        if(Object.keys(data).length > 0){
            let length = data.todo_data.length;
            let list = [];
            for(let i =0; i < length; i++){
                let obj = data.todo_data[i];
                list.push(obj.text);
                
            }

            addToTaskList(list);
        }
    });

    //Sync the data from the older session and display it in Completed
    chrome.storage.local.get('todo_comp', function(data) {
        if(Object.keys(data).length > 0) {
            let length = data.todo_comp.length;
            let list = [];
            for(let i =0; i < length; i++){
                let obj = data.todo_comp[i];
                list.push(obj.text);
                
            }

            addToCompList(list);
        }
    });
});

//This triggers when a users enters the task in the address bar on Chrome
chrome.omnibox.onInputEntered.addListener(function(text){
    let data = [];
    data.push(text);
    addToTaskList(data);
    saveData(text);
})

//Save the data to the local storage
function saveData(text) {
    chrome.storage.local.get({'todo_data': []}, function(result){
        let todo_data = result.todo_data;
        todo_data.push({text: text, HasBeenUploadedYet: false});

        chrome.storage.local.set({'todo_data': todo_data});
    });
}

//Add Item to Task List
function addToTaskList(data){
    for(let i = 0; i < data.length; i++){
        var task = $("<div class='task'></div>").text(data[i]);

        var del = trashIcon();
        var check = checkIcon();
        
        task.append(del,check);
        $(".notcomp").append(task);
    }
}

//Add item to Completed List
function addToCompList(data){
    for(let i = 0; i < data.length; i++){
        var task = $("<div class='task'></div>").text(data[i]);

        var del = trashIcon();
        
        task.append(del);
        $(".comp").append(task);
    }
}

//delete the task on trash icon click
function trashIcon() {
    var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
        var p = $(this).parent();
        var pparent = p.parent();
        var text =p[0].innerText;
        p.fadeOut(function(){
            if(pparent[0].id === "comp"){
                if(removeItem(text, true) === true){
                    p.remove();
                }
            }
            else{
                if(removeItem(text) === true){
                    p.remove();
                }
            }
        });
    });
    return del;
}

// Move the task to completed on check click
function checkIcon() { 
    var check = $("<i class='fas fa-check'></i>").click(function() {
        var p = $(this).parent();
        var text =p[0].innerText;
        p.fadeOut(function(){
            $(".comp").append(p);
            addToCompleted(text);
            p.fadeIn();
        });
        $(this).remove();
    });
    return check;
}

//Add item to completed storage list
function addToCompleted(text){
    chrome.storage.local.get({'todo_comp': []}, function(result){
        let todo_comp = result.todo_comp;
        todo_comp.push({text: text, HasBeenUploadedYet: false});

        chrome.storage.local.set({'todo_comp': todo_comp});
    });

    removeItem(text, false);
}

//Remove item from the chrome storage
function removeItem(text, completed=false){
    chrome.storage.local.get('todo_data', function(result){
        let todo_data = result.todo_data;
        let length = todo_data.length;
        for(let i=0; i < length; i++){
            let data = (todo_data[i].text).trim();
            if(data === text.trim()){
                todo_data.splice(i,1);
                break;
            }
            else{
                continue;
            }
        }
        chrome.storage.local.set({'todo_data': todo_data});
        return true;
    });

    if(completed == true) {
        chrome.storage.local.get('todo_comp', function(result){
            let todo_comp = result.todo_comp;
            for(let i=0; i < todo_comp.length; i++){
                let data = (todo_comp[i].text).trim();
                if(data === text.trim()){
                    todo_comp.splice(i,1);
                    break;
                }
            }
            chrome.storage.local.set({'todo_comp': todo_comp});
            return true;
        });
    }

    return false;
}

//Function to change the theme of the page
function changeTheme(str) {
    chrome.storage.local.set({'todo_theme': str});
    if(str === "dark"){
        document.documentElement.setAttribute("data-theme", "dark"); 
    }
    else if(str === "gradient"){
        document.documentElement.setAttribute("data-theme", "gradient");
    }
    else{
        document.documentElement.setAttribute("data-theme", "white"); 
    } 
}