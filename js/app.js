window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p')
p.setAttribute('contenteditable', true)
p.classList.add('content');
const words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('result', event => {
    const transcript = Array
    .from(event.results)
    .map(result => result[0])  
    .map(result => result.transcript) 
    .join('');

    p.textContent = transcript;
    if(event.results[0].isFinal){
        p = document.createElement('p');
        p.setAttribute('contenteditable', true)
        p.classList.add('content');
        words.appendChild(p)
    }
    
});
recognition.addEventListener('end', recognition.start);
recognition.start();

//copy to clipboard
const cpClipboard = document.querySelector('.cpclipboard');
const clipboardjs = new Clipboard('.cpclipboard',{
    text: function(trigger) {
        return cpy();
    }
});

let cpy = function(){
    let cleanDescription = '';
    let paras = document.querySelectorAll('.content');
    paras.forEach(para => {
        cleanDescription += para.innerText + " ";
    });
    return cleanDescription;
}

clipboardjs.on('success', function(e){
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();    

    cpClipboard.setAttribute('data-attribute', 'Copied!')
    setTimeout(function(){
        cpClipboard.setAttribute('data-attribute', '')
    }, 2000)
});
clipboardjs.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
 