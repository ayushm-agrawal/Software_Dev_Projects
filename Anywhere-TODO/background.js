function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'TODO: Add %s to your list!'
    })
}

chrome.omnibox.onInputEntered.addListener(function(text){
    chrome.storage.local.get({'todo_data': []}, function(result){
        let todo_data = result.todo_data;
        todo_data.push({text: text, HasBeenUploadedYet: false});

        chrome.storage.local.set({'todo_data': todo_data});
    });
})

resetDefaultSuggestion();
