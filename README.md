# Assignment
**Customer Management System**
This project is a basic Customer Management System, built using Flask for the backend and JavaScript for the frontend. The system enables users to perform various actions like authentication, creating, retrieving, updating, and deleting customer records.

**Features**
**Authentication:** Users can log in using a login ID and password.
**Create Customer**: Add new customer records to the system.
**Get Customer List:** Retrieve a list of customers stored in the system.
**Update Customer:** Modify the details of an existing customer.
**Delete Customer:** Remove a customer record from the system.
**Technologies Used**
**Flask:** A lightweight web framework for the backend.
**JavaScript:** Used for the frontend interactions.
**HTML/CSS**: Basic structure and styling of the web pages.
**CORS:** Cross-Origin Resource Sharing for handling cross-origin requests.
**Project Structure**
**static:** Contains static files such as JavaScript and CSS.
**script.js:**Manages frontend logic.
**style.css:** Provides minimal styling for the HTML pages.
**templates:** HTML templates for rendering pages.
**index.html:** Main entry point for the application.
**app.py:** The Flask application containing routes and logic.
**Setup and Installation**
  -->Clone the repository: git clone <repository-url>
  -->Install dependencies:pip install -r requirements.txt
  -->Run the application: python app.py
Replace <repository-url> with the actual URL of your repository.

**Usage**
Open the application in your web browser.
Log in using your login ID and password.
Use the provided buttons to create, retrieve, update, and delete customer records.
**API Endpoints**
**Authentication:** POST /authenticate
**Create Customer:** POST /create_customer
**Get Customer List:** GET /get_customer_list
**Update Customer:** POST /update_customer
**Delete Customer:** POST /delete_customer
Refer to the code for more details on the request and response formats.


**Contributing**
If you would like to contribute to the project, please follow the guidelines in CONTRIBUTING.md.

**License**
This project is licensed under the MIT License - see the LICENSE file for details.
