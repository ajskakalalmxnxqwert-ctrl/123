
async function test() {
  const target = 'https://story.snapchat.com/p/3b07748b-7380-43da-b3d9-3e7770a21500/1536456334180352?timestamp=-1&share_id=xLFdYPZ1Qvs&locale=en-GB';

  // 1. Fetch metadata
  const res = await fetch(`http://localhost:3000/api/fetch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: target })
  });
  const data = await res.json();
  console.log("Fetch Result:", JSON.stringify(data, null, 2));

  if (data.downloadUrl) {
    console.log("Downloading backend:", data.downloadUrl);
    const dlRes = await fetch(`http://localhost:3000/api/download?url=${encodeURIComponent(data.downloadUrl)}`);
    console.log("DL Status:", dlRes.status);
    console.log("DL Content-Type:", dlRes.headers.get('content-type'));
    const text = await dlRes.text();
    console.log("DL Body length:", text.length, "Start:", text.slice(0, 100).replace(/\n/g, ' '));
  }
}
test();
