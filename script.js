// ============ LOGIN PAGE FUNCTIONALITY ============

// Check if user is already logged in when page loads
document.addEventListener('DOMContentLoaded', () => {
    // If on home page, check if user is logged in
    if (document.querySelector('.navbar')) {
        checkLoginStatus();
    }

    // If on login page, set up form submission
    if (document.getElementById('loginForm')) {
        setupLoginForm();
    }
});

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const mobileInput = document.getElementById('mobileNumber');
    const errorMessage = document.getElementById('errorMessage');
    let isOtpStep = false;

    // Clear error message on mobile input
    mobileInput.addEventListener('input', () => {
        errorMessage.textContent = '';
        // Only allow numbers
        mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '');
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isOtpStep) {
            handleMobileValidation();
        } else {
            handleOtpLogin();
        }
    });

    function handleMobileValidation() {
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        const loginBtn = document.querySelector('.login-btn');
        const footerText = document.getElementById('footerText');

        // Reset error message
        errorMessage.textContent = '';

        // Validation
        if (!mobileNumber) {
            errorMessage.textContent = 'Please enter a mobile number';
            return;
        }

        if (mobileNumber.length !== 10) {
            errorMessage.textContent = 'Mobile number must be exactly 10 digits';
            return;
        }

        if (!/^[0-9]{10}$/.test(mobileNumber)) {
            errorMessage.textContent = 'Mobile number should contain only digits';
            return;
        }

        // Check if first digit is between 6-9 (valid Indian mobile number format)
        if (!/^[6-9]/.test(mobileNumber)) {
            errorMessage.textContent = 'Mobile number should start with 6, 7, 8, or 9';
            return;
        }

        // Switch to OTP step
        isOtpStep = true;
        document.getElementById('mobileGroup').style.display = 'none';
        document.getElementById('otpGroup').style.display = 'flex';
        footerText.textContent = 'Enter the OTP sent to your mobile number';
        loginBtn.textContent = 'Verify OTP';
        document.getElementById('otp').focus();
    }

    function handleOtpLogin() {
        const otp = document.getElementById('otp').value.trim();
        const otpErrorMessage = document.getElementById('otpErrorMessage');
        const loginBtn = document.querySelector('.login-btn');
        const mobileNumber = document.getElementById('mobileNumber').value.trim();

        // Reset error message
        otpErrorMessage.textContent = '';

        // Validate OTP
        if (!otp) {
            otpErrorMessage.textContent = 'Please enter OTP';
            return;
        }

        // Disable button during login process
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        // Simulate login process
        setTimeout(() => {
            // Save login data to localStorage
            localStorage.setItem('userMobile', mobileNumber);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginTime', new Date().toISOString());

            // Redirect to home page
            window.location.href = 'home.html';
        }, 1000);
    }
}

// ============ HOME PAGE FUNCTIONALITY ============

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userMobile = localStorage.getItem('userMobile');

    if (!isLoggedIn || !userMobile) {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // Display user mobile number
    const userMobileElement = document.getElementById('userMobile');
    if (userMobileElement) {
        userMobileElement.textContent = formatMobileNumber(userMobile);
    }

    // Setup logout button
    setupLogout();
}

// Format mobile number for display
function formatMobileNumber(mobile) {
    return mobile.replace(/(\d{4})(\d{3})(\d{3})/, '+91 $1 $2 $3');
}

// Setup logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}

// Handle logout
function handleLogout() {
    // Clear login data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userMobile');
    localStorage.removeItem('loginTime');

    // Redirect to login page
    window.location.href = 'index.html';
}

// Setup cart functionality (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    addCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.parentElement.querySelector('h3').textContent;
            showNotification(`${productName} added to cart!`);
        });
    });
});

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #FF6B00;
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
    `;
    notification.textContent = message;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
