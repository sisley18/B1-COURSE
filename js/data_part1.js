/**
 * Course Content Database - EXPANDED TEXTS VERSION
 * Full 1-hour classes with longer reading/listening passages
 */

const courseData = {
    units: [
        {
            id: 1,
            title: "The Future of Tech",
            topic: "Artificial Intelligence & Automation",
            listening: {
                title: "Living with AI",
                transcript: "Artificial Intelligence is no longer a futuristic concept confined to science fiction movies; it is now woven into the very fabric of our daily lives. Every time you unlock your phone with facial recognition, ask a virtual assistant for the weather, or receive personalized recommendations on streaming platforms, you are interacting with AI. The technology has evolved from simple rule-based systems to sophisticated neural networks capable of learning and adapting. However, this rapid advancement raises important questions. Are we becoming too dependent on machines to make decisions for us? From predictive text that finishes our sentences to autonomous vehicles that navigate our streets, algorithms are increasingly taking over tasks that once required human judgment. Critics warn that this could lead to a gradual erosion of critical thinking skills. They also point to the issue of algorithmic bias: when AI systems are trained on historical data that contains prejudices, they can perpetuate and even amplify those biases. On the other hand, proponents argue that AI has the potential to solve some of humanity's greatest challenges, from accelerating medical research to combating climate change. The key, experts suggest, lies in developing AI responsibly, with proper oversight, transparency, and ethical guidelines. As we stand at this technological crossroads, the choices we make today will shape the relationship between humans and machines for generations to come.",
                questions: [
                    { q: "What is AI now woven into?", options: ["Daily lives", "Theoretical physics", "Space exploration"], correct: 0 },
                    { q: "What uses facial recognition?", options: ["Medical research", "Phone unlocking", "Climate modeling"], correct: 1 },
                    { q: "What evolved from rule-based systems?", options: ["Neural networks", "Binary code", "Quantum computing"], correct: 0 },
                    { q: "What are critics warning about?", options: ["Data privacy", "Dependency on machines", "High costs"], correct: 1 },
                    { q: "What can perpetuate biases?", options: ["Users", "Designers", "AI systems"], correct: 2 },
                    { q: "What can AI help combat?", options: ["Climate change", "Economic inflation", "Political unrest"], correct: 0 },
                    { q: "What do experts suggest?", options: ["Unrestricted growth", "Responsible development", "Complete bans"], correct: 1 },
                    { q: "Autonomous vehicles do what?", options: ["Navigate streets", "Fly planes", "Build roads"], correct: 0 },
                    { q: "What takes over human tasks?", options: ["Algorithms", "Hardware", "Sensors"], correct: 0 },
                    { q: "What shapes future generations?", options: ["History", "Today's choices", "Random events"], correct: 1 }
                ]
            },
            reading: {
                title: "The Technological Singularity: A New Era for Humanity",
                text: "The technological singularity represents one of the most debated concepts in futurology and artificial intelligence research. It refers to a hypothetical future point in time when technological growth becomes uncontrollable and irreversible, resulting in unfathomable changes to human civilization. The term was popularized by mathematician and science fiction author Vernor Vinge, who predicted that within thirty years, we would have the technological means to create superhuman intelligence. Shortly after, the human era would end.<br><br>Ray Kurzweil, a prominent futurist and inventor, has been perhaps the most vocal advocate of the singularity concept. In his influential book 'The Singularity Is Near,' Kurzweil argues that the exponential growth of computing power, combined with advances in genetics, nanotechnology, and robotics, will lead to a profound transformation of human existence. He predicts that by 2045, artificial intelligence will surpass human intelligence, leading to a merger between humans and machines.<br><br>The implications of such an event are staggering to contemplate. Imagine a world where diseases are diagnosed and cured instantly, where aging becomes optional, where the boundaries between virtual and physical reality blur beyond recognition. Proponents envision a future of abundance, where scarcity becomes obsolete and human creativity flourishes unencumbered by material concerns.<br><br>However, not everyone shares this optimistic vision. Critics argue that the singularity is based on flawed assumptions about the nature of intelligence and technological progress. They point out that Moore's Law, which predicted the doubling of computing power every two years, is showing signs of slowing down. Furthermore, they argue that consciousness and genuine understanding cannot simply be replicated by silicon chips, no matter how powerful. The debate continues, but one thing is certain: the decisions we make about AI development today will profoundly shape our collective future.",
                questions: [
                    { q: "What does singularity refer to?", options: ["A new phone", "Uncontrollable tech growth", "Space travel"], correct: 1 },
                    { q: "Who popularized the term?", options: ["Vernor Vinge", "Isaac Asimov", "Elon Musk"], correct: 0 },
                    { q: "What did Kurzweil write?", options: ["The Singularity Is Near", "The Future of AI", "Digital Dreams"], correct: 0 },
                    { q: "When does Kurzweil predict AI surpasses humans?", options: ["2030", "2050", "2045"], correct: 2 },
                    { q: "What could become optional?", options: ["Work", "Aging", "Travel"], correct: 1 },
                    { q: "What is showing signs of slowing?", options: ["Moore's Law", "Internet speed", "AI development"], correct: 0 },
                    { q: "What can't be replicated by chips?", options: ["Logic", "Consciousness", "Calculation"], correct: 1 },
                    { q: "What will shape our future?", options: ["Past events", "AI decisions today", "Random chance"], correct: 1 },
                    { q: "What do proponents envision?", options: ["Scarcity", "Abundance", "Conflict"], correct: 1 },
                    { q: "What involves genetics and nanotechnology?", options: ["Transformation of existence", "Medical billing", "Social media"], correct: 0 }
                ]
            },
            grammar: {
                title: "Future Perfect & Future Continuous",
                explanation: "Future Perfect (will have + past participle) describes actions completed before a future time. Future Continuous (will be + -ing) describes ongoing actions at a future time.",
                example: "By 2050, scientists will have developed new treatments. This time next year, I will be studying abroad.",
                quizzes: [
                    { question: "By next year, I _____ finished the course.", options: ["will", "will have", "am"], correct: 1 },
                    { question: "Tomorrow at 5, I _____ working.", options: ["will be", "will have", "am"], correct: 0 },
                    { question: "She _____ arrived by the time we leave.", options: ["will", "is", "will have"], correct: 2 },
                    { question: "They _____ studying all night long.", options: ["will have", "will be", "are"], correct: 1 },
                    { question: "By 2030, we _____ solved this problem.", options: ["will have", "will", "are"], correct: 0 },
                    { question: "At 9 PM tonight, he _____ sleeping.", options: ["will have", "is", "will be"], correct: 2 },
                    { question: "We _____ completed the project by Friday.", options: ["will", "will have", "are"], correct: 1 },
                    { question: "She _____ cooking dinner when you arrive.", options: ["will be", "will have", "is"], correct: 0 },
                    { question: "By then, I _____ left the country.", options: ["will", "am", "will have"], correct: 2 },
                    { question: "He _____ reading that book for two hours.", options: ["will", "is", "will have been"], correct: 2 }
                ]
            },
            vocabulary: [
                { word: "Autonomous", ipa: "ɔːˈtɒnəməs", def: "Operating independently without human control" },
                { word: "Algorithm", ipa: "ˈælɡərɪðəm", def: "A step-by-step procedure for solving problems" },
                { word: "Artificial", ipa: "ˌɑːtɪˈfɪʃəl", def: "Made by humans rather than occurring naturally" },
                { word: "Automation", ipa: "ˌɔːtəˈmeɪʃən", def: "The use of machines to perform tasks automatically" },
                { word: "Exponential", ipa: "ˌekspəˈnenʃəl", def: "Increasing at a constantly growing rate" },
                { word: "Irreversible", ipa: "ˌɪrɪˈvɜːsəbəl", def: "Impossible to change back to a previous state" },
                { word: "Hypothetical", ipa: "ˌhaɪpəˈθetɪkəl", def: "Based on assumptions rather than facts" },
                { word: "Futurologist", ipa: "ˌfjuːtʃəˈrɒlədʒɪst", def: "A person who studies and predicts the future" },
                { word: "Singularity", ipa: "ˌsɪŋɡjəˈlærəti", def: "A point of unprecedented technological change" },
                { word: "Predictive", ipa: "prɪˈdɪktɪv", def: "Relating to forecasting future events" }
            ],
            collocations: [
                { pair: ["Artificial", "Intelligence"], context: "_____ Intelligence is transforming industries.", distractors: ["Fake", "Smart"] },
                { pair: ["Machine", "Learning"], context: "_____ Learning algorithms improve with data.", distractors: ["Computer", "Robot"] },
                { pair: ["Deep", "Learning"], context: "_____ Learning uses neural networks.", distractors: ["Far", "Long"] },
                { pair: ["Neural", "Network"], context: "A _____ Network mimics the brain.", distractors: ["Brain", "Mind"] },
                { pair: ["Data", "Mining"], context: "_____ Mining extracts patterns from information.", distractors: ["Info", "Stat"] },
                { pair: ["Predictive", "Analytics"], context: "_____ Analytics forecasts trends.", distractors: ["Future", "Guess"] },
                { pair: ["Self", "Driving"], context: "_____-Driving cars navigate autonomously.", distractors: ["Auto", "Own"] },
                { pair: ["Natural", "Language"], context: "_____ Language processing understands speech.", distractors: ["Real", "True"] },
                { pair: ["Computer", "Vision"], context: "_____ Vision enables image recognition.", distractors: ["Machine", "Robot"] },
                { pair: ["Big", "Data"], context: "_____ Data requires massive storage.", distractors: ["Large", "Huge"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "au-TO-no-mous", syllables: ["au", "TO", "no", "mous"], correct: 1 },
                    { word: "AL-go-rithm", syllables: ["AL", "go", "rithm"], correct: 0 },
                    { word: "ar-ti-FI-cial", syllables: ["ar", "ti", "FI", "cial"], correct: 2 },
                    { word: "au-to-MA-tion", syllables: ["au", "to", "MA", "tion"], correct: 2 },
                    { word: "ex-po-NEN-tial", syllables: ["ex", "po", "NEN", "tial"], correct: 2 },
                    { word: "ir-re-VER-si-ble", syllables: ["ir", "re", "VER", "si", "ble"], correct: 2 },
                    { word: "hy-po-THE-ti-cal", syllables: ["hy", "po", "THE", "ti", "cal"], correct: 2 },
                    { word: "fu-tu-RO-lo-gist", syllables: ["fu", "tu", "RO", "lo", "gist"], correct: 2 },
                    { word: "sin-gu-LA-ri-ty", syllables: ["sin", "gu", "LA", "ri", "ty"], correct: 2 },
                    { word: "pre-DIC-tive", syllables: ["pre", "DIC", "tive"], correct: 1 }
                ],
                sentence_stress: [
                    { sentence: "Artificial intelligence is transforming our world.", stressed: ["Artificial", "intelligence", "transforming", "world"] },
                    { sentence: "Robots will never completely replace humans.", stressed: ["Robots", "never", "completely", "replace", "humans"] },
                    { sentence: "Technology advances at an exponential rate.", stressed: ["Technology", "advances", "exponential", "rate"] },
                    { sentence: "We must consider the ethical implications.", stressed: ["must", "consider", "ethical", "implications"] },
                    { sentence: "Data privacy is a major concern today.", stressed: ["Data", "privacy", "major", "concern", "today"] }
                ]
            },
            writing: "Discuss the potential benefits and risks of artificial intelligence in everyday life. Consider areas such as healthcare, transportation, and employment. Write at least 250 words expressing your personal opinion with supporting arguments.",
            speaking: "Would you trust a robot to perform surgery on you or a family member? Explain your reasoning and discuss the role of human oversight in medical procedures.",
            verb_patterns: {
                exercises: [
                    { sentence: "Scientists enjoy _____ new technologies.", options: ["to develop", "developing", "develop"], correct: 1 },
                    { sentence: "The company decided _____ in AI research.", options: ["to invest", "investing", "invest"], correct: 0 },
                    { sentence: "They avoid _____ outdated systems.", options: ["to use", "use", "using"], correct: 2 },
                    { sentence: "Experts suggest _____ more time learning programming.", options: ["spending", "to spend", "spend"], correct: 0 },
                    { sentence: "I hope _____ a career in technology.", options: ["having", "have", "to have"], correct: 2 },
                    { sentence: "Keep _____ until you solve the problem.", options: ["trying", "to try", "try"], correct: 0 },
                    { sentence: "She promised _____ the software update.", options: ["to complete", "completing", "complete"], correct: 0 },
                    { sentence: "Consider _____ your skills regularly.", options: ["to update", "update", "updating"], correct: 2 },
                    { sentence: "Many people refuse _____ new technology.", options: ["learning", "to learn", "learn"], correct: 1 },
                    { sentence: "I finished _____ the code yesterday.", options: ["writing", "to write", "write"], correct: 0 }
                ]
            },
            videos: [
                { title: "How AI Could Empower Any Business", channel: "TED", duration: "9:28", url: "https://www.youtube.com/watch?v=reUZRyXxUs4" },
                { title: "What Is Artificial Intelligence?", channel: "BBC Ideas", duration: "4:12", url: "https://www.youtube.com/watch?v=mJeNghZXtMo" },
                { title: "The Danger of AI is Weirder Than You Think", channel: "TED", duration: "10:31", url: "https://www.youtube.com/watch?v=OhCzX0iLnOc" }
            ],
            video_comprehension: {
                videoId: "reUZRyXxUs4",
                videoTitle: "How AI Could Empower Any Business",
                channel: "TED",
                duration: "9:28",
                fitb: [
                    "AI is like a new form of ___ that automates many tasks.",
                    "The speaker says AI will transform almost every ___ in the world.",
                    "Machine learning allows computers to learn from ___ automatically.",
                    "Small companies can use AI tools to improve their ___ operations.",
                    "The impact of AI is compared to the Industrial ___."
                ]
            }
        },
        {
            id: 2,
            title: "Global Business",
            topic: "Remote Work & Digital Nomads",
            listening: {
                title: "The Transformation of the Modern Workplace",
                transcript: "The traditional nine-to-five office job, once considered the cornerstone of professional life, is rapidly becoming obsolete in many industries. The COVID-19 pandemic accelerated a transformation that was already underway, forcing millions of workers worldwide to adapt to remote work almost overnight. What many initially viewed as a temporary measure has evolved into a permanent shift in how we think about work. Companies that once insisted on strict office attendance are now embracing hybrid models that offer employees unprecedented flexibility. Workers can now choose when and where they work, splitting their time between home offices, co-working spaces, and traditional offices. This flexibility has given rise to a new breed of professional: the digital nomad. These individuals leverage technology to work from anywhere in the world, combining their careers with travel and adventure. From beachside cafes in Bali to mountain retreats in the Swiss Alps, digital nomads are redefining what it means to have a successful career. However, this new paradigm is not without challenges. The blurring of boundaries between work and personal life has led to increased reports of burnout and mental health issues. Many workers find it difficult to disconnect when their office is just a few steps from their bedroom. Managers face the challenge of leading distributed teams across multiple time zones, requiring new skills in communication and trust-building. Despite these challenges, most experts agree that the future of work will be increasingly flexible, remote, and technology-driven.",
                questions: [
                    { q: "What is becoming obsolete?", options: ["Computers", "9-to-5 office jobs", "Digital devices"], correct: 1 },
                    { q: "What accelerated the transformation?", options: ["Economic recession", "Technological failure", "COVID-19 pandemic"], correct: 2 },
                    { q: "What are hybrid models?", options: ["Mix of office and remote", "Exclusively work from home", "Mandatory office attendance"], correct: 0 },
                    { q: "Who are digital nomads?", options: ["Traditional office workers", "Remote workers who travel", "Freelancers who stay home"], correct: 1 },
                    { q: "What has increased due to blurred boundaries?", options: ["Productivity", "Burnout", "Job satisfaction"], correct: 1 },
                    { q: "Where do digital nomads work from?", options: ["Only designated offices", "Anywhere in the world", "Specifically home offices"], correct: 1 },
                    { q: "What do managers face?", options: ["Leading distributed teams", "Decreased workload", "Easier communication"], correct: 0 },
                    { q: "What skills are needed for remote management?", options: ["Coding and design", "Communication and trust", "Sales and marketing"], correct: 1 },
                    { q: "What will future work be?", options: ["Rigid and office-only", "Flexible and remote", "Manual and labor-intensive"], correct: 1 },
                    { q: "What do workers find difficult?", options: ["Finding a job", "Disconnecting from work", "Traveling for work"], correct: 1 }
                ]
            },
            reading: {
                title: "The Rise and Challenges of the Gig Economy",
                text: "The gig economy has fundamentally transformed how millions of people around the world earn their living. Unlike traditional employment, where workers commit to a single employer for a fixed salary and benefits, the gig economy is characterized by short-term contracts, freelance work, and task-based compensation. Platforms like Uber, Airbnb, Upwork, and Fiverr have made it easier than ever for individuals to monetize their skills, time, and assets. For many, this represents liberation from the constraints of traditional employment. Freelancers enjoy the freedom to choose their projects, set their schedules, and work from anywhere. A graphic designer in Manila can create logos for clients in New York; a developer in São Paulo can build websites for startups in Berlin. This democratization of work has created opportunities for talented individuals regardless of their geographic location.<br><br>However, the gig economy's flexibility comes at a significant cost. Unlike traditional employees, gig workers typically do not receive health insurance, paid vacation, sick leave, or retirement benefits. They bear the full burden of self-employment taxes and must constantly hustle to find new clients or gigs. Income can be unpredictable, fluctuating wildly from month to month. Many gig workers report feelings of isolation and anxiety about their financial security. The classification of gig workers has become a contentious legal and political issue. Are they independent contractors, as companies claim, or are they employees entitled to legal protections? Courts and legislatures around the world are grappling with this question, with significant implications for both workers and businesses. As the gig economy continues to grow, finding the right balance between flexibility and security remains one of the defining challenges of our time.",
                questions: [
                    { q: "What characterizes the gig economy?", options: ["Lifetime employment", "Short-term contracts", "Fixed monthly salaries"], correct: 1 },
                    { q: "What do platforms like Uber enable?", options: ["Monetizing skills", "Finding permanent jobs", "Social networking"], correct: 0 },
                    { q: "What do freelancers enjoy?", options: ["Strict schedules", "Freedom to choose projects", "Guaranteed income"], correct: 1 },
                    { q: "What don't gig workers receive?", options: ["Health insurance benefits", "Payment for work", "Feedback from clients"], correct: 0 },
                    { q: "What is a contentious issue?", options: ["Office location", "Worker classification", "Internet speed"], correct: 1 },
                    { q: "What can be unpredictable for gig workers?", options: ["Work hours", "Income", "Tax rates"], correct: 1 },
                    { q: "What do many gig workers report?", options: ["Isolation and anxiety", "Complete satisfaction", "Lower stress levels"], correct: 0 },
                    { q: "What is the defining challenge?", options: ["Reducing internet costs", "Balance between flexibility and security", "Eliminating freelance work"], correct: 1 },
                    { q: "Who can work for clients globally?", options: ["Only local workers", "Freelancers anywhere", "Corporate executives"], correct: 1 },
                    { q: "What are courts grappling with?", options: ["Worker classification", "Platform fees", "Digital taxation"], correct: 0 }
                ]
            },
            grammar: {
                title: "Modals of Deduction and Speculation",
                explanation: "Use 'must' for strong certainty, 'might/may/could' for possibility, and 'can't' for impossibility. For past deductions, add 'have' + past participle.",
                example: "He must be tired (I'm certain). She might have left already (It's possible).",
                quizzes: [
                    { question: "He _____ be at the office now; his car is there.", options: ["can't", "must", "won't"], correct: 1 },
                    { question: "She _____ have received the message; she's not responding.", options: ["must", "might not", "will"], correct: 1 },
                    { question: "They _____ be sleeping; it's 3 AM.", options: ["must", "can't", "won't"], correct: 0 },
                    { question: "It _____ be the right answer; it doesn't match.", options: ["must", "will", "can't"], correct: 2 },
                    { question: "He _____ have forgotten about the meeting.", options: ["must not", "will", "might"], correct: 2 },
                    { question: "She _____ be lying; I trust her completely.", options: ["can't", "must", "will"], correct: 0 },
                    { question: "They _____ have left early to catch the train.", options: ["can't", "must", "won't"], correct: 1 },
                    { question: "It _____ be raining; look at those dark clouds.", options: ["must not", "might", "can"], correct: 1 },
                    { question: "He _____ have known about the surprise party.", options: ["must", "couldn't", "will"], correct: 1 },
                    { question: "She _____ still be working on the project.", options: ["could", "must not", "can"], correct: 0 }
                ]
            },
            vocabulary: [
                { word: "Freelancer", ipa: "ˈfriːlɑːnsər", def: "A self-employed person working for various clients" },
                { word: "Remote", ipa: "rɪˈməʊt", def: "Working from a location away from a central office" },
                { word: "Hybrid", ipa: "ˈhaɪbrɪd", def: "Combining different elements, such as office and remote work" },
                { word: "Flexibility", ipa: "ˌfleksəˈbɪləti", def: "The ability to adapt to different circumstances" },
                { word: "Obsolete", ipa: "ˈɒbsəliːt", def: "No longer in use or outdated" },
                { word: "Discipline", ipa: "ˈdɪsəplɪn", def: "The practice of training oneself to follow rules or a code" },
                { word: "Contractor", ipa: "kənˈtræktər", def: "A person hired to perform specific work under contract" },
                { word: "Nomad", ipa: "ˈnəʊmæd", def: "A person who moves from place to place" },
                { word: "Coworking", ipa: "ˌkəʊˈwɜːkɪŋ", def: "Sharing a workspace with others from different companies" },
                { word: "Burnout", ipa: "ˈbɜːnaʊt", def: "Physical or mental exhaustion caused by excessive stress" }
            ],
            collocations: [
                { pair: ["Remote", "Work"], context: "_____ Work allows employees to work from home.", distractors: ["Far", "Distance"] },
                { pair: ["Work-Life", "Balance"], context: "Maintaining _____-_____ is essential for wellbeing.", distractors: ["Job", "Time"] },
                { pair: ["Competitive", "Salary"], context: "The company offers a _____ _____ package.", distractors: ["Good", "High"] },
                { pair: ["Job", "Security"], context: "Gig workers often lack _____ _____.", distractors: ["Work", "Career"] },
                { pair: ["Career", "Growth"], context: "_____ _____ opportunities attract talented employees.", distractors: ["Job", "Work"] },
                { pair: ["Professional", "Development"], context: "Invest in your _____ _____ regularly.", distractors: ["Personal", "Work"] },
                { pair: ["Full", "Time"], context: "She works _____-_____ at the company.", distractors: ["All", "Complete"] },
                { pair: ["Part", "Time"], context: "_____-_____ jobs offer flexibility to students.", distractors: ["Half", "Some"] },
                { pair: ["Self", "Employed"], context: "He is _____-_____ and runs his own business.", distractors: ["Own", "Solo"] },
                { pair: ["Digital", "Nomad"], context: "_____ _____s work while traveling the world.", distractors: ["Online", "Tech"] }
            ],
            pronunciation: {
                word_stress: [
                    { word: "FREE-lan-cer", syllables: ["FREE", "lan", "cer"], correct: 0 },
                    { word: "e-CO-no-my", syllables: ["e", "CO", "no", "my"], correct: 1 },
                    { word: "flex-i-BI-li-ty", syllables: ["flex", "i", "BI", "li", "ty"], correct: 2 },
                    { word: "ob-so-LETE", syllables: ["ob", "so", "LETE"], correct: 2 },
                    { word: "DIS-ci-pline", syllables: ["DIS", "ci", "pline"], correct: 0 },
                    { word: "con-TRAC-tor", syllables: ["con", "TRAC", "tor"], correct: 1 },
                    { word: "NO-mad", syllables: ["NO", "mad"], correct: 0 },
                    { word: "co-WOR-king", syllables: ["co", "WOR", "king"], correct: 1 },
                    { word: "BURN-out", syllables: ["BURN", "out"], correct: 0 },
                    { word: "pro-FES-sion-al", syllables: ["pro", "FES", "sion", "al"], correct: 1 }
                ],
                sentence_stress: [
                    { sentence: "Remote work has become the new normal.", stressed: ["Remote", "work", "new", "normal"] },
                    { sentence: "Digital nomads travel while working online.", stressed: ["Digital", "nomads", "travel", "working", "online"] },
                    { sentence: "Work-life balance matters for your health.", stressed: ["Work-life", "balance", "matters", "health"] },
                    { sentence: "Flexibility is the key benefit of freelancing.", stressed: ["Flexibility", "key", "benefit", "freelancing"] },
                    { sentence: "Offices are changing dramatically around the world.", stressed: ["Offices", "changing", "dramatically", "world"] },
                    { sentence: "Skills matter more than formal degrees today.", stressed: ["Skills", "matter", "formal", "degrees", "today"] },
                    { sentence: "Networking opens doors to new opportunities.", stressed: ["Networking", "opens", "doors", "opportunities"] },
                    { sentence: "Meeting deadlines is crucial for remote workers.", stressed: ["Meeting", "deadlines", "crucial", "remote", "workers"] },
                    { sentence: "Clear communication is absolutely essential.", stressed: ["Clear", "communication", "absolutely", "essential"] },
                    { sentence: "Adapt quickly or risk falling behind competitors.", stressed: ["Adapt", "quickly", "risk", "falling", "behind", "competitors"] }
                ]
            },
            writing: "Analyze the advantages and disadvantages of the gig economy for workers and society. Consider aspects such as income stability, benefits, work-life balance, and personal freedom. Write at least 250 words with your personal perspective.",
            speaking: "Describe your ideal work environment in detail. Would you prefer working remotely, in an office, or a hybrid model? Explain your reasoning and discuss what factors are most important to you in a job.",
            verb_patterns: {
                exercises: [
                    { sentence: "I enjoy _____ from home these days.", options: ["to work", "working", "work"], correct: 1 },
                    { sentence: "My boss agreed _____ me work remotely.", options: ["letting", "to let", "let"], correct: 1 },
                    { sentence: "We avoid _____ meetings without agendas.", options: ["having", "to have", "have"], correct: 0 },
                    { sentence: "They decided _____ a new office downtown.", options: ["opening", "to open", "open"], correct: 1 },
                    { sentence: "She keeps _____ for better opportunities.", options: ["looking", "to look", "look"], correct: 0 },
                    { sentence: "I want _____ my own business someday.", options: ["to start", "starting", "start"], correct: 0 },
                    { sentence: "He suggested _____ the deadline.", options: ["to extend", "extending", "extend"], correct: 1 },
                    { sentence: "They practice _____ presentations every week.", options: ["to give", "giving", "give"], correct: 1 },
                    { sentence: "She hopes _____ promoted this year.", options: ["getting", "to get", "get"], correct: 1 },
                    { sentence: "Consider _____ to a new city for work.", options: ["moving", "to move", "move"], correct: 0 }
                ]
            },
            videos: [
                { title: "Remote Work Is Here To Stay", channel: "CNBC", duration: "13:42", url: "https://www.youtube.com/watch?v=oSLAN0S3msk" },
                { title: "How To Work From Home Successfully", channel: "Thomas Frank", duration: "11:15", url: "https://www.youtube.com/watch?v=PLBYYdg0sfs" },
                { title: "The Future of Work After COVID-19", channel: "World Economic Forum", duration: "5:23", url: "https://www.youtube.com/watch?v=LbGjxp6xrho" }
            ],
            video_comprehension: {
                videoId: "LbGjxp6xrho",
                videoTitle: "The Future of Work After COVID-19",
                channel: "World Economic Forum",
                duration: "5:23",
                fitb: [
                    "The pandemic accelerated the shift to ___ work.",
                    "Many companies adopted a ___ model combining office and home.",
                    "Workers need strong ___ skills to collaborate online.",
                    "Maintaining work-life ___ is a key challenge.",
                    "The future of work will require lifelong ___ and adaptability."
                ]
            }
        }
    ]
};
