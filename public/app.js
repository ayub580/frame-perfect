// ===== DATA. Add "img":"your-image-url" to any game to replace the placeholder art (works on your own host). =====
const CATS=[
 {s:"triple-a",t:"Triple-A",d:"Big-budget games from large studios and publishers."},
 {s:"indie",t:"Indie",d:"Games from small teams, often with unusual ideas and very tight controls."},
 {s:"retro",t:"Retro classics",d:"Older games that speedrunners have been perfecting for decades."},
 {s:"rpg",t:"RPG",d:"Role-playing games with deep stories, character builds, and massive worlds to explore."},
 {s:"horror",t:"Horror",d:"Survival horror and psychological thrillers that keep you on edge."},
 {s:"fighting",t:"Fighting",d:"Competitive fighters and brawlers built on frame-perfect combos and reads."},
 {s:"sports",t:"Sports & Racing",d:"Sports sims, arcade racers, and competitive driving games."},
 {s:"simulation",t:"Simulation",d:"Build, manage, and simulate entire worlds, cities, and lives."}
];
const GAMES=[
 {s:"wolf-among-us-remastered",t:"The Wolf Among Us Remastered",k:"new",c:"indie",d:"2026-10-29",w:"PC, PlayStation 5, Xbox, Switch, Switch 2",b:"Telltale's noir fairy-tale adventure, back in a remastered edition."},
 {s:"zelda-ocarina-of-time",t:"The Legend of Zelda: Ocarina of Time",k:"both",c:"retro",d:"2026-11-05",w:"Nintendo Switch 2",y:"1998",b:"The 1998 classic arrives on Switch 2. It is one of the most-run games in speedrunning."},
 {s:"football-manager-27",t:"Football Manager 27",k:"new",d:"2026-11-10",w:"PC and Xbox Nov 10, PlayStation 5 Nov 11",b:"A rebuilt match engine, and on Game Pass from day one."},
 {s:"warhammer-survivors",t:"Warhammer Survivors",k:"new",d:"2026-11-10",w:"PC, consoles, Android",b:"A budget-priced survivors-style action game."},
 {s:"gta-vi",t:"Grand Theft Auto VI",k:"new",c:"triple-a",d:"2026-11-19",w:"Scheduled date",b:"The biggest release of the year. Most publishers moved their games away from this week."},
 {s:"monster-hunter-wilds-switch-2",t:"Monster Hunter Wilds (Switch 2)",k:"new",c:"triple-a",d:null,w:"December 2026",b:"Listed for December. Exact date not confirmed in the lists I checked."},
 {s:"professor-layton-new-world-of-steam",t:"Professor Layton and the New World of Steam",k:"new",d:null,w:"December 2026",b:"Listed for December. Exact date not confirmed in the lists I checked."},
 {s:"super-mario-64",t:"Super Mario 64",k:"run",c:"retro",y:"1996",dev:"Nintendo",b:"A speedrunning staple, with several star-count categories."},
 {s:"super-metroid",t:"Super Metroid",k:"run",c:"retro",y:"1994",dev:"Nintendo",b:"A long-running favorite for fast, route-heavy runs."},
 {s:"super-mario-bros",t:"Super Mario Bros.",k:"run",c:"retro",y:"1985",dev:"Nintendo",b:"The platformer that defined a genre, and a speedrunning classic."},
 {s:"sonic-the-hedgehog",t:"Sonic the Hedgehog",k:"run",c:"retro",y:"1991",dev:"Sega",b:"A platformer built around speed, so it suits fast runs."},
 {s:"mega-man-2",t:"Mega Man 2",k:"run",c:"retro",y:"1988",dev:"Capcom",b:"A run-and-gun where you can fight the robot bosses in any order."},
 {s:"castlevania-symphony-of-the-night",t:"Castlevania: Symphony of the Night",k:"run",c:"retro",y:"1997",dev:"Konami",b:"A gothic action adventure set in one huge castle."},
 {s:"banjo-kazooie",t:"Banjo-Kazooie",k:"run",c:"retro",y:"1998",dev:"Rare",b:"A 3D platformer about collecting items across large worlds."},
 {s:"goldeneye-007",t:"GoldenEye 007",k:"run",c:"retro",y:"1997",dev:"Rare",b:"A console shooter based on the 1995 film."},
 {s:"minecraft",t:"Minecraft",k:"run",c:"triple-a",y:"2011",dev:"Mojang",b:"Runs are about beating the game as fast as possible."},
 {s:"elden-ring",t:"Elden Ring",k:"run",c:"triple-a",y:"2022",dev:"FromSoftware",b:"Open-world action game with a big community of fast runners."},
 {s:"sekiro",t:"Sekiro: Shadows Die Twice",k:"run",c:"triple-a",y:"2019",dev:"FromSoftware",b:"Fast sword combat built for risky, skilled runs."},
 {s:"dark-souls",t:"Dark Souls",k:"run",c:"triple-a",y:"2011",dev:"FromSoftware",b:"Runners skip huge parts of the world with clever routing."},
 {s:"portal",t:"Portal",k:"run",c:"triple-a",y:"2007",dev:"Valve",b:"Short and tight, so runs are a test of execution."},
 {s:"half-life-2",t:"Half-Life 2",k:"run",c:"triple-a",y:"2004",dev:"Valve",b:"A first-person shooter with physics puzzles."},
 {s:"the-witcher-3",t:"The Witcher 3: Wild Hunt",k:"run",c:"triple-a",y:"2015",dev:"CD Projekt Red",b:"A huge fantasy role-playing game."},
 {s:"red-dead-redemption-2",t:"Red Dead Redemption 2",k:"run",c:"triple-a",y:"2018",dev:"Rockstar Games",b:"A big open-world western."},
 {s:"god-of-war-2018",t:"God of War (2018)",k:"run",c:"triple-a",y:"2018",dev:"Santa Monica Studio",b:"An action adventure set in Norse mythology."},
 {s:"skyrim",t:"The Elder Scrolls V: Skyrim",k:"run",c:"triple-a",y:"2011",dev:"Bethesda Game Studios",b:"An open-world fantasy game with a huge modding scene."},
 {s:"resident-evil-4",t:"Resident Evil 4",k:"run",c:"triple-a",y:"2005",dev:"Capcom",b:"Survival horror with fast action. It was remade in 2023."},
 {s:"celeste",t:"Celeste",k:"run",c:"indie",y:"2018",dev:"Maddy Makes Games",b:"A precise platformer with a very active run community."},
 {s:"hollow-knight",t:"Hollow Knight",k:"run",c:"indie",y:"2017",dev:"Team Cherry",b:"Exploration game where route planning decides the time."},
 {s:"hades",t:"Hades",k:"run",c:"indie",y:"2020",dev:"Supergiant Games",b:"A run-based game where luck and build choices matter."},
 {s:"cuphead",t:"Cuphead",k:"run",c:"indie",y:"2017",dev:"Studio MDHR",b:"Boss-rush action that rewards clean, practiced fights."},
 {s:"undertale",t:"Undertale",k:"run",c:"indie",y:"2015",dev:"Toby Fox",b:"A role-playing game where you can choose not to fight."},
 {s:"super-meat-boy",t:"Super Meat Boy",k:"run",c:"indie",y:"2010",dev:"Team Meat",b:"A fast, hard platformer built on tiny, precise jumps."},
 {s:"stardew-valley",t:"Stardew Valley",k:"run",c:"indie",y:"2016",dev:"ConcernedApe",b:"A farming and life game made by one developer."},
 {s:"shovel-knight",t:"Shovel Knight",k:"run",c:"indie",y:"2014",dev:"Yacht Club Games",b:"A platformer inspired by 8-bit classics."},
 {s:"terraria",t:"Terraria",k:"run",c:"indie",y:"2011",dev:"Re-Logic",b:"A 2D game about digging, building and fighting bosses."},
 {s:"dead-cells",t:"Dead Cells",k:"run",c:"indie",y:"2018",dev:"Motion Twin",b:"A fast action game where every run plays out differently."},
 {s:"ori-and-the-blind-forest",t:"Ori and the Blind Forest",k:"run",c:"indie",y:"2015",dev:"Moon Studios",b:"A hand-painted platformer with fast, flowing movement."},
 {s:"final-fantasy-vii-rebirth",t:"Final Fantasy VII Rebirth",k:"run",c:"rpg",y:"2024",dev:"Square Enix",b:"The second part of the FF VII remake trilogy, with a massive open world."},
 {s:"baldurs-gate-3",t:"Baldur's Gate 3",k:"run",c:"rpg",y:"2023",dev:"Larian Studios",b:"A turn-based RPG with deep choices and D&D combat. Game of the Year 2023."},
 {s:"persona-5-royal",t:"Persona 5 Royal",k:"run",c:"rpg",y:"2020",dev:"Atlus",b:"Stylish JRPG mixing dungeon crawling with Tokyo school life."},
 {s:"dragon-quest-xi",t:"Dragon Quest XI",k:"run",c:"rpg",y:"2017",dev:"Square Enix",b:"A classic turn-based adventure with charming visuals and a long story."},
 {s:"chrono-trigger",t:"Chrono Trigger",k:"run",c:"rpg",y:"1995",dev:"Square",b:"A legendary SNES RPG with time travel and multiple endings."},
 {s:"resident-evil-2-remake",t:"Resident Evil 2 Remake",k:"run",c:"horror",y:"2019",dev:"Capcom",b:"A rebuilt survival horror classic with tense resource management."},
 {s:"silent-hill-2",t:"Silent Hill 2",k:"run",c:"horror",y:"2001",dev:"Konami",b:"Psychological horror in a fog-covered town. Remade in 2024."},
 {s:"amnesia-the-dark-descent",t:"Amnesia: The Dark Descent",k:"run",c:"horror",y:"2010",dev:"Frictional Games",b:"First-person horror where you can't fight back — only run and hide."},
 {s:"outlast",t:"Outlast",k:"run",c:"horror",y:"2013",dev:"Red Barrels",b:"A found-footage horror game set in a haunted asylum."},
 {s:"alien-isolation",t:"Alien: Isolation",k:"run",c:"horror",y:"2014",dev:"Creative Assembly",b:"Stealth horror with one unstoppable alien hunting you on a space station."},
 {s:"street-fighter-6",t:"Street Fighter 6",k:"run",c:"fighting",y:"2023",dev:"Capcom",b:"The latest Street Fighter with drive system and open-world story mode."},
 {s:"tekken-8",t:"Tekken 8",k:"run",c:"fighting",y:"2024",dev:"Bandai Namco",b:"3D fighting with aggressive heat system and next-gen visuals."},
 {s:"mortal-kombat-1",t:"Mortal Kombat 1",k:"run",c:"fighting",y:"2023",dev:"NetherRealm Studios",b:"A fighting-game reboot with a kameo assist system."},
 {s:"super-smash-bros-ultimate",t:"Super Smash Bros. Ultimate",k:"run",c:"fighting",y:"2018",dev:"Nintendo / Bandai Namco",b:"The biggest crossover fighter, with 80+ characters from across gaming."},
 {s:"guilty-gear-strive",t:"Guilty Gear Strive",k:"run",c:"fighting",y:"2021",dev:"Arc System Works",b:"A fast anime fighter with incredible visuals and a rock soundtrack."},
 {s:"forza-horizon-5",t:"Forza Horizon 5",k:"run",c:"sports",y:"2021",dev:"Playground Games",b:"Open-world racing across Mexico with hundreds of cars."},
 {s:"gran-turismo-7",t:"Gran Turismo 7",k:"run",c:"sports",y:"2022",dev:"Polyphony Digital",b:"A sim racer focused on car culture, tuning, and precise driving."},
 {s:"ea-fc-25",t:"EA Sports FC 25",k:"run",c:"sports",y:"2024",dev:"EA Sports",b:"The latest football sim with tactical overhauls and FC IQ system."},
 {s:"rocket-league",t:"Rocket League",k:"run",c:"sports",y:"2015",dev:"Psyonix",b:"Cars playing football — simple concept, impossibly high skill ceiling."},
 {s:"cities-skylines-2",t:"Cities: Skylines II",k:"run",c:"simulation",y:"2023",dev:"Colossal Order",b:"Build and manage sprawling cities with deep simulation systems."},
 {s:"planet-zoo",t:"Planet Zoo",k:"run",c:"simulation",y:"2019",dev:"Frontier Developments",b:"Design and run your own zoo with realistic animal behaviour."},
 {s:"factorio",t:"Factorio",k:"run",c:"simulation",y:"2020",dev:"Wube Software",b:"Automate factories on an alien planet. Speedruns are about efficiency."},
 {s:"kerbal-space-program",t:"Kerbal Space Program",k:"run",c:"simulation",y:"2015",dev:"Squad",b:"Build rockets and explore a solar system with real-ish physics."},
 {s:"the-sims-4",t:"The Sims 4",k:"run",c:"simulation",y:"2014",dev:"Maxis",b:"Create people and build their lives, homes, and stories."}
];

