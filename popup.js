const aiTools = [
    {
        name: "ChatGPT",
        url: "https://chatgpt.com",
        description: "AI Assistant"
    },
    {
        name: "Gemini",
        url: "https://gemini.google.com",
        description: "Google AI"
    },
    {
        name: "Claude",
        url: "https://claude.ai",
        description: "Anthropic AI"
    },
    {
        name: "Perplexity",
        url: "https://www.perplexity.ai",
        description: "AI Search"
    }
];

const devTools = [
    {
        name: "GitHub",
        url: "https://github.com",
        description: "Repositories"
    },
    {
        name: "StackOverflow",
        url: "https://stackoverflow.com",
        description: "Developer Community"
    },
    {
        name: "Vercel",
        url: "https://vercel.com",
        description: "Deployment"
    },
    {
        name: "Render",
        url: "https://render.com",
        description: "Cloud Hosting"
    }
];

const favorites = [
    {
        name: "YouTube",
        url: "https://youtube.com",
        description: "Videos"
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com",
        description: "Professional"
    }
];

function createCards(list, containerId){

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    list.forEach(item=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        card.addEventListener("click",()=>{

            chrome.tabs.create({

                url:item.url

            });

        });

        container.appendChild(card);

    });

}

createCards(aiTools,"aiGrid");
createCards(devTools,"devGrid");
createCards(favorites,"favoriteGrid");

const search=document.getElementById("searchInput");

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card=>{

        if(card.innerText.toLowerCase().includes(value))

            card.style.display="block";

        else

            card.style.display="none";

    });

});

const note=document.getElementById("quickNote");

chrome.storage.local.get(["note"],(result)=>{

    if(result.note){

        note.value=result.note;

    }

});

note.addEventListener("keyup",()=>{

    chrome.storage.local.set({

        note:note.value

    });

});

const todoInput=document.getElementById("todoInput");

const todoList=document.getElementById("todoList");

let todos=[];

chrome.storage.local.get(["todos"],(result)=>{

    if(result.todos){

        todos=result.todos;

        renderTodos();

    }

});

function renderTodos(){

    todoList.innerHTML="";

    todos.forEach((todo,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`

            ${todo}

            <button data-id="${index}" class="deleteTodo">

            ❌

            </button>

        `;

        todoList.appendChild(li);

    });

    document.querySelectorAll(".deleteTodo").forEach(button=>{

        button.onclick=()=>{

            const id=button.dataset.id;

            todos.splice(id,1);

            chrome.storage.local.set({

                todos

            });

            renderTodos();

        };

    });

}

document.getElementById("addTodo").addEventListener("click",()=>{

    if(todoInput.value.trim()==="")

        return;

    todos.push(todoInput.value);

    chrome.storage.local.set({

        todos

    });

    todoInput.value="";

    renderTodos();

});

document.getElementById("savePlanner").addEventListener("click",()=>{

    const date=document.getElementById("plannerDate").value;

    const task=document.getElementById("plannerTask").value;

    chrome.storage.local.set({

        planner:{

            date,

            task

        }

    });

    alert("Planner Saved");

});

chrome.storage.local.get(["planner"],(result)=>{

    if(result.planner){

        document.getElementById("plannerDate").value=result.planner.date;

        document.getElementById("plannerTask").value=result.planner.task;

    }

});

document.getElementById("themeBtn").addEventListener("click",()=>{

    document.body.classList.toggle("light");

});

document.getElementById("settingsBtn").addEventListener("click",()=>{

    alert("Settings Page Coming Soon");

});