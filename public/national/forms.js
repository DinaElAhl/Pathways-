/* No no-cors: a confirmed saved-record receipt is required for success. */
const forms = document.querySelectorAll('form');
let ready = false;
const endpoint = window.ROOTS_CONFIG.ENDPOINT;
const status = document.getElementById('availability');
forms.forEach(form => {
  const button = form.querySelector('[type=submit]'); button.disabled = true;
  let requestId = crypto.randomUUID();
  form.addEventListener('input', () => { requestId = crypto.randomUUID() });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!ready || !form.reportValidity()) return;
    const msg = document.getElementById('msg');
    const data = Object.fromEntries(new FormData(form));
    for (const key of ['days', 'time', 'stages', 'tools', 'availability']) data[key] = new FormData(form).getAll(key).join('، ');
    data.formType = form.id === 'reg' ? 'student' : 'teacher'; data.requestId = requestId;
    button.disabled = true; button.textContent = 'جارٍ حفظ الطلب…'; msg.className = 'msg';
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data), signal: AbortSignal.timeout(25000), credentials: 'omit' });
      const receipt = await response.json();
      if (!response.ok || receipt.ok !== true || receipt.requestId !== requestId || !/^RN-[a-f0-9-]+$/i.test(receipt.receipt || '')) throw Error('لم يصل تأكيد الحفظ');
      form.hidden = true; form.classList.add('hidden'); msg.className = 'msg ok';
      msg.textContent = `✅ وصلنا طلبك! هنكلمك على واتساب قريب. رقم الطلب: ${receipt.receipt}`;
      msg.tabIndex = -1; msg.focus(); msg.scrollIntoView({ block: 'center' });
    } catch {
      msg.className = 'msg bad'; msg.textContent = 'حصلت مشكلة في الإرسال. بياناتك لسه موجودة، جرّب تاني بعد دقيقة.';
      button.disabled = false;
    } finally { button.textContent = form.dataset.label }
  });
});
(async () => {
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)) return;
  try {
    const response = await fetch(endpoint + '?action=status', { credentials: 'omit', signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if (response.ok && result.ok && result.service === 'roots-national-v1') {
      ready = true; status.textContent = ''; status.hidden = true;
      forms.forEach(form => { form.querySelector('[type=submit]').disabled = false });
    }
  } catch { status.textContent = 'حصلت مشكلة في التحميل. حدّث الصفحة بعد دقيقة.' }
})();

const zoneSelect=document.getElementById('timeZone');
if(zoneSelect){const deviceZone=Intl.DateTimeFormat().resolvedOptions().timeZone;if(deviceZone&&![...zoneSelect.options].some(o=>o.value===deviceZone)){zoneSelect.add(new Option('منطقتك الحالية — '+deviceZone,deviceZone));}const update=()=>{const now=new Date();const fmt=zone=>new Intl.DateTimeFormat('ar-EG',{timeZone:zone,hour:'numeric',minute:'2-digit'}).format(now);document.getElementById('zoneClock').textContent='وقت القاهرة الآن: '+fmt('Africa/Cairo')+' · الوقت في منطقتك المختارة الآن: '+fmt(zoneSelect.value)+' (للمقارنة فقط، وليس موعدًا محجوزًا).';};zoneSelect.addEventListener('change',update);update();}
