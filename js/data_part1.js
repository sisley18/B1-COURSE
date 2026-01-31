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
                    { q: "What is AI now woven into?", options: ["Daily lives", "Movies only", "Nothing"], correct: 0 },
                    { q: "What uses facial recognition?", options: ["Phone unlocking", "Cooking", "Reading"], correct: 0 },
                    { q: "What evolved from rule-based systems?", options: ["Neural networks", "Books", "Cars"], correct: 0 },
                    { q: "What are critics warning about?", options: ["Dependency on machines", "Low prices", "Good weather"], correct: 0 },
                    { q: "What can perpetuate biases?", options: ["AI systems", "Books", "Teachers"], correct: 0 },
                    { q: "What can AI help combat?", options: ["Climate change", "Nothing", "Reading"], correct: 0 },
                    { q: "What do experts suggest?", options: ["Responsible development", "No rules", "Ignoring AI"], correct: 0 },
                    { q: "Autonomous vehicles do what?", options: ["Navigate streets", "Cook food", "Write books"], correct: 0 },
                    { q: "What takes over human tasks?", options: ["Algorithms", "Animals", "Plants"], correct: 0 },
                    { q: "What shapes future generations?", options: ["Today's choices", "Yesterday's weather", "Last year's news"], correct: 0 }
                ]
            },
            reading: {
                title: "The Technological Singularity: A New Era for Humanity",
                text: "The technological singularity represents one of the most debated concepts in futurology and artificial intelligence research. It refers to a hypothetical future point in time when technological growth becomes uncontrollable and irreversible, resulting in unfathomable changes to human civilization. The term was popularized by mathematician and science fiction author Vernor Vinge, who predicted that within thirty years, we would have the technological means to create superhuman intelligence. Shortly after, the human era would end.<br><br>Ray Kurzweil, a prominent futurist and inventor, has been perhaps the most vocal advocate of the singularity concept. In his influential book 'The Singularity Is Near,' Kurzweil argues that the exponential growth of computing power, combined with advances in genetics, nanotechnology, and robotics, will lead to a profound transformation of human existence. He predicts that by 2045, artificial intelligence will surpass human intelligence, leading to a merger between humans and machines.<br><br>The implications of such an event are staggering to contemplate. Imagine a world where diseases are diagnosed and cured instantly, where aging becomes optional, where the boundaries between virtual and physical reality blur beyond recognition. Proponents envision a future of abundance, where scarcity becomes obsolete and human creativity flourishes unencumbered by material concerns.<br><br>However, not everyone shares this optimistic vision. Critics argue that the singularity is based on flawed assumptions about the nature of intelligence and technological progress. They point out that Moore's Law, which predicted the doubling of computing power every two years, is showing signs of slowing down. Furthermore, they argue that consciousness and genuine understanding cannot simply be replicated by silicon chips, no matter how powerful. The debate continues, but one thing is certain: the decisions we make about AI development today will profoundly shape our collective future.",
                questions: [
                    { q: "What does singularity refer to?", options: ["Uncontrollable tech growth", "A new phone", "A movie"], correct: 0 },
                    { q: "Who popularized the term?", options: ["Vernor Vinge", "Bill Gates", "Steve Jobs"], correct: 0 },
                    { q: "What did Kurzweil write?", options: ["The Singularity Is Near", "Harry Potter", "The Bible"], correct: 0 },
                    { q: "When does Kurzweil predict AI surpasses humans?", options: ["2045", "2100", "1990"], correct: 0 },
                    { q: "What could become optional?", options: ["Aging", "Eating", "Sleeping"], correct: 0 },
                    { q: "What is showing signs of slowing?", options: ["Moore's Law", "Traffic", "Reading"], correct: 0 },
                    { q: "What can't be replicated by chips?", options: ["Consciousness", "Numbers", "Colors"], correct: 0 },
                    { q: "What will shape our future?", options: ["AI decisions today", "Weather", "Sports"], correct: 0 },
                    { q: "What do proponents envision?", options: ["Abundance", "Poverty", "War"], correct: 0 },
                    { q: "What involves genetics and nanotechnology?", options: ["Transformation of existence", "Cooking", "Sports"], correct: 0 }
                ]
            },
            grammar: {
                title: "Future Perfect & Future Continuous",
                explanation: "Future Perfect (will have + past participle) describes actions completed before a future time. Future Continuous (will be + -ing) describes ongoing actions at a future time.",
                example: "By 2050, scientists will have developed new treatments. This time next year, I will be studying abroad.",
                quizzes: [
                    { question: "By next year, I _____ finished the course.", options: ["will have", "will", "am"], correct: 0 },
                    { question: "Tomorrow at 5, I _____ working.", options: ["will be", "will have", "am"], correct: 0 },
                    { question: "She _____ arrived by the time we leave.", options: ["will have", "will", "is"], correct: 0 },
                    { question: "They _____ studying all night long.", options: ["will be", "will have", "are"], correct: 0 },
                    { question: "By 2030, we _____ solved this problem.", options: ["will have", "will", "are"], correct: 0 },
                    { question: "At 9 PM tonight, he _____ sleeping.", options: ["will be", "will have", "is"], correct: 0 },
                    { question: "We _____ completed the project by Friday.", options: ["will have", "will", "are"], correct: 0 },
                    { question: "She _____ cooking dinner when you arrive.", options: ["will be", "will have", "is"], correct: 0 },
                    { question: "By then, I _____ left the country.", options: ["will have", "will", "am"], correct: 0 },
                    { question: "He _____ reading that book for two hours.", options: ["will have been", "will", "is"], correct: 0 }
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
                    { sentence: "Technology is growing at an exponential rate.", stressed: ["Technology", "growing", "exponential", "rate"] },
                    { sentence: "Machines can learn complex patterns from data.", stressed: ["Machines", "learn", "complex", "patterns", "data"] },
                    { sentence: "Data drives important decisions in business.", stressed: ["Data", "drives", "important", "decisions", "business"] },
                    { sentence: "Algorithms now control much of what we see.", stressed: ["Algorithms", "control", "much", "see"] },
                    { sentence: "Automation will change the future of work.", stressed: ["Automation", "change", "future", "work"] },
                    { sentence: "Innovation requires both creativity and logic.", stressed: ["Innovation", "requires", "creativity", "logic"] },
                    { sentence: "The future remains uncertain but exciting.", stressed: ["future", "uncertain", "exciting"] },
                    { sentence: "Change is happening faster than ever before.", stressed: ["Change", "happening", "faster", "ever", "before"] }
                ]
            },
            writing: "Discuss the potential benefits and risks of artificial intelligence in everyday life. Consider areas such as healthcare, transportation, and employment. Write at least 250 words expressing your personal opinion with supporting arguments.",
            speaking: "Would you trust a robot to perform surgery on you or a family member? Explain your reasoning and discuss the role of human oversight in medical procedures.",
            videos: [
                { title: "How AI Could Empower Any Business", channel: "TED", duration: "9:28", url: "https://www.youtube.com/watch?v=reUZRyXxUs4" },
                { title: "What Is Artificial Intelligence?", channel: "BBC Ideas", duration: "4:12", url: "https://www.youtube.com/watch?v=mJeNghZXtMo" },
                { title: "The Danger of AI is Weirder Than You Think", channel: "TED", duration: "10:31", url: "https://www.youtube.com/watch?v=OhCzX0iLnOc" }
            ]
        },
        {
            id: 2,
            title: "Global Business",
            topic: "Remote Work & Digital Nomads",
            listening: {
                title: "The Transformation of the Modern Workplace",
                transcript: "The traditional nine-to-five office job, once considered the cornerstone of professional life, is rapidly becoming obsolete in many industries. The COVID-19 pandemic accelerated a transformation that was already underway, forcing millions of workers worldwide to adapt to remote work almost overnight. What many initially viewed as a temporary measure has evolved into a permanent shift in how we think about work. Companies that once insisted on strict office attendance are now embracing hybrid models that offer employees unprecedented flexibility. Workers can now choose when and where they work, splitting their time between home offices, co-working spaces, and traditional offices. This flexibility has given rise to a new breed of professional: the digital nomad. These individuals leverage technology to work from anywhere in the world, combining their careers with travel and adventure. From beachside cafes in Bali to mountain retreats in the Swiss Alps, digital nomads are redefining what it means to have a successful career. However, this new paradigm is not without challenges. The blurring of boundaries between work and personal life has led to increased reports of burnout and mental health issues. Many workers find it difficult to disconnect when their office is just a few steps from their bedroom. Managers face the challenge of leading distributed teams across multiple time zones, requiring new skills in communication and trust-building. Despite these challenges, most experts agree that the future of work will be increasingly flexible, remote, and technology-driven.",
                questions: [
                    { q: "What is becoming obsolete?", options: ["9-to-5 office jobs", "Computers", "Phones"], correct: 0 },
                    { q: "What accelerated the transformation?", options: ["COVID-19 pandemic", "Summer vacation", "Sports events"], correct: 0 },
                    { q: "What are hybrid models?", options: ["Mix of office and remote", "Only office", "Only remote"], correct: 0 },
                    { q: "Who are digital nomads?", options: ["Remote workers who travel", "Office workers", "Teachers"], correct: 0 },
                    { q: "What has increased due to blurred boundaries?", options: ["Burnout", "Happiness", "Sleep"], correct: 0 },
                    { q: "Where do digital nomads work from?", options: ["Anywhere in the world", "Only offices", "Only home"], correct: 0 },
                    { q: "What do managers face?", options: ["Leading distributed teams", "Cooking", "Driving"], correct: 0 },
                    { q: "What skills are needed for remote management?", options: ["Communication and trust", "Cooking", "Sports"], correct: 0 },
                    { q: "What will future work be?", options: ["Flexible and remote", "Rigid and office-only", "Non-existent"], correct: 0 },
                    { q: "What do workers find difficult?", options: ["Disconnecting from work", "Sleeping", "Eating"], correct: 0 }
                ]
            },
            reading: {
                title: "The Rise and Challenges of the Gig Economy",
                text: "The gig economy has fundamentally transformed how millions of people around the world earn their living. Unlike traditional employment, where workers commit to a single employer for a fixed salary and benefits, the gig economy is characterized by short-term contracts, freelance work, and task-based compensation. Platforms like Uber, Airbnb, Upwork, and Fiverr have made it easier than ever for individuals to monetize their skills, time, and assets. For many, this represents liberation from the constraints of traditional employment. Freelancers enjoy the freedom to choose their projects, set their schedules, and work from anywhere. A graphic designer in Manila can create logos for clients in New York; a developer in São Paulo can build websites for startups in Berlin. This democratization of work has created opportunities for talented individuals regardless of their geographic location.<br><br>However, the gig economy's flexibility comes at a significant cost. Unlike traditional employees, gig workers typically do not receive health insurance, paid vacation, sick leave, or retirement benefits. They bear the full burden of self-employment taxes and must constantly hustle to find new clients or gigs. Income can be unpredictable, fluctuating wildly from month to month. Many gig workers report feelings of isolation and anxiety about their financial security. The classification of gig workers has become a contentious legal and political issue. Are they independent contractors, as companies claim, or are they employees entitled to legal protections? Courts and legislatures around the world are grappling with this question, with significant implications for both workers and businesses. As the gig economy continues to grow, finding the right balance between flexibility and security remains one of the defining challenges of our time.",
                questions: [
                    { q: "What characterizes the gig economy?", options: ["Short-term contracts", "Lifetime employment", "Fixed salaries only"], correct: 0 },
                    { q: "What do platforms like Uber enable?", options: ["Monetizing skills", "Cooking", "Sleeping"], correct: 0 },
                    { q: "What do freelancers enjoy?", options: ["Freedom to choose projects", "Strict schedules", "No choice"], correct: 0 },
                    { q: "What don't gig workers receive?", options: ["Health insurance benefits", "Money", "Work"], correct: 0 },
                    { q: "What is a contentious issue?", options: ["Worker classification", "Weather", "Sports"], correct: 0 },
                    { q: "What can be unpredictable for gig workers?", options: ["Income", "The sun", "Gravity"], correct: 0 },
                    { q: "What do many gig workers report?", options: ["Isolation and anxiety", "Perfect happiness", "Nothing"], correct: 0 },
                    { q: "What is the defining challenge?", options: ["Balance between flexibility and security", "Cooking", "Sports"], correct: 0 },
                    { q: "Who can work for clients globally?", options: ["Freelancers anywhere", "Only local workers", "Nobody"], correct: 0 },
                    { q: "What are courts grappling with?", options: ["Worker classification", "Weather control", "Sports rules"], correct: 0 }
                ]
            },
            grammar: {
                title: "Modals of Deduction and Speculation",
                explanation: "Use 'must' for strong certainty, 'might/may/could' for possibility, and 'can't' for impossibility. For past deductions, add 'have' + past participle.",
                example: "He must be tired (I'm certain). She might have left already (It's possible).",
                quizzes: [
                    { question: "He _____ be at the office now; his car is there.", options: ["must", "can't", "won't"], correct: 0 },
                    { question: "She _____ have received the message; she's not responding.", options: ["might not", "must", "will"], correct: 0 },
                    { question: "They _____ be sleeping; it's 3 AM.", options: ["must", "can't", "won't"], correct: 0 },
                    { question: "It _____ be the right answer; it doesn't match.", options: ["can't", "must", "will"], correct: 0 },
                    { question: "He _____ have forgotten about the meeting.", options: ["might", "must not", "will"], correct: 0 },
                    { question: "She _____ be lying; I trust her completely.", options: ["can't", "must", "will"], correct: 0 },
                    { question: "They _____ have left early to catch the train.", options: ["must", "can't", "won't"], correct: 0 },
                    { question: "It _____ be raining; look at those dark clouds.", options: ["might", "must not", "can"], correct: 0 },
                    { question: "He _____ have known about the surprise party.", options: ["couldn't", "must", "will"], correct: 0 },
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
            videos: [
                { title: "Remote Work Is Here To Stay", channel: "CNBC", duration: "13:42", url: "https://www.youtube.com/watch?v=oSLAN0S3msk" },
                { title: "How To Work From Home Successfully", channel: "Thomas Frank", duration: "11:15", url: "https://www.youtube.com/watch?v=PLBYYdg0sfs" },
                { title: "The Future of Work After COVID-19", channel: "World Economic Forum", duration: "5:23", url: "https://www.youtube.com/watch?v=LbGjxp6xrho" }
            ]
        }
    ]
};
