document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized: Full Module with Pronunciation');
    initAudioEngine();
    renderCurriculum();
});

function renderCurriculum() {
    const container = document.getElementById('curriculum-container');
    if (!container) return;
    container.innerHTML = '';

    courseData.units.forEach(unit => {
        const unitBlock = document.createElement('details');
        unitBlock.className = 'unit-block';

        // Image mapping for each unit
        const unitImages = {
            1: 'images/unit1_ai_tech_1769887384498.png',
            2: 'images/unit2_global_business_1769887397475.png',
            3: 'images/unit3_planet_earth_1769887410570.png',
            4: 'images/unit4_media_society_1769887424674.png',
            5: 'images/unit5_health_wellness_1769887449497.png',
            6: 'images/unit6_art_culture_1769887464596.png',
            7: 'images/unit7_urban_life_1769887479614.png',
            8: 'images/unit8_education_1769887495495.png'
        };

        unitBlock.innerHTML = `
            <summary class="unit-header">
                <div>
                    <span class="unit-subtitle">Unit ${unit.id}</span>
                    <span class="unit-title">${unit.title}</span>
                </div>
            </summary>
            <div class="unit-body">
                <div class="unit-illustration">
                    <img src="${unitImages[unit.id]}" alt="${unit.title}" style="width: 100%; max-width: 400px; border-radius: 16px; margin: 0 auto 30px; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </div>
                <p style="opacity: 0.7; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">Topic: ${unit.topic}</p>
                
                <!-- 1. Vocabulary -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255,255,255,0.1); color: #fff;">Vocabulary</span>
                    <h3>Key Terms</h3>
                    <p style="margin-bottom: 15px; opacity: 0.7;">🔊 Click the speaker to hear each word pronounced:</p>
                    <div class="vocab-grid">
                        ${unit.vocabulary ? unit.vocabulary.map(v => `
                            <div class="vocab-card">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                    <button class="play-btn" style="width: 32px; height: 32px; font-size: 0.9rem; flex-shrink: 0;" onclick="playAudio('${v.word}')">🔊</button>
                                    <strong style="font-size: 1.1rem;">${v.word}</strong>
                                </div>
                                ${v.ipa ? `<p style="font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', monospace; color: #fb923c; font-size: 0.95rem; margin-bottom: 8px;">/${v.ipa}/</p>` : ''}
                                <p style="opacity: 0.8;">${v.def}</p>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>

                <!-- 2. Listening -->
                <div class="section-block">
                    <span class="section-label listening">Listening</span>
                    <h3>${unit.listening.title}</h3>
                    <div class="player-controls">
                        <button class="play-btn" onclick="playTrack('${unit.listening.transcript.replace(/'/g, "\\'")}')">▶</button>
                        <span style="font-size: 0.9rem; opacity: 0.8;">Audio Track</span>
                    </div>
                    <button class="btn" style="border: 1px solid rgba(255,255,255,0.2); font-size: 0.8rem; padding: 5px 15px;" onclick="toggleTranscript(this)">Show Transcript</button>
                    <div class="transcript-box" style="display:none; margin-top:10px; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">
                        ${unit.listening.transcript}
                    </div>
                    ${renderQuiz(unit.listening.questions)}
                </div>

                <!-- 3. Reading -->
                <div class="section-block">
                    <span class="section-label reading">Reading</span>
                    <h3>${unit.reading.title}</h3>
                    <div class="reading-text">${unit.reading.text}</div>
                    ${renderQuiz(unit.reading.questions)}
                </div>

                <!-- 4. Grammar -->
                <div class="section-block">
                    <span class="section-label grammar">Grammar</span>
                    <h3>${unit.grammar.title}</h3>
                    <div class="grammar-box">
                        <p style="margin-bottom:10px;">${unit.grammar.explanation}</p>
                        <p style="font-family:monospace; color:#a78bfa;">Ex: ${unit.grammar.example}</p>
                    </div>
                    <div style="margin-top:20px;">
                        ${unit.grammar.quizzes ? unit.grammar.quizzes.map((q, idx) => `
                            <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
                                <p style="font-weight:600; margin-bottom:10px;">${idx + 1}. ${q.question}</p>
                                <div class="options-grid" style="justify-content: flex-start;">
                                    ${q.options.map((opt, i) => `
                                        <button class="btn" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);" 
                                        onclick="checkAnswer(this, ${i === q.correct})">${opt}</button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>

                <!-- 5. Pronunciation (NEW) -->
                <div class="section-block">
                    <span class="section-label pronunciation">Pronunciation</span>
                    <h3>Word & Sentence Stress</h3>
                    
                    <h4 style="margin: 20px 0 15px; color: var(--accent-gold);">Word Stress</h4>
                    
                    <div class="theory-box">
                        <h4>📚 Word Stress Theory</h4>
                        <p>In English, one syllable in each word is pronounced louder, longer, and higher in pitch. This is the <strong>stressed syllable</strong>.</p>
                        <p><strong>Common patterns:</strong></p>
                        <ul>
                            <li><strong>Nouns & Adjectives:</strong> Usually stressed on the FIRST syllable (TAble, HAPpy)</li>
                            <li><strong>Verbs:</strong> Often stressed on the SECOND syllable (reLAX, deCIDE)</li>
                            <li><strong>Words ending in -tion, -sion:</strong> Stress falls on syllable BEFORE the suffix (informAtion, decIsion)</li>
                            <li><strong>Words ending in -ic, -ical:</strong> Stress on syllable BEFORE (autoMATic, technOlogical)</li>
                            <li><strong>Words ending in -ity, -ify:</strong> Stress on third-to-last syllable (possiblity, idEntify)</li>
                        </ul>
                    </div>
                    
                    <p style="margin-bottom: 15px; opacity: 0.7;">🔊 Click the speaker to hear the word, then click the stressed syllable:</p>
                    ${unit.pronunciation && unit.pronunciation.word_stress ? unit.pronunciation.word_stress.map((item, idx) => {
            // Extract clean word from pattern like "au-TO-no-mous"
            const cleanWord = item.word.replace(/-/g, '').toLowerCase().replace(/[A-Z]/g, c => c.toLowerCase());
            return `
                        <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                <button class="play-btn" style="width: 40px; height: 40px; font-size: 1rem;" onclick="playAudio('${cleanWord}')">🔊</button>
                                <p style="font-weight: 600; margin: 0;">${idx + 1}. ${item.word}</p>
                            </div>
                            <div class="options-grid" style="justify-content: flex-start;">
                                ${item.syllables.map((syl, i) => `
                                    <button class="btn syllable-btn" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); text-transform: uppercase;" 
                                    onclick="checkAnswer(this, ${i === item.correct})">${syl}</button>
                                `).join('')}
                            </div>
                        </div>
                    `}).join('') : ''}
                    
                    <h4 style="margin: 30px 0 15px; color: var(--accent-gold);">Sentence Stress</h4>
                    
                    <div class="theory-box">
                        <h4>📚 Sentence Stress Theory</h4>
                        <p>In English sentences, <strong>content words</strong> are stressed while <strong>function words</strong> are unstressed.</p>
                        <p><strong>Stressed (Content Words):</strong></p>
                        <ul>
                            <li><strong>Nouns:</strong> dog, house, technology</li>
                            <li><strong>Main Verbs:</strong> run, think, develop</li>
                            <li><strong>Adjectives:</strong> big, beautiful, important</li>
                            <li><strong>Adverbs:</strong> quickly, very, extremely</li>
                            <li><strong>Question words:</strong> what, where, why</li>
                        </ul>
                        <p style="margin-top: 10px;"><strong>Unstressed (Function Words):</strong></p>
                        <ul>
                            <li><strong>Articles:</strong> a, an, the</li>
                            <li><strong>Prepositions:</strong> in, on, at, to</li>
                            <li><strong>Pronouns:</strong> I, you, he, she, it</li>
                            <li><strong>Auxiliary verbs:</strong> is, are, have, will</li>
                            <li><strong>Conjunctions:</strong> and, but, or</li>
                        </ul>
                    </div>
                    
                    <p style="margin-bottom: 15px; opacity: 0.7;">🔊 Click the speaker to hear the sentence with proper stress:</p>
                    ${unit.pronunciation && unit.pronunciation.sentence_stress ? unit.pronunciation.sentence_stress.map((item, idx) => `
                        <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                <button class="play-btn" style="width: 40px; height: 40px; font-size: 1rem;" onclick="playAudio('${item.sentence.replace(/'/g, "\\'")}')">🔊</button>
                                <p style="font-size: 1.2rem; font-style: italic; margin: 0;">"${item.sentence}"</p>
                            </div>
                            <p style="font-size: 0.9rem; color: var(--accent-gold);"><strong>Stressed words:</strong> ${item.stressed.join(', ')}</p>
                        </div>
                    `).join('') : ''}
                </div>

                <!-- 6. Collocation -->
                <div class="section-block">
                    <span class="section-label collocation">Collocations</span>
                    <div style="display: grid; gap: 20px;">
                    ${unit.collocations ? unit.collocations.map(col => `
                        <div class="collo-box">
                            <div class="word-slot" style="font-size: 1.5rem;">
                                ${col.pair[0]} <span class="blank">______</span>
                            </div>
                            <p style="margin-bottom: 10px; opacity: 0.6;">"${col.context.replace(col.pair[1], '______')}"</p>
                            <div class="options-grid" style="justify-content: center;">
                                ${(() => {
                    const opts = [col.pair[1], ...col.distractors].sort(() => Math.random() - 0.5);
                    return opts.map(opt => `
                                        <button class="btn" style="background:rgba(255,255,255,0.1);" 
                                        onclick="checkCollocation(this, '${opt}', '${col.pair[1]}')">${opt}</button>
                                    `).join('');
                })()}
                            </div>
                        </div>
                    `).join('') : ''}
                    </div>
                </div>

                <!-- 7. Writing -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255, 100, 100, 0.2); color: #ffadad;">Writing Task</span>
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px;">
                        <p style="font-style: italic; margin-bottom: 15px;">Target: 200 words</p>
                        <h4 style="margin-bottom: 10px;">${unit.writing || 'Write about the topic.'}</h4>
                        <textarea style="width: 100%; height: 150px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px; border-radius: 8px; font-family: inherit;" placeholder="Type your essay here..."></textarea>
                    </div>
                </div>

                <!-- 8. Speaking -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255, 200, 50, 0.2); color: #ffe066;">Speaking</span>
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px;">
                        <span style="font-size: 2rem;">🎙️</span>
                        <div>
                            <h4>Discussion Prompt</h4>
                            <p>${unit.speaking || 'Discuss the topic.'}</p>
                        </div>
                    </div>
                </div>

                <!-- 9. Videos -->
                ${unit.videos && unit.videos.length > 0 ? `
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255, 0, 0, 0.2); color: #ff6b6b;">📺 Videos</span>
                    <h3>Recommended Videos</h3>
                    <p style="margin-bottom: 20px; opacity: 0.7;">Watch these videos to deepen your understanding of the topic:</p>
                    <div style="display: grid; gap: 15px;">
                        ${unit.videos.map(video => `
                            <a href="${video.url}" target="_blank" rel="noopener noreferrer" 
                               style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 15px 20px; border-radius: 12px; text-decoration: none; color: #fff; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease;"
                               onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='var(--accent-gold)';"
                               onmouseout="this.style.background='rgba(0,0,0,0.2)'; this.style.borderColor='rgba(255,255,255,0.1)';">
                                <span style="font-size: 2rem;">▶️</span>
                                <div>
                                    <h4 style="margin: 0 0 5px 0; color: var(--accent-gold);">${video.title}</h4>
                                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.7;">${video.channel} • ${video.duration}</p>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

            </div>
        `;
        container.appendChild(unitBlock);
    });
}

function renderQuiz(questions) {
    return `
        <div style="margin-top: 20px;">
            ${questions.map((q, i) => `
                <div style="margin-bottom: 15px;">
                    <p style="margin-bottom: 8px; font-weight: 500;">Q: ${q.q}</p>
                    <div class="options-grid" style="justify-content: flex-start;">
                        ${q.options.map((opt, oIdx) => `
                            <button class="btn" style="padding: 5px 15px; font-size: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);" 
                            onclick="checkAnswer(this, ${oIdx === q.correct})">${opt}</button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Helpers
window.playTrack = function (text) { window.courseAudio.play(text); };
window.toggleTranscript = function (btn) {
    const box = btn.nextElementSibling;
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    btn.textContent = box.style.display === 'none' ? 'Show Transcript' : 'Hide Transcript';
};
window.checkAnswer = function (btn, isCorrect) {
    const container = btn.parentElement;
    Array.from(container.children).forEach(b => { b.style.background = 'rgba(255,255,255,0.05)'; b.style.borderColor = 'rgba(255,255,255,0.1)'; b.style.color = 'inherit'; });
    if (isCorrect) { btn.style.background = 'rgba(16, 185, 129, 0.2)'; btn.style.borderColor = '#10b981'; btn.style.color = '#fff'; }
    else { btn.style.background = 'rgba(239, 68, 68, 0.2)'; btn.style.borderColor = '#ef4444'; }
};
window.checkCollocation = function (btn, selected, correct) {
    const parent = btn.closest('.collo-box');
    const blank = parent.querySelector('.blank');
    const buttons = parent.querySelectorAll('button');
    if (selected === correct) {
        blank.textContent = correct; blank.style.color = '#34d399'; blank.style.borderBottom = 'none';
        btn.style.background = '#34d399'; btn.style.color = '#fff';
        buttons.forEach(b => b.disabled = true);
    } else {
        btn.style.background = '#ef4444';
        setTimeout(() => { btn.style.background = 'rgba(255,255,255,0.1)'; }, 500);
    }
};

// Audio Engine (No Gender param)
let voices = [];
const synth = window.speechSynthesis;
function initAudioEngine() { populateVoices(); if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = populateVoices; }
function populateVoices() { voices = synth.getVoices(); }
window.playAudio = function (text) {
    synth.cancel(); // Stop any current audio first
    if (text) {
        const utterThis = new SpeechSynthesisUtterance(text);
        const englishVoices = voices.filter(v => v.lang.includes('en'));
        let selectedVoice = englishVoices[0]; // Use first available English voice
        utterThis.voice = selectedVoice;
        utterThis.rate = 0.9;
        synth.speak(utterThis);
    }
};
window.stopAudio = function () {
    synth.cancel();
};
window.courseAudio = { play: window.playAudio, stop: window.stopAudio };
