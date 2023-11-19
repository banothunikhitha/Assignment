from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import uuid
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Dummy data for authentication (replace with actual logic)
valid_credentials = {"test@sunbasedata.com": "Test@123"}
BASE_URL = "https://qa2.sunbasedata.com/sunbase/portal/api"
customer_data = []
# Helper function for authentication
def authenticate_user(login_id, password):
    if login_id in valid_credentials and valid_credentials[login_id] == password:
        return True
    return False

# Helper function for making authenticated requests
def make_authenticated_request(method, path, data=None):
    token = request.headers.get("Authorization")
    headers = {"Authorization": token, 'Content-Type': 'application/json'}

    if method == "GET":
        response = requests.get(BASE_URL + path, headers=headers)
    elif method == "POST":
        print("Data sent to external API:", data)
        response = requests.post(BASE_URL + path, json=data, headers=headers)

    print("External API Response:", response.text)
    return response

# API functions
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.get_json()
    login_id = data.get("login_id")
    password = data.get("password")

    try:
        if authenticate_user(login_id, password):
            return jsonify({"token": "your_token_here"})
        else:
            return jsonify({"error": "Authentication failed"}), 401
    except Exception as e:
        print(f"Exception during authentication: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
@app.route('/create_customer', methods=['POST'])
def create_customer():
    try:
        data = request.get_json()

        # Check if first_name and last_name are provided
        if "first_name" not in data or "last_name" not in data:
            return jsonify({"error": "First Name or Last Name is missing"}), 400
        new_customer_uuid = str(uuid.uuid4())

        # Create a new customer dictionary
        new_customer = {
            "uuid": new_customer_uuid,
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "address": data.get("address"),
            "city": data.get("city"),
            "state": data.get("state"),
            "email": data.get("email"),
            "phone": data.get("phone")
        }

        # Add the new customer to the list
        customer_data.append(new_customer)

        return jsonify({"message": "Successfully Created"}), 201

    except Exception as e:
        print(f"Exception during customer creation: {e}")
        return jsonify({"error": "Error creating customer"}), 500

@app.route('/get_customer_list', methods=['GET'])
def get_customer_list():
    try:
        # Placeholder logic to retrieve the list of customers (replace with actual logic)
        return jsonify({"customers": customer_data})
    except Exception as e:
        print(f"Exception during getting customer list: {e}")
        return jsonify({"error": "Error getting customer list"}), 500

@app.route('/delete_customer', methods=['POST'])
def delete_customer():
    try:
        data = request.get_json()

        # Placeholder logic to delete a customer (replace with actual logic)
        uuid_to_delete = data.get("uuid")
        customer_data[:] = [customer for customer in customer_data if customer.get("uuid") != uuid_to_delete]

        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        print(f"Exception during customer deletion: {e}")
        return jsonify({"error": "Error deleting customer"}), 500
@app.route('/update_customer', methods=['POST'])
def update_customer():
    try:
        data = request.get_json()

        # Validate that 'uuid' is provided in the request body
        if "uuid" not in data:
            return jsonify({"error": "UUID is missing in the request body"}), 400

        # Placeholder logic to update a customer (replace with actual logic)
        uuid_to_update = data.get("uuid")
        customer_to_update = next((customer for customer in customer_data if customer.get("uuid") == uuid_to_update), None)

        if customer_to_update:
            # Update customer data with the provided fields
            customer_to_update.update({
                "first_name": data.get("first_name"),
                "last_name": data.get("last_name"),
                "address": data.get("address"),
                "city": data.get("city"),
                "state": data.get("state"),
                "email": data.get("email"),
                "phone": data.get("phone")
            })

            return jsonify({"message": "Successfully Updated"}), 200
        else:
            return jsonify({"error": "UUID not found"}), 500

    except Exception as e:
        print(f"Exception during customer update: {e}")
        return jsonify({"error": "Error updating customer"}), 500


if __name__ == '__main__':
    app.run(debug=True)