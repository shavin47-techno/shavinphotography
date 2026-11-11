/* =====================  EDIT THIS SECTION  ===================== */
const CONFIG={
  formEndpoint:"",  // paste your Formspree / Web3Forms URL here, e.g. "https://formspree.io/f/xxxxxxx"
  whatsapp:"+255 620 156 129",      // e.g. "255700000000" (country code, no + or spaces)
  email:"shavintechno@gmail.com"          // your public email
};
/* PHOTOS: upload files into the /images folder, then add one line per photo here.
   Delete a line to remove a photo. Move lines to reorder.
   category must be: wildlife | corporate | fashion | portraits | editorial | weddings */
const IMAGES=[
 {file:"wildlife-elephant-serengeti.jpg",category:"wildlife",title:"Elephant, Serengeti",alt:"African elephant walking across the Serengeti plains, Tanzania"},
 {file:"wildlife-lion-ngorongoro.jpg",category:"wildlife",title:"Lion, Ngorongoro",alt:"Lion resting in Ngorongoro Crater, Tanzania"},
 {file:"wildlife-giraffe-plains.jpg",category:"wildlife",title:"Giraffes at Dusk",alt:"Giraffes on the plains of Tanzania at dusk"},
 {file:"corporate-team-portrait-arusha.jpg",category:"corporate",title:"Team Portrait",alt:"Corporate team portrait photographed in Arusha"},
 {file:"corporate-event-tanzania.jpg",category:"corporate",title:"Conference Moment",alt:"Corporate event photography in Tanzania"},
 {file:"fashion-editorial-arusha.jpg",category:"fashion",title:"Editorial Study",alt:"Fashion editorial photograph shot in Arusha"},
 {file:"fashion-campaign-detail.jpg",category:"fashion",title:"Campaign Detail",alt:"Fashion campaign detail photograph"},
 {file:"portrait-studio-arusha.jpg",category:"portraits",title:"Studio Portrait",alt:"Studio portrait by Shavim Photography"},
 {file:"editorial-story-tanzania.jpg",category:"editorial",title:"Editorial Story",alt:"Editorial photograph from Tanzania"},
 {file:"wedding-ceremony-arusha.jpg",category:"weddings",title:"The Ceremony",alt:"Wedding ceremony photographed in Arusha"}
];
/* TESTIMONIALS: replace with REAL client feedback (with permission). Delete a block to remove it. */
const TESTIMONIALS=[
 {quote:"[Shavin Photography made our wedding day feel effortless. He was relaxed, professional, and somehow captured moments we didn’t even realize were happening. When the photos arrived, we were in tears. 
   Every image felt natural and full of emotion. We couldn’t have asked for a better photographer.]",name:"[AMINAH & JOSEPH]",role:"[MWANZA]"},
 {quote:"[I’ve always hated being photographed, but Shavin made me feel completely at ease. He took the time to chat, find my good angles, and bring out a side of me I’d never seen on camera.
  My portraits look like me on my best day.]",name:"[ANNE]",role:"[BOT]"},
 {quote:"[We joined Shavin for a full-day safari shoot, and his patience was remarkable. He knew exactly where to position us for the best light and never rushed a moment, even when we waited an hour for a lion to stir.
  The photos are stunning, and he made the whole trip more memorable. 
  Highly recommend him to anyone visiting Tanzania.]",name:"[BREENAH]",role:"[CARNIVORES]"}
];
/* ===================  END OF EDIT SECTION  =================== */

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const CATS=["all","wildlife","corporate","fashion","portraits","editorial","weddings"];
let current="all",list=[],idx=0;

