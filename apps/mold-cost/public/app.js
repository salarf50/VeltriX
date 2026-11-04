import { SERVICE_CATALOG, calculateEstimate, formatNumber, formatCurrency, parseAmount } from './calculator.js';

const DRAFT_KEY = 'veltrix-mold-cost-draft-toman-v2';
const $ = (selector) => document.querySelector(selector);
const elements = {
  authPanel: $('#authPanel'), calculator: $('#calculatorSection'), registerForm: $('#registerForm'),
  registerError: $('#registerError'), appError: $('#appError'), logout: $('#logoutButton'), deleteAccount: $('#deleteAccount'),
  accountLabel: $('#accountLabel'), accountIdLabel: $('#accountIdLabel'), copyAccountId: $('#copyAccountId'),
  adminPendingNotice: $('#adminPendingNotice'), quotaLabel: $('#quotaLabel'), supportNotice: $('#supportNotice'),
  supportMessage: $('#supportMessage'), supportLink: $('#supportLink'), supportBaleLink: $('#supportBaleLink'),
  supportTelegramMenu: $('#supportTelegramMenu'), supportBaleMenu: $('#supportBaleMenu'), supportBalePending: $('#supportBalePending'),
  steelRows: $('#steelRows'), serviceRows: $('#serviceRows'),
  steelTemplate: $('#steelRowTemplate'), serviceTemplate: $('#serviceRowTemplate'), resultPlaceholder: $('#resultPlaceholder'),
  resultContent: $('#resultContent'), toast: $('#toast'), calculateButton: $('#calculateButton'), installButton: $('#installButton')
};

let latestEstimate = null;
let deferredInstallPrompt = null;
let toastTimer = null;

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 3300);
}

function showError(element, message) {
  element.textContent = message;
  element.hidden = !message;
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  const response = await fetch(path, { ...options, headers, credentials: 'same-origin', cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'درخواست به سرور انجام نشد.');
    error.code = data.code || 'REQUEST_FAILED';
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

function createSteelRow(seed = {}) {
  const fragment = elements.steelTemplate.content.cloneNode(true);
  const row = fragment.querySelector('.steel-row');
  for (const [key, value] of Object.entries(seed)) {
    const input = row.querySelector(`[data-field="${key}"]`);
    if (input) input.value = String(value);
  }
  row.querySelector('.remove-steel').addEventListener('click', () => {
    if (elements.steelRows.children.length <= 1) {
      showToast('حداقل یک ردیف فولاد لازم است.');
      return;
    }
    row.remove();
    renumberSteelRows();
  });
  elements.steelRows.append(fragment);
  renumberSteelRows();
}

function renumberSteelRows() {
  [...elements.steelRows.querySelectorAll('.steel-row')].forEach((row, index) => {
    row.querySelector('.row-title').textContent = `قطعهٔ فولادی ${formatNumber(index + 1)}`;
    row.querySelector('.remove-steel').disabled = elements.steelRows.children.length <= 1;
  });
}

function createServiceRows(saved = {}) {
  elements.serviceRows.replaceChildren();
  for (const service of SERVICE_CATALOG) {
    const fragment = elements.serviceTemplate.content.cloneNode(true);
    const row = fragment.querySelector('.service-row');
    const entry = saved[service.id] || {};
    row.dataset.serviceId = service.id;
    row.querySelector('[data-service-label]').textContent = service.label;
    const check = row.querySelector('[data-not-needed]');
    const amount = row.querySelector('[data-service-amount]');
    check.checked = entry.notNeeded === true;
    amount.value = entry.amount == null ? '' : String(entry.amount);
    amount.disabled = check.checked;
    check.addEventListener('change', () => { amount.disabled = check.checked; });
    elements.serviceRows.append(fragment);
  }
}

function getSteelInput() {
  return [...elements.steelRows.querySelectorAll('.steel-row')].map((row) => {
    const result = {};
    for (const input of row.querySelectorAll('[data-field]')) result[input.dataset.field] = input.value;
    return result;
  });
}

function getServicesInput() {
  const services = {};
  for (const row of elements.serviceRows.querySelectorAll('.service-row')) {
    services[row.dataset.serviceId] = {
      notNeeded: row.querySelector('[data-not-needed]').checked,
      amount: row.querySelector('[data-service-amount]').value
    };
  }
  return services;
}

function getEstimateInput() {
  return {
    steelRows: getSteelInput(),
    services: getServicesInput(),
    markupPercent: $('#markup').value,
    roundStepToman: $('#roundStep').value
  };
}

function saveDraft(showMessage = true) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...getEstimateInput(), savedAt: new Date().toISOString() }));
    if (showMessage) showToast('پیش‌نویس روی همین دستگاه ذخیره شد.');
  } catch {
    if (showMessage) showToast('ذخیرهٔ محلی در این مرورگر ممکن نشد.');
  }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (!draft || !Array.isArray(draft.steelRows)) return;
    elements.steelRows.replaceChildren();
    (draft.steelRows.length ? draft.steelRows : [{}]).forEach(createSteelRow);
    createServiceRows(draft.services || {});
    $('#markup').value = draft.markupPercent ?? '0';
    $('#roundStep').value = draft.roundStepToman ?? '1000';
  } catch {
    localStorage.removeItem(DRAFT_KEY);
  }
}