// ===== helpers =====
const T=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const yt=q=>"https://www.youtube.com/results?search_query="+encodeURIComponent(q);
const A=(label,href)=>{const a=T("a","go",label);a.href=href;a.target="_blank";a.rel="noopener noreferrer";return a};
const day=iso=>{const[y,m,d]=iso.split("-").map(Number);return new Date(y,m-1,d)};
const today=new Date();today.setHours(0,0,0,0);
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
let newG,runG,nextS;
function rebuild(){
  newG=GAMES.filter(g=>g.k!=="run").sort((a,b)=>(a.d||"9").localeCompare(b.d||"9"));
  runG=GAMES.filter(g=>g.k!=="new");
  nextS=(newG.find(g=>g.d&&day(g.d)>=today)||{}).s;
}
rebuild();

// Original generated cover art (shapes only, no game artwork)
function art(g){
  if(g.img){const i=T("img","art");i.dataset.s=g.s;i.loading="lazy";i.alt="Cover art for "+g.t;
    i.onerror=()=>{i.onerror=null;i.src=g.img};
    i.src=g.img.replace("/media/games/","/media/crop/600/400/games/");return i}
  const n=hash(g.s),h=n%360,v=n%4,c1=`hsl(${h} 42% 24%)`,c2=`hsl(${(h+40)%360} 62% 56%)`,c3=`hsl(${(h+200)%360} 55% 72%)`;let sh="";
  if(v===0)sh=`<circle cx="${130+n%140}" cy="125" r="${58+n%40}" fill="${c2}"/><rect y="215" width="400" height="16" fill="${c3}"/>`;
  else if(v===1)sh=`<polygon points="0,300 ${150+n%100},40 ${300+n%80},300" fill="${c2}"/><polygon points="130,300 330,120 400,300" fill="${c3}" opacity=".85"/>`;
  else if(v===2)for(let i=0;i<7;i++)sh+=`<rect x="${i*70-60}" y="-20" width="30" height="340" fill="${i%2?c3:c2}" transform="skewX(-20)"/>`;
  else for(let x=0;x<8;x++)for(let y=0;y<6;y++)sh+=`<circle cx="${25+x*50}" cy="${25+y*50}" r="${6+((x*y+n)%4)*4}" fill="${(x+y)%2?c2:c3}"/>`;
  const w=document.createElement("div");
  w.innerHTML=`<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img"><rect width="400" height="300" fill="${c1}"/>${sh}</svg>`;
  const svg=w.firstChild;svg.setAttribute("aria-label","Cover art for "+g.t);svg.dataset.s=g.s;return svg;
}
function status(g){
  if(!g.d)return null;
  const diff=Math.round((day(g.d)-today)/864e5);
  return diff===0?["Out today","zero"]:diff>0?["In "+diff+(diff===1?" day":" days"),"zero"]:["Out "+(-diff)+(diff===-1?" day":" days")+" ago","ahead"];
}
function card(g){
  const a=T("a","card"+(g.s===nextS?" next":""));a.href="#game-"+g.s;
  const cap=T("div","cap");cap.append(T("span","t",g.t));
  if(g.k!=="run"||g.d){const st=status(g);cap.append(st?T("span","sub "+st[1],(g.s===nextS?"Next release · ":"")+st[0]):T("span","sub",g.w))}
  else cap.append(T("span","sub",g.y+" · "+g.dev));
  a.append(art(g),cap);return a;
}
const grid=list=>{const d=T("div","grid");list.forEach(g=>d.append(card(g)));return d};

