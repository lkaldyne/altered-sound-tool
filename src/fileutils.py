from flask import request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from util.sound_tools import SoundTools, DEFAULT_EXPORT_FORMAT
from consts import ALLOWED_EXTENSIONS, SETTING_TO_METHOD_MAP, MODPREFIX
import os


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def fix_filename_ext(filename):
    return "".join(filename.split(".")[0:-1]) + "." + DEFAULT_EXPORT_FORMAT.lower()


def save_file(loc, file, apikey):

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    if not apikey or len(apikey) < 4:
        return "Error: did not provide valid key", 400

    # To do: Should probably have better security than just checking extension in filename.
    if allowed_file(file.filename):
        filename = secure_filename(file.filename)
        dirname = secure_filename(apikey)
        try:
            os.makedirs(os.path.join(loc, dirname))
        except OSError:
            return "Error: did not provide unique key", 400  # dir already exists

        file.save(os.path.join(
            loc, dirname, filename))

        return jsonify(
            status="File Successfully Saved",
            key=apikey
        )
    else:
        return "Error: File type not valid", 400


def serve_file(loc, apikey, name, is_mod):

    filename = secure_filename(name)

    if is_mod:
        filename = MODPREFIX+fix_filename_ext(filename)

    dirname = secure_filename(apikey)

    try:
        return send_from_directory(os.path.join(loc, dirname), filename=filename, as_attachment=True)

    except FileNotFoundError:
        return "Error: File not found", 400


def get_modifier_settings():
    return jsonify(status="success", modifier_settings=load_modifier_settings())


def do_audio_mod(loc, apikey, name, settings, defaultsettings):

    filename = secure_filename(name)
    dirname = secure_filename(apikey)

    audiodata, sr = SoundTools.load(os.path.join(
        loc, dirname, filename))

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
        loc, dirname, MODPREFIX+fix_filename_ext(filename)))

    return jsonify(status="File Successfully Modified")
