document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized: Expanded Unit Mode');
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

        unitBlock.innerHTML = `
            <summary class="unit-header">
                <div>
                    <span class="unit-subtitle">Unit ${unit.id}</span>
                    <span class="unit-title">${unit.title}</span>
                </div>
            </summary>
            <div class="unit-body">
                <p style="opacity: 0.7; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">Topic: ${unit.topic}</p>
                
                <!-- 1. Vocabulary (New) -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255,255,255,0.1); color: #fff;">Vocabulary</span>
                    <h3>Key Terms</h3>
                    <div class="vocab-grid">
                        ${unit.vocabulary ? unit.vocabulary.map(v => `
                            <div class="vocab-card">
                                <strong>${v.word}</strong>
                                <p>${v.def}</p>
                            </div>
                        `).join('') : '<p>No vocabulary loaded.</p>'}
                    </div>
                </div>

                <!-- 2. Listening -->
                <div class="section-block">
                    <span class="section-label listening">Listening</span>
                    <h3>${unit.listening.title}</h3>
                    <div class="player-controls">
                        <button class="play-btn" onclick="playTrack('${unit.listening.transcript.replace(/'/g, "\\'")}', '${unit.listening.gender}')">▶</button>
                        <span style="font-size: 0.9rem; opacity: 0.8;">Audio Track (${unit.listening.gender})</span>
                    </div>
                    <button class="btn" style="border: 1px solid rgba(255,255,255,0.2); font-size: 0.8rem; padding: 5px 15px;" onclick="toggleTranscript(this)">Show Transcript</button>
                    <div class="transcript-box" style="display:none; margin-top:10px; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">
                        ${unit.listening.transcript}
                    </div>
                    ${renderQuiz(unit.listening.questions, 'listening')}
                </div>

                <!-- 3. Reading -->
                <div class="section-block">
                    <span class="section-label reading">Reading</span>
                    <h3>${unit.reading.title}</h3>
                    <div class="reading-text">${unit.reading.text}</div>
                    ${renderQuiz(unit.reading.questions, 'reading')}
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

                <!-- 5. Collocation -->
                <div class="section-block">
                    <span class="section-label collocation">Collocation</span>
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
                    `).join('') : '<p>No collocations.</p>'}
                    </div>
                </div>

                <!-- 6. Writing (New) -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255, 100, 100, 0.2); color: #ffadad;">Writing Task</span>
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px;">
                        <p style="font-style: italic; margin-bottom: 15px;">Target: 200 words</p>
                        <h4 style="margin-bottom: 10px;">${unit.writing || 'Write about the topic.'}</h4>
                        <textarea style="width: 100%; height: 150px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px; border-radius: 8px; font-family: inherit;" placeholder="Type your essay here..."></textarea>
                    </div>
                </div>

                <!-- 7. Speaking (New) -->
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

            </div>
        `;
        container.appendChild(unitBlock);
    });
}
// ... (RenderQuiz context preserved but omitted for brevity in thought, implied in code)
function renderQuiz(questions, type) {
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
// ... (Helpers and AudioEngine preserved identically from previous Step 145)
window.playTrack = function (text, gender) { window.courseAudio.play(text, gender); };
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
let voices = [];
const synth = window.speechSynthesis;
function initAudioEngine() { populateVoices(); if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = populateVoices; }
function populateVoices() { voices = synth.getVoices(); }
window.playAudio = function (text, gender = 'female') {
    if (synth.speaking) return;
    if (text) {
        const utterThis = new SpeechSynthesisUtterance(text);
        const englishVoices = voices.filter(v => v.lang.includes('en'));
        let selectedVoice = gender === 'female' ? englishVoices.find(v => v.name.includes('Female') || v.name.includes('Zira')) : englishVoices.find(v => v.name.includes('Male') || v.name.includes('David'));
        if (!selectedVoice) selectedVoice = englishVoices[0];
        utterThis.voice = selectedVoice; utterThis.rate = 0.9;
        synth.speak(utterThis);
    }
};
window.courseAudio = { play: window.playAudio };
