export default async function handler(req, res) {
  const id = req.query.id;

  // ID অনুযায়ী মূল লিংক সেট করুন
  const streamMap = {
    "abc123": "http://31.220.3.103:2095/play/live.php?mac=00:1A:79:E7:32:0C&stream=509828&extension=.m3u8",
    // অন্য stream id এখানে যোগ করতে পারেন
  };

  const url = streamMap[id];

  if (!url) {
    return res.status(404).send("Stream not found");
  }

  // মূল স্ট্রিমে রিডাইরেক্ট করুন
  res.redirect(url);
}
