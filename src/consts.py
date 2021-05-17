from util.sound_tools import SoundTools

ALLOWED_EXTENSIONS = ['wav', 'mp3', 'flac',
                      'ogg', 'aiff', 'wavex', 'raw', 'mat5']

SETTING_TO_METHOD_MAP = {
    "audiospeed": SoundTools.stretch,
    "pitchshift": SoundTools.pitch_shift,
    "sizereduction": None,
    "deepfry": None,
    "distortion": None,
    "chordify": None
}

MODPREFIX = "altered_"
ENDPOINT_PREFIX = "http"
