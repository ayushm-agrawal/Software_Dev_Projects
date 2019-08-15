function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'TODO: Add %s to your list!'
    })
}

resetDefaultSuggestion();


chrome.windows.onCreated.addListener(function() {
    chrome.windows.getAll(function(windows) {
        if (windows.length == 1) {
            getData();
        }
    });
});

function getData(){
    chrome.storage.local.get('todo_data', function(data) {
        console.log("Fetched TO-DO data!");
        console.log(data.todo_data);
    });
}