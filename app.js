
// FamilyCircle V7: aggressively remove stale demo caches/service workers from older test builds.
(async function resetOldDemoCache(){
  try{
    if ('caches' in window){
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== 'familycircle-v14').map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator){
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs){
        const url = reg.active?.scriptURL || reg.installing?.scriptURL || reg.waiting?.scriptURL || '';
        if (url && !url.includes('sw.js?v=14')) {
          await reg.unregister();
        }
      }
    }
  }catch(e){ console.warn('Cache cleanup skipped', e); }
})();


const content=document.getElementById('content');
const title=document.getElementById('pageTitle');
const modalRoot=document.getElementById('modalRoot');
const feedTop=document.getElementById('feedTop');
const settingsTop=document.getElementById('settingsTop');
const statusTop=document.getElementById('statusTop');
const galleryInput=document.getElementById('galleryInput');
const cameraInput=document.getElementById('cameraInput');
const scoreInput=document.getElementById('scoreInput');
const navItems=[...document.querySelectorAll('.nav-item')];
const sosBtn=document.getElementById('sosBtn');
const circleSwitchBtn=document.getElementById('circleSwitchBtn');
const circleNameTop=document.getElementById('circleNameTop');
const circleUnreadTop=document.getElementById('circleUnreadTop');

let members=[
 {name:'Mama',avatar:'👩',online:true},{name:'Papa',avatar:'👨',online:true},
 {name:'Lisa',avatar:'👧',online:false},{name:'Noah',avatar:'👦',online:false},
 {name:'Familie',avatar:'👨‍👩‍👧‍👦',online:true}
];

let chatData=[
 {name:'Mama',avatar:'👩',preview:'Kannst du nachher noch Brot mitbringen?',time:'12:41',badge:2},
 {name:'Papa',avatar:'👨',preview:'👍 Alles klar, bis später',time:'11:58',badge:0},
 {name:'Lisa',avatar:'👧',preview:'Foto',time:'10:22',badge:1},
 {name:'Noah',avatar:'👦',preview:'Ich bin gleich zuhause',time:'Gestern',badge:0},
 {name:'Familie',avatar:'👨‍👩‍👧‍👦',preview:'Mama: Sonntag um 14 Uhr?',time:'Gestern',badge:4}
];

const circlePresets={
 family:{
   id:'family',name:'FamilyCircle',label:'Familie',icon:'👨‍👩‍👧‍👦',theme:'family',unread:0,lastActivity:'Keine neuen Nachrichten',
   members:[
    {name:'Mama',avatar:'👩',online:true},{name:'Papa',avatar:'👨',online:true},
    {name:'Lisa',avatar:'👧',online:false},{name:'Noah',avatar:'👦',online:false},
    {name:'Familie',avatar:'👨‍👩‍👧‍👦',online:true}
   ],
   chats:[
    {name:'Mama',avatar:'👩',preview:'Kannst du nachher noch Brot mitbringen?',time:'12:41',badge:2},
    {name:'Papa',avatar:'👨',preview:'👍 Alles klar, bis später',time:'11:58',badge:0},
    {name:'Lisa',avatar:'👧',preview:'Foto',time:'10:22',badge:1},
    {name:'Noah',avatar:'👦',preview:'Ich bin gleich zuhause',time:'Gestern',badge:0},
    {name:'Familie',avatar:'👨‍👩‍👧‍👦',preview:'Mama: Sonntag um 14 Uhr?',time:'Gestern',badge:4}
   ]
 },
 friends:{
   id:'friends',name:'FriendsCircle',label:'Freunde',icon:'🫶',theme:'friends',unread:5,lastActivity:'Mert: Heute Abend noch spontan?',
   members:[
    {name:'Mert',avatar:'🧑',online:true},{name:'Can',avatar:'🧔',online:true},
    {name:'Seda',avatar:'👩‍🦱',online:false},{name:'Elif',avatar:'👩‍🦰',online:true},
    {name:'Freunde',avatar:'🫶',online:true}
   ],
   chats:[
    {name:'Mert',avatar:'🧑',preview:'Heute Abend noch spontan?',time:'18:22',badge:3},
    {name:'Can',avatar:'🧔',preview:'Ich bin dabei 😄',time:'17:58',badge:0},
    {name:'Seda',avatar:'👩‍🦱',preview:'Foto vom Wochenende',time:'16:40',badge:1},
    {name:'Elif',avatar:'👩‍🦰',preview:'Bis später!',time:'15:12',badge:0},
    {name:'Freunde',avatar:'🫶',preview:'Mert: Treffpunkt um 20 Uhr?',time:'Heute',badge:6}
   ]
 },
 girls:{
   id:'girls',name:'GirlsCircle',label:'Girls',icon:'💗',theme:'girls',unread:2,lastActivity:'Lisa: Welches Outfit? 👗',
   members:[
    {name:'Lisa',avatar:'👧',online:true},{name:'Sophie',avatar:'👩',online:true},
    {name:'Mia',avatar:'👩‍🦰',online:false},{name:'Nora',avatar:'👩‍🦱',online:false},
    {name:'Girls',avatar:'💗',online:true}
   ],
   chats:[
    {name:'Lisa',avatar:'👧',preview:'Welches Outfit? 👗',time:'19:02',badge:2},
    {name:'Sophie',avatar:'👩',preview:'Sprachnachricht',time:'18:45',badge:1},
    {name:'Mia',avatar:'👩‍🦰',preview:'Freitag passt!',time:'17:20',badge:0},
    {name:'Nora',avatar:'👩‍🦱',preview:'💗',time:'Gestern',badge:0},
    {name:'Girls',avatar:'💗',preview:'Sophie: Mädelsabend?',time:'Heute',badge:5}
   ]
 },
 work:{
   id:'work',name:'WorkCircle',label:'Team',icon:'💼',theme:'work',unread:0,lastActivity:'Anna: Meeting auf 10:30 verschoben',
   members:[
    {name:'Anna',avatar:'👩‍💼',online:true},{name:'David',avatar:'🧑‍💼',online:true},
    {name:'Melis',avatar:'👩‍💻',online:false},{name:'Jan',avatar:'👨‍💻',online:true},
    {name:'Team',avatar:'💼',online:true}
   ],
   chats:[
    {name:'Anna',avatar:'👩‍💼',preview:'Meeting auf 10:30 verschoben',time:'09:12',badge:1},
    {name:'David',avatar:'🧑‍💼',preview:'Dokument ist fertig',time:'08:54',badge:0},
    {name:'Melis',avatar:'👩‍💻',preview:'Kannst du kurz prüfen?',time:'08:20',badge:2},
    {name:'Jan',avatar:'👨‍💻',preview:'Danke!',time:'Gestern',badge:0},
    {name:'Team',avatar:'💼',preview:'Anna: Tagesplanung aktualisiert',time:'Heute',badge:4}
   ]
 },
 sport:{
   id:'sport',name:'SportCircle',label:'Team',icon:'⚽',theme:'sport',unread:1,lastActivity:'Coach: Training heute 18:30',
   members:[
    {name:'Coach',avatar:'🧑‍🏫',online:true},{name:'Emre',avatar:'🏃',online:true},
    {name:'Leon',avatar:'⚽',online:false},{name:'Sam',avatar:'🥅',online:true},
    {name:'Team',avatar:'🏆',online:true}
   ],
   chats:[
    {name:'Coach',avatar:'🧑‍🏫',preview:'Training heute 18:30',time:'13:02',badge:1},
    {name:'Emre',avatar:'🏃',preview:'Bin pünktlich da',time:'12:18',badge:0},
    {name:'Leon',avatar:'⚽',preview:'Trikot nicht vergessen',time:'11:31',badge:0},
    {name:'Sam',avatar:'🥅',preview:'👍',time:'Gestern',badge:0},
    {name:'Team',avatar:'🏆',preview:'Coach: Aufstellung ist online',time:'Heute',badge:3}
   ]
 }
};

