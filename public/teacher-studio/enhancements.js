(() => {
  'use strict';
  const fieldSelector = 'input[type="text"],input[type="date"],input[type="checkbox"],textarea,select:not(.studio-select)';
  const page = location.pathname.split('/').pop();
  const saveKey = 'pathways.teacher-studio.' + page;
  const storeKeys = ({
    'e2-complete-app.html':['lp','bp','chk'],
    'e2-lesson-planner.html':['lesson_plan'],
    'e2-blueprint-planner.html':['blueprint'],
    'e2-rubrics-assessment.html':['rubric','reflection'],
    'e2-teaching-framework.html':['checklist']
  }[page] || []).map(k=>'pathways_studio_e2_'+k);
  const status = document.createElement('p'); status.className = 'studio-status'; status.setAttribute('role','status');
  let data, restored = false;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function labelOf(el) {
    if (el.id) { const l = document.querySelector('label[for="'+CSS.escape(el.id)+'"]'); if(l) return l.textContent.trim(); }
    const td = el.closest('td');
    if(td) { const table = td.closest('table'); return 'Week '+td.parentElement.cells[0].textContent.trim()+' — '+(table.querySelectorAll('thead th')[td.cellIndex]?.textContent || 'Planning notes').trim(); }
    const parent=el.closest('.field,.gen-field,.obs-field,.card-field,.form-group,.template,.obs-detail,.check-item,.chk-item,.checklist-item,.check');
    return (parent?.querySelector('label,h5,strong')?.textContent || el.placeholder || el.id || 'Notes').trim();
  }
  const extra = [
    [/subject/i,['Mathematics','English language arts','Arabic','Qur’an & Tajweed','Science','History','Computing','Art','Physical education']],
    [/grade|level/i,['Early years','Grade 1–2','Grade 3–5','Grade 6–8','Grade 9–12','Adult learners','Mixed-age group']],
    [/duration|period|time/i,['15 minutes','30 minutes','45 minutes','60 minutes','Two 30-minute sessions']],
    [/theme|topic|unit/i,['Fractions and fair sharing','Plants and their needs','Reading for meaning','Vocabulary in context','Patterns in the natural world']],
    [/term/i,['Term 1','Term 2','Term 3','Semester 1','Semester 2']],
    [/objective|obj[12]/i,['Students will explain the idea in their own words and give an example.','Students will solve a problem and justify their reasoning.','Students will compare two examples using evidence.']],
    [/hook|curiosity/i,['Show one image: what do you notice and wonder?','Start with a surprising question.','Ask students to predict before revealing the result.']],
    [/teach|instruction|guide/i,['Model a worked example and think aloud.','Break instruction into small chunks with a check after each.','Prepare vocabulary and a visual example before teaching.']],
    [/practice|classwork|\bcw\b/i,['Model together, practise with a partner, then try independently.','Find and correct an error in a worked example.','Create an example and explain it to a partner.']],
    [/homework|\bhw\b/i,['Practise three examples and explain one solution.','Find a real-life example and describe it.','Read the short passage and bring one question.']],
    [/assess|exit|success|question|mc[123]/i,['Use an exit ticket: one example, one explanation, one question.','Ask students to choose an answer and explain why.','Identify a misconception and reteach with a new example.']],
    [/link|resource|video|nearpod|flip/i,['Add the share link from your LMS or school-approved resource.','Add a captioned video with a clear viewing question.','Check that the resource opens for students without extra permissions.']],
    [/strength|evidence|observ/i,['Students explained their reasoning using examples.','The teacher checked understanding before moving on.','Learners had more than one way to show understanding.']],
    [/growth|next|comment|revised/i,['Reteach one misconception with a concrete example.','Offer a scaffold and check progress in the next lesson.','Give specific feedback and time to revise.']],
    [/teacher|observer|school|name|year/i,[]],
  ];
  function phrasesFor(el) {
    const label=labelOf(el), key=label+' '+(el.id||'');
    // Human names, dates and school details are entered by the teacher, never invented.
    if(el.type==='date' || /teacher name|observer name|school|academic year|meta_teacher|bp_teacher/i.test(key)) return [];
    const slot=data.slots.find(s=>s.label.toLowerCase()===label.toLowerCase()) || data.slots.find(s=>label.length>3 && s.label.toLowerCase().startsWith(label.toLowerCase()));
    if(slot) return slot.phrases;
    const found=extra.find(([re])=>re.test(key));
    return found ? found[1] : ['Start with what learners already know.','Use a clear example, then check understanding.','Offer a choice of response: speech, writing, drawing or demonstration.'];
  }
  function fields() { return [...document.querySelectorAll(fieldSelector)].filter(el=>!el.closest('.studio-toolbar,.studio-helper')); }
  function addSuggestions(root=document) {
    root.querySelectorAll('textarea,input[type="text"]').forEach(el=>{
      if(el.dataset.studioReady || el.closest('.studio-toolbar,.studio-helper')) return;
      el.dataset.studioReady='true';
      const phrases=phrasesFor(el); if(!phrases.length) return;
      const select=document.createElement('select'); select.className='studio-select studio-suggestion';
      select.setAttribute('aria-label','Suggestions for '+labelOf(el));
      const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Choose a suggestion…';select.appendChild(placeholder);
      for(const text of phrases){const option=document.createElement('option');option.value=text;option.textContent=text;select.appendChild(option);}
      select.addEventListener('change',()=>{
        if(!select.value)return;
        // Keep the teacher’s existing work; suggestions are added and remain editable.
        const separator=el.tagName==='TEXTAREA'?'\n':' · ';
        el.value=el.tagName==='TEXTAREA'&&el.value.trim()?el.value+separator+select.value:select.value;
        el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));
        select.value='';el.focus();persist();
      });
      el.before(select);
      if(!el.getAttribute('aria-label')&&!el.labels?.length) el.setAttribute('aria-label',labelOf(el));
    });
  }
  function snapshots(){return fields().map((el,index)=>({id:el.id,index,value:el.value,...(el.type==='checkbox'?{checked:el.checked}:{})}));}
  function persist(){
    try { localStorage.setItem(saveKey,JSON.stringify({version:1,fields:snapshots()})); }
    catch { status.textContent='Browser storage is unavailable or full. Export your work before closing this page.'; }
  }
  function restore(){
    if(restored)return;restored=true;
    try{
      const saved=JSON.parse(localStorage.getItem(saveKey)||'null');if(!saved)return;
      const all=fields();
      for(const f of saved.fields||[]){const el=f.id?document.getElementById(f.id):all[f.index];if(el?.type==='checkbox'&&typeof f.checked==='boolean'){el.checked=f.checked;el.dispatchEvent(new Event('change',{bubbles:true}));}
        else if(el&&typeof f.value==='string'&&el.value!==f.value){el.value=f.value;el.dispatchEvent(new Event('input',{bubbles:true}));}}
    }catch{status.textContent='Saved work could not be read. Your existing tool saves are unchanged.';}
  }
  function sections(){
    const scope=document.querySelector('.tab.active') || document.querySelector('.container') || document.body;
    return fields().filter(el=>scope.contains(el)&&el.type!=='checkbox'&&el.value.trim()).map(el=>({label:labelOf(el),value:el.value}));
  }
  function textContent(){
    const entries=sections();
    const scope=document.querySelector('.tab.active') || document.querySelector('.container') || document.body;
    const checks=[...scope.querySelectorAll('input[type="checkbox"]')].map(cb=>({label:labelOf(cb),value:cb.checked?'Checked':'Not checked'}));
    // Read-only framework/rubric tabs still export their reference content.
    const ratings=[...scope.querySelectorAll('.rubric-table td.selected')].map(td=>({label:td.parentElement.cells[0].textContent.trim(),value:'Rating '+td.dataset.val+': '+td.textContent.trim()}));
    if(!entries.length&&!checks.length&&!ratings.length)return scope.innerText.replace(/Choose a suggestion…/g,'').trim();
    return [...entries,...checks,...ratings].map(e=>e.label+'\n'+e.value).join('\n\n');
  }
  function fragment(){return '<article><h1>E² Teaching Framework</h1><p>'+esc(textContent()).replace(/\n/g,'<br>')+'</p></article>';}
  function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Export downloaded. Preview it before sharing with students.';}
  function exportSelected(format){
    if(format==='text')download('e2-teaching.txt',textContent(),'text/plain;charset=utf-8');
    if(format==='html')download('e2-teaching.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>E² teaching plan</title><body>'+fragment()+'</body></html>','text/html;charset=utf-8');
    if(format==='csv'){
      const safe=v=>'"'+String(v).replace(/^\s*[=+@-]/,"'$&").replace(/"/g,'""')+'"';
      const rows=sections();download('e2-planning.csv','\uFEFFField,Content\r\n'+rows.map(r=>safe(r.label)+','+safe(r.value)).join('\r\n'),'text/csv;charset=utf-8');
    }
    if(format==='pdf'){
      const w=window.open('','_blank');if(!w){status.textContent='Allow a print window, then try again.';return;}
      w.document.write('<!doctype html><html><head><title>E² Teaching Plan</title><style>body{font:16px Arial;line-height:1.6;max-width:800px;margin:40px auto}article{overflow-wrap:anywhere}@media print{body{margin:0}}</style></head><body>'+fragment()+'</body></html>');w.document.close();w.focus();w.print();
    }
  }
  function helper(tab){
    const details=document.createElement('details'); details.className='studio-helper';
    const summary=document.createElement('summary'); summary.textContent='Teaching suggestions for this tab'; details.appendChild(summary);
    const select=document.createElement('select');select.className='studio-select';select.setAttribute('aria-label','Choose a teaching focus');
    const blank=document.createElement('option');blank.value='';blank.textContent='Choose a teaching focus…';select.appendChild(blank);
    for(const slot of data.slots){const o=document.createElement('option');o.value=slot.label;o.textContent=slot.label;select.appendChild(o);}
    const list=document.createElement('ul');select.onchange=()=>{list.replaceChildren();for(const phrase of data.slots.find(s=>s.label===select.value)?.phrases||[]){const li=document.createElement('li');li.textContent=phrase;list.appendChild(li);}};
    details.append(select,list);tab.prepend(details);
  }
  function toolbar(){
    const bar=document.createElement('section');bar.className='studio-toolbar';bar.setAttribute('aria-label','Teacher Studio sharing tools');
    const home=document.createElement('a');home.href='../edu-hub';home.textContent='← Pathways EduHub';bar.appendChild(home);
    const head=document.createElement('h2');head.textContent='Plan here. Teach on your platform.';bar.appendChild(head);
    const note=document.createElement('p');note.textContent='Suggestions are starting points, not generated lessons. Edit them for your subject and learners. Work saves on this browser; export a backup before switching devices.';bar.appendChild(note);
    const platform=document.createElement('select');platform.className='studio-select';platform.setAttribute('aria-label','Your learning platform');
    data.platforms.forEach(p=>{const o=document.createElement('option');o.textContent=p.name;platform.appendChild(o);});
    const guide=document.createElement('p');guide.className='studio-guide';const update=()=>{guide.textContent=data.platforms[platform.selectedIndex].tip;};platform.onchange=update;update();bar.append(platform,guide);
    const tools=document.createElement('div');tools.className='studio-buttons';
    for(const [format,label] of [['text','Download text'],['html','Download HTML'],['csv','Planning CSV'],['pdf','Print / PDF']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>exportSelected(format);tools.appendChild(b);}
    const copy=document.createElement('button');copy.type='button';copy.textContent='Copy HTML for an editor';copy.onclick=async()=>{try{await navigator.clipboard.writeText(fragment());status.textContent='HTML copied. Paste into an HTML editor, then check student preview.';}catch{status.textContent='Clipboard unavailable. Download HTML instead.';}};tools.appendChild(copy);
    const backup=document.createElement('button');backup.type='button';backup.textContent='Backup this tool';backup.onclick=()=>{
      const stores={};for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(storeKeys.includes(key)) stores[key]=localStorage.getItem(key);}
      download('e2-backup.json',JSON.stringify({version:1,page,fields:snapshots(),stores},null,2),'application/json');
    };tools.appendChild(backup);
    const upload=document.createElement('input');upload.type='file';upload.accept='.json,application/json';upload.setAttribute('aria-label','Restore a Teacher Studio backup');
    upload.onchange=async()=>{try{
      if(upload.files[0].size>5000000)throw new Error('Backup is too large.');
      const saved=JSON.parse(await upload.files[0].text());if(saved.version!==1||saved.page!==page||!Array.isArray(saved.fields)||saved.fields.length>10000||!saved.fields.every(f=>typeof f.value==='string'&&Number.isInteger(f.index)))throw new Error('Open the same tool the backup came from.');
      if(!confirm('Restore this backup? This replaces saved work for this tool.'))return;
      // Only data-save keys are restored; tier or licensing settings never are.
      for(const [key,value] of Object.entries(saved.stores||{})){if(storeKeys.includes(key)&&typeof value==='string'){JSON.parse(value);localStorage.setItem(key,value);}}
      localStorage.setItem(saveKey,JSON.stringify({version:1,fields:saved.fields}));location.reload();
    }catch(e){status.textContent='Could not restore: '+e.message;}};
    const uploadLabel=document.createElement('label');uploadLabel.textContent='Restore backup ';uploadLabel.appendChild(upload);tools.appendChild(uploadLabel);
    const limitations=document.createElement('p');limitations.className='studio-small';limitations.textContent='Exports use the current tab. CSV is for planning spreadsheets, not automatic course or grade import. No account connection, grade sync, SCORM or LTI integration is included.';
    const sharing=document.createElement('details'); sharing.className='studio-sharing';
    const summary=document.createElement('summary');summary.textContent='Share with your LMS · Export · Backup';
    sharing.append(summary,note,platform,guide,tools,limitations,status);bar.appendChild(sharing);document.body.prepend(bar);
  }
  fetch('suggestions.json').then(r=>{if(!r.ok)throw new Error('Suggestions unavailable');return r.json();}).then(config=>{
    data=config;toolbar();
    const tabs=document.querySelectorAll('.tab');if(tabs.length)tabs.forEach(helper);else helper(document.querySelector('.container')||document.body);
    addSuggestions();restore();
    document.addEventListener('click',()=>setTimeout(persist,700));
    document.addEventListener('change',e=>{if(e.target.matches(fieldSelector))persist();});
    let timer;document.addEventListener('input',e=>{if(e.target.matches(fieldSelector)){clearTimeout(timer);timer=setTimeout(persist,300);}});
    // Blueprint rows and generated assessments are rebuilt by the original app.
    new MutationObserver(()=>addSuggestions()).observe(document.body,{childList:true,subtree:true});
  }).catch(e=>{console.error(e);});
})();
