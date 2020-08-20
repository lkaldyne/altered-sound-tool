from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/healthstatus')
def index():
    return jsonify(status="Sound Utils healthy")


@app.route('/stretch')
def doStretch():
    pass


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
