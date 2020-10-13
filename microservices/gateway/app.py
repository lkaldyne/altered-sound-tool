from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import os
import requests
import uuid

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16Mb file size limit
ENDPOINT_PREFIX = "http"


def build_api_path(prefix, host, port):
    return "%s://%s:%s" % (prefix, host, port)


def generate_key():
    return str(uuid.uuid1())


dependencies = {
    "soundutils": build_api_path(ENDPOINT_PREFIX, os.environ['SOUNDUTILS_HOST'], os.environ['SOUNDUTILS_PORT'])
    # "filestore": "To be replaced with AWS S3 bucket endpoint"
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

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    generated_key = generate_key()

    postdata = {
        'key': generated_key
    }

    postfiles = {
        'file': (file.filename, file)
    }

    res = requests.post(
        url=dependencies['soundutils'] + "/save-file", files=postfiles, data=postdata)

    if res.status_code == 200:
        return jsonify(
            status="File Successfully Uploaded",
            key=generated_key
        )
    else:
        return res.text, res.status_code


def get_file(apikey, filename, mod=True):
    data = {
        'key': apikey,
        'filename': filename,
        'mod': mod
    }

    res = requests.get(
        url=dependencies['soundutils'] + "/serve-file", json=data)

    return Response(
        res.content,  # content from the service has the file data
        # headers included to trigger browser download
        headers=dict(res.headers)
    )


@app.route('/get-file/<string:apikey>/<string:filename>', methods=['GET'])
@cross_origin()
def get_file_original(apikey, filename):
    return get_file(apikey, filename, False)


@app.route('/get-modified-file/<string:apikey>/<string:filename>', methods=['GET'])
@cross_origin()
def get_file_modified(apikey, filename):
    return get_file(apikey, filename)


@app.route('/mod', methods=['POST'])
@cross_origin()
def modify_audio():
    data = request.get_json()

    if not data['settings']:
        return "Error: did not provide audio settings", 400
    if not data['defaultSettings']:
        return "Error: did not provide default audio settings", 400
    if not data['key']:
        return "Error: did not provide API key", 400
    if not data['filename']:
        return "Error: did not provide file name", 400

    res = requests.post(
        url=dependencies['soundutils'] + "/audio-mod", json=data)

    return res.text, res.status_code


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
