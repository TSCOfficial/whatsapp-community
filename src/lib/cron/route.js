import { Log } from '../logging';
import Supabase from '../supabase';

export async function GET() {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401});
  }

  const {data, error} = await Supabase.from("keep-alive")
  .insert([{name: new Date().toDateString()}])
  new Log(data)
  new Log(error, false, true)

  new Log("Supabase keepalive executed")
  return new Response("OK", { status: 200})
}