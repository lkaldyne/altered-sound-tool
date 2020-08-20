from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)


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


@app.route('/stretch')
def doStretch():
    pass


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
