document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const emotionDiv = document.getElementById('emotion');

    let audioContext;
    let mediaRecorder;
    let audioChunks = [];

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        stopButton.disabled = false;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    audioChunks = [];
                    // Process the audioBlob here or send it to a server for analysis
                    analyzeAudio(audioBlob);
                };

                mediaRecorder.start();
            })
            .catch(error => {
                console.error('Error accessing audio:', error);
                startButton.disabled = false;
                stopButton.disabled = true;
            });
    });

    stopButton.addEventListener('click', () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        startButton.disabled = false;
        stopButton.disabled = true;
    });

    function analyzeAudio(audioBlob) {
        // Placeholder for emotion analysis
        // Normally, you would send the audioBlob to a server or a pre-trained model for analysis.
        // For demonstration, we just simulate emotion detection.

        emotionDiv.textContent = 'Emotion: Analyzing...';

        setTimeout(() => {
            // Simulate emotion detection result
            const emotions = ['Happy', 'Sad', 'Angry', 'Neutral'];
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            emotionDiv.textContent = `Emotion: ${randomEmotion}`;
        }, 2000); // Simulate a delay for analysis
    }
});
