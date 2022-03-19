from flask import Flask, jsonify
import EmbeddingHandler as eh

app = Flask(__name__)


@app.route("/<wordlist_name>/<dimensions_input>/<k_clusters>")
def json_response(wordlist_name, dimensions_input, k_clusters):

    labels_list, projected_embedding = eh.PCA(wordlist_name, number_of_components = int(dimensions_input))
    color_options = ["#00188f", "#fff100", "#00bcf2", "#ff8c00", "#e81123", "#00b294", "#ec008c", "#009e49", "#68217a", "#bad80a"]

    if k_clusters == "1":
        clusters = [0] * len(labels_list)
    else:
        clusters = eh.k_means_clus(projected_embedding, int(k_clusters))
        
    c_colors = list(map(lambda x: color_options[x], clusters))
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
