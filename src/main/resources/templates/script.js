// Simple in-memory "database" (replace with real database in production)
let users = {};
let passwords = {};

// DOM Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const vaultSection = document.getElementById('vault-section');
const addPasswordSection = document.getElementById('add-password-section');
const passwordList = document.getElementById('password-list');

// Current user
let currentUser = null;

// Show/hide sections
function showLogin() {
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
}

function showRegister() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
}

function showVault() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    vaultSection.style.display = 'block';
    addPasswordSection.style.display = 'none';
    loadPasswords();
}

function showAddPassword() {
    addPasswordSection.style.display = 'block';
}

function hideAddPassword() {
    addPasswordSection.style.display = 'none';
}

// User functions
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username] === password) {
        currentUser = username;
        showVault();
    } else {
        alert('Invalid username or password');
    }
}

function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    
    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = password;
        passwords[username] = [];
        alert('Registration successful! Please login.');
        showLogin();
    }
}

function logout() {
    currentUser = null;
    showLogin();
}

// Password functions
function loadPasswords() {
    if (!currentUser) return;
    
    passwordList.innerHTML = '';
    const userPasswords = passwords[currentUser] || [];
    
    userPasswords.forEach((pw, index) => {
        const div = document.createElement('div');
        div.className = 'password-item';
        div.innerHTML = `
            <strong>${pw.account}</strong><br>
            Username: ${pw.username}<br>
            Password: ******<br>
            <button onclick="showPassword(${index})">Show</button>
            <button onclick="deletePassword(${index})">Delete</button>
        `;
        passwordList.appendChild(div);
    });
}

function savePassword() {
    const account = document.getElementById('account-name').value;
    const username = document.getElementById('account-username').value;
    const password = document.getElementById('account-password').value;
    
    if (!account || !username || !password) {
        alert('Please fill all fields');
        return;
    }
    
    if (!passwords[currentUser]) {
        passwords[currentUser] = [];
    }
    
    passwords[currentUser].push({
        account,
        username,
        password // In a real app, encrypt this before storing
    });
    
    // Clear fields
    document.getElementById('account-name').value = '';
    document.getElementById('account-username').value = '';
    document.getElementById('account-password').value = '';
    
    hideAddPassword();
    loadPasswords();
}

function showPassword(index) {
    const password = passwords[currentUser][index].password;
    alert(`Password: ${password}`);
}

function deletePassword(index) {
    if (confirm('Are you sure you want to delete this password?')) {
        passwords[currentUser].splice(index, 1);
        loadPasswords();
    }
}