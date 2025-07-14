// api/keepalive.js

import Supabase from '../lib/supabase';
import Log from '../lib/logging';

export const config = {
  schedule: '0 0 * * 0,3,5', // Sonntag, Mittwoch, Freitag um 00:00
};

export default async function handler(req, res) {
  try {
    const { data, error } = await Supabase()
      .from('keep-alive')
      .select('id')
      .limit(1);

    if (error) {
      new Log(`Supabase keep-alive failed: ${error}`).error();
    } else {
      new Log("Supabase keep-alive successfully executed.");
    }

    res.status(200).json({ success: true });
  } catch (err) {
    new Log(`Supabase keep-alive failed: ${err}`).error();
    res.status(500).json({ error: err.message });
  }
}
