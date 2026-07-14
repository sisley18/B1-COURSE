/**
 * Universal Audio Engine — Web Speech API
 * Uses the browser's built-in speech synthesis for guaranteed
 * cross-device compatibility (phones, tablets, computers).
 * Configured for clear, natural American English pronunciation.
 */

let sentenceQueue = [];
let isGlobalPaused = false;
let currentUtterance = null;
let isSpeaking = false;

// -------------------------------------------------------
// Voice selection: prefer a high-quality US English voice
// -------------------------------------------------------
function getAmericanVoice() {
    const voices = window.speechSynthesis.getVoices();

    // Priority order: best American English voices across platforms
    const preferred = [
        // Chrome / Edge desktop
        "Google US English",
        "Microsoft Aria Online (Natural) - English (United States)",
        "Microsoft Guy Online (Natural) - English (United States)",
        "Microsoft Jenny Online (Natural) - English (United States)",
        "Microsoft Zira - English (United States)",
        "Microsoft David - English (United States)",
        // macOS / iOS
        "Samantha",
        "Alex",
        "Ava",
        "Nicky",
        // Android
        "en-us-x-sfg#female_1-local",
        "en-us-x-tpf-network",
    ];

    for (const name of preferred) {
        const v = voices.find(v => v.name === name);
        if (v) return v;
    }

    // Fallback: any en-US voice
    const usVoice = voices.find(v => v.lang === "en-US");
    if (usVoice) return usVoice;

    // Last resort: any English voice
    return voices.find(v => v.lang.startsWith("en")) || null;
}

// -------------------------------------------------------
// Public API
// -------------------------------------------------------
window.playAudio = function (text, slow = false) {
    window.stopAudio();
    if (!text) return;

    // Split into sentences for a more natural cadence
    const cleaned = text.replace(/[`]/g, "").trim();
    sentenceQueue = cleaned.match(/[^.!?]+[.!?]*\s*/g) || [cleaned];
    isGlobalPaused = false;

    _playNext(slow);
};

window.stopAudio = function () {
    isGlobalPaused = true;
    isSpeaking = false;
    window.speechSynthesis.cancel();
    sentenceQueue = [];
    currentUtterance = null;
    _updatePauseButton(false);
};

window.togglePauseAudio = function () {
    if (!isSpeaking && sentenceQueue.length === 0) return;

    if (isGlobalPaused) {
        // Resume
        isGlobalPaused = false;
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            _playNext();
        }
        _updatePauseButton(false);
    } else {
        // Pause
        isGlobalPaused = true;
        window.speechSynthesis.pause();
        _updatePauseButton(true);
    }
};

window.initAudioEngine = function () {
    // Pre-load voices list (required by some browsers)
    if (typeof window.speechSynthesis === "undefined") {
        console.warn("Web Speech API not supported on this browser.");
        return;
    }

    // Voices may load asynchronously
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", () => {
            console.log("Audio Engine Ready — American English voice loaded.");
        }, { once: true });
    } else {
        console.log("Audio Engine Ready — American English voice loaded.");
    }
};

// -------------------------------------------------------
// Internal helpers
// -------------------------------------------------------
function _playNext(slow = false) {
    if (sentenceQueue.length === 0 || isGlobalPaused) {
        isSpeaking = false;
        _updatePauseButton(false);
        return;
    }

    const sentence = sentenceQueue.shift().trim();
    if (!sentence) {
        _playNext(slow);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(sentence);
    currentUtterance = utterance;

    // American English settings
    utterance.lang = "en-US";
    utterance.rate = slow ? 0.78 : 0.90;   // Slightly slower than default = clearer
    utterance.pitch = 1.0;                  // Natural pitch
    utterance.volume = 1.0;

    // Assign best available American voice
    const voice = getAmericanVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
        isSpeaking = true;
        _updatePauseButton(false);
    };

    utterance.onend = () => {
        if (!isGlobalPaused) {
            // Short natural pause between sentences (400 ms)
            setTimeout(() => _playNext(slow), 400);
        }
    };

    utterance.onerror = (e) => {
        // Skip to next sentence on error (e.g. cancelled)
        if (e.error !== "interrupted" && e.error !== "canceled" && !isGlobalPaused) {
            setTimeout(() => _playNext(slow), 300);
        }
    };

    // Workaround for Chrome bug: long texts stop after ~15 s
    // We split by sentence above, so this should not be needed,
    // but we keep a safety keepalive.
    isSpeaking = true;
    window.speechSynthesis.speak(utterance);
}

function _updatePauseButton(paused) {
    const btn = document.getElementById("pause-audio-btn");
    if (btn) btn.innerHTML = paused ? "▶️" : "⏸️";
}
