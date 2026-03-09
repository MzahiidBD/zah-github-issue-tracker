let issues=[];

function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;
if(u==="admin" && p==="admin123"){
document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";
loadIssues();
}else{
alert("Wrong credentials");
}
}

async function loadIssues(){
document.getElementById("loader").style.display="block";
let res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
let data=await res.json();
issues=data.data;
displayIssues(issues);
document.getElementById("loader").style.display="none";
}
function updateCount(data){
document.getElementById("issueCount").innerText=data.length+" Issues";
}
function displayIssues(data){
updateCount(data);

let container=document.getElementById("issueContainer");

container.innerHTML="";
data.forEach(issue=>{
let card=document.createElement("div");
card.classList.add("issue-card");

let status=issue.status.toLowerCase();
if(status==="closed") card.classList.add("closed");

let icon=status==="open"
? "assets/Open-Status.png"
: "assets/Closed-Status.png";

card.innerHTML=`
<div class="card-top">
<img src="${icon}" class="card-icon">
<span class="priority ${issue.priority.toLowerCase()}">${issue.priority}</span>
</div>
<h3 class="issue-title">${issue.title}</h3>
<p class="issue-desc">${issue.description}</p>
<div>
<span class="label bug">BUG</span>
<span class="label help">HELP WANTED</span>
</div>
<p style="margin-top:10px;font-size:12px;color:#777">
#${issue.id} by ${issue.author}<br>
${issue.createdAt}
</p>
`;

card.onclick=()=>openModal(issue);
container.appendChild(card);
});
}

/* TABS */

document.querySelectorAll(".tabs button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll(".tabs button")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
let t=btn.innerText.trim();
if(t==="All"){
displayIssues(issues);
}
if(t==="Open"){
displayIssues(
issues.filter(i=>i.status.toLowerCase()==="open")
);
}
if(t==="Closed"){
displayIssues(
issues.filter(i=>i.status.toLowerCase()==="closed")
);
}
};
});

/* SEARCH */

document.getElementById("searchInput")
.addEventListener("keyup",async function(){

let text=this.value;
let res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);
let data=await res.json();
displayIssues(data.data);
});

/* MODAL */

function openModal(issue){
document.getElementById("issueModal").style.display="flex";
document.getElementById("modalTitle").innerText=issue.title;
document.getElementById("modalDesc").innerText=issue.description;
document.getElementById("modalAuthor").innerText=issue.author;
document.getElementById("modalDate").innerText=issue.createdAt;
document.getElementById("modalAssignee").innerText=issue.author;
let p=document.getElementById("modalPriority");
p.innerText=issue.priority;
p.className="priority "+issue.priority.toLowerCase();
document.getElementById("modalStatus").innerText=issue.status;
}

function closeModal(){
document.getElementById("issueModal").style.display="none";
}