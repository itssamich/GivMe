from flask import Flask, jsonify
import EmbeddingHandler as eh

app = Flask(__name__)


@app.route("/<wordlist_name>/<dimensions_input>")
def json_response(wordlist_name, dimensions_input):

    labels_list, points_list = eh.PCA(wordlist_name)
    points_array = list(map(lambda x, y: {"x":float(x[0]),"y":float(x[1]), "toolTipContent":y}, points_list, labels_list))
    response = jsonify(
        list_name = wordlist_name,
        dimensions = dimensions_input,
        number_of_points = len(points_array),
        points = points_array,
        )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
