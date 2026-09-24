const boardEl=document.getElementById("board");
const scoreEl=document.getElementById("score"),levelEl=document.getElementById("level"),linesEl=document.getElementById("lines");
const nextPreview=document.getElementById("nextPreview"),message=document.getElementById("gameMessage"),finalScore=document.getElementById("finalScore");
const pieces=[
  {shape:[[1,1,1,1]],color:"#18b9ff"},
  {shape:[[1,1],[1,1]],color:"#ffc126"},
  {shape:[[0,1,0],[1,1,1]],color:"#a45cff"},
  {shape:[[1,0,0],[1,1,1]],color:"#ff9f43"},
  {shape:[[0,0,1],[1,1,1]],color:"#4f7cff"},
  {shape:[[0,1,1],[1,1,0]],color:"#42d86f"},
  {shape:[[1,1,0],[0,1,1]],color:"#ff5b68"}
];
const W=10,H=20;
let grid=[],piece,nextPiece,score=0,lines=0,level=1,dropTimer=null,paused=false,gameOver=false;

function newGrid(){return Array.from({length:H},()=>Array(W).fill(null))}
function copyShape(s){return s.map(r=>r.slice())}
function randomPiece(){
  const p=pieces[Math.floor(Math.random()*pieces.length)];
  return {shape:copyShape(p.shape),color:p.color,x:Math.floor((W-p.shape[0].length)/2),y:0}
}
function render(){
  boardEl.innerHTML="";
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const c=document.createElement("div");c.className="cell";
    if(grid[y][x]){c.classList.add("filled");c.style.background=grid[y][x]}
    boardEl.appendChild(c);
  }
  if(piece){
    piece.shape.forEach((row,dy)=>row.forEach((v,dx)=>{
      if(v){
        const x=piece.x+dx,y=piece.y+dy;
        if(y>=0&&y<H&&x>=0&&x<W){
          const c=boardEl.children[y*W+x];c.classList.add("filled");c.style.background=piece.color;
        }
      }
    }));
  }
  scoreEl.textContent=score;linesEl.textContent=lines;levelEl.textContent=level;
  drawNext();
}
function collision(p,ox=0,oy=0){
  return p.shape.some((row,dy)=>row.some((v,dx)=>{
    if(!v)return false;
    const x=p.x+dx+ox,y=p.y+dy+oy;
    return x<0||x>=W||y>=H||(y>=0&&grid[y][x]);
  }));
}
function lock(){
  piece.shape.forEach((row,dy)=>row.forEach((v,dx)=>{
    if(v&&piece.y+dy>=0)grid[piece.y+dy][piece.x+dx]=piece.color;
  }));
  clearLines();
  piece=nextPiece;nextPiece=randomPiece();
  if(collision(piece)){endGame();return}
  resetTimer();render();
}
function clearLines(){
  let cleared=0;
  grid=grid.filter(row=>{if(row.every(Boolean)){cleared++;return false}return true});
  while(grid.length<H)grid.unshift(Array(W).fill(null));
  if(cleared){lines+=cleared;score += [0,100,300,500,800][cleared]*level;level=1+Math.floor(lines/10)}
}
function move(dx){
  if(!paused&&!gameOver&&!collision(piece,dx,0)){piece.x+=dx;render()}
}
function softDrop(){
  if(paused||gameOver)return;
  if(!collision(piece,0,1)){piece.y++;score+=1;render()}else lock();
}
function hardDrop(){
  if(paused||gameOver)return;
  while(!collision(piece,0,1)){piece.y++;score+=2}
  lock();
}
function rotate(){
  if(paused||gameOver)return;
  const old=piece.shape;
  const rotated=old[0].map((_,i)=>old.map(r=>r[i]).reverse());
  piece.shape=rotated;
  if(collision(piece)){piece.shape=old}else render();
}
function resetTimer(){
  clearInterval(dropTimer);
  dropTimer=setInterval(softDrop,Math.max(120,700-(level-1)*55));
}
function startGame(){
  grid=newGrid();score=0;lines=0;level=1;paused=false;gameOver=false;
  message.classList.add("hidden");piece=randomPiece();nextPiece=randomPiece();resetTimer();render();
}
function endGame(){
  gameOver=true;clearInterval(dropTimer);finalScore.textContent=score;message.classList.remove("hidden");
  const best=Number(localStorage.getItem("blockfallBest")||0);
  if(score>best){localStorage.setItem("blockfallBest",score);document.getElementById("bestScore").textContent=score}
}
function drawNext(){
  nextPreview.innerHTML="";
  const s=nextPiece?.shape||[[1]];
  const color=nextPiece?.color||"#fff";
  const max=4;
  for(let y=0;y<max;y++)for(let x=0;x<max;x++){
    const d=document.createElement("div");
    const v=s[y]?.[x];
    if(v){d.className="preview-cell";d.style.background=color}
    nextPreview.appendChild(d);
  }
}
function togglePause(){
  if(gameOver)return;
  paused=!paused;document.getElementById("pauseBtn").textContent=paused?"▶ Resume":"Ⅱ Pause";
}
document.addEventListener("keydown",e=>{
  if(!document.getElementById("game").getBoundingClientRect().top) return;
  if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].includes(e.key))e.preventDefault();
  if(e.key==="ArrowLeft")move(-1);
  if(e.key==="ArrowRight")move(1);
  if(e.key==="ArrowUp")rotate();
  if(e.key==="ArrowDown")softDrop();
  if(e.key===" ")hardDrop();
});
document.querySelectorAll(".controls button[data-key]").forEach(b=>b.addEventListener("click",()=>({ArrowLeft:()=>move(-1),ArrowRight:()=>move(1),ArrowUp:rotate,ArrowDown:softDrop}[b.dataset.key])()));
document.getElementById("pauseBtn").addEventListener("click",togglePause);
document.getElementById("restartBtn").addEventListener("click",startGame);
document.getElementById("playAgain").addEventListener("click",startGame);
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.go).scrollIntoView()));
document.getElementById("bestScore").textContent=localStorage.getItem("blockfallBest")||0;
startGame();
