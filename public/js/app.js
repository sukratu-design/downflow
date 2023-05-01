const API_URL = 'http://localhost:5000/';
const submitButton = document.querySelector('#submitBtn');
const message = document.querySelector('#message');
const downloadButton = document.querySelector('#downloadBtn');

document.addEventListener('DOMContentLoaded', () => {
 submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  message.innerHTML = '';
  const websiteUrl = document.querySelector('#url').value;
  const git = document.querySelector('#git').checked;
  const depth = document.querySelector('#depth').value;
  const data = {
   websiteUrl,
   git,
   depth,
  };
  await sendUrl(data);
 });

});

async function sendUrl(data) {
 const url = API_URL;
 const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 };

 try {
  const response = await fetch(url, options);
  if (!response.ok) {
   throw new Error(response.statusText);
  }
  const data = await response.json();
  message.innerHTML = data.message;
 } catch (err) {
  console.error(err);
 }
}

downloadButton.addEventListener('click', async (e) => {
 e.preventDefault();

 // make a request to the server to download the file
 const response = await fetch('http://localhost:5000/download');

 // get the filename from the response headers
 const contentDispositionHeader = response.headers.get('content-disposition');
 const filename = contentDispositionHeader.split('filename=')[1];
 console.log(filename);

 // get the file as a Blob object
 const blob = await response.blob();

 // create a URL for the Blob object
 const url = window.URL.createObjectURL(blob);

 // create a link element to download the file
 const a = document.createElement('a');
 a.style.display = 'none';
 a.href = url;
 a.download = filename;
 document.body.appendChild(a);

 // trigger the click event on the link element to start the download
 a.click();

 // clean up the URL and the link element
 window.URL.revokeObjectURL(url);
 document.body.removeChild(a);
});
