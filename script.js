// DOM Elements
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('app');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

const addNewCustomerBtn = document.getElementById('addNewCustomerBtn');
const addCustomerModal = document.getElementById('addCustomerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addCustomerForm = document.getElementById('addCustomerForm');
const cancelBtn = document.getElementById('cancelBtn'); // Cancel Button
const searchInput = document.getElementById('searchInput');
const customersList = document.getElementById('customersList');

// State: Customers list
let customers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    address: '123 Main St',
    totalDue: 1000,
    amountPaid: 400,
    purchaseDate: '2024-12-26',
    imageUrl: 'https://via.placeholder.com/80'
  }
];

// Login functionality
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (username === 'admin' && password === 'password') {
    // Successful login, show the app page
    loginPage.style.display = 'none';
    appPage.style.display = 'block';
    displayCustomers(); // Display customers
  } else {
    // Show error message
    loginError.style.display = 'block';
  }
});

// Display Customers
function displayCustomers() {
  customersList.innerHTML = ''; // Clear the list before displaying
  customers.forEach(customer => {
    const customerCard = document.createElement('div');
    customerCard.classList.add('customer-card');
    const amountToBePaid = customer.totalDue - customer.amountPaid; // Calculate Amount to be Paid
    customerCard.innerHTML = `
      <img src="${customer.imageUrl}" alt="${customer.name}">
      <h3>${customer.name}</h3>
      <p>${customer.phone}</p>
      <p>${customer.address}</p>
      <div class="details">
        <p>Total Due: ₹${customer.totalDue}</p>
        <p>Paid: ₹${customer.amountPaid}</p>
        <p>Amount to be Paid: ₹${amountToBePaid}</p> <!-- New field added -->
      </div>
      <button onclick="deleteCustomer(${customer.id})">Delete</button>
    `;
    customersList.appendChild(customerCard);
  });
}


// Add new customer
addNewCustomerBtn.addEventListener('click', () => {
  addCustomerModal.style.display = 'flex'; // Show modal
});

cancelBtn.addEventListener('click', () => {
  addCustomerModal.style.display = 'none'; // Close modal without saving
});

closeModalBtn.addEventListener('click', () => {
  addCustomerModal.style.display = 'none'; // Close modal
});

addCustomerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newCustomer = {
    id: Date.now(), // Unique ID based on timestamp
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    totalDue: parseFloat(document.getElementById('totalDue').value),
    amountPaid: parseFloat(document.getElementById('amountPaid').value),
    purchaseDate: document.getElementById('purchaseDate').value,
    imageUrl: 'https://via.placeholder.com/80' // Placeholder image
  };

  customers.push(newCustomer);
  displayCustomers();
  addCustomerModal.style.display = 'none'; // Close modal
});

// Delete customer
function deleteCustomer(id) {
  customers = customers.filter(customer => customer.id !== id);
  displayCustomers();
}
