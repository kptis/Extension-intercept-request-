
from flask import Flask, jsonify, request
import xmltodict
from Model.prediction import predict, makeTokens
from gevent.pywsgi import WSGIServer

import Model.prediction

app = Flask(__name__)

@app.route('/extension', methods=['POST'])
def receive_xml():
    x = request.args.get('url')
    print(x)
    if predict(x) == 0:
        return "SAFE"
    if predict(x) == 1:
        return "PHISHING"

if __name__ == '__main__':
    # app.run(debug=True, host="0.0.0.0", port="5000")
    http_server= WSGIServer(('0.0.0.0', 1900), app)
    http_server.serve_forever()
