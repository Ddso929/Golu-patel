const photos = Array.from({length:10}, (_,i)=>`${i+1}.jpg`);
const messages = [
  "🎂 Advance Happy Birthday, my wife! You make my world brighter. ❤️",
  "🥹 Tumhari smile is literally my favourite thing in this world.",
  "💗 I hope tumhari every wish come true, meri jaan.",
  "🫶 Tumhare saath simple moments bhi special memories ban jaate hain.",
  "🤭 Haan haan, meri cute si moti… birthday girl ko extra pyaar milega!",
  "✨ You deserve happiness, success, peace and endless love.",
  "😂 Tumhari cute nautanki ke bina meri life boring hoti.",
  "👑 Today and always, you will be my queen, my favourite person.",
  "🥰 I may not be perfect with words, but my love for you is real.",
  "❤️ Happy Birthday in advance, baby. I love you more than you know!"
];

const cover = document.getElementById("cover");
const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const photo = document.getElementById("photo");
const message = document.getElementById("message");
const count = document.getElementById("count");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let index = 0;

function render(){
  photo.classList.add("fade");
  setTimeout(()=>{
    photo.src = photos[index];
    message.innerHTML = `${messages[index]}<span>💞 meri jaan</span>`;
    count.textContent = index + 1;
    photo.classList.remove("fade");
  },180);
}

function hearts(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = ["❤️","💗","💖","💕","🥹"][Math.floor(Math.random()*5)];
  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = (18 + Math.random()*18) + "px";
  h.style.animationDuration = (3.5 + Math.random()*3) + "s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),7000);
}

startBtn.addEventListener("click",()=>{
  bgMusic.volume = 0.35;
  bgMusic.play().catch(()=>{});
  musicBtn.textContent = "🔊 Music";
  cover.style.opacity = "0";
  cover.style.transition = "opacity .6s ease";
  setTimeout(()=>{
    cover.remove();
    app.classList.remove("hidden");
    render();
    setInterval(hearts,450);
  },600);
});

nextBtn.addEventListener("click",()=>{
  index = (index + 1) % photos.length;
  render();
});

render();


musicBtn.addEventListener("click", ()=>{
  if (bgMusic.paused) {
    bgMusic.play().catch(()=>{});
    musicBtn.textContent = "🔊 Music";
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🔇 Music";
  }
});


// Birthday countdown: 13 November 2026 (local time)
function updateCountdown(){
  const now = new Date();
  const birthday = new Date(now.getFullYear() < 2026 ? 2026 : now.getFullYear(), 10, 13, 0, 0, 0);
  const target = birthday.getTime() > now.getTime() ? birthday : new Date(now.getFullYear()+1, 10, 13, 0, 0, 0);
  let remaining = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000); remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  const markup = `<div class="time-unit"><strong>${days}</strong><span>Days</span></div><div class="time-unit"><strong>${hours}</strong><span>Hours</span></div><div class="time-unit"><strong>${minutes}</strong><span>Minutes</span></div><div class="time-unit"><strong>${seconds}</strong><span>Seconds</span></div>`;
  ['countdown','countdown-main'].forEach(id=>{const el=document.getElementById(id); if(el) el.innerHTML=markup;});
}
updateCountdown();
setInterval(updateCountdown, 1000);


// Cake cutting and colorful patakhe/fireworks celebration
const cakeScene = document.querySelector('.cake-scene');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const fireworksBtn = document.getElementById('fireworksBtn');
const cakeMessage = document.getElementById('cakeMessage');
const fireworksCanvas = document.getElementById('fireworks');
const fx = fireworksCanvas.getContext('2d');
let particles = [];
let fireworksFrame = null;
function resizeFireworks(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  fireworksCanvas.width = Math.floor(window.innerWidth * dpr);
  fireworksCanvas.height = Math.floor(window.innerHeight * dpr);
  fireworksCanvas.style.width = window.innerWidth + 'px';
  fireworksCanvas.style.height = window.innerHeight + 'px';
  fx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize', resizeFireworks);
resizeFireworks();
function burst(x, y){
  const colors = ['#ff4f91','#ffd166','#7afcff','#b68cff','#ffffff','#7dff9b','#ff8a45'];
  for(let i=0;i<95;i++){
    const angle = Math.random()*Math.PI*2;
    const speed = 1.4 + Math.random()*5.2;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:45+Math.random()*35,max:80,size:1.5+Math.random()*3,color:colors[Math.floor(Math.random()*colors.length)]});
  }
}
function animateFireworks(){
  fx.clearRect(0,0,window.innerWidth,window.innerHeight);
  particles = particles.filter(p=>p.life>0);
  for(const p of particles){
    p.x+=p.vx; p.y+=p.vy; p.vx*=.985; p.vy=p.vy*.985+.035; p.life--;
    fx.globalAlpha=Math.max(0,p.life/p.max);
    fx.fillStyle=p.color; fx.beginPath(); fx.arc(p.x,p.y,p.size,0,Math.PI*2); fx.fill();
  }
  fx.globalAlpha=1;
  if(particles.length){fireworksFrame=requestAnimationFrame(animateFireworks)}else{fx.clearRect(0,0,window.innerWidth,window.innerHeight);fireworksFrame=null;}
}
function celebrate(){
  if(fireworksFrame) cancelAnimationFrame(fireworksFrame);
  const w=window.innerWidth,h=window.innerHeight;
  burst(w*.22,h*.28); burst(w*.78,h*.25); burst(w*.5,h*.18);
  if(particles.length) animateFireworks();
  setTimeout(()=>{burst(w*.32,h*.4);burst(w*.7,h*.38);if(!fireworksFrame)animateFireworks();},420);
  setTimeout(()=>{burst(w*.5,h*.3);if(!fireworksFrame)animateFireworks();},850);
}
cutCakeBtn?.addEventListener('click',()=>{
  cakeScene.classList.add('cut');
  cakeMessage.textContent='Yayyy! 🎂 Cake cut ho gaya, my wife! A wish, a kiss & unlimited pyaar for you! ❤️😘';
  cutCakeBtn.textContent='🎂 Cake Cut Ho Gaya! ❤️';
  celebrate();
});
fireworksBtn?.addEventListener('click',()=>{
  cakeMessage.textContent='Boom boom! 🎆 Saare patakhe sirf meri birthday queen ke liye! 👑❤️';
  celebrate();
});
