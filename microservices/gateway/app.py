from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
import requests

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'wav', 'mp3'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


dependencies = [
    (os.environ['SOUNDUTILS_HOST'], os.environ['SOUNDUTILS_PORT'])
]


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

    if allowed_file(file.filename):
        filename = secure_filename(file.filename)
        try:
            os.makedirs(os.path.join(UPLOAD_FOLDER, apikey))
        except OSError:
            return "Error: did not provide unique key", 400  # dir already exists

        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], apikey, filename))

        return jsonify(status="File Successfully Uploaded")
    else:
        return "Error: File name not valid", 400


@app.route('/mod', methods=['POST'])
def modify_audio():
    data = request.get_json()

    print(data, flush=True)

    return jsonify(status="File Successfully Uploaded")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
