const photos = ['first-meeting.jpg','hands-together.jpg','memory-collage.jpg','memory-frame.jpg','her-smile.jpg','hands-memory.jpg'];
const messages = [
  "🫠 Our first meeting — the day my favourite story began. ❤️",
  "🫶 Haath mein haath, aur dil mein tum. 💗",
  "🥹 Chhoti-chhoti memories, mere liye sabse precious. ❤️",
  "💞 Har photo mein ek alag si yaad chhupi hai.",
  "😍 Tumhari smile meri favourite feeling hai, meri jaan.",
  "❤️ These little moments with you mean everything to me."
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
    startSlideshow();
    setInterval(hearts,450);
  },600);
});

function nextSurprise(){
  index = (index + 1) % photos.length;
  render();
}

nextBtn.addEventListener("click", nextSurprise);

// Automatically slide to the next memory every 5 seconds.
let slideshowTimer = null;
function startSlideshow(){
  if (slideshowTimer) clearInterval(slideshowTimer);
  slideshowTimer = setInterval(nextSurprise, 5000);
}

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
  const firstCut = !cakeScene.classList.contains('cut');
  cakeScene.classList.add('cut');
  cakeMessage.textContent='Yayyy! 🎂 Cake cut ho gaya, my wife! Patakhe bhi tumhare liye! 🎆 A wish, a kiss & unlimited pyaar! ❤️😘';
  cutCakeBtn.textContent='🎂 Cake Cut Ho Gaya! ❤️';
  // Fireworks launch automatically the moment the cake is cut.
  if (firstCut) celebrate();
});
fireworksBtn?.addEventListener('click',()=>{
  cakeMessage.textContent='Boom boom! 🎆 Saare patakhe sirf meri birthday queen ke liye! 👑❤️';
  celebrate();
});


// Extra romantic surprises: gift welcome, typed love letter, and final message.
document.addEventListener('DOMContentLoaded', () => {
  const welcomeGift = document.getElementById('welcomeGift');
  const openGiftBtn = document.getElementById('openGiftBtn');
  if (welcomeGift && openGiftBtn) {
    openGiftBtn.addEventListener('click', () => {
      // Start the song on the visitor's tap (mobile browsers require a user gesture).
      const music = document.getElementById('bgMusic');
      const musicToggle = document.getElementById('musicBtn');
      if (music) { music.volume = 0.35; music.play().then(() => { if (musicToggle) musicToggle.textContent = '🔊 Music'; }).catch(() => {}); }
      welcomeGift.classList.add('hidden');
      // A little burst of hearts welcomes her into the birthday surprise.
      for (let i = 0; i < 34; i++) {
        const heart = document.createElement('span');
        heart.className = 'opening-heart';
        heart.textContent = ['❤️','💗','💖','💕','🫶🏻'][i % 5];
        heart.style.setProperty('--x', (Math.random() * 94) + 'vw');
        heart.style.setProperty('--size', (18 + Math.random() * 25) + 'px');
        heart.style.animationDelay = (Math.random() * 0.7) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3800);
      }
    });
  }

  const letter = document.getElementById('typedLetter');
  const letterSection = document.getElementById('loveLetterSection');
  const letterText = 'Meri jaan, ❤️\\nTum meri zindagi ki sabse pyaari feeling ho. Tumhari smile mere din ko khoobsurat bana deti hai. Hamari first meeting meri favorite memories mein se ek hai, aur main chahta hoon ki hum aise hi saath haste, ladte, manate aur har pal ko special banate rahein. Main perfect nahi hoon, par tumhe pyaar karne aur tumhara saath dene ki koshish hamesha dil se karunga. Happy Birthday, my love. 🫶🏻💗';
  if (letter && letterSection) {
    let started = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || started) return;
      started = true;
      letterSection.classList.remove('hidden');
      let i = 0;
      const timer = setInterval(() => {
        letter.textContent = letterText.slice(0, ++i);
        if (i >= letterText.length) clearInterval(timer);
      }, 32);
    }, {threshold: .15});
    // Make section reachable by revealing it once the user reaches the end.
    letterSection.classList.remove('hidden');
    observer.observe(letterSection);
  }

  const lastBtn = document.getElementById('lastSurpriseBtn');
  const lastText = document.getElementById('lastSurpriseText');
  if (lastBtn && lastText) {
    lastBtn.addEventListener('click', () => {
      lastText.textContent = 'Agar mujhe dobara zindagi jeene ka mauka mile, toh main har baar tumhe hi choose karunga. Happy Birthday, meri jaan. ❤️🫂';
      lastBtn.textContent = '💖 You are my forever';
      burstHearts();
    });
  }

  function burstHearts() {
    for (let i = 0; i < 28; i++) {
      const heart = document.createElement('span');
      heart.textContent = ['💗','💖','💕','❤️'][i % 4];
      heart.style.cssText = `position:fixed;z-index:9998;left:${Math.random()*100}vw;top:${55+Math.random()*35}vh;font-size:${18+Math.random()*22}px;pointer-events:none;transition:transform 1.8s ease,opacity 1.8s ease;`;
      document.body.appendChild(heart);
      requestAnimationFrame(() => { heart.style.transform = `translateY(-${100+Math.random()*250}px) rotate(${Math.random()*80-40}deg)`; heart.style.opacity = '0'; });
      setTimeout(() => heart.remove(), 1900);
    }
  }
});


