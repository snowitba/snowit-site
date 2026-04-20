// Vercel serverless function — SnowIT contact form
// FROM: info@basicconsulting.no (send.one.com SMTP — shared infrastructure)
// TO:   info@snowit.ba
// ENV:  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (set in Vercel project settings)
import nodemailer from 'nodemailer';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  // CORS — allow snowit.ba and localhost dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message, _honey } = req.body || {};

  // Honeypot — silently discard bot submissions
  if (_honey) {
    console.log('snowit contact: honeypot triggered, discarding');
    return res.status(200).json({ ok: true });
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('snowit contact: missing SMTP credentials');
      throw new Error('SMTP credentials not configured');
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'send.one.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: true,
      pool: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000
    });

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const subject = `SnowIT Upit: ${safeName}${safeCompany ? ` (${safeCompany})` : ''}`;

    await transport.sendMail({
      from: `SnowIT Contact <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: 'info@snowit.ba',
      subject,
      html: `
        <h2>Nova poruka sa snowit.ba kontakt forme</h2>
        <p><strong>Ime:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Kompanija:</strong> ${safeCompany}</p>` : ''}
        <p><strong>Poruka:</strong></p>
        <p>${safeMessage}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Poslano sa snowit.ba kontakt forme — ${new Date().toISOString()}</p>
      `
    });

    console.log(`snowit contact: sent OK — from ${email}, subject: ${subject}`);
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('snowit contact: email error', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    return res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
}
