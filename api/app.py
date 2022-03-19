from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/<list_name>/<dimentions>")
def json_response(list_name, dimentions):
    response = jsonify(
        list_name="Test",
        dimensions=2,
        number_of_points= 10,
        points= [{"x": 0, "y": 1, "toolTipContent": "testWord1"},{"x": 8, "y": 3, "toolTipContent": "testWord2"},{"x": 9, "y": 5, "toolTipContent": "testWord3"}],
        )

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    