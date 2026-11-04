import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICE_CATALOG, calculateEstimate, formatCurrency, parseAmount } from '../public/calculator.js';

const allNotNeeded = Object.fromEntries(SERVICE_CATALOG.map((item) => [item.id, { notNeeded: true, amount: '' }]));

test('converts Persian and Arabic digits and keeps explicit zero distinct from empty', () => {
  assert.equal(parseAmount('۱۲٬۵۰۰'), 12500);
  assert.equal(parseAmount('١٢٫٥'), 12.5);
  assert.equal(parseAmount(''), null);
  assert.equal(parseAmount('0'), 0);
});

test('calculates steel weight and row cost using the specified density factor', () => {
  const result = calculateEstimate({
    steelRows: [{ length: '100', width: '100', height: '100', pricePerKg: '100000', quantity: '2' }],
    services: allNotNeeded,
    markupPercent: '0',
    roundStepToman: '0'
  });
  assert.ok(Math.abs(result.steelDetails[0].pieceWeightKg - 7.85) < 1e-12);
  assert.ok(Math.abs(result.steelDetails[0].totalWeightKg - 15.7) < 1e-12);
  assert.ok(Math.abs(result.steelTotalToman - 1570000) < 1e-7);
  assert.equal(result.proposedToman, 1570000);
});

test('a blank required service amount is invalid but an explicit zero is valid', () => {
  const services = { ...allNotNeeded, design: { notNeeded: false, amount: '' } };
  assert.throws(() => calculateEstimate({
    steelRows: [{ length: 1, width: 1, height: 1, pricePerKg: 0, quantity: 1 }],
    services,
    markupPercent: 0,
    roundStepToman: 0
  }), /خالی است/);
  services.design.amount = '۰';
  const result = calculateEstimate({
    steelRows: [{ length: 1, width: 1, height: 1, pricePerKg: 0, quantity: 1 }],
    services,
    markupPercent: 0,
    roundStepToman: 0
  });
  assert.equal(result.servicesTotalToman, 0);
});

test('rounds the proposed toman price upward after applying the markup', () => {
  const result = calculateEstimate({
    steelRows: [{ length: 100, width: 100, height: 100, pricePerKg: 100000, quantity: 1 }],
    services: allNotNeeded,
    markupPercent: 10,
    roundStepToman: 1000
  });
  assert.equal(result.proposedToman, 864000);
  assert.ok(result.proposedToman >= result.costTotalToman * 1.1);
});

test('formats every monetary value in toman', () => {
  assert.equal(formatCurrency(12500), '۱۲٬۵۰۰ تومان');
});
