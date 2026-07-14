chrome.runtime.onInstalled.addListener(() => {
    console.log("DeveloperHub Installed Successfully");
});

chrome.commands.onCommand.addListener((command) => {
    console.log(command);
});