let currentCircleId='family';
function activeCircle(){return circlePresets[currentCircleId]||circlePresets.family;}
function unreadOutsideCurrent(){
 return Object.values(circlePresets).reduce((sum,c)=>sum+(c.id===currentCircleId?0:(c.unread||0)),0);
}
function unreadLabel(n){return n>99?'99+':String(n);}
function updateCircleHeader(){
 const c=activeCircle();
 circleNameTop.textContent=c.name;
 const total=unreadOutsideCurrent();
 if(total>0){
   circleUnreadTop.hidden=false;
   circleUnreadTop.textContent=unreadLabel(total);
   circleSwitchBtn.setAttribute('aria-label',`${c.name} · ${total} ungelesene Nachrichten in anderen Circles`);
 }else{
   circleUnreadTop.hidden=true;
   circleUnreadTop.textContent='0';
   circleSwitchBtn.setAttribute('aria-label',`${c.name} · Circle wechseln`);
 }
}
function applyCircle(id){
 const c=circlePresets[id]; if(!c)return;
 currentCircleId=id;
 members=c.members.map(x=>({...x}));
 chatData=c.chats.map(x=>({...x}));
 document.body.dataset.circle=c.theme;
 updateCircleHeader();
 modalRoot.innerHTML='';
 show('chat');
 toast(c.name+' geöffnet');
}
function openCircleSwitcher(){
 const current=activeCircle();
 modalRoot.innerHTML=`<div class="sheet circle-sheet">
   <div class="sheet-card">
    <div class="sheet-head"><h3>Deine Circles</h3><button id="closeCircleSheet" class="icon-button">✕</button></div>
    <p class="small muted circle-sheet-intro">Neue Nachrichten bleiben sichtbar, bis du den jeweiligen Circle bzw. Chat öffnest.</p>
    ${Object.values(circlePresets).map(c=>`<button class="circle-option ${c.id===currentCircleId?'selected':''}" data-circle-id="${c.id}">
      <span class="circle-option-icon">${c.icon}</span>
      <span class="circle-option-copy">
        <span class="circle-option-titleline"><b>${c.name}</b>${c.id===currentCircleId?'<small class="circle-current-pill">Aktuell</small>':''}</span>
        <small>${c.lastActivity||c.label}</small>
      </span>
      <span class="circle-option-side">
        ${c.unread>0?`<span class="circle-unread-badge">${unreadLabel(c.unread)}</span>`:'<span class="circle-no-unread">✓</span>'}
        <span class="circle-arrow">›</span>
      </span>
    </button>`).join('')}
    <button id="createCircleDemo" class="circle-create">＋ Neuen Circle erstellen</button>
   </div>
  </div>`;
 document.getElementById('closeCircleSheet').onclick=()=>modalRoot.innerHTML='';
 document.querySelectorAll('[data-circle-id]').forEach(b=>b.onclick=()=>applyCircle(b.dataset.circleId));
 document.getElementById('createCircleDemo').onclick=()=>toast('Demo: Circle erstellen – Name, Farbe, Bild und Mitglieder wählen.');
}

let current='chat';
let currentChat=null;
let yesCount=0;
let rapidCount=0;
let lastSosTap=0;
let demoEvents=[
 {icon:'🏖️',title:'Urlaub Papa',date:'12.–26. Aug',visible:'Mama · Lisa'},
 {icon:'🎂',title:'Oma Geburtstag',date:'Morgen',visible:'Alle'},
 {icon:'⚽',title:'Fußball Noah',date:'Mo 17:00',visible:'Familie'}
];

let postComments={
  0:[{avatar:'👨',name:'Papa',text:'Tolles Foto ❤️',likes:2},{avatar:'👧',name:'Lisa',text:'Das war richtig schön 😊',likes:1},{avatar:'👦',name:'Noah',text:'Nächstes Mal wieder!',likes:0}],
  1:[{avatar:'👩',name:'Mama',text:'Ich bin dabei 🍕',likes:1},{avatar:'👧',name:'Lisa',text:'Ich auch!',likes:0}]
};

const names={chat:'Chats',calendar:'Kalender',location:'Standort',games:'Spiele',feed:'Familien-Feed',settings:'Einstellungen'};

