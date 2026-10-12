(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

/* ---------- background sparkles ---------- */
const sp=$('#sparkles');
for(let i=0;i<40;i++){const d=document.createElement('i');d.className='sparkle';
  d.style.left=Math.random()*100+'%';d.style.top=Math.random()*100+'%';
  d.style.setProperty('--d',(3+Math.random()*5)+'s');d.style.animationDelay=(Math.random()*5)+'s';sp.appendChild(d);}

/* ---------- petals ---------- */
function petals(n,set){set=set||['🌸','💗','🌹','✨','💖'];
  for(let i=0;i<n;i++)setTimeout(()=>{const p=document.createElement('span');p.className='petal';
    p.textContent=set[i%set.length];p.style.left=Math.random()*100+'vw';p.style.fontSize=(14+Math.random()*18)+'px';
    p.style.animationDuration=(4+Math.random()*4)+'s';document.body.appendChild(p);setTimeout(()=>p.remove(),9000);},i*70);}

/* ---------- fireworks ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let parts=[],raf=null;
function size(){const r=Math.min(devicePixelRatio||1,2);cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0);}
addEventListener('resize',size);size();
function burst(x,y){const c=['#ff6b9a','#f7dfa8','#e9c27a','#ffc2d4','#ffffff','#ff9fbd'];
  for(let i=0;i<80;i++){const a=Math.random()*6.283,s=1.2+Math.random()*4.8;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:60+Math.random()*30,m:90,r:1.2+Math.random()*2.4,c:c[i%c.length]});}
  if(!raf)loop();}
function loop(){cx.clearRect(0,0,innerWidth,innerHeight);parts=parts.filter(p=>p.l>0);
  for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vx*=.982;p.vy=p.vy*.982+.04;p.l--;
    cx.globalAlpha=Math.max(0,p.l/p.m);cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();}
  cx.globalAlpha=1;raf=parts.length?requestAnimationFrame(loop):null;}
function celebrate(){const w=innerWidth,h=innerHeight;
  [[.25,.3,0],[.75,.28,250],[.5,.2,500],[.35,.42,800],[.68,.4,1050]].forEach(([a,b,t])=>setTimeout(()=>burst(w*a,h*b),t));}

/* ---------- typing intro ---------- */
function typeIntro(){const parts=[[$('#t1'),Array.from('Happy Birthday')],[$('#t2'),Array.from('My Wife 😘')]];let p=0,i=0;
  (function step(){if(p>=parts.length){setTimeout(()=>{$('.caret').classList.add('done');$('.intro-after').classList.add('show');},400);return;}
    const [el,ch]=parts[p];const c=ch[i++];
    if(/\p{Extended_Pictographic}/u.test(c)){const e=document.createElement('span');e.className='emo';e.textContent=c;el.appendChild(e);}
    else el.appendChild(document.createTextNode(c));
    if(i>=ch.length){p++;i=0;setTimeout(step,420);}else setTimeout(step,110);})();}
setTimeout(typeIntro,600);

/* ---------- open gift ---------- */
const music=$('#music'),mBtn=$('#musicBtn');
$('#openBtn').addEventListener('click',()=>{
  music.volume=.4;music.play().catch(()=>{});
  $('#intro').classList.add('gone');document.body.classList.remove('locked');
  mBtn.hidden=false;celebrate();petals(30);
  setTimeout(()=>$$('.hero .reveal').forEach(e=>e.classList.add('in')),200);
});
mBtn.addEventListener('click',()=>{if(music.paused){music.play().catch(()=>{});mBtn.classList.remove('off');}else{music.pause();mBtn.classList.add('off');}});

/* ---------- scroll reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});
$$('.reveal').forEach(e=>{if(!e.closest('.hero'))io.observe(e);});

/* ---------- countdown ---------- */
function tick(){const now=new Date();let y=now.getFullYear();
  const start=new Date(y,10,13),end=new Date(y,10,14);
  if(now>=start&&now<end){$('#cdLabel').textContent='Aaj tumhara din hai! Happy Birthday, meri jaan 🎉';['d','h','m','s'].forEach(k=>$('#cd-'+k).textContent='🎂');return;}
  let t=now<start?start:new Date(y+1,10,13);let r=Math.max(0,t-now);
  const d=Math.floor(r/864e5);r%=864e5;const h=Math.floor(r/36e5);r%=36e5;const m=Math.floor(r/6e4);const s=Math.floor(r%6e4/1e3);
  $('#cd-d').textContent=d;$('#cd-h').textContent=String(h).padStart(2,'0');$('#cd-m').textContent=String(m).padStart(2,'0');$('#cd-s').textContent=String(s).padStart(2,'0');}
tick();setInterval(tick,1000);

/* ---------- slider ---------- */
const photos=[
  ['first-meeting.jpg','Our first meeting, jis din meri favourite story shuru hui.'],
  ['hands-together.jpg','Haath mein haath, aur dil mein bas tum.'],
  ['memory-collage.jpg','Chhoti-chhoti yaadein, mere liye sabse keemti.'],
  ['memory-frame.jpg','Har photo mein ek alag si yaad chhupi hai.'],
  ['her-smile.jpg','Tumhari smile, meri favourite feeling.'],
  ['hands-memory.jpg','Ye pal tumhare saath, meri poori duniya.']];
const slides=$('#slides'),dots=$('#dots'),cap=$('#caption');let cur=0,timer;
photos.forEach(([src,alt],i)=>{const im=new Image();im.src=src;im.alt=alt;if(i)im.loading='lazy';slides.appendChild(im);
  const b=document.createElement('button');b.setAttribute('aria-label','Photo '+(i+1));b.onclick=()=>show(i,true);dots.appendChild(b);});
function show(i,user){cur=(i+photos.length)%photos.length;
  slides.querySelectorAll('img').forEach((im,k)=>im.classList.toggle('on',k===cur));
  dots.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('on',k===cur));
  cap.style.opacity=0;setTimeout(()=>{cap.textContent=photos[cur][1];cap.style.opacity=1;},250);
  if(user){clearInterval(timer);timer=setInterval(()=>show(cur+1),5000);}}
