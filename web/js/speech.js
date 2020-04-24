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
        
        var destination = "";
        var eventType = "";
        const time = new Date('2020-04-24T00:00:00');
        var duration = 0;
        
        
        
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
                
                //repeats recognition if the response is empty
                /*
                if (response == null){
                    buildResponse("Sorry, I didn't catch that. Can you say it again?");
                    start();
                }
                */
                recognition.onend = function(){
                    start();
                }
                buildQuery(response);
                buildResponse("One moment, let me take a look");
                recognition.abort();
                //sendQuery(response);
                respondTag += 1; //dummy function, forcefully moves the conversation along
                if(respondTag){
                    convoPhase += 1;
                    convoCheck(convoPhase);
                } else {
                    buildResponse("Sorry, I couldn't find anything for that. Lets try again");
                }
                
                
                
                //Previous version of the code
                /*
                if (res.isFinal) {
                    console.log(res[0].transcript);
                    var response = res[0].transcript;
                    //buildResponse(response);
                    buildQuery(response);
                    //sendQuery(response);      //TODO: uncomment when legitimate URL
                }
                */
            }
        };
        
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.addEventListener("result", onResult);
        
        buildResponse("Hello");
        //buildResponse("Please tell me where your destination will be? (e.g. Philadelphia, PA)");
        
        window.addEventListener("click", () => {
            
            if (event.target.id === "mic")
            {
                console.log('click');
                listening ? stop() : start();
                //listening = !listening;
                convoCheck(convoPhase);
            } else {
                console.log("not mic");
            }

        });
    }
});