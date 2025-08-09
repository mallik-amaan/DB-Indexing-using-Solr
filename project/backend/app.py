from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

SOLR_BASE_URL = 'http://localhost:8983/solr/products'  # Adjust if needed

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search_products')
def search_products():
    return render_template('search_products.html')

@app.route('/search')
def search():
    q = request.args.get('q', '').strip()
    
    # If query is exactly '*:*', pass it as-is to Solr
    if q == '*:*':
        solr_query = '*:*'
    elif q:
        solr_query = f'name:*{q}* OR category:*{q}* OR description:*{q}*'
    else:
        solr_query = '*:*'
    
    params = {
        'q': solr_query,
        'wt': 'json',
        'rows': 50
    }
    try:
        res = requests.get(f"{SOLR_BASE_URL}/select", params=params)
        res.raise_for_status()
        docs = res.json()['response']['docs']
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify(docs)


@app.route('/add', methods=['GET', 'POST'])
def add_product():
    if request.method == 'POST':
        data = request.json
        # Construct Solr update JSON
        solr_doc = {
            "add": {
                "doc": data,
                "commitWithin": 1000
            }
        }
        try:
            res = requests.post(f"{SOLR_BASE_URL}/update", json=solr_doc, headers={'Content-Type': 'application/json'})
            res.raise_for_status()
            return jsonify({"status": "success"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return render_template('add_product.html')

@app.route('/controls')
def controls():
    return render_template('controls.html')

@app.route('/auto_import', methods=['POST'])
def auto_import():
    # Here you will call your Solr DIH or backend endpoint that triggers the import
    # For example, if you have an API endpoint or curl call, do it here
    # Dummy response:
    return jsonify({"status": "Auto import triggered (mock response)"})


if __name__ == '__main__':
    app.run(debug=True)
