import config from './config.js';

// Initialize EmailJS
(function() {
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized');
})();

function sendEmail() {
    console.log('Send email function called');
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitBtn');
    
    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Basic validation
    if (!name || !email || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all fields',
        });
        return;
    }

    // Disable submit button while sending
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Carlos',
    };

    // Send email using EmailJS
    emailjs.send(
        config.SERVICE_ID,
        config.TEMPLATE_ID,
        templateParams
    )
    .then(function(response) {
        console.log('Email sent successfully:', response);
        
        // Show success message using SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your message has been sent successfully!',
        });

        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    })
    .catch(function(error) {
        console.error('EmailJS error details:', error);
        
        // Show error message using SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message. Please try again later.',
        });
    })
    .finally(function() {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}

// Make sendEmail function globally available
window.sendEmail = sendEmail;