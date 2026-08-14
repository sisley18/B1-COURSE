document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized: Full Module with Pronunciation');
    sanitizeStoredTeacherLinks(); // Fix any broken URLs saved previously
    initAudioEngine();
    renderCurriculum();
    setupNavigation();
    setupProtection();
    initAttendance();
});

// Fix any broken teacher link URLs already stored in localStorage
// (e.g. links saved as "tps://..." or "ttps://..." before the validation fix)
function sanitizeStoredTeacherLinks() {
    try {
        const all = JSON.parse(localStorage.getItem('teacher_links') || '{}');
        let changed = false;
        Object.keys(all).forEach(unitId => {
            all[unitId] = all[unitId].filter(link => {
                // Strip any broken protocol prefix and rebuild with https://
                let url = link.url.replace(/^[a-z]*:\/\//i, '');
                url = 'https://' + url;
                try {
                    const parsed = new URL(url);
                    if (!parsed.hostname.includes('.')) {
                        changed = true;
                        return false; // Remove invalid link
                    }
                    link.url = url;
                    changed = true;
                    return true;
                } catch (e) {
                    changed = true;
                    return false; // Remove unparseable link
                }
            });
        });
        if (changed) {
            localStorage.setItem('teacher_links', JSON.stringify(all));
            console.log('Teacher links sanitized.');
        }
    } catch (e) {
        console.warn('Could not sanitize teacher links:', e);
    }
}


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

// ============================================================
// Level Selector Hub — switchLevel / renderA1 / renderC1
// ============================================================
let currentLevel = 'B1';

window.switchLevel = function (level) {
    currentLevel = level;

    // Update tab active states
    ['A1', 'B1', 'C1'].forEach(l => {
        const tab = document.getElementById('tab-' + l.toLowerCase());
        if (tab) {
            tab.classList.toggle('active', l === level);
            tab.setAttribute('aria-selected', l === level ? 'true' : 'false');
        }
    });

    // Stop any playing audio when switching levels
    window.stopAudio();

    // Render the appropriate content
    if (level === 'B1') renderCurriculum();
    else if (level === 'A1') renderA1();
    else if (level === 'C1') renderC1();
};

function renderA1() {
    const container = document.getElementById('curriculum-container');
    if (!container) return;
    container.innerHTML = '';

    const sections = [
        { icon: '📚', title: '1. Vocabulary', topics: 'Basic nouns, verbs, adjectives & opposites. Everyday objects, numbers, colors, days, months. Common expressions and greetings.', sample: 'Hello, apple, happy, Monday' },
        { icon: '🎧', title: '2. Listening', topics: 'Short, simple dialogues. Understanding personal information: name, age, country. Listening to instructions and requests.', sample: 'What is your name? Where are you from?' },
        { icon: '📖', title: '3. Reading', topics: 'Very short texts: signs, forms, notices. Simple descriptions of people, places and daily routines. Postcards and short emails.', sample: 'My name is Ana. I am from Argentina.' },
        { icon: '✏️', title: '4. Grammar', topics: 'Present Simple (be/have). Plurals. Articles (a, an, the). Subject pronouns and possessives. Yes/No questions. There is / There are.', sample: 'She is a teacher. There are three books.' },
        { icon: '🔤', title: '5. Pronunciation', topics: 'The English alphabet. Individual sounds: vowels and consonants. Word stress in 2-syllable words. Basic intonation in questions vs. statements.', sample: 'apple, banana, student' },
        { icon: '🔗', title: '6. Collocations', topics: 'Simple verb + noun collocations. Make vs. Do. Have + noun. Common fixed expressions.', sample: 'make a coffee, do homework' },
        { icon: '🖊️', title: '7. Writing', topics: 'Fill in personal information forms. Write a short profile (50 words). Write a simple postcard or message.', sample: 'My name is... I live in...' },
        { icon: '🎙️', title: '8. Speaking', topics: 'Introduce yourself and others. Describe your family and home. Talk about daily routines. Ask for and give directions.', sample: 'Hi! My name is Carlos. I am 25 years old.' }
    ];

    const html = `
        <div class="a1-intro-banner">
            <h2>📗 Level A1 — Beginner</h2>
            <p>Master the essential building blocks of English. This level covers fundamental vocabulary, everyday grammar, and basic communication skills so you can introduce yourself and interact in simple situations.</p>
        </div>

        <div class="a1-syllabus-grid">
            ${sections.map(s => `
                <div class="a1-section-card">
                    <span class="c1-section-icon">${s.icon}</span>
                    <h4>${s.title}</h4>
                    <p>${s.topics}</p>
                    ${s.sample ? `
                    <div style="margin-top: 12px; display: flex; align-items: center; gap: 10px; background: rgba(52,211,153,0.08); padding: 10px 14px; border-radius: 10px;">
                        <button class="play-btn" style="width: 34px; height: 34px; font-size: 0.85rem; flex-shrink:0;" onclick="playAudio('${s.sample.replace(/'/g, "\\'")}')">🔊</button>
                        <span style="font-size: 0.82rem; opacity: 0.75; font-style: italic;">"${s.sample}"</span>
                    </div>` : ''}
                </div>
            `).join('')}
        </div>

        <div style="text-align: center; padding: 20px; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.25); border-radius: 16px; margin-top: 10px;">
            <p style="opacity: 0.7; font-size: 0.9rem;">🚀 A1 course materials coming soon. Switch to <strong>B1</strong> to access full interactive units.</p>
        </div>
    `;
    container.innerHTML = html;
}

// C1 text registry — avoids embedding long text inside onclick HTML attributes
// (double-quotes and other special chars break onclick="..." delimiters)
const _c1Texts = {};
const _c1SectionSamples = {};

window.playC1Text = function (key) {
    const text = _c1Texts[key];
    if (text) window.playAudio(text);
};

function renderC1() {
    const container = document.getElementById('curriculum-container');
    if (!container) return;
    container.innerHTML = '';

    // Store section sample texts in registry (index-based keys)
    const sections = [
        { icon: '\uD83D\uDCDA', title: '1. Vocabulary',   topics: 'Academic and professional register. Low-frequency advanced lexis: geopolitical, philosophical, and scientific terminology. Nuance between near-synonyms (e.g. assert vs. contend). Figurative and idiomatic language at C-level.',                                                                                          sample: 'paradigm, sovereignty, epistemology' },
        { icon: '\uD83C\uDFA7', title: '2. Listening',    topics: 'Authentic lectures, debates, and academic podcasts. Inferring speaker stance, bias, and subtext. Note-taking strategies. Understanding accented and rapid native speech.',                                                                                                                                              sample: 'The cognitive dissonance created by social media algorithms is unprecedented.' },
        { icon: '\uD83D\uDCD6', title: '3. Reading',      topics: 'Complex academic and journalistic texts. Critical analysis of argument structure and rhetorical devices. Identifying implicit meaning, hedging language, and authorial stance.',                                                                                                                                       sample: 'Global governance frameworks are increasingly inadequate.' },
        { icon: '\u270F\uFE0F', title: '4. Grammar',      topics: 'Advanced inversion and cleft structures. Subjunctive and conditional nuance. Ellipsis and substitution. Passive and reporting verbs for academic style. Complex nominal groups.',                                                                                                                                        sample: 'Not only has technology transformed communication, but it has also reshaped cognition.' },
        { icon: '\uD83D\uDD24', title: '5. Pronunciation',topics: 'Weak forms and connected speech at natural speed. Nuclear stress and information structure. Discourse-level intonation. American English rhythm, linking, and elision patterns.',                                                                                                                                          sample: 'The implications of this research are far-reaching.' },
        { icon: '\uD83D\uDD17', title: '6. Collocations \u0026 Register', topics: 'Academic collocations: conduct research, draw conclusions, cast doubt. Formal vs. neutral vs. informal register switches. Fixed expressions in academic discourse and debate.',                                                                                                                         sample: 'draw a distinction, take into account, give rise to' },
        { icon: '\uD83D\uDD8A\uFE0F', title: '7. Writing',topics: 'Extended academic essays (argument, discussion, evaluation). Abstracts and executive summaries. Formal reports and proposals. Coherence, cohesion, hedging, and academic integrity.',                                                                                                                                     sample: 'Critically evaluate the role of biotechnology in addressing food insecurity.' },
        { icon: '\uD83C\uDF99\uFE0F', title: '8. Speaking',topics: 'Academic presentations and seminars. Structured debate and argumentation. Diplomatic disagreement and turn-taking. Impromptu discussions on complex global topics.',                                                                                                                                             sample: 'While I take your point, I would argue that the evidence suggests otherwise.' }
    ];

    // Register section samples
    sections.forEach((s, i) => {
        if (s.sample) _c1Texts['sec-' + i] = s.sample;
    });

    const units = [
        {
            id: 'C1-1',
            title: 'Cognitive Science \u0026 The Mind',
            topic: 'Consciousness, Memory, and Human Perception',
            vocab: [
                { word: 'Paradigm',           ipa: '\u02C8p\u00E6r\u0259\u02CCda\u026Am', def: 'A typical example or pattern; a model of thinking within a discipline.' },
                { word: 'Cognitive dissonance', ipa: '\u02C8k\u0252\u0261n\u026At\u026Av \u02C8d\u026As\u0259n\u0259ns', def: 'The discomfort felt when holding two contradictory beliefs simultaneously.' },
                { word: 'Epistemology',       ipa: '\u026A\u02CCp\u026Est\u026A\u02C8m\u0252l\u0259d\u0292i', def: 'The branch of philosophy concerned with the nature and scope of knowledge.' },
                { word: 'Neuroplasticity',    ipa: '\u02CCnj\u028A\u0259r\u0259\u028Apl\u00E6\u02C8st\u026As\u026Ati', def: 'The ability of the brain to reorganize itself by forming new neural connections throughout life.' },
                { word: 'Heuristic',          ipa: 'hj\u028A\u02C8r\u026Ast\u026Ak', def: 'A practical mental shortcut enabling quick, efficient judgment and problem-solving.' },
                { word: 'Introspection',      ipa: '\u02CCIntr\u0259\u02C8sp\u025Bk\u0283\u0259n', def: 'The examination of one\'s own mental and emotional processes.' }
            ],
            listening: 'Modern neuroscience has fundamentally challenged our understanding of consciousness. For centuries, philosophers debated whether the mind was separate from the body, the Cartesian dualism that Descartes articulated in the seventeenth century. However, contemporary research in cognitive neuroscience suggests that consciousness is an emergent property of complex neural networks, not a transcendent soul. The implications are profound: if our sense of self is merely a neurological construct, what does that mean for concepts of free will, moral responsibility, and personal identity? These questions sit at the intersection of science, philosophy, and ethics, making them essential territory for the twenty-first century thinker.',
            reading: 'The field of neuroplasticity has revolutionized how we conceive of human potential. Once believed to be fixed in early childhood, the brain is now understood to be remarkably malleable throughout the lifespan. Pioneering research by Michael Merzenich and others demonstrated that sustained cognitive training could physically alter cortical maps, a discovery with transformative implications for education, rehabilitation, and personal development. This plasticity is not unlimited, however. The degree to which the brain can reorganize itself diminishes with age, and the quality of the input matters enormously. Passive exposure rarely suffices; active, effortful engagement with challenging material appears to be the key driver of genuine structural change. Critics caution against overstating these findings, as the popular narrative of rewiring your brain often outpaces the nuance of the actual science.',
        },
        {
            id: 'C1-2',
            title: 'Geopolitics \u0026 Global Order',
            topic: 'Power, Sovereignty, and International Governance',
            vocab: [
                { word: 'Sovereignty',        ipa: '\u02C8s\u0252vr\u0259nti', def: 'Supreme authority of a state to govern itself without external interference.' },
                { word: 'Hegemony',           ipa: 'h\u026A\u02C8\u0261\u025Bm\u0259ni', def: 'Leadership or dominance, especially of one state or group over others.' },
                { word: 'Multilateralism',    ipa: '\u02CCm\u028Clti\u02C8l\u00E6t\u0259r\u0259l\u026Az\u0259m', def: 'International cooperation among multiple countries to address shared problems.' },
                { word: 'Deterrence',         ipa: 'd\u026A\u02C8t\u025Br\u0259ns', def: 'The use of threats to dissuade an adversary from taking an undesired action.' },
                { word: 'Geopolitical',       ipa: '\u02CCd\u0292i\u02D0\u0259\u028Ap\u0259\u02C8l\u026At\u026Ak\u0259l', def: 'Relating to politics, especially international relations, as influenced by geographic factors.' },
                { word: 'Non-state actor',    ipa: 'n\u0252n ste\u026At \u02C8\u00E6kt\u0259r', def: 'An individual or organization with political influence not allied with any government.' }
            ],
            listening: 'The post-Cold War assumption of a unipolar world led by the United States is rapidly giving way to a more contested multipolar order. Rising powers, most notably China, but also India, Brazil, and a reassertive Russia, are challenging the liberal international institutions built in the aftermath of World War Two. The United Nations, the World Trade Organization, and the International Monetary Fund were designed in a context that no longer exists. As these powers accumulate economic and military weight, they are also projecting alternative governance models, ones that prioritize state sovereignty and non-interference over human rights and democratic accountability. The question is not whether the international order will change, but whether that change can be managed peacefully.',
            reading: 'The concept of sovereignty, once regarded as the bedrock of international order, is under unprecedented pressure from multiple directions simultaneously. From above, supranational bodies like the European Union and the International Criminal Court claim authority that transcends national boundaries. From below, secessionist movements and stateless peoples assert identities that defy the cartographic logic of the Westphalian state system. Meanwhile, non-state actors from multinational corporations to global terrorist networks operate across borders with an agility that renders traditional sovereignty increasingly difficult to enforce. Scholars are divided on what this means: cosmopolitans celebrate the erosion of state power as an opportunity to ground governance in universal human rights, while realists warn that weakening states creates power vacuums that invite instability and conflict.',
        }
    ];

    // Register all unit texts in the lookup map
    units.forEach(u => {
        _c1Texts[u.id + '-listening'] = u.listening;
        _c1Texts[u.id + '-reading']   = u.reading;
        u.vocab.forEach((v, vi) => {
            _c1Texts[u.id + '-vocab-' + vi] = v.word;
        });
    });

    // Build vocab buttons using registry keys (no text in onclick)
    const vocabButtons = (u) => u.vocab.map((v, vi) => `
        <div class="vocab-card" style="border-left-color: #a78bfa;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <button class="play-btn" style="width: 32px; height: 32px; font-size: 0.9rem; flex-shrink: 0;"
                    onclick="playC1Text('${u.id}-vocab-${vi}')">\uD83D\uDD0A</button>
                <strong style="font-size: 1.1rem;">${v.word}</strong>
            </div>
            ${v.ipa ? `<p style="font-family: monospace; color: #a78bfa; font-size: 0.95rem; margin-bottom: 8px;">/${v.ipa}/</p>` : ''}
            <p style="opacity: 0.8;">${v.def}</p>
        </div>
    `).join('');

    let unitsHtml = units.map(u => `
        <details class="unit-block">
            <summary class="unit-header">
                <div>
                    <span class="unit-subtitle">Unit ${u.id}</span>
                    <span class="unit-title">${u.title}</span>
                </div>
            </summary>
            <div class="unit-body">
                <p style="opacity: 0.7; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">Topic: ${u.topic}</p>

                <!-- Vocabulary -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(167,139,250,0.2); color: #a78bfa;">Vocabulary</span>
                    <h3>Advanced Key Terms</h3>
                    <p style="margin-bottom: 15px; opacity: 0.7;">\uD83D\uDD0A Click the speaker to hear each word with American pronunciation:</p>
                    <div class="vocab-grid">
                        ${vocabButtons(u)}
                    </div>
                </div>

                <!-- Listening -->
                <div class="section-block">
                    <span class="section-label listening" style="background: rgba(167,139,250,0.2); color: #a78bfa;">Listening</span>
                    <h3>Academic Audio Track</h3>
                    <div class="player-controls">
                        <button class="play-btn" onclick="playC1Text('${u.id}-listening')">&#9654;</button>
                        <span style="font-size: 0.9rem; opacity: 0.8;">Full Audio Track &#8212; C1 Level</span>
                    </div>
                    <button class="btn" style="border: 1px solid rgba(255,255,255,0.2); font-size: 0.8rem; padding: 5px 15px;" onclick="toggleTranscript(this)">Show Transcript</button>
                    <div class="transcript-box" style="display:none; margin-top:10px;">
                        ${u.listening}
                    </div>
                </div>

                <!-- Reading -->
                <div class="section-block">
                    <span class="section-label reading" style="background: rgba(167,139,250,0.2); color: #a78bfa;">Reading</span>
                    <h3>Critical Analysis Text</h3>
                    <div class="reading-text" style="border-left-color: #a78bfa;">${u.reading}</div>
                    <div style="display:flex; align-items:center; gap:12px; margin-top:12px;">
                        <button class="play-btn" style="width: 40px; height: 40px; font-size: 1rem;"
                            onclick="playC1Text('${u.id}-reading')">\uD83D\uDD0A</button>
                        <span style="opacity: 0.7; font-size: 0.85rem;">Listen to the full reading passage</span>
                    </div>
                </div>

                <!-- Writing -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255,100,100,0.2); color: #ffadad;">Writing Task</span>
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px;">
                        <p style="font-style: italic; margin-bottom: 15px;">Target: 350 words &#8212; Academic argument essay</p>
                        <h4 style="margin-bottom: 10px;">
                            ${u.id === 'C1-1'
                                ? 'To what extent do advances in neuroscience challenge traditional notions of human free will? Discuss with reference to current research.'
                                : 'Critically evaluate whether multilateral institutions are still capable of maintaining global peace and stability in a multipolar world.'}
                        </h4>
                        <textarea style="width: 100%; height: 180px; background: rgba(255,255,255,0.05); border: 1px solid rgba(167,139,250,0.3); color: #fff; padding: 12px; border-radius: 8px; font-family: inherit;" placeholder="Write your academic essay here..."></textarea>
                    </div>
                </div>

                <!-- Speaking -->
                <div class="section-block">
                    <span class="section-label" style="background: rgba(255,200,50,0.2); color: #ffe066;">Speaking</span>
                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px;">
                        <span style="font-size: 2rem;">\uD83C\uDF99\uFE0F</span>
                        <div>
                            <h4>Seminar Discussion</h4>
                            <p>${u.id === 'C1-1'
                                ? 'If consciousness is entirely a product of brain chemistry, what are the ethical implications for criminal justice and moral responsibility? Discuss and defend your position.'
                                : 'The era of Western-led multilateralism is over. Emerging powers will reshape international institutions in their own image. Agree or disagree?'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </details>
    `).join('');

    const sectionsHtml = sections.map((s, i) => `
        <div class="c1-section-card">
            <span class="c1-section-icon">${s.icon}</span>
            <h4>${s.title}</h4>
            <p>${s.topics}</p>
            ${s.sample ? `
            <div style="margin-top: 12px; display: flex; align-items: center; gap: 10px; background: rgba(167,139,250,0.08); padding: 10px 14px; border-radius: 10px;">
                <button class="play-btn" style="width: 34px; height: 34px; font-size: 0.85rem; flex-shrink:0;"
                    onclick="playC1Text('sec-${i}')">\uD83D\uDD0A</button>
                <span style="font-size: 0.82rem; opacity: 0.75; font-style: italic;">&ldquo;${s.sample}&rdquo;</span>
            </div>` : ''}
        </div>
    `).join('');

    const html = `
        <div class="c1-intro-banner">
            <h2>\uD83C\uDF93 Level C1 &#8212; Advanced Academic</h2>
            <p>Develop the sophisticated linguistic and critical thinking skills required for academic, professional, and intellectual discourse. Engage with complex ideas across geopolitics, cognitive science, philosophy, and beyond.</p>
        </div>
        <div class="c1-syllabus-grid">${sectionsHtml}</div>
        <h3 style="color: #a78bfa; margin: 35px 0 20px; font-size: 1.3rem; letter-spacing: 1px;">\uD83D\uDCCB C1 Interactive Units</h3>
        ${unitsHtml}
    `;

    container.innerHTML = html;
    setupNavigation();
}


const whatsappIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;


function renderCurriculum() {
    const container = document.getElementById('curriculum-container');
    if (!container) return;
    container.innerHTML = '';

    courseData.units.forEach(unit => {
        const unitBlock = document.createElement('details');
        unitBlock.className = 'unit-block';

        // Image mapping for each unit
        // Free-use photos from Unsplash (Unsplash License — free for commercial & personal use, no attribution required)
        const unitImages = {
            1: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', // AI / Robotics
            2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', // Global Business / Teamwork
            3: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', // Planet Earth / Nature
            4: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80', // Media & Society / Social Media
            5: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', // Health & Wellness / Fitness
            6: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', // Art & Culture / Painting
            7: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', // Urban Life / City
            8: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'  // Education / University
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

                <!-- Teacher Links -->
                <div class="section-block teacher-links-block" id="teacher-links-unit-${unit.id}">
                    <span class="section-label" style="background: rgba(99, 102, 241, 0.2); color: #818cf8;">📎 Teacher Links</span>
                    <div class="teacher-links-container">
                        <div class="teacher-links-list" id="teacher-links-list-${unit.id}">
                            <!-- Links loaded dynamically -->
                        </div>
                        <details class="teacher-link-form-toggle">
                            <summary class="btn teacher-add-link-btn" style="background: rgba(99, 102, 241, 0.15); border: 1px dashed rgba(129, 140, 248, 0.4); color: #818cf8; padding: 10px 20px; font-size: 0.9rem; cursor: pointer; border-radius: 10px; list-style: none; text-align: center; transition: all 0.3s ease;">
                                ➕ Add Link
                            </summary>
                            <div class="teacher-link-form" style="margin-top: 12px; display: grid; gap: 10px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                                <input type="text" id="teacher-link-title-${unit.id}" placeholder="Link title (e.g. Grammar worksheet)" style="padding: 10px 14px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 8px; font-family: inherit; font-size: 0.9rem;">
                                <input type="url" id="teacher-link-url-${unit.id}" placeholder="https://..." style="padding: 10px 14px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 8px; font-family: inherit; font-size: 0.9rem;">
                                <button class="btn" onclick="addTeacherLink(${unit.id})" style="background: linear-gradient(135deg, #6366f1, #818cf8); border: none; color: #fff; padding: 10px 20px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                                    Save Link 💾
                                </button>
                            </div>
                        </details>
                    </div>
                </div>

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

    // Load saved teacher links for all units
    loadAllTeacherLinks();
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

// ============================================================
// Universal Audio Engine — Mobile/Tablet/Desktop
// Pronunciación americana natural y profesional en todos los dispositivos
// ============================================================
let audioQueue = [];
let isPlaying = false;
let isPaused = false;
let voices = [];
let _currentUtterance = null;

// Detect mobile/tablet environments where gesture-gating applies
const _isMobile = /iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent);

function initAudioEngine() {
    if (!('speechSynthesis' in window)) {
        console.warn('Web Speech API not supported on this browser.');
        return;
    }

    // Attempt immediate load (works synchronously on Firefox & Safari)
    _loadVoices();

    // Chrome/Edge: voices load asynchronously — hook the event
    window.speechSynthesis.onvoiceschanged = () => {
        _loadVoices();
        console.log('Voices updated:', voices.length);
    };

    // Retry fallback for browsers that never fire onvoiceschanged (some Android WebViews)
    if (voices.length === 0) {
        let attempts = 0;
        const retryInterval = setInterval(() => {
            _loadVoices();
            attempts++;
            if (voices.length > 0 || attempts >= 20) {
                clearInterval(retryInterval);
                console.log('Voices ready after retry — count:', voices.length);
            }
        }, 250);
    }

    console.log('Audio Engine Ready — Device:', _isMobile ? 'Mobile/Tablet' : 'Desktop');
}

function _loadVoices() {
    const raw = window.speechSynthesis.getVoices();
    if (raw.length > 0) voices = raw;
}

function _normalizedLang(voice) {
    // Normalize both en-US and en_US and en_us etc. → 'en-us'
    return voice.lang.toLowerCase().replace(/_/g, '-');
}

function getBestVoice(genderPreference) {
    // Always refresh voice list on call — lazy load for iOS
    if (voices.length === 0) _loadVoices();

    // Match en-US voices tolerantly (handles en_US, en-US, en_us)
    const usVoices = voices.filter(v => {
        const lang = _normalizedLang(v);
        return lang === 'en-us' || lang.startsWith('en-us');
    });

    // Broader English fallback if no US voices found
    const pool = usVoices.length > 0
        ? usVoices
        : voices.filter(v => _normalizedLang(v).startsWith('en'));

    if (pool.length === 0) return null;

    // Filter by gender preference (keyword heuristics — browsers don't expose gender)
    let filtered = pool;
    if (genderPreference) {
        const gp = genderPreference.toLowerCase();
        if (gp === 'female') {
            const f = pool.filter(v => /samantha|zira|victoria|aria|jenny|michelle|monica|karen|siri|ava|allison|susan|alice/i.test(v.name));
            if (f.length > 0) filtered = f;
        } else if (gp === 'male') {
            const m = pool.filter(v => /alex|david|mark|guy|ryan|andrew|fred|tom|daniel|bruce/i.test(v.name));
            if (m.length > 0) filtered = m;
        }
    }

    // Premium voice priority list — neural/enhanced voices first
    const priority = [
        'Google US English',
        'Google US',
        'Microsoft Aria Online',
        'Microsoft Jenny Online',
        'Microsoft Aria',
        'Microsoft Jenny',
        'Microsoft Guy',
        'Microsoft David',
        'Microsoft Zira',
        'Samantha',
        'Enhanced',
        'Premium',
        'Natural',
        'Google',
        'Microsoft'
    ];

    for (const keyword of priority) {
        const match = filtered.find(v => v.name.includes(keyword));
        if (match) return match;
    }

    return filtered[0] || pool[0];
}

// ---- Public API ----

window.playAudio = function (text, genderPreference) {
    if (!text || !('speechSynthesis' in window)) return;

    window.stopAudio();

    // On mobile/tablet, play the entire text as ONE utterance.
    // Chunking breaks iOS gesture validation — subsequent chunks are blocked by Safari.
    // On desktop, chunk for Chrome's 15-second cut-off on long paragraphs.
    if (_isMobile || text.length <= 300) {
        _speak(text, genderPreference);
    } else {
        const chunks = _splitText(text, 250);
        audioQueue = chunks.map(c => ({ text: c, gender: genderPreference }));
        isPaused = false;
        _processQueue();
    }
};

window.stopAudio = function () {
    audioQueue = [];
    isPlaying = false;
    isPaused = false;
    _currentUtterance = null;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    _updatePauseBtn(false);
};

window.pauseAudio = function () {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking && !isPaused) {
        isPaused = true;
        window.speechSynthesis.pause();
        _updatePauseBtn(true);
    }
};

window.resumeAudio = function () {
    if (!('speechSynthesis' in window) || !isPaused) return;
    isPaused = false;
    _updatePauseBtn(false);
    // iOS often ignores resume() — restart remaining queue instead
    if (_isMobile) {
        _processQueue();
    } else {
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

window.courseAudio = {
    play: window.playAudio,
    stop: window.stopAudio,
    pause: window.pauseAudio,
    resume: window.resumeAudio,
    togglePause: window.togglePauseAudio
};

// ---- Internal helpers ----

function _speak(text, gender) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;   // Slightly slower = more natural & clear
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = getBestVoice(gender);
    if (voice) utterance.voice = voice;

    _currentUtterance = utterance;
    isPlaying = true;

    utterance.onend = () => {
        if (isPlaying && !isPaused) {
            setTimeout(_processQueue, 350);
        }
    };

    utterance.onerror = (e) => {
        // 'interrupted' is normal when stopAudio() is called — suppress it
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('SpeechSynthesis error:', e.error, '— Text:', text.substring(0, 60));
        }
        if (isPlaying && !isPaused && e.error !== 'interrupted' && e.error !== 'canceled') {
            setTimeout(_processQueue, 200);
        }
    };

    // Guard: if synth is in a stuck state, reset it first
    if (window.speechSynthesis.paused) window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function _processQueue() {
    if (isPaused || audioQueue.length === 0) {
        isPlaying = audioQueue.length > 0;
        return;
    }
    const item = audioQueue.shift();
    _speak(item.text, item.gender);
}

function _splitText(text, maxLen) {
    const chunks = [];
    let remaining = text;
    while (remaining.length > 0) {
        if (remaining.length <= maxLen) { chunks.push(remaining); break; }
        let idx = remaining.lastIndexOf('. ', maxLen);
        if (idx < 0) idx = remaining.lastIndexOf('? ', maxLen);
        if (idx < 0) idx = remaining.lastIndexOf('! ', maxLen);
        if (idx < 0) idx = remaining.lastIndexOf(', ', maxLen);
        if (idx < 0) idx = remaining.lastIndexOf(' ', maxLen);
        if (idx < 0) idx = maxLen;
        chunks.push(remaining.substring(0, idx + 1).trim());
        remaining = remaining.substring(idx + 1).trim();
    }
    return chunks;
}

function _updatePauseBtn(paused) {
    const btn = document.getElementById('pause-audio-btn');
    if (btn) btn.innerHTML = paused ? '▶️ Resume' : '⏸️ Pause';
}
// ============================================================

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

// ============================================================
// Teacher Links Management
// ============================================================

function getTeacherLinks(unitId) {
    const all = JSON.parse(localStorage.getItem('teacher_links') || '{}');
    return all[unitId] || [];
}

function saveTeacherLinks(unitId, links) {
    const all = JSON.parse(localStorage.getItem('teacher_links') || '{}');
    all[unitId] = links;
    localStorage.setItem('teacher_links', JSON.stringify(all));
}

window.addTeacherLink = function (unitId) {
    const titleInput = document.getElementById('teacher-link-title-' + unitId);
    const urlInput = document.getElementById('teacher-link-url-' + unitId);
    if (!titleInput || !urlInput) return;

    const title = titleInput.value.trim();
    let url = urlInput.value.trim();

    if (!title || !url) {
        alert('Please enter both a title and a URL.');
        return;
    }

    // Clean up common copy-paste errors (like ttps:// or tps://) and force https://
    url = url.replace(/^[a-z]*:\/\//i, '');
    url = 'https://' + url;

    try {
        const parsed = new URL(url);
        // A valid internet domain must have at least one dot (e.g., example.com)
        if (!parsed.hostname.includes('.')) {
            alert('Por favor, ingresá una dirección web válida (ej: página.com)');
            return;
        }
    } catch (e) {
        alert('Por favor, ingresá un URL válido.');
        return;
    }

    const links = getTeacherLinks(unitId);
    links.push({ title, url, id: Date.now() });
    saveTeacherLinks(unitId, links);

    titleInput.value = '';
    urlInput.value = '';

    // Close the form
    const details = titleInput.closest('details');
    if (details) details.open = false;

    loadTeacherLinks(unitId);
};

window.deleteTeacherLink = function (unitId, linkId) {
    if (!confirm('Delete this link?')) return;
    let links = getTeacherLinks(unitId);
    links = links.filter(l => l.id !== linkId);
    saveTeacherLinks(unitId, links);
    loadTeacherLinks(unitId);
};

function loadTeacherLinks(unitId) {
    const container = document.getElementById('teacher-links-list-' + unitId);
    if (!container) return;

    const links = getTeacherLinks(unitId);

    if (links.length === 0) {
        container.innerHTML = '<p style="opacity: 0.45; font-size: 0.85rem; padding: 8px 0; font-style: italic;">No links added yet.</p>';
        return;
    }

    container.innerHTML = links.map(link => `
        <div class="teacher-link-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(129, 140, 248, 0.2); border-radius: 10px; margin-bottom: 8px; transition: all 0.3s ease;"
             onmouseover="this.style.borderColor='rgba(129, 140, 248, 0.5)'; this.style.background='rgba(99, 102, 241, 0.15)'"
             onmouseout="this.style.borderColor='rgba(129, 140, 248, 0.2)'; this.style.background='rgba(99, 102, 241, 0.08)'">
            <span style="font-size: 1.2rem;">🔗</span>
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               style="flex: 1; color: #a5b4fc; text-decoration: none; font-weight: 500; font-size: 0.95rem;"
               onmouseover="this.style.color='#c7d2fe'" onmouseout="this.style.color='#a5b4fc'">
                ${link.title}
            </a>
            <button onclick="deleteTeacherLink(${unitId}, ${link.id})" 
                    style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; flex-shrink: 0;"
                    onmouseover="this.style.background='rgba(239, 68, 68, 0.3)'"
                    onmouseout="this.style.background='rgba(239, 68, 68, 0.15)'"
                    title="Delete link">🗑️</button>
        </div>
    `).join('');
}

function loadAllTeacherLinks() {
    courseData.units.forEach(unit => {
        loadTeacherLinks(unit.id);
    });
}
