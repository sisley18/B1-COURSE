document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized: Full Module with Pronunciation');
    initAudioEngine();
    renderCurriculum();
    setupNavigation();
    setupProtection();
    initAttendance();
});

// Content Protection
function setupProtection() {
    const overlay = document.getElementById('protection-overlay');

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionMessage();
    });

    // Disable copy
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showProtectionMessage();
    });

    // Disable cut
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        showProtectionMessage();
    });

    // Disable text selection on double-click
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            // Allow selection but show message on copy attempt
        }
    });

    // Close overlay on click
    if (overlay) {
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    // Disable keyboard shortcuts for copy/print
    document.addEventListener('keydown', (e) => {
        // Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U
        if (e.ctrlKey && (e.key === 'c' || e.key === 'p' || e.key === 's' || e.key === 'u')) {
            e.preventDefault();
            showProtectionMessage();
        }
        // F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            showProtectionMessage();
        }
    });
}

function showProtectionMessage() {
    const overlay = document.getElementById('protection-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 3000); // Auto-hide after 3 seconds
    }
}

let currentUnitIndex = 0;

function setupNavigation() {
    // Listen for unit open/close events
    const unitBlocks = document.querySelectorAll('.unit-block');
    unitBlocks.forEach((block, index) => {
        block.addEventListener('toggle', () => {
            if (block.open) {
                currentUnitIndex = index;
            }
        });
    });
}

