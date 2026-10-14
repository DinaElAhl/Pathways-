import fs from 'node:fs';
import { quranicNames } from '../src/data/quranicNames.js';
const raw=fs.readFileSync('.work/quran-uthmani.txt','utf8');
const notice=raw.slice(raw.indexOf('#====')).split('\n').map(l=>l.replace(/^# ?/,'')).join('\n');
const clean=s=>s.replace(/ٱ/g,'ا').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'').replace(/ـ/g,'').replace(/ى/g,'ي');
const forms=s=>[clean(s),clean(s.replace(/ٰ/g,'ا'))];
const names=quranicNames.map(n=>({key:n.transliteration,parts:n.arabic.split(/\s+و\s+/).map(p=>new Set(forms(p).flatMap(v=>[v,v.replace(/^ال/,'')])))}));
const verses=raw.split('\n').filter(l=>/^\d+\|\d+\|/.test(l)).map(l=>{const [surah,ayah,...t]=l.trim().split('|');return {ref:surah+':'+ayah,text:t.join('|')}});
if(verses.length!==6236)throw Error('Invalid corpus');
const index={};for(const n of names)index[n.key]=[];
for(const v of verses){const tokens=v.text.split(/\s+/);const hits=[];for(const n of names){const matched=tokens.filter(t=>n.parts.some(p=>forms(t).some(w=>p.has(w)||p.has(w.replace(/^[وفب]/,''))||p.has(w.replace(/ا$/,'')))));if(matched.length)hits.push({key:n.key,words:matched})}for(const hit of hits)index[hit.key].push({...v,words:hit.words,cooccurring:hits.filter(h=>h.key!==hit.key).map(h=>({key:h.key,words:h.words}))})}
fs.mkdirSync('public/quran',{recursive:true});fs.writeFileSync('public/quran/name-wording-index.json',JSON.stringify({notice,source:'https://tanzil.net',method:'Wording matches, not a theological classification. Related forms and context require review.',names:index}));fs.writeFileSync('public/quran/TANZIL-LICENSE.txt',notice);
console.log('6236 verses indexed; '+Object.keys(index).length+' cards');
