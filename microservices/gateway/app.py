from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

# To do: move to file storage microservice:
from werkzeug.utils import secure_filename

import os
import requests

# To do : move to file storage microservice:
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'wav', 'mp3'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# To do : move to file storage microservice:
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# To do : Add file storage microservice to deps:
dependencies = [
    (os.environ['SOUNDUTILS_HOST'], os.environ['SOUNDUTILS_PORT'])
]


# To do: map setting keys to appriopriate sound-utils microservice endpoint
setting_key_to_util_endpoint = {
    "audiospeed": None,
    "pitchshift": None,
    "sizereduction": None,
    "deepfry": None,
    "distortion": None,
    "chordify": None
}


# To do : move to file storage microservice:
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/healthstatus')
def index():
    for dependency in dependencies:
        res = requests.get("http://%s:%s/healthstatus" % dependency)
        if res.status_code != 200:
            return "Error: %s not healthy" % (dependency[0]), 400
    return jsonify(status="All Services Healthy")


@app.route('/upload', methods=['POST'])
@cross_origin()
def receive_audio_file():
    file = request.files.get('audiofile')
    apikey = request.form.get('key')

    # print(file.filename, flush=True)
    # print(file, flush=True)

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    if not apikey or len(apikey) < 4:
        return "Error: did not provide valid key", 400

    # To do : move to file storage microservice:
    if allowed_file(file.filename):
        filename = secure_filename(file.filename)
        dirname = secure_filename(apikey)
        try:
            os.makedirs(os.path.join(UPLOAD_FOLDER, dirname))
        except OSError:
            return "Error: did not provide unique key", 400  # dir already exists

        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], dirname, filename))

        return jsonify(status="File Successfully Uploaded")
    else:
        return "Error: File name not valid", 400


@app.route('/mod', methods=['POST'])
def modify_audio():
    data = request.get_json()

    print(data, flush=True)

    if not data['settings']:
        return "Error: did not provide audio settings", 400
    if not data['defaultsettings']:
        return "Error: did not provide default audio settings", 400
    if not data['key']:
        return "Error: did not provide API key", 400

    # To do : The below code belongs in the util and storage microservices

    # load the user's audio file
    filename = secure_filename(data['filename'])
    dirname = secure_filename(data['key'])

    # audio_bin, sr = SoundTools.load(os.path.join(
    #     app.config['UPLOAD_FOLDER'], dirname, filename))

    for key in data['settings']:
        # if the setting has been modified
        if data['settings'][key] != data['defaultsettings'][key]:
            args = {
                "input_data": audio_bin,
                "sr": sr,
                "amount": data['settings'][key]
            }
            audio_bin = setting_key_to_util_function[key](args)

    # SoundTools.save(audio_bin, sr, os.path.join(
    #     app.config['UPLOAD_FOLDER'], dirname, filename+"-modified"))

    return jsonify(status="Audio modifications applied successfully")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
