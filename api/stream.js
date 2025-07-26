export default async function handler(req, res) {
  const { channel } = req.query;

  if (!channel) {
    return res.status(400).json({ error: 'Missing channel ID' });
  }

  const mac = '00:1A:79:01:CE:7F';
  const portal = 'http://azers.online:80';
  const url = `${portal}/play/live.php?mac=${mac}&stream=${channel}&type=m3u8`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: 'Stream fetch failed' });
    }

    const body = await response.text(); // Stream নয়, পুরো body টেক্সটে নিন
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(body); // res.write বা stream নয়
  } catch (err) {
    res.status(500).json({ error: 'Fetch error', details: err.message });
  }
}
