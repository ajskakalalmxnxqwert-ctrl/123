
async function test() {
  const url = encodeURI("https://cf-st.sc-cdn.net/d/fAbdtgpdqgqlvwD3nlzA3.1203.DPK2KYQ.m3u8?mo=GsAEGh4SFXMzbUI0bVVRcU5NWmZURURrbW0zMDIBBFAFYAFaFUxvbmdmb3JtVmlkZW9WYXJpYW50c6IBRwizCRIICgZQsMoUaAMiOAo2EidmQWJkdGdwZHFncWx2d0Qzbmx6QTMuMTIwMy5EUEsyS1lRLm0zdTg6AX1"); // fake short version for test fetch
  const dlRes = await fetch(`http://localhost:3000/api/download?url=${url}`);
  console.log("DL Status:", dlRes.status);
  console.log("DL Content-Type:", dlRes.headers.get('content-type'));
  const text = await dlRes.text();
  console.log("DL Body length:", text.length, "Start:", text.slice(0, 100).replace(/\n/g, ' '));
}
test();
