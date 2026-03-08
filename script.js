let issues = [];

function login(){
let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user==="admin" && pass==="admin123"){
document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";
loadIssues();
}else{
alert("Wrong username or password");
}
}

// Load issues from API
async function loadIssues(){
document.getElementById("loader").style.display="block";
let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
let data = await res.json();
issues = data.data;
displayIssues(issues);
document.getElementById("loader").style.display="none";
}

// Display issues as cards
function displayIssues(data){
let container = document.getElementById("issueContainer");
container.innerHTML="";
data.forEach(issue=>{
let card = document.createElement("div");
card.classList.add("issue-card");
if(issue.status==="closed") card.classList.add("closed");

// Card HTML for Figma style
card.innerHTML = `
<div class="card-top">
<div class="status-icon ${issue.status}">
${issue.status==="open"?"🟢":"🟣"}
</div>
<span class="priority ${issue.priority.toLowerCase()}">
${issue.priority}
</span>
</div>
<h3 class="issue-title">${issue.title}</h3>
<p class="issue-desc">${issue.description}</p>
<div class="labels">
<span class="label bug">BUG</span>
<span class="label help">HELP WANTED</span>
<span class="label enhancement">ENHANCEMENT</span>
</div>
<div class="issue-footer">
<p>#${issue.id} by ${issue.author}</p>
<p>${issue.createdAt}</p>
</div>
`;

card.onclick = ()=> openModal(issue);
container.appendChild(card);
});
}

// Tabs
const tabs = document.querySelectorAll(".tabs button");
tabs.forEach(btn=>{
btn.addEventListener("click",()=>{
tabs.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
let text=btn.innerText;
if(text==="All") displayIssues(issues);
if(text==="Open") displayIssues(issues.filter(i=>i.status==="open"));
if(text==="Closed") displayIssues(issues.filter(i=>i.status==="closed"));
});
});

// Search
document.getElementById("searchInput").addEventListener("keyup",async function(){
let text=this.value;
let res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
let data=await res.json();
displayIssues(data.data);
});

// Modal
function openModal(issue){
document.getElementById("issueModal").style.display="flex";
document.getElementById("modalTitle").innerText=issue.title;
document.getElementById("modalDesc").innerText=issue.description;
document.getElementById("modalAuthor").innerText=issue.author;
document.getElementById("modalPriority").innerText=issue.priority;
document.getElementById("modalStatus").innerText=issue.status;
document.getElementById("modalDate").innerText=issue.createdAt;
}
function closeModal(){
document.getElementById("issueModal").style.display="none";
}