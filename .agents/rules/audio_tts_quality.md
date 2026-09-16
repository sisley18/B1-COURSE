# Audio Quality & Web Speech API TTS Rule

When implementing Text-To-Speech (TTS) or Audio Engines using the Web Speech API for English courses:

1. **Natural & Fluid:** Always ensure the audio has a fluid American English rhythm without any robotic distortion. 
2. **Playback Rate:** NEVER digitally slow down the playback rate (e.g., `rate = 0.8`) for modern Neural or Premium voices. Slowing down neural voices below `1.0` introduces metallic, robotic, and synthetic digital artifacts.
3. **Pacing:** To achieve a natural conversational pace that is clear for EFL (English as a Foreign Language) learners, keep the `rate` at `1.0` and manage pacing by injecting natural breath pauses (e.g., chunking sentences and using `setTimeout`) rather than digitally stretching the audio.
