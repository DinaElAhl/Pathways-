export const learningGames = [
 { id: 'letters', title: 'Arabic Letter Match', arabic: 'تعرّف على الحروف', description: 'Match five Arabic letters to their names.', questions: [
 {prompt:'Name this letter.',display:'ب', options:['Bāʾ','Tāʾ','Nūn'],answer:0,explanation:'Bāʾ (ب) has one dot below. Its sound is b.'},
 {prompt:'Name this letter.',display:'ت',options:['Bāʾ','Tāʾ','Yāʾ'],answer:1,explanation:'Tāʾ (ت) has two dots above. Its sound is t.'},
 {prompt:'Name this letter.',display:'ن',options:['Mīm','Bāʾ','Nūn'],answer:2,explanation:'Nūn (ن) has one dot above. Its sound is n.'},
 {prompt:'Name this letter.',display:'م',options:['Mīm','Lām','Alif'],answer:0,explanation:'Mīm (م) represents the m sound.'},
 {prompt:'Name this letter.',display:'ل',options:['Alif','Lām','Nūn'],answer:1,explanation:'Lām (ل) represents the l sound.'}] },
 { id:'words',title:'Build an Arabic Word',arabic:'رتّب حروف الكلمة',description:'Put letters in reading order to build three everyday words.',questions:[
 {prompt:'Build bāb — door. Choose letters in Arabic reading order (right to left).',display:'باب',letters:['ا','ب','ب'],sequence:['ب','ا','ب'],explanation:'ب + ا + ب → باب (bāb): door.'},
 {prompt:'Build kitāb — book. Choose letters in Arabic reading order (right to left).',display:'كتاب',letters:['ب','ا','ك','ت'],sequence:['ك','ت','ا','ب'],explanation:'ك + ت + ا + ب → كتاب (kitāb): book.'},
 {prompt:'Build qalam — pen. Choose letters in Arabic reading order (right to left).',display:'قلم',letters:['م','ق','ل'],sequence:['ق','ل','م'],explanation:'ق + ل + م → قلم (qalam): pen.'}] }
]
