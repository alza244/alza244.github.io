/*
 *     <--- Shocave ---> 
 *    A virtual Assistant
 */
let _speechSynth
let _voices
const _cache = {}

/**
 * retries until there have been voices loaded. No stopper flag included in this example. 
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable (onComplete = () => {}) {
  _speechSynth = window.speechSynthesis
  const voices = _speechSynth.getVoices()

  if (voices.length !== 0) {
    _voices = voices
    onComplete()
  } else {
    return setTimeout(function () { loadVoicesWhenAvailable(onComplete) }, 100)
  }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices (locale) {
  if (!_speechSynth) {
    throw new Error('Browser does not support speech synthesis')
  }
  if (_cache[locale]) return _cache[locale]

  _cache[locale] = _voices.filter(voice => voice.lang === locale)
  return _cache[locale]
}

/**
 * Speak a certain text 
 * @param locale the locale this voice requires
 * @param text the text to speak
 * @param onEnd callback if tts is finished
 */

function playByText (locale, text, onEnd) {
  const voices = getVoices(locale)

  // TODO load preference here, e.g. male / female etc.
  // TODO but for now we just use the first occurrence
  const utterance = new window.SpeechSynthesisUtterance()
  utterance.voice = voices[0]
  utterance.pitch = 1
  utterance.rate = 1
  utterance.voiceURI = 'native'
  utterance.volume = 1
  utterance.rate = 1
  utterance.pitch = 0.8
  utterance.text = text
  utterance.lang = locale

  if (onEnd) {
    utterance.onend = onEnd
  }

  _speechSynth.cancel() // cancel current speak, if any is running
  _speechSynth.speak(utterance)
}

// on document ready
loadVoicesWhenAvailable(function () {
 console.log("loaded") 
})

function speak () {
  setTimeout(() => playByText("en-US", "Hello, world"), 300)
}



const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning");
        speak("How can i help?");
    }

    else if(hr == 12) {
        speak("Good noon");
        speak("How can i help?");
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon");
        speak("How can i help?");
    }

    else {
        speak("Good Evening");
        speak("How can i help?");
    }
}

window.addEventListener('load', ()=>{
  //  speak("as-salāmu ʿalaykum");
    speak("I'm a virtual assistant. My name is Car Bot. I'm developed by Zain");
    wishMe("");
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hi') || message.includes('hello')) {
        const finalText = "Hello. How can i help you with calculus?";
        speech.text = finalText;
        document.getElementById("image").src = "face3.png"; //happy
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine. I think, you also fine";
        document.getElementById("image").src = "face3.png"; //happy
        speech.text = finalText;
    }

else if(message.includes('derivative' && ('fraction' || 'divided'))) {
        const finalText = "Ah, I think this is about using the quotient rule.";
        document.getElementById("image").src = "quotient.png";
        speech.text = finalText;
    }
    
else if(message.includes('derivative' && ('product' || 'multiplied'))) {
        const finalText = "Ah, I think this is about using the product rule.";
        document.getElementById("image").src = "product.png";
        speech.text = finalText;
    }
    
    
    else if(message.includes('derivative' && ('itself' || 'constant'))) {
        const finalText = "Ah, I think this is about the constant rule, in which you just have a number by itself. In this case, the derivative would be zero.";
        document.getElementById("image").src = "constant.png";
        speech.text = finalText;
    }
    
    
    else if(message.includes('weather') || message.includes('who developed you') || message.includes('who build you')) {
        const finalText = "Hmm, i'm still under development so i can't say.";
        document.getElementById("image").src = "face4.png"; //confused
       // window.open("https://github.com/shohan3401", "_blank");
        speech.text = finalText;
    }

    else if(message.includes('can you help me')) {
        const finalText = "Why not? ask me. if possible, then i will try with my best";
        speech.text = finalText;
    }

    else if(message.includes('who are you')) {
        const finalText = "Hey!! I'm car bot. I'm your personal virtual assistant.";
        speech.text = finalText;
    }

    else if(message.includes('How can you help me')) {
        const finalText = "It's cool. I can help you in many ways.";
        speech.text = finalText;
    }


    else if(message.includes('what is your name') || message.includes('tell me your name')) {
        const finalText = "My name is car bot";
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }
    
    else if(message.includes('f***')) {
        document.getElementById("image").src = "face5.png"; //confused
        const finalText = "Very funny. You are so original, wow i am bursting out into laughter.";
        speech.text = finalText;
    }
    
    else if(message.includes('fuck')) {
        document.getElementById("image").src = "face5.png"; //confused
        const finalText = "Very funny.";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('how can')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}