$('#prev').onclick=()=>show(cur-1,true);$('#next').onclick=()=>show(cur+1,true);
let sx=null;slides.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
slides.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1),true);sx=null;});
show(0);timer=setInterval(()=>show(cur+1),5000);

/* ---------- typed letter ---------- */
const letterTxt='Meri jaan,\nTum meri zindagi ki sabse pyaari feeling ho. Tumhari smile mera din khoobsurat bana deti hai, aur tumhare saath ordinary pal bhi special lagte hain.\nMain chahta hoon ki hum aise hi saath haste rahein, ladte rahein, manate rahein, aur har din ko yaadgaar banate rahein.\nMain perfect nahi hoon, par tumhe pyaar karne aur tumhara saath dene ki koshish hamesha dil se karunga.\nHappy Birthday, my love. 🫶';
let typed=false;const lio=new IntersectionObserver(es=>{if(!es[0].isIntersecting||typed)return;typed=true;lio.disconnect();
  const el=$('#letter'),ch=Array.from(letterTxt);let i=0;(function t(){el.textContent=ch.slice(0,++i).join('');if(i<ch.length)setTimeout(t,ch[i-1]==='\n'?400:38);})();},{threshold:.4});
lio.observe($('#letterBox'));

/* ---------- reasons ---------- */
const reasons=['Tumhari smile meri favourite hai.','Tumhare saath ordinary din bhi special lagta hai.','Tum mujhe bina bole bhi samajh leti ho.','Tumhari hasi mera mood theek kar deti hai.','Tum meri favourite person ho.','Tumhare saath future imagine karna beautiful lagta hai.','Tumhari chhoti-chhoti baatein mujhe yaad rehti hain.','Tum mere liye sukoon ho.','Tumhare saath hasi-mazaak sabse best hai.','Tum meri life mein pyaar laati ho.','Tumhari kindness mujhe inspire karti hai.','Tumhare saath memories banana pasand hai.','Tum meri best friend bhi ho.','Tum mujhe better insaan banna yaad dilati ho.','Tumhare paas ghar jaisa feel hota hai.','Tumhara haath pakadna sabse special lagta hai.','Tumhari khushi mere liye sabse important hai.','Tumhari aankhon mein apnapan dikhta hai.','Har din tumhe hi choose karunga.','Because you are simply YOU, meri jaan. 💗'];
let ri=0;const rc=$('#reasonCard');
rc.addEventListener('click',()=>{rc.classList.add('spin');setTimeout(()=>{ri=(ri+1)%reasons.length;
  $('#reasonText').textContent=reasons[ri];$('#reasonNum').textContent=String(ri+1).padStart(2,'0')+' / '+reasons.length;rc.classList.remove('spin');
  if(ri===reasons.length-1)petals(16,['💗','❤️']);},250);});