const chipRow=()=>{const p=T("p");CATS.forEach(c=>{const a=T("a","go",c.t);a.href="#cat-"+c.s;p.append(a)});return p};
function catPage(app,c){
  app.append(T("h1",null,c.t),T("p","lead",c.d),grid(GAMES.filter(g=>g.c===c.s)),T("h2",null,"Other categories"),chipRow());
}
function catsPage(app){
  app.append(T("h1",null,"Categories"),T("p","lead","Pick a kind of game. Every game page has its own speedrun and world-record links."));
  CATS.forEach(c=>{const l=GAMES.filter(g=>g.c===c.s),h=T("h2"),a=T("a",null,c.t);a.href="#cat-"+c.s;h.append(a);
    const m=T("a","more","See all "+l.length+" "+c.t+" games");m.href="#cat-"+c.s;
    app.append(h,T("p","lead",c.d),grid(l.slice(0,4)),m)});
}
// ===== pages =====
let timer;
function home(app){
  const hero=T("section","hero");
  const clock=T("div","clock"),lab=T("p","lead");
  hero.append(T("h1",null,"New games, speedruns and world records"),clock,lab);
  const G=day("2026-11-19"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,p2=n=>String(n).padStart(2,"0");
  const tick=()=>{let ms=G-Date.now(),past=ms<0;ms=Math.abs(ms);
    const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3),t=Math.floor(ms%1e3/100);
    clock.replaceChildren(document.createTextNode(d),T("small",null,"d"),document.createTextNode(p2(h)+":"+p2(m)+":"+p2(s)+(reduce?"":"."+t)));
    lab.textContent=past?"Time since the scheduled Grand Theft Auto VI date, November 19, 2026.":"Until Grand Theft Auto VI, scheduled for November 19, 2026. Dates can still move."};
  tick();timer=setInterval(tick,reduce?1000:100);
  const hi=T("p",null);hi.id="hello";hi.hidden=true;
  app.append(hero,hi,T("h2",null,"Browse by category"),chipRow(),T("h2",null,"Coming up and just out"),grid(newG.filter(g=>g.d).slice(1,5)));
  const m1=T("a","more","See all new games");m1.href="#new";
  app.append(m1,T("h2",null,"Games speedrunners love"),grid(runG.filter(g=>g.k==="run").slice(0,4)));
  const m2=T("a","more","See all speedrun games");m2.href="#runs";app.append(m2);
  const lrH=T("h2",null,proxyOk?"Fresh from speedrun.com":"Featured speedrun leaderboards");
  const lr=T("div");app.append(lrH,lr);latestRuns(lr,5,lrH);
  visit();
}
function newPage(app){
  app.append(T("h1",null,"New games"),T("p","lead","In release order. The gold-bordered game is the next one out."),grid(newG));
}
function runsPage(app){
  const q=T("input");q.type="search";q.placeholder="Filter by game";q.setAttribute("aria-label","Filter by game");
  const box=T("div");
  const draw=f=>{box.replaceChildren();const l=runG.filter(g=>g.t.toLowerCase().includes(f.toLowerCase()));
    box.append(l.length?grid(l):T("p",null,"No game matches “"+f+"”. Clear the filter to see all "+runG.length+" games."))};
  q.oninput=()=>draw(q.value);draw("");
  app.append(T("h1",null,"Speedrun games"),T("p","lead","Open a game for its speedrun videos, world-record videos and leaderboard."),chipRow(),q,box);
  const lrH=T("h2",null,proxyOk?"Latest verified runs":"Quick leaderboard links");
  const lrLead=T("p","lead",proxyOk?"Straight from speedrun.com, newest first.":"Direct links to speedrun.com leaderboards from the built-in catalog.");
  const lr=T("div");app.append(lrH,lrLead,lr);latestRuns(lr,10,lrH,lrLead);
}
function gamePage(app,g){
  const back=T("a","more","← All "+(g.k==="new"?"new":"speedrun")+" games");back.href=g.k==="new"?"#new":"#runs";back.style.marginTop="1.2rem";
  const info=T("div");info.append(T("h1",null,g.t),T("p","lead",g.b));
  const f=T("ul","facts"),row=(a,b)=>{const li=T("li");li.append(T("b",null,a),T("span",null,b));f.append(li)};
  if(g.d){const st=status(g);row("Release",day(g.d).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})+" ("+st[0].toLowerCase()+")")}
  else if(g.k!=="run")row("Release",g.w);
  if(g.d||g.k==="new")row("Platforms",g.w);
  if(g.y)row("First released",g.y);if(g.dev)row("Developer",g.dev);
  if(g.c){const c=CATS.find(x=>x.s===g.c),li=T("li"),a=T("a",null,c.t);a.href="#cat-"+c.s;li.append(T("b",null,"Category"),a);f.append(li)}
  info.append(f);
  if(g.k!=="run")info.append(A("Watch the trailer",yt(g.t+" trailer")));
  info.append(A("Speedruns",yt(g.t+" speedrun")),A("World record",yt(g.t+" world record speedrun")),A("Leaderboard","https://www.speedrun.com/search?q="+encodeURIComponent(g.t)));
  const d=T("div","detail");d.append(art(g),info);
  const rel=GAMES.filter(x=>x.s!==g.s&&(g.c?x.c===g.c:(g.k==="new"?x.k!=="run":x.k!=="new"))).slice(0,4);
  const wr=T("div");app.append(back,d,wr,T("h2",null,"More games"),grid(rel));records(wr,g);
}