function safe(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function toast(text){document.querySelector('.toast')?.remove();const t=document.createElement('div');t.className='toast';t.textContent=text;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
function card(html){return `<section class="card">${html}</section>`;}

function setActive(tab){
 navItems.forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
 feedTop.classList.toggle('active',tab==='feed');
 settingsTop.classList.toggle('active',tab==='settings');
 statusTop.classList.remove('active');
}

function statusView(){
 return `<div class="section-pad">
  <h2 style="margin:2px 0 10px">Status</h2>
  <p class="muted" style="margin-top:0">Aktuelle Statusmeldungen der Mitglieder · Demo</p>
 </div>
 ${card(`<div class="setting-row"><span class="setting-icon">👩</span><span class="setting-copy"><b>Mama</b><small>vor 12 Min</small></span><span>●</span></div>
 <div class="setting-row"><span class="setting-icon">👨</span><span class="setting-copy"><b>Papa</b><small>vor 35 Min</small></span><span>●</span></div>
 <div class="setting-row"><span class="setting-icon">👧</span><span class="setting-copy"><b>Lisa</b><small>Heute, 17:40</small></span><span>●</span></div>
 <div class="setting-row"><span class="setting-icon">👦</span><span class="setting-copy"><b>Noah</b><small>Heute, 16:15</small></span><span>●</span></div>`)}
 `;
}
function showStatus(){
 current='status'; currentChat=null; navItems.forEach(b=>b.classList.remove('active'));
 feedTop.classList.remove('active'); settingsTop.classList.remove('active'); statusTop.classList.add('active');
 title.textContent='Status'; content.innerHTML=statusView(); window.scrollTo({top:0,behavior:'instant'});
}

function show(tab){
 current=tab;currentChat=null;setActive(tab);title.textContent=names[tab];
 if(tab==='chat') { openFamilyChat(); return; }
 if(tab==='calendar') content.innerHTML=calendarView();
 if(tab==='location') content.innerHTML=locationView();
 if(tab==='games') content.innerHTML=gamesView();
 if(tab==='feed') content.innerHTML=feedView();
 if(tab==='settings') content.innerHTML=settingsView();
 bind();
 window.scrollTo({top:0,behavior:'instant'});
}

function chatList(){
 return `<div class="contacts-head"><button id="contactsBack" class="back">‹</button><div><b>Kontakte</b><div class="small muted">Einzelchats</div></div></div>
 <div class="search">🔎 <span>Kontakte durchsuchen</span></div>
 ${chatData.slice(0,4).map((c,i)=>`<div class="chat-row" data-chat="${i}">
   <div class="avatar">${c.avatar}</div>
   <div class="chat-main">
    <div class="chat-line"><span class="chat-name">${c.name}</span><span class="chat-time">${c.time}</span></div>
    <div class="chat-line"><span class="preview">${c.preview}</span>${c.badge?`<span class="badge">${c.badge}</span>`:''}</div>
   </div>
  </div>`).join('')}`;
}

function mediaPanel(label){
 return `<div class="chat-media-panel">
   <button class="media-close icon-button" aria-label="Medien schließen">✕</button>
   <h3>${label}</h3>
   <div class="media-tabs"><button>Fotos</button><button>Videos</button><button>Links</button><button>Dateien</button></div>
   <div class="media-grid"><div>🖼️</div><div>📷</div><div>🎬</div><div>📄</div><div>🔗</div><div>🖼️</div></div>
   <p class="small muted">Demo: Hier werden die im Chat geteilten Medien, Links und Dateien gesammelt.</p>
  </div>`;
}

function openFamilyChat(){
 current='chat'; currentChat=4; setActive('chat'); title.textContent='Chats';
 content.innerHTML=`<section class="chat-screen">
  <div class="chat-header group-header">
   <button id="openContacts" class="contacts-button">Kontakte</button>
   <div class="avatar small">${activeCircle().icon}</div>
   <div class="chat-person"><b>${activeCircle().label}</b><span class="small muted">Alle Mitglieder · Gruppenchat</span></div>
   <div class="chat-header-actions">
    <button id="groupMedia" class="icon-button" aria-label="Gruppenmedien">▦</button>
    <button id="groupVoice" class="icon-button" aria-label="Gruppenanruf">📞</button>
    <button id="groupVideo" class="icon-button" aria-label="Gruppenvideo">🎥</button>
   </div>
  </div>
  <div class="messages" id="messages">
   <div class="bubble theirs group-person-message" data-person-chat="0"><button class="message-sender" data-person-chat="0">${chatData[0].name}</button><br>${safe(chatData[0].preview)}<span class="msg-time">12:35</span></div>
   <div class="bubble theirs group-person-message" data-person-chat="1"><button class="message-sender" data-person-chat="1">${chatData[1].name}</button><br>${safe(chatData[1].preview)}<span class="msg-time">12:37</span></div>
   <div class="bubble mine">Alles klar 😊<span class="msg-time">12:38 ✓✓</span></div>
   <div class="bubble theirs group-person-message" data-person-chat="2"><button class="message-sender" data-person-chat="2">${chatData[2].name}</button><br>${safe(chatData[2].preview)}<span class="msg-time">12:39</span></div>
  </div>
  <div class="chat-composer">
   <button id="attach">＋</button><textarea id="msg" class="chat-message-input" rows="1" maxlength="4000" placeholder="Nachricht an ${activeCircle().label}"></textarea>
   <button id="chatCamera">📷</button><button id="mic">🎙️</button><button id="send" class="send">➤</button>
  </div>
 </section>`;
 document.getElementById('openContacts').onclick=openContacts;
 document.getElementById('groupMedia').onclick=()=>openMedia('Gruppenmedien');
 document.getElementById('groupVoice').onclick=()=>openGroupCall(false);
 document.getElementById('groupVideo').onclick=()=>openGroupCall(true);
 document.getElementById('attach').onclick=()=>galleryInput.click();
 document.getElementById('chatCamera').onclick=()=>cameraInput.click();
 document.getElementById('mic').onclick=()=>toast('Demo: Sprachnachricht wird aufgenommen.');
 document.getElementById('send').addEventListener('pointerdown',e=>e.preventDefault());
 document.getElementById('send').onclick=sendMessage;
 document.querySelectorAll('[data-person-chat]').forEach(el=>{
   el.onclick=(e)=>{ e.stopPropagation(); openChat(Number(el.dataset.personChat)); };
 });
 setupChatInput();
 window.scrollTo({top:0,behavior:'instant'});
}

function openContacts(){
 title.textContent='Kontakte';
 content.innerHTML=chatList();
 document.getElementById('contactsBack').onclick=openFamilyChat;
 document.querySelectorAll('[data-chat]').forEach(r=>r.onclick=()=>openChat(Number(r.dataset.chat)));
 window.scrollTo({top:0,behavior:'instant'});
}

function openChat(i){
 currentChat=i; const p=chatData[i]; title.textContent=p.name;
 content.innerHTML=`<section class="chat-screen">
  <div class="chat-header">
   <button id="chatBack" class="back">‹</button>
   <button id="contactProfileOpen" class="contact-header-person" aria-label="Kontaktinfo für ${p.name}">
     <div class="avatar small">${p.avatar}</div>
     <div class="chat-person"><b>${p.name}</b><span class="small muted">${i<2?'online':'zuletzt heute online'}</span></div>
   </button>
   <div class="chat-header-actions">
    <button id="chatMedia" class="icon-button" aria-label="Medien, Links und Dateien">▦</button>
    <button id="voiceCall" class="icon-button">📞</button><button id="videoCall" class="icon-button">🎥</button>
   </div>
  </div>
  <div class="messages" id="messages">
   <div class="bubble mine">Kannst du nachher noch Brot mitbringen? 😊<span class="msg-time">12:40 ✓✓</span></div>
   <div class="bubble theirs">Klar, mache ich! 🥖<span class="msg-time">12:41</span></div>
   <div class="bubble mine">Danke! ❤️<span class="msg-time">12:42 ✓✓</span></div>
  </div>
  <div class="chat-composer">
   <button id="attach">＋</button><textarea id="msg" class="chat-message-input" rows="1" maxlength="4000" placeholder="Nachricht"></textarea>
   <button id="chatCamera">📷</button><button id="mic">🎙️</button><button id="send" class="send">➤</button>
  </div>
 </section>`;
 document.getElementById('chatBack').onclick=openFamilyChat;
 document.getElementById('contactProfileOpen').onclick=()=>openContactProfile(i);
 document.getElementById('chatMedia').onclick=()=>openMedia('Medien, Links & Dateien · '+p.name);
 document.getElementById('voiceCall').onclick=()=>startCall(i,false);
 document.getElementById('videoCall').onclick=()=>startCall(i,true);
 document.getElementById('attach').onclick=()=>galleryInput.click();
 document.getElementById('chatCamera').onclick=()=>cameraInput.click();
 document.getElementById('mic').onclick=()=>toast('Demo: Sprachnachricht wird aufgenommen.');
 document.getElementById('send').addEventListener('pointerdown',e=>e.preventDefault());
 document.getElementById('send').onclick=sendMessage;
 setupChatInput();
}


function contactPhone(i){
 return ['+49 170 555 0101','+49 170 555 0102','+49 170 555 0103','+49 170 555 0104'][i] || '+49 170 555 0100';
}
function openContactProfile(i){
 currentChat=i; const p=chatData[i]; title.textContent='Kontaktinfo';
 content.innerHTML=`<section class="contact-profile">
   <div class="contact-profile-top">
     <button id="profileBack" class="back profile-back">‹</button>
     <div class="contact-profile-title">Kontaktinfo</div>
     <button id="profileEdit" class="profile-edit">Bearbeiten</button>
   </div>

   <div class="contact-hero">
     <div class="contact-avatar-large">${p.avatar}</div>
     <h2>${p.name}</h2>
     <div class="contact-phone">${contactPhone(i)}</div>
     <div class="contact-status">${i<2?'online':'zuletzt heute online'}</div>
   </div>

   <div class="contact-quick-actions">
     <button id="profileAudio"><span>📞</span><b>Audio</b></button>
     <button id="profileVideo"><span>🎥</span><b>Video</b></button>
     <button id="profileSearch"><span>🔎</span><b>Suchen</b></button>
   </div>

   <section class="contact-card">
     <button class="contact-row" id="profileMedia"><span>🖼️</span><span class="contact-row-main"><b>Medien, Links & Dateien</b><small>Geteilte Inhalte</small></span><span>›</span></button>
     <button class="contact-row" id="profileStorage"><span>💾</span><span class="contact-row-main"><b>Speicher verwalten</b><small>Demo</small></span><span>›</span></button>
     <button class="contact-row" id="profileStarred"><span>☆</span><span class="contact-row-main"><b>Mit Stern markiert</b><small>Keine</small></span><span>›</span></button>
   </section>

   <section class="contact-card">
     <button class="contact-row" id="profileNotifications"><span>🔔</span><span class="contact-row-main"><b>Benachrichtigungen</b></span><span>›</span></button>
     <button class="contact-row" id="profileDesign"><span>🎨</span><span class="contact-row-main"><b>Chatdesign</b></span><span>›</span></button>
     <button class="contact-row" id="profilePhotos"><span>📥</span><span class="contact-row-main"><b>In Fotos speichern</b><small>Standard</small></span><span>›</span></button>
   </section>

   <section class="contact-card">
     <button class="contact-row" id="profileDisappearing"><span>⏱️</span><span class="contact-row-main"><b>Selbstlöschende Nachrichten</b><small>Aus</small></span><span>›</span></button>
     <button class="contact-row" id="profileLock"><span>🔐</span><span class="contact-row-main"><b>Chat sperren</b><small>Diesen Chat auf diesem Gerät schützen</small></span><span>Aus</span></button>
     <button class="contact-row" id="profilePrivacy"><span>🛡️</span><span class="contact-row-main"><b>Erweiterter Chat-Datenschutz</b><small>Aus</small></span><span>›</span></button>
     <button class="contact-row" id="profileEncryption"><span>🔒</span><span class="contact-row-main"><b>Verschlüsselung</b><small>Nachrichten und Anrufe · Demo</small></span><span>›</span></button>
   </section>

   <section class="contact-card">
     <button class="contact-row" id="profileDetails"><span>👤</span><span class="contact-row-main"><b>Kontaktdetails</b></span><span>›</span></button>
   </section>

   <section class="contact-card contact-actions-card">
     <button class="contact-text-action" id="profileShare">Kontakt teilen</button>
     <button class="contact-text-action" id="profileFavorite">Zu Favoriten hinzufügen</button>
     <button class="contact-text-action" id="profileExport">Chat exportieren</button>
     <button class="contact-text-action danger" id="profileClear">Chat leeren</button>
   </section>

   <section class="contact-card contact-actions-card">
     <button class="contact-text-action danger" id="profileBlock">${p.name} blockieren</button>
     <button class="contact-text-action danger" id="profileReport">${p.name} melden</button>
   </section>
 </section>`;
 document.getElementById('profileBack').onclick=()=>openChat(i);
 document.getElementById('profileEdit').onclick=()=>toast('Demo: Kontakt bearbeiten');
 document.getElementById('profileAudio').onclick=()=>startCall(i,false);
 document.getElementById('profileVideo').onclick=()=>startCall(i,true);
 document.getElementById('profileSearch').onclick=()=>toast('Demo: Chat durchsuchen');
 document.getElementById('profileMedia').onclick=()=>openMedia('Medien, Links & Dateien · '+p.name);
 const demo=(id,msg)=>{const el=document.getElementById(id);if(el)el.onclick=()=>openProfileOption(msg,p)};
 demo('profileStorage','Speicher verwalten');
 demo('profileStarred','Mit Stern markiert');
 demo('profileNotifications','Benachrichtigungen');
 demo('profileDesign','Chatdesign');
 demo('profilePhotos','In Fotos speichern');
 demo('profileDisappearing','Selbstlöschende Nachrichten');
 demo('profileLock','Chat sperren');
 demo('profilePrivacy','Erweiterter Chat-Datenschutz');
 demo('profileEncryption','Verschlüsselung');
 demo('profileDetails','Kontaktdetails');
 demo('profileShare','Kontakt teilen');
 demo('profileFavorite','Zu Favoriten hinzufügen');
 demo('profileExport','Chat exportieren');
 demo('profileClear','Chat leeren');
 demo('profileBlock',p.name+' blockieren');
 demo('profileReport',p.name+' melden');
 window.scrollTo({top:0,behavior:'instant'});
}

function openProfileOption(label,p){
 const s=document.createElement('div'); s.className='sheet';
 const options={
  'Speicher verwalten':'Geteilte Medien und Dateien verwalten · Demo',
  'Mit Stern markiert':'Noch keine markierten Nachrichten.',
  'Benachrichtigungen':'Benachrichtigungen für diesen Chat: Ein · Demo',
  'Chatdesign':'Hintergrund und Darstellung auswählen · Demo',
  'In Fotos speichern':'Standard · Demo',
  'Selbstlöschende Nachrichten':'Aus · 24 Stunden · 7 Tage · 90 Tage · Demo',
  'Chat sperren':'Chatsperre auf diesem Gerät ein-/ausschalten · Demo',
  'Erweiterter Chat-Datenschutz':'Zusätzlichen Schutz für diesen Chat einstellen · Demo',
  'Verschlüsselung':'Nachrichten und Anrufe sind in der späteren Echtversion Ende-zu-Ende-verschlüsselt.',
  'Kontaktdetails':p.name+' · '+contactPhone(currentChat),
  'Kontakt teilen':'Kontakt von '+p.name+' teilen · Demo',
  'Zu Favoriten hinzufügen':p.name+' zu Favoriten hinzufügen · Demo',
  'Chat exportieren':'Chat mit '+p.name+' exportieren · Demo',
  'Chat leeren':'Nachrichten in diesem Chat leeren? · Demo',
  [p.name+' blockieren']:p.name+' blockieren? · Demo',
  [p.name+' melden']:p.name+' melden? · Demo'
 };
 s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>${label}</h3><span></span></div><div class="profile-option-demo">${options[label]||'Demo-Funktion'}</div><button class="primary wide close-option" style="margin-top:14px">Fertig</button></div>`;
 document.body.appendChild(s);
 s.querySelectorAll('.close-sheet,.close-option').forEach(b=>b.onclick=()=>s.remove());
 s.onclick=e=>{if(e.target===s)s.remove()};
}

function openMedia(label){
 const s=document.createElement('div'); s.className='sheet';
 s.innerHTML=`<div class="sheet-card">${mediaPanel(label)}</div>`;
 document.body.appendChild(s);
 s.querySelector('.media-close').onclick=()=>s.remove();
 s.onclick=e=>{if(e.target===s)s.remove()};
}

function openGroupCall(video){
 const s=document.createElement('div'); s.className='sheet';
 s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>${video?'Gruppen-Videoanruf':'Gruppen-Sprachanruf'}</h3><span></span></div>
 <p class="muted">Wähle aus, wen du zum Gruppenanruf einladen möchtest.</p>
 ${members.slice(0,4).map((m,i)=>`<label class="member-check"><span>${m.avatar} ${m.name}</span><input class="call-member" type="checkbox" value="${m.name}" ${i<2?'checked':''}></label>`).join('')}
 <button id="startGroupCall" class="primary wide" style="margin-top:12px">${video?'🎥 Videoanruf':'📞 Sprachanruf'} starten · Demo</button></div>`;
 document.body.appendChild(s);
 s.querySelector('.close-sheet').onclick=()=>s.remove();
 s.querySelector('#startGroupCall').onclick=()=>{
   const chosen=[...s.querySelectorAll('.call-member:checked')].map(x=>x.value);
   if(!chosen.length){toast('Bitte mindestens ein Familienmitglied auswählen.');return}
   s.remove(); startGroupCallScreen(chosen,video);
 };
}

function startGroupCallScreen(chosen,video){
 const v=document.createElement('div');v.className='call-screen';
 v.innerHTML=`<div class="group-call-avatars">${chosen.map(n=>`<div class="avatar">${members.find(m=>m.name===n)?.avatar||'🙂'}</div>`).join('')}</div>
 <h2>Familien-Gruppenanruf</h2><p>${video?'Videoanruf':'Sprachanruf'} · ${chosen.join(', ')} · Demo</p>
 <div class="call-controls"><button>🔇</button><button>${video?'📹':'🔊'}</button><button class="hang">☎️</button></div>`;
 document.body.appendChild(v);v.querySelector('.hang').onclick=()=>v.remove();
}


function setupChatInput(){
 const inp=document.getElementById('msg');
 if(!inp)return;
 const resize=()=>{inp.style.height='auto';inp.style.height=Math.min(Math.max(inp.scrollHeight,39),112)+'px'};
 inp.addEventListener('input',resize);
 inp.addEventListener('focus',()=>{document.body.classList.add('keyboard-open');updateKeyboardLayout();});
 inp.addEventListener('blur',()=>setTimeout(()=>{
   document.body.classList.remove('keyboard-open');
   document.documentElement.style.setProperty('--keyboard-nav-shift','0px');
 },80));
 const messages=document.getElementById('messages');
 if(messages){
   messages.addEventListener('pointerdown',e=>{
     if(document.activeElement===inp && !e.target.closest('[data-person-chat]')) inp.blur();
   });
 }
 resize();
}
function updateKeyboardLayout(){
 if(!document.body.classList.contains('keyboard-open'))return;
 const vv=window.visualViewport;
 if(!vv)return;
 const hidden=Math.max(0,window.innerHeight-(vv.height+vv.offsetTop));
 document.documentElement.style.setProperty('--keyboard-nav-shift',(-hidden)+'px');
}
if(window.visualViewport){
 visualViewport.addEventListener('resize',updateKeyboardLayout);
 visualViewport.addEventListener('scroll',updateKeyboardLayout);
}

function sendMessage(){
 const inp=document.getElementById('msg');if(!inp||!inp.value.trim())return;
 document.getElementById('messages').insertAdjacentHTML('beforeend',`<div class="bubble mine"><span class="message-text">${safe(inp.value.trim())}</span><span class="msg-time">jetzt ✓</span></div>`);
 inp.value='';inp.style.height='39px';inp.scrollTop=0;
 const messages=document.getElementById('messages');
 if(messages) requestAnimationFrame(()=>messages.scrollTop=messages.scrollHeight);
 inp.focus({preventScroll:true});
 updateKeyboardLayout();
}
function startCall(i,video){
 const p=chatData[i];const v=document.createElement('div');v.className='call-screen';
 v.innerHTML=`<div class="call-avatar">${p.avatar}</div><h2>${p.name}</h2><p>${video?'Videoanruf':'Sprachanruf'} · Demo</p>
 <div class="call-controls"><button>🔇</button><button>${video?'📹':'🔊'}</button><button class="hang">☎️</button></div>`;
 document.body.appendChild(v);v.querySelector('.hang').onclick=()=>v.remove();
}

function storyStrip(){
 return `<div class="stories">
  <button class="story-btn story-create" id="createStory"><div class="story-ring"><div class="avatar">＋</div></div><div class="story-label">Story erstellen</div></button>
  ${members.map((m,i)=>`<button class="story-btn open-story" data-story="${i}"><div class="story-ring"><div class="avatar">${m.avatar}</div></div><div class="story-label">${m.name}</div></button>`).join('')}
 </div>`;
}
function feedView(){
 return storyStrip()+`<div class="card composer-card"><div class="avatar small">🙂</div><button id="newPost" class="composer-launch">Was möchtest du mit deiner Familie teilen?</button></div>
 <div class="section-pad"><div class="mini-actions"><button id="postPhoto">📷 Foto/Video</button><button id="postText">✍️ Text</button><button id="postAlbum">🖼️ Album</button></div></div>
 ${postHtml(0,'👩','Mama','Heute, 14:05','👨‍👩‍👧‍👦','Sonntag zusammen ❤️',12,5)}
 ${postHtml(1,'👨','Papa','Heute, 12:22','', 'Wer ist heute Abend bei Pizza dabei? 🍕',8,4)}`;
}
function postHtml(id,av,name,time,img,text,likes,thumbs){
 return `<article class="post">
  <div class="post-head"><div class="avatar small">${av}</div><div class="post-user"><b>${name}</b><span class="small muted">${time}</span></div><button class="icon-button">⋯</button></div>
  ${img?`<div class="post-image">${img}</div>`:''}
  <div class="post-body"><div>${text}</div>
   <div class="post-actions"><button class="action-link">❤️ ${likes}</button><button class="action-link">👍 ${thumbs}</button><button class="action-link comment-toggle" data-post="${id}">💬 <span id="cc${id}">${postComments[id].length}</span> Kommentare</button></div>
  </div>
  <div class="comment-panel hidden" id="comments${id}"></div>
 </article>`;
}
function renderComments(id){
 const p=document.getElementById('comments'+id);if(!p)return;
 p.innerHTML=postComments[id].map((c,i)=>`<div class="comment">
   <div class="avatar tiny">${c.avatar}</div><div class="comment-content"><div class="comment-bubble"><b>${c.name}</b><br>${c.text}</div>
   <div class="comment-meta"><span>gerade eben</span><button data-clike="${id}-${i}">Gefällt mir${c.likes?' · '+c.likes:''}</button><button data-creply="${id}-${i}">Antworten</button>${c.name==='Du'?`<button data-cdel="${id}-${i}">Löschen</button>`:''}</div></div>
  </div>`).join('')+`<div class="reply-box"><input id="ci${id}" placeholder="Kommentar schreiben…"><button data-csend="${id}">Senden</button></div>`;
 p.querySelector('[data-csend]').onclick=()=>sendComment(id);
 p.querySelectorAll('[data-clike]').forEach(b=>b.onclick=()=>{let [a,i]=b.dataset.clike.split('-').map(Number);postComments[a][i].likes++;renderComments(a)});
 p.querySelectorAll('[data-creply]').forEach(b=>b.onclick=()=>{let [a,i]=b.dataset.creply.split('-').map(Number);let inp=document.getElementById('ci'+a);inp.value='@'+postComments[a][i].name+' ';inp.focus()});
 p.querySelectorAll('[data-cdel]').forEach(b=>b.onclick=()=>{let [a,i]=b.dataset.cdel.split('-').map(Number);postComments[a].splice(i,1);renderComments(a);document.getElementById('cc'+a).textContent=postComments[a].length});
}
function sendComment(id){
 const inp=document.getElementById('ci'+id);if(!inp.value.trim())return;
 postComments[id].push({avatar:'🙂',name:'Du',text:safe(inp.value.trim()),likes:0});inp.value='';renderComments(id);document.getElementById('cc'+id).textContent=postComments[id].length;
}

function openStorySheet(){
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card">
  <div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Neue Story</h3><span style="width:44px"></span></div>
  <button class="sheet-option" id="storyGallery"><span class="sheet-icon">🖼️</span><span><b>Foto oder Video</b><small>Aus Galerie auswählen</small></span></button>
  <button class="sheet-option" id="storyCamera"><span class="sheet-icon">📷</span><span><b>Foto aufnehmen</b><small>Mit Kamera aufnehmen</small></span></button>
  <button class="sheet-option" id="storyText"><span class="sheet-icon">A</span><span><b>Text-Story</b><small>Text, Emojis und Hintergrund</small></span></button>
  <button class="sheet-option" id="storyPrivacy"><span class="sheet-icon">👥</span><span><b>Story-Sichtbarkeit</b><small>Bestimme, wer die Story sehen darf</small></span></button>
 </div>`;document.body.appendChild(s);
 s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelector('#storyGallery').onclick=()=>galleryInput.click();s.querySelector('#storyCamera').onclick=()=>cameraInput.click();
 s.querySelector('#storyText').onclick=()=>{s.remove();openTextStory()};s.querySelector('#storyPrivacy').onclick=()=>toast('Demo: Sichtbarkeit kann pro Familienmitglied gewählt werden.');
}
function openTextStory(){
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Text-Story</h3><span></span></div>
 <textarea id="storyTextArea" rows="6" style="width:100%;border:0;border-radius:18px;background:#EEF2FF;padding:18px;font-size:21px" placeholder="Schreibe etwas…"></textarea>
 <button id="shareTextStory" class="primary wide" style="margin-top:10px">Story teilen · Demo</button></div>`;document.body.appendChild(s);
 s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelector('#shareTextStory').onclick=()=>{toast('Story lokal als Demo erstellt.');s.remove()};
}
function openStory(i){
 const m=members[i];const v=document.createElement('div');v.className='story-viewer';v.innerHTML=`<div class="story-bars">${members.map((_,x)=>`<i class="${x===i?'on':''}"></i>`).join('')}</div>
 <div class="story-head"><div class="avatar small">${m.avatar}</div><div class="owner"><b>${m.name}</b><div class="small muted">vor 12 Min</div></div><button class="story-close">✕</button></div>
 <div class="story-media">${m.avatar}<p>Schönen Tag euch ❤️</p></div>
 <div class="story-footer"><div class="story-reactions">${['❤️','😂','😍','😮','👍'].map(x=>`<button data-react="${x}">${x}</button>`).join('')}</div>
 <div class="story-reply"><input id="storyReply" placeholder="Antwort an ${m.name}…"><button id="storySend">➤</button></div></div>`;
 document.body.appendChild(v);v.querySelector('.story-close').onclick=()=>v.remove();
 v.querySelectorAll('[data-react]').forEach(b=>b.onclick=()=>toast(b.dataset.react+' an '+m.name+' gesendet · Demo'));
 v.querySelector('#storySend').onclick=()=>{let inp=v.querySelector('#storyReply');if(inp.value.trim()){toast('Private Story-Antwort im Chat mit '+m.name+' gespeichert · Demo');inp.value=''}};
}

function openPostSheet(){
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Beitrag erstellen</h3><span></span></div>
 <button class="sheet-option" id="photoPost"><span class="sheet-icon">📷</span><span><b>Foto oder Video</b><small>Galerie öffnen</small></span></button>
 <button class="sheet-option" id="cameraPost"><span class="sheet-icon">📸</span><span><b>Kamera</b><small>Foto oder Video aufnehmen</small></span></button>
 <button class="sheet-option" id="textPost"><span class="sheet-icon">✍️</span><span><b>Textbeitrag</b><small>Mit Kommentaren und Reaktionen</small></span></button>
 <button class="sheet-option" id="visPost"><span class="sheet-icon">🔒</span><span><b>Sichtbarkeit</b><small>Alle oder ausgewählte Familienmitglieder</small></span></button></div>`;
 document.body.appendChild(s);s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelector('#photoPost').onclick=()=>galleryInput.click();s.querySelector('#cameraPost').onclick=()=>cameraInput.click();
 s.querySelector('#textPost').onclick=()=>toast('Demo: Textbeitrag-Editor geöffnet.');s.querySelector('#visPost').onclick=()=>toast('Demo: Sichtbarkeit pro Mitglied auswählbar.');
}

function calendarView(){
 return card(`<h2>📅 Familienkalender</h2><div class="grid2"><button id="addEvent" class="primary">+ Eintrag</button><button id="calendarFilter" class="secondary">Sichtbarkeit</button></div>
 ${demoEvents.map(e=>`<div class="setting-row"><span class="setting-icon">${e.icon}</span><span class="setting-copy"><b>${e.title}</b><small>Sichtbar: ${e.visible}</small></span><b>${e.date}</b></div>`).join('')}
 <div class="info-banner" style="margin-top:12px">🎂 Geburtstage werden in der echten App aus dem bei der Anmeldung hinterlegten Geburtsdatum jährlich automatisch eingetragen.</div>`);
}
function openEventSheet(){
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Kalendereintrag</h3><span></span></div>
 <div class="form-row"><label>Art</label><select id="etype"><option>Urlaub</option><option>Geburtstag</option><option>Termin</option><option>Schule</option><option>Arbeit</option><option>Besonderer Tag</option></select></div>
 <div class="form-row"><label>Titel</label><input id="etitle" placeholder="z. B. Urlaub Papa"></div>
 <div class="grid2"><div class="form-row"><label>Von</label><input id="efrom" type="date"></div><div class="form-row"><label>Bis</label><input id="eto" type="date"></div></div>
 <div class="form-row"><label>Sichtbar für</label>${members.slice(0,4).map((m,i)=>`<div class="member-check"><span>${m.avatar} ${m.name}</span><input class="evis" type="checkbox" value="${m.name}" ${i<2?'checked':''}></div>`).join('')}</div>
 <button id="saveEvent" class="primary wide">Eintrag speichern · Demo</button></div>`;
 document.body.appendChild(s);s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelector('#saveEvent').onclick=()=>{let t=s.querySelector('#etitle').value.trim()||'Neuer Termin';let vis=[...s.querySelectorAll('.evis:checked')].map(x=>x.value).join(' · ')||'Nur ich';demoEvents.unshift({icon:'📌',title:t,date:'Neu',visible:vis});s.remove();show('calendar')};
}

function locationView(){
 return card(`<h2>📍 Live-Standort</h2><div class="privacy-banner"><span class="status-dot"></span><b>Privat by default</b><br><span class="small">Ohne deine Freigabe sieht niemand deinen Standort.</span></div>
 <div class="form-row"><label>Wer darf meinen Standort sehen?</label>${members.slice(0,4).map((m,i)=>`<div class="member-check"><span>${m.avatar} ${m.name}</span><input type="checkbox" ${i<2?'checked':''}></div>`).join('')}</div>
 <div class="form-row"><label>Dauer der Freigabe</label><select id="duration"><option>15 Minuten</option><option selected>1 Stunde</option><option>Bis heute Abend</option><option>24 Stunden</option><option>Bis ich es beende</option></select></div>
 <div class="grid2"><button id="startLocation" class="primary">Freigabe starten</button><button id="stopLocation" class="danger">Alle stoppen</button></div>`)
 +card(`<h3>Familienkarte · Demo</h3><div class="map-card"><div class="map-road"></div><span class="pin p1">👩</span><span class="pin p2">👨</span><span class="pin p3">👧</span></div>
 <div class="location-status"><span>🛡️</span><span class="small muted">Standortverlauf wird in der echten App nur für den vorgesehenen Zweck und nach deiner Freigabe verwendet.</span></div>`);
}

function gamesView(){
 return card(`<h2>🎮 Spiele-Hub</h2>
 <div class="game-card"><div class="game-icon">🧱</div><div class="game-info"><b>Block Blast!</b><div class="small muted">Externes Spiel · Integration wird geprüft</div></div><button id="openBlock" class="secondary">Öffnen</button></div>
 <div class="game-card"><div class="game-icon">👆</div><div class="game-info"><b>Family Tap Challenge</b><div class="small muted">Eigenes Demo-Spiel</div></div><button id="tapGame" class="secondary">Spielen</button></div>`)
 +card(`<h3>Block Blast · Familienrangliste</h3><div class="score-row"><span>🥇 Lisa</span><b>48.250</b></div><div class="score-row"><span>🥈 Papa</span><b>37.190</b></div><div class="score-row"><span>🥉 Mama</span><b>29.820</b></div>
 <div class="grid2" style="margin-top:12px"><button id="scoreManual" class="ghost">Score eintragen</button><button id="scoreShot" class="secondary">Screenshot</button></div>
 <p class="small muted">Demo: Fremde Highscores werden nicht automatisch ausgelesen. Die offizielle Integration ist nur möglich, wenn der Spieleentwickler eine erlaubte Schnittstelle anbietet.</p>`);
}

function settingsView(){
 return `<div class="section-pad"><div class="privacy-banner"><b>🔐 Datenschutz-Zentrale</b><br><span class="small">Du entscheidest, wer Standort, Stories, Kalender und Notfallinformationen sehen darf.</span></div></div>
 ${settingGroup('Konto & Familie',[
 ['👤','Profil & Geburtstag','Name, Bild, Geburtstag','profile'],
 ['👨‍👩‍👧‍👦','Familiengruppe','Mitglieder, Rollen, Einladungen','family'],
 ['🔑','Anmeldung & Sicherheit','Passcode, Face ID, Geräte','security']
 ])}
 ${settingGroup('Sicherheit & Notfall',[
 ['🚨','SOS-Empfänger','Mama, Papa','sosSettings'],
 ['📍','Notfall-Standort','Freigabe & Verlauf','emergencyLocation'],
 ['🛑','Alle Freigaben stoppen','Standort und Sichtbarkeiten beenden','stopSharing']
 ])}
 ${settingGroup('Datenschutz & Berechtigungen',[
 ['🛡️','Datenschutz-Center','Was wird gespeichert und warum?','privacy'],
 ['🎛️','Berechtigungen','Standort, Kamera, Mikrofon, Fotos','permissions'],
 ['👁️','Sichtbarkeit','Stories, Feed, Kalender','visibility'],
 ['🚫','Blockierte Mitglieder','Kontakte verwalten','blocked']
 ])}
 ${settingGroup('Mitteilungen & Darstellung',[
 ['🔔','Benachrichtigungen','Chats, Kalender, SOS','notifications'],
 ['🎨','Darstellung','Hell/Dunkel, Textgröße','appearance'],
 ['🌐','Sprache','Deutsch','language']
 ])}
 ${settingGroup('Deine Daten',[
 ['📦','Daten exportieren','Eigene Daten herunterladen','export'],
 ['🧹','Speicher & Medien','Lokale Medien verwalten','storage'],
 ['🗑️','Konto löschen','Konto und Daten löschen','delete']
 ])}
 <div class="section-pad"><div class="warning-banner"><b>Demo-Hinweis:</b> Diese Testversion sendet keine echten Nachrichten, Push-Mitteilungen, Standortdaten oder Notrufe.</div></div>`;
}
function settingGroup(label,rows){
 return `<section class="setting-group"><div class="setting-title">${label}</div><div class="setting-list">${rows.map(r=>`<button class="setting-row setting-open" data-setting="${r[3]}"><span class="setting-icon">${r[0]}</span><span class="setting-copy"><b>${r[1]}</b><small>${r[2]}</small></span><span class="chev">›</span></button>`).join('')}</div></section>`;
}
function openSetting(key){
 const data={
 profile:['Profil & Geburtstag',`<div class="form-row"><label>Name</label><input value="Güner"></div><div class="form-row"><label>Geburtstag</label><input type="date" value="1990-01-01"></div><div class="info-banner">Der Geburtstag dient in der echten App dazu, Geburtstage automatisch in den Familienkalender einzutragen.</div>`],
 family:['Familiengruppe',members.map(m=>`<div class="setting-row"><span class="setting-icon">${m.avatar}</span><span class="setting-copy"><b>${m.name}</b><small>${m.name==='Familie'?'Gruppenchat':'Familienmitglied'}</small></span></div>`).join('')],
 security:['Anmeldung & Sicherheit',`<div class="member-check"><span>Face ID verwenden</span><input type="checkbox" checked></div><div class="member-check"><span>App-PIN</span><input type="checkbox"></div><div class="member-check"><span>Neue Geräte bestätigen</span><input type="checkbox" checked></div>`],
 sosSettings:['SOS-Empfänger',members.slice(0,4).map((m,i)=>`<div class="member-check"><span>${m.avatar} ${m.name}</span><input type="checkbox" ${i<2?'checked':''}></div>`).join('')+`<div class="info-banner" style="margin-top:12px">Nur ausgewählte Personen sollen später die SOS-Mitteilung und den freigegebenen Notfall-Standort erhalten.</div>`],
 emergencyLocation:['Notfall-Standort',`<div class="member-check"><span>Aktuellen Standort bei SOS teilen</span><input type="checkbox" checked></div><div class="member-check"><span>Letzte bekannte Positionen anzeigen</span><input type="checkbox" checked></div><div class="form-row"><label>Verlauf in Notfallansicht</label><select><option>5 / 10 / 20 / 60 Minuten</option><option>Nur letzte Position</option></select></div>`],
 stopSharing:['Alle Freigaben stoppen',`<div class="warning-banner"><b>Sofort-Stopp</b><br>Beendet in der echten App alle laufenden Standortfreigaben und setzt Sichtbarkeiten zurück.</div><button class="danger wide" style="margin-top:12px">Alle Freigaben stoppen · Demo</button>`],
 privacy:['Datenschutz-Center',`<div class="privacy-banner"><b>Grundprinzip:</b> Nur Daten verwenden, die für die jeweilige Funktion nötig sind.</div>
 <div class="setting-row"><span class="setting-icon">📍</span><span class="setting-copy"><b>Standort</b><small>Nur nach deiner Freigabe; Empfänger und Dauer wählbar.</small></span></div>
 <div class="setting-row"><span class="setting-icon">📷</span><span class="setting-copy"><b>Fotos & Kamera</b><small>Nur wenn du Medien aufnehmen oder auswählen möchtest.</small></span></div>
 <div class="setting-row"><span class="setting-icon">🎙️</span><span class="setting-copy"><b>Mikrofon</b><small>Nur für Sprachnachrichten und Anrufe.</small></span></div>
 <div class="setting-row"><span class="setting-icon">🗓️</span><span class="setting-copy"><b>Kalender</b><small>Eigene FamilyCircle-Termine und Sichtbarkeit pro Mitglied.</small></span></div>
 <p class="small muted">Vor einer App-Store-Version werden hier die vollständige Datenschutzerklärung, Aufbewahrungsfristen, Widerrufsmöglichkeiten und Kontaktinformationen ergänzt.</p>`],
 permissions:['Berechtigungen',`<div class="member-check"><span>📍 Standort</span><span class="small muted">Nicht geprüft · Demo</span></div><div class="member-check"><span>📷 Kamera</span><span class="small muted">Bei Nutzung fragen</span></div><div class="member-check"><span>🎙️ Mikrofon</span><span class="small muted">Bei Nutzung fragen</span></div><div class="member-check"><span>🖼️ Fotos</span><span class="small muted">Bei Nutzung fragen</span></div><div class="member-check"><span>🔔 Mitteilungen</span><span class="small muted">Bei Nutzung fragen</span></div>`],
 visibility:['Sichtbarkeit',`<div class="form-row"><label>Standard für Stories</label><select><option>Alle Familienmitglieder</option><option>Ausgewählte Mitglieder</option></select></div><div class="form-row"><label>Standard für Feed-Beiträge</label><select><option>Alle Familienmitglieder</option><option>Ausgewählte Mitglieder</option></select></div><div class="form-row"><label>Standard für Kalender</label><select><option>Beim Erstellen fragen</option><option>Alle</option></select></div>`],
 blocked:['Blockierte Mitglieder',`<p class="muted">Keine blockierten Mitglieder.</p><button class="ghost wide">Mitglied auswählen · Demo</button>`],
 notifications:['Benachrichtigungen',`<div class="member-check"><span>💬 Chat-Nachrichten</span><input type="checkbox" checked></div><div class="member-check"><span>📅 Kalender-Erinnerungen</span><input type="checkbox" checked></div><div class="member-check"><span>🚨 SOS-Mitteilungen</span><input type="checkbox" checked></div><div class="member-check"><span>🎮 Spiel-Ranglisten</span><input type="checkbox"></div>`],
 appearance:['Darstellung',`<div class="form-row"><label>Design</label><select><option>System</option><option>Hell</option><option>Dunkel</option></select></div><div class="form-row"><label>Textgröße</label><select><option>Standard</option><option>Groß</option><option>Sehr groß</option></select></div>`],
 language:['Sprache',`<div class="form-row"><label>App-Sprache</label><select><option>Deutsch</option><option>English</option></select></div>`],
 export:['Daten exportieren',`<div class="info-banner">In der echten App sollst du eine Kopie deiner eigenen Daten anfordern können.</div><button class="secondary wide" style="margin-top:12px">Export vorbereiten · Demo</button>`],
 storage:['Speicher & Medien',`<div class="setting-row"><span class="setting-copy"><b>Medien-Cache</b><small>Demo · 0 MB</small></span></div><button class="ghost wide" style="margin-top:12px">Lokalen Cache leeren</button>`],
 delete:['Konto löschen',`<div class="warning-banner"><b>Wichtig:</b> In der echten App löscht diese Funktion dein Konto und die zugehörigen Daten, soweit keine gesetzliche Aufbewahrungspflicht besteht.</div><button class="danger wide" style="margin-top:12px">Kontolöschung starten · Demo</button>`]
 };
 const [heading,body]=data[key]||['Einstellung','Demo'];
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>${heading}</h3><span></span></div>${body}</div>`;
 document.body.appendChild(s);s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelectorAll('button.danger,button.secondary,button.ghost').forEach(b=>{if(!b.classList.contains('close-sheet'))b.addEventListener('click',()=>toast('Demo-Aktion ausgeführt.'))});
}

function bind(){
 document.querySelectorAll('[data-chat]').forEach(r=>r.onclick=()=>openChat(Number(r.dataset.chat)));
 document.querySelectorAll('.row-call').forEach(b=>b.onclick=e=>{e.stopPropagation();startCall(Number(b.dataset.person),false)});
 document.querySelectorAll('.row-video').forEach(b=>b.onclick=e=>{e.stopPropagation();startCall(Number(b.dataset.person),true)});
 document.querySelectorAll('.comment-toggle').forEach(b=>b.onclick=()=>{let id=Number(b.dataset.post),p=document.getElementById('comments'+id);p.classList.toggle('hidden');if(!p.classList.contains('hidden'))renderComments(id)});
 document.querySelectorAll('.open-story').forEach(b=>b.onclick=()=>openStory(Number(b.dataset.story)));
 document.getElementById('createStory')?.addEventListener('click',openStorySheet);
 document.getElementById('newPost')?.addEventListener('click',openPostSheet);
 document.getElementById('postPhoto')?.addEventListener('click',()=>galleryInput.click());
 document.getElementById('postText')?.addEventListener('click',openPostSheet);
 document.getElementById('postAlbum')?.addEventListener('click',()=>galleryInput.click());
 document.getElementById('addEvent')?.addEventListener('click',openEventSheet);
 document.getElementById('calendarFilter')?.addEventListener('click',()=>toast('Demo: Kalender nach sichtbaren Mitgliedern filtern.'));
 document.getElementById('startLocation')?.addEventListener('click',()=>toast('Demo: Standortfreigabe gestartet.'));
 document.getElementById('stopLocation')?.addEventListener('click',()=>toast('Demo: Alle Standortfreigaben beendet.'));
 document.getElementById('openBlock')?.addEventListener('click',()=>toast('Demo: Direkte Block-Blast-Integration wird offiziell geprüft.'));
 document.getElementById('tapGame')?.addEventListener('click',()=>toast('Family Tap Challenge startet in der Demo.'));
 document.getElementById('scoreManual')?.addEventListener('click',()=>toast('Demo: Highscore manuell eintragen.'));
 document.getElementById('scoreShot')?.addEventListener('click',()=>scoreInput.click());
 document.querySelectorAll('.setting-open').forEach(b=>b.onclick=()=>openSetting(b.dataset.setting));
}

function sosModal(){
 modalRoot.innerHTML=`<div class="modal-overlay"><div class="modal-card">
  <h2 style="color:#B42318">🚨 SOS</h2><p>Wollen Sie wirklich einen Alarm auslösen?</p>
  <div class="progress-label">Bestätigung: ${yesCount} von 8</div>
  <div class="dots">${Array.from({length:8},(_,i)=>`<i class="${i<yesCount?'on':''}"></i>`).join('')}</div>
  <p class="small muted">Tippe 8× auf „Ja“ oder insgesamt 8× schnell auf den roten SOS-Knopf. Der Bildschirm bleibt dabei unverändert groß.</p>
  <div class="modal-actions"><button id="sosNo" class="modal-no">Nein</button><button id="sosYes" class="modal-yes">Ja</button></div>
 </div></div>`;
 document.getElementById('sosNo').onclick=()=>{yesCount=0;rapidCount=0;modalRoot.innerHTML=''};
 const yes=document.getElementById('sosYes');
 yes.addEventListener('pointerdown',e=>e.preventDefault());
 yes.onclick=e=>{e.preventDefault();e.stopPropagation();yesCount++;if(yesCount>=8)triggerAlarm();else sosModal()};
}
function triggerAlarm(){
 yesCount=0;rapidCount=0;
 modalRoot.innerHTML=`<div class="modal-overlay"><div class="modal-card sos-result-card"><button id="closeAlarmX" class="modal-x" aria-label="Meldung schließen">✕</button><h2 style="color:#B42318">🚨 NOTFALL AUSGELÖST · DEMO</h2>
 <div class="setting-row"><span class="setting-icon">👤</span><span class="setting-copy"><b>Güner</b><small>Gerade eben</small></span></div>
 <div class="map-card" style="margin-top:10px"><div class="map-road"></div><span class="pin p1">📍</span></div>
 <div class="sos-history"><div class="setting-row"><span>Jetzt</span><b>Aktueller Standort</b></div><div class="setting-row"><span>vor 5 Min</span><span>Letzte Position</span></div><div class="setting-row"><span>vor 10 Min</span><span>Letzte Position</span></div><div class="setting-row"><span>vor 20 Min</span><span>Letzte Position</span></div><div class="setting-row"><span>vor 1 Std</span><span>Letzte Position</span></div></div>
 <div class="warning-banner" style="margin-top:10px">Testmodus: Niemand wurde benachrichtigt und kein Standort übertragen.</div>
 <button id="closeAlarm" class="primary wide" style="margin-top:12px">Demo schließen</button></div></div>`;
 document.getElementById('closeAlarm').onclick=()=>modalRoot.innerHTML='';document.getElementById('closeAlarmX').onclick=()=>modalRoot.innerHTML='';
}

sosBtn.addEventListener('pointerdown',e=>e.preventDefault());
sosBtn.addEventListener('click',e=>{
 e.preventDefault();e.stopPropagation();
 const now=Date.now();rapidCount=(now-lastSosTap<1200)?rapidCount+1:1;lastSosTap=now;
 if(rapidCount>=8){triggerAlarm();return}
 if(!modalRoot.innerHTML)sosModal();
});

navItems.forEach(b=>b.onclick=()=>show(b.dataset.tab));
statusTop.onclick=showStatus;feedTop.onclick=()=>show('feed');settingsTop.onclick=()=>show('settings');

galleryInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: '+e.target.files[0].name+' ausgewählt. Story-/Beitragseditor wäre der nächste Schritt.');e.target.value=''}};
cameraInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: Kamera-Medium ausgewählt.');e.target.value=''}};
scoreInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: Highscore-Screenshot ausgewählt.');e.target.value=''}};

if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js?v=14');}
show('chat');

if(circleSwitchBtn){circleSwitchBtn.onclick=openCircleSwitcher; document.body.dataset.circle=activeCircle().theme; updateCircleHeader();}
