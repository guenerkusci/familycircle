
// Cirvela V37: aggressively remove stale demo caches/service workers from older test builds.
(async function resetOldDemoCache(){
  try{
    if ('caches' in window){
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator){
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
  }catch(e){ console.warn('Cache cleanup skipped', e); }
})();

const content=document.getElementById('content');
const title=document.getElementById('pageTitle');
const modalRoot=document.getElementById('modalRoot');
const settingsTop=document.getElementById('settingsTop');
const hubTop=document.getElementById('hubTop');
const galleryInput=document.getElementById('galleryInput');
const cameraInput=document.getElementById('cameraInput');
const scoreInput=document.getElementById('scoreInput');
const navItems=[...document.querySelectorAll('.nav-item')];
const sosBtn=document.getElementById('sosBtn');
const circleSwitchBtn=document.getElementById('circleSwitchBtn');
const circleNameTop=document.getElementById('circleNameTop');
const circleUnreadTop=document.getElementById('circleUnreadTop');
const circleCarousel=document.getElementById('circleCarousel');

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
 },
 couple:{
   id:'couple',name:'CoupleCircle',label:'Wir zwei',icon:'❤️',theme:'couple',unread:1,lastActivity:'Alex: Abendessen um 19 Uhr?',
   members:[{name:'Alex',avatar:'🥰',online:true},{name:'Du',avatar:'🙂',online:true},{name:'Wir',avatar:'❤️',online:true}],
   chats:[{name:'Alex',avatar:'🥰',preview:'Abendessen um 19 Uhr?',time:'18:05',badge:1},{name:'Wir',avatar:'❤️',preview:'Gemeinsame Liste aktualisiert',time:'Heute',badge:0}]
 },
 travel:{
   id:'travel',name:'TravelCircle',label:'Reisegruppe',icon:'✈️',theme:'travel',unread:3,lastActivity:'Mia: Tickets sind gespeichert ✈️',
   members:[{name:'Mia',avatar:'🧳',online:true},{name:'Jonas',avatar:'😎',online:false},{name:'Lea',avatar:'🌴',online:true},{name:'Reisegruppe',avatar:'✈️',online:true}],
   chats:[{name:'Mia',avatar:'🧳',preview:'Tickets sind gespeichert ✈️',time:'16:21',badge:2},{name:'Jonas',avatar:'😎',preview:'Hotel sieht super aus',time:'15:48',badge:1},{name:'Lea',avatar:'🌴',preview:'Packliste ergänzt',time:'Heute',badge:0},{name:'Reisegruppe',avatar:'✈️',preview:'Abflug 08:10',time:'Morgen',badge:3}]
 },
 school:{
   id:'school',name:'SchoolCircle',label:'Schule',icon:'🎓',theme:'school',unread:2,lastActivity:'Frau Weber: Elternabend am Donnerstag',
   members:[{name:'Frau Weber',avatar:'👩‍🏫',online:true},{name:'Emma',avatar:'🧒',online:false},{name:'Tom',avatar:'👦',online:true},{name:'Schule',avatar:'🎓',online:true}],
   chats:[{name:'Frau Weber',avatar:'👩‍🏫',preview:'Elternabend am Donnerstag',time:'14:10',badge:2},{name:'Emma',avatar:'🧒',preview:'Hausaufgaben erledigt',time:'13:44',badge:0},{name:'Tom',avatar:'👦',preview:'Mathe Seite 42',time:'12:30',badge:0},{name:'Schule',avatar:'🎓',preview:'Stundenplan aktualisiert',time:'Heute',badge:1}]
 }
};

let currentCircleId='family';
function activeCircle(){return circlePresets[currentCircleId]||circlePresets.family;}

const circleDesignCatalog={
 family:[
  {id:'warm',name:'Warm Home',desc:'Creme, warmes Blau und ruhige Familienfarben',accent:'#3467C8',tint:'#EDF3FF',surface:'#FFF8EF',chat:'#F2ECE3',panel:'#FFFDF9',nav:'#F8FAFE',pattern:'soft'},
  {id:'sage',name:'Sage',desc:'Salbei, Eukalyptus und natürliche Flächen',accent:'#3D7B69',tint:'#EAF5F0',surface:'#F4F8F3',chat:'#EAF1EA',panel:'#FBFDFB',nav:'#F4F8F5',pattern:'leaf'},
  {id:'coast',name:'Coastal',desc:'Helles Blau, Sand und frische Kontraste',accent:'#2477A8',tint:'#E7F4FB',surface:'#F7FBFD',chat:'#EAF4F7',panel:'#FFFFFF',nav:'#F2F9FC',pattern:'wave'}
 ],
 friends:[
  {id:'violet',name:'Violet Night',desc:'Violett und Indigo mit moderner Social-Note',accent:'#6857D9',tint:'#F0EDFF',surface:'#F8F7FD',chat:'#EFEAF8',panel:'#FFFFFF',nav:'#F7F5FF',pattern:'dots'},
  {id:'mint',name:'Mint Club',desc:'Mint, Petrol und klare helle Flächen',accent:'#168A7A',tint:'#E8F7F4',surface:'#F5FBFA',chat:'#E8F3F0',panel:'#FFFFFF',nav:'#F1FAF8',pattern:'soft'},
  {id:'sunset',name:'Sunset',desc:'Koralle, Pfirsich und Violett als Akzente',accent:'#C45F6B',tint:'#FFF0EE',surface:'#FFF9F7',chat:'#F6ECEA',panel:'#FFFFFF',nav:'#FFF5F2',pattern:'sunset'}
 ],
 girls:[
  {id:'bloom',name:'Bloom',desc:'Florale Rosé- und Lavendeltöne mit feinem Blütenmuster',accent:'#A14979',tint:'#FAEDF5',surface:'#FFF8FC',chat:'#F7EAF3',panel:'#FFFCFE',nav:'#FFF4FA',pattern:'flowers'},
  {id:'lavender',name:'Lavender',desc:'Lavendel und Puderblau, elegant statt verspielt',accent:'#7560B5',tint:'#F1EDFA',surface:'#FAF8FD',chat:'#F0ECF7',panel:'#FFFFFF',nav:'#F7F4FC',pattern:'petals'},
  {id:'rose-noir',name:'Rose Noir',desc:'Altrosa, Anthrazit und elegante Kontraste',accent:'#8A3E5A',tint:'#F7E9EF',surface:'#FCF7F9',chat:'#F0E8EB',panel:'#FFFFFF',nav:'#F8F2F5',pattern:'soft'}
 ],
 work:[
  {id:'slate',name:'Slate',desc:'Schiefergrau, Stahlblau und klare Business-Flächen',accent:'#365B7D',tint:'#EAF0F6',surface:'#F5F7FA',chat:'#EAF0F7',panel:'#FFFFFF',nav:'#F0F4F8',pattern:'grid'},
  {id:'cobalt',name:'Cobalt',desc:'Sattes Blau und kühle neutrale Flächen',accent:'#2457B2',tint:'#E9F0FF',surface:'#F7F9FD',chat:'#EAF0F8',panel:'#FFFFFF',nav:'#F3F6FC',pattern:'lines'},
  {id:'graphite',name:'Graphite',desc:'Dunkle Akzente mit hellem, minimalem Unterbau',accent:'#414A59',tint:'#ECEFF2',surface:'#F6F7F8',chat:'#ECEFF2',panel:'#FFFFFF',nav:'#F2F3F5',pattern:'soft'}
 ],
 sport:[
  {id:'field',name:'Field',desc:'Grün, Kreideweiß und dynamische Sportflächen',accent:'#2C7A4B',tint:'#E9F5ED',surface:'#F7FBF8',chat:'#EAF4EA',panel:'#FFFFFF',nav:'#F1F8F3',pattern:'field'},
  {id:'navy',name:'Navy Team',desc:'Navy, Eisblau und klare Team-Kontraste',accent:'#264A7C',tint:'#EAF0F8',surface:'#F7F9FC',chat:'#E9EFF5',panel:'#FFFFFF',nav:'#F1F5FA',pattern:'lines'},
  {id:'energy',name:'Energy',desc:'Petrol mit orangem Energiekontrast',accent:'#147D79',tint:'#E6F5F3',surface:'#F6FBFA',chat:'#E8F2F0',panel:'#FFFFFF',nav:'#F0F9F7',pattern:'energy'}
 ],
 couple:[
  {id:'rose',name:'Soft Rose',desc:'Rosenholz, Creme und warme private Atmosphäre',accent:'#9C5365',tint:'#F9EBEF',surface:'#FFF9FA',chat:'#F5EBED',panel:'#FFFFFF',nav:'#FCF3F5',pattern:'hearts'},
  {id:'dusk',name:'Dusk',desc:'Mauve, Abendblau und ruhige Übergänge',accent:'#6F597B',tint:'#F0EAF3',surface:'#FAF8FB',chat:'#EEE9F0',panel:'#FFFFFF',nav:'#F6F2F7',pattern:'soft'},
  {id:'wine',name:'Wine',desc:'Bordeaux-Akzent mit zurückhaltendem Beige',accent:'#7D3545',tint:'#F5E8EB',surface:'#FCF8F7',chat:'#F1E9E7',panel:'#FFFFFF',nav:'#F8F2F1',pattern:'soft'}
 ],
 travel:[
  {id:'coastal',name:'Coastal Trip',desc:'Meerblau, Sand und helle Reiseflächen',accent:'#247C9D',tint:'#E8F5F8',surface:'#F8FBFA',chat:'#EDF3EF',panel:'#FFFFFF',nav:'#F3FAFB',pattern:'wave'},
  {id:'terracotta',name:'Terracotta',desc:'Terrakotta, Sand und warme Reiseerinnerungen',accent:'#B46549',tint:'#FBEDE7',surface:'#FFF9F5',chat:'#F3ECE4',panel:'#FFFFFF',nav:'#FCF4EF',pattern:'sunset'},
  {id:'sky',name:'Sky',desc:'Himmelblau und klares Weiß',accent:'#3B78B4',tint:'#EAF4FF',surface:'#F8FBFF',chat:'#EAF2F8',panel:'#FFFFFF',nav:'#F3F8FD',pattern:'clouds'}
 ],
 school:[
  {id:'study',name:'Study',desc:'Tintenblau, Papierweiß und strukturierte Flächen',accent:'#40608A',tint:'#ECF1F8',surface:'#FAFBFD',chat:'#EDF1F5',panel:'#FFFFFF',nav:'#F5F7FA',pattern:'paper'},
  {id:'mint',name:'Fresh Mint',desc:'Mint und Blau für einen ruhigen Lernbereich',accent:'#357B70',tint:'#E9F5F1',surface:'#F8FBFA',chat:'#EAF2EF',panel:'#FFFFFF',nav:'#F2F8F6',pattern:'grid'},
  {id:'navy',name:'Classic Navy',desc:'Klassisch, seriös und kontrastreich',accent:'#334F76',tint:'#EAF0F7',surface:'#F7F9FC',chat:'#E9EEF5',panel:'#FFFFFF',nav:'#F1F5F9',pattern:'lines'}
 ]
};
const universalDesigns=[
 {id:'sunrise',name:'Sunrise',desc:'Warme Morgenfarben und weiche Flächen',accent:'#D85B38',tint:'#FFF0E8',surface:'#FFF8F2',chat:'#F8EADF',panel:'#FFFFFF',nav:'#FFF5EE',pattern:'sunset'},
 {id:'ocean-deep',name:'Ocean Blue',desc:'Tiefes Blau mit klaren hellen Flächen',accent:'#1268A8',tint:'#E8F4FB',surface:'#F5FAFD',chat:'#E6F1F7',panel:'#FFFFFF',nav:'#F0F8FC',pattern:'wave'},
 {id:'forest',name:'Forest',desc:'Waldgrün und natürliche ruhige Töne',accent:'#2F6F4D',tint:'#EAF5EE',surface:'#F5FAF6',chat:'#E8F1E9',panel:'#FFFFFF',nav:'#F1F8F3',pattern:'leaf'},
 {id:'blossom',name:'Blossom',desc:'Zartes Rosé mit floraler Struktur',accent:'#D44D88',tint:'#FDEAF3',surface:'#FFF8FB',chat:'#F8E5EF',panel:'#FFFFFF',nav:'#FFF2F8',pattern:'flowers'},
 {id:'aurora',name:'Aurora',desc:'Violett, Blau und kühle Lichtakzente',accent:'#6553B8',tint:'#EFECFB',surface:'#F8F7FD',chat:'#ECE8F7',panel:'#FFFFFF',nav:'#F5F2FC',pattern:'aurora'},
 {id:'night',name:'Night Sky',desc:'Dunkles Navy mit kontrastreichen Flächen',accent:'#364C78',tint:'#E9EDF5',surface:'#F5F7FA',chat:'#E4E8F0',panel:'#FFFFFF',nav:'#EFF2F7',pattern:'night'},
 {id:'sand',name:'Warm Sand',desc:'Sand, Creme und dezente Terrakotta',accent:'#A66A42',tint:'#F8EEE4',surface:'#FCF8F3',chat:'#F1E8DE',panel:'#FFFFFF',nav:'#F8F2EC',pattern:'soft'},
 {id:'mint-universal',name:'Mint',desc:'Frisches Mint mit ruhigem Petrol',accent:'#258573',tint:'#E8F6F2',surface:'#F6FBF9',chat:'#E5F1ED',panel:'#FFFFFF',nav:'#F0F9F6',pattern:'soft'},
 {id:'sky-universal',name:'Sky Blue',desc:'Luftiges Himmelblau und Weiß',accent:'#3D7EBB',tint:'#EAF4FF',surface:'#F8FBFF',chat:'#E7F1F8',panel:'#FFFFFF',nav:'#F3F8FD',pattern:'clouds'},
 {id:'minimal',name:'Minimal',desc:'Fast weiß, klare Linien, dezente Akzente',accent:'#545B66',tint:'#F1F3F5',surface:'#FAFAFB',chat:'#F1F2F4',panel:'#FFFFFF',nav:'#F7F8F9',pattern:'soft'},
 {id:'cherry',name:'Cherry',desc:'Kirschrot, Rosé und helle Kontraste',accent:'#C93555',tint:'#FBE9EE',surface:'#FFF8FA',chat:'#F5E5EA',panel:'#FFFFFF',nav:'#FCF1F4',pattern:'flowers'},
 {id:'tropical',name:'Tropical',desc:'Türkis, Grün und sonnige Akzente',accent:'#168C86',tint:'#E5F7F5',surface:'#F5FBFA',chat:'#E4F1EC',panel:'#FFFFFF',nav:'#EFF9F7',pattern:'leaf'}
];

