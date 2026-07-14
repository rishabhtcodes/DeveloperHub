chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 DeveloperHub Installed");

    chrome.storage.local.set({
        favoriteWebsites: [],
        recentWebsites: [],
        notes: [],
        todos: [],
        planner: [],
        settings: {
            theme: "dark",
            shortcut: "Ctrl+Shift+Space"
        }
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log("🚀 DeveloperHub Started");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    switch (request.action) {

        case "OPEN_URL":

            chrome.tabs.create({
                url: request.url
            });

            sendResponse({
                success: true
            });

            break;

        case "GET_STORAGE":

            chrome.storage.local.get(null, (data) => {

                sendResponse(data);

            });

            return true;

        case "SAVE_STORAGE":

            chrome.storage.local.set(request.data, () => {

                sendResponse({
                    success: true
                });

            });

            return true;

        default:

            sendResponse({
                success: false
            });

    }

});