// Interactive romantic features: reasons, letters, quiz, scratch gift, promise and finale.
document.addEventListener('DOMContentLoaded', () => {
  const reasons = [
    'Tumhari smile meri favourite hai. ❤️','Tumhare saath ordinary din bhi special lagta hai. 💗','Tum mujhe bina bole bhi samajh leti ho. 🫶🏻','Tumhari hasi mera mood theek kar deti hai. 😊','Tum meri favourite person ho. 👑','Tumhare saath future imagine karna beautiful lagta hai. ♾️','Tumhari chhoti-chhoti baatein yaad rehti hain. 🥹','Tum mere liye comfort ho. 🫂','Tumhare saath hasi-mazaak sabse best hai. 😂','Tum meri life mein pyaar laati ho. 🌷','Tumhari kindness mujhe inspire karti hai. 💞','Tumhare saath memories banana pasand hai. 📸','Tum meri best friend bhi ho. 💕','Tum mujhe better insaan banna yaad dilati ho. ✨','Tumhari presence se ghar jaisa feel hota hai. 🏡','Tumhara haath pakadna special lagta hai. 🤝','Tumhari khushi mere liye important hai. 💖','Tumhari aankhon mein apnapan dikhta hai. 🌙','Har din tumhe choose karunga. ❤️','Because you are simply YOU, meri jaan. 💗'
  ];
  let ri=0;
  const reasonText=document.getElementById('reasonText'), reasonCount=document.getElementById('reasonCount');
  document.getElementById('reasonBtn')?.addEventListener('click',()=>{ri=(ri+1)%reasons.length;if(reasonText)reasonText.textContent=reasons[ri];if(reasonCount)reasonCount.textContent=(ri+1)+' / '+reasons.length;});
  const letters={sad:'Meri jaan, agar aaj dil udaas hai toh yaad rakhna: tum akeli nahi ho. Main tumhari baat sunne, tumhe hug dene aur tumhare saath rehne ke liye hoon. Ek deep breath lo. I love you. 🫂❤️',miss:'Mujhe bhi tumhari yaad aati hai, baby. Jab bhi miss karo, yaad rakhna hamara pyaar distance se chhota nahi hota. Sending you the biggest virtual hug. 💗🫶🏻',smile:'Ek chhoti si reminder: tum bahut special ho, tumhari smile beautiful hai, aur tum deserve karti ho duniya ki saari khushiyan. Ab ek cute si smile do, meri queen! 😊👑'};
  document.querySelectorAll('[data-letter]').forEach(btn=>btn.addEventListener('click',()=>{const out=document.getElementById('openWhenText');if(out)out.textContent=letters[btn.dataset.letter]||'';}));
  document.querySelectorAll('[data-correct]').forEach(btn=>btn.addEventListener('click',()=>{const out=document.getElementById('quizResult');if(out)out.textContent=btn.dataset.correct==='true'?'Correct! 👑❤️ Meri queen hi meri duniya hai! You win unlimited kisses and hugs. 😘🫂':'Hehe, wrong answer baby! 😂 Try again — hint: she is reading this website right now. 💗';}));
  document.getElementById('scratchBtn')?.addEventListener('click',e=>{const b=e.currentTarget;b.classList.add('revealed');b.textContent='💖 SECRET GIFT UNLOCKED 💖';const out=document.getElementById('scratchMessage');if(out)out.textContent='Your gift is my promise: main tumhe pyaar, respect aur care dene ki koshish har din karta rahunga. Happy Birthday, My Queen! 👑❤️';});
  document.getElementById('heartBtn')?.addEventListener('click',()=>{const out=document.getElementById('heartMessage');if(out)out.textContent='Dhadkan meri, naam tumhara. ❤️💓';for(let i=0;i<18;i++)makePetal('❤️');});
  document.getElementById('promiseBtn')?.addEventListener('click',()=>{const out=document.getElementById('promiseMessage');if(out)out.textContent='Promise sealed with all my love. ♾️❤️ Hamesha ek team, ek saath.';for(let i=0;i<22;i++)makePetal('💗');});
  document.getElementById('grandFinaleBtn')?.addEventListener('click',()=>{const out=document.getElementById('grandFinaleMessage');if(out)out.textContent='Make a wish, my queen! ✨ May your life be full of love, health, laughter and happiness. I love you forever. ❤️🎆';if(typeof celebrate==='function')celebrate();for(let i=0;i<40;i++)makePetal(['❤️','💖','✨','🌹'][i%4]);});
  function makePetal(symbol){const el=document.createElement('span');el.className='petal';el.textContent=symbol;el.style.left=(Math.random()*100)+'vw';el.style.fontSize=(16+Math.random()*18)+'px';el.style.animationDuration=(4+Math.random()*4)+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),8500);}
  // Gentle rose-petal shower after the main surprise has opened.
  document.getElementById('openGiftBtn')?.addEventListener('click',()=>{for(let i=0;i<20;i++)setTimeout(()=>makePetal(['🌹','💗','🌸'][i%3]),i*90);});
});


// Extra 50 mini-surprises: each card reveals a personal message.
document.addEventListener('DOMContentLoaded',()=>{
 const reveal=document.getElementById('bonusReveal');
 document.querySelectorAll('.mini-surprise').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('.mini-surprise.opened').forEach(x=>x.classList.remove('opened'));
   btn.classList.add('opened');
   if(reveal){reveal.textContent=btn.dataset.message||'You are loved, meri jaan. ❤️';reveal.classList.remove('pop');void reveal.offsetWidth;reveal.classList.add('pop');}
 }));
 document.getElementById('bonusHeartsBtn')?.addEventListener('click',()=>{for(let i=0;i<36;i++){setTimeout(()=>{const el=document.createElement('span');el.className='petal';el.textContent=['💖','❤️','💕','✨','🌹'][i%5];el.style.left=(Math.random()*100)+'vw';el.style.fontSize=(18+Math.random()*20)+'px';el.style.animationDuration=(4+Math.random()*3)+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),8000);},i*55);}});
});
