herelet mode="";
let xp=0,level=1;

function startApp(){
  document.getElementById("startScreen").style.display="none";
  document.getElementById("app").style.display="block";
}

function setMode(m){
  mode=m;
  document.getElementById("buttons").innerHTML="";
  document.getElementById("canvasBox").innerHTML="";

  if(m==="3d"){
    document.getElementById("buttons").innerHTML=`
    <input id="w" placeholder="Width">
    <input id="h" placeholder="Height">
    <input id="d" placeholder="Depth">
    <button onclick="drawCube()">Draw Cube</button>
    `;
  }

  if(m==="atoms"){
    startAtoms();
  }

  if(m==="puzzle"){
    generatePuzzle();
  }
}

/* ================= XP ================= */
function addXP(val){
  xp+=val;
  if(xp>=100){
    level++;
    xp=0;
  }
  document.getElementById("xp").innerText=`XP: ${xp} | Level: ${level}`;
}

/* ================= CALCULATE ================= */
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

/* ================= 3D ================= */
function drawCube(){
  let w=parseFloat(document.getElementById("w").value)||1;
  let h=parseFloat(document.getElementById("h").value)||1;
  let d=parseFloat(document.getElementById("d").value)||1;

  let volume=w*h*d;
  let area=2*(w*h+w*d+h*d);

  document.getElementById("result").innerText=
  `Volume: ${volume} | Area: ${area}`;

  let canvas=document.createElement("canvas");
  document.getElementById("canvasBox").appendChild(canvas);

  let ctx=canvas.getContext("2d");
  ctx.fillStyle="white";
  ctx.fillRect(50,50,100,100);
}

/* ================= ATOMS ================= */
function startAtoms(){
  let canvas=document.createElement("canvas");
  document.getElementById("canvasBox").appendChild(canvas);

  let ctx=canvas.getContext("2d");
  let atoms=[];

  for(let i=0;i<50;i++){
    atoms.push({x:Math.random()*300,y:Math.random()*200,vx:1,vy:1});
  }

  let speed=1;

  canvas.onmousemove=(e)=>{
    speed=3;
  }

  function animate(){
    ctx.clearRect(0,0,300,200);
    atoms.forEach(a=>{
      a.x+=a.vx*speed;
      a.y+=a.vy*speed;

      if(a.x<0||a.x>300)a.vx*=-1;
      if(a.y<0||a.y>200)a.vy*=-1;

      ctx.fillRect(a.x,a.y,3,3);
    });

    speed*=0.95;
    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= PUZZLE ================= */
function generatePuzzle(){
  let a=Math.floor(Math.random()*10);
  let b=Math.floor(Math.random()*10);
  let ans=a+b;

  let options=[ans,ans+1,ans-1,ans+2].sort(()=>Math.random()-0.5);

  let html=`<p>${a} + ${b} = ?</p>`;

  options.forEach(o=>{
    html+=`<button onclick="checkAns(${o},${ans})">${o}</button>`;
  });

  document.getElementById("buttons").innerHTML=html;
}

function checkAns(o,ans){
  if(o===ans){
    document.getElementById("result").innerText="Correct!";
    addXP(20);
  }else{
    document.getElementById("result").innerText="Wrong!";
  }
}
