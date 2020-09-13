from flask import Flask, request, jsonify, send_file, send_from_directory, safe_join
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'wav', 'mp3'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')

# To do : move to file storage microservice:


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/healthstatus')
def index():
    return jsonify(status="File Storage healthy")


@app.route('/save', methods=['POST'])
def save_file():
    file = request.files.get('file')
    apikey = request.form.get('key')

    # print(file, flush=True)
    # print(apikey, flush=True)

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


@app.route('/get', methods=['GET'])
def get_file():
    apikey = request.form.get('key')
    name = request.form.get('filename')

    print(name, flush=True)
    print(apikey, flush=True)

    filename = secure_filename(name)
    dirname = secure_filename(apikey)

    try:
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], dirname), filename=filename, as_attachment=True)

    except FileNotFoundError:
        return "Error: File not found", 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
