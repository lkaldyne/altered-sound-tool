from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


dependencies = [
    (os.environ['SOUNDUTILS_HOST'], os.environ['SOUNDUTILS_PORT'])
]


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
    data = request.get_json()
    # print(data, flush=True)

    if not data:
        return "Error: did not provide any data", 400

    # Run img binary thru librosa methods and save as wav file

    return jsonify(status="File Successfully Uploaded")


@app.route('/mod', methods=['POST'])
def modify_audio():
    pass


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
