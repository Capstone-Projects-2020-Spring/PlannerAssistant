window.addEventListener("DOMContentLoaded", () => {
    console.log("speech");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (typeof SpeechRecognition === "undefined") {
        console.log("UND");
    } else {
        console.log("Not UND");
        
        buildResponse("Hello");
        buildResponse("Please tell me the city and state of your destination (e.g. Philadelphia, PA)");
        
        let listening = false;
        const recognition = new SpeechRecognition();

        const start = () => {
            recognition.start();
        };

        const stop = () => {
            recognition.stop();
        };

        const onResult = event => {
            for (const res of event.results)
            {
                console.log(res[0].transcript);
                var response = res[0].transcript;
                
                //repeats recognition if the response is empty
                while (response == null){
                    buildResponse("Sorry, I didn't catch that. Can you say it again?")
                    recognition.start();
                }
                buildQuery(response);
                buildResponse("One moment, let me take a look");
                while(respondTag){
                    sendQuery(response);
                }
                
                
                
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
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.addEventListener("result", onResult);
        
        
        window.addEventListener("click", () => {
            
            if (event.target.id === "mic")
            {
                console.log('click');
                listening ? stop() : start();
                listening = !listening;
            } else {
                console.log("not mic");
            }

        });
    }
});