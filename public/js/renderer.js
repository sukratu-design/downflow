//const { ipcRenderer } = require('electron');

const url = document.querySelector('#url');
const submitButton = document.querySelector('#submitBtn');
const messageDiv = document.querySelector('#message');
const gitCheckbox = document.querySelector('#git');
const selectDepth = document.querySelector('#depth');
let counter = 0;

document.addEventListener('DOMContentLoaded', () => {
 window.electronAPI.getMessage((_event, messages) => {
  clearInterval(loadInterval);
  if (messageDiv.innerHTML.includes('Downloading')) {
   messageDiv.innerHTML = '';
  }

  counter++;
  let newMessage = document.createElement('div');

  newMessage.setAttribute('id', `newMessage-${counter}`);
  messageDiv.appendChild(newMessage);

  showSuccessMessage(messages, `newMessage-${counter}`);
 });
 url.addEventListener('contextmenu', showMenu);
 submitButton.addEventListener('click', downloadWebsite);
});



async function downloadWebsite() {
 const urlValue = url.value;
 const isGitChecked = gitCheckbox.checked;
 const depth = selectDepth.value;
 const downloadPath = await electronAPI.showSaveDialog(); // wait for user to select download directory
 if (downloadPath) {
  // check if user has selected a directory
  showLoadingIndicator(messageDiv); // start showLoadingIndicator after user has selected directory
  await electronAPI.sendUrl({
   url: urlValue,
   isGitChecked,
   downloadPath,
   depth,
  });
 }
}

// create new element
function showSuccessMessage(message, div) {
 electronAPI.toast({
  text: message,
  duration: -1,
  close: true,
  gravity: 'button',
  position: 'left',
  selector: div,
  className: 'custom-toast',
  style: {
   background: '#469969',
   color: 'white',
   textAlign: 'left',
   //padding: '0.5em 0',
   borderRadius: '0.15em',
   width: '100%',
  },
 });
}

function showLoadingIndicator(element) {
 const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
 let count = 0;

 loadInterval = setInterval(() => {
  // Get the next spinner character
  const character = spinner[count % spinner.length];
  count++;

  // Update the text content of the loading indicator
  element.textContent = `Downloading ${character}`;
 }, 80);
}
