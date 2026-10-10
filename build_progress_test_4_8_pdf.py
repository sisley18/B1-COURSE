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
            self.drawString(54, 750, "Progress Test Units 4–8 — Teacher Answer Key & Evaluation Guide")
            self.setStrokeColor(colors.HexColor("#dddddd"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)

        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, footer_text)
        self.drawString(54, 36, "CONFIDENTIAL — FOR TEACHER EVALUATION ONLY | Cecilia Chiappero")
        self.setStrokeColor(colors.HexColor("#dddddd"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)

        self.restoreState()

def create_pdf(filename="Progress_Test_Units_4_to_8_Teacher_Key.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#6d28d9'),
        alignment=1,
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#4b5563'),
        alignment=1,
        spaceAfter=8
    )

    confidential_style = ParagraphStyle(
        'Confidential',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10,
        textColor=colors.HexColor('#dc2626'),
        alignment=1,
        spaceAfter=12
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

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1f2937')
    )

    q_title_style = ParagraphStyle(
        'QTitle',
        parent=body_style,
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#1e1b4b'),
        spaceBefore=4,
        spaceAfter=2
    )

    model_ans_style = ParagraphStyle(
        'ModelAns',
        parent=body_style,
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#065f46')
    )

    story = []

    # Banner
    story.append(Paragraph("📋 Progress Test (Units 4 to 8) — Official Teacher Answer Key", title_style))
    story.append(Paragraph("CEFR B1 / B1+ English Language Course &mdash; Cecilia Chiappero (Universidad Nacional de Córdoba)", subtitle_style))
    story.append(Paragraph("🔒 CONFIDENTIAL &mdash; FOR TEACHER USE ONLY (REMOVED FROM STUDENT PLATFORM VIEW)", confidential_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#7c3aed"), spaceAfter=10))

    # Helper function for grid tables
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
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 4),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#f3f4f6"))
        ]))
        return t

    # -------------------------------------------------------------
    # SECTION A1: LISTENING
    # -------------------------------------------------------------
    story.append(Paragraph("🎧 Section a1: Listening Comprehension (25 Marks)", h1_style))
    story.append(Paragraph("<i>Topic: Panel Discussion 'Reimagining Society — Media, Health, Art & Innovation' (10 items × 2.5 pts = 25 marks)</i>", body_style))
    story.append(Spacer(1, 4))

    listening_answers = [
        (1, "B", "15-minute walk or bike ride for essential services"),
        (2, "A", "Decreased commuting stress directly improves gut microbiome and immunity"),
        (3, "B", "Algorithms create echo chambers where misinformation spreads rapidly"),
        (4, "B", "Democracy itself is undermined without media literacy"),
        (5, "B", "Integrating AI tutoring and gamified learning platforms"),
        (6, "A", "Contemporary art makes invisible issues emotionally tangible"),
        (7, "A", "Reported Speech: Marcus said that media literacy WAS vital"),
        (8, "A", "Passive form: Smart cities CAN BE DESIGNED to prioritize pedestrians"),
        (9, "A", "Mixed Conditional: If people HAD EATEN better, they WOULD FEEL healthier"),
        (10, "B", "Goal: Building resilient, sustainable, mentally healthy communities")
    ]
    story.append(make_answer_table(listening_answers, cols=2))
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION B1: READING
    # -------------------------------------------------------------
    story.append(Paragraph("📖 Section b1: Reading & Textual Analysis (25 Marks)", h1_style))
    story.append(Paragraph("<i>Topic: 'The Interconnected Modern Era: Digital Ecosystems, Urban Life, and Human Wellbeing' (10 items × 2.5 pts = 25 marks)</i>", body_style))
    story.append(Spacer(1, 4))

    reading_answers = [
        (1, "B", "Unprecedented technological acceleration and structural transformation"),
        (2, "A", "Algorithms prioritize user engagement over veracity"),
        (3, "B", "Gut-brain axis links mental health to diet and physical environment"),
        (4, "B", "Serotonin (key neurotransmitter produced by gut bacteria)"),
        (5, "B", "Automobile sprawl and noise pollution damage human biology"),
        (6, "B", "Placing green spaces, markets, and healthcare within short walking distance"),
        (7, "A", "Contemporary art sparks critical dialogue on pollution and surveillance"),
        (8, "B", "AI and VR personalize learning at individual student pace"),
        (9, "A", "Vocabulary: 'Veracity' = truthfulness / accuracy"),
        (10, "B", "Overarching conclusion: Combining smart infrastructure & creativity empowers individuals")
    ]
    story.append(make_answer_table(reading_answers, cols=2))
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION C1: LANGUAGE IN USE
    # -------------------------------------------------------------
    story.append(Paragraph("📝 Section c1: Language in Use — Grammar & Vocabulary (25 Marks)", h1_style))
    story.append(Paragraph("<i>Grammar & Vocabulary across Units 4–8 (15 items × 1.67 pts = 25 marks)</i>", body_style))
    story.append(Spacer(1, 4))

    language_answers = [
        (1, "B (was reading)", "Reported Speech: present continuous -> past continuous"),
        (2, "B (would launch)", "Reported Speech: will -> would"),
        (3, "B (had adopted)", "Mixed Conditional: past condition uses past perfect"),
        (4, "A (would have been)", "Mixed Conditional: present state with past result"),
        (5, "A (are exhibited)", "Present Passive Voice"),
        (6, "A (is believed)", "Reporting Passive: 'It is believed that...'"),
        (7, "A (have)", "Causative Form: have + object + past participle"),
        (8, "B (inspected)", "Causative Form: get + object + past participle"),
        (9, "B (who)", "Relative Clause: pronoun for people"),
        (10, "A (which)", "Relative Clause: pronoun for things"),
        (11, "A (echo chambers)", "Unit 4 Media Vocabulary"),
        (12, "B (microbiome)", "Unit 5 Health Vocabulary"),
        (13, "A (conceptual)", "Unit 6 Art Vocabulary"),
        (14, "A (sprawl)", "Unit 7 Urban Infrastructure Vocabulary"),
        (15, "A (gamification)", "Unit 8 Educational Tech Vocabulary")
    ]
    story.append(make_answer_table(language_answers, cols=2))
    story.append(Spacer(1, 12))

    # -------------------------------------------------------------
    # SECTION D1 & E1: WRITING & SPEAKING GUIDES
    # -------------------------------------------------------------
    story.append(Paragraph("✍️ Section d1: Writing Composition (15 Marks) & 🎙️ Section e1: Speaking (10 Marks)", h1_style))

    writing_models = [
        (
            "Option A: Smart Cities & Wellbeing (150–220 words)",
            "How 15-minute smart city design and balanced technology use improve physical health and mental stress.",
            "15-minute city, gut-brain axis, reported speech, causative form, relative clauses",
            "The 15-minute city model, which was introduced to address urban sprawl, has transformed how we view municipal health. In recent years, urban planners reported that residents living in walkable neighborhoods experienced lower stress levels and improved immunity. If cities had prioritized automobile infrastructure decades ago, communities would suffer from severe isolation today. By having green spaces and local markets constructed within a short walk, citizens are encouraged to exercise daily. Furthermore, reducing long commutes directly benefits the gut-brain axis, as lower chronic stress enhances gut microbiome diversity. In addition, schools that incorporate media literacy help residents navigate digital information without digital burnout. In conclusion, combining human-centered city design and balanced technology empowers citizens to lead healthier lives."
        ),
        (
            "Option B: Media Literacy & Digital Education (150–220 words)",
            "How schools and digital platforms empower citizens to combat fake news while harnessing AI.",
            "echo chambers, gamification, passive voice, mixed conditional, reported speech",
            "In today's digital era, social media algorithms often create echo chambers where fake news spreads rapidly. Education experts reported that media literacy is no longer optional for modern citizens. If schools had integrated digital critical thinking earlier, fewer people would be misled by viral misinformation today. Currently, gamified learning platforms are being deployed in classrooms to teach students how to verify online sources. Moreover, artificial intelligence, which provides personalized tutoring, allows learners to study at their own pace. By having educational content adapted to individual needs, teachers can focus on developing critical thinking. Ultimately, empowering citizens with media literacy ensures that technology serves democracy effectively."
        )
    ]

    for q_num, title, target_vocab, model_text in writing_models:
        q_p = Paragraph(f"<b>Writing Model {q_num}:</b>", q_title_style)
        vocab_p = Paragraph(f"<font color='#d97706'><b>Grammar & Vocab Targets:</b></font> {target_vocab}", body_style)
        ans_p = Paragraph(f"<font color='#047857'><b>Model Essay:</b></font> \"{model_text}\"", model_ans_style)

        t_box = Table([[q_p], [vocab_p], [ans_p]], colWidths=[504])
        t_box.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LINELEFT', (0,0), (-1,-1), 3, colors.HexColor('#8b5cf6')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0'))
        ]))
        story.append(t_box)
        story.append(Spacer(1, 8))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully: {filename}")

if __name__ == "__main__":
    create_pdf()