function clearResults() {
  latestEstimate = null;
  elements.resultPlaceholder.hidden = false;
  elements.resultContent.hidden = true;
}

function setResultText(id, text) { $(id).textContent = text; }

function renderEstimate(estimate) {
  latestEstimate = estimate;
  elements.resultPlaceholder.hidden = true;
  elements.resultContent.hidden = false;
  setResultText('#steelTotal', formatCurrency(estimate.steelTotalToman));
  setResultText('#serviceTotal', formatCurrency(estimate.servicesTotalToman));
  setResultText('#costTotal', formatCurrency(estimate.costTotalToman));
  setResultText('#proposedTotal', formatCurrency(estimate.proposedToman));
  setResultText('#differenceTotal', formatCurrency(estimate.differenceToman));
  const breakdown = $('#steelBreakdown');
  breakdown.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = 'جزئیات فولاد';
  breakdown.append(title);
  estimate.steelDetails.forEach((row, index) => {
    const line = document.createElement('div');
    line.className = 'breakdown-row';
    const label = document.createElement('span');
    label.textContent = `ردیف ${formatNumber(index + 1)} · ${formatNumber(row.totalWeightKg, 3)} kg`;
    const amount = document.createElement('b');
    amount.textContent = formatCurrency(row.totalCostToman);
    line.append(label, amount);
    breakdown.append(line);
  });
}

function summaryText(estimate) {
  const lines = [
    'VeltriX Mold Cost — برآورد تقریبی هزینهٔ قالب',
    `جمع فولاد: ${formatCurrency(estimate.steelTotalToman)}`,
    `جمع هزینه‌های ساخت: ${formatCurrency(estimate.servicesTotalToman)}`,
    `بهای تمام‌شده: ${formatCurrency(estimate.costTotalToman)}`,
    `افزایش: ${formatNumber(estimate.markupPercent, 2)}٪`,
    `پلهٔ گردکردن: ${formatCurrency(estimate.roundStepToman)}`,
    `قیمت پیشنهادی: ${formatCurrency(estimate.proposedToman)}`,
    `اختلاف با بهای تمام‌شده: ${formatCurrency(estimate.differenceToman)}`,
    'این قیمت تقریبی است و قیمت قطعی محسوب نمی‌شود.'
  ];
  return lines.join('\n');
}

function setSupportNotice(status) {
  const exhausted = !status.isAdmin && !status.subscriptionActive && status.remaining <= 0;
  elements.supportNotice.hidden = !exhausted;
  elements.supportMessage.textContent = exhausted ? 'سهمیهٔ رایگان این ماه تمام شده است.' : '';
  const support = status.supportUrl || 'https://t.me/veltrixmold_bot';
  const bale = status.baleSupportUrl || '';
  elements.supportLink.hidden = !exhausted || !support;
  elements.supportBaleLink.hidden = !exhausted || !bale;
  if (support) elements.supportLink.href = support;
  if (bale) elements.supportBaleLink.href = bale;
  if (exhausted && !support && !bale) elements.supportMessage.textContent += ' لینک پشتیبانی هنوز تنظیم نشده است.';
}

async function loadSupportLinks() {
  try {
    const links = await api('/api/support', { method: 'GET' });
    if (links.telegramUrl) elements.supportTelegramMenu.href = links.telegramUrl;
    if (links.baleUrl) {
      elements.supportBaleMenu.href = links.baleUrl;
      elements.supportBaleMenu.hidden = false;
      elements.supportBalePending.hidden = true;
    }
  } catch {
    // Keep the verified Telegram link available when the configuration endpoint is offline.
  }
}

