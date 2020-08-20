import librosa
import soundfile as sf


class SoundTools:
    @staticmethod
    def load(input_file):
        data, sr = librosa.load(input_file)
        return (data, sr)

    @staticmethod
    def stretch(input_data, speed):
        return librosa.effects.time_stretch(input_data, speed)

    @staticmethod
    def pitch_shift(input_data, sr, numsteps):
        return librosa.effects.pitch_shift(input_data, sr, n_steps=numsteps, bins_per_octave=24)

    @staticmethod
    def save(input_data, sr, output_filename):
        sf.write(output_filename, input_data, sr, format='WAV')
