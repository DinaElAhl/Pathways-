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
      msg.textContent = `تم حفظ طلبك. رقم المتابعة: ${receipt.receipt}. هذا تأكيد استلام فقط، وليس قبولًا أو حجزًا أو تأكيد دفع.`;
      msg.tabIndex = -1; msg.focus(); msg.scrollIntoView({ block: 'center' });
    } catch {
      msg.className = 'msg bad'; msg.textContent = 'لم نتمكن من تأكيد حفظ الطلب. بياناتك ما زالت في الصفحة. يمكنك إعادة المحاولة بنفس الطلب؛ لا ترسل أي مبالغ.';
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
      ready = true; status.textContent = 'التقديم أونلاين متاح. يظهر رقم متابعة بعد تأكيد حفظ طلبك.';
      forms.forEach(form => { form.querySelector('[type=submit]').disabled = false });
    }
  } catch { status.textContent = 'استقبال الطلبات غير متاح الآن. لا تدخل بياناتك أو ترسل مبالغ. حاول لاحقًا.' }
})();
