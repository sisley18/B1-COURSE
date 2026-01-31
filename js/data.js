/**
 * Course Content Database - EXPANDED with Pronunciation
 * Level: Advanced (B1-C1+)
 */

const courseData = {
    units: [
        {
            id: 1,
            title: "The Future of Tech",
            topic: "Artificial Intelligence & Automation",
            listening: {
                title: "Living with AI",
                level: "Advanced",
                transcript: "Artificial Intelligence is no longer a futuristic concept; it is woven into the fabric of our daily lives. From predictive text to autonomous vehicles, algorithms are making decisions for us. But the question remains: are we surrendering too much autonomy? Critics argue that relying on AI algorithms for hiring processes, loan approvals, and even criminal sentencing introduces a layer of bias that is difficult to audit.",
                questions: [
                    { q: "What is the main concern regarding AI?", options: ["Speed", "Loss of autonomy & Bias", "Cost", "Battery life"], correct: 1 },
                    { q: "What do critics argue?", options: ["AI is cheap", "AI introduces bias", "AI is fun", "AI is slow"], correct: 1 }
                ]
            },
            reading: {
                title: "The Singularity",
                text: "The technological singularity is a hypothetical point in time at which technological growth becomes uncontrollable and irreversible, resulting in unfathomable changes to human civilization. Some futurologists predict this will happen within the next few decades. <br><br> The concept was popularized by Vernor Vinge and later by Ray Kurzweil, who argues that the exponential growth of computing power will inevitably lead to machines that are smarter than humans.",
                questions: [
                    { q: "What is the singularity?", options: ["Uncontrollable growth", "A black hole", "A new phone"], correct: 0 },
                    { q: "Who popularized the concept?", options: ["Elon Musk", "Vernor Vinge & Ray Kurzweil", "Bill Gates"], correct: 1 }
                ]
            },
            grammar: {
                title: "Future Perfect & Future Continuous",
                explanation: "We use the Future Perfect to say something will be finished by a certain time (will have done). We use Future Continuous for actions in progress (will be doing).",
                example: "By 2050, we will have colonized Mars. We will be living in domes.",
                quizzes: [
                    { question: "By next year, I ______ the project.", options: ["will have finished", "will finish", "am finishing"], correct: 0 },
                    { question: "This time tomorrow, we ______ to Paris.", options: ["will fly", "will be flying", "have flown"], correct: 1 }
                ]
            },
            vocabulary: [
                { word: "Autonomous", def: "Having the freedom to govern itself." },
                { word: "Algorithm", def: "A set of rules for calculations." },
                { word: "Exponential", def: "Becoming more and more rapid." }
            ],
            collocations: [
                { pair: ["Artificial", "Intelligence"], context: "The field of ______ Intelligence.", distractors: ["Fake", "Smart"] },
                { pair: ["Predictive", "Text"], context: "My phone uses ______ text.", distractors: ["Future", "Guessing"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "au-TO-no-mous", syllables: ["au", "TO", "no", "mous"], correct: 1 },
                    { word: "AL-go-rithm", syllables: ["AL", "go", "rithm"], correct: 0 },
                    { word: "ar-ti-FI-cial", syllables: ["ar", "ti", "FI", "cial"], correct: 2 }
                ],
                sentence_stress: [
                    { sentence: "AI is changing our lives.", stressed: ["AI", "changing", "lives"], question: "Which words carry the main stress?" },
                    { sentence: "Robots will never replace humans.", stressed: ["Robots", "never", "replace", "humans"], question: "Identify the stressed words." }
                ]
            },
            writing: "Do you believe AI will eventually replace human creativity? Write a 200-word essay.",
            speaking: "Discuss: Would you trust a robot to perform surgery on you?"
        },
        {
            id: 2,
            title: "Global Business",
            topic: "Remote Work & Digital Nomads",
            listening: {
                title: "The Hybrid Office",
                level: "Intermediate",
                transcript: "Companies are realizing that the 9-to-5 grind is obsolete. The hybrid model offers flexibility, but it also demands a new level of self-discipline from employees. Without the structure of the office, some find it hard to separate work from life, leading to burnout.",
                questions: [
                    { q: "What is a risk of hybrid work?", options: ["Burnout", "Traffic", "Boredom"], correct: 0 },
                    { q: "How should managers evaluate performance?", options: ["By hours", "By output", "By personality"], correct: 1 }
                ]
            },
            reading: {
                title: "The Gig Economy",
                text: "The gig economy allows people to work as freelancers or short-term contractors. While it offers freedom, it often lacks the stability and benefits of traditional employment. Apps like Uber, Upwork, and Fiverr have revolutionized how we find work.",
                questions: [
                    { q: "What do gig apps do?", options: ["Turn skills into commodities", "Give free money", "Hide jobs"], correct: 0 },
                    { q: "What is the main downside?", options: ["Too much freedom", "No job security", "Too many bosses"], correct: 1 }
                ]
            },
            grammar: {
                title: "Modals of Deduction",
                explanation: "Using must, might, could, can't to express certainty or possibility.",
                example: "He isn't here. He might be sick. He must be stuck in traffic.",
                quizzes: [
                    { question: "The lights are off. They ______ be home.", options: ["can't", "mustn't", "shouldn't"], correct: 0 },
                    { question: "She looks happy. She ______ have passed.", options: ["must", "can", "should"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Obsolete", def: "No longer produced or used." },
                { word: "Precarious", def: "Not securely held; unstable." },
                { word: "Freelancer", def: "A self-employed worker." }
            ],
            collocations: [
                { pair: ["Competitive", "Salary"], context: "They offer a ______ salary.", distractors: ["Winning", "Good"] },
                { pair: ["Work-Life", "Balance"], context: "Maintain a healthy ______ balance.", distractors: ["Job", "Time"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "en-tre-pre-NEUR", syllables: ["en", "tre", "pre", "NEUR"], correct: 3 },
                    { word: "FREE-lan-cer", syllables: ["FREE", "lan", "cer"], correct: 0 },
                    { word: "e-CO-no-my", syllables: ["e", "CO", "no", "my"], correct: 1 }
                ],
                sentence_stress: [
                    { sentence: "Work smarter, not harder.", stressed: ["Work", "smarter", "harder"], question: "Which words are emphasized?" },
                    { sentence: "Remote work is here to stay.", stressed: ["Remote", "work", "stay"], question: "Identify the key stressed words." }
                ]
            },
            writing: "Is the 'Gig Economy' good or bad for society? Argue your position.",
            speaking: "Describe your ideal working environment."
        },
        {
            id: 3,
            title: "Our Planet",
            topic: "Sustainability & Climate Change",
            listening: {
                title: "Renewable Energy",
                level: "Advanced",
                transcript: "Solar and wind energy are pivotal, but energy storage remains the bottleneck. Without better batteries, we cannot fully transition away from fossil fuels. Scientists are working on breakthroughs in solid-state batteries and hydrogen fuel cells.",
                questions: [
                    { q: "What is the main bottleneck?", options: ["Sunlight", "Energy Storage", "Money"], correct: 1 },
                    { q: "What are scientists working on?", options: ["Cars", "Batteries", "Oil"], correct: 1 }
                ]
            },
            reading: {
                title: "Microplastics",
                text: "Microplastics have been found in the deepest oceans and on the highest peaks. These tiny particles enter the food chain and eventually end up on our plates. Reducing single-use plastics is essential for protecting marine life and human health.",
                questions: [
                    { q: "Where do microplastics end up?", options: ["Only in the ocean", "On our plates", "In the sand"], correct: 1 },
                    { q: "What is essential?", options: ["More plastic", "Reducing single-use plastics", "More oceans"], correct: 1 }
                ]
            },
            grammar: {
                title: "Inversion for Emphasis",
                explanation: "Inverting subject and verb for emphasis, usually with negative adverbs.",
                example: "Not only is plastic pollution ugly, but it is also dangerous. Never have I seen such waste.",
                quizzes: [
                    { question: "Under no circumstances ______ you open this.", options: ["should", "you should", "do you"], correct: 0 },
                    { question: "Rarely ______ we see such commitment.", options: ["do", "we", "are"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Sustainable", def: "Able to be maintained at a certain rate." },
                { word: "Renewable", def: "Can be replenished naturally." },
                { word: "Biodegradable", def: "Capable of being decomposed." }
            ],
            collocations: [
                { pair: ["Renewable", "Energy"], context: "Invest in ______ energy.", distractors: ["New", "Again"] },
                { pair: ["Carbon", "Footprint"], context: "Reduce your carbon ______.", distractors: ["Step", "Print"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "sus-TAI-na-ble", syllables: ["sus", "TAI", "na", "ble"], correct: 1 },
                    { word: "en-vi-RON-ment", syllables: ["en", "vi", "RON", "ment"], correct: 2 },
                    { word: "bio-de-GRA-da-ble", syllables: ["bio", "de", "GRA", "da", "ble"], correct: 2 }
                ],
                sentence_stress: [
                    { sentence: "There is no Planet B.", stressed: ["no", "Planet", "B"], question: "Which words are emphasized?" },
                    { sentence: "Save the Earth now.", stressed: ["Save", "Earth", "now"], question: "Identify the stressed words." }
                ]
            },
            writing: "How can individuals reduce their carbon footprint?",
            speaking: "Debate: Should plastic be banned entirely?"
        },
        {
            id: 4,
            title: "Media & Society",
            topic: "Fake News & Social Media",
            listening: {
                title: "The Viral Effect",
                level: "Intermediate",
                transcript: "Information spreads faster than ever. A lie can travel halfway around the world while the truth is putting on its shoes. Social media algorithms prioritize engagement over accuracy, amplifying sensational content.",
                questions: [
                    { q: "What spreads faster?", options: ["The truth", "A lie", "Shoes"], correct: 1 },
                    { q: "What do algorithms prioritize?", options: ["Truth", "Engagement", "Speed"], correct: 1 }
                ]
            },
            reading: {
                title: "Media Literacy",
                text: "Media literacy is the ability to critically analyze media messages. It is an essential skill in the digital age to avoid manipulation and misinformation. Always check multiple sources before sharing news.",
                questions: [
                    { q: "Why is media literacy important?", options: ["To watch TV", "To avoid manipulation", "To be famous"], correct: 1 },
                    { q: "What should you do before sharing?", options: ["Like it", "Check multiple sources", "Ignore it"], correct: 1 }
                ]
            },
            grammar: {
                title: "Reported Speech",
                explanation: "Reporting what someone else said, often changing the tense back one step.",
                example: "He said that he was tired. She told me she had finished.",
                quizzes: [
                    { question: "She said she ______ coming.", options: ["is", "was", "will be"], correct: 1 },
                    { question: "He told me he ______ seen it.", options: ["has", "had", "have"], correct: 1 }
                ]
            },
            vocabulary: [
                { word: "Viral", def: "Spreading rapidly online." },
                { word: "Misinformation", def: "False or inaccurate information." },
                { word: "Algorithm", def: "A set of rules followed by a computer." }
            ],
            collocations: [
                { pair: ["Viral", "Content"], context: "Create ______ content.", distractors: ["Sick", "Fast"] },
                { pair: ["Fake", "News"], context: "Beware of ______ news.", distractors: ["Bad", "Old"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "ma-NI-pu-late", syllables: ["ma", "NI", "pu", "late"], correct: 1 },
                    { word: "AL-go-rithm", syllables: ["AL", "go", "rithm"], correct: 0 },
                    { word: "in-for-MA-tion", syllables: ["in", "for", "MA", "tion"], correct: 2 }
                ],
                sentence_stress: [
                    { sentence: "Check your sources first.", stressed: ["Check", "sources", "first"], question: "Which words are emphasized?" },
                    { sentence: "Truth matters more than speed.", stressed: ["Truth", "matters", "speed"], question: "Identify the stressed words." }
                ]
            },
            writing: "Is social media harmful to democracy?",
            speaking: "Have you ever believed a fake news story?"
        },
        {
            id: 5,
            title: "Health & Wellness",
            topic: "Mental Health & Nutrition",
            listening: {
                title: "Mindfulness",
                level: "Advanced",
                transcript: "Mindfulness is about being present in the moment without judgment. It has been shown to reduce stress and improve cognitive focus. Even five minutes of daily meditation can have significant benefits.",
                questions: [
                    { q: "What does mindfulness reduce?", options: ["Focus", "Stress", "Happiness"], correct: 1 },
                    { q: "How much meditation helps?", options: ["One hour", "Five minutes", "All day"], correct: 1 }
                ]
            },
            reading: {
                title: "The Gut-Brain Connection",
                text: "Scientists have discovered a strong link between gut health and mental well-being. The microbiome in your digestive system can influence mood, anxiety, and even depression. Eating fermented foods and fiber supports a healthy gut.",
                questions: [
                    { q: "What affects mental well-being?", options: ["Gut health", "Exercise only", "Sleep only"], correct: 0 },
                    { q: "What supports a healthy gut?", options: ["Sugar", "Fermented foods", "Fasting"], correct: 1 }
                ]
            },
            grammar: {
                title: "Gerunds vs Infinitives",
                explanation: "Knowing when to use the -ing form or the 'to' form after certain verbs.",
                example: "I suggest eating healthy. I want to eat healthy.",
                quizzes: [
                    { question: "I look forward to ______ you.", options: ["see", "seeing", "saw"], correct: 1 },
                    { question: "Avoid ______ too much sugar.", options: ["eating", "to eat", "eat"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Mindfulness", def: "Being present in the moment." },
                { word: "Microbiome", def: "Community of microorganisms." },
                { word: "Holistic", def: "Treating the whole person." }
            ],
            collocations: [
                { pair: ["Balanced", "Diet"], context: "Maintain a ______ diet.", distractors: ["Even", "Heavy"] },
                { pair: ["Mental", "Health"], context: "Prioritize your ______ health.", distractors: ["Brain", "Mind"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "me-di-TA-tion", syllables: ["me", "di", "TA", "tion"], correct: 2 },
                    { word: "nu-TRI-tion", syllables: ["nu", "TRI", "tion"], correct: 1 },
                    { word: "MIND-ful-ness", syllables: ["MIND", "ful", "ness"], correct: 0 }
                ],
                sentence_stress: [
                    { sentence: "Breathe in, breathe out.", stressed: ["Breathe", "in", "out"], question: "Which words are emphasized?" },
                    { sentence: "Health is true wealth.", stressed: ["Health", "true", "wealth"], question: "Identify the stressed words." }
                ]
            },
            writing: "Describe your routine for staying healthy.",
            speaking: "Is mental health discussed enough in your country?"
        },
        {
            id: 6,
            title: "Art & Culture",
            topic: "Modern Art & Heritage",
            listening: {
                title: "Is it Art?",
                level: "Advanced",
                transcript: "Modern art challenges our perceptions. A banana taped to a wall sold for thousands, raising the question: is value inherent or ascribed? Art is subjective, and what moves one person may confuse another.",
                questions: [
                    { q: "What question does modern art raise?", options: ["Is fruit tasty?", "Is value inherent or ascribed?", "Is tape expensive?"], correct: 1 },
                    { q: "What is art?", options: ["Objective", "Subjective", "Expensive"], correct: 1 }
                ]
            },
            reading: {
                title: "Cultural Heritage",
                text: "Preserving cultural heritage isn't just about saving old buildings; it's about maintaining the stories and traditions that define a community. Museums, festivals, and oral histories all play a role in keeping culture alive.",
                questions: [
                    { q: "Cultural heritage includes...", options: ["Only buildings", "Stories and traditions", "Only museums"], correct: 1 },
                    { q: "What keeps culture alive?", options: ["Money", "Oral histories", "Technology"], correct: 1 }
                ]
            },
            grammar: {
                title: "Passive Voice",
                explanation: "Focusing on the action rather than the actor.",
                example: "The Mona Lisa was painted by da Vinci. The building was designed by Gaudi.",
                quizzes: [
                    { question: "The book ______ written in 1920.", options: ["is", "was", "has"], correct: 1 },
                    { question: "The museum ______ visited by millions.", options: ["is", "was", "are"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Aesthetic", def: "Concerned with beauty." },
                { word: "Abstract", def: "Not representing reality." },
                { word: "Heritage", def: "Valued objects and traditions." }
            ],
            collocations: [
                { pair: ["Abstract", "Art"], context: "This is ______ art.", distractors: ["Confused", "Hard"] },
                { pair: ["Cultural", "Heritage"], context: "Protect our ______ heritage.", distractors: ["Old", "Important"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "aes-THE-tic", syllables: ["aes", "THE", "tic"], correct: 1 },
                    { word: "ex-hi-BI-tion", syllables: ["ex", "hi", "BI", "tion"], correct: 2 },
                    { word: "AB-stract", syllables: ["AB", "stract"], correct: 0 }
                ],
                sentence_stress: [
                    { sentence: "Art is in the eye of the beholder.", stressed: ["Art", "eye", "beholder"], question: "Which words are emphasized?" },
                    { sentence: "Beauty is subjective.", stressed: ["Beauty", "subjective"], question: "Identify the stressed words." }
                ]
            },
            writing: "What is the purpose of art in society?",
            speaking: "Describe a piece of art that moved you."
        },
        {
            id: 7,
            title: "Urban Life",
            topic: "Smart Cities & Infrastructure",
            listening: {
                title: "The 15-Minute City",
                level: "Advanced",
                transcript: "The concept of the 15-minute city suggests that all essential services should be within a 15-minute walk or bike ride from your home. This reduces traffic, pollution, and improves quality of life.",
                questions: [
                    { q: "What is the 15-minute city concept?", options: ["Drive fast", "Everything nearby", "Run 15 mins"], correct: 1 },
                    { q: "What does it reduce?", options: ["Happiness", "Traffic and pollution", "Services"], correct: 1 }
                ]
            },
            reading: {
                title: "Urban Sprawl",
                text: "Urban sprawl leads to increased traffic congestion and environmental degradation as cities expand uncontrollably into rural areas. Smart urban planning focuses on density and public transportation.",
                questions: [
                    { q: "What does urban sprawl cause?", options: ["Better farming", "Traffic congestion", "More trees"], correct: 1 },
                    { q: "What does smart planning focus on?", options: ["More roads", "Density and transit", "More cars"], correct: 1 }
                ]
            },
            grammar: {
                title: "Causative Form",
                explanation: "Having something done for you by someone else.",
                example: "I had my car repaired. I got my hair cut.",
                quizzes: [
                    { question: "I need to get my hair ______.", options: ["cut", "cutted", "cutting"], correct: 0 },
                    { question: "She had her house ______.", options: ["paint", "painted", "painting"], correct: 1 }
                ]
            },
            vocabulary: [
                { word: "Congestion", def: "Overcrowding, especially traffic." },
                { word: "Infrastructure", def: "Basic physical structures." },
                { word: "Commute", def: "Travel to and from work." }
            ],
            collocations: [
                { pair: ["Traffic", "Jam"], context: "Stuck in a ______ jam.", distractors: ["Jelly", "Car"] },
                { pair: ["Public", "Transportation"], context: "Use ______ transportation.", distractors: ["Free", "Open"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "in-fra-STRUC-ture", syllables: ["in", "fra", "STRUC", "ture"], correct: 2 },
                    { word: "con-GES-tion", syllables: ["con", "GES", "tion"], correct: 1 },
                    { word: "com-MUTE", syllables: ["com", "MUTE"], correct: 1 }
                ],
                sentence_stress: [
                    { sentence: "Cities are engines of growth.", stressed: ["Cities", "engines", "growth"], question: "Which words are emphasized?" },
                    { sentence: "Walk more, drive less.", stressed: ["Walk", "more", "drive", "less"], question: "Identify the stressed words." }
                ]
            },
            writing: "Would you rather live in a megacity or a village?",
            speaking: "What makes a city 'livable'?"
        },
        {
            id: 8,
            title: "Education",
            topic: "EdTech & Lifelong Learning",
            listening: {
                title: "The Classroom of Tomorrow",
                level: "Intermediate",
                transcript: "Virtual reality could transform education by allowing students to visit Mars or ancient Rome without leaving their desks. Gamification makes learning engaging, and AI tutors can provide personalized feedback.",
                questions: [
                    { q: "How can VR help?", options: ["Virtual field trips", "Cheaper books", "Better lunch"], correct: 0 },
                    { q: "What makes learning engaging?", options: ["Homework", "Gamification", "Tests"], correct: 1 }
                ]
            },
            reading: {
                title: "Lifelong Learning",
                text: "In a rapidly changing world, the ability to learn new skills continually is the single most important asset for career longevity. Online courses, workshops, and self-study all contribute to personal growth.",
                questions: [
                    { q: "What is important for career longevity?", options: ["Retiring early", "Lifelong learning", "One degree"], correct: 1 },
                    { q: "What contributes to growth?", options: ["TV", "Online courses", "Vacation"], correct: 1 }
                ]
            },
            grammar: {
                title: "Mixed Conditionals",
                explanation: "Mixing past and present time frames in hypothetical situations.",
                example: "If I hadn't studied (past), I wouldn't be a doctor (present).",
                quizzes: [
                    { question: "If I ______ you, I would have accepted.", options: ["am", "were", "was"], correct: 1 },
                    { question: "If she had studied, she ______ pass.", options: ["would", "will", "can"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Curriculum", def: "Subjects in a course of study." },
                { word: "Pedagogy", def: "The method of teaching." },
                { word: "Literacy", def: "Ability to read and write." }
            ],
            collocations: [
                { pair: ["Higher", "Education"], context: "Pursue ______ education.", distractors: ["Tall", "Upper"] },
                { pair: ["Critical", "Thinking"], context: "Develop ______ thinking.", distractors: ["Hard", "Important"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "cur-RI-cu-lum", syllables: ["cur", "RI", "cu", "lum"], correct: 1 },
                    { word: "pe-DA-go-gy", syllables: ["pe", "DA", "go", "gy"], correct: 1 },
                    { word: "LI-te-ra-cy", syllables: ["LI", "te", "ra", "cy"], correct: 0 }
                ],
                sentence_stress: [
                    { sentence: "Education is the key to success.", stressed: ["Education", "key", "success"], question: "Which words are emphasized?" },
                    { sentence: "Learn something new every day.", stressed: ["Learn", "new", "day"], question: "Identify the stressed words." }
                ]
            },
            writing: "Is university education still necessary?",
            speaking: "What was your favorite subject in school and why?"
        }
    ]
};
