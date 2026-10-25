import { getStore } from '@netlify/blobs';
const store = getStore('royal-salon-data');
const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' };
const json = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });
export default async (req) => {
  if (req.httpMethod === 'OPTIONS') return { statusCode: 204, headers };
  const url = new URL(req.rawUrl);
  const type = url.searchParams.get('type');
  if (!['reviews','offers'].includes(type)) return json(400, { error: 'Unknown data type' });
  if (req.httpMethod === 'GET') {
    const data = await store.get(type, { type: 'json' });
    return json(200, data ?? (type === 'reviews' ? [] : { title: 'Offers & Discounts', message: 'Our special offers will be updated soon. Stay tuned!', updatedAt: null }));
  }
  if (req.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (type === 'offers') {
    const expected = process.env.ADMIN_KEY;
    if (!expected || req.headers['x-admin-key'] !== expected) return json(401, { error: 'Admin key is missing or incorrect. Set ADMIN_KEY in Netlify environment variables.' });
  }
  let body;
  try { body = JSON.parse(req.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }
  if (type === 'reviews') {
    if (!body.name || !body.message || !Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) return json(400, { error: 'Please provide a name, review and 1–5 star rating.' });
    const reviews = (await store.get('reviews', { type: 'json' })) ?? [];
    reviews.unshift({ id: crypto.randomUUID(), name: String(body.name).trim().slice(0,60), message: String(body.message).trim().slice(0,500), rating: body.rating, date: new Date().toISOString() });
    await store.setJSON('reviews', reviews.slice(0, 150));
    return json(201, { ok: true, review: reviews[0] });
  }
  const clean = { title: String(body.title || 'Offers & Discounts').slice(0,100), message: String(body.message || '').slice(0,1000), updatedAt: new Date().toISOString() };
  await store.setJSON('offers', clean);
  return json(200, { ok: true, offers: clean });
};
