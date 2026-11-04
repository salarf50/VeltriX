export const SERVICE_CATALOG = [
  { id: 'design', label: 'طراحی' },
  { id: 'grinding_flat', label: 'سنگ فرز' },
  { id: 'grinding_cylindrical', label: 'سنگ گرد' },
  { id: 'tool_sharpening', label: 'تیزکاری ابزار' },
  { id: 'wire_cut', label: 'وایرکات' },
  { id: 'edm', label: 'اسپارک / EDM' },
  { id: 'mold_tools', label: 'ابزار قالب' },
  { id: 'assembly', label: 'مونتاژ' },
  { id: 'plating', label: 'آبکاری' },
  { id: 'anodizing', label: 'آنادایز' },
  { id: 'shot_blasting', label: 'شات‌پلاست' },
  { id: 'machining', label: 'ماشین‌کاری' }
];

const DIGIT_MAP = Object.freeze({
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
});

export function normalizeDigits(value) {
  return String(value ?? '')
    .replace(/[۰-۹٠-٩]/g, (digit) => DIGIT_MAP[digit])
    .replace(/[٬,\s]/g, '')
    .replace(/٫/g, '.')
    .replace(/[−–]/g, '-');
}

export function parseAmount(value) {
  const normalized = normalizeDigits(value).trim();
  if (normalized === '') return null;
  if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return Number.NaN;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : Number.NaN;
}

function requiredNumber(value, label, { min = 0, integer = false } = {}) {
  const parsed = parseAmount(value);
  if (parsed === null) throw new Error(`فیلد «${label}» خالی است؛ مبلغ صفر را صریح وارد کنید یا «نیاز نیست» را بزنید.`);
  if (!Number.isFinite(parsed) || parsed < min || (integer && !Number.isInteger(parsed))) {
    throw new Error(`مقدار «${label}» معتبر نیست.`);
  }
  return parsed;
}

export function calculateEstimate(input) {
  if (!Array.isArray(input.steelRows) || input.steelRows.length === 0) {
    throw new Error('حداقل یک ردیف فولاد اضافه کنید.');
  }

  const steelDetails = input.steelRows.map((row, index) => {
    const rowNumber = index + 1;
    const length = requiredNumber(row.length, `طول ردیف ${rowNumber}`, { min: Number.MIN_VALUE });
    const width = requiredNumber(row.width, `عرض ردیف ${rowNumber}`, { min: Number.MIN_VALUE });
    const height = requiredNumber(row.height, `ارتفاع ردیف ${rowNumber}`, { min: Number.MIN_VALUE });
    const pricePerKgToman = requiredNumber(row.pricePerKg, `قیمت هر کیلوگرم ردیف ${rowNumber} (تومان)`, { min: 0 });
    const quantity = requiredNumber(row.quantity, `تعداد ردیف ${rowNumber}`, { min: 1, integer: true });
    const pieceWeightKg = length * width * height * 0.00000785;
    const totalWeightKg = pieceWeightKg * quantity;
    const totalCostToman = totalWeightKg * pricePerKgToman;
    return { length, width, height, pricePerKgToman, quantity, pieceWeightKg, totalWeightKg, totalCostToman };
  });

  const serviceDetails = SERVICE_CATALOG.map((service) => {
    const entry = input.services?.[service.id];
    if (entry?.notNeeded === true) return { ...service, amountToman: 0, notNeeded: true };
    const amountToman = requiredNumber(entry?.amount, `${service.label} (تومان)`, { min: 0 });
    return { ...service, amountToman, notNeeded: false };
  });

  const steelTotalToman = steelDetails.reduce((sum, row) => sum + row.totalCostToman, 0);
  const servicesTotalToman = serviceDetails.reduce((sum, service) => sum + service.amountToman, 0);
  const costTotalToman = steelTotalToman + servicesTotalToman;
  const markupPercent = requiredNumber(input.markupPercent, 'درصد افزایش', { min: 0 });
  const roundStepToman = requiredNumber(input.roundStepToman, 'پلهٔ گردکردن (تومان)', { min: 0 });
  const beforeRoundToman = costTotalToman * (1 + markupPercent / 100);
  const proposedToman = roundStepToman > 0
    ? Math.ceil((beforeRoundToman / roundStepToman) - 1e-12) * roundStepToman
    : beforeRoundToman;

  return {
    steelDetails,
    serviceDetails,
    steelTotalToman,
    servicesTotalToman,
    costTotalToman,
    markupPercent,
    roundStepToman,
    beforeRoundToman,
    proposedToman,
    differenceToman: proposedToman - costTotalToman
  };
}

export function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits }).format(value);
}

export function formatCurrency(value) {
  return `${formatNumber(value, 2)} تومان`;
}
