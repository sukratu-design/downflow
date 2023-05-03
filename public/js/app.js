const API_URL = 'http://localhost:5000';
const submitButton = document.querySelector('#submitBtn');
const message = document.querySelector('#message');

let fileName = '';

document.addEventListener('DOMContentLoaded', () => {
 submitButton.addEventListener('click', handleSubmit);
});

async function handleSubmit(e) {
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
}

async function sendUrl(data) {
 const url = `${API_URL}/getWebsite`;
 const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 };

 try {
  submitButton.textContent = 'Processing...';

  const response = await fetch(url, options);
  if (!response.ok) {
   throw new Error(response.statusText);
  }
  const data = await response.json();
  fileName = data.websiteUrlHost;
  submitButton.removeEventListener('click', handleSubmit);
  submitButton.addEventListener('click', handleDownload);
  submitButton.textContent = 'Download Website';
  message.innerHTML = data.message;
 } catch (err) {
  console.error(err);
 }
}

function handleDownload(e) {
 e.preventDefault();
 downloadFile(fileName);
}

async function downloadFile(fileName) {
 const response = await fetch(`${API_URL}/download/${fileName}.zip`);
 const blob = await response.blob();
 const url = window.URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.style.display = 'none';
 a.href = url;
 a.download = fileName + '.zip';
 document.body.appendChild(a);
 a.click();
 window.URL.revokeObjectURL(url);
 document.body.removeChild(a);
}

