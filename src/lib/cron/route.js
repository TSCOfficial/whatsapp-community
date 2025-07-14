import { NextResponse } from 'next/server';
import { Log } from '../logging';

export async function GET() {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  new Log("Supabase keepalive executed")
  return NextResponse.json({ ok: true });
}