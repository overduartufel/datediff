from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/date-difference', methods=['POST'])
def date_difference():
    date1 = request.json['date1']
    date2 = request.json['date2']

    try:
        date1 = datetime.strptime(date1, '%Y-%m-%d').date()
        date2 = datetime.strptime(date2, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please use the format "YYYY-MM-DD".'}), 400

    difference = abs((date2 - date1).days)
    return jsonify({'difference': difference}), 200

if __name__ == '__main__':
    app.run()
