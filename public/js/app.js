let API_URL;
if (window.location.href.includes('localhost')) {
 API_URL = 'http://localhost:5000';
} else {
 API_URL = 'https://website-downloader-387015.el.r.appspot.com';
}

const submitButton = document.querySelector('#submitBtn');
const message = document.querySelector('#message');
const buttonContainer = document.querySelector('.button-container');

let fileName = '';

document.addEventListener('DOMContentLoaded', () => {
 submitButton.addEventListener('click', handleSubmit);
});

async function handleSubmit(e) {
 e.preventDefault();
 message.innerHTML = '';
 const websiteUrl = document.querySelector('#url').value;
 //const git = document.querySelector('#git').checked;
 const depth = document.querySelector('#depth').value;
 const data = {
  websiteUrl,
  //git,
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

  console.log('Establishing SSE connection...');
  const progressSource = new EventSource(`${API_URL}/progress`);
  //progressSource.onmessage = console.log;

  progressSource.addEventListener('message', (event) => {
   const { progress } = JSON.parse(event.data);
   console.log(progress);
   message.innerHTML = '';
   message.innerHTML = progress;
  });

  progressSource.onerror = () => {
   progressSource.close();
   console.error('Error occurred in SSE connection');
  };

  const response = await fetch(url, options);
  if (!response.ok) {
   throw new Error(response.statusText);
  }

  const responseData = await response.json();
  fileName = responseData.fileName;

  submitButton.removeEventListener('click', handleSubmit);
  submitButton.addEventListener('click', handleDownload);
  submitButton.textContent = 'Download Website';
  message.innerHTML = responseData.message;
 } catch (err) {
  console.error(err);
 }
}

/*
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

  const responseData = await response.json();
  fileName = responseData.fileName;
  console.log('Establishing SSE connection...');
  const progressSource = new EventSource(`${API_URL}/progress`);
  //progressSource.onmessage = console.log;

  progressSource.addEventListener('message', (event) => {
   const { progress } = JSON.parse(event.data);
   updateProgress(progress);
   console.log(progress);
   console.log(event);
  });

  progressSource.onerror = () => {
   progressSource.close();
   console.error('Error occurred in SSE connection');
  };

  function updateProgress(progress) {
   console.log(progress); // Update the progress on the client console
  }

  submitButton.removeEventListener('click', handleSubmit);
  submitButton.addEventListener('click', handleDownload);
  submitButton.textContent = 'Download Website';
  message.innerHTML = responseData.message;
 } catch (err) {
  console.error(err);
 }
}
*/
/*
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
  console.log(response);
  if (!response.ok) {
   throw new Error(response.statusText);
  }
  const responseData = await response.json();
  console.log(responseData);

  fileName = responseData.fileName;
  submitButton.removeEventListener('click', handleSubmit);
  submitButton.addEventListener('click', handleDownload);
  submitButton.textContent = 'Download Website';
  message.innerHTML = responseData.message;
 } catch (err) {
  console.error(err);
 }
}
*/
function handleDownload(e) {
 e.preventDefault();
 downloadFile(fileName);
 /*
 // create reset button
 const resetButton = document.createElement('button');
 resetButton.textContent = 'Reset';
 console.log(resetButton);
 buttonContainer.appendChild(resetButton);
 resetButton.addEventListener('click', () => {
  console.log('location');
  //location.reload(); // reload the page to reset it
 });


 // set timeout to remove event listener and change button text
 setTimeout(() => {
  submitButton.removeEventListener('click', handleDownload);
  submitButton.addEventListener('click', handleSubmit);
  submitButton.textContent = 'Scrape Website';
  resetButton.remove(); // remove the reset button
 }, 60000); // 1 minute delay
 */
}

async function downloadFile(fileName) {
 const response = await fetch(`${API_URL}/download/${fileName}`);
 const blob = await response.blob();
 const url = window.URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.style.display = 'none';
 a.href = url;
 a.download = fileName;
 document.body.appendChild(a);
 a.click();
 window.URL.revokeObjectURL(url);
 document.body.removeChild(a);
}