// ===== live data =====
// nginx proxies these paths when self-hosted (see nginx.conf.template).
// On GitHub Pages or static hosts without the proxy, the site skips /api/ requests and uses the built-in GAMES list with no errors.
const STATIC_HOST=location.protocol==="file:"||/\.github\.io$/i.test(location.hostname);
let proxyOk=!STATIC_HOST;
const api=async u=>{
  if(!proxyOk)return null;
  const r=await fetch(u);
  if(r.status===404){proxyOk=false;return null}
  if(!r.ok)throw new Error(r.status);
  return r.json();
};
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,"");
const iso=d=>{const p=n=>String(n).padStart(2,"0");return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())};
const safe=u=>/^https?:\/\//i.test(u||"")?u:null;
const fmtT=t=>{const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=+(t%60).toFixed(2);return [h&&h+"h",(h||m)&&m+"m",s+"s"].filter(Boolean).join(" ")};
const pname=p=>p&&((p.names&&p.names.international)||p.name)||"Unknown";

// New releases from RAWG (last 14 days to next 90 days, most-wanted first)
async function loadReleases(){
  if(!proxyOk)return false;
  const a=new Date(today),b=new Date(today);a.setDate(a.getDate()-14);b.setDate(b.getDate()+90);
  const j=await api("/api/releases?dates="+iso(a)+","+iso(b)+"&ordering=-added&page_size=30");
  if(!j)return false;
  (j.results||[]).forEach(r=>{
    if(!r.name||!r.released)return;
    const w=(r.platforms||[]).map(p=>p.platform.name).join(", ")||"Platforms not listed",img=r.background_image||undefined;
    const old=GAMES.find(g=>norm(g.t)===norm(r.name));
    if(old){if(old.k!=="run"){old.d=r.released;if(!old.img&&img)old.img=img}}
    else GAMES.push({s:r.slug,t:r.name,k:"new",d:r.released,w,img,b:"New release"+((r.genres||[]).length?" · "+r.genres.map(x=>x.name).join(", "):"")+"."});
  });
  return true;
}