function renderStatus(status) {
  elements.accountLabel.textContent = `${status.user.name} · ${status.user.workshop}`;
  elements.accountIdLabel.textContent = status.user.id;
  elements.adminPendingNotice.hidden = status.adminPending !== true || status.isAdmin === true;
  if (status.isAdmin) {
    elements.quotaLabel.textContent = 'مدیر تأییدشده · بدون محدودیت';
  } else if (status.subscriptionActive) {
    const expiry = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(new Date(status.subscriptionExpiresAt));
    elements.quotaLabel.textContent = `اشتراک فعال تا ${expiry} · استفادهٔ نامحدود`;
  } else {
    elements.quotaLabel.textContent = `${formatNumber(status.used)} از ${formatNumber(status.freeLimit)} استفادهٔ رایگان در ${status.monthLabel}`;
  }
  setSupportNotice(status);
}

async function refreshStatus() {
  const status = await api('/api/status', { method: 'GET' });
  renderStatus(status);
  return status;
}

function showSignedIn() {
  elements.authPanel.hidden = true;
  elements.calculator.hidden = false;
  elements.logout.hidden = false;
  elements.deleteAccount.hidden = false;
  void refreshStatus().catch((error) => {
    if (error.status === 401) {
      showSignedOut();
      return;
    }
    showError(elements.appError, error.message || 'وضعیت حساب دریافت نشد. اتصال اینترنت را بررسی کنید.');
  });
}

async function restoreSession() {
  try {
    await refreshStatus();
    elements.authPanel.hidden = true;
    elements.calculator.hidden = false;
    elements.logout.hidden = false;
    elements.deleteAccount.hidden = false;
  } catch (error) {
    showSignedOut();
    if (error.status !== 401) showError(elements.appError, error.message || 'وضعیت حساب دریافت نشد. اتصال اینترنت را بررسی کنید.');
  }
}

function showSignedOut() {
  elements.authPanel.hidden = false;
  elements.calculator.hidden = true;
  elements.logout.hidden = true;
  elements.deleteAccount.hidden = true;
}

function collectRegistration() {
  const form = new FormData(elements.registerForm);
  return {
    name: String(form.get('name') || '').trim(),
    workshop: String(form.get('workshop') || '').trim(),
    phone: String(form.get('phone') || '').trim(),
    followConfirmed: form.get('followConfirmed') === 'on',
    privacyAccepted: form.get('privacyAccepted') === 'on'
  };
}

async function handleRegister(event) {
  event.preventDefault();
  showError(elements.registerError, '');
  const payload = collectRegistration();
  if (!payload.name || !payload.workshop || !payload.phone) {
    showError(elements.registerError, 'نام، کارگاه و شماره تلفن را تکمیل کنید.');
    return;
  }
  if (!payload.privacyAccepted) {
    showError(elements.registerError, 'برای ادامه، رضایت حریم خصوصی را جداگانه تأیید کنید.');
    return;
  }
  const submit = elements.registerForm.querySelector('[type="submit"]');
  submit.disabled = true;
  try {
    await api('/api/register', { method: 'POST', body: JSON.stringify(payload) });
    showSignedIn();
    showToast('ثبت‌نام انجام شد.');
  } catch (error) {
    showError(elements.registerError, error.message || 'ثبت‌نام انجام نشد.');
  } finally {
    submit.disabled = false;
  }
}

async function handleCalculate() {
  showError(elements.appError, '');
  let estimate;
  try {
    estimate = calculateEstimate(getEstimateInput());
  } catch (error) {
    showError(elements.appError, error.message);
    return;
  }
  elements.calculateButton.disabled = true;
  elements.calculateButton.textContent = 'در حال بررسی سهمیه…';
  try {
    await api('/api/use', {
      method: 'POST',
      body: JSON.stringify({ requestId: crypto.randomUUID() })
    });
    renderEstimate(estimate);
    saveDraft(false);
    await refreshStatus();
    document.querySelector('.result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    if (error.code === 'QUOTA_EXCEEDED') {
      try { await refreshStatus(); } catch { /* keep the quota message */ }
      elements.supportNotice.hidden = false;
      elements.supportMessage.textContent = 'سهمیهٔ رایگان این ماه تمام شده است.';
      if (error.data?.supportUrl) {
        elements.supportLink.href = error.data.supportUrl;
        elements.supportLink.hidden = false;
      } else {
        elements.supportLink.hidden = true;
        elements.supportMessage.textContent += ' لینک پشتیبانی هنوز تنظیم نشده است.';
      }
      if (error.data?.baleSupportUrl) {
        elements.supportBaleLink.href = error.data.baleSupportUrl;
        elements.supportBaleLink.hidden = false;
      }
    } else {
      showError(elements.appError, error.message || 'سرور در دسترس نیست؛ این محاسبه ثبت نشد.');
    }
  } finally {
    elements.calculateButton.disabled = false;
    elements.calculateButton.innerHTML = 'محاسبهٔ برآورد <span aria-hidden="true">←</span>';
  }
}

