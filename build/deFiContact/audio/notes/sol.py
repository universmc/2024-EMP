import midi
import time

# Create a new MIDI file with one track
mid = midi.MidiFile(1)

# Add a track name and tempo
track = 0
time.sleep(1)
mid.addTrackName(track, 0, "Sol")
mid.addTempo(track, 0, 500000) # tempo in microseconds per beat

# Set the time signature
mid.addTimeSignature(track, 0, 0, 4, 4) # time signature of 4/4

# Calculate the number of ticks per beat
ticks_per_beat = midi.TimeSignature.ticksPerBeat(mid.ticksPerBeat)

# Calculate the number of ticks per quarter note
ticks_per_quarter = ticks_per_beat // 4

# Add a note on event for the C note (MIDI note 60) with a duration of 5 seconds
note_on_time = 0
note_off_time = 5 * ticks_per_quarter # 5 seconds
mid.addNote(track, 0, 60, note_on_time, ticks_per_quarter, 100) # velocity of 100
mid.addNote(track, 0, 60, note_off_time, ticks_per_quarter, 0)

# Write the MIDI file
with open("sol.midi", "wb") as output_file:
    mid.writeFile(output_file)