// Run list from speedrun.com: shows time, runner and links (or built-in fallback links on static hosts)
function runRow(label,time,who,run,cat){
  const li=T("li"),sp=T("span");
  sp.append(document.createTextNode((cat?cat+": ":"")+label+(who?" by "+who:"")+" "));
  const v=run.videos&&run.videos.links&&safe((run.videos.links[0]||{}).uri),w=safe(run.weblink);
  if(v)sp.append(A("Video",v));if(w)sp.append(A("Run page",w));
  li.append(T("b",null,time),sp);return li;
}
function fallbackRuns(box,n,heading,lead){
  if(heading)heading.textContent="Featured speedrun leaderboards";
  if(lead)lead.textContent="Direct links to speedrun.com leaderboards and YouTube runs from the built-in catalog.";
  const ul=T("ul","facts");
  runG.slice(0,n).forEach(g=>{
    const li=T("li"),sp=T("span"),pg=T("a","go","Game page");pg.href="#game-"+g.s;
    sp.append(document.createTextNode(g.t+(g.dev?" ("+g.dev+")":"")+" "),pg,A("Speedruns",yt(g.t+" speedrun")),A("Leaderboard","https://www.speedrun.com/search?q="+encodeURIComponent(g.t)));
    li.append(T("b",null,g.y||"Classic"),sp);
    ul.append(li);
  });
  box.replaceChildren(ul);
}
async function latestRuns(box,n,heading,lead){
  if(!proxyOk){fallbackRuns(box,n,heading,lead);return}
  box.append(T("p","lead","Loading the latest verified runs…"));
  try{
    const j=await api("/api/speedrun/runs?status=verified&orderby=verify-date&direction=desc&max="+n+"&embed=game,category,players");
    if(!j){fallbackRuns(box,n,heading,lead);return}
    const ul=T("ul","facts");
    (j.data||[]).forEach(r=>{
      const g=(r.game&&r.game.data)||{},c=(r.category&&r.category.data)||{},pl=((r.players&&r.players.data)||[]).map(pname).join(", ");
      ul.append(runRow(pname(g)+" ("+(c.name||"run")+")",fmtT(r.times.primary_t),pl,r));
    });
    box.replaceChildren(ul.children.length?ul:T("p","lead","No runs returned right now."));
  }catch(e){fallbackRuns(box,n,heading,lead)}
}

