//Event on button click to change theme
window.addEventListener('load', function load(event) {
    ['dark','white','gradient'].forEach(function(color) {
        document.getElementById(color).onclick = function() {
            changeTheme(color);
        };
    });

    chrome.storage.local.get('todo_data', function(data) {
        console.log("Fetched TO-DO data!");
        console.log(data.todo_data[0]);
        let length = data.todo_data.length;
        let list = [];
        for(let i =0; i < length; i++){
            let obj = data.todo_data[i];
            // console.log("OBJ: ", obj.text);
            list.push(obj.text);
            
        }

        console.log(list);

        addToList(list);
    });
});


chrome.omnibox.onInputEntered.addListener(function(text){
    let data = [];
    data.push(text);
    addToList(data);
    saveData(text);
})

//Save the data to the local storage
function saveData(text) {
    chrome.storage.local.get({"todo_data": []}, function(result){
        let todo_data = result.todo_data;
        todo_data.push({text: text, HasBeenUploadedYet: false});

        chrome.storage.local.set({'todo_data': todo_data}, function (){
            chrome.storage.local.get('todo_data', function (result) {
                console.log("this: ?" , result.todo_data);
            });
        }); 
    });
}

//Add to list button click
function addToList(data){
    let ul = document.getElementById("todo-ul");
    for(let i = 0; i < data.length; i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
    }
}

//Function to change the theme of the page
function changeTheme(str) {
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