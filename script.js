herelet mode="";
let xp=0,level=1;

/* تغيير الوضع */
function setMode(m){
mode=m;
document.getElementById("controls").innerHTML="";
document.getElementById("canvas").innerHTML="";

/* 3D */
if(m==="3d"){
document.getElementById("controls").innerHTML=`
<input id="size" placeholder="Size">
<button onclick="draw3D()">Draw Cube</button>
`;
}

/* atoms */
if(m==="atoms"){
atoms();
}

/* puzzle */
if(m==="puzzle"){
puzzle();
}
}

/* XP */
function addXP(v){
if(v<=0) return;
xp+=v;
if(xp>=100){
level++;
xp=0;
}
document.getElementById("xp").innerText=`XP: ${xp} | Level: ${level}`;
}

/* حساب */
function calculate(){
let input=document.getElementById("input").value;
if(!input) return;

try{
let res=eval(input.replace(/×/g,"*").replace(/÷/g,"/"));
document.getElementById("result").innerText=res;
addXP(10);
}catch{
document.getElementById("result").innerText="Error";
}
}

/* 3D */
function draw3D(){
let size=parseFloat(document.getElementById("size").value)||1;

let canvasDiv=document.getElementById("canvas");
canvasDiv.innerHTML="";

let scene=new THREE.Scene();
let camera=new THREE.PerspectiveCamera(75,1,0.1,1000);

let renderer=new THREE.WebGLRenderer();
renderer.setSize(300,300);
canvasDiv.appendChild(renderer.domElement);

let geo=new THREE.BoxGeometry(size,size,size);
let mat=new THREE.MeshNormalMaterial();
let cube=new THREE.Mesh(geo,mat);

scene.add(cube);
camera.position.z=5;

let volume=size*size*size;
document.getElementById("result").innerText="Volume: "+volume;

function animate(){
requestAnimationFrame(animate);
cube.rotation.x+=0.01;
cube.rotation.y+=0.01;
renderer.render(scene,camera);
}
animate();
}

/* atoms */
function atoms(){
let canvas=document.createElement("canvas");
canvas.width=300;
canvas.height=200;

document.getElementById("canvas").appendChild(canvas);

let ctx=canvas.getContext("2d");

let arr=[];
for(let i=0;i<60;i++){
arr.push({
x:Math.random()*300,
y:Math.random()*200,
vx:1,
vy:1
});
}

let speed=1;

canvas.onmousemove=()=>speed=4;

function loop(){
ctx.clearRect(0,0,300,200);

arr.forEach(a=>{
a.x+=a.vx*speed;
a.y+=a.vy*speed;

if(a.x<0||a.x>300)a.vx*=-1;
if(a.y<0||a.y>200)a.vy*=-1;

ctx.fillStyle="white";
ctx.fillRect(a.x,a.y,2,2);
});

speed*=0.95;
requestAnimationFrame(loop);
}

loop();
}

/* puzzle */
function puzzle(){
let a=Math.floor(Math.random()*10);
let b=Math.floor(Math.random()*10);

let ans=a+b;

let options=[ans,ans+1,ans-1,ans+2]
.sort(()=>Math.random()-0.5);

let html=`<h3>${a}+${b}=?</h3>`;

options.forEach(o=>{
html+=`<button onclick="check(${o},${ans})">${o}</button>`;
});

document.getElementById("controls").innerHTML=html;
}

function check(o,ans){
if(o===ans){
document.getElementById("result").innerText="Correct";
addXP(20);
}else{
document.getElementById("result").innerText="Wrong";
}
}
