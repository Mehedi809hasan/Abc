export default async function handler(req, res) {
  const { channel } = req.query;

  if (!channel) {
    return res.status(400).json({ error: 'Channel is required' });
  }

  const mac = '00:1A:79:01:CE:7F'; // আপনার MAC address
  const baseUrl = 'http://azers.online:80';

  // মূল পোর্টাল ইউআরএল বানানো
  const originalUrl = `${baseUrl}/play/live.php?mac=${mac}&stream=${channel}&type=m3u8`;

  try {
    const streamRes = await fetch(originalUrl);
    if (!streamRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch stream' });
    }

    // response headers ঠিক রাখা
    res.setHeader('Content-Type', streamRes.headers.get('Content-Type') || 'application/vnd.apple.mpegurl');

    // ডেটা pipe করে দেওয়া
    streamRes.body.pipeTo(res);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy error', detail: error.message });
  }
}