/* ---------- helpers ---------- */
function say(id,txt){const o=$(id);o.textContent=txt;o.classList.remove('pop');void o.offsetWidth;o.classList.add('pop');}

/* ---------- open when ---------- */
const letters={sad:'Meri jaan, agar aaj dil udaas hai toh yaad rakhna, tum akeli nahi ho. Main hamesha tumhari baat sunne aur tumhe gale lagane ke liye hoon. 🫂',
  miss:'Mujhe bhi tumhari bahut yaad aati hai. Jab bhi miss karo, yaad rakhna hamara pyaar kisi distance se chhota nahi. Sending the biggest hug. 💗',
  smile:'Reminder: tum bahut special ho, tumhari smile beautiful hai, aur tum duniya ki saari khushiyan deserve karti ho. Ab ek pyaari si smile do! 😊'};
$$('.env').forEach(b=>b.addEventListener('click',()=>{$$('.env').forEach(x=>x.classList.remove('on'));b.classList.add('on');say('#envOut',letters[b.dataset.letter]);}));

/* ---------- cake ---------- */
$('#cakeBtn').addEventListener('click',e=>{const c=$('#cake');if(c.classList.contains('cut'))return;
  c.classList.add('cut');e.currentTarget.textContent='Cake Cut Ho Gaya! 🎉';celebrate();petals(30,['🎉','🎂','💖','✨']);
  say('#cakeOut','Yayyy! Happy Birthday meri jaan! 🎂 Tumhari har wish poori ho, aur pehla piece sirf tumhara. 😘');});

/* ---------- gifts ---------- */
$$('.gift').forEach(g=>g.addEventListener('click',()=>{if(g.classList.contains('open'))return;g.classList.add('open');
  const r=g.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2);}));

/* ---------- quiz ---------- */
$$('.quiz button').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.ok==='1'){b.classList.add('right');say('#quizOut','Bilkul sahi! 👑 Meri queen hi meri duniya hai. Inaam: unlimited hugs aur kisses. 😘');petals(20,['👑','💖','✨']);}
  else{b.classList.remove('wrong');void b.offsetWidth;b.classList.add('wrong');say('#quizOut','Hehe, galat jawab! 😂 Hint: woh abhi ye page padh rahi hai. 💗');}}));

/* ---------- promise ---------- */
$('#promiseBtn').addEventListener('click',()=>{say('#promiseOut','Promise sealed, hamesha ke liye. ♾️❤️');petals(24,['💗','❤️','🤍']);});

/* ---------- whatsapp ---------- */
$('#sendMsg').addEventListener('click',()=>{const f=$('#msg'),t=f.value.trim(),s=$('#msgStatus');
  if(!t){s.textContent='Pehle kuch likho na 💗';f.focus();return;}
  s.textContent='WhatsApp khul raha hai… wahan Send dabana mat bhoolna 💚';
  window.open('https://wa.me/919122950885?text='+encodeURIComponent(t),'_blank','noopener');});

/* ---------- finale ---------- */
let fin=false;const fio=new IntersectionObserver(es=>{if(!es[0].isIntersecting||fin)return;fin=true;fio.disconnect();
  setTimeout(()=>{$('#finale').classList.add('show');celebrate();petals(40);},1200);},{threshold:.6});
fio.observe($('#finaleSec'));
$('#closeFinale').addEventListener('click',()=>{$('#finale').classList.remove('show');scrollTo({top:0,behavior:'smooth'});setTimeout(()=>{fin=false;fio.observe($('#finaleSec'));},2000);});
})();