async function handleLogout() {
  try {
    await api('/api/logout', { method: 'POST', body: '{}' });
    clearResults();
    showSignedOut();
    showToast('از حساب خارج شدید.');
  } catch (error) {
    showError(elements.appError, error.message || 'خروج از حساب انجام نشد.');
  }
}

async function handleDeleteAccount() {
  if (!window.confirm('حساب، نشست‌ها و سوابق مصرف شما حذف شوند؟ این کار برگشت‌پذیر نیست.')) return;
  try {
    await api('/api/account/delete', { method: 'POST', body: '{}' });
    localStorage.removeItem(DRAFT_KEY);
    showSignedOut();
    showToast('حساب و داده‌های مرتبط حذف شد.');
  } catch (error) {
    showError(elements.appError, error.message || 'حذف حساب انجام نشد.');
  }
}

function resetEstimate() {
  if (!window.confirm('برآورد فعلی پاک شود و یک برآورد تازه شروع شود؟')) return;
  elements.steelRows.replaceChildren();
  createSteelRow();
  createServiceRows();
  $('#markup').value = '0';
  $('#roundStep').value = '1000';
  localStorage.removeItem(DRAFT_KEY);
  showError(elements.appError, '');
  clearResults();
  showToast('برآورد تازه آماده است.');
}

async function handleInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    elements.installButton.hidden = true;
    return;
  }
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS && !window.navigator.standalone) {
    showToast('در Safari روی «اشتراک‌گذاری» بزنید و «افزودن به صفحهٔ اصلی» را انتخاب کنید.');
  } else {
    showToast('اگر نصب خودکار نمایش داده نمی‌شود، منوی مرورگر را باز و گزینهٔ نصب را انتخاب کنید.');
  }
}

async function copySummary() {
  if (!latestEstimate) return;
  try {
    await navigator.clipboard.writeText(summaryText(latestEstimate));
    showToast('خلاصهٔ برآورد کپی شد.');
  } catch {
    showToast('دسترسی کپی فراهم نیست؛ از چاپ یا ذخیرهٔ PDF استفاده کنید.');
  }
}

async function copyAccountId() {
  const id = elements.accountIdLabel.textContent.trim();
  if (!id) return;
  try {
    await navigator.clipboard.writeText(id);
    showToast('شناسهٔ حساب کپی شد.');
  } catch {
    showToast(`شناسهٔ حساب: ${id}`);
  }
}

function initialize() {
  createSteelRow();
  createServiceRows();
  loadDraft();
  elements.registerForm.addEventListener('submit', handleRegister);
  $('#addSteelRow').addEventListener('click', () => createSteelRow());
  $('#calculateButton').addEventListener('click', handleCalculate);
  $('#saveDraft').addEventListener('click', () => saveDraft(true));
  $('#newEstimate').addEventListener('click', resetEstimate);
  $('#refreshStatus').addEventListener('click', () => refreshStatus().then(() => showToast('وضعیت به‌روزرسانی شد.')).catch((error) => showError(elements.appError, error.message)));
  $('#copySummary').addEventListener('click', copySummary);
  elements.copyAccountId.addEventListener('click', copyAccountId);
  $('#printSummary').addEventListener('click', () => window.print());
  elements.logout.addEventListener('click', handleLogout);
  elements.deleteAccount.addEventListener('click', handleDeleteAccount);
  elements.installButton.addEventListener('click', handleInstall);
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    elements.installButton.hidden = false;
  });
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('/sw.js').catch(() => showToast('حالت آفلاین فعال نشد؛ برنامه همچنان آنلاین قابل استفاده است.'));
  }
  elements.authPanel.hidden = true;
  void loadSupportLinks();
  void restoreSession();
}

initialize();
