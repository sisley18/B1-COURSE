/**
 * Unit Renderer Logic
 * Responsible for populating a unit page with all its sections.
 */

function renderUnitPage(unitId) {
    const container = document.getElementById('unit-content');
    if (!container) return;

    // Combine data if not already merged
    let allUnits = [...courseData.units];
    if (typeof courseDataPart2 !== 'undefined') allUnits = [...allUnits, ...courseDataPart2.units];
    if (typeof courseDataPart3 !== 'undefined') allUnits = [...allUnits, ...courseDataPart3.units];

    const unit = allUnits.find(u => u.id === unitId);
    if (!unit) {
        container.innerHTML = `<h2>Unit ${unitId} not found.</h2>`;
        return;
    }

    container.innerHTML = `
        <div class="animate__animated animate__fadeIn">
            <div style="margin-bottom: 40px; text-align: center;">
                <span class="level-badge level-${(unit.level || 'B1').toLowerCase()}">${unit.level || 'B1'} • Unit ${unit.id}</span>
                <h1 style="font-size: 2.5rem; margin-top: 10px;">${unit.title}</h1>
                <p style="font-size: 1.1rem; opacity: 0.7;">Topic: ${unit.topic}</p>
            </div>

            <!-- Completion Status Card -->
            <div class="completion-status-card" id="unit-status-panel"></div>

            <!-- Vocabulary Section -->
            <section class="section-block">
                <span class="section-label">a1. Vocabulary & Pronunciation</span>
                <div class="vocab-grid">
                    ${unit.vocabulary.map(v => `
                        <div class="vocab-card">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                                <button class="play-btn" onclick="playAudio('${v.word}')">🔊</button>
                                <strong>${v.word}</strong>
                                <span style="font-size: 0.8rem; color: var(--accent-indigo); font-family: monospace;">/${v.ipa}/</span>
                            </div>
                            <p style="font-size: 0.95rem; color: var(--text-secondary);">${v.def}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Personal Profile Section -->
            ${unit.personal_questions ? `
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-violet);">b1. Personal Profile</span>
                <h3>Talk about Yourself</h3>
                <p style="margin-bottom: 25px; color: var(--text-secondary);">Answer these questions based on your own experience. Use the <strong>model</strong> as a guide.</p>
                <div style="display: grid; gap: 20px;">
                    ${unit.personal_questions.map((pq, pqIdx) => `
                        <div class="theory-box" style="border-left-color: var(--accent-violet);">
                            <p><strong>Q: ${pq.question}</strong></p>
                            <p style="font-size: 0.9rem; margin-top: 10px; color: var(--accent-violet); font-style: italic;">
                                Model: "${pq.model}" 
                                <button class="btn" style="padding: 2px 8px; font-size: 0.7rem; border-width: 1px; margin-left: 5px;" onclick="playAudio(\`${pq.model.replace(/'/g, "\\'")}\`)">🔊 Listen</button>
                            </p>
                            <textarea class="personal-answer-box" data-unit="${unit.id}" data-qidx="${pqIdx}" placeholder="Your answer..." style="width: 100%; height: 80px; background: var(--bg-accent); border: 1px solid rgba(0,0,0,0.05); color: var(--text-primary); padding: 12px; border-radius: 8px; margin-top: 10px; font-family: inherit; resize: vertical;"></textarea>
                        </div>
                    `).join('')}
                    <button class="btn btn-whatsapp" onclick="sendPersonalAnswersToWhatsApp(${unit.id})" style="width: 100%; justify-content: center;">
                        Send Profile via WhatsApp 📱
                    </button>
                </div>
            </section>
            ` : ''}

            <!-- Listening Section -->
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-gold);">c1. Listening Skills</span>
                <h3>${unit.listening.title}</h3>
                <div style="display: flex; align-items: center; gap: 15px; background: var(--bg-accent); padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <button class="play-btn" style="background: var(--accent-gold);" onclick="playAudio(\`${unit.listening.transcript.replace(/`/g, '\\`').replace(/'/g, "\\'")}\`)">▶ Play Audio</button>
                    <span style="font-weight: 600;">Listen to the scenario</span>
                </div>
                <details class="unit-block" style="border-left: 4px solid var(--accent-gold); margin-bottom: 25px;">
                    <summary class="unit-header" style="padding: 12px 20px; font-size: 0.9rem;">View Transcript</summary>
                    <div class="unit-body" style="font-style: italic; color: var(--text-secondary);">
                        ${unit.listening.transcript}
                    </div>
                </details>
                <div style="margin-top: 20px;">
                    <h4 style="margin-bottom: 15px;">Comprehension Check</h4>
                    ${renderQuiz(unit.listening.questions)}
                </div>
            </section>

            <!-- Reading Section -->
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-teal);">d1. Reading Comprehension</span>
                <div class="reading-text" style="border-left-color: var(--accent-teal);">
                    <h3 style="margin-bottom: 15px; color: var(--accent-teal);">${unit.reading.title}</h3>
                    ${unit.reading.text}
                </div>
                <div style="margin-top: 20px;">
                    <h4 style="margin-bottom: 15px;">Reading Quiz</h4>
                    ${renderQuiz(unit.reading.questions)}
                </div>
            </section>

            <!-- Grammar Section -->
            <section class="section-block">
                <span class="section-label">e1. Grammar Hub</span>
                <div class="grammar-box">
                    <h3 style="margin-bottom: 10px;">${unit.grammar.title}</h3>
                    <p>${unit.grammar.explanation}</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.02); border-radius: 8px;">
                        <strong>Example:</strong> <span style="color: var(--accent-indigo);">${unit.grammar.example}</span>
                        <button class="btn" style="padding: 2px 8px; font-size: 0.7rem; border-width: 1px; margin-left: 5px;" onclick="playAudio(\`${unit.grammar.example.replace(/'/g, "\\'")}\`)">🔊</button>
                    </div>
                </div>
                <div style="margin-top: 25px;">
                    ${unit.grammar.quizzes.map((q, i) => `
                        <div style="margin-bottom: 20px;" class="quiz-question">
                            <p class="question-text"><strong>${i+1}. ${q.question}</strong></p>
                            <div class="options-grid">
                                ${q.options.map((opt, oIdx) => `
                                    <button class="btn" onclick="checkAnswer(this, ${oIdx === q.correct})">${opt}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Pronunciation Stress Section -->
            ${unit.pronunciation ? `
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-violet);">f1. Pronunciation Focus</span>
                <h3>Word & Sentence Stress</h3>
                <div style="display: grid; gap: 20px;">
                    ${unit.pronunciation.word_stress.map((ws, wsIdx) => `
                        <div class="theory-box quiz-question" style="border-left-color: var(--accent-violet);">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                                <button class="play-btn" style="width: 32px; height: 32px; font-size: 0.8rem; background: var(--accent-violet);" onclick="playAudio('${ws.word.replace(/-/g, '')}')">🔊</button>
                                <strong>${ws.word}</strong>
                            </div>
                            <p style="font-size: 0.85rem; margin-bottom: 10px; color: var(--text-secondary);" class="question-text">Select the syllable with the <strong>primary stress</strong> for: ${ws.word}</p>
                            <div class="options-grid">
                                ${ws.syllables.map((syl, sIdx) => `
                                    <button class="btn" style="padding: 5px 15px; font-size: 0.8rem;" onclick="checkAnswer(this, ${sIdx === ws.correct})">${syl}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Collocations Section -->
            ${unit.collocations ? `
            <section class="section-block">
                <span class="section-label">g1. Common Collocations</span>
                <div style="display: grid; gap: 15px;">
                    ${unit.collocations.map((col, cIdx) => `
                        <div class="theory-box quiz-question">
                            <p style="font-size: 1.1rem; margin-bottom: 10px;" class="question-text">
                                <span style="color: var(--accent-indigo); font-weight: 700;">${col.pair[0]}</span> 
                                <span style="border-bottom: 2px dashed var(--accent-gold); color: var(--accent-gold); padding: 0 10px;">______</span>
                            </p>
                            <p style="font-size: 0.9rem; opacity: 0.7; font-style: italic; margin-bottom: 15px;">"${col.context.replace('_____', '...')}"</p>
                            <div class="options-grid">
                                ${[col.pair[1], ...col.distractors].sort().map(opt => `
                                    <button class="btn" style="padding: 5px 15px; font-size: 0.8rem;" onclick="checkAnswer(this, '${opt}' === '${col.pair[1]}')">${opt}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Cinema & Culture Movie Scene Section -->
            ${unit.movie_scene ? `
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid #f59e0b;">h1. Cinema & Culture Scene</span>
                <div style="background: var(--bg-accent, rgba(255, 255, 255, 0.03)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 25px; margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <span style="display: inline-block; background: #f59e0b; color: #111; font-weight: 700; font-size: 0.8rem; padding: 3px 10px; border-radius: 20px; margin-bottom: 8px;">🎬 MOVIE SCENE</span>
                            <h3 style="margin: 0; font-size: 1.5rem; color: #fff;">${unit.movie_scene.movie}</h3>
                            <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: var(--accent-gold);"><strong>Director:</strong> ${unit.movie_scene.director} &nbsp;|&nbsp; <strong>Characters:</strong> ${unit.movie_scene.characters}</p>
                        </div>
                        <button class="btn" style="background: var(--accent-gold); color: #111; font-weight: 700; border-color: var(--accent-gold); padding: 8px 16px; font-size: 0.85rem;" onclick="playAudio(\`${unit.movie_scene.dialogue.map(d => `${d.speaker} says: ${d.line}`).join('. ').replace(/'/g, "\\'")}\`)">
                            🔊 Play Entire Scene Audio
                        </button>
                    </div>

                    <div style="background: rgba(0, 0, 0, 0.25); border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 0 10px 10px 0; margin-bottom: 25px; font-style: italic; font-size: 0.95rem; color: var(--text-secondary);">
                        💡 <strong>Scene Context:</strong> ${unit.movie_scene.context}
                    </div>

                    <h4 style="margin-bottom: 15px; color: #f59e0b; font-size: 1.1rem;">📜 Scene Dialogue & Pronunciation</h4>
                    <div style="display: grid; gap: 12px; margin-bottom: 30px;">
                        ${unit.movie_scene.dialogue.map((d, dIdx) => `
                            <div style="display: flex; gap: 15px; align-items: flex-start; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); padding: 14px 18px; border-radius: 10px;">
                                <button class="play-btn" style="width: 34px; height: 34px; min-width: 34px; font-size: 0.85rem; background: rgba(245, 158, 11, 0.2); border-color: #f59e0b;" onclick="playAudio(\`${d.speaker} says: ${d.line.replace(/'/g, "\\'")}\`)">🔊</button>
                                <div style="flex: 1;">
                                    <strong style="color: var(--accent-gold); font-size: 0.95rem;">${d.speaker}:</strong>
                                    <p style="margin: 4px 0 0 0; font-size: 1rem; color: #fff; line-height: 1.5;">"${d.line}"</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Scene Comprehension Quiz -->
                    <h4 style="margin-bottom: 15px; color: #f59e0b; font-size: 1.1rem;">🧠 Scene Comprehension Check</h4>
                    <div style="display: grid; gap: 15px; margin-bottom: 25px;">
                        ${unit.movie_scene.quiz.map((q, qIdx) => `
                            <div class="theory-box quiz-question" style="border-left-color: #f59e0b;">
                                <p style="font-size: 1rem; font-weight: 600; margin-bottom: 12px;" class="question-text">${qIdx + 1}. ${q.q}</p>
                                <div class="options-grid">
                                    ${q.options.map((opt, oIdx) => `
                                        <button class="btn" style="padding: 8px 16px; font-size: 0.9rem; text-align: left;" onclick="checkAnswer(this, ${oIdx === q.correct})">${opt}</button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Scene Discussion / Reflection Prompt -->
                    <div class="theory-box" style="border-left-color: #f59e0b; background: rgba(0, 0, 0, 0.2);">
                        <p style="font-size: 1rem; font-weight: 600; margin-bottom: 10px; color: #f59e0b;">💬 Scene Discussion & Personal Reflection:</p>
                        <p style="margin-bottom: 15px; font-size: 0.95rem; color: var(--text-secondary);">${unit.movie_scene.discussion_prompt}</p>
                        <textarea class="movie-reflection-box" data-unit="${unit.id}" placeholder="Write your reflection or response here..." style="width: 100%; height: 100px; background: rgba(0,0,0,0.3); border: 1px solid rgba(245, 158, 11, 0.3); color: #fff; padding: 12px; border-radius: 8px; font-family: inherit; font-size: 0.95rem; resize: vertical;"></textarea>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Writing Task Section -->
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-teal);">i1. Writing Task</span>
                <div class="theory-box" style="border-left-color: var(--accent-teal);">
                    <p style="font-size: 1.05rem; margin-bottom: 15px;">${unit.writing}</p>
                    <textarea class="writing-box" placeholder="Start typing your answer here..." style="width: 100%; height: 150px; background: var(--bg-accent); border: 1px solid rgba(0,0,0,0.05); color: var(--text-primary); padding: 15px; border-radius: 12px; font-family: inherit; resize: vertical;"></textarea>
                    <button class="btn btn-whatsapp" onclick="sendWritingToWhatsApp(this, ${unit.id})" style="margin-top: 15px; width: 100%; justify-content: center;">
                        Send Writing to Teacher 📱
                    </button>
                </div>
            </section>

            <!-- Speaking Practice Section -->
            <section class="section-block">
                <span class="section-label" style="border-left: 4px solid var(--accent-gold);">j1. Speaking Practice</span>
                <div class="theory-box" style="display: flex; align-items: center; gap: 20px; border-left-color: var(--accent-gold);">
                    <div style="font-size: 2.5rem;">🎙️</div>
                    <div>
                        <p style="font-size: 1.1rem; font-weight: 500;">${unit.speaking}</p>
                        <button class="btn" onclick="playAudio(\`${unit.speaking.replace(/'/g, "\\'")}\`)" style="margin-top: 12px; font-size: 0.85rem; padding: 8px 20px;">
                            🔊 Listen to Example
                        </button>
                    </div>
                </div>
            </section>

            <!-- Progress Exam Card for Units 2, 4, 6, 8 -->
            ${renderProgressExamCard(unitId)}

            <!-- Submit Unit Button -->
            <div style="margin-top: 40px; text-align: center; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 30px;">
                <button class="btn btn-whatsapp" onclick="sendUnitAnswersToWhatsApp(${unit.id})" style="width: 100%; max-width: 400px; justify-content: center; margin: 0 auto; font-size: 1.1rem; padding: 15px;">
                    Send ALL My Unit Answers to Teacher 📱
                </button>
            </div>
        </div>
    `;

    // Initialize completion status
    setTimeout(() => initUnitPageStatus(unitId), 10);
}

function renderQuiz(questions) {
    return `
        <div style="display: grid; gap: 20px;">
            ${questions.map((q, i) => `
                <div class="theory-box quiz-question" style="background: transparent; border-left: none; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.03);">
                    <p style="margin-bottom: 12px;" class="question-text"><strong>${i + 1}. ${q.q}</strong></p>
                    <div class="options-grid">
                        ${q.options.map((opt, oIdx) => `
                            <button class="btn" style="padding: 8px 18px; font-size: 0.85rem;" onclick="checkAnswer(this, ${oIdx === q.correct})">${opt}</button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

window.checkAnswer = function(btn, isCorrect) {
    const parent = btn.parentElement;
    Array.from(parent.children).forEach(b => {
        b.style.background = '#fff';
        b.style.color = 'var(--accent-indigo)';
        b.style.borderColor = 'var(--accent-indigo)';
        b.classList.remove('selected-answer');
        b.dataset.isCorrect = "false";
    });
    btn.classList.add('selected-answer');
    btn.dataset.isCorrect = isCorrect ? "true" : "false";

    if (isCorrect) {
        btn.style.background = '#dcfce7';
        btn.style.color = '#166534';
        btn.style.borderColor = '#166534';
        confettiEffect(btn);
    } else {
        btn.style.background = '#fee2e2';
        btn.style.color = '#991b1b';
        btn.style.borderColor = '#991b1b';
    }
};

function confettiEffect(btn) {
    btn.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => btn.classList.remove('animate__animated', 'animate__pulse'), 500);
}

// WhatsApp Integration Functions
function sendPersonalAnswersToWhatsApp(unitId) {
    const textareas = document.querySelectorAll(`.personal-answer-box[data-unit="${unitId}"]`);
    const answers = [];
    let hasContent = false;

    // Data lookup
    let allUnits = [...courseData.units];
    if (typeof courseDataPart2 !== 'undefined') allUnits = [...allUnits, ...courseDataPart2.units];
    if (typeof courseDataPart3 !== 'undefined') allUnits = [...allUnits, ...courseDataPart3.units];
    const unit = allUnits.find(u => u.id === unitId);

    textareas.forEach(ta => {
        const qIdx = ta.dataset.qidx;
        const question = unit.personal_questions[qIdx].question;
        const answer = ta.value.trim();
        if (answer) hasContent = true;
        answers.push(`*Q:* ${question}\n*A:* ${answer || '(no answer)'}`);
    });

    if (!hasContent) { alert('Please answer at least one question!'); return; }

    const message = `*Unit ${unitId}: ${unit.title} - Personal Profile*\n\n${answers.join('\n\n')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

function sendWritingToWhatsApp(btn, unitId) {
    const textarea = btn.previousElementSibling;
    const text = textarea.value.trim();
    if (!text) { alert('Please write something first!'); return; }
    
    let allUnits = [...courseData.units];
    if (typeof courseDataPart2 !== 'undefined') allUnits = [...allUnits, ...courseDataPart2.units];
    if (typeof courseDataPart3 !== 'undefined') allUnits = [...allUnits, ...courseDataPart3.units];
    const unit = allUnits.find(u => u.id === unitId);
    
    const message = `*Unit ${unitId}: ${unit.title} - Writing Task*\n\n${text}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

window.sendUnitAnswersToWhatsApp = function(unitId) {
    let allUnits = [...courseData.units];
    if (typeof courseDataPart2 !== 'undefined') allUnits = [...allUnits, ...courseDataPart2.units];
    if (typeof courseDataPart3 !== 'undefined') allUnits = [...allUnits, ...courseDataPart3.units];
    const unit = allUnits.find(u => u.id === unitId);
    
    let message = `*All Answers Report: Unit ${unitId} - ${unit.title}*\n\n`;
    
    // Gather Quizzes
    const quizQuestions = document.querySelectorAll('.quiz-question');
    if (quizQuestions.length > 0) {
        message += `*--- Quizzes & Exercises ---*\n`;
        quizQuestions.forEach((qDiv, idx) => {
            const qTextEl = qDiv.querySelector('.question-text');
            const qText = qTextEl ? qTextEl.innerText.trim().replace(/\n/g, ' ') : `Question ${idx+1}`;
            const selectedBtn = qDiv.querySelector('.selected-answer');
            const ansText = selectedBtn ? selectedBtn.innerText.trim() : '(Not answered)';
            const mark = selectedBtn ? (selectedBtn.dataset.isCorrect === "true" ? "✅" : "❌") : "⚪";
            message += `*Q:* ${qText}\n*A:* ${ansText} ${mark}\n\n`;
        });
    }

    // Gather Personal Profile
    const textareas = document.querySelectorAll(`.personal-answer-box[data-unit="${unitId}"]`);
    if (textareas.length > 0) {
        message += `*--- Personal Profile ---*\n`;
        textareas.forEach(ta => {
            const qIdx = ta.dataset.qidx;
            const question = unit.personal_questions[qIdx].question;
            const answer = ta.value.trim();
            message += `*Q:* ${question}\n*A:* ${answer || '(Not answered)'}\n\n`;
        });
    }

    // Gather Writing Task
    const writingBox = document.querySelector('.writing-box');
    if (writingBox) {
        message += `*--- Writing Task ---*\n`;
        message += `${writingBox.value.trim() || '(Not answered)'}\n\n`;
    }

    // Gather Cinema Scene Reflection
    const movieReflection = document.querySelector(`.movie-reflection-box[data-unit="${unitId}"]`);
    if (movieReflection && movieReflection.value.trim()) {
        message += `*--- Cinema Scene Reflection (${unit.movie_scene ? unit.movie_scene.movie : 'Movie Scene'}) ---*\n`;
        message += `${movieReflection.value.trim()}\n\n`;
    }

    message += `*Student Signature:* __________________`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

// ==========================================
// Progress Test & Exam Card Renderer
// ==========================================

function renderProgressExamCard(unitId) {
    if (unitId % 2 !== 0) return '';
    const examNum = unitId / 2;
    const examFile = `exam${examNum}.html`;
    const examTitles = {
        2: { title: "Progress Exam 1 (Units 1 & 2)", desc: "The Future of Tech & Global Business", color: "var(--accent-indigo)" },
        4: { title: "Progress Exam 2 (Units 3 & 4)", desc: "Sustainability, Climate Change & Media Literacy", color: "#10b981" },
        6: { title: "Progress Exam 3 (Units 5 & 6)", desc: "Modern Wellness & Contemporary Arts", color: "#8b5cf6" },
        8: { title: "Progress Exam 4 (Units 7 & 8)", desc: "Philosophy, Critical Thinking & Scientific Innovation", color: "#f59e0b" }
    };
    const info = examTitles[unitId] || { title: `Progress Exam ${examNum}`, desc: `Units ${unitId-1} & ${unitId}`, color: "var(--accent-gold)" };
    
    return `
        <!-- Progress Test / Exam Section -->
        <section class="section-block" style="border: 2px solid ${info.color}; background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(251, 191, 36, 0.05)); border-radius: 16px; padding: 30px; margin-top: 40px;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <span style="font-size: 2.2rem;">📋</span>
                <div>
                    <span class="section-label" style="background: rgba(251,191,36,0.2); color: #fbbf24; border: 1px solid #fbbf24; margin-bottom: 6px; display: inline-block;">Progress Test</span>
                    <h3 style="margin: 0; font-size: 1.5rem; color: var(--text-primary);">${info.title}</h3>
                </div>
            </div>
            <p style="font-size: 1.05rem; opacity: 0.9; margin-bottom: 20px; line-height: 1.6;">
                ${unitId === 4 ? `🌟 <strong>Milestone Reached:</strong> You have completed Units 3 & 4 (First Half of the Course)! Test your mastery with this official Progress Test covering Listening Comprehension, Extended Writing, and Grammar in Context.` : `Ready to evaluate your progress? Test your knowledge with the official Progress Exam covering Units ${unitId-1} & ${unitId}.`}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 25px;">
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; font-size: 0.9rem;">
                    🎧 <strong>Listening Comprehension</strong> (Audio + 10 Qs)
                </div>
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; font-size: 0.9rem;">
                    ✍️ <strong>Writing & Discussion</strong> (4 Tasks)
                </div>
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; font-size: 0.9rem;">
                    📝 <strong>Grammar in Context</strong> (10 Qs)
                </div>
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; font-size: 0.9rem;">
                    🎯 <strong>Pass Mark:</strong> 30 / 50 Marks
                </div>
            </div>
            <div style="text-align: center; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="${examFile}" class="btn" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 1.05rem; text-decoration: none; border: 2px solid #10b981; box-shadow: 0 4px 20px rgba(16,185,129,0.3); transition: all 0.3s ease;">
                    📝 Start ${info.title} →
                </a>
                ${unitId === 6 ? `
                <a href="progress_test_1_6.html" class="btn" style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 1.05rem; text-decoration: none; border: 2px solid #fbbf24; box-shadow: 0 4px 20px rgba(245,158,11,0.35); transition: all 0.3s ease;">
                    ⭐ Exam 1 (Units 1–6) →
                </a>
                ` : ''}
            </div>
        </section>
    `;
}

function renderProgressTestHTML(testId, currentUnitId) {
    if (typeof window.progressTestsData === 'undefined') return '';
    const test = window.progressTestsData.tests.find(t => t.id === testId);
    if (!test) return '';

    // Access Code Requirement Only (previous units completion requirement removed per user request)


    // Initialize answer tracking state if not done
    window.ptAnswers = window.ptAnswers || {
        fitb: {},
        listening: {},
        grammar: {},
        matching: {}
    };

    // Shuffling matching answers deterministically or cleanly so it isn't in original order
    const originalAnswers = test.matching.map((m, idx) => ({ text: m.answer, originalIdx: idx }));
    const shuffledAnswers = [...originalAnswers].sort((a, b) => a.text.localeCompare(b.text)); // Alphabetical sorting is consistent

    return `
        <!-- Progress Test Container -->
        <section class="section-block progress-test-section" id="progress-test-root">
            <div class="progress-test-header animate__animated animate__fadeIn">
                <span class="progress-test-badge">📋 PROGRESS TEST ${testId}</span>
                <h2>${test.title}</h2>
                <p style="font-size: 1.1rem; color: var(--accent-gold); margin-bottom: 20px;">Review topic: ${test.topic} (${test.level})</p>
                <div class="theory-box" style="border-left-color: var(--accent-gold); background: rgba(255, 255, 255, 0.02); padding: 20px; font-size: 0.95rem;">
                    💡 <strong>Test Guidelines:</strong> This test evaluates your retention of the <strong>model profiles</strong> and essential structures from Units ${test.unitsCovered.join(' to ')}. Read carefully, select your answers, and submit your score to your teacher at the end.
                </div>
            </div>

            <!-- a1. Fill in the Blanks -->
            <div class="pt-block">
                <span class="pt-section-label">a1. Vocabulary & Profiles (Fill in the Blanks)</span>
                <p style="margin-bottom: 20px; opacity: 0.85; font-size: 0.95rem;">Complete the model answers with the correct technical word:</p>
                <div style="display: grid; gap: 20px;">
                    ${test.fillInTheBlanks.map((fitb, idx) => `
                        <div class="pt-question-card" data-section="fitb" data-qidx="${idx}">
                            <p style="font-size: 1.05rem; margin-bottom: 12px; color: #fff;">
                                <strong>${idx + 1}.</strong> ${fitb.sentence.replace('_____', '<span class="blank-underline">______</span>')}
                            </p>
                            <div class="options-grid">
                                ${fitb.options.map((opt, oIdx) => `
                                    <button class="btn pt-option-btn" onclick="selectPTOption(this, 'fitb', ${idx}, ${oIdx})">${opt}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- b1. Listening Comprehension -->
            <div class="pt-block">
                <span class="pt-section-label" style="border-left-color: var(--accent-violet);">b1. Listening Comprehension (Audio Profile)</span>
                <p style="margin-bottom: 20px; opacity: 0.85; font-size: 0.95rem;">Listen to the complete developer profile, then answer the questions below:</p>
                <div style="display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.05);">
                    <button class="btn" style="background: var(--accent-gold); color: var(--accent-dark); border-color: var(--accent-gold);" onclick="playAudio(\`${test.listening.audioText.replace(/'/g, "\\'")}\`)">🔊 Play Profile Audio</button>
                    <span style="font-size: 0.9rem; opacity: 0.9;">Listen closely to check details about this programmer's daily work.</span>
                </div>
                <div style="display: grid; gap: 20px;">
                    ${test.listening.questions.map((q, idx) => `
                        <div class="pt-question-card" data-section="listening" data-qidx="${idx}">
                            <p style="font-size: 1.05rem; margin-bottom: 12px; color: #fff;"><strong>${idx + 1}.</strong> ${q.q}</p>
                            <div class="options-grid">
                                ${q.options.map((opt, oIdx) => `
                                    <button class="btn pt-option-btn" onclick="selectPTOption(this, 'listening', ${idx}, ${oIdx})">${opt}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- c1. Grammar in Context -->
            <div class="pt-block">
                <span class="pt-section-label" style="border-left-color: var(--accent-teal);">c1. Grammar in Context</span>
                <p style="margin-bottom: 20px; opacity: 0.85; font-size: 0.95rem;">Select the correct grammatical form to complete the sentences from our models:</p>
                <div style="display: grid; gap: 20px;">
                    ${test.grammar.map((g, idx) => `
                        <div class="pt-question-card" data-section="grammar" data-qidx="${idx}">
                            <p style="font-size: 1.05rem; margin-bottom: 12px; color: #fff;">
                                <strong>${idx + 1}.</strong> ${g.question.replace('_____', '<span class="blank-underline">______</span>')}
                            </p>
                            <div class="options-grid">
                                ${g.options.map((opt, oIdx) => `
                                    <button class="btn pt-option-btn" onclick="selectPTOption(this, 'grammar', ${idx}, ${oIdx})">${opt}</button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- d1. Reading & Matching -->
            <div class="pt-block">
                <span class="pt-section-label" style="border-left-color: var(--accent-indigo);">d1. Profile Matching (Questions & Models)</span>
                <p style="margin-bottom: 20px; opacity: 0.85; font-size: 0.95rem;">Match each personal interview question with its correct model answer:</p>
                <div style="display: grid; gap: 20px;">
                    ${test.matching.map((m, idx) => `
                        <div class="pt-question-card pt-matching-card animate__animated" data-section="matching" data-qidx="${idx}">
                            <p style="font-size: 1.05rem; margin-bottom: 12px; color: var(--accent-gold);"><strong>Q: "${m.question}"</strong></p>
                            <div style="margin-top: 10px;">
                                <label style="font-size: 0.8rem; opacity: 0.6; display: block; margin-bottom: 5px;">Choose corresponding Model Answer:</label>
                                <select class="matching-select" onchange="selectPTMatching(${idx}, this)" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; font-family: inherit; font-size: 0.9rem; cursor: pointer;">
                                    <option value="">-- Select answer --</option>
                                    ${shuffledAnswers.map(ans => `
                                        <option value="${ans.originalIdx}">${ans.text}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- e1. Speaking Practice (Shadowing) -->
            <div class="pt-block">
                <span class="pt-section-label" style="border-left-color: var(--accent-gold);">e1. Speaking Practice (Shadowing)</span>
                <p style="margin-bottom: 20px; opacity: 0.85; font-size: 0.95rem;">Listen to the natural American English pronunciation of these models, then practice saying them aloud:</p>
                <div style="display: grid; gap: 15px;">
                    ${test.speaking.map((s, idx) => `
                        <div class="theory-box" style="border-left-color: var(--accent-gold); display: flex; align-items: center; gap: 20px; background: rgba(255,255,255,0.02);">
                            <div style="font-size: 2.2rem;">🎙️</div>
                            <div style="flex-grow: 1;">
                                <p style="font-size: 0.8rem; opacity: 0.6; font-weight: 700; text-transform: uppercase; color: var(--accent-gold);">${s.prompt}</p>
                                <p style="font-size: 1.1rem; font-weight: 500; color: #fff; margin-top: 5px;">"${s.text}"</p>
                                <button class="btn" onclick="playAudio(\`${s.text.replace(/'/g, "\\'")}\`)" style="margin-top: 12px; font-size: 0.85rem; padding: 6px 15px; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2);">
                                    🔊 Listen to Example
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- f1. Score & Feedback -->
            <div class="pt-block" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 35px; text-align: center;">
                <span class="pt-section-label" style="border-left-color: var(--accent-gold);">f1. Grade & Feedback Report</span>
                <p style="margin-bottom: 25px; opacity: 0.9; font-size: 1rem;">Have you answered all the sections? Click below to calculate your score!</p>
                
                <button class="btn" id="submit-pt-btn" onclick="submitProgressTest(${testId})" style="background: var(--accent-gold); color: var(--accent-dark); border-color: var(--accent-gold); padding: 15px 40px; font-size: 1.1rem; font-weight: 700; width: 100%; max-width: 400px; justify-content: center; margin: 0 auto 20px auto; display: inline-flex;">
                    Calculate My Test Score 📝
                </button>

                <div id="pt-result-card" class="theory-box" style="display: none; border-left-color: var(--accent-gold); background: rgba(255,255,255,0.03); text-align: left; padding: 30px; margin-top: 30px; border-radius: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                        <div>
                            <h3 style="font-size: 1.8rem; margin: 0; color: #fff;">Your Test Report</h3>
                            <p style="font-size: 1rem; opacity: 0.8; margin-top: 5px;" id="pt-result-badge">Level: ---</p>
                        </div>
                        <div style="background: var(--accent-gold); color: var(--accent-dark); padding: 15px 25px; border-radius: 12px; text-align: center;">
                            <span style="font-size: 2.2rem; font-weight: 800; display: block;" id="pt-result-score">0 / 16</span>
                            <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700;" id="pt-result-percent">0%</span>
                        </div>
                    </div>
                    <p style="font-size: 1.1rem; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 20px; padding-top: 20px; color: #fff;" id="pt-result-feedback">
                        Feedback goes here...
                    </p>
                    <button class="btn btn-whatsapp" id="send-pt-wa-btn" onclick="sendPTToWhatsApp(${testId})" style="width: 100%; justify-content: center; margin-top: 25px;">
                        Send My Test Score to Teacher 📱
                    </button>
                </div>
            </div>
        </section>
    `;
}

// Global hooks for Progress Test selection and evaluation
window.selectPTOption = function(btn, section, qidx, oidx) {
    const parent = btn.parentElement;
    Array.from(parent.children).forEach(b => {
        b.style.setProperty('background-color', 'rgba(255, 255, 255, 0.05)', 'important');
        b.style.setProperty('color', '#fff', 'important');
        b.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
    });
    btn.style.setProperty('background-color', 'var(--accent-gold)', 'important');
    btn.style.setProperty('border-color', 'var(--accent-gold)', 'important');
    btn.style.setProperty('color', 'var(--accent-dark)', 'important');
    window.ptAnswers[section][qidx] = oidx;
};

window.selectPTMatching = function(qidx, selectEl) {
    const val = selectEl.value;
    if (val === "") {
        delete window.ptAnswers.matching[qidx];
        selectEl.style.borderColor = 'rgba(255,255,255,0.1)';
    } else {
        window.ptAnswers.matching[qidx] = parseInt(val);
        selectEl.style.borderColor = 'var(--accent-gold)';
    }
};

window.submitProgressTest = function(testId) {
    const test = window.progressTestsData.tests.find(t => t.id === testId);
    if (!test) return;

    // Check that everything has been answered to give high-quality feedback
    let totalQuestions = 16;
    let answered = 0;

    answered += Object.keys(window.ptAnswers.fitb).length;
    answered += Object.keys(window.ptAnswers.listening).length;
    answered += Object.keys(window.ptAnswers.grammar).length;
    answered += Object.keys(window.ptAnswers.matching).length;

    if (answered < totalQuestions) {
        if (!confirm("You have not answered all 16 questions. Do you want to submit anyway?")) {
            return;
        }
    }

    // Evaluate answers
    let fitbScore = 0;
    test.fillInTheBlanks.forEach((fitb, idx) => {
        if (window.ptAnswers.fitb[idx] === fitb.correct) fitbScore++;
    });

    let listeningScore = 0;
    test.listening.questions.forEach((q, idx) => {
        if (window.ptAnswers.listening[idx] === q.correct) listeningScore++;
    });

    let grammarScore = 0;
    test.grammar.forEach((g, idx) => {
        if (window.ptAnswers.grammar[idx] === g.correct) grammarScore++;
    });

    let matchingScore = 0;
    test.matching.forEach((m, idx) => {
        if (window.ptAnswers.matching[idx] === idx) matchingScore++;
    });

    const totalScore = fitbScore + listeningScore + grammarScore + matchingScore;
    const percent = Math.round((totalScore / totalQuestions) * 100);

    // Save final report data globally
    let grade = 'Needs Practice 🔄';
    let feedback = '';

    if (percent < 50) {
        grade = 'Needs Practice 🔄';
        feedback = `You scored ${percent}%. Keep studying! We suggest reviewing the Personal Profile model answers in Units ${test.unitsCovered.join(', ')}. Try reading and listening to the speaker profiles again to improve your vocabulary and sentence structures before retaking the test.`;
    } else if (percent < 85) {
        grade = 'Good Progress 👍';
        feedback = `Well done! You scored ${percent}%. You have a solid grasp of the developer profiles, setup descriptions, and collaborative vocabulary. A little more study on those minor errors will make you completely fluent in these topics!`;
    } else {
        grade = 'Excellent Mastery 🏆';
        feedback = `Congratulations! You scored ${percent}%. You have demonstrated outstanding mastery of all communication profiles, setup environments, routine terms, and collaboration models covered in Units ${test.unitsCovered.join(' to ')}. Excellent work!`;
    }

    const completedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    localStorage.setItem(`pt_completed_${testId}_date`, completedDate);
    localStorage.setItem(`pt_completed_${testId}_score`, totalScore);
    localStorage.setItem(`pt_completed_${testId}_percent`, percent);
    localStorage.setItem(`pt_completed_${testId}_grade`, grade);

    window.lastPTScore = {
        testId: testId,
        total: totalScore,
        fitb: fitbScore,
        listening: listeningScore,
        grammar: grammarScore,
        matching: matchingScore,
        percent: percent,
        grade: grade,
        completedDate: completedDate
    };

    // Update Result Card
    const resultCard = document.getElementById('pt-result-card');
    document.getElementById('pt-result-score').innerText = `${totalScore} / 16`;
    document.getElementById('pt-result-percent').innerText = `${percent}%`;
    document.getElementById('pt-result-badge').innerHTML = `<strong>Grade:</strong> ${grade}<br><span style="font-size: 0.85rem; opacity: 0.7;">Completed on: ${completedDate}</span>`;
    document.getElementById('pt-result-feedback').innerText = feedback;

    resultCard.style.display = 'block';
    
    try {
        const cards = document.querySelectorAll('.pt-question-card[data-section]');
        cards.forEach(card => {
            const section = card.dataset.section;
            const qidx = parseInt(card.dataset.qidx);
            if (section === 'matching') return; // Handled separately

            let correctIdx;
            if (section === 'listening') {
                correctIdx = test.listening.questions[qidx].correct;
            } else if (section === 'fitb') {
                correctIdx = test.fillInTheBlanks[qidx].correct;
            } else {
                correctIdx = test.grammar[qidx].correct;
            }

            const btns = card.querySelectorAll('.pt-option-btn');
            btns.forEach((btn, bIdx) => {
                btn.disabled = true; // disable to lock selection
                if (bIdx === correctIdx) {
                    btn.style.setProperty('background-color', '#dcfce7', 'important');
                    btn.style.setProperty('color', '#166534', 'important');
                    btn.style.setProperty('border-color', '#166534', 'important');
                    if (!btn.innerHTML.includes("✅")) {
                        btn.innerHTML += " ✅";
                    }
                } else if (window.ptAnswers[section] && window.ptAnswers[section][qidx] === bIdx) {
                    btn.style.setProperty('background-color', '#fee2e2', 'important');
                    btn.style.setProperty('color', '#991b1b', 'important');
                    btn.style.setProperty('border-color', '#991b1b', 'important');
                    if (!btn.innerHTML.includes("❌")) {
                        btn.innerHTML += " ❌";
                    }
                } else {
                    btn.style.setProperty('background-color', 'rgba(255, 255, 255, 0.05)', 'important');
                    btn.style.setProperty('color', '#fff', 'important');
                    btn.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
                }
            });
        });

        // Grade matching selects
        const matchingCards = document.querySelectorAll('.pt-matching-card');
        matchingCards.forEach((card, idx) => {
            const select = card.querySelector('select.matching-select');
            select.disabled = true;
            const userVal = window.ptAnswers.matching ? window.ptAnswers.matching[idx] : undefined;
            if (userVal === idx) {
                select.style.setProperty('background-color', '#dcfce7', 'important');
                select.style.setProperty('color', '#166534', 'important');
                select.style.setProperty('border-color', '#166534', 'important');
                card.classList.add('animate__pulse');
            } else {
                select.style.setProperty('background-color', '#fee2e2', 'important');
                select.style.setProperty('color', '#991b1b', 'important');
                select.style.setProperty('border-color', '#991b1b', 'important');
                card.classList.add('animate__shakeX');
            }
        });
    } catch(err) {
        alert("Error en el pintado: " + err.message);
    }

    // Scroll smoothly to results
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Confetti effect on submit button
    const submitBtn = document.getElementById('submit-pt-btn');
    submitBtn.classList.add('animate__pulse');
    submitBtn.disabled = true;
    submitBtn.innerText = "Test Evaluated ✅";
};

window.sendPTToWhatsApp = function(testId) {
    let scoreObj = window.lastPTScore;
    if (!scoreObj || scoreObj.testId !== testId) {
        // Fallback to localStorage
        const date = localStorage.getItem(`pt_completed_${testId}_date`);
        if (date) {
            scoreObj = {
                testId: testId,
                total: localStorage.getItem(`pt_completed_${testId}_score`),
                percent: localStorage.getItem(`pt_completed_${testId}_percent`),
                grade: localStorage.getItem(`pt_completed_${testId}_grade`),
                completedDate: date,
                fitb: 'Completed',
                listening: 'Completed',
                grammar: 'Completed',
                matching: 'Completed'
            };
        }
    }
    if (!scoreObj || scoreObj.testId !== testId) {
        alert("Please calculate your score first!");
        return;
    }
    const test = window.progressTestsData.tests.find(t => t.id === testId);
    const dateStr = scoreObj.completedDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    // Construct Detailed Answers
    let detailedAnswers = `\n*DETAILED STUDENT ANSWERS:*\n`;
    if (window.ptAnswers && Object.keys(window.ptAnswers.fitb).length > 0) {
        detailedAnswers += `\n*a1. Vocabulary & Profiles:*\n`;
        test.fillInTheBlanks.forEach((q, idx) => {
            let cIdx = window.ptAnswers.fitb[idx];
            let ans = cIdx !== undefined ? q.options[cIdx] : "(Not answered)";
            let mark = cIdx === q.correct ? "✅" : "❌";
            detailedAnswers += `${idx+1}. ${ans} ${mark}\n`;
        });
        detailedAnswers += `\n*b1. Listening Comprehension:*\n`;
        test.listening.questions.forEach((q, idx) => {
            let cIdx = window.ptAnswers.listening[idx];
            let ans = cIdx !== undefined ? q.options[cIdx] : "(Not answered)";
            let mark = cIdx === q.correct ? "✅" : "❌";
            detailedAnswers += `${idx+1}. ${ans} ${mark}\n`;
        });
        detailedAnswers += `\n*c1. Grammar in Context:*\n`;
        test.grammar.forEach((q, idx) => {
            let cIdx = window.ptAnswers.grammar[idx];
            let ans = cIdx !== undefined ? q.options[cIdx] : "(Not answered)";
            let mark = cIdx === q.correct ? "✅" : "❌";
            detailedAnswers += `${idx+1}. ${ans} ${mark}\n`;
        });
        detailedAnswers += `\n*d1. Profile Matching:*\n`;
        test.matching.forEach((q, idx) => {
            let cIdx = window.ptAnswers.matching[idx];
            let ans = cIdx !== undefined ? window.progressTestsData.tests.find(t=>t.id===testId).matching[cIdx].answer : "(Not answered)";
            let mark = cIdx === idx ? "✅" : "❌";
            detailedAnswers += `${idx+1}. ${ans} ${mark}\n`;
        });
    } else {
        detailedAnswers += `(Detailed answers not available. Please submit from the active browser session.)\n`;
    }

    const message = `*Programming English - Progress Test ${testId} Report*\n\n` +
        `*Test:* ${test.title}\n` +
        `*Completion Date:* ${dateStr}\n` +
        `*Final Score:* ${scoreObj.total} / 16 (${scoreObj.percent}%)\n` +
        `*Grade:* ${scoreObj.grade}\n\n` +
        `*Section Summary:*\n` +
        `- Vocabulary & Profiles (a1): ${scoreObj.fitb}\n` +
        `- Listening Comprehension (b1): ${scoreObj.listening}\n` +
        `- Grammar in Context (c1): ${scoreObj.grammar}\n` +
        `- Profile Matching (d1): ${scoreObj.matching}\n` +
        detailedAnswers + `\n` +
        `*Student Signature:* __________________\n\n` +
        `Optimized for professional American English pronunciation. 🇺🇸`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
};

// Unit page status helpers
window.initUnitPageStatus = function(unitId) {
    const panel = document.getElementById('unit-status-panel');
    if (!panel) return;
    
    const completedDate = localStorage.getItem('completed_unit_' + unitId);
    
    if (completedDate) {
        panel.classList.add('completed');
        panel.innerHTML = `
            <div class="status-label">
                <span class="status-dot"></span>
                <div>
                    <strong style="color: var(--accent-success); display: block; font-family: var(--font-heading);">Unit Completed ✅</strong>
                    <span style="font-size: 0.85rem; opacity: 0.8;">Completed on: ${completedDate}</span>
                </div>
            </div>
            <button class="btn" style="padding: 6px 15px; font-size: 0.8rem; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05);" onclick="toggleUnitPageStatus(${unitId})">Mark as Pending 🔄</button>
        `;
    } else {
        panel.classList.remove('completed');
        panel.innerHTML = `
            <div class="status-label">
                <span class="status-dot"></span>
                <div>
                    <strong style="color: #fff; display: block; font-family: var(--font-heading);">Unit Pending 📋</strong>
                    <span style="font-size: 0.85rem; opacity: 0.6;">You haven't marked this unit as completed yet.</span>
                </div>
            </div>
            <button class="btn" style="padding: 6px 15px; font-size: 0.8rem; background: var(--accent-gold); border-color: var(--accent-gold); color: var(--accent-dark);" onclick="toggleUnitPageStatus(${unitId})">Mark as Completed ✅</button>
        `;
    }
};

window.toggleUnitPageStatus = function(unitId) {
    const completedDate = localStorage.getItem('completed_unit_' + unitId);
    if (completedDate) {
        localStorage.removeItem('completed_unit_' + unitId);
    } else {
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        localStorage.setItem('completed_unit_' + unitId, dateStr);
    }
    initUnitPageStatus(unitId);
};

window.unlockProgressTest = function(testId) {
    const test = window.progressTestsData.tests.find(t => t.id === testId);
    if (!test) return;

    const inputEl = document.getElementById('pt-access-code-input');
    const errorEl = document.getElementById('pt-access-error');
    
    if (inputEl.value.trim() === test.accessCode) {
        sessionStorage.setItem('pt_unlocked_' + testId, 'true');
        // Re-render unit page. Test 1 is unit 4, Test 2 is unit 8
        const unitId = testId === 1 ? 4 : 8;
        renderUnitPage(unitId);
    } else {
        errorEl.style.display = 'block';
        inputEl.style.borderColor = '#ef4444';
        inputEl.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => inputEl.classList.remove('animate__animated', 'animate__shakeX'), 500);
    }
};
