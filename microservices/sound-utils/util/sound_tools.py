import librosa
import soundfile as sf

DEFAULT_EXPORT_FORMAT = 'WAV'


class SoundTools:
    @staticmethod
    def load(input_file):
        data, sr = librosa.load(input_file)
        return (data, sr)

    @staticmethod
    def stretch(args):
        return librosa.effects.time_stretch(args['input_data'], args['amount'])

    @staticmethod
    def pitch_shift(args):
        return librosa.effects.pitch_shift(args['input_data'], args['sr'], n_steps=args['amount'], bins_per_octave=24)

    @staticmethod
    def save(input_data, sr, output_filename):
        sf.write(output_filename, input_data, sr, format=DEFAULT_EXPORT_FORMAT)
