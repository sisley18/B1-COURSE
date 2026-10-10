import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#666666"))
        
        # Header (Only after page 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "B1 English Language Course — Teacher Answer Key & Written Solutions")
            self.setStrokeColor(colors.HexColor("#dddddd"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, footer_text)
        self.drawString(54, 36, "CONFIDENTIAL — FOR TEACHER / EVALUATION USE ONLY | Cecilia Chiappero")
        self.setStrokeColor(colors.HexColor("#dddddd"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        
        self.restoreState()

def create_pdf(filename="B1_Exams_Answer_Key.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#4c1d95'),
        alignment=1,
        spaceAfter=3
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#6b7280'),
        alignment=1,
        spaceAfter=10
    )

    confidential_style = ParagraphStyle(
        'Confidential',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10,
        textColor=colors.HexColor('#dc2626'),
        alignment=1,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#5b2c6f'),
        spaceBefore=12,
        spaceAfter=5
    )

    h2_style = ParagraphStyle(
        'SubSectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#6d28d9'),
        spaceBefore=7,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#1f2937')
    )

    q_title_style = ParagraphStyle(
        'QTitle',
        parent=body_style,
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1e1b4b'),
        spaceBefore=4,
        spaceAfter=2
    )

    model_ans_style = ParagraphStyle(
        'ModelAns',
        parent=body_style,
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#065f46')
    )

    story = []

    # Title Banner
    story.append(Paragraph("📋 Teacher Answer Key & Expected Written Solutions", title_style))
    story.append(Paragraph("B1 English Language Course &mdash; Cecilia Chiappero", subtitle_style))
    story.append(Paragraph("🔒 CONFIDENTIAL &mdash; EXAM SOLUTIONS, MARKING SCHEMES & MODEL WRITTEN ANSWERS", confidential_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#7c3aed"), spaceAfter=10))

    # Helper table generator
    def make_answer_table(data_tuples, cols=2):
        formatted_data = []
        row = []
        for q_num, ans, exp in data_tuples:
            text = f"<b>Q{q_num}.</b> <font color='#047857'><b>{ans}</b></font>"
            if exp:
                text += f" <font color='#6b7280'>({exp})</font>"
            row.append(Paragraph(text, body_style))
            if len(row) == cols:
                formatted_data.append(row)
                row = []
        if row:
            while len(row) < cols:
                row.append(Paragraph("", body_style))
            formatted_data.append(row)

        col_width = (504 / cols)
        t = Table(formatted_data, colWidths=[col_width]*cols)
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2),
            ('TOPPADDING', (0,0), (-1,-1), 2),
            ('LEFTPADDING', (0,0), (-1,-1), 3),
            ('RIGHTPADDING', (0,0), (-1,-1), 3),
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#f3f4f6"))
        ]))
        return t

    def make_written_answers_box(q_and_a_list):
        elements = []
        for q_num, question_text, key_vocab, model_ans in q_and_a_list:
            q_p = Paragraph(f"<b>Question {q_num}:</b> {question_text}", q_title_style)
            vocab_p = Paragraph(f"<font color='#d97706'><b>Key Vocab Target:</b></font> {key_vocab}", body_style)
            ans_p = Paragraph(f"<font color='#047857'><b>Expected Model Answer:</b></font> \"{model_ans}\"", model_ans_style)
            
            box_data = [[q_p], [vocab_p], [ans_p]]
            t_box = Table(box_data, colWidths=[504])
            t_box.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
                ('LEFTPADDING', (0,0), (-1,-1), 8),
                ('RIGHTPADDING', (0,0), (-1,-1), 8),
                ('TOPPADDING', (0,0), (-1,-1), 4),
                ('BOTTOMPADDING', (0,0), (-1,-1), 4),
                ('LINELEFT', (0,0), (-1,-1), 3, colors.HexColor('#6366f1')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
            ]))
            elements.append(t_box)
            elements.append(Spacer(1, 4))
        return elements

    # -------------------------------------------------------------
    # EXAM 1
    # -------------------------------------------------------------
    story.append(Paragraph("Progress Exam 1 — Units 1 & 2", h1_style))
    story.append(Paragraph("Section A — Listening Answers (2 marks each)", h2_style))
    exam1_listening = [
        ("1", "C", "40%"), ("2", "B", "moved more slowly"),
        ("3", "C", "Social media manager"), ("4", "A", "Adaptability"),
        ("5", "B", "AI ethics, robot maintenance"), ("6", "C", "Stanford"),
        ("7", "B", "14%"), ("8", "C", "Isolated/disconnected"),
        ("9", "A", "Real-time translation"), ("10", "B", "Industrial Revolution")
    ]
    story.append(make_answer_table(exam1_listening, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section C — Grammar & Vocabulary Answers (1 mark each)", h2_style))
    exam1_grammar = [
        ("1", "B", "automating"), ("2", "A", "transformed"),
        ("3", "C", "digital"), ("4", "A", "will be replaced"),
        ("5", "C", "scale up"), ("6", "A", "Have"),
        ("7", "B", "invested"), ("8", "C", "learning"),
        ("9", "A", "digital"), ("10", "C", "had been working")
    ]
    story.append(make_answer_table(exam1_grammar, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section B — Expected Written Answers & Model Sample (5 marks each)", h2_style))
    exam1_written = [
        ("1", "Do you think artificial intelligence is more of an opportunity or a threat to society?", "artificial intelligence, automate tasks, machine learning, disruptive technology, digital transformation", "In my opinion, artificial intelligence is primarily a great opportunity for modern society. Firstly, machine learning allows us to automate repetitive tasks, which increases productivity in industries like healthcare and finance. Secondly, digital transformation creates entirely new job categories, such as AI ethics specialists and data analysts. Although some disruptive technologies will cause job displacement, workers who focus on lifelong learning and adaptability will thrive in the global market."),
        ("2", "Would you prefer to work remotely or in an office? Compare both options.", "digital nomad, work-life balance, remote team, virtual collaboration, productivity", "While working in an office provides face-to-face social interaction and structured routines, I prefer working remotely as a digital nomad. Remote work offers better work-life balance because employees save time on daily commuting. Furthermore, virtual collaboration tools allow remote teams to work together effectively across different time zones. Provided that workers manage their time well to avoid burnout, remote work offers greater personal freedom and higher overall productivity."),
        ("3", "How has technology changed communication in the modern workplace?", "virtual collaboration, instant messaging, cloud platforms, real-time feedback", "Technology has fundamentally transformed modern workplace communication in several ways. First, instant messaging platforms and video conferencing software have replaced formal email threads, enabling real-time collaboration. Second, cloud-based storage allows global teams to edit documents simultaneously without physical meetings. Finally, automated scheduling software eliminates time-zone conflicts when organizing international conference calls."),
        ("4", "Imagine launching a global online business. What challenges would you face?", "global market, cross-cultural communication, time zone differences, e-commerce", "Launching an e-commerce business in the global market presents two major challenges: cross-cultural communication and time zone differences. To overcome cultural barriers, I would hire local digital marketing experts who understand target audiences. To manage time zone conflicts, our remote team would rely on asynchronous messaging tools and AI-powered customer support chatbots to ensure 24/7 client service.")
    ]
    for el in make_written_answers_box(exam1_written):
        story.append(el)

    story.append(PageBreak())

    # -------------------------------------------------------------
    # EXAM 2
    # -------------------------------------------------------------
    story.append(Paragraph("Progress Exam 2 — Units 3 & 4", h1_style))
    story.append(Paragraph("Section A — Listening Answers (2 marks each)", h2_style))
    exam2_listening = [
        ("1", "B", "15 years"), ("2", "C", "emotional reactions"),
        ("3", "B", "matching beliefs"), ("4", "C", "check source"),
        ("5", "A", "at least three"), ("6", "B", "cloud thinking"),
        ("7", "C", "responsibility"), ("8", "A", "secondary schools"),
        ("9", "C", "Finland"), ("10", "A", "late 1990s")
    ]
    story.append(make_answer_table(exam2_listening, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section C — Grammar & Vocabulary Answers (1 mark each)", h2_style))
    exam2_grammar = [
        ("1", "A", "reducing"), ("2", "C", "Both A and B are possible"),
        ("3", "A", "should have"), ("4", "C", "greenhouse"),
        ("5", "B", "verifies"), ("6", "B", "continue"),
        ("7", "C", "editorial"), ("8", "A", "convinced"),
        ("9", "C", "carbon"), ("10", "B", "literacy")
    ]
    story.append(make_answer_table(exam2_grammar, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section B — Expected Written Answers & Model Sample (5 marks each)", h2_style))
    exam2_written = [
        ("1", "What is the most urgent environmental problem facing the world today? What steps should be taken?", "carbon footprint, renewable energy, fossil fuels, greenhouse gases, sustainable development", "The most urgent environmental crisis facing humanity today is global climate change driven by greenhouse gas emissions. Governments must urgently invest in renewable energy sources like wind and solar power while phasing out fossil fuels. On an individual level, citizens should reduce their carbon footprint by opting for public transportation, eating less meat, and supporting sustainable development initiatives in their local communities."),
        ("2", "Describe a time when you or someone you know shared or believed false information.", "fake news, misleading, verify, credible source, misinformation", "A few months ago, a friend shared a viral article on social media claiming a major health risk. However, after reading it carefully, I noticed the article lacked evidence and came from an unverified website. We soon realized it was clickbait fake news designed to generate outrage. This experience taught me the importance of verifying information with credible sources before sharing content online."),
        ("3", "Do individuals make a difference to climate change, or is it corporate/government responsibility?", "individual action, corporate footprint, strict regulations, shared responsibility", "I believe that tackling climate change requires shared responsibility between individuals, corporations, and governments. While individual actions—such as recycling and conserving energy—raise public awareness, large corporations generate the vast majority of industrial pollution. Therefore, governments must enact strict environmental regulations, and corporations must adopt green technology to achieve meaningful global impact."),
        ("4", "How can schools help students become more critical consumers of information?", "media literacy, critical thinking, bias, fact-checking, editorial standards", "Schools can foster critical thinking and media literacy through practical curriculum integration. First, teachers should guide students in fact-checking online articles by evaluating editorial standards and author credibility. Second, schools should teach students how social media algorithms create echo chambers and amplify bias. By analyzing deceptive news stories in class, students learn to distinguish verified facts from misleading propaganda.")
    ]
    for el in make_written_answers_box(exam2_written):
        story.append(el)

    story.append(PageBreak())

    # -------------------------------------------------------------
    # EXAM 3
    # -------------------------------------------------------------
    story.append(Paragraph("Progress Exam 3 — Units 5 & 6", h1_style))
    story.append(Paragraph("Section A — Listening Answers (2 marks each)", h2_style))
    exam3_listening = [
        ("1", "A", "over 12 years"), ("2", "C", "reduced stigma"),
        ("3", "B", "marketed for serious conditions"), ("4", "B", "physical exercise"),
        ("5", "C", "30 min, 5 times/week"), ("6", "A", "sleep quality"),
        ("7", "B", "15 cigarettes/day"), ("8", "C", "fruit, veg, whole grains"),
        ("9", "B", "gut-brain connection"), ("10", "C", "overcomplicate it")
    ]
    story.append(make_answer_table(exam3_listening, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section C — Grammar & Vocabulary Answers (1 mark each)", h2_style))
    exam3_grammar = [
        ("1", "B", "lower"), ("2", "A", "provoked"),
        ("3", "B", "suffering"), ("4", "C", "preserve"),
        ("5", "C", "ate"), ("6", "C", "evoke"),
        ("7", "A", "coping"), ("8", "B", "had been doing"),
        ("9", "C", "balanced"), ("10", "A", "thought-provoking")
    ]
    story.append(make_answer_table(exam3_grammar, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section B — Expected Written Answers & Model Sample (5 marks each)", h2_style))
    exam3_written = [
        ("1", "Living a balanced lifestyle is essential. What habits do you have or would like to develop?", "mental health, physical wellbeing, stress management, mindfulness, balanced diet, work-life balance", "To maintain physical wellbeing and positive mental health, I prioritize three daily habits. First, I eat a balanced diet rich in vegetables, whole grains, and lean proteins, which supports the gut-brain connection. Second, I practice stress management by doing 30 minutes of daily physical exercise. Finally, I dedicate time to mindfulness and offline relaxation to maintain a healthy work-life balance and prevent job burnout."),
        ("2", "Think of a artwork, film, or book that deeply moved you. Why does it affect you emotionally?", "cultural heritage, artistic expression, evoke emotion, aesthetic, provoke thought", "A film that deeply moved me is Interstellar. The story uses stunning visual aesthetics and a powerful musical score to evoke deep emotions regarding love, time, and human survival. Beyond its artistic expression, the film provokes thought about planetary preservation and our collective future, demonstrating how contemporary cinema can connect scientific concepts with profound human feelings."),
        ("3", "Should governments fund the arts during times of economic hardship?", "cultural heritage, public funding, artistic release, economic driver", "Although funding healthcare and education is undeniably critical during economic crises, governments must continue supporting cultural heritage and the arts. Artistic expression provides essential emotional release, community unity, and mental health relief during stressful times. Furthermore, the creative industries generate significant employment and tourist revenue, making public art investment a vital economic driver."),
        ("4", "Modern life is increasingly stressful. What are main causes and coping solutions?", "burnout, anxiety, coping strategies, preventive care, stigma", "The primary drivers of modern stress are constant digital connectivity, workplace pressure, and financial anxiety. To cope, individuals should implement healthy boundaries, such as taking digital detoxes and engaging in physical exercise. On a societal level, companies and institutions must promote preventive mental health care, offer flexible working hours, and actively reduce the stigma surrounding anxiety and burnout.")
    ]
    for el in make_written_answers_box(exam3_written):
        story.append(el)

    story.append(PageBreak())

    # -------------------------------------------------------------
    # EXAM 4
    # -------------------------------------------------------------
    story.append(Paragraph("Progress Exam 4 — Units 7 & 8", h1_style))
    story.append(Paragraph("Section A — Listening Answers (2 marks each)", h2_style))
    exam4_listening = [
        ("1", "C", "twenty years"), ("2", "B", "technology and data"),
        ("3", "A", "report problems via phone"), ("4", "B", "digital divide"),
        ("5", "C", "elderly + low-income"), ("6", "A", "data privacy"),
        ("7", "B", "who owns the data"), ("8", "C", "OECD"),
        ("9", "B", "more than 60%"), ("10", "C", "a great city")
    ]
    story.append(make_answer_table(exam4_listening, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section C — Grammar & Vocabulary Answers (1 mark each)", h2_style))
    exam4_grammar = [
        ("1", "B", "sustainable"), ("2", "C", "learning"),
        ("3", "C", "invested"), ("4", "B", "digital"),
        ("5", "C", "critical"), ("6", "B", "will have built"),
        ("7", "A", "Vocational"), ("8", "B", "development"),
        ("9", "C", "will speak"), ("10", "B", "quality")
    ]
    story.append(make_answer_table(exam4_grammar, 2))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Section B — Expected Written Answers & Model Sample (5 marks each)", h2_style))
    exam4_written = [
        ("1", "Describe the ideal smart city of the future. What technologies would it use?", "smart infrastructure, sustainable urban development, public transport, digital inclusion, quality of life", "An ideal smart city utilizes integrated smart infrastructure to enhance urban quality of life. It features zero-emission public transport, AI-managed energy grids, and smart sensors that reduce traffic congestion. Crucially, the city ensures digital inclusion so that elderly and low-income residents can easily access public services online, balancing rapid technological growth with environmental sustainability."),
        ("2", "Is university education essential today, or are other paths just as valuable?", "lifelong learning, vocational training, higher education, critical thinking, career development", "While higher education provides valuable critical thinking skills and formal qualifications, it is no longer the sole path to career success. Specialized vocational training and online professional certificates offer practical skills tailored to evolving industry needs. In today's dynamic job market, a commitment to lifelong learning and adaptability is ultimately more crucial than a traditional university degree."),
        ("3", "How is your city/town changing? What urban improvements would you recommend?", "urban development, public transport, pedestrian zones, green spaces", "My city is currently expanding its commercial districts, which has increased traffic congestion and air pollution. To address these issues, I recommend investing in green public transport, constructing dedicated bicycle lanes, and creating pedestrian-friendly parks. These urban development initiatives would significantly improve air quality and enhance the overall standard of living for all residents."),
        ("4", "How should education systems prepare students for an AI-transformed world?", "adaptability, creativity, critical thinking, tech literacy, emotional intelligence", "To prepare students for an automated future, education systems must shift focus from rote memorization toward developing uniquely human competencies. Schools should emphasize critical thinking, creative problem-solving, and emotional intelligence—skills that AI cannot easily replicate. Additionally, teaching digital literacy and adaptability ensures students can seamlessly learn new technologies throughout their careers.")
    ]
    for el in make_written_answers_box(exam4_written):
        story.append(el)

    story.append(PageBreak())

    # -------------------------------------------------------------
    # COMPREHENSIVE PROGRESS TEST (UNITS 1–6)
    # -------------------------------------------------------------
    story.append(Paragraph("Comprehensive Progress Exam 1 (Units 1–6)", h1_style))
    story.append(Paragraph("Section a1, b1, c1 — Objective Auto-Graded Keys", h2_style))
    
    pt_obj = [
        ("Listening (a1)", "1:B, 2:B, 3:A, 4:B, 5:B, 6:C, 7:B, 8:A, 9:B, 10:B", "(25 marks total)"),
        ("Reading (b1)", "1:B, 2:B, 3:A, 4:B, 5:A, 6:TRUE, 7:FALSE, 8:TRUE, 9:NOT GIVEN, 10:TRUE", "(25 marks total)"),
        ("Grammar (c1)", "1:A, 2:B, 3:A, 4:B, 5:B, 6:A, 7:B, 8:B, 9:B, 10:A, 11:A, 12:B, 13:A, 14:B, 15:A", "(25 marks total)")
    ]
    for section_name, ans_str, mark_info in pt_obj:
        story.append(Paragraph(f"<b>{section_name}</b> {mark_info}: <font color='#047857'><b>{ans_str}</b></font>", body_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Section d1 — Writing: Integrated Round-Off Essay Model (15 marks)", h2_style))
    
    essay_model_text = (
        "The rapid advance of artificial intelligence and remote work models has ignited intense debate regarding "
        "the future of work and human wellbeing. On one hand, critics argue that constant digital connectivity erodes "
        "the boundary between professional and personal life, causing widespread digital burnout, physical fatigue, and "
        "social isolation. Furthermore, algorithms can trap workers in stressful digital environments.<br/><br/>"
        "On the other hand, proponents highlight how remote work decentralized traditional corporate structures, enabling "
        "professionals to become digital nomads with greater personal freedom and improved work-life balance. Economically, "
        "adopting cloud collaboration tools allows companies to scale up operations while significantly reducing their corporate "
        "carbon footprint by eliminating daily commutes and reducing office energy demands. Furthermore, emerging wellness practices—such "
        "as mindfulness apps and gut-health nutrition—help employees build mental resilience against modern workplace stress.<br/><br/>"
        "In my opinion, technology itself is neutral; its impact depends on how we regulate its use. Provided that enterprises establish "
        "clear boundaries regarding working hours and invest in employee mental health, automation and remote models offer an unprecedented "
        "opportunity to create a greener, more flexible society. Ultimately, true progress requires harnessing technological efficiency while "
        "preserving human connection and environmental health."
    )

    essay_p = Paragraph(f"<b>Option A Opinion Essay Model Sample (210 words):</b><br/><i>\"{essay_model_text}\"</i>", model_ans_style)
    t_essay = Table([[essay_p]], colWidths=[504])
    t_essay.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ecfdf5')),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LINELEFT', (0,0), (-1,-1), 3.5, colors.HexColor('#10b981')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#a7f3d0')),
    ]))
    story.append(t_essay)
    story.append(Spacer(1, 8))

    story.append(Paragraph("Section e1 — Speaking Oral Round-Off Assessment Talking Points (10 marks)", h2_style))
    spk_pts = [
        ("Task 1: Work & Tech", "By 2035, AI will have automated routine data tasks. Remote work allows flexibility across global markets, though setting firm boundaries is vital to prevent burnout."),
        ("Task 2: Sustainability & Media", "Critical media literacy is essential because online echo chambers spread misinformation. Citizens must verify scientific reports to hold corporations accountable for their carbon footprint."),
        ("Task 3: Health & Art", "Combining physical exercise, balanced nutrition, and artistic expression fosters emotional resilience and provides a vital counterweight to fast-paced digital life.")
    ]
    for task_name, talking_pt in spk_pts:
        tp_p = Paragraph(f"<b>{task_name}:</b> <font color='#047857'>\"{talking_pt}\"</font>", body_style)
        story.append(tp_p)
        story.append(Spacer(1, 2))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Updated PDF successfully generated: {filename}")

if __name__ == "__main__":
    create_pdf()
