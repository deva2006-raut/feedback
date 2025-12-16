// Utility functions
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getFeedbacks() {
    return JSON.parse(localStorage.getItem('feedbacks')) || [];
}

function saveFeedbacks(feedbacks) {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

function checkLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'index.html';
    }
    return user;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Index.html logic
if (document.getElementById('loginForm')) {
    document.getElementById('show-signup').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('signup-form').classList.remove('hidden');
    });

    document.getElementById('show-forgot').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('forgot-form').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    document.getElementById('back-to-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('forgot-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email === 'devanshuraut8767@gmail.com' && password === 'raut2006') {
            localStorage.setItem('user', 'admin');
            window.location.href = 'admin.html';
        } else {
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('user', email);
                window.location.href = 'automation.html';
            } else {
                alert('Invalid credentials');
            }
        }
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const users = getUsers();
        if (users.find(u => u.email === email)) {
            alert('User already exists');
            return;
        }
        users.push({ email, password });
        saveUsers(users);
        localStorage.setItem('user', email);
        window.location.href = 'automation.html';
    });

    document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Password reset link sent to your email (demo)');
    });
}

// Automation.html logic
if (document.getElementById('get-started-btn')) {
    const user = checkLogin();
    if (user === 'admin') {
        window.location.href = 'index.html';
    }

    document.getElementById('get-started-btn').addEventListener('click', function() {
        window.location.href = 'feedback.html';
    });
}

// Feedback.html logic
if (document.getElementById('feedbackForm')) {
    const user = checkLogin();
    if (user === 'admin') {
        window.location.href = 'index.html';
    }

    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const feedback = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            place: document.getElementById('place').value,
            mobile: document.getElementById('mobile').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value
        };
        const feedbacks = getFeedbacks();
        feedbacks.push(feedback);
        saveFeedbacks(feedbacks);
        window.location.href = 'thankyou.html';
    });
}

// Thankyou.html logic
if (document.querySelector('.thankyou-section')) {
    const user = checkLogin();
    if (user === 'admin') {
        window.location.href = 'index.html';
    }
}

// Admin.html logic
if (document.getElementById('feedback-table')) {
    const user = checkLogin();
    if (user !== 'admin') {
        window.location.href = 'index.html';
    }

    document.getElementById('logout-btn').addEventListener('click', logout);

    const feedbacks = getFeedbacks();
    const tbody = document.getElementById('feedback-body');
    feedbacks.forEach(f => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${f.name}</td>
            <td>${f.age}</td>
            <td>${f.place}</td>
            <td>${f.mobile}</td>
            <td>${f.category}</td>
            <td>${f.description}</td>
        `;
        tbody.appendChild(row);
    });
}