function getAppAppearance(){
 return localStorage.getItem('cirvela-app-appearance')||'system';
}
function resolvedAppAppearance(mode=getAppAppearance()){
 if(mode==='dark') return 'dark';
 if(mode==='light') return 'light';
 return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
function applyAppAppearance(mode=getAppAppearance()){
 const normalized=['system','light','dark'].includes(mode)?mode:'system';
 localStorage.setItem('cirvela-app-appearance',normalized);
 document.documentElement.dataset.appAppearance=resolvedAppAppearance(normalized);
 document.documentElement.dataset.appAppearanceMode=normalized;
}
if(window.matchMedia){
 const cirvelaScheme=window.matchMedia('(prefers-color-scheme: dark)');
 const refreshSystemAppearance=()=>{if(getAppAppearance()==='system')applyAppAppearance('system')};
 if(cirvelaScheme.addEventListener)cirvelaScheme.addEventListener('change',refreshSystemAppearance);
}

function designOptionsForCircle(id){
 const base=circleDesignCatalog[id]||circleDesignCatalog.family;
 const seen=new Set();return [...base,...universalDesigns].filter(d=>!seen.has(d.id)&&seen.add(d.id));
}
const defaultCircleDesign={family:'warm',friends:'violet',girls:'bloom',work:'slate',sport:'field',couple:'rose',travel:'coastal',school:'study'};
function getCircleDesigns(){try{return JSON.parse(localStorage.getItem('cirvela-circle-designs')||'{}')}catch(e){return {}}}
function getCircleDesignConfig(id){
 const saved=getCircleDesigns();const raw=saved[id];const fallback=defaultCircleDesign[id]||designOptionsForCircle(id)[0]?.id||'warm';
 if(typeof raw==='string')return {top:raw,chat:raw};
 return {top:raw?.top||fallback,chat:raw?.chat||fallback};
}
function getCircleDesign(id){const c=getCircleDesignConfig(id);return c.top===c.chat?c.top:c.top}
function setCircleDesign(id,design,target='both'){
 const saved=getCircleDesigns();const cfg=getCircleDesignConfig(id);
 if(target==='top')cfg.top=design; else if(target==='chat')cfg.chat=design; else cfg.top=cfg.chat=design;
 saved[id]=cfg;localStorage.setItem('cirvela-circle-designs',JSON.stringify(saved));if(id===currentCircleId)applyCircleDesign(id);renderCircleCarousel();
}
function designData(id,designId){return designOptionsForCircle(id).find(x=>x.id===designId)||designOptionsForCircle(id)[0]}
function applyCircleDesign(id=currentCircleId){
 const cfg=getCircleDesignConfig(id),top=designData(id,cfg.top),chat=designData(id,cfg.chat);
 document.body.dataset.circleDesignTop=top.id;document.body.dataset.circleDesignChat=chat.id;document.body.dataset.circlePattern=chat.pattern||'soft';
 const s=document.documentElement.style;
 s.setProperty('--circle-accent',top.accent);s.setProperty('--circle-tint',top.tint);s.setProperty('--circle-surface',top.surface);s.setProperty('--circle-panel',top.panel);s.setProperty('--circle-nav',top.nav);
 s.setProperty('--circle-chat',chat.chat);s.setProperty('--circle-chat-accent',chat.accent);s.setProperty('--circle-chat-tint',chat.tint);
}
function circleDesignPreview(id,selected,target='both'){
 const list=designOptionsForCircle(id);
 return `<div class="circle-design-grid">${list.map(d=>`<div class="circle-design-card ${d.id===selected?'selected':''}" data-circle-design-card="${d.id}" style="--preview-accent:${d.accent};--preview-tint:${d.tint};--preview-chat:${d.chat}"><span class="design-preview"><i></i><i></i><i></i></span><b>${d.name}</b><small>${d.desc}</small>${d.id===selected?'<em>Ausgewählt</em>':''}<button type="button" class="design-apply-btn" data-circle-design-apply="${d.id}">${d.id===selected?'Übernommen':'Übernehmen'}</button></div>`).join('')}</div>`;
}

const chatBackgrounds={
 default:{name:'Circle-Design',className:'chat-bg-default'},
 linen:{name:'Linen',className:'chat-bg-linen'},
 mist:{name:'Mist',className:'chat-bg-mist'},
 botanical:{name:'Botanical',className:'chat-bg-botanical'},
 dusk:{name:'Dusk',className:'chat-bg-dusk'},
 ocean:{name:'Ocean',className:'chat-bg-ocean'},
 rose:{name:'Rose',className:'chat-bg-rose'}
};
function chatBackgroundKey(){return `cirvela-chat-bg-${currentCircleId}-${currentChat===null?'group':'chat-'+currentChat}`}
function chatCustomBackgroundKey(){return chatBackgroundKey()+'-custom'}
function getChatBackground(){return localStorage.getItem(chatBackgroundKey())||'default'}
function setChatBackground(id){localStorage.setItem(chatBackgroundKey(),id);applyChatBackground();}
function applyChatBackground(){
 const el=document.getElementById('messages');if(!el)return;
 Object.values(chatBackgrounds).forEach(x=>el.classList.remove(x.className));el.classList.remove('chat-bg-custom');el.style.removeProperty('--custom-chat-bg');
 const id=getChatBackground();
 if(id==='custom'){
  const img=localStorage.getItem(chatCustomBackgroundKey());if(img){el.classList.add('chat-bg-custom');el.style.setProperty('--custom-chat-bg',`url(${JSON.stringify(img)})`)}else el.classList.add('chat-bg-default');
 }else el.classList.add((chatBackgrounds[id]||chatBackgrounds.default).className);
}
function openChatBackgroundPicker(){
 const chosen=getChatBackground();
 const s=document.createElement('div');s.className='sheet chat-wallpaper-sheet';
 s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Chat-Hintergrund</h3><span></span></div><p class="small muted">Dieser Hintergrund gilt nur für diesen Chat. Das Circle-Design bleibt davon unabhängig.</p><div class="wallpaper-grid">${Object.entries(chatBackgrounds).map(([id,b])=>`<button class="wallpaper-card ${id===chosen?'selected':''}" data-wallpaper="${id}"><span class="wallpaper-swatch ${b.className}"></span><b>${b.name}</b></button>`).join('')}<button class="wallpaper-card ${chosen==='custom'?'selected':''}" id="customWallpaper"><span class="wallpaper-swatch wallpaper-custom">＋</span><b>Eigenes Bild</b></button></div><button id="resetWallpaper" class="ghost wide" style="margin-top:12px">Standard wiederherstellen</button></div>`;
 document.body.appendChild(s);
 s.querySelector('.close-sheet').onclick=()=>s.remove();s.onclick=e=>{if(e.target===s)s.remove()};
 s.querySelectorAll('[data-wallpaper]').forEach(b=>b.onclick=()=>{setChatBackground(b.dataset.wallpaper);s.remove();toast('Chat-Hintergrund geändert')});
 s.querySelector('#resetWallpaper').onclick=()=>{localStorage.removeItem(chatBackgroundKey());localStorage.removeItem(chatCustomBackgroundKey());applyChatBackground();s.remove();toast('Standard-Hintergrund wiederhergestellt')};
 s.querySelector('#customWallpaper').onclick=()=>chooseCustomChatWallpaper(s);
}
function chooseCustomChatWallpaper(sheet){
 const input=document.createElement('input');input.type='file';input.accept='image/*';input.hidden=true;document.body.appendChild(input);
 input.onchange=()=>{const file=input.files?.[0];if(!file){input.remove();return}const reader=new FileReader();reader.onload=()=>{
   const img=new Image();img.onload=()=>{try{const max=1000,scale=Math.min(1,max/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);const data=canvas.toDataURL('image/jpeg',.72);localStorage.setItem(chatCustomBackgroundKey(),data);localStorage.setItem(chatBackgroundKey(),'custom');applyChatBackground();sheet.remove();toast('Eigenes Hintergrundbild gespeichert')}catch(e){toast('Bild konnte nicht gespeichert werden')}input.remove()};img.src=reader.result;};reader.readAsDataURL(file)};input.click();
}
function setupChatBackgroundLongPress(){
 const area=document.getElementById('messages');if(!area)return;let timer=null,startX=0,startY=0;
 const cancel=()=>{if(timer){clearTimeout(timer);timer=null}};
 area.addEventListener('pointerdown',e=>{if(e.target.closest('.bubble,button,a,input,textarea'))return;startX=e.clientX;startY=e.clientY;cancel();timer=setTimeout(()=>{timer=null;navigator.vibrate?.(20);openChatBackgroundPicker()},650)});
 area.addEventListener('pointermove',e=>{if(Math.hypot(e.clientX-startX,e.clientY-startY)>12)cancel()});
 area.addEventListener('pointerup',cancel);area.addEventListener('pointercancel',cancel);area.addEventListener('contextmenu',e=>{if(!e.target.closest('.bubble'))e.preventDefault()});
}


function getFeedScope(){
 return localStorage.getItem('fc-feed-scope') || 'circle';
}
function setFeedScope(value){
 const v=['all','custom'].includes(value)?value:'circle';
 localStorage.setItem('fc-feed-scope',v);
 return v;
}
function getCustomFeedCircles(){
 try{return JSON.parse(localStorage.getItem('fc-custom-feed')||'["family","friends","girls"]')}catch(e){return ['family','friends','girls']}
}
function setCustomFeedCircles(ids){localStorage.setItem('fc-custom-feed',JSON.stringify(ids));}
function feedScopeLabel(v){return v==='all'?'Alle Circles zusammen':v==='custom'?'Mein Feed':'Nur aktueller Circle'}

function unreadOutsideCurrent(){
 return Object.values(circlePresets).reduce((sum,c)=>sum+(c.id===currentCircleId?0:circleUnreadCount(c)),0);
}
function unreadLabel(n){return n>99?'99+':String(n);}
function circleUnreadCount(c){
 const chatTotal=(c.chats||[]).reduce((sum,x)=>sum+(Number(x.badge)||0),0);
 return Math.max(Number(c.unread)||0,chatTotal);
}

function getCircleOrder(){
 const saved=JSON.parse(localStorage.getItem('cirvela-circle-order')||'null');
 const ids=Object.keys(circlePresets);
 if(Array.isArray(saved)){
   const clean=saved.filter(id=>ids.includes(id));
   ids.forEach(id=>{if(!clean.includes(id))clean.push(id)});
   return clean;
 }
 return ids;
}
function saveCircleOrder(order){localStorage.setItem('cirvela-circle-order',JSON.stringify(order))}
function getPinnedCircles(){
 const saved=JSON.parse(localStorage.getItem('cirvela-pinned-circles')||'[]');
 return Array.isArray(saved)?saved.filter(id=>circlePresets[id]).slice(0,3):[];
}
function savePinnedCircles(ids){
 const clean=[...new Set(ids.filter(id=>circlePresets[id]))].slice(0,3);
 localStorage.setItem('cirvela-pinned-circles',JSON.stringify(clean));
}
function normalizedCircleOrder(){
 const order=getCircleOrder();
 const pinned=getPinnedCircles();
 const rest=order.filter(id=>!pinned.includes(id));
 return [...pinned,...rest];
}
function toggleCirclePin(id){
 const pinned=getPinnedCircles();
 if(pinned.includes(id)){
   savePinnedCircles(pinned.filter(x=>x!==id));
   saveCircleOrder(normalizedCircleOrder());
   renderCircleCarousel();
   toast(circlePresets[id].name+' gelöst');
   return;
 }
 if(pinned.length>=3){
   toast('Maximal drei Circles können fixiert werden.');
   return;
 }
 savePinnedCircles([...pinned,id]);
 saveCircleOrder(normalizedCircleOrder());
 renderCircleCarousel();
 toast(circlePresets[id].name+' fixiert');
}
function moveCircle(id,targetId){
 if(id===targetId)return;
 const pinned=getPinnedCircles();
 if(pinned.includes(id))return;
 if(pinned.includes(targetId))return;

 const order=normalizedCircleOrder();
 const from=order.indexOf(id),to=order.indexOf(targetId);
 if(from<0||to<0)return;

 order.splice(from,1);
 let insertAt=order.indexOf(targetId);
 if(insertAt<0)insertAt=order.length;
 insertAt=Math.max(pinned.length,insertAt);
 order.splice(insertAt,0,id);
 saveCircleOrder(order);
 renderCircleCarousel();
}
function bindCircleGestures(){
 const items=[...document.querySelectorAll('.circle-carousel-item')];

 items.forEach(el=>{
   const id=el.dataset.circle;
   let longTimer=null;
   let startX=0,startY=0,startedAt=0;
   let moved=false,dragging=false,longOpened=false,suppressClick=false;

   const pinnedNow=()=>getPinnedCircles().includes(id);
   const clearTimer=()=>{if(longTimer){clearTimeout(longTimer);longTimer=null}};
   const clearMenu=()=>{
     document.querySelectorAll('.circle-pin-pop').forEach(x=>x.remove());
     el.classList.remove('circle-hold');
   };
   const openPinMenu=()=>{
     if(moved||dragging||longOpened)return;
     longOpened=true;
     el.classList.add('circle-hold');
     document.querySelectorAll('.circle-pin-pop').forEach(x=>x.remove());
     const menu=document.createElement('button');
     menu.type='button';
     menu.className='circle-pin-pop';
     menu.textContent=pinnedNow()?'LÖSEN':'FIXIEREN';
     const r=el.getBoundingClientRect();
     const menuW=150, menuH=46, gap=30;
     menu.style.left=Math.max(8,Math.min(window.innerWidth-menuW-8,r.left+r.width/2-menuW/2))+'px';
     const below=r.bottom+gap;
     const above=r.top-gap-menuH;
     menu.style.top=(below+menuH<=window.innerHeight-8?below:Math.max(8,above))+'px';
     menu.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation()});
     menu.addEventListener('click',ev=>{
       ev.preventDefault();ev.stopPropagation();
       suppressClick=true;
       toggleCirclePin(id);
       clearMenu();
       setTimeout(()=>suppressClick=false,250);
     });
     document.body.appendChild(menu);
   };
   const begin=(x,y)=>{
     clearTimer();clearMenu();
     startX=x;startY=y;startedAt=Date.now();
     moved=false;dragging=false;longOpened=false;suppressClick=false;
     longTimer=setTimeout(openPinMenu,650);
   };
   const move=(x,y,event)=>{
     const dx=x-startX,dy=y-startY;
     if(Math.hypot(dx,dy)<=9)return;

     moved=true;
     clearTimer();
     clearMenu();

     // Fixierte Circles bleiben vollständig unbeweglich.
     if(pinnedNow()){
       dragging=false;
       suppressClick=true;
       return;
     }

     // Schnelles horizontales Wischen = normales Scrollen.
     // Sortieren erst nach bewusstem Halten + Ziehen.
     const held=Date.now()-startedAt;
     if(held>=320 && Math.abs(dx)>Math.abs(dy)){
       dragging=true;
       suppressClick=true;
       el.classList.add('circle-dragging');
       if(event?.cancelable)event.preventDefault();
     }
   };
   const finish=(x,y)=>{
     clearTimer();
     el.classList.remove('circle-hold');
     if(dragging){
       el.classList.remove('circle-dragging');
       const target=document.elementFromPoint(x,y)?.closest('.circle-loose-track .circle-carousel-item');
       if(target)moveCircle(id,target.dataset.circle);
       suppressClick=true;
       setTimeout(()=>suppressClick=false,300);
     }else if(moved){
       suppressClick=true;
       setTimeout(()=>suppressClick=false,140);
     }
     dragging=false;
   };

   el.addEventListener('pointerdown',e=>begin(e.clientX,e.clientY));
   el.addEventListener('pointermove',e=>move(e.clientX,e.clientY,e),{passive:false});
   el.addEventListener('pointerup',e=>finish(e.clientX,e.clientY));
   el.addEventListener('pointercancel',()=>{clearTimer();clearMenu();el.classList.remove('circle-dragging');el.classList.remove('circle-hold')});

   el.addEventListener('touchstart',e=>{
     if(e.touches.length!==1)return;
     const t=e.touches[0]; begin(t.clientX,t.clientY);
   },{passive:true});
   el.addEventListener('touchmove',e=>{
     if(e.touches.length!==1)return;
     const t=e.touches[0]; move(t.clientX,t.clientY,e);
   },{passive:false});
   el.addEventListener('touchend',e=>{
     const t=e.changedTouches&&e.changedTouches[0];
     if(t)finish(t.clientX,t.clientY);
   },{passive:true});

   el.addEventListener('contextmenu',e=>{e.preventDefault();openPinMenu()});
   el.addEventListener('click',e=>{
     if(suppressClick||longOpened||e.target.closest('.circle-pin-pop')){
       e.preventDefault();e.stopImmediatePropagation();
     }
   },true);
 });
}
function renderCircleCarousel(){
 const host=document.getElementById('circleCarousel'); if(!host)return;
 const order=normalizedCircleOrder();
 const pinned=getPinnedCircles();
 const pinnedOrder=pinned.filter(id=>order.includes(id));
 const looseOrder=order.filter(id=>!pinned.includes(id));

 const tile=id=>{
   const c=circlePresets[id],cfg=getCircleDesignConfig(id),theme=designData(id,cfg.top);
   const unread=c.unread||0;
   return `<button class="circle-carousel-item ${id===currentCircleId?'active':''} ${pinned.includes(id)?'pinned':''}" data-circle="${id}" style="--circle-accent:${theme.accent}">
     <span class="circle-avatar-ring"><span class="circle-avatar">${c.icon||c.avatar||'◯'}</span>${unread?`<span class="circle-unread">${unread}</span>`:''}${pinned.includes(id)?'<span class="circle-pin-dot">●</span>':''}</span>
     <span class="circle-carousel-name">${c.name}</span>
   </button>`;
 };

 host.innerHTML=`<div class="circle-pinned-track ${pinnedOrder.length?'has-pinned':''}">${pinnedOrder.map(tile).join('')}</div><div class="circle-loose-track">${looseOrder.map(tile).join('')}</div>`;

 host.querySelectorAll('.circle-carousel-item').forEach(b=>b.onclick=e=>{
   if(e.defaultPrevented||e.target.closest('.circle-pin-pop')||b.classList.contains('circle-dragging'))return;
   applyCircle(b.dataset.circle);
 });
 bindCircleGestures();
}
function updateCircleHeader(){
 const c=activeCircle();
 renderCircleCarousel();
 circleNameTop.textContent=c.name;
 const total=unreadOutsideCurrent();
 if(total>0){
   circleUnreadTop.hidden=false;
   circleUnreadTop.textContent=unreadLabel(total);const ha=document.getElementById('hubAlert');if(ha){ha.hidden=false;ha.textContent=unreadLabel(total)};
   circleSwitchBtn.setAttribute('aria-label',`${c.name} · ${total} ungelesene Nachrichten in anderen Circles`);
 }else{
   circleUnreadTop.hidden=true;
   circleUnreadTop.textContent='0';const ha=document.getElementById('hubAlert');if(ha){ha.hidden=true;ha.textContent='0'};
   circleSwitchBtn.setAttribute('aria-label',`${c.name} · Circle wechseln`);
 }
}
function applyCircle(id){
 const c=circlePresets[id]; if(!c)return;
 const sectionBeforeSwitch=current;
 currentCircleId=id;
 members=c.members.map(x=>({...x}));
 chatData=c.chats.map(x=>({...x}));
 document.body.dataset.circle=c.theme;
 applyCircleDesign(id);
 updateCircleHeader();
 modalRoot.innerHTML='';
 const keepSection=['calendar','location','games','status','feed'].includes(sectionBeforeSwitch);
 if(sectionBeforeSwitch==='feed') feedCircleFocus=id;
 show(keepSection?sectionBeforeSwitch:'chat');
 console.info('Cirvela build V37 loaded');
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
 document.getElementById('createCircleDemo').onclick=()=>toast('Demo: Circle erstellen – z. B. Couple, Travel, School oder eigener Circle.');
}

let current='chat';
let currentChat=null;
let feedCircleFocus=null;
let yesCount=0;
let rapidCount=0;
let lastSosTap=0;
let demoEvents=[
 {icon:'🏖️',title:'Urlaub Papa',date:'12.–26. Aug',visible:'Mama · Lisa'},
 {icon:'🎂',title:'Oma Geburtstag',date:'Morgen',visible:'Alle'},
 {icon:'⚽',title:'Fußball Noah',date:'Mo 17:00',visible:'Familie'}
];


const circleCalendarPresets={
 friends:[
  {icon:'🍕',title:'Freundeabend',date:'Fr 20:00',visible:'Alle im FriendsCircle'},
  {icon:'🎉',title:'Geburtstag Mert',date:'Sa',visible:'FriendsCircle'},
  {icon:'☕',title:'Brunch',date:'So 11:00',visible:'Seda · Elif'}
 ],
 girls:[
  {icon:'🌸',title:'Girls Night',date:'Fr 19:30',visible:'GirlsCircle'},
  {icon:'💅',title:'Beauty-Termin',date:'Sa 14:00',visible:'Lisa · Sophie'},
  {icon:'🥂',title:'Dinner',date:'So 18:30',visible:'Alle im GirlsCircle'}
 ],
 work:[
  {icon:'💼',title:'Team-Meeting',date:'Mo 10:30',visible:'WorkCircle'},
  {icon:'📊',title:'Projekt-Review',date:'Mi 14:00',visible:'Anna · David'},
  {icon:'🏁',title:'Sprint-Ende',date:'Fr 16:00',visible:'Team'}
 ],
 sport:[
  {icon:'⚽',title:'Training',date:'Heute 18:30',visible:'SportCircle'},
  {icon:'🏆',title:'Ligaspiel',date:'Sa 15:00',visible:'Team'},
  {icon:'🏃',title:'Lauftreff',date:'So 09:00',visible:'Emre · Leon'}
 ],
 couple:[
  {icon:'❤️',title:'Dinner-Date',date:'Fr 19:00',visible:'Wir zwei'},
  {icon:'🎬',title:'Kino',date:'Sa 20:15',visible:'Wir zwei'},
  {icon:'☕',title:'Sonntagsfrühstück',date:'So 10:30',visible:'Wir zwei'}
 ],
 travel:[
  {icon:'✈️',title:'Abflug',date:'08:10',visible:'TravelCircle'},
  {icon:'🏨',title:'Check-in Hotel',date:'15:00',visible:'Reisegruppe'},
  {icon:'🗺️',title:'Stadttour',date:'Morgen 10:00',visible:'Alle'}
 ],
 school:[
  {icon:'🎓',title:'Elternabend',date:'Do 18:00',visible:'SchoolCircle'},
  {icon:'📚',title:'Mathe-Test',date:'Fr',visible:'Emma · Tom'},
  {icon:'🏫',title:'Schulfest',date:'Sa 13:00',visible:'Alle'}
 ]
};
function currentCalendarEvents(){
 if(currentCircleId==='family') return demoEvents;
 if(!circleCalendarPresets[currentCircleId]) circleCalendarPresets[currentCircleId]=[];
 return circleCalendarPresets[currentCircleId];
}

let postComments={
  0:[{avatar:'👨',name:'Papa',text:'Tolles Foto ❤️',likes:2},{avatar:'👧',name:'Lisa',text:'Das war richtig schön 😊',likes:1},{avatar:'👦',name:'Noah',text:'Nächstes Mal wieder!',likes:0}],
  1:[{avatar:'👩',name:'Mama',text:'Ich bin dabei 🍕',likes:1},{avatar:'👧',name:'Lisa',text:'Ich auch!',likes:0}],
  2:[],3:[],4:[],5:[],6:[],7:[]
};

const names={chat:'Chats',calendar:'Kalender',location:'Standort',games:'Spiele',status:'Status',feed:'Familien-Feed',settings:'Einstellungen',hub:'Circle Hub'};

function safe(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function toast(text){document.querySelector('.toast')?.remove();const t=document.createElement('div');t.className='toast';t.textContent=text;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
function card(html){return `<section class="card">${html}</section>`;}

function setActive(tab){
 navItems.forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
 settingsTop?.classList.toggle('active',tab==='settings');
 if(hubTop)hubTop.classList.toggle('active',tab==='hub');
}


const circleFeatureState={
 mood:localStorage.getItem('fc-mood')||'😊 Gut', boardDone:false,
 safeWalk:localStorage.getItem('fc-safe-walk')==='1', doorbell:localStorage.getItem('fc-doorbell')==='1',
 inbox:[
  {id:'family',circle:'FamilyCircle',icon:'👨‍👩‍👧‍👦',count:2,text:'Mama: Bringst du Brot mit?'},
  {id:'friends',circle:'FriendsCircle',icon:'🫶',count:8,text:'Neue Nachrichten + 3 Fotos'},
  {id:'sport',circle:'SportCircle',icon:'⚽',count:4,text:'Training wurde auf 19:00 verschoben'},
  {id:'travel',circle:'TravelCircle',icon:'✈️',count:3,text:'Mia: Tickets sind gespeichert'}
 ],
 lists:[
  {icon:'🛒',title:'Einkauf',items:['Milch','Brot','Tomaten'],done:1},
  {icon:'🏠',title:'Haushalt',items:['Müll rausbringen','Spülmaschine'],done:0},
  {icon:'🎁',title:'Geschenke',items:['Oma Geburtstag'],done:0},
  {icon:'✈️',title:'Urlaubspackliste',items:['Pässe','Ladekabel','Tickets'],done:1},
  {icon:'💡',title:'Ideen',items:['Ausflug See','Grillabend'],done:0},
  {icon:'💰',title:'Ausgaben',items:['Pizza 32 €','Tickets 48 €'],done:0}
 ]
};

function demoSheet(titleText,bodyHtml){
 const s=document.createElement('div');s.className='sheet feature-sheet';
 s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>${titleText}</h3><span></span></div>${bodyHtml}</div>`;
 document.body.appendChild(s); s.querySelector('.close-sheet').onclick=()=>s.remove(); return s;
}

function hubView(){
 const c=activeCircle();
 return `
 <div class="hub-hero">
   <div><span class="eyebrow">${c.icon} ${c.name}</span><h2>Was passiert gerade?</h2><p>Dein gemeinsamer Überblick für Menschen, Termine, Aufgaben, Erinnerungen und Sicherheit.</p></div>
   <button id="catchUpBtn" class="primary compact">⚡ Catch-up</button>
 </div>
 <section class="today-board card">
   <div class="card-title-row"><h3>📌 ${c.id==='family'?'Family Board':'Circle Board'}</h3><button id="pulseBtn" class="ghost">💓 Pulse</button></div>
   <div class="board-item">🗓️ <span><b>Zahnarzt Lisa</b><small>Heute · 15:30</small></span></div>
   <div class="board-item">🛒 <span><b>Einkauf</b><small>Papa übernimmt · 2 offen</small></span></div>
   <div class="board-item">📍 <span><b>Mama unterwegs</b><small>Standort freiwillig geteilt</small></span></div>
   <div class="board-item">🎂 <span><b>Omas Geburtstag</b><small>in 3 Tagen</small></span></div>
   <div class="board-item">💬 <span><b>${unreadOutsideCurrent()} ungelesen</b><small>in anderen Circles</small></span></div>
 </section>
 <div class="hub-section-title"><b>Kommunikation</b><small>WhatsApp-Komfort + Circle-Funktionen</small></div>
 <div class="hub-grid">
   ${hubTile('💬','Chat+','Antworten · Reaktionen · Pins','chatPlus')}
   ${hubTile('🎙️','Voice & Calls','Wellenform · 1×/1,5×/2×','calls')}
   ${hubTile('🧠','Smart Actions','Chat wird Termin, Liste, Erinnerung','smartActions')}
   ${hubTile('📊','Umfragen','Abstimmen ohne Chat-Chaos','polls')}
 </div>
 <div class="hub-section-title"><b>Organisation</b><small>Gemeinsam planen statt suchen</small></div>
 <div class="hub-grid">
   ${hubTile('📝','Gemeinsame Listen','Einkauf · Haushalt · Reise · Ausgaben','lists')}
   ${hubTile('🙋','Wer kann?','Aufgaben direkt verteilen','whoCan')}
   ${hubTile('📥','Circle Inbox','Alle ungelesenen Circles zentral','inbox')}
   ${hubTile('💓','Circle Pulse','Was ist heute wirklich wichtig?','pulse')}
 </div>
 <div class="hub-section-title"><b>Erinnerungen & Nähe</b><small>Mehr als nur Nachrichten</small></div>
 <div class="hub-grid">
   ${hubTile('📸','Circle Moments','Gemeinsame Tageschronik','moments')}
   ${hubTile('🕰️','Damals','Erinnerungen wiederentdecken','memories')}
   ${hubTile('🔐','Zeitkapsel','Fotos & Nachrichten für später','capsule')}
   ${hubTile('🔔','Circle Doorbell','Zeige, dass du Zeit hast','doorbell')}
   ${hubTile('😊','Stimmung','Freiwilliger Kurzstatus','mood')}
   ${hubTile('⭐','Gespeichert','Favoriten & wichtige Nachrichten','saved')}
 </div>
 <div class="hub-section-title"><b>Sicherheit & Standort</b><small>Freiwillig, transparent, zeitlich begrenzt</small></div>
 <div class="hub-grid">
   ${hubTile('🏠','Bin angekommen','Ankunft ohne extra Nachricht','arrived')}
   ${hubTile('🛟','Safety Hub','SOS · Hol mich ab · Standort','safety')}
   ${hubTile('🚶','Safe Walk','Begleitung bis zur Ankunft','safeWalk')}
 </div>
 <div class="hub-section-title"><b>Circle-Plattform</b><small>Getrennte Lebensbereiche – kontrolliert verbunden</small></div>
 <div class="hub-grid">
   ${hubTile('📰','Mein Feed','Circles individuell auswählen','feedFilter')}
   ${hubTile('🌉','Circle Bridge','Einzelne Inhalte teilen, Privates bleibt privat','bridge')}
   ${hubTile('🧩','Circle Räume','Family · Friends · Couple · Work · Travel · School','circles')}
 </div>`;
}
function hubTile(icon,titleText,sub,key){
 return `<button class="hub-tile feature-open" data-feature="${key}"><span>${icon}</span><b>${titleText}</b><small>${sub}</small></button>`;
}

function openFeature(key){
 const c=activeCircle();
 const custom=getCustomFeedCircles();
 const sheets={
  chatPlus:['Chat+',`<div class="feature-list">
    ${featureAction('↩️','Antworten / Zitieren','Auf eine einzelne Nachricht antworten','replyDemo')}
    ${featureAction('❤️','Reaktionen','❤️ 😂 👍 😮 😢','reactionDemo')}
    ${featureAction('📌','Anpinnen & Ankündigen','Wichtige Nachricht für die Gruppe sichtbar halten','pinDemo')}
    ${featureAction('✏️','Bearbeiten / Löschen','Eigene Nachricht verwalten','editDemo')}
    ${featureAction('↗️','Weiterleiten','An Person oder Circle weitergeben','forwardDemo')}
    ${featureAction('@','@Erwähnungen','Gezielt Mama, Papa usw. ansprechen','mentionDemo')}
    ${featureAction('✓✓','Lesestatus','Gelesen von Mama, Lisa · offen: Papa','readDemo')}
    ${featureAction('⭐','Favoriten','Wichtige Nachrichten speichern','saveDemo')}
    ${featureAction('🔎','Chat-Suche','Nachrichten, Links und Medien finden','searchDemo')}
    ${featureAction('🔒','Chat-Sperre','Face ID / Touch ID für private Chats vorbereiten','lockDemo')}
   </div>`],
  smartActions:['Smart Actions',`<div class="smart-demo"><div class="bubble theirs"><b>Mama</b><br>Sonntag um 14 Uhr bei Oma?</div>
    <button class="smart-action" data-smart="calendar">📅 Zum Kalender hinzufügen</button>
    <div class="bubble theirs"><b>Papa</b><br>Kann jemand Milch mitbringen?</div>
    <button class="smart-action" data-smart="list">🛒 Zur Einkaufsliste hinzufügen</button>
    <div class="bubble theirs"><b>Lisa</b><br>Erinnert mich morgen an den Arzt.</div>
    <button class="smart-action" data-smart="reminder">⏰ Erinnerung erstellen</button></div>`],
  lists:['Gemeinsame Listen',circleFeatureState.lists.map((l,li)=>`<div class="list-card"><b>${l.icon} ${l.title}</b>${l.items.map((x,i)=>`<label><input class="shared-list-check" data-list="${li}" data-item="${i}" type="checkbox" ${i<l.done?'checked':''}> <span>${x}</span></label>`).join('')}<button class="ghost list-add" data-list="${li}">＋ Eintrag</button></div>`).join('')],
  whoCan:['Wer kann?',`<div class="request-card"><h3>🚗 Wer kann Lisa morgen um 16:00 abholen?</h3>
    ${['Mama ❌','Papa ✅','Tolga ❓'].map((x,i)=>`<button class="choice-line who-choice" data-choice="${i}">${x}</button>`).join('')}
    <div id="whoResult" class="success-banner">✓ Papa übernimmt · Aufgabe erledigt</div></div>`],
  moments:['Circle Moments',`<div class="moment-cover">📸<b>Unser Tag</b><small>6 Fotos · 3 Mitglieder</small></div>
    <div class="moment-grid"><div>🌅</div><div>🍕</div><div>⚽</div><div>❤️</div></div>
    <button id="momentAdd" class="primary wide">＋ Moment hinzufügen</button>`],
  memories:['Damals',`<div class="memory-card"><span>❤️ Vor genau einem Jahr</span><h3>Familienausflug am Bodensee</h3><div class="memory-photo">🏞️</div><p>12 Fotos · 4 Chatmomente</p><button class="secondary wide" id="memoryShare">Mit ${c.name} teilen</button></div>`],
  capsule:['Circle Capsule',`<div class="capsule-card"><div class="capsule-lock">🔐</div><h3>Lisas 18. Geburtstag</h3><p>Alle können Fotos, Videos und Sprachnachrichten hineinlegen.</p><b>Öffnet am 17.07.2034</b><button id="capsuleAdd" class="secondary wide">Beitrag hinzufügen</button><button id="capsuleSeal" class="primary wide">Zeitkapsel schließen</button></div>`],
  arrived:['Bin angekommen',`<div class="place-grid">${['🏠 Zuhause','🏫 Schule','🏢 Arbeit','⚽ Verein'].map(x=>`<button class="place-card arrival-place">${x}</button>`).join('')}</div>
    <div class="privacy-banner">Freiwillig: Nur ausgewählte Personen bekommen die Ankunftsmeldung. Danach endet die Freigabe automatisch.</div>`],
  safety:['Safety Hub',`<div class="safety-actions"><button class="safety-red" data-safety="sos">🚨 SOS vorbereiten</button><button class="safety-yellow" data-safety="pickup">🚗 Hol mich ab</button><button class="safety-blue" data-safety="location">📍 Standort zeitlich teilen</button></div>
    <div class="info-banner">Demo: Empfänger, Dauer und Standortfreigabe werden vorher festgelegt. Es wird nichts real versendet.</div>`],
  safeWalk:['Safe Walk',`<div class="safe-walk-card"><div class="walk-route">📍────🚶────🏠</div><h3>Begleite mich</h3><p>Geschätzte Dauer: 18 Minuten</p><button id="safeWalkToggle" class="primary wide">${circleFeatureState.safeWalk?'✓ Safe Walk läuft':'Safe Walk starten'}</button><small>Nach Ankunft endet die Freigabe automatisch.</small></div>`],
  doorbell:['Circle Doorbell',`<div class="doorbell-card"><div class="doorbell-big">🔔</div><h3>Hat jemand kurz Zeit?</h3><div class="quick-status"><button data-door="☕">☕ Quatschen</button><button data-door="📞">📞 Kurzer Anruf</button><button data-door="🎮">🎮 Spielen</button></div><button id="doorbellToggle" class="primary wide">${circleFeatureState.doorbell?'✓ Verfügbar':'Jetzt verfügbar anzeigen'}</button></div>`],
  mood:['Stimmung',`<div class="mood-grid">${['😊 Gut','😴 Müde','🤒 Krank','📚 Beschäftigt','💼 Arbeit','🚗 Unterwegs','🏠 Zuhause','🔕 Bitte nicht stören'].map(x=>`<button class="mood-choice ${x===circleFeatureState.mood?'selected':''}">${x}</button>`).join('')}</div><p class="small muted">Nur sichtbar, wenn du es selbst aktiv setzt.</p>`],
  feedFilter:['Mein Feed',`<div class="privacy-banner"><b>Wähle deine Circles für „Mein Feed“.</b><br><span class="small">Die Circles bleiben getrennt; nur ausgewählte Beiträge werden in deiner persönlichen Ansicht zusammengeführt.</span></div>
    ${Object.values(circlePresets).map(x=>`<label class="member-check"><span>${x.icon} ${x.name}</span><input class="custom-feed-check" data-circle="${x.id}" type="checkbox" ${custom.includes(x.id)?'checked':''}></label>`).join('')}<button id="saveCustomFeed" class="primary wide" style="margin-top:12px">Mein Feed speichern</button>`],
  inbox:['Circle Inbox',`<div class="inbox-list">${circleFeatureState.inbox.map(x=>`<button class="inbox-item" data-inbox-circle="${x.id}"><span>${x.icon}</span><span><b>${x.circle}</b><small>${x.text}</small></span><em>${x.count}</em></button>`).join('')}</div>`],
  pulse:['Circle Pulse',`<div class="pulse-list">${pulseLine('👨‍👩‍👧‍👦','FamilyCircle','🟢 ruhig · 2 neue Nachrichten')}${pulseLine('🫶','FriendsCircle','🔥 viel los · 18 neue Nachrichten')}${pulseLine('⚽','SportCircle','⚠️ Terminänderung')}${pulseLine('💼','WorkCircle','✓ nichts Dringendes')}${pulseLine('✈️','TravelCircle','🎫 Tickets gespeichert')}</div>`],
  bridge:['Circle Bridge',`<div class="bridge-card"><h3>🌉 Etwas zwischen Circles teilen</h3><div class="share-preview">🎂 Tolgas Geburtstag<br><small>Samstag · 19:00</small></div><p>Private Chats bleiben unsichtbar. Nur dieser eine Inhalt wird geteilt.</p>${Object.values(circlePresets).filter(x=>x.id!==currentCircleId).map(x=>`<label class="member-check"><span>${x.icon} ${x.name}</span><input class="bridge-check" data-circle="${x.id}" type="checkbox"></label>`).join('')}<button id="bridgeShare" class="primary wide">Ausgewählten Inhalt teilen</button></div>`],
  calls:['Voice & Calls',`<div class="voice-demo"><button id="voicePlay" class="voice-play">▶</button><div class="voice-wave">▂▅▃▇▄▆▂▅▇▃▆▄▂▇</div><button id="voiceSpeed" class="voice-speed">1×</button></div><div class="call-options"><button data-call="voice">🎙️ Sprachnachricht</button><button data-call="audio">📞 Audioanruf</button><button data-call="video">🎥 Videoanruf</button><button data-call="group">👥 Gruppenanruf</button></div><div class="member-picker">${members.filter(m=>m.name!==activeCircle().label).slice(0,4).map(m=>`<label class="member-check"><span>${m.avatar} ${m.name}</span><input type="checkbox"></label>`).join('')}</div>`],
  polls:['Umfrage',`<div class="poll-card"><h3>🍕 Was essen wir heute?</h3><button class="poll-option" data-poll="Pizza">Pizza <b>48%</b></button><button class="poll-option" data-poll="Pasta">Pasta <b>32%</b></button><button class="poll-option" data-poll="Salat">Salat <b>20%</b></button><small>5 Stimmen · Mehrfachauswahl aus</small></div>`],
  saved:['Gespeichert',`<div class="saved-list">${featureRow('⭐','Mama: Sonntag um 14 Uhr?','FamilyCircle · gestern')}${featureRow('📌','Coach: Training 18:30','SportCircle · heute')}${featureRow('🔗','Reiseplan Sommer','FriendsCircle · Link')}</div>`],
  circles:['Deine Circle Räume',`<div class="circle-room-grid">${Object.values(circlePresets).map(x=>`<button class="circle-room" data-switch-circle="${x.id}"><span>${x.icon}</span><b>${x.name}</b><small>${x.members.length-1} Mitglieder</small></button>`).join('')}</div>`]
 };
 const d=sheets[key]||['Funktion','Demo']; const s=demoSheet(d[0],d[1]);
 s.querySelectorAll('[data-switch-circle]').forEach(b=>b.onclick=()=>{s.remove();applyCircle(b.dataset.switchCircle)});
 s.querySelectorAll('[data-inbox-circle]').forEach(b=>b.onclick=()=>{s.remove();applyCircle(b.dataset.inboxCircle)});
 s.querySelectorAll('.mood-choice').forEach(b=>b.onclick=()=>{circleFeatureState.mood=b.textContent;localStorage.setItem('fc-mood',b.textContent);s.remove();toast('Stimmung: '+b.textContent)});
 s.querySelector('#safeWalkToggle')?.addEventListener('click',()=>{circleFeatureState.safeWalk=!circleFeatureState.safeWalk;localStorage.setItem('fc-safe-walk',circleFeatureState.safeWalk?'1':'0');s.remove();toast(circleFeatureState.safeWalk?'Safe Walk gestartet':'Safe Walk beendet')});
 s.querySelector('#doorbellToggle')?.addEventListener('click',()=>{circleFeatureState.doorbell=!circleFeatureState.doorbell;localStorage.setItem('fc-doorbell',circleFeatureState.doorbell?'1':'0');s.remove();toast(circleFeatureState.doorbell?'Du bist jetzt verfügbar':'Verfügbarkeit beendet')});
 let speeds=['1×','1,5×','2×'],speedIndex=0;s.querySelector('#voiceSpeed')?.addEventListener('click',e=>{speedIndex=(speedIndex+1)%3;e.currentTarget.textContent=speeds[speedIndex]});
 s.querySelector('#voicePlay')?.addEventListener('click',e=>{e.currentTarget.textContent=e.currentTarget.textContent==='▶'?'❚❚':'▶'});
 s.querySelectorAll('[data-smart]').forEach(b=>b.onclick=()=>toast(b.dataset.smart==='calendar'?'Termin zum Kalender hinzugefügt':b.dataset.smart==='list'?'Zur Einkaufsliste hinzugefügt':'Erinnerung erstellt'));
 s.querySelectorAll('.who-choice').forEach(b=>b.onclick=()=>{const r=s.querySelector('#whoResult');r.textContent='✓ '+b.textContent.replace(/[❌✅❓]/g,'').trim()+' übernimmt · Aufgabe erledigt'});
 s.querySelectorAll('.arrival-place').forEach(b=>b.onclick=()=>toast('Ankunftsmeldung vorbereitet: '+b.textContent));
 s.querySelectorAll('[data-safety]').forEach(b=>b.onclick=()=>toast(b.dataset.safety==='pickup'?'„Hol mich ab“-Anfrage vorbereitet':b.dataset.safety==='location'?'Zeitliche Standortfreigabe vorbereitet':'SOS-Bestätigung geöffnet – Demo'));
 s.querySelectorAll('[data-door]').forEach(b=>b.onclick=()=>toast(b.dataset.door+' Verfügbarkeit geteilt'));
 s.querySelectorAll('[data-call]').forEach(b=>b.onclick=()=>toast('Demo: '+b.textContent.trim()+' vorbereitet'));
 s.querySelectorAll('.poll-option').forEach(b=>b.onclick=()=>toast('Stimme für '+b.dataset.poll+' gespeichert'));
 s.querySelectorAll('.feature-action').forEach(b=>b.onclick=()=>toast(b.dataset.action==='readDemo'?'Gelesen von Mama, Lisa · noch nicht Papa':'Chat-Aktion: '+b.querySelector('b').textContent));
 s.querySelector('#momentAdd')?.addEventListener('click',()=>galleryInput.click());
 s.querySelector('#memoryShare')?.addEventListener('click',()=>toast('Erinnerung im '+c.name+' geteilt'));
 s.querySelector('#capsuleAdd')?.addEventListener('click',()=>galleryInput.click());
 s.querySelector('#capsuleSeal')?.addEventListener('click',()=>toast('Zeitkapsel geschlossen · Demo'));
 s.querySelector('#saveCustomFeed')?.addEventListener('click',()=>{const ids=[...s.querySelectorAll('.custom-feed-check:checked')].map(x=>x.dataset.circle);setCustomFeedCircles(ids);setFeedScope('custom');s.remove();toast('Mein Feed gespeichert')});
 s.querySelector('#bridgeShare')?.addEventListener('click',()=>{const n=s.querySelectorAll('.bridge-check:checked').length;toast(n?n+' Circle(s) ausgewählt – Inhalt geteilt':'Bitte mindestens einen Circle auswählen')});
}
function featureAction(icon,titleText,sub,action){return `<button class="feature-row feature-action" data-action="${action}"><span>${icon}</span><span><b>${titleText}</b><small>${sub}</small></span><i>›</i></button>`}
function featureRow(icon,titleText,sub){return `<div class="feature-row"><span>${icon}</span><span><b>${titleText}</b><small>${sub}</small></span><i>›</i></div>`}
function pulseLine(icon,name,status){return `<div class="pulse-line"><span>${icon}</span><span><b>${name}</b><small>${status}</small></span></div>`}

function statusView(){
 const c=activeCircle();
 const statusTexts=['☕ Hat Zeit · vor 12 Min','🚗 Unterwegs · vor 35 Min','📚 Beschäftigt · 17:40','⚡ Aktiv · 16:15'];
 const statusMembers=members.filter(m=>m.name!==c.label).slice(0,4);
 return `<div class="section-pad"><h2 style="margin:2px 0 6px">Status & Moments · ${c.name}</h2><p class="muted" style="margin-top:0">Kurzstatus, Tagesmomente und Erinnerungen dieses Circles · freiwillig</p></div>
 ${card(`<div class="card-title-row"><h3>😊 Deine Stimmung</h3><button class="ghost feature-open" data-feature="mood">Ändern</button></div><div class="status-mood-current">${circleFeatureState.mood}</div>`)}
 ${card(`<div class="card-title-row"><h3>📸 Unser Tag</h3><button class="ghost feature-open" data-feature="moments">Öffnen</button></div><div class="moment-mini"><span>🌅</span><span>🍕</span><span>⚽</span><span>❤️</span></div><button class="secondary wide feature-open" data-feature="memories" style="margin-top:10px">🕰️ Damals anzeigen</button>`)}
 ${card(`<h3>Aktuelle Statusmeldungen · ${c.name}</h3>${statusMembers.map((m,i)=>`<div class="setting-row"><span class="setting-icon">${m.avatar}</span><span class="setting-copy"><b>${m.name}</b><small>${statusTexts[i]||'● Aktiv'}</small></span><span>●</span></div>`).join('')}`)}
 <div class="section-pad"><button class="primary wide feature-open" data-feature="doorbell">🔔 Circle Doorbell</button></div>`;
}
function showStatus(){
 current='status'; currentChat=null; setActive('status');
 title.textContent='Status'; content.innerHTML=statusView(); bind(); window.scrollTo({top:0,behavior:'instant'});
}

function show(tab){
 current=tab;currentChat=null;setActive(tab);title.textContent=names[tab];
 if(tab==='chat') { openFamilyChat(); return; }
 if(tab==='calendar') content.innerHTML=calendarView();
 if(tab==='location') content.innerHTML=locationView();
 if(tab==='games') content.innerHTML=gamesView();
 if(tab==='status') content.innerHTML=statusView();
 if(tab==='feed') content.innerHTML=feedView();
 if(tab==='settings') content.innerHTML=settingsView();
 if(tab==='hub') content.innerHTML=hubView();
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


function circleListView(){
 const order=normalizedCircleOrder();
 return `<div class="contacts-head"><button id="circlesBack" class="back">‹</button><div><b>Circles</b><div class="small muted">Alle Circles</div></div></div>
 <div class="circle-list-view">
 ${order.map(id=>{
   const c=circlePresets[id],n=circleUnreadCount(c);
   return `<button class="circle-list-row" data-circle-open="${id}">
     <span class="circle-list-avatar" style="--circle-accent:${designData(id,getCircleDesignConfig(id).top).accent}">${c.icon}</span>
     <span class="circle-list-main"><b>${c.name}</b><small>${c.label} · ${c.members.length} Mitglieder</small></span>
     ${n?`<span class="circle-list-unread">${unreadLabel(n)}</span>`:''}
     <span class="circle-list-chevron">›</span>
   </button>`;
 }).join('')}
 </div>`;
}
function openCircleList(){
 title.textContent='Circles';
 content.innerHTML=circleListView();
 document.getElementById('circlesBack').onclick=openFamilyChat;
 content.querySelectorAll('[data-circle-open]').forEach(row=>row.onclick=()=>applyCircle(row.dataset.circleOpen));
 window.scrollTo({top:0,behavior:'instant'});
}
function circleMembersView(){
 const c=activeCircle();
 return `<div class="contacts-head"><button id="membersBack" class="back">‹</button><div><b>${c.label}</b><div class="small muted">${c.members.length} Circle-Mitglieder</div></div></div>
 <div class="search">🔎 <span>Mitglieder durchsuchen</span></div>
 <div class="circle-member-list">
 ${c.members.map((m,i)=>`<button class="circle-member-row" data-member-index="${i}">
   <span class="avatar">${m.avatar}</span>
   <span class="circle-member-main"><b>${m.name}</b><small>${m.online?'online':'offline'}</small></span>
 </button>`).join('')}
 </div>`;
}
function openCircleMembers(){
 title.textContent=activeCircle().label;
 content.innerHTML=circleMembersView();
 document.getElementById('membersBack').onclick=openFamilyChat;
 content.querySelectorAll('[data-member-index]').forEach(row=>row.onclick=()=>{
   const i=Number(row.dataset.memberIndex);
   if(i<chatData.length)openChat(i); else toast(activeCircle().members[i].name);
 });
 window.scrollTo({top:0,behavior:'instant'});
}

function mediaPanel(label){
 const items={
  photos:[['photo','Urlaubsfoto','Bild'],['camera','Familienmoment','Bild'],['portrait','Profilfoto','Bild'],['album','Ausflug','Album']],
  videos:[['video','Geburtstag','Video'],['clip','Training','Video'],['movie','Wochenende','Video']],
  links:[['link','Reiseplanung','Link'],['link','Restaurant','Link'],['link','Termininfo','Link']],
  files:[['doc','Einkaufsliste.pdf','PDF'],['doc','Reiseplan.docx','Dokument'],['doc','Tickets.pdf','PDF']]
 };
 const icons={photo:'▧',camera:'◉',portrait:'◯',album:'▤',video:'▶',clip:'▷',movie:'▻',link:'↗',doc:'≡'};
 return `<div class="chat-media-panel" data-media-panel>
   <button class="media-close icon-button" aria-label="Medien schließen">✕</button>
   <h3>${label}</h3>
   <div class="media-tabs">
    <button class="media-tab active" data-media-tab="photos">Fotos</button><button class="media-tab" data-media-tab="videos">Videos</button><button class="media-tab" data-media-tab="links">Links</button><button class="media-tab" data-media-tab="files">Dateien</button>
   </div>
   <div class="media-grid" data-media-grid>${items.photos.map((x,i)=>`<button class="media-item" data-media-kind="photos" data-media-index="${i}"><span>${icons[x[0]]}</span><b>${x[1]}</b><small>${x[2]}</small></button>`).join('')}</div>
   <p class="small muted">Geteilte Inhalte dieses Chats. Tippe auf einen Eintrag, um ihn zu öffnen.</p>
  </div>`;
}

function bindMediaPanel(root){
 const panel=root.querySelector('[data-media-panel]'); if(!panel)return;
 const data={
  photos:[['▧','Urlaubsfoto','Bildvorschau'],['◉','Familienmoment','Bildvorschau'],['◯','Profilfoto','Bildvorschau'],['▤','Ausflug','Albumansicht']],
  videos:[['▶','Geburtstag','Videovorschau'],['▷','Training','Videovorschau'],['▻','Wochenende','Videovorschau']],
  links:[['↗','Reiseplanung','Geteilter Link'],['↗','Restaurant','Geteilter Link'],['↗','Termininfo','Geteilter Link']],
  files:[['≡','Einkaufsliste.pdf','PDF-Datei'],['≡','Reiseplan.docx','Dokument'],['≡','Tickets.pdf','PDF-Datei']]
 };
 const grid=panel.querySelector('[data-media-grid]');
 function render(kind){
   grid.innerHTML=data[kind].map((x,i)=>`<button class="media-item" data-media-kind="${kind}" data-media-index="${i}"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></button>`).join('');
   panel.querySelectorAll('.media-tab').forEach(b=>b.classList.toggle('active',b.dataset.mediaTab===kind));
 }
 panel.querySelectorAll('.media-tab').forEach(b=>b.onclick=()=>render(b.dataset.mediaTab));
 grid.onclick=e=>{const b=e.target.closest('.media-item');if(!b)return;const x=data[b.dataset.mediaKind][+b.dataset.mediaIndex];openMediaDetail(x[1],x[0],x[2]);};
}
function openMediaDetail(name,icon,type){
 const d=document.createElement('div');d.className='sheet';
 d.innerHTML=`<div class="sheet-card media-detail"><div class="sheet-head"><h3>${name}</h3><button class="icon-button close-sheet">✕</button></div><div class="media-detail-preview">${icon}</div><p><b>${type}</b></p><p class="muted small">Demo-Vorschau des ausgewählten Chat-Inhalts.</p><button class="primary wide media-detail-action">Öffnen · Demo</button></div>`;
 document.body.appendChild(d);d.querySelector('.close-sheet').onclick=()=>d.remove();d.querySelector('.media-detail-action').onclick=()=>toast(name+' geöffnet · Demo');d.onclick=e=>{if(e.target===d)d.remove()};
}

function openFamilyChat(){
 current='chat'; currentChat=4; setActive('chat'); title.textContent='Chats';
 content.innerHTML=`<section class="chat-screen">
  <div class="chat-header group-header">
   <button id="openCircles" class="contacts-button">Circles</button>
   <div class="avatar small">${activeCircle().icon}</div>
   <button id="openCircleMembers" class="chat-person circle-name-button"><b>${activeCircle().label}</b><span class="small muted">Alle Mitglieder · Gruppenchat</span></button>
   <div class="chat-header-actions">
    <button id="groupMedia" class="icon-button" aria-label="Gruppenmedien">▦</button>
    <button id="groupVoice" class="icon-button" aria-label="Gruppenanruf">📞</button>
    <button id="groupVideo" class="icon-button" aria-label="Gruppenvideo">🎥</button>
   </div>
  </div>
  <div class="messages" id="messages">
   <div class="bubble theirs group-person-message message-actionable" data-person-chat="0"><button class="message-sender" data-person-chat="0">${chatData[0].name}</button><br>${safe(chatData[0].preview)}<button class="inline-smart" data-smart-open="list">🛒 Zur Einkaufsliste</button><span class="msg-time">12:35</span></div>
   <div class="bubble theirs group-person-message message-actionable" data-person-chat="1"><button class="message-sender" data-person-chat="1">${chatData[1].name}</button><br>${safe(chatData[1].preview)}<span class="msg-time">12:37</span></div>
   <div class="bubble mine message-actionable">Alles klar 😊<span class="msg-time">12:38 ✓✓</span></div>
   <div class="bubble theirs group-person-message message-actionable" data-person-chat="2"><button class="message-sender" data-person-chat="2">${chatData[2].name}</button><br>${safe(chatData[2].preview)}<span class="msg-time">12:39</span></div>
   <div class="bubble theirs voice-bubble message-actionable"><b>${chatData[3]?.name||'Noah'}</b><div class="voice-demo compact-voice"><button class="voice-inline-play">▶</button><div class="voice-wave">▂▅▃▇▄▆▂▅▇▃▆</div><button class="voice-inline-speed">1×</button></div><span class="msg-time">12:41</span></div>
  </div>
  <div class="chat-composer">
   <button id="attach">＋</button><textarea id="msg" class="chat-message-input" rows="1" maxlength="4000" placeholder="Nachricht an ${activeCircle().label}"></textarea>
   <button id="chatCamera" class="camera-black" aria-label="Kamera"><span>●</span></button><button id="mic">🎙️</button><button id="send" class="send">➤</button>
  </div>
 </section>`;
 document.getElementById('openCircles').onclick=openCircleList;
 document.getElementById('openCircleMembers').onclick=openCircleMembers;
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
 applyChatBackground();
 setupChatBackgroundLongPress();
 document.querySelectorAll('[data-smart-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();openFeature('smartActions')});
 document.querySelectorAll('.voice-inline-play').forEach(b=>b.onclick=e=>{e.stopPropagation();b.textContent=b.textContent==='▶'?'❚❚':'▶'});
 document.querySelectorAll('.voice-inline-speed').forEach(b=>b.onclick=e=>{e.stopPropagation();const speeds=['1×','1,5×','2×'];b.textContent=speeds[(speeds.indexOf(b.textContent)+1)%3]});
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
   <div class="bubble mine message-actionable">Kannst du nachher noch Brot mitbringen? 😊<span class="msg-time">12:40 ✓✓</span></div>
   <div class="bubble theirs message-actionable">Klar, mache ich! 🥖<span class="msg-time">12:41</span></div>
   <div class="bubble theirs voice-bubble message-actionable"><div class="voice-demo compact-voice"><button class="voice-inline-play">▶</button><div class="voice-wave">▂▅▃▇▄▆▂▅▇▃</div><button class="voice-inline-speed">1×</button></div><span class="msg-time">12:42</span></div>
   <div class="bubble mine message-actionable">Danke! ❤️<span class="msg-time">12:43 ✓✓</span></div>
  </div>
  <div class="chat-composer">
   <button id="attach">＋</button><textarea id="msg" class="chat-message-input" rows="1" maxlength="4000" placeholder="Nachricht"></textarea>
   <button id="chatCamera" class="camera-black" aria-label="Kamera"><span>●</span></button><button id="mic">🎙️</button><button id="send" class="send">➤</button>
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
 applyChatBackground();
 setupChatBackgroundLongPress();
 bind();
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
     <button id="profilePhotoOpen" class="profile-photo-button" aria-label="Profilbild von ${p.name} öffnen">
       <div class="contact-avatar-large">${p.avatar}</div>
     </button>
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
 document.getElementById('profilePhotoOpen').onclick=()=>openProfilePhoto(p);
 document.getElementById('profileEdit').onclick=()=>toast('Demo: Kontakt bearbeiten');
 document.getElementById('profileAudio').onclick=()=>startCall(i,false);
 document.getElementById('profileVideo').onclick=()=>startCall(i,true);
 document.getElementById('profileSearch').onclick=()=>toast('Demo: Chat durchsuchen');
 document.getElementById('profileMedia').onclick=()=>openMedia('Medien, Links & Dateien · '+p.name);
 const demo=(id,msg)=>{const el=document.getElementById(id);if(el)el.onclick=()=>openProfileOption(msg,p)};
 demo('profileStorage','Speicher verwalten');
 demo('profileStarred','Mit Stern markiert');
 demo('profileNotifications','Benachrichtigungen');
 const pd=document.getElementById('profileDesign');if(pd)pd.onclick=()=>openChatBackgroundPicker();
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

function openProfilePhoto(p){
 const v=document.createElement('div');v.className='profile-photo-viewer';
 v.innerHTML=`<div class="profile-photo-viewer-bar"><button class="profile-photo-close">‹</button><b>${p.name}</b><span></span></div>
 <div class="profile-photo-stage"><div class="profile-photo-large-demo">${p.avatar}</div></div>`;
 document.body.appendChild(v);
 v.querySelector('.profile-photo-close').onclick=()=>v.remove();
 v.querySelector('.profile-photo-stage').onclick=()=>v.remove();
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
 bindMediaPanel(s);
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
 inp.addEventListener('focus',()=>{
   const m=document.getElementById('messages');
   const keepScroll=m?m.scrollTop:0;
   document.body.classList.add('keyboard-open');
   applyChatBackground();
   updateKeyboardLayout();
   requestAnimationFrame(()=>{
     if(m)m.scrollTop=keepScroll;
     document.querySelector('.chat-composer')?.scrollIntoView({block:'end',inline:'nearest'});
   });
 });
 inp.addEventListener('blur',()=>setTimeout(()=>{
   document.body.classList.remove('keyboard-open');
   document.documentElement.style.removeProperty('--cirvela-vv-height');
   document.documentElement.style.removeProperty('--cirvela-vv-top');
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
 const height=vv?vv.height:window.innerHeight;
 const top=vv?vv.offsetTop:0;
 document.documentElement.style.setProperty('--cirvela-vv-height',Math.max(260,height)+'px');
 document.documentElement.style.setProperty('--cirvela-vv-top',Math.max(0,top)+'px');
 applyChatBackground();
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
 const c=activeCircle(),forcedCircle=feedCircleFocus===currentCircleId,scope=forcedCircle?'circle':getFeedScope(),custom=getCustomFeedCircles();
 const scopeTitle=feedScopeLabel(scope);
 const scopeSub=scope==='all'?'Beiträge aus all deinen Circles':scope==='custom'?`${custom.length} ausgewählte Circles`:`Nur ${c.name}`;
 const scopeBanner=`<div class="section-pad"><div class="feed-scope-banner"><span>${scope==='circle'?'🔒':scope==='custom'?'🎛️':'🌐'}</span><div><b>${scopeTitle}</b><small>${scopeSub}</small></div><button id="feedScopeQuick" class="ghost">Ändern</button></div><div class="feed-category-chips"><button>📸 Moment</button><button>📢 Wichtig</button><button>🎂 Ereignis</button><button>📊 Abstimmung</button></div></div>`;
 const posts={family:postHtml(0,'👩','Mama · FamilyCircle','Heute, 14:05','👨‍👩‍👧‍👦','Sonntag zusammen ❤️',12,5),friends:postHtml(1,'🧑','Mert · FriendsCircle','Heute, 13:40','', 'Wer ist heute Abend dabei? 😄',9,3),girls:postHtml(2,'👧','Lisa · GirlsCircle','Heute, 12:30','', 'Outfit-Abstimmung 👗',7,4),work:postHtml(3,'👩‍💼','Anna · WorkCircle','Heute, 11:15','', 'Projekt-Meilenstein geschafft ✅',7,2),sport:postHtml(4,'🧑‍🏫','Coach · SportCircle','Heute, 09:30','', 'Training heute 18:30 ⚽',11,4),travel:postHtml(5,'🧳','Mia · TravelCircle','Gestern','✈️','Tickets sind gespeichert!',6,2),school:postHtml(6,'👩‍🏫','Frau Weber · SchoolCircle','Gestern','🎓','Elternabend am Donnerstag',5,1),couple:postHtml(7,'🥰','Alex · CoupleCircle','Gestern','❤️','Dinner-Date geplant',8,2)};
 let selected=scope==='circle'?[currentCircleId]:scope==='all'?Object.keys(posts):custom;
 return storyStrip()+scopeBanner+`<div class="card composer-card"><div class="avatar small">🙂</div><button id="newPost" class="composer-launch">Was möchtest du teilen?</button></div><div class="section-pad"><div class="mini-actions"><button id="postPhoto">📷 Foto/Video</button><button id="postText">✍️ Text</button><button id="postAlbum">🖼️ Album</button></div></div>${selected.map(id=>posts[id]).filter(Boolean).join('')}`;
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
 const c=activeCircle(),events=currentCalendarEvents();
 return card(`<h2>📅 ${c.name} · Kalender</h2><div class="grid2"><button id="addEvent" class="primary">+ Eintrag</button><button id="calendarFilter" class="secondary">Sichtbarkeit</button></div>
 ${events.map(e=>`<div class="setting-row"><span class="setting-icon">${e.icon}</span><span class="setting-copy"><b>${e.title}</b><small>Sichtbar: ${e.visible}</small></span><b>${e.date}</b></div>`).join('')}
 <div class="info-banner" style="margin-top:12px">Kalendereinträge werden nur für den aktuell ausgewählten ${c.name} angezeigt.</div>`);
}
function openEventSheet(){
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>Kalendereintrag</h3><span></span></div>
 <div class="form-row"><label>Art</label><select id="etype"><option>Urlaub</option><option>Geburtstag</option><option>Termin</option><option>Schule</option><option>Arbeit</option><option>Besonderer Tag</option></select></div>
 <div class="form-row"><label>Titel</label><input id="etitle" placeholder="z. B. Urlaub Papa"></div>
 <div class="grid2"><div class="form-row"><label>Von</label><input id="efrom" type="date"></div><div class="form-row"><label>Bis</label><input id="eto" type="date"></div></div>
 <div class="form-row"><label>Sichtbar für</label>${members.slice(0,4).map((m,i)=>`<div class="member-check"><span>${m.avatar} ${m.name}</span><input class="evis" type="checkbox" value="${m.name}" ${i<2?'checked':''}></div>`).join('')}</div>
 <button id="saveEvent" class="primary wide">Eintrag speichern · Demo</button></div>`;
 document.body.appendChild(s);s.querySelector('.close-sheet').onclick=()=>s.remove();s.querySelector('#saveEvent').onclick=()=>{let t=s.querySelector('#etitle').value.trim()||'Neuer Termin';let vis=[...s.querySelectorAll('.evis:checked')].map(x=>x.value).join(' · ')||'Nur ich';currentCalendarEvents().unshift({icon:'📌',title:t,date:'Neu',visible:vis});s.remove();show('calendar')};
}

function locationView(){
 const c=activeCircle();
 return card(`<h2>📍 ${c.name} · Live-Standort</h2><div class="privacy-banner"><span class="status-dot"></span><b>Privat by default</b><br><span class="small">Ohne deine Freigabe sieht niemand deinen Standort.</span></div>
 <div class="form-row"><label>Wer darf meinen Standort sehen?</label>${members.slice(0,4).map((m,i)=>`<div class="member-check"><span>${m.avatar} ${m.name}</span><input type="checkbox" ${i<2?'checked':''}></div>`).join('')}</div>
 <div class="form-row"><label>Dauer der Freigabe</label><select id="duration"><option>15 Minuten</option><option selected>1 Stunde</option><option>Bis heute Abend</option><option>24 Stunden</option><option>Bis ich es beende</option></select></div>
 <div class="grid2"><button id="startLocation" class="primary">Freigabe starten</button><button id="stopLocation" class="danger">Alle stoppen</button></div>`)
 +card(`<h3>${c.name} · Karte · Demo</h3><div class="map-card"><div class="map-road"></div><span class="pin p1">👩</span><span class="pin p2">👨</span><span class="pin p3">👧</span></div>
 <div class="location-status"><span>🛡️</span><span class="small muted">Standortverlauf wird nur nach deiner Freigabe verwendet.</span></div>`)
 +card(`<h3>🛟 Sicherheit unterwegs</h3><div class="grid2"><button class="secondary feature-open" data-feature="safeWalk">🚶 Safe Walk</button><button class="secondary feature-open" data-feature="arrived">🏠 Bin angekommen</button></div><button class="primary wide feature-open" data-feature="safety" style="margin-top:10px">Safety Hub öffnen</button>`);
}

function gamesView(){
 const c=activeCircle();
 const rank=members.filter(m=>m.name!==c.label).slice(0,3);
 return card(`<h2>🎮 ${c.name} · Spiele-Hub</h2>
 <div class="game-card"><div class="game-icon">🧱</div><div class="game-info"><b>Block Blast!</b><div class="small muted">Externes Spiel · Integration wird geprüft</div></div><button id="openBlock" class="secondary">Öffnen</button></div>
 <div class="game-card"><div class="game-icon">👆</div><div class="game-info"><b>Family Tap Challenge</b><div class="small muted">Eigenes Demo-Spiel</div></div><button id="tapGame" class="secondary">Spielen</button></div>`)
 +card(`<h3>Block Blast · ${c.name} Rangliste</h3>${rank.map((m,i)=>`<div class="score-row"><span>${['🥇','🥈','🥉'][i]} ${m.name}</span><b>${['48.250','37.190','29.820'][i]}</b></div>`).join('')}
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
 ['📰','Feed-Anzeige','Alle Circles zusammen oder nur aktueller Circle','feedScope'],
 ['🚫','Blockierte Mitglieder','Kontakte verwalten','blocked']
 ])}
 ${settingGroup('Mitteilungen & Darstellung',[
 ['🔔','Benachrichtigungen','Chats, Kalender, SOS','notifications'],
 ['✨','Circle Hub','20 neue Circle-Funktionen','hubSettings'],
 ['🎨','Darstellung','Hell/Dunkel, Textgröße','appearance'],
 ['⭕','Circle-Management','Reihenfolge & bis zu 2 Circles fixieren','circle'],
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
 feedScope:['Feed-Anzeige',`<div class="privacy-banner"><b>📰 Welche Beiträge möchtest du sehen?</b><br><span class="small">Diese Einstellung gilt nur für deine persönliche Ansicht.</span></div>
 <label class="feed-choice"><input type="radio" name="feedScopeChoice" value="circle" ${getFeedScope()==='circle'?'checked':''}><span><b>Nur aktueller Circle</b><small>Jeder Circle bleibt im Feed vollständig getrennt.</small></span></label>
 <label class="feed-choice"><input type="radio" name="feedScopeChoice" value="all" ${getFeedScope()==='all'?'checked':''}><span><b>Alle Circles zusammen</b><small>Beiträge aus allen Circles in einer Ansicht.</small></span></label>
 <label class="feed-choice"><input type="radio" name="feedScopeChoice" value="custom" ${getFeedScope()==='custom'?'checked':''}><span><b>Mein Feed</b><small>Wähle selbst, welche Circles zusammen angezeigt werden.</small></span></label>
 <button id="configureCustomFeed" class="secondary wide" style="margin-top:10px">🎛️ Mein Feed auswählen</button>
 <div id="feedScopeSaved" class="info-banner" style="margin-top:12px">Aktuell: ${feedScopeLabel(getFeedScope())}</div>`],
 blocked:['Blockierte Mitglieder',`<p class="muted">Keine blockierten Mitglieder.</p><button class="ghost wide">Mitglied auswählen · Demo</button>`],
 hubSettings:['Circle Hub',`<div class="privacy-banner"><b>✨ Circle Hub</b><br>Alle erweiterten Funktionen findest du oben über „Hub“: Catch-up, Board, Listen, Safe Walk, Zeitkapsel, Circle Inbox und mehr.</div><button id="openHubFromSettings" class="primary wide" style="margin-top:12px">Circle Hub öffnen</button>`],
 notifications:['Benachrichtigungen',`<div class="member-check"><span>💬 Chat-Nachrichten</span><input type="checkbox" checked></div><div class="member-check"><span>📅 Kalender-Erinnerungen</span><input type="checkbox" checked></div><div class="member-check"><span>🚨 SOS-Mitteilungen</span><input type="checkbox" checked></div><div class="member-check"><span>🎮 Spiel-Ranglisten</span><input type="checkbox"></div>`],
 circle:['Circle-Management',`<div class="info-banner"><b>Circle-Reihenfolge</b><br>Hier kannst du maximal zwei Circles dauerhaft ganz links fixieren. Die übrige Reihenfolge änderst du direkt oben in der Circle-Leiste durch Gedrückthalten und Ziehen.</div>`],
 appearance:['Darstellung',`<div class="form-row"><label>App-Darstellung</label><select id="appAppearance"><option value="system">System</option><option value="light">Hell</option><option value="dark">Dunkel</option></select></div><div class="form-row"><label>Textgröße</label><select><option>Standard</option><option>Groß</option><option>Sehr groß</option></select></div><div class="appearance-divider"></div><div class="circle-design-head"><div><b>Circle-Designs</b><small>Obere Leiste und Chatfläche können getrennt oder gemeinsam gestaltet werden.</small></div></div><div class="form-row"><label>Circle auswählen</label><select id="circleDesignSelect">${Object.values(circlePresets).map(c=>`<option value="${c.id}" ${c.id===currentCircleId?'selected':''}>${c.name}</option>`).join('')}</select></div><button id="applyAppearanceCircle" class="primary wide appearance-main-apply">Auswahl übernehmen</button><div class="design-target-tabs"><button data-design-target="both" class="active">Beide Bereiche</button><button data-design-target="top">Obere Leiste</button><button data-design-target="chat">Chatbereich</button></div><div id="circleDesignChoices"></div><div class="info-banner" style="margin-top:12px">Wählst du „Beide Bereiche“, wird dasselbe Design oben und im Chat verwendet. Bei „Obere Leiste“ oder „Chatbereich“ bleiben die Bereiche unabhängig.</div>`],
 language:['Sprache',`<div class="form-row"><label>App-Sprache</label><select><option>Deutsch</option><option>English</option></select></div>`],
 export:['Daten exportieren',`<div class="info-banner">In der echten App sollst du eine Kopie deiner eigenen Daten anfordern können.</div><button class="secondary wide" style="margin-top:12px">Export vorbereiten · Demo</button>`],
 storage:['Speicher & Medien',`<div class="setting-row"><span class="setting-copy"><b>Medien-Cache</b><small>Demo · 0 MB</small></span></div><button class="ghost wide" style="margin-top:12px">Lokalen Cache leeren</button>`],
 delete:['Konto löschen',`<div class="warning-banner"><b>Wichtig:</b> In der echten App löscht diese Funktion dein Konto und die zugehörigen Daten, soweit keine gesetzliche Aufbewahrungspflicht besteht.</div><button class="danger wide" style="margin-top:12px">Kontolöschung starten · Demo</button>`]
 };
 const [heading,body]=data[key]||['Einstellung','Demo'];
 const s=document.createElement('div');s.className='sheet';s.innerHTML=`<div class="sheet-card"><div class="sheet-head"><button class="icon-button close-sheet">✕</button><h3>${heading}</h3><span></span></div>${body}</div>`;
 document.body.appendChild(s);s.querySelector('.close-sheet').onclick=()=>s.remove();
 if(key==='feedScope'){
   s.querySelectorAll('input[name="feedScopeChoice"]').forEach(r=>r.addEventListener('change',()=>{
     setFeedScope(r.value);
     const saved=s.querySelector('#feedScopeSaved');
     if(saved)saved.textContent='Gespeichert: '+feedScopeLabel(r.value);
   }));
 }
 
if(key==='circle'){
   const box=s.querySelector('.sheet-card')||s;
   const wrap=document.createElement('div');
   wrap.className='pinned-circle-settings';
   wrap.innerHTML=`<h3>Fixierte Circles</h3><p class="muted">Maximal drei Circles können ganz links fixiert werden.</p>
   ${Object.values(circlePresets).map(c=>`<label class="pin-setting-row"><span>${c.name}</span><input type="checkbox" data-pin-circle="${c.id}" ${getPinnedCircles().includes(c.id)?'checked':''}></label>`).join('')}`;
   box.appendChild(wrap);
   wrap.querySelectorAll('[data-pin-circle]').forEach(ch=>ch.onchange=()=>{
     let ids=[...wrap.querySelectorAll('[data-pin-circle]:checked')].map(x=>x.dataset.pinCircle);
     if(ids.length>3){ch.checked=false;toast('Maximal drei Circles können fixiert werden.');return}
     savePinnedCircles(ids);saveCircleOrder(normalizedCircleOrder());renderCircleCarousel();
   });
 }

if(key==='appearance'){
   const select=s.querySelector('#circleDesignSelect');
   const choices=s.querySelector('#circleDesignChoices');
   const appearanceSelect=s.querySelector('#appAppearance');
   const applyMain=s.querySelector('#applyAppearanceCircle');
   appearanceSelect.value=getAppAppearance();
   let target='both';
   const selectedFor=(id)=>{const cfg=getCircleDesignConfig(id);return target==='chat'?cfg.chat:target==='top'?cfg.top:(cfg.top===cfg.chat?cfg.top:'__mixed__')};
   const render=()=>{
     const id=select.value;
     choices.innerHTML=circleDesignPreview(id,selectedFor(id),target);
     choices.querySelectorAll('[data-circle-design-apply]').forEach(b=>b.onclick=e=>{
       e.preventDefault();e.stopPropagation();
       setCircleDesign(id,b.dataset.circleDesignApply,target);
       render();
       toast(circlePresets[id].name+' · '+(target==='both'?'beide Bereiche':target==='top'?'obere Leiste':'Chatbereich')+' übernommen');
     });
   };
   s.querySelectorAll('[data-design-target]').forEach(b=>b.onclick=()=>{
     target=b.dataset.designTarget;
     s.querySelectorAll('[data-design-target]').forEach(x=>x.classList.toggle('active',x===b));
     render();
   });
   select.addEventListener('change',render);
   applyMain.onclick=()=>{
     applyAppAppearance(appearanceSelect.value);
     if(select.value===currentCircleId)applyCircleDesign(select.value);
     render();
     toast('Darstellung für '+circlePresets[select.value].name+' übernommen');
   };
   render();
 }
 s.querySelector('#configureCustomFeed')?.addEventListener('click',()=>{s.remove();openFeature('feedFilter')});
 s.querySelectorAll('button.danger,button.secondary,button.ghost').forEach(b=>{if(!b.classList.contains('close-sheet'))b.addEventListener('click',()=>toast('Demo-Aktion ausgeführt.'))});
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
 document.getElementById('feedScopeQuick')?.addEventListener('click',()=>openSetting('feedScope'));
 document.getElementById('addEvent')?.addEventListener('click',openEventSheet);
 document.getElementById('calendarFilter')?.addEventListener('click',()=>toast('Demo: Kalender nach sichtbaren Mitgliedern filtern.'));
 document.getElementById('startLocation')?.addEventListener('click',()=>toast('Demo: Standortfreigabe gestartet.'));
 document.getElementById('stopLocation')?.addEventListener('click',()=>toast('Demo: Alle Standortfreigaben beendet.'));
 document.getElementById('openBlock')?.addEventListener('click',()=>toast('Demo: Direkte Block-Blast-Integration wird offiziell geprüft.'));
 document.getElementById('tapGame')?.addEventListener('click',()=>toast('Family Tap Challenge startet in der Demo.'));
 document.getElementById('scoreManual')?.addEventListener('click',()=>toast('Demo: Highscore manuell eintragen.'));
 document.getElementById('scoreShot')?.addEventListener('click',()=>scoreInput.click());
 document.querySelectorAll('.setting-open').forEach(b=>b.onclick=()=>openSetting(b.dataset.setting));
 document.querySelectorAll('.feature-open').forEach(b=>b.onclick=()=>openFeature(b.dataset.feature));
 document.getElementById('catchUpBtn')?.addEventListener('click',()=>openFeature('inbox'));
 document.getElementById('pulseBtn')?.addEventListener('click',()=>openFeature('pulse'));
 document.querySelectorAll('.message-actionable').forEach(b=>b.addEventListener('click',e=>{if(e.target.closest('.message-sender,.inline-smart,.voice-inline-play,.voice-inline-speed'))return;openFeature('chatPlus')}));
 document.querySelectorAll('[data-smart-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();openFeature('smartActions')});
 document.querySelectorAll('.voice-inline-play').forEach(b=>b.onclick=e=>{e.stopPropagation();b.textContent=b.textContent==='▶'?'❚❚':'▶'});
 document.querySelectorAll('.voice-inline-speed').forEach(b=>b.onclick=e=>{e.stopPropagation();const speeds=['1×','1,5×','2×'];b.textContent=speeds[(speeds.indexOf(b.textContent)+1)%3]});

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

navItems.forEach(b=>b.onclick=()=>{if(b.dataset.tab==='feed')feedCircleFocus=null;show(b.dataset.tab)});
settingsTop.onclick=()=>show('settings');

galleryInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: '+e.target.files[0].name+' ausgewählt. Story-/Beitragseditor wäre der nächste Schritt.');e.target.value=''}};
cameraInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: Kamera-Medium ausgewählt.');e.target.value=''}};
scoreInput.onchange=e=>{if(e.target.files?.[0]){toast('Demo: Highscore-Screenshot ausgewählt.');e.target.value=''}};

applyAppAppearance(getAppAppearance());
show('chat');
console.info('Cirvela build V37 loaded');

if(circleSwitchBtn){circleSwitchBtn.onclick=openCircleSwitcher;} document.body.dataset.circle=activeCircle().theme; applyCircleDesign(currentCircleId); updateCircleHeader(); renderCircleCarousel();

hubTop?.addEventListener('click',()=>show('hub'));
document.addEventListener('click',e=>{
 if(e.target?.id==='openHubFromSettings'){document.querySelector('.sheet')?.remove();show('hub');}
});
