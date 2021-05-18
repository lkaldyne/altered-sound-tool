from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import os
import requests
import uuid
import fileutils
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 16Mb file size limit
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')
app.config['MODIFIER_DEFAULTS'] = json.load(
    open(os.path.join(os.getcwd(), 'util', 'modifier_settings.json'))
)


def generate_key():
    return str(uuid.uuid1())


@app.route('/healthstatus')
def healthcheck():
    return jsonify(status="Server Healthy")


@app.route('/upload', methods=['POST'])
@cross_origin()
def receive_audio_file():
    file = request.files.get('audiofile')

    if not file or file.filename == '':
        return "Error: did not provide any file", 400

    generated_key = generate_key()

    return fileutils.save_file(
        app.config['UPLOAD_FOLDER'],
        file,
        generated_key
    )


@app.route('/get-file/<string:apikey>/<string:filename>', methods=['GET'])
@cross_origin()
def get_file_original(apikey, filename):
    return fileutils.serve_file(
        app.config['UPLOAD_FOLDER'],
        apikey,
        filename,
        False
    )


@app.route('/get-modified-file/<string:apikey>/<string:filename>', methods=['GET'])
@cross_origin()
def get_file_modified(apikey, filename):
    return fileutils.serve_file(
        app.config['UPLOAD_FOLDER'],
        apikey,
        filename,
        True
    )


@app.route('/get-modifier-settings', methods=['GET'])
@cross_origin()
def get_modifier_settings():
    return app.config['MODIFIER_DEFAULTS']


@app.route('/mod', methods=['POST'])
@cross_origin()
def modify_audio():
    data = request.get_json()

    if not data['settings']:
        return "Error: did not provide audio settings", 400
    if not data['key']:
        return "Error: did not provide API key", 400
    if not data['filename']:
        return "Error: did not provide file name", 400

    return fileutils.do_audio_mod(
        app.config['UPLOAD_FOLDER'],
        data['key'],
        data['filename'],
        data['settings'],
        app.config['MODIFIER_DEFAULTS']
    )


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port='5000')
