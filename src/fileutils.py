from flask import request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from util.sound_tools import SoundTools, DEFAULT_EXPORT_FORMAT
from consts import ALLOWED_EXTENSIONS, SETTING_TO_METHOD_MAP, MODPREFIX
from botocore.exceptions import NoCredentialsError
import boto3
import os


def aws_init():
    return boto3.client('s3', aws_access_key_id=os.getenv("S3_ACCESS_KEY"),
                        aws_secret_access_key=os.getenv("S3_SECRET_KEY"))


def download_from_aws(s3_filepath, local_filepath):
    s3 = aws_init()

    print("S3 filepath: {}".format(s3_filepath), flush=True)

    try:
        s3.download_file(os.getenv("S3_BUCKET_NAME"),
                         s3_filepath, local_filepath)
        # print("THE FILE IS DOWNLOADED", flush=True)
        return True
    except Exception:
        # print("FUNKOPOP", flush=True)
        return False


def upload_to_aws(local_file, s3_file):
    s3 = aws_init()

    try:
        s3.upload_file(local_file, os.getenv("S3_BUCKET_NAME"), s3_file)
        # print("Upload Successful")
        return True
    except FileNotFoundError:
        # print("The file was not found")
        return False
    except NoCredentialsError:
        # print("Credentials not available")
        return False


def cleanup_cache(dirpath, filepaths):
    for filepath in filepaths:
        os.remove(filepath)
    os.rmdir(dirpath)


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

        local_file_path = os.path.join(
            loc, dirname, filename)
        file.save(local_file_path)

        if not upload_to_aws(local_file_path, "{}/{}".format(dirname, filename)):
            return "Error: Could not save file", 500

        cleanup_cache(os.path.join(loc, dirname), [local_file_path])

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

    local_file_path = os.path.join(
        loc, dirname, filename)

    res = None
    os.mkdir(os.path.join(loc, dirname))

    if not download_from_aws("{}/{}".format(dirname, filename), local_file_path):
        return "Error: Could not retrieve file", 500

    try:
        res = send_from_directory(os.path.join(
            loc, dirname), filename=filename, as_attachment=True)

    except FileNotFoundError:
        return "Error: File not found", 400

    cleanup_cache(os.path.join(loc, dirname), [local_file_path])
    return res


def do_audio_mod(loc, apikey, name, settings, defaultsettings):

    filename = secure_filename(name)
    dirname = secure_filename(apikey)

    local_file_path = os.path.join(loc, dirname, filename)
    os.mkdir(os.path.join(loc, dirname))

    if not download_from_aws("{}/{}".format(dirname, filename), local_file_path):
        return "Error: Could not retrieve original file", 500

    audiodata, sr = SoundTools.load(local_file_path)

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

    altered_filename = MODPREFIX + fix_filename_ext(filename)
    altered_file_path = os.path.join(loc, dirname, altered_filename)

    SoundTools.save(audiodata, sr, altered_file_path)

    if not upload_to_aws(altered_file_path, "{}/{}".format(dirname, altered_filename)):
        return "Error: Could not save altered file", 500

    cleanup_cache(os.path.join(loc, dirname), [
                  local_file_path, altered_file_path])

    return jsonify(status="File Successfully Modified")
