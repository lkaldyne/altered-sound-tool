from flask import Flask, request, jsonify, send_from_directory, safe_join
from werkzeug.utils import secure_filename
from util.sound_tools import SoundTools, DEFAULT_EXPORT_FORMAT
import os
import json

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

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def fix_filename_ext(filename):
    return "".join(filename.split(".")[0:-1]) + "." + DEFAULT_EXPORT_FORMAT.lower()


def load_modifier_settings():
    with open(os.path.join(os.getcwd(), 'util', 'modifier_settings.json')) as f:
        return json.load(f)


@app.route('/healthstatus')
def index():
    return jsonify(status="Sound Utils healthy")


@app.route('/save-file', methods=['POST'])
def save_file():
    file = request.files.get('file')
    apikey = request.form.get('key')

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    if not apikey or len(apikey) < 4:
        return "Error: did not provide valid key", 400

    # To do: Should probably have better security than just checking extension in filename.
    if allowed_file(file.filename):
        filename = secure_filename(file.filename)
        dirname = secure_filename(apikey)
        try:
            os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], dirname))
        except OSError:
            return "Error: did not provide unique key", 400  # dir already exists

        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], dirname, filename))

        return jsonify(status="File Successfully Saved")
    else:
        return "Error: File type not valid", 400


@app.route('/serve-file', methods=['GET'])
def serve_file():
    data = request.get_json()

    apikey = data['key']
    name = data['filename']
    is_mod = data['mod']

    filename = secure_filename(name)

    if is_mod:
        filename = MODPREFIX+fix_filename_ext(filename)

    dirname = secure_filename(apikey)

    try:
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], dirname), filename=filename, as_attachment=True)

    except FileNotFoundError:
        return "Error: File not found", 400


@app.route('/get-modifier-settings', methods=['GET'])
def get_modifier_settings():
    return jsonify(status="success", modifier_settings=load_modifier_settings())


@app.route('/audio-mod', methods=['POST'])
def do_audio_mod():
    data = request.get_json()

    apikey = data['key']
    name = data['filename']
    settings = data['settings']
    defaultsettings = load_modifier_settings()

    filename = secure_filename(name)
    dirname = secure_filename(apikey)

    audiodata, sr = SoundTools.load(os.path.join(
        app.config['UPLOAD_FOLDER'], dirname, filename))

    for key in settings:
        val = settings[key]
        if val != defaultsettings[key]['default']:
            # setting has been modified
            args = {
                "input_data": audiodata,
                "amount": val,
                "sr": sr
            }
            audiodata = SETTING_TO_METHOD_MAP[key](args)

    SoundTools.save(audiodata, sr, os.path.join(
        app.config['UPLOAD_FOLDER'], dirname, MODPREFIX+fix_filename_ext(filename)))

    return jsonify(status="File Successfully Modified")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
