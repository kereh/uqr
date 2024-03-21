export async function urltoFile(url: string, filename: string, mimeType: any) {
  mimeType = mimeType || (url.match(/^data:([^;]+);/) || "")[1];
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}
