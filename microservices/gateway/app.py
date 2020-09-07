from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import os
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16Mb file size limit
ENDPOINT_PREFIX = "http"


def build_api_path(prefix, host, port):
    return "%s://%s:%s" % (prefix, host, port)


dependencies = {
    "soundutils": build_api_path(ENDPOINT_PREFIX, os.environ['SOUNDUTILS_HOST'], os.environ['SOUNDUTILS_PORT']),
    "filestore": build_api_path(ENDPOINT_PREFIX, os.environ['FILESTORE_HOST'], os.environ['FILESTORE_PORT'])
}


# To do: map setting keys to appriopriate sound-utils microservice endpoint
setting_key_to_util_endpoint = {
    "audiospeed": None,
    "pitchshift": None,
    "sizereduction": None,
    "deepfry": None,
    "distortion": None,
    "chordify": None
}


@app.route('/healthstatus')
def healthcheck():
    for key in dependencies:
        res = requests.get(dependencies[key] + "/healthstatus")
        if res.status_code != 200:
            return "Error: %s not healthy" % (key), 400
    return jsonify(status="All Services Healthy")


@app.route('/upload', methods=['POST'])
@cross_origin()
def receive_audio_file():
    file = request.files.get('audiofile')
    apikey = request.form.get('key')

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    # data to be sent to filestore microservice
    postdata = {
        'key': apikey
    }

    postfiles = {
        'file': (file.filename, file)
    }

    # print(file, flush=True)

    res = requests.post(
        url=dependencies['filestore'] + "/save", files=postfiles, data=postdata)

    if res.status_code == 200:
        return jsonify(status="File Successfully Uploaded")
    else:
        return res.text, res.status_code


# @app.route('/mod', methods=['POST'])
# @cross_origin()
# def modify_audio():
#     data = request.get_json()

#     print(data, flush=True)

#     if not data['settings']:
#         return "Error: did not provide audio settings", 400
#     if not data['defaultsettings']:
#         return "Error: did not provide default audio settings", 400
#     if not data['key']:
#         return "Error: did not provide API key", 400

#     # To do : The below code belongs in the util and storage microservices

#     # load the user's audio file
#     filename = secure_filename(data['filename'])
#     dirname = secure_filename(data['key'])

#     # audio_bin, sr = SoundTools.load(os.path.join(
#     #     app.config['UPLOAD_FOLDER'], dirname, filename))

#     for key in data['settings']:
#         # if the setting has been modified
#         if data['settings'][key] != data['defaultsettings'][key]:
#             args = {
#                 "input_data": audio_bin,
#                 "sr": sr,
#                 "amount": data['settings'][key]
#             }
#             audio_bin = setting_key_to_util_function[key](args)

#     # SoundTools.save(audio_bin, sr, os.path.join(
#     #     app.config['UPLOAD_FOLDER'], dirname, filename+"-modified"))

#     return jsonify(status="Audio modifications applied successfully")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