// Current world records for one game (exact name match on speedrun.com only)
async function records(box,g){
  if(!proxyOk)return;
  try{
    const f=await api("/api/speedrun/games?name="+encodeURIComponent(g.t)+"&max=5");
    if(!f)return;
    const hit=(f.data||[]).find(x=>norm(x.names.international)===norm(g.t));if(!hit)return;
    const j=await api("/api/speedrun/games/"+hit.id+"/records?top=1&scope=full-game&miscellaneous=no&skip-empty=true&embed=category,players&max=8");
    if(!j)return;
    const ul=T("ul","facts");
    (j.data||[]).forEach(lb=>{
      const e=(lb.runs||[])[0];if(!e)return;
      const ps=Object.fromEntries(((lb.players&&lb.players.data)||[]).map(p=>[p.id,p]));
      const who=(e.run.players||[]).map(p=>pname(ps[p.id]||p)).join(", ");
      ul.append(runRow("",fmtT(e.run.times.primary_t),who,e.run,(lb.category&&lb.category.data&&lb.category.data.name)||"Category"));
    });
    if(ul.children.length)box.append(T("h2",null,"Current world records"),ul);
  }catch(e){}
}

// Cover art: for every game on screen with no image, look it up on RAWG (exact name match only), then swap it in
const covq=[];let covBusy=0;
function fillCovers(){
  if(!proxyOk)return;
  document.querySelectorAll(".art[data-s]").forEach(e=>{const g=GAMES.find(x=>x.s===e.dataset.s);if(g&&!g.img&&!g.tried){g.tried=true;covq.push(g)}});
  while(proxyOk&&covBusy<4&&covq.length){covBusy++;cover(covq.shift()).finally(()=>{covBusy--;fillCovers()})}
}
async function cover(g){
  try{
    const q=g.t.replace(/\s*\(.*?\)/,"");
    const j=await api("/api/cover?search="+encodeURIComponent(q)+"&search_precise=true&page_size=5");
    if(!j)return;
    const rs=(j.results||[]).filter(r=>r.background_image);
    const hit=rs.find(r=>norm(r.name)===norm(g.t))||rs.find(r=>norm(r.name)===norm(q));
    if(!hit)return;
    g.img=hit.background_image;
    document.querySelectorAll('.art[data-s="'+g.s+'"]').forEach(e=>e.replaceWith(art(g)));
  }catch(e){}
}

async function refresh(){
  if(!proxyOk)return;
  try{const updated=await loadReleases();if(!updated)return;rebuild();
    if(!(document.activeElement&&document.activeElement.tagName==="INPUT"))route(true)}catch(e){}
}

// ===== router =====
const DEFAULT_DESC="Frame Perfect tracks upcoming game releases, retro classics, and top speedrun games with direct links to YouTube runs, world records, and speedrun.com leaderboards.";
function setMeta(title,desc){
  document.title=title;
  const set=(sel,val)=>{const el=document.querySelector(sel);if(el)el.setAttribute("content",val)};
  set('meta[name="description"]',desc);
  set('meta[property="og:title"]',title);
  set('meta[property="og:description"]',desc);
  set('meta[name="twitter:title"]',title);
  set('meta[name="twitter:description"]',desc);
}
function route(soft){
  clearInterval(timer);
  const h=(location.hash||"#home").slice(1),app=document.getElementById("app");app.replaceChildren();
  let page="home";
  if(h==="new"){page="new";newPage(app);setMeta("New games – Frame Perfect","Upcoming and newly released video games in release order with platform details and trailers.")}
  else if(h==="runs"){page="runs";runsPage(app);setMeta("Speedrun games – Frame Perfect","Browse and filter top speedrunning games with direct links to YouTube runs, world records, and speedrun.com.")}
  else if(h==="categories"){page="categories";catsPage(app);setMeta("Game categories – Frame Perfect","Explore Triple-A, Indie, Retro, RPG, Horror, Fighting, Sports & Racing, and Simulation games.")}
  else if(h.startsWith("cat-")&&CATS.some(c=>"cat-"+c.s===h)){const c=CATS.find(c=>"cat-"+c.s===h);page="categories";catPage(app,c);setMeta(c.t+" games – Frame Perfect",c.d)}
  else if(h.startsWith("game-")&&GAMES.some(g=>"game-"+g.s===h)){const g=GAMES.find(g=>"game-"+g.s===h);page=g.k==="new"?"new":"runs";gamePage(app,g);setMeta(g.t+" – Frame Perfect",g.b)}
  else{home(app);setMeta("Frame Perfect – New games and speedruns",DEFAULT_DESC)}
  document.querySelectorAll("#nav a").forEach(a=>a.dataset.p===page?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
  if(soft!==true&&location.hash!=="")window.scrollTo(0,0);
  fillCovers();
}
addEventListener("hashchange",()=>route());

// ===== cookies =====
const setC=(k,v)=>{try{document.cookie=k+"="+encodeURIComponent(v)+"; max-age=31536000; path=/; SameSite=Strict"+(location.protocol==="https:"?"; Secure":"")}catch(e){}try{localStorage.setItem(k,v)}catch(e){}};
const getC=k=>{try{const m=document.cookie.match(new RegExp("(?:^|; )"+k+"=([^;]*)"));if(m)return decodeURIComponent(m[1])}catch(e){}try{return localStorage.getItem(k)}catch(e){}return null};
const bar=document.getElementById("cookie");
function visit(){
  if(getC("consent")!=="yes")return;
  const last=getC("last_visit"),h=document.getElementById("hello");
  if(last&&h){h.hidden=false;h.textContent="You last visited on "+new Date(Number(last)).toLocaleDateString()+"."}
  let seen=null;try{seen=sessionStorage.getItem("v")}catch(e){}
  if(!seen){setC("last_visit",Date.now());try{sessionStorage.setItem("v","1")}catch(e){}}
}
if(!getC("consent"))bar.style.display="block";
document.getElementById("acc").onclick=()=>{setC("consent","yes");bar.style.display="none";visit()};
document.getElementById("dec").onclick=()=>{setC("consent","no");bar.style.display="none"};
document.getElementById("reset").onclick=e=>{e.preventDefault();bar.style.display="block"};
route();
if(proxyOk){refresh();setInterval(refresh,30*60*1000)}