window.navigateUnit = function (direction) {
    const unitBlocks = document.querySelectorAll('.unit-block');
    const totalUnits = unitBlocks.length;

    // Close current unit
    if (unitBlocks[currentUnitIndex]) {
        unitBlocks[currentUnitIndex].open = false;
    }

    // Calculate new index
    currentUnitIndex = currentUnitIndex + direction;

    // Wrap around
    if (currentUnitIndex < 0) currentUnitIndex = totalUnits - 1;
    if (currentUnitIndex >= totalUnits) currentUnitIndex = 0;

    // Open new unit
    if (unitBlocks[currentUnitIndex]) {
        unitBlocks[currentUnitIndex].open = true;
        // Scroll to the unit
        unitBlocks[currentUnitIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const whatsappIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

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

                <!-- 5. Verb Patterns (NEW) -->
                ${unit.verb_patterns ? `
                <div class="section-block">
                    <span class="section-label" style="background: rgba(167, 139, 250, 0.2); color: #a78bfa;">Verb Patterns</span>
                    <h3>Verbs + Gerund / Infinitive</h3>
                    
                    <div class="theory-box">
                        <h4>📚 Verb Patterns Theory</h4>
                        <p>In English, some verbs are followed by <strong>gerunds (-ing)</strong>, some by <strong>infinitives (to + verb)</strong>, and some can take <strong>both</strong>.</p>
                        <p><strong>Verbs + Gerund (-ing):</strong></p>
                        <ul>
                            <li><strong>enjoy, avoid, finish, keep, practice, suggest, consider, mind, risk, imagine</strong></li>
                            <li>Example: I enjoy <em>swimming</em>. / She avoids <em>eating</em> sugar.</li>
                        </ul>
                        <p style="margin-top: 10px;"><strong>Verbs + Infinitive (to + verb):</strong></p>
                        <ul>
                            <li><strong>want, need, decide, hope, plan, promise, expect, agree, refuse, learn</strong></li>
                            <li>Example: I want <em>to travel</em>. / She decided <em>to quit</em>.</li>
                        </ul>
                        <p style="margin-top: 10px;"><strong>Verbs + Both (with different meanings):</strong></p>
                        <ul>
                            <li><strong>stop, remember, forget, try, regret</strong></li>
                            <li>Example: I stopped <em>smoking</em> (quit). / I stopped <em>to smoke</em> (paused to smoke).</li>
                        </ul>
                    </div>
                    
                    <p style="margin-bottom: 15px; opacity: 0.7;">Complete the sentences with the correct verb form:</p>
                    <div style="margin-top:20px;">
                        ${unit.verb_patterns.exercises.map((q, idx) => `
                            <div style="margin-bottom: 15px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                                <p style="font-weight:600; margin-bottom:10px;">${idx + 1}. ${q.sentence}</p>
                                <div class="options-grid" style="justify-content: flex-start;">
                                    ${q.options.map((opt, i) => `
                                        <button class="btn" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);" 
                                        onclick="checkAnswer(this, ${i === q.correct})">${opt}</button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- 6. Pronunciation -->
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
                        ${unit.videos.map((video, vIdx) => {
                    const isCompVideo = unit.video_comprehension && (
                        unit.video_comprehension.videoIndex === vIdx ||
                        (unit.video_comprehension.videoId && video.url.includes(unit.video_comprehension.videoId))
                    );
                    return `
                            <div>
                                <a href="${video.url}" target="_blank" rel="noopener noreferrer" 
                                   style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 15px 20px; border-radius: 12px; text-decoration: none; color: #fff; border: 1px solid ${isCompVideo ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}; transition: all 0.3s ease;"
                                   onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='var(--accent-gold)';"
                                   onmouseout="this.style.background='rgba(0,0,0,0.2)'; this.style.borderColor='${isCompVideo ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}';">
                                    <span style="font-size: 2rem;">▶️</span>
                                    <div>
                                        <h4 style="margin: 0 0 5px 0; color: var(--accent-gold);">${video.title}</h4>
                                        <p style="margin: 0; font-size: 0.9rem; opacity: 0.7;">${video.channel} • ${video.duration}</p>
                                    </div>
                                </a>
                                ${unit.video_comprehension && isCompVideo ? `
                                <div id="video-comp-unit-${unit.id}" style="margin-top: 2px; padding: 20px; background: rgba(0,0,0,0.25); border: 1px solid rgba(251,191,36,0.3); border-top: none; border-radius: 0 0 12px 12px;">
                                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                        <span style="font-size: 1.5rem;">🎧</span>
                                        <h4 style="margin: 0; color: #fbbf24;">Listening Comprehension Exercise</h4>
                                    </div>
                                    <div style="margin-bottom: 20px; opacity: 0.8; font-style: italic;">${unit.video_comprehension.instructions || 'Watch the video and complete the exercise below:'}</div>
                                    ${unit.video_comprehension.questions ? unit.video_comprehension.questions.map((q, qIdx) => `
                                        <div style="margin-bottom: 20px; padding-bottom: 15px; ${qIdx < unit.video_comprehension.questions.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.1);' : ''}">
                                            <p style="font-weight: 600; margin-bottom: 10px;">${qIdx + 1}. ${q.q}</p>
                                            <div class="options-grid" style="justify-content: flex-start; margin-bottom: 10px;">
                                                ${q.options.map((opt, i) => `
                                                    <button class="btn" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);" 
                                                    onclick="checkAnswer(this, ${i === q.correct})">${opt}</button>
                                                `).join('')}
                                            </div>
                                            <textarea class="video-answer-box" data-unit="${unit.id}" data-question="${qIdx}" 
                                                placeholder="✍️ Write your answer here..." 
                                                style="width: 100%; min-height: 60px; background: rgba(255,255,255,0.05); border: 1px solid rgba(251,191,36,0.2); color: #fff; padding: 12px; border-radius: 8px; font-family: inherit; font-size: 0.9rem; resize: vertical; transition: border-color 0.3s ease;"
                                                onfocus="this.style.borderColor='rgba(251,191,36,0.6)'"
                                                onblur="this.style.borderColor='rgba(251,191,36,0.2)'"
                                            ></textarea>
                                        </div>
                                    `).join('') : ''}
                                    ${unit.video_comprehension.fitb ? unit.video_comprehension.fitb.map((sentence, qIdx) => `
                                        <div style="margin-bottom: 20px; padding-bottom: 15px; ${qIdx < unit.video_comprehension.fitb.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.1);' : ''}">
                                            <p style="font-weight: 600; margin-bottom: 10px;">${qIdx + 1}. ${sentence}</p>
                                            <textarea class="video-answer-box" data-unit="${unit.id}" data-question="fitb-${qIdx}" 
                                                placeholder="✍️ Complete the sentence..." 
                                                style="width: 100%; min-height: 60px; background: rgba(255,255,255,0.05); border: 1px solid rgba(251,191,36,0.2); color: #fff; padding: 12px; border-radius: 8px; font-family: inherit; font-size: 0.9rem; resize: vertical; transition: border-color 0.3s ease;"
                                                onfocus="this.style.borderColor='rgba(251,191,36,0.6)'"
                                                onblur="this.style.borderColor='rgba(251,191,36,0.2)'"
                                            ></textarea>
                                        </div>
                                    `).join('') : ''}
                                    <button onclick="sendVideoAnswersToWhatsApp(${unit.id})" 
                                        style="display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 14px 20px; margin-top: 10px; background: linear-gradient(135deg, #25D366, #128C7E); border: none; color: #fff; font-size: 1rem; font-weight: 700; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);"
                                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(37, 211, 102, 0.4)'"
                                        onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(37, 211, 102, 0.3)'"
                                    >
                                        ${whatsappIcon}
                                        Send Answers via WhatsApp
                                    </button>
                                </div>
                                ` : ''}
                            </div>
                            `;
                }).join('')}
                    </div>
                </div>
                ` : ''}

                ${unit.id % 2 === 0 ? `
                <!-- Exam Link for Even Units -->
                <div class="section-block" style="border-top: 2px solid rgba(251,191,36,0.4); margin-top: 40px; padding-top: 30px; text-align: center;">
                    <span class="section-label" style="background: rgba(251,191,36,0.2); color: #fbbf24; border: 1px solid #fbbf24;">📝 Progress Exam</span>
                    <h3 style="color: #fbbf24; margin: 15px 0 10px;">You've completed Units ${unit.id - 1} &amp; ${unit.id}!</h3>
                    <p style="opacity: 0.75; margin-bottom: 20px;">Test your knowledge with the Progress Exam covering both units — listening, writing &amp; grammar.</p>
                    <a href="exam${unit.id / 2}.html" style="display: inline-block; background: linear-gradient(135deg, rgba(251,191,36,0.3), rgba(245,158,11,0.2)); border: 2px solid #fbbf24; color: #fbbf24; padding: 14px 35px; border-radius: 50px; font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 0.3s ease;"
                        onmouseover="this.style.background='rgba(251,191,36,0.4)'; this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.background='linear-gradient(135deg, rgba(251,191,36,0.3), rgba(245,158,11,0.2))'; this.style.transform=''">
                        📝 Take Exam ${unit.id / 2} →
                    </a>
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
window.sendVideoAnswersToWhatsApp = function (unitId) {
    const unit = courseData.units.find(u => u.id === unitId);
    if (!unit || !unit.video_comprehension) return;

    const textareas = document.querySelectorAll(`textarea.video-answer-box[data-unit="${unitId}"]`);
    const answers = [];
    let hasAnswers = false;

    if (unit.video_comprehension.questions) {
        unit.video_comprehension.questions.forEach((q, idx) => {
            const textarea = Array.from(textareas).find(t => t.dataset.question === String(idx));
            const answer = textarea ? textarea.value.trim() : '';
            if (answer) hasAnswers = true;
            answers.push(`Q${idx + 1}: ${q.q}\n→ ${answer || '(no answer)'}`);
        });
    }

    if (unit.video_comprehension.fitb) {
        unit.video_comprehension.fitb.forEach((sentence, idx) => {
            const textarea = Array.from(textareas).find(t => t.dataset.question === `fitb-${idx}`);
            const answer = textarea ? textarea.value.trim() : '';
            if (answer) hasAnswers = true;
            answers.push(`FITB ${idx + 1}: ${sentence}\n→ ${answer || '(no answer)'}`);
        });
    }

    if (!hasAnswers) {
        alert('Please write at least one answer before sending.');
        return;
    }

    let videoTitle = 'Video';
    if (unit.video_comprehension.videoIndex !== undefined) {
        videoTitle = unit.videos[unit.video_comprehension.videoIndex]?.title || 'Video';
    } else if (unit.video_comprehension.videoId) {
        const video = unit.videos.find(v => v.url.includes(unit.video_comprehension.videoId));
        videoTitle = video ? video.title : (unit.video_comprehension.videoTitle || 'Video');
    }

    const message = `📺 *Video Comprehension - Unit ${unitId}: ${unit.title}*\n🎬 Video: ${videoTitle}\n\n${answers.join('\n\n')}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
};

// Universal High-Quality Audio Engine (Native Web Speech API)
// Optimized for American Professional Pronunciation on Mobile/Tablet/PC
let audioQueue = [];
let isPlaying = false;
let isPaused = false;
let voices = [];

function initAudioEngine() {
    if ('speechSynthesis' in window) {
        // Load voices immediately (works on Firefox, Safari)
        voices = window.speechSynthesis.getVoices();
        // Desktop Chrome/Edge load voices asynchronously — keep retrying
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                console.log("Voices updated:", voices.length);
            };
        }
        // Fallback retry loop for Chrome on Windows (voices often empty on first call)
        if (voices.length === 0) {
            let attempts = 0;
            const retryLoad = setInterval(() => {
                voices = window.speechSynthesis.getVoices();
                attempts++;
                if (voices.length > 0 || attempts >= 15) {
                    clearInterval(retryLoad);
                    console.log("Voices ready after retry:", voices.length);
                }
            }, 200);
        }
    }
    console.log("Universal Audio Engine Ready (Web Speech API — All Devices)");
}

function getBestVoice(genderPreference) {
    if (voices.length === 0) voices = window.speechSynthesis.getVoices();

    const usVoices = voices.filter(v => v.lang === 'en-US' || v.lang.startsWith('en-US'));
    if (usVoices.length === 0) return voices.find(v => v.lang.includes('en')) || null;

    // Filter by gender if possible
    let filtered = usVoices;
    if (genderPreference) {
        const gp = genderPreference.toLowerCase();
        if (gp === 'female') {
            filtered = usVoices.filter(v => /female|samantha|zira|victoria|aria|jenny|michelle|monica/i.test(v.name));
        } else if (gp === 'male') {
            filtered = usVoices.filter(v => /male|alex|david|mark|guy|ryan|andrew/i.test(v.name));
        }
    }

    if (filtered.length === 0) filtered = usVoices;

    // Priority: Google US English (Chrome desktop) > Microsoft Aria/Jenny (Edge neural) > Apple Enhanced (Mac/iOS) > fallback
    const premiumOrder = ['Google US English', 'Google US', 'Google', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft', 'Aria', 'Jenny', 'Enhanced', 'Premium', 'Natural'];
    for (const keyword of premiumOrder) {
        const match = filtered.find(v => v.name.includes(keyword));
        if (match) return match;
    }

    return filtered[0];
}

window.playAudio = function (text, genderPreference) {
    window.stopAudio();
    if (!text || !('speechSynthesis' in window)) return;

    // Split text into ~180 char chunks at sentence boundaries for smoother playback
    const chunks = splitTextForTTS(text, 180);
    audioQueue = chunks.map(c => ({ text: c, gender: genderPreference }));
    isPaused = false;
    processAudioQueue();
};

function splitTextForTTS(text, maxLength) {
    const chunks = [];
    let remaining = text;

    while (remaining.length > 0) {
        if (remaining.length <= maxLength) {
            chunks.push(remaining);
            break;
        }

        let splitIdx = remaining.lastIndexOf('. ', maxLength);
        if (splitIdx === -1) splitIdx = remaining.lastIndexOf('? ', maxLength);
        if (splitIdx === -1) splitIdx = remaining.lastIndexOf('! ', maxLength);
        if (splitIdx === -1) splitIdx = remaining.lastIndexOf(', ', maxLength);
        if (splitIdx === -1) splitIdx = remaining.lastIndexOf(' ', maxLength);
        if (splitIdx === -1) splitIdx = maxLength;

        chunks.push(remaining.substring(0, splitIdx + 1).trim());
        remaining = remaining.substring(splitIdx + 1).trim();
    }
    return chunks;
}

function processAudioQueue() {
    if (isPaused || audioQueue.length === 0) {
        isPlaying = false;
        return;
    }

    isPlaying = true;
    const item = audioQueue.shift();
    const utterance = new SpeechSynthesisUtterance(item.text);
    
    utterance.lang = 'en-US';
    utterance.rate = 1.0; // Professional natural speed
    utterance.pitch = 1.0;
    
    const voice = getBestVoice(item.gender);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
        processAudioQueue();
    };

    utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        processAudioQueue();
    };

    window.speechSynthesis.speak(utterance);
}

window.stopAudio = function () {
    audioQueue = [];
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    isPlaying = false;
    isPaused = false;
    updatePauseButton(false);
};

window.pauseAudio = function () {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking && !isPaused) {
        window.speechSynthesis.pause();
        isPaused = true;
        updatePauseButton(true);
    }
};

window.resumeAudio = function () {
    if ('speechSynthesis' in window && isPaused) {
        isPaused = false;
        updatePauseButton(false);
        window.speechSynthesis.resume();
    }
};

window.togglePauseAudio = function () {
    if (isPaused) {
        window.resumeAudio();
    } else if (isPlaying) {
        window.pauseAudio();
    }
};

function updatePauseButton(isPaused) {
    const pauseBtn = document.getElementById('pause-audio-btn');
    if (pauseBtn) {
        pauseBtn.innerHTML = isPaused ? '▶️ Resume' : '⏸️ Pause';
    }
}

window.courseAudio = {
    play: window.playAudio,
    stop: window.stopAudio,
    pause: window.pauseAudio,
    resume: window.resumeAudio,
    togglePause: window.togglePauseAudio
};

// Attendance Logic
function initAttendance() {
    const dateInput = document.getElementById('att-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().substr(0, 10);
    }
    loadAttendance();
}

window.saveAttendance = function () {
    const date = document.getElementById('att-date').value;
    const user = document.getElementById('att-user').value;

    if (!date || !user) return;

    const records = JSON.parse(localStorage.getItem('attendance_records') || '[]');

    // Check for duplicates
    const exists = records.some(r => r.date === date && r.user === user);
    if (exists) {
        alert('Attendance already marked for this student on this date.');
        return;
    }

    records.push({ date, user, id: Date.now() });
    localStorage.setItem('attendance_records', JSON.stringify(records));
    loadAttendance();
};

function loadAttendance() {
    const container = document.getElementById('attendance-list');
    if (!container) return;

    const records = JSON.parse(localStorage.getItem('attendance_records') || '[]');
    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = records.length === 0
        ? '<p style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No attendance records found.</p>'
        : records.map(r => `
            <div class="att-record">
                <div>
                    <span>${r.user}</span>
                    <span style="display: block; font-size: 0.75rem;">${r.date}</span>
                </div>
                <span class="att-delete" onclick="deleteAttendance(${r.id})">🗑️</span>
            </div>
        `).join('');
}

window.deleteAttendance = function (id) {
    if (!confirm('Delete this attendance record?')) return;
    let records = JSON.parse(localStorage.getItem('attendance_records') || '[]');
    records = records.filter(r => r.id !== id);
    localStorage.setItem('attendance_records', JSON.stringify(records));
    loadAttendance();
};

