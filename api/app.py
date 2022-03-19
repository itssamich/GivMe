from flask import Flask, jsonify
import EmbeddingHandler as eh

app = Flask(__name__)


@app.route("/<wordlist_name>/<dimensions_input>")
def json_response(wordlist_name, dimensions_input):

    labels_list, projected_embedding = eh.PCA(wordlist_name, number_of_components = int(dimensions_input))
    clusters = eh.k_means_clus(projected_embedding, 3)
    c_colors = list(map(lambda x: "black" if x == 0 else "red" if x == 1 else "green", clusters))
    x_coords = list(projected_embedding[:,0])
    y_coords = list(projected_embedding[:,1])
    z_coords = list(projected_embedding[:,2]) if dimensions_input == "3" else []
    response = jsonify(
        list_name = wordlist_name,
        dimensions = dimensions_input,
        x_points = x_coords,
        y_points = y_coords,
        z_points = z_coords,
        labels = labels_list,
        colors = c_colors
        )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
