/**
 * Universal Audio Engine — Web Speech API
 * Cross-device compatible: phones, tablets, computers.
 * Configured for clear, NATURAL-sounding American English pronunciation.
 * Avoids robotic sound by:
 *   - Using neural/natural voices when available
 *   - Splitting text into short chunks with breath pauses
 *   - Rate tuned for conversational fluency (not too slow = robotic)
 */

let sentenceQueue = [];
let isGlobalPaused = false;
let currentUtterance = null;
let isSpeaking = false;
let _chromeKeepAliveTimer = null;

// -------------------------------------------------------
// Voice selection — ordered by naturalness across platforms
// -------------------------------------------------------
function getAmericanVoice() {
    const voices = window.speechSynthesis.getVoices();

    // Tier 1: Neural / Online voices — most natural
    const tier1 = [
        "Microsoft Aria Online (Natural) - English (United States)",
        "Microsoft Guy Online (Natural) - English (United States)",
        "Microsoft Jenny Online (Natural) - English (United States)",
        "Google US English",
        // Edge neural voices
        "Microsoft AnaNeural",
        "Microsoft GuyNeural",
        "Microsoft AriaNeural",
    ];

    // Tier 2: High-quality built-in voices
    const tier2 = [
        "Samantha",          // macOS / iOS — very natural
        "Ava (Premium)",     // macOS Premium
        "Ava",               // macOS
        "Alex",              // macOS
        "Nicky",             // macOS
        "Microsoft Zira - English (United States)",
        "Microsoft David - English (United States)",
    ];

    // Tier 3: Android en-US voices
    const tier3 = [
        "en-us-x-sfg#female_1-local",
        "en-us-x-tpf-network",
        "en-US-language",
    ];

    for (const name of [...tier1, ...tier2, ...tier3]) {
        const v = voices.find(v => v.name === name);
        if (v) return v;
    }

    // Fallback: any en-US voice (prefer non-compact for more natural sound)
    const usVoices = voices.filter(v => v.lang === "en-US");
    // Prefer voices whose name contains "natural", "neural", or "online"
    const natural = usVoices.find(v =>
        /natural|neural|online|premium/i.test(v.name)
    );
    if (natural) return natural;
    if (usVoices.length > 0) return usVoices[0];

    // Last resort: any English voice
    return voices.find(v => v.lang.startsWith("en")) || null;
}

// -------------------------------------------------------
// Text preparation — split into natural breath chunks
// -------------------------------------------------------
function _splitIntoChunks(text) {
    // Clean markdown artifacts
    const cleaned = text
        .replace(/[`*_#]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    // Split on sentence-ending punctuation, keeping the delimiter
    // Also split long comma-separated clauses for more natural delivery
    const raw = cleaned.match(/[^.!?;]+[.!?;]*\s*/g) || [cleaned];

    const chunks = [];
    raw.forEach(chunk => {
        const c = chunk.trim();
        if (!c) return;
        // If a chunk is very long (>120 chars), split further on commas
        if (c.length > 120) {
            const sub = c.split(/,\s+/);
            sub.forEach((s, i) => {
                if (s.trim()) chunks.push(i < sub.length - 1 ? s + "," : s);
            });
        } else {
            chunks.push(c);
        }
    });

    return chunks;
}

// -------------------------------------------------------
// Public API
// -------------------------------------------------------
window.playAudio = function (text, slow = false) {
    window.stopAudio();
    if (!text) return;

    sentenceQueue = _splitIntoChunks(text);
    isGlobalPaused = false;
    _startChromeKeepAlive();
    _playNext(slow);
};

window.stopAudio = function () {
    isGlobalPaused = true;
    isSpeaking = false;
    window.speechSynthesis.cancel();
    sentenceQueue = [];
    currentUtterance = null;
    _stopChromeKeepAlive();
    _updatePauseButton(false);
};

window.togglePauseAudio = function () {
    if (!isSpeaking && sentenceQueue.length === 0) return;

    if (isGlobalPaused) {
        isGlobalPaused = false;
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            _startChromeKeepAlive();
            _playNext();
        }
        _updatePauseButton(false);
    } else {
        isGlobalPaused = true;
        window.speechSynthesis.pause();
        _stopChromeKeepAlive();
        _updatePauseButton(true);
    }
};

window.initAudioEngine = function () {
    if (typeof window.speechSynthesis === "undefined") {
        console.warn("Web Speech API not supported on this browser.");
        return;
    }

    // Trigger voice loading (async in some browsers)
    const load = () => {
        const v = getAmericanVoice();
        console.log("Audio Engine Ready —", v ? v.name : "default voice");
    };

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", load, { once: true });
    } else {
        load();
    }
};

// -------------------------------------------------------
// Internal helpers
// -------------------------------------------------------
function _playNext(slow = false) {
    if (sentenceQueue.length === 0 || isGlobalPaused) {
        isSpeaking = false;
        _stopChromeKeepAlive();
        _updatePauseButton(false);
        return;
    }

    const chunk = sentenceQueue.shift().trim();
    if (!chunk) {
        _playNext(slow);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    currentUtterance = utterance;

    // ---- Natural American English settings ----
    utterance.lang    = "en-US";
    // 0.92 = natural conversational pace (1.0 = default, which sounds fast/robotic)
    // Going too slow (< 0.80) sounds monotone and robotic
    utterance.rate    = slow ? 0.82 : 0.92;
    utterance.pitch   = 1.0;   // Keep at 1.0 — altering pitch makes it sound synthetic
    utterance.volume  = 1.0;

    const voice = getAmericanVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
        isSpeaking = true;
        _updatePauseButton(false);
    };

    utterance.onend = () => {
        if (!isGlobalPaused) {
            // 500ms pause between chunks = natural breath pause
            setTimeout(() => _playNext(slow), 500);
        }
    };

    utterance.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled" && !isGlobalPaused) {
            setTimeout(() => _playNext(slow), 300);
        }
    };

    isSpeaking = true;
    window.speechSynthesis.speak(utterance);
}

// Chrome bug workaround: speechSynthesis stops after ~15s on long texts.
// Solution: pause+resume every 10s to reset the internal timer.
function _startChromeKeepAlive() {
    _stopChromeKeepAlive();
    _chromeKeepAliveTimer = setInterval(() => {
        if (!isGlobalPaused && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setTimeout(() => {
                if (!isGlobalPaused) window.speechSynthesis.resume();
            }, 50);
        }
    }, 10000);
}

function _stopChromeKeepAlive() {
    if (_chromeKeepAliveTimer) {
        clearInterval(_chromeKeepAliveTimer);
        _chromeKeepAliveTimer = null;
    }
}

function _updatePauseButton(paused) {
    const btn = document.getElementById("pause-audio-btn");
    if (btn) btn.innerHTML = paused ? "▶️ Resume" : "⏸️ Pause";
}
