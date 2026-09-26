/* ============================================================
   JSB PORTFOLIO
   REALISTIC STATIC VOICE + REAL AUDIO WAVEFORM
   ------------------------------------------------------------
   Talk to AI:
   - Plays pre-generated realistic MP3
   - Audio analyser reads actual voice
   - 5 waveform bars react to actual voice intensity
   - Portfolio message box
   - No speechSynthesis
   - No microphone
   - No chatbot
   - No API key
   - Character PNG remains static
   ============================================================ */

(function () {

    "use strict";

    let audio = null;
    let speaking = false;

    let audioContext = null;
    let analyser = null;
    let sourceNode = null;
    let animationFrame = null;

    let waveformBars = [];

    const AUDIO_URL =
        "/static/audio/portfolio-intro.mp3";


    /* =========================================================
       DOM READY
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const assistant =
                document.querySelector(
                    ".ai-assistant-character"
                );

            const talkButton =
                document.getElementById(
                    "aiTalkButton"
                );


            /* -------------------------------------------------
               CHECK CHARACTER
               ------------------------------------------------- */

            if (!assistant) {

                console.error(
                    "JSB AI: .ai-assistant-character not found."
                );

                return;
            }


            /* -------------------------------------------------
               CHECK BUTTON
               ------------------------------------------------- */

            if (!talkButton) {

                console.error(
                    "JSB AI: #aiTalkButton not found."
                );

                return;
            }


            /* =================================================
               EXISTING STATUS ELEMENTS
               ================================================= */

            const status =
                assistant.querySelector(
                    ".ai-assistant-status"
                );


            const statusText =
                status
                    ? status.querySelector(
                        "span:last-child"
                    )
                    : null;


            const statusDot =
                assistant.querySelector(
                    ".ai-status-dot"
                );


            const micIcon =
                assistant.querySelector(
                    ".ai-mic-icon"
                );


            const buttonText =
                talkButton.querySelector(
                    "span:last-child"
                );


            /* =================================================
               CREATE AUDIO
               ================================================= */

            audio =
                new Audio();

            audio.preload =
                "auto";

            audio.src =
                AUDIO_URL;


            /* =================================================
               MESSAGE BOX
               ================================================= */

            let caption =
                assistant.querySelector(
                    ".ai-voice-caption"
                );


            if (!caption) {

                caption =
                    document.createElement(
                        "div"
                    );

                caption.className =
                    "ai-voice-caption";


                caption.innerHTML = `
                    <span class="caption-label">
                        PORTFOLIO AI
                    </span>

                    <span class="caption-text"></span>

                    <div class="ai-speaking-wave">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;


                assistant.appendChild(
                    caption
                );
            }


            /* =================================================
               MESSAGE TEXT
               ================================================= */

            const captionText =
                caption.querySelector(
                    ".caption-text"
                );


            /* =================================================
               WAVEFORM BARS
               ================================================= */

            waveformBars =
                Array.from(
                    caption.querySelectorAll(
                        ".ai-speaking-wave span"
                    )
                );


            /* =================================================
               SHOW MESSAGE
               ================================================= */

            function showMessage(
                message
            ) {

                if (!captionText) {
                    return;
                }


                captionText.textContent =
                    message;


                caption.classList.add(
                    "show"
                );
            }


            /* =================================================
               HIDE MESSAGE
               ================================================= */

            function hideMessage() {

                if (!caption) {
                    return;
                }


                caption.classList.remove(
                    "show"
                );
            }


            /* =================================================
               SET SPEAKING STATE
               ================================================= */

            function setSpeakingState() {

                assistant.classList.remove(
                    "ai-idle",
                    "ai-thinking"
                );


                assistant.classList.add(
                    "ai-speaking"
                );


                if (statusText) {

                    statusText.textContent =
                        "SPEAKING";
                }


                if (micIcon) {

                    micIcon.textContent =
                        "■";
                }


                if (buttonText) {

                    buttonText.textContent =
                        "Stop";
                }


                if (statusDot) {

                    statusDot.style.background =
                        "#ff1744";


                    statusDot.style.boxShadow =
                        "0 0 10px #ff1744, 0 0 22px rgba(255,23,68,.75)";
                }
            }


            /* =================================================
               SET IDLE STATE
               ================================================= */

            function setIdleState() {

                assistant.classList.remove(
                    "ai-speaking",
                    "ai-thinking",
                    "ai-word-pulse"
                );


                assistant.classList.add(
                    "ai-idle"
                );


                if (statusText) {

                    statusText.textContent =
                        "AI ONLINE";
                }


                if (micIcon) {

                    micIcon.textContent =
                        "🎙";
                }


                if (buttonText) {

                    buttonText.textContent =
                        "Talk to AI";
                }


                if (statusDot) {

                    statusDot.style.background =
                        "#00e5ff";


                    statusDot.style.boxShadow =
                        "0 0 10px #00e5ff, 0 0 22px rgba(0,229,255,.65)";
                }
            }


            /* =================================================
               CREATE AUDIO ANALYSER
               ================================================= */

            function setupAudioAnalyser() {

                if (audioContext) {
                    return;
                }


                try {

                    audioContext =
                        new (
                            window.AudioContext ||
                            window.webkitAudioContext
                        )();


                    analyser =
                        audioContext.createAnalyser();


                    analyser.fftSize =
                        256;


                    analyser.smoothingTimeConstant =
                        0.75;


                    sourceNode =
                        audioContext.createMediaElementSource(
                            audio
                        );


                    sourceNode.connect(
                        analyser
                    );


                    analyser.connect(
                        audioContext.destination
                    );


                    console.log(
                        "JSB AI: Audio analyser initialized."
                    );

                }
                catch (error) {

                    console.error(
                        "JSB AI: Audio analyser setup failed:",
                        error
                    );
                }
            }


            /* =================================================
               REAL VOICE WAVEFORM
               ================================================= */

            function animateWaveform() {

                if (!speaking) {

                    resetWaveform();

                    return;
                }


                if (!analyser) {

                    animationFrame =
                        requestAnimationFrame(
                            animateWaveform
                        );

                    return;
                }


                const bufferLength =
                    analyser.frequencyBinCount;


                const dataArray =
                    new Uint8Array(
                        bufferLength
                    );


                analyser.getByteFrequencyData(
                    dataArray
                );


                /* ---------------------------------------------
                   CALCULATE DIFFERENT FREQUENCY RANGES
                   --------------------------------------------- */

                const ranges = [

                    [0, 8],

                    [8, 18],

                    [18, 32],

                    [32, 55],

                    [55, 90]

                ];


                const values =
                    ranges.map(
                        function (range) {

                            let total = 0;

                            let count = 0;


                            for (
                                let i = range[0];
                                i < range[1] &&
                                i < dataArray.length;
                                i++
                            ) {

                                total +=
                                    dataArray[i];

                                count++;
                            }


                            return count
                                ? total / count
                                : 0;
                        }
                    );


                /* ---------------------------------------------
                   UPDATE 5 BARS
                   --------------------------------------------- */

                waveformBars.forEach(
                    function (
                        bar,
                        index
                    ) {

                        if (!bar) {
                            return;
                        }


                        const value =
                            values[index] || 0;


                        /*
                         * Convert audio intensity
                         * into visual height.
                         */

                        let height =
                            5 +
                            (
                                value / 255
                            ) * 30;


                        /*
                         * Keep bars within
                         * a reasonable range.
                         */

                        height =
                            Math.max(
                                5,
                                Math.min(
                                    35,
                                    height
                                )
                            );


                        bar.style.height =
                            height + "px";


                        /*
                         * Slight opacity change
                         * according to voice.
                         */

                        bar.style.opacity =
                            (
                                0.55 +
                                (
                                    value / 255
                                ) * 0.45
                            ).toFixed(2);
                    }
                );


                animationFrame =
                    requestAnimationFrame(
                        animateWaveform
                    );
            }


            /* =================================================
               RESET WAVEFORM
               ================================================= */

            function resetWaveform() {

                if (animationFrame) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                    animationFrame =
                        null;
                }


                waveformBars.forEach(
                    function (bar) {

                        if (!bar) {
                            return;
                        }


                        bar.style.height =
                            "5px";


                        bar.style.opacity =
                            "0.55";
                    }
                );
            }


            /* =================================================
               START WAVEFORM
               ================================================= */

            function startWaveform() {

                resetWaveform();


                if (
                    audioContext &&
                    audioContext.state ===
                    "suspended"
                ) {

                    audioContext.resume();
                }


                animationFrame =
                    requestAnimationFrame(
                        animateWaveform
                    );
            }


            /* =================================================
               STOP ANIMATION
               ================================================= */

            function stopAnimation() {

                resetWaveform();


                assistant.classList.remove(
                    "ai-speaking",
                    "ai-thinking",
                    "ai-word-pulse"
                );
            }


            /* =================================================
               START SPEAKING
               ================================================= */

            function startSpeaking() {

                if (!audio) {
                    return;
                }


                /* ---------------------------------------------
                   RESET AUDIO IF FINISHED
                   --------------------------------------------- */

                if (
                    audio.duration &&
                    audio.currentTime >=
                    audio.duration
                ) {

                    audio.currentTime =
                        0;
                }


                /* ---------------------------------------------
                   SETUP AUDIO CONTEXT
                   --------------------------------------------- */

                setupAudioAnalyser();


                /* ---------------------------------------------
                   RESUME AUDIO CONTEXT
                   --------------------------------------------- */

                if (
                    audioContext &&
                    audioContext.state ===
                    "suspended"
                ) {

                    audioContext.resume();
                }


                hideMessage();


                speaking =
                    true;


                setSpeakingState();


                showMessage(
                    "Let me walk you through this portfolio..."
                );


                /* ---------------------------------------------
                   PLAY MP3
                   --------------------------------------------- */

                const playPromise =
                    audio.play();


                /* ---------------------------------------------
                   START REAL WAVEFORM
                   --------------------------------------------- */

                startWaveform();


                /* ---------------------------------------------
                   HANDLE PLAY ERROR
                   --------------------------------------------- */

                if (
                    playPromise &&
                    typeof playPromise.catch ===
                    "function"
                ) {

                    playPromise.catch(
                        function (error) {

                            console.error(
                                "JSB AI playback failed:",
                                error
                            );


                            speaking =
                                false;


                            stopAnimation();


                            setIdleState();


                            showMessage(
                                "Could not play the portfolio voice. Check the MP3 file."
                            );
                        }
                    );
                }
            }


            /* =================================================
               STOP SPEAKING
               ================================================= */

            function stopSpeaking() {

                speaking =
                    false;


                if (audio) {

                    audio.pause();


                    audio.currentTime =
                        0;
                }


                stopAnimation();


                setIdleState();


                hideMessage();
            }


            /* =================================================
               FINISH SPEAKING
               ================================================= */

            function finishSpeaking() {

                speaking =
                    false;


                stopAnimation();


                setIdleState();


                showMessage(
                    "Portfolio overview completed."
                );


                window.setTimeout(
                    function () {

                        hideMessage();

                    },
                    2200
                );
            }


            /* =================================================
               AUDIO ENDED
               ================================================= */

            audio.addEventListener(
                "ended",
                function () {

                    finishSpeaking();

                }
            );


            /* =================================================
               AUDIO ERROR
               ================================================= */

            audio.addEventListener(
                "error",
                function (event) {

                    console.error(
                        "JSB AI voice audio error:",
                        event
                    );


                    speaking =
                        false;


                    stopAnimation();


                    setIdleState();


                    showMessage(
                        "Voice file not found. Add portfolio-intro.mp3 to static/audio/."
                    );
                }
            );


            /* =================================================
               BUTTON CLICK
               ================================================= */

            talkButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    if (speaking) {

                        stopSpeaking();

                        return;
                    }


                    startSpeaking();

                }
            );


            /* =================================================
               INITIAL STATE
               ================================================= */

            setIdleState();


            /* =================================================
               PRELOAD AUDIO
               ================================================= */

            window.setTimeout(
                function () {

                    if (audio) {

                        audio.load();
                    }

                },
                500
            );


            /* =================================================
               PAGE CLEANUP
               ================================================= */

            window.addEventListener(
                "beforeunload",
                function () {

                    speaking =
                        false;


                    if (audio) {

                        audio.pause();

                        audio.currentTime =
                            0;
                    }


                    if (animationFrame) {

                        cancelAnimationFrame(
                            animationFrame
                        );

                        animationFrame =
                            null;
                    }


                    if (audioContext) {

                        audioContext.close();
                    }

                }
            );


            /* =================================================
               DEBUG
               ================================================= */

            console.log(
                "JSB Portfolio: Real audio waveform voice assistant initialized."
            );

        }
    );

})();