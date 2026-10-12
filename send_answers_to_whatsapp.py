import urllib.parse
import webbrowser

message = """🔑 *TEACHER ANSWER KEY — PROGRESS TEST (UNITS 4 TO 8)*
*English Language Course — CEFR B1 Level*
*Author: Cecilia Chiappero*

🎧 *SECTION a1: LISTENING (25 pts)*
1. B (15-min walk/bike)
2. A (Gut microbiome & immunity)
3. B (Echo chambers)
4. B (Democracy undermined)
5. B (AI tutoring & gamification)
6. A (Emotionally tangible issues)
7. A (Reported: said that... was)
8. A (Passive: can be designed)
9. A (Mixed conditional: had eaten... would feel)
10. B (Resilient, sustainable communities)

📖 *SECTION b1: READING (25 pts)*
1. B (Acceleration & transformation)
2. A (Engagement over veracity)
3. B (Gut-brain axis link to diet)
4. B (Serotonin)
5. B (Automobile sprawl & noise)
6. B (Services within walking distance)
7. A (Spark critical dialogue)
8. B (Personalized learning)
9. A (Veracity = truthfulness)
10. B (Empowers individuals to thrive)

📝 *SECTION c1: LANGUAGE IN USE (25 pts)*
1. B (was reading)
2. B (would launch)
3. B (had adopted)
4. A (would have been)
5. A (are exhibited)
6. A (is believed)
7. A (have something done)
8. B (inspected)
9. B (who)
10. A (which)
11. A (echo chambers)
12. B (microbiome)
13. A (conceptual)
14. A (sprawl)
15. A (gamification)

✍️ *d1. WRITING (15 pts):* Target 150–220 words. (Option A: Smart Cities & Wellbeing / Option B: Media Literacy & Digital Education).
🎙️ *e1. SPEAKING (10 pts):* 2 debate tasks (Media Literacy vs Regulation / 15-Minute City vs Suburbia).

📁 *Private Teacher PDF:* Progress_Test_Units_4_to_8_Teacher_Key.pdf
"""

encoded = urllib.parse.quote(message)
whatsapp_url = f"https://wa.me/5493517017850?text={encoded}"

print("WhatsApp URL generated:")
print(whatsapp_url)

# Open in user's default browser
webbrowser.open(whatsapp_url)
