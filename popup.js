const websites = [

{
name:"ChatGPT",
url:"https://chatgpt.com"
},

{
name:"GitHub",
url:"https://github.com"
},

{
name:"YouTube",
url:"https://youtube.com"
}

];

const container=document.getElementById("websites");

websites.forEach(site=>{

const button=document.createElement("button");

button.innerText=site.name;

button.onclick=()=>{

chrome.tabs.create({

url:site.url

});

};

container.appendChild(button);

});