const projects = [
 {title:'Wellbeing Application',type:'Application prototype · Private source',stack:['React','FastAPI','MongoDB'],description:'A multi-step mood and activity interface with shared frontend state and a separate Python status API.',implementation:'React Context and guarded routes coordinate the frontend journey. A separate FastAPI service creates and retrieves MongoDB status records.',limits:'Browser-storage login is simulated, not secure authentication. The reviewed status API does not implement the mood/activity workflow. Private source is not included.',next:'Connect one complete workflow to the backend; implement server-side authentication and authorization; add navigation and API tests.',url:null},
 {title:'The Grid',type:'Interactive cybersecurity education',stack:['Interactive learning','AI & security','Web experience'],description:'An exploration-based educational experience about the benefits and risks of artificial intelligence in cybersecurity.',implementation:'An AI-assisted interactive project developed around a retro grid-world learning concept. The public repository currently contains a ZIP archive and a minimal README.',limits:'The archive was not unpacked in the source review. This is educational content, not an operational security tool or machine-learning model.',next:'Extract browsable source, publish setup instructions and research sources, and add a demo and interaction checks.',url:'https://github.com/duudjack/The-grid-AI-X-Cybersecurity-'},
 {title:'Static File Explorer',type:'HTTP requests & UI feedback',stack:['JavaScript','Fetch API','Pico.css'],description:'A static resource listing enhanced with asynchronous availability checks and readable file-size feedback.',implementation:'Requests begin with HEAD and fall back to GET when needed. Availability indicators and a byte-formatting utility update the hardcoded resource table.',limits:'Not a general-purpose file manager. Resources are hardcoded and file sizes depend on response headers.',next:'Use a structured manifest, add filtering and sorting, and test formatting and request fallback behavior.',url:'https://github.com/duudjack/file-browser',demo:'https://filebrowsermouhamet.netlify.app/'},
 {title:'Everyday Carry',type:'Template-driven publishing',stack:['Eleventy','Liquid','CSS'],description:'A static website using shared layouts, reusable image rendering, and a configured asset pipeline.',implementation:'Liquid templates use a shared layout. Eleventy configuration defines asset passthrough and an itemImage shortcode.',limits:'A small content-focused course project; no backend or data engineering pipeline is claimed.',next:'Move item content into structured data, generate pages from a common template, and automate build checks.',url:'https://github.com/duudjack/11y-everyday-carry-website'},
 {title:'Aquarium Portal Concept',type:'Responsive interface prototype',stack:['Bootstrap','JavaScript','SVG','CSS'],description:'An unofficial educational member-portal concept with responsive layout and generated fish graphics.',implementation:'Bootstrap supports the layout, custom CSS defines the visual style, and JavaScript generates decorative SVG fish. Form submission displays an alert.',limits:'No working authentication or verified social-login integration. Not affiliated with or commissioned by the aquarium.',next:'Replace placeholder actions, fix invalid CSS, improve labels and keyboard states, and support reduced motion.',url:'https://github.com/duudjack/framework-challenge',demo:'https://frameworkproject.netlify.app/'},
 {title:'MI 349 Blog',type:'Web development foundations',stack:['HTML','CSS','Netlify Forms'],description:'A multi-page publishing project practicing content structure, navigation, styling, and contact forms.',implementation:'Separate pages organize articles, background, and contact information. Contact markup includes labels and Netlify form-processing attributes.',limits:'A foundational web project. Production deployment and form delivery were not tested in the source review.',next:'Check accessibility and responsive layouts, replace placeholders, and document form behavior.',url:'https://github.com/duudjack/mi349_blog',demo:'https://tubular-brioche-eca97b.netlify.app'}
];
const focusContent = {
 software: {label:'Current foundation', title:'Web applications & interactive experiences', description:'Frontend interfaces, reusable templates, and application prototypes. Backend capabilities and simulated features are described separately.', ids:[0,1,2,3,4,5]},
 data: {label:'Developing focus', title:'Toward dependable data workflows', description:'HTTP resource checks and a MongoDB status service are supporting experience—not a completed data engineering pipeline. The planned pipeline below will target ingestion, modeling, quality checks, and recovery.', ids:[2,0]},
 security: {label:'Education + planned hardening', title:'Security concepts, clearly communicated', description:'An educational experience and an application prototype with explicit security limitations. No penetration-testing, secure-authentication, or operational detection expertise is claimed.', ids:[1,0]},
 science: {label:'Developing focus', title:'Reproducible analysis is the next step', description:'The reviewed projects do not establish completed statistical modeling or machine learning. Interactive presentation is supporting experience; the planned analytical study is listed below.', ids:[]}
};
function element(tag, text, className) {
 const node=document.createElement(tag);
 if(text!==undefined) node.textContent=text;
 if(className) node.className=className;
 return node;
}
function externalLink(label,url) {
 const link=element('a',label);link.href=url;link.target='_blank';link.rel='noopener noreferrer';return link;
}
function projectCard(project,index) {
 const card=element('article',undefined,'project');
 card.append(element('span',String(index+1).padStart(2,'0')+' / '+project.type,'project-type'),element('h3',project.title),element('p',project.description));
 const tags=element('div',undefined,'tags');project.stack.forEach(item=>tags.append(element('span',item,'tag')));card.append(tags);
 const links=element('div',undefined,'links');
 if(project.url) links.append(externalLink('Repository ↗',project.url));else links.append(element('span','Private source','muted'));
 if(project.demo) links.append(externalLink('Demo link ↗',project.demo));card.append(links);
 const details=element('details');details.append(element('summary','Read the case study'));
 const content=element('div',undefined,'case');
 [['Implementation',project.implementation],['Current limitations',project.limits],['Next improvements',project.next]].forEach(([heading,text])=>content.append(element('h4',heading),element('p',text)));
 details.append(content);card.append(details);return card;
}
function renderFocus(requested) {
 const role=Object.prototype.hasOwnProperty.call(focusContent,requested)?requested:'software';
 const focus=focusContent[role];
 document.querySelectorAll('[data-focus]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.focus===role)));
 document.getElementById('focus-label').textContent=focus.label;
 document.getElementById('focus-title').textContent=focus.title;
 document.getElementById('focus-description').textContent=focus.description;
 const grid=document.getElementById('project-grid');grid.replaceChildren();
 focus.ids.forEach(index=>grid.append(projectCard(projects[index],index)));
 if(!focus.ids.length) grid.append(element('p','No completed data science case study is claimed yet. See the proposed Vulnerability Trends Study in the roadmap.','empty'));
}
document.querySelectorAll('[data-focus]').forEach(button=>button.addEventListener('click',()=>{
 renderFocus(button.dataset.focus);
 try {const url=new URL(window.location.href);url.searchParams.set('focus',button.dataset.focus);history.replaceState(null,'',url);} catch(error) {}
}));
renderFocus(new URLSearchParams(window.location.search).get('focus'));
document.getElementById('year').textContent=new Date().getFullYear();
