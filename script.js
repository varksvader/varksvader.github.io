var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;

var dropdown = document.getElementById('sample2');

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var why = document.querySelector('#test');
var image = document.getElementById('myImage');

/**
.onclick = function() {
  recognition.start();
  console.log('Ready to receive a voice command.');
}
**/

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;

  console.log('Confidence: ' + event.results[0][0].confidence);
  why.value += ' '  + color;
  image.src = 'images/MicrophoneOff.png';
}


recognition.onspeechend = function() {
  recognition.stop();
  document.getElementById('myImage').src = "images/MicrophoneOff.png";
}


recognition.onnomatch = function(event) {
  console.log('?');
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function changeImage() {
    if (image.src.match("Off")) {
    	image.src = "images/MicrophoneListening.png";
        recognition.start();
        console.log('Ready to receive a voice command.');
    } else {
    	recognition.stop();
        image.src = "images/MicrophoneOff.png";
    }
}
