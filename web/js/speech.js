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
        };

        const stop = () => {
            recognition.stop();
        };

        const onResult = event => {
            for (const res of event.results)
            {
                if (res.isFinal) {
                    console.log(res[0].transcript);
                    var response = res[0].transcript;
                    buildQuery(response);
                    sendQuery(response);      //TODO: MAKE API CALL FOR RESPONSE, from another file?
                }
            }
        };

        recognition.continuous = true;
        recognition.interimResults = true;
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