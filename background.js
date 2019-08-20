function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'TODO: Add %s to your list!'
    })
}

// chrome.windows.onCreated.addListener(function () {
//     chrome.windows.getAll(function (windows) {
//         if (windows.length == 1) {
//             getData();
//         }
//     });
// });

resetDefaultSuggestion();