// Gallery + filters
function renderGallery(){
  list=IMAGES.filter(i=>current==="all"||i.category===current);
  const g=$("#gallery");g.innerHTML="";
  if(!list.length){g.innerHTML='<p class="empty">No images in this category yet.</p>';return}
  list.forEach((im,n)=>{
    const f=document.createElement("figure");f.tabIndex=0;f.setAttribute("role","button");f.setAttribute("aria-label","Open "+im.title);
    const img=new Image();img.src="images/"+im.file;img.alt=im.alt;img.loading="lazy";img.decoding="async";
    img.onerror=()=>{img.remove();f.style.aspectRatio="4/3"};
    const c=document.createElement("figcaption");c.textContent=im.title;f.append(img,c);
    f.onclick=()=>openLb(n);f.onkeydown=e=>{if(e.key==="Enter")openLb(n)};g.append(f);
  });
}
$("#filters").innerHTML=CATS.map(c=>`<button role="tab" data-c="${c}" class="${c==="all"?"on":""}">${c==="all"?"All work":c}</button>`).join("");
$("#filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;current=b.dataset.c;$("#filters button").forEach; $$("#filters button").forEach(x=>x.classList.toggle("on",x===b));renderGallery()};
renderGallery();

// Lightbox
function openLb(n){
  idx=n;closeLb();const d=document.createElement("div");d.className="lb";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","Image viewer");
  d.innerHTML='<button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><p></p><button class="n" aria-label="Next">›</button>';
  document.body.append(d);document.body.style.overflow="hidden";show();
  d.onclick=e=>{if(e.target===d||e.target.classList.contains("x"))closeLb();else if(e.target.classList.contains("p"))step(-1);else if(e.target.classList.contains("n"))step(1)};
}
function show(){const d=$(".lb"),im=list[idx];$("img",d).src="images/"+im.file;$("img",d).alt=im.alt;$("p",d).textContent=im.title}
function step(k){idx=(idx+k+list.length)%list.length;show()}
function closeLb(){const d=$(".lb");if(d){d.remove();document.body.style.overflow=""}}
addEventListener("keydown",e=>{if(!$(".lb"))return;if(e.key==="Escape")closeLb();if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});

// Testimonials
$("#testimonials").innerHTML=TESTIMONIALS.map(t=>`<figure class="reveal"><blockquote>“${t.quote}”</blockquote><figcaption class="who"><b>${t.name}</b><br>${t.role}</figcaption></figure>`).join("");
if(!TESTIMONIALS.length)$(".band").hidden=true;

// Contact links, year
$("#contactLinks").innerHTML=(CONFIG.whatsapp?`<a href="https://wa.me/${CONFIG.whatsapp}" rel="noopener">WhatsApp</a>`:"")+(CONFIG.email?`<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`:"");
$("#year").textContent=new Date().getFullYear();

// Pre-select service when an Inquire button is clicked
$$("[data-service]").forEach(a=>a.addEventListener("click",()=>{const s=$("#service"),v=a.dataset.service;const o=[...s.options].find(x=>x.textContent===v||x.value===v);if(o)s.value=o.value}));

// Booking form (never pretends to send if not configured)
$("#bookForm").addEventListener("submit",async e=>{
  e.preventDefault();const m=$("#formMsg"),btn=$("button",e.target);
  if(!CONFIG.formEndpoint){m.textContent="This form isn't connected yet. Add your form endpoint in script.js (see README).";return}
  btn.disabled=true;m.textContent="Sending…";
  try{const r=await fetch(CONFIG.formEndpoint,{method:"POST",headers:{Accept:"application/json"},body:new FormData(e.target)});
    if(!r.ok)throw 0;e.target.reset();e.target.innerHTML='<div class="full" role="status"><h3>Thank you.</h3><p class="muted">Your inquiry has been received. Shavim Photography will respond with a customised quotation shortly.</p></div>';
  }catch{m.textContent="Something went wrong. Please try again or contact us on WhatsApp.";btn.disabled=false}
});

// Nav: mobile menu, solid header, active link, back to top, reveal on scroll
const menu=$("#menu"),mb=$("#menuBtn");
mb.onclick=()=>{const o=menu.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
menu.onclick=e=>{if(e.target.tagName==="A"){menu.classList.remove("open");mb.setAttribute("aria-expanded","false")}};
const tt=$("#toTop");tt.onclick=()=>scrollTo({top:0,behavior:"smooth"});
addEventListener("scroll",()=>{$("header").classList.toggle("solid",scrollY>40);tt.hidden=scrollY<600},{passive:true});
const secs=$("main").querySelectorAll("section[id]");
secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$("#menu").querySelectorAll("a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+s.id))}),{rootMargin:"-45% 0px -50% 0px"}).observe(s));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>io.observe(el));
