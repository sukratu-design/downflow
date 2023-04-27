const API_URL = 'http://localhost:5000/';
const form = document.querySelector('#sendUrl');
const submitButton = document.querySelector('#submitBtn');
const message = document.querySelector('#message');

document.addEventListener('DOMContentLoaded', () => {
 submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  message.innerHTML = '';
  const url = document.querySelector('#url').value;
  const data = {
   'url': url,
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
