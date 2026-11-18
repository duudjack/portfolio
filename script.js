const projects = [
 {title:'Wellbeing App',type:'App prototype · Private repository',stack:['React','FastAPI','MongoDB'],description:'An app prototype where you choose how you feel, add some context, and explore suggested activities.',implementation:'The React side has screens for choosing a mood, picking an activity, and following the instructions. It uses shared state and route guards to move between screens. There is also a separate FastAPI service that saves and retrieves status records in MongoDB.',limits:'The login is a browser-storage simulation, not real authentication. The status API is not connected to the mood and activity flow yet. The repository is private.',next:'I want to connect the screens to the backend, add proper authentication, and test the full flow.',url:null},
 {title:'The Grid',type:'Interactive learning project',stack:['Interactive storytelling','AI & cybersecurity','Web experience'],description:'An interactive project about the helpful and harmful sides of AI in cybersecurity, built around a retro grid-world idea.',implementation:'This project came from wanting to make the topic something you could explore instead of just read through. I worked on the concept and iterations with AI assistance. The public repository currently has the project packaged as a ZIP.',limits:'It is an educational experience, not a tool that detects attacks. The source is still packaged in an archive, so it needs a cleaner repository setup.',next:'I want to organize the source files, add clearer setup instructions and research links, and put together an easy-to-access demo.',url:'https://github.com/duudjack/The-grid-AI-X-Cybersecurity-'},
 {title:'File Browser',type:'Web project',stack:['JavaScript','Fetch API','Pico.css'],description:'A simple page for opening different file types, checking whether the links work, and showing their sizes when that information is available.',implementation:'The page checks links with HEAD requests first and falls back to GET when needed. JavaScript updates the status beside each file and formats the file sizes into something easier to read.',limits:'The file list is written into the page. It does not upload files or browse a real directory, and file sizes depend on the response headers.',next:'I would like to load the list from a data file, add search and sorting, and test how the page handles failed requests.',url:'https://github.com/duudjack/file-browser',demo:'https://filebrowsermouhamet.netlify.app/'},
 {title:'Everyday Carry',type:'Class project',stack:['Eleventy','Liquid','CSS'],description:'A small site about a few things I carry with me, made while working with templates and static-site tools.',implementation:'The pages use a shared Liquid layout. The Eleventy configuration copies the images and styles into the finished site and includes a reusable image shortcode.',limits:'It is a small content site rather than an app with a backend.',next:'I would move the item information into one data file and use a common template to generate the pages.',url:'https://github.com/duudjack/11y-everyday-carry-website'},
 {title:'Aquarium Portal Concept',type:'Interface prototype',stack:['Bootstrap','JavaScript','SVG','CSS'],description:'An aquarium-themed page where I tried out Bootstrap, custom styling, and animated fish graphics.',implementation:'Bootstrap handles the layout, while the custom CSS gives the page its look. JavaScript generates the decorative SVG fish. Submitting the form displays an alert.',limits:'The login and social buttons are part of the interface concept, not working authentication. This was an unofficial educational project, not work commissioned by the aquarium.',next:'I want to clean up the placeholder actions, improve the form labels and keyboard controls, and add a reduced-motion option.',url:'https://github.com/duudjack/framework-challenge',demo:'https://frameworkproject.netlify.app/'},
 {title:'MI 349 Blog',type:'Class project',stack:['HTML','CSS','Netlify Forms'],description:'A blog-style site I worked on across several assignments, practicing page structure, styling, and forms along the way.',implementation:'It has separate pages for posts, background information, and contact details, with a shared stylesheet. The contact form has labeled inputs and markup for Netlify Forms.',limits:'It is a basic static site. Form delivery still needs to be checked on the hosted version.',next:'I would check the mobile layout and accessibility, remove any remaining placeholder content, and make sure the contact form works as expected.',url:'https://github.com/duudjack/mi349_blog',demo:'https://tubular-brioche-eca97b.netlify.app'}
];

function element(tag, text, className) {
 const node = document.createElement(tag);
 if (text !== undefined) node.textContent = text;
 if (className) node.className = className;
 return node;
}

function externalLink(label, url) {
 const link = element('a', label);
 link.href = url;
 link.target = '_blank';
 link.rel = 'noopener noreferrer';
 return link;
}

function projectCard(project, index) {
 const card = element('article', undefined, 'project');
 card.append(
  element('span', String(index + 1).padStart(2, '0') + ' / ' + project.type, 'project-type'),
  element('h3', project.title),
  element('p', project.description)
 );
 const tags = element('div', undefined, 'tags');
 project.stack.forEach(item => tags.append(element('span', item, 'tag')));
 card.append(tags);
 const links = element('div', undefined, 'links');
 if (project.url) links.append(externalLink('View code ↗', project.url));
 else links.append(element('span', 'Private repository', 'muted'));
 if (project.demo) links.append(externalLink('View site ↗', project.demo));
 card.append(links);
 const details = element('details');
 details.append(element('summary', 'More about this project'));
 const content = element('div', undefined, 'case');
 [
  ['How it works', project.implementation],
  ['Still needs work', project.limits],
  ["What I'd do next", project.next]
 ].forEach(([heading, text]) => content.append(element('h4', heading), element('p', text)));
 details.append(content);
 card.append(details);
 return card;
}

const grid = document.getElementById('project-grid');
if (grid) {
 grid.replaceChildren();
 projects.forEach((project, index) => grid.append(projectCard(project, index)));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
