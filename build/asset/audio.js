const SpeechRecognition = require('speech-recognition');
const assistant = require('./assistant');

const recognition = new SpeechRecognition();
recognition.on('result', (event) => {
  if (event.results[0].transcript === 'trois 14') {
    assistant.startConversation();
  }
});

recognition.start();
