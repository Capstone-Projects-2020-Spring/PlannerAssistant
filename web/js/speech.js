/* global respondTag */
/* global convoPhase */

window.addEventListener("DOMContentLoaded", () => {
    console.log("speech");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    

    if (typeof SpeechRecognition === "undefined") {
        console.log("UND");
    } else {
        console.log("Not UND");
        
        
        let listening = false;
        const recognition = new SpeechRecognition();
        
        
        
        const start = () => {
            recognition.start();
            listening = true;
        };
        
        const stop = () => {
            recognition.stop();
            listening = false;
        };

        const onResult = event => {
            for (const res of event.results)
            {
                console.log(res[0].transcript);
                var response = res[0].transcript;
                
                recognition.onend = function(){
                    if (response.includes("thank you") || convoPhase == 7){
                        convoPhase = 7;
                        convoCheck(response);
                        stop();
                    } else{
                        start();
                    }
                };
                if (convoPhase < 7){
                    buildQuery(response);
                    buildResponse("Processing...");
                    respondTag = true; //deafaults respondTag to true
                    if(respondTag){
                        console.log(convoPhase);//test
                        convoCheck(response);
                    } else {
                        buildResponse("Sorry, I couldn't find anything for that. Lets try again");
                    }
                } else {
                    console.log(convoPhase);//test
                    stop();
                }
                
                
            }
        };
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.addEventListener("result", onResult);
        
        buildResponse("Hello");
        
        window.addEventListener("click", () => {
            
            if (event.target.id === "mic")
            {
                console.log('click');
                convoPhase = 0;
                listening ? stop() : start();
                //listening = !listening;
            } else {
                console.log("not mic");
            }

        });
    }
});