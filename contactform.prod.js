// contactform.prod.js
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

    // Initialize EmailJS with environment variable
    emailjs.init(process.env.NETLIFY_EMAILJS_PUBLIC_KEY);

    // Send email using EmailJS with environment variables
    emailjs.send(
        process.env.NETLIFY_SERVICE_ID,
        process.env.NETLIFY_TEMPLATE_ID,
        templateParams
    )
    .then(function(response) {
        console.log('Email sent successfully:', response);
        
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
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message. Please try again later.',
        });
    })
    .finally(function() {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}

window.sendEmail = sendEmail;