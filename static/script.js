// static/script.js

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('authentication').style.display = 'block';
});


async function authenticate() {
    const loginId = document.getElementById('login_id').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "login_id": loginId,
                "password": password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            
            // Check if the server provided a redirect URL
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                document.getElementById('authStatus').innerText = 'Authentication successful';
                document.getElementById('authentication').style.display = 'none';
                document.getElementById('customerActions').style.display = 'block';
                document.getElementById('response').innerText = '';
            }
        } else {
            document.getElementById('authStatus').innerText = 'Authentication failed';
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}

async function createCustomer() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        const response = await fetch('/create_customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='  // Replace with the actual token
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "address": address,
                "city": city,
                "state": state,
                "email": email,
                "phone": phone
            }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('response').innerText = data.message;
        } else {
            const data = await response.json();
            document.getElementById('response').innerText = data.error;
        }
    } catch (error) {
        console.error('Error creating customer:', error);
    }
}async function getCustomerList() {
    try {
        const response = await fetch('/get_customer_list', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='  // Replace with the actual token
            },
        });

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                // Handle the customer list data
                if (data.customers && data.customers.length > 0) {
                    const customerListElement = document.getElementById('customerList');
                    
                    // Clear existing content
                    customerListElement.innerHTML = '';

                    // Create an unordered list to display customer information
                    const customerListUl = document.createElement('ul');

                    // Iterate through the customer data and add list items
                    data.customers.forEach(customer => {
                        const customerInfoLi = document.createElement('li');
                        customerInfoLi.textContent = `UUID: ${customer.uuid}, Name: ${customer.first_name} ${customer.last_name}, Address: ${customer.address}, Email: ${customer.email}, Phone: ${customer.phone}`;
                        customerListUl.appendChild(customerInfoLi);
                    });

                    // Append the unordered list to the customerListElement
                    customerListElement.appendChild(customerListUl);
                } else {
                    console.error('No customer data found.');
                }
            } else {
                console.error('Response is not JSON:', response);
            }
        } else {
            const data = await response.json();
            console.error('Error getting customer list:', data.error);
        }
    } catch (error) {
        console.error('Error getting customer list:', error);
    }
}


async function deleteCustomer() {
    const uuid = prompt('Enter the UUID of the customer to delete:');
    
    try {
        const response = await fetch('/delete_customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='  // Replace with the actual token
            },
            body: JSON.stringify({
                "uuid": uuid,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('response').innerText = data.message;
        } else {
            const data = await response.json();
            document.getElementById('response').innerText = data.error;
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
    }
}

async function updateCustomer() {
    const uuid = prompt('Enter the UUID of the customer to update:');
    const firstName = prompt('Enter the new first name:');
    const lastName = prompt('Enter the new last name:');
    const address = prompt('Enter the new address:');
    const city = prompt('Enter the new city:');
    const state = prompt('Enter the new state:');
    const email = prompt('Enter the new email:');
    const phone = prompt('Enter the new phone:');

    try {
        const response = await fetch('/update_customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='  // Replace with the actual token
            },
            body: JSON.stringify({
                "uuid": uuid,
                "first_name": firstName,
                "last_name": lastName,
                "address": address,
                "city": city,
                "state": state,
                "email": email,
                "phone": phone
            }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('response').innerText = data.message;

            // Check if the server provided updated customer data
            if (data.updatedCustomer) {
                const updatedCustomerInfo = document.getElementById('updatedCustomerInfo');
                updatedCustomerInfo.innerHTML = `UUID: ${data.updatedCustomer.uuid}, Name: ${data.updatedCustomer.first_name} ${data.updatedCustomer.last_name}, Address: ${data.updatedCustomer.address}, Email: ${data.updatedCustomer.email}, Phone: ${data.updatedCustomer.phone}, City: ${data.updatedCustomer.city}, State: ${data.updatedCustomer.state}`;
            }
        } else {
            const data = await response.json();
            document.getElementById('response').innerText = data.error;
        }
    } catch (error) {
        console.error('Error updating customer:', error);
    }
}
