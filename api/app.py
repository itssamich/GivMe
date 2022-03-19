import re
from flask import Flask, jsonify
import EmbeddingHandler as eh
import os
app = Flask(__name__)


@app.route("/<wordlist_name>")
def json_response(wordlist_name):

    labels_list, projected_embedding, eigen_values_sum3D, eigen_values_sum2D = eh.PCA(wordlist_name)
    color_options = ["#00188f", "#009e49", "#00bcf2", "#ff8c00", "#e81123"]

    clusters = []
    for i in range(2, 6):
        clusters.append(eh.k_means_clus(projected_embedding, i))

    c_colors = [list(map(lambda x: color_options[x], cluster)) for cluster in clusters]

    x_coords = list(projected_embedding[:,0])
    y_coords = list(projected_embedding[:,1])
    z_coords = list(projected_embedding[:,2]) # if dimensions_input == "3" else []
    response = jsonify(
        list_name = wordlist_name,
        x_points = x_coords,
        y_points = y_coords,
        z_points = z_coords,
        labels = labels_list,
        colors = c_colors,
        info_represented = [eigen_values_sum2D, eigen_values_sum3D]
        )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/initial_lists")
def json_all_lists():
    response =jsonify([name for name in os.listdir("./Lists")])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
