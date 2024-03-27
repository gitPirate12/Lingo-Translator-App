import './translator.css'
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import {useEffect, useState} from 'react';

function LanguageTranslator() {

  const [textToCopy,setTextToCopy] = useState();
  const [isCopied,setCopied] = useClipboard(textToCopy,{successDuration:1000});
  const [isTranslating, setIsTranslating] = useState(false);
const startListening = ()=> SpeechRecognition.startListening({continuous:true});//si-LK
const {transcript,browserSupportsSpeechRecognition} = useSpeechRecognition();

    const [fromContent, setFromContent] = useState('en-GB');
    const [toContent, setToContent] = useState('si-LK');
    const [translatedText, setTranslatedText] = useState('');
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const handleTranslate = () => {
              const transLINK = `https://api.mymemory.translated.net/get?q=${inputText+transcript}&langpair=${fromContent}|${toContent}`;
              fetch(transLINK)
              .then(response => {
                  console.log('Response status:', response.status); //display console output response 
                  return response.json();
              })
                  .then(data => setTranslatedText(data.responseData.translatedText))
                  .catch(error => console.error('Error:', error));
                  if(fromContent.data==null){
                    return 'empty text';
                  }
              };
              useEffect(() => {
                if (!browserSupportsSpeechRecognition) {
                         return;
                      }
                  
                      if ( inputText!== '') {
                        setTextToCopy(inputText);
                      }
                      if ( transcript!== '') {
                        setTextToCopy(transcript);
                      }
                    }, [inputText,transcript, browserSupportsSpeechRecognition, isTranslating]);

 return (
  <>
      {/* interface */}
       <div className='container'>
        <h2>Voice Translator</h2>
        <br></br>
        <ul className="nuv_item">
              <a className='trans-select' defaultValue='en-GB'value={fromContent} onChange={(e) => setFromContent(e.target.value)} >English</a>
              <a className='trans-select' defaultValue='si-LK'value={fromContent} onChange={(e) => setFromContent(e.target.value)} >Sinhala</a>
          </ul>
        <br></br>
        <br></br>
        <textarea  onClick={()=>setTextToCopy(inputText)} maxLength="5000" className="fromText" placeholder="write down!" value={inputText+transcript} onChange={handleInputChange}>{transcript}</textarea>
        <textarea className="toTranslate" placeholder="Translated Text" value={translatedText} readOnly></textarea>
        <br></br>
        
        <button className="translateBtn" onClick={handleTranslate}>Translate</button>
        
          <button className="translateBtn" onClick={setCopied} >
            
             {isCopied ? "Copied!" :"Copy to clipboard"}
           </button>
          
          <button className="translateBtn" onClick={startListening}>Start Listening</button>
          <button className="translateBtn" onClick={SpeechRecognition.stopListening}>Stop Listening</button>

        </div> 
      
    </>
  );
 }

 export default LanguageTranslator;
