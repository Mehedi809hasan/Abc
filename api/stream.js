export default async function handler(req, res) {
  const url = `http://line.ultrab.xyz/get.php?username=/ZeeALI1&password=465841&type=m3u&output=mpegts`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Stream fetch failed");

    res.setHeader('Content-Type', 'video/MP2T');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Stream proxy error");
  }
}