document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el input de teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        window.intlTelInput(phoneInput, {
            preferredCountries: ['mx', 'co', 'pe', 'cl', 'ar', 'es'],
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.js",
        });
    }

    // Inicializar el formulario
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Inicializar los botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        if (!button.type || button.type !== 'submit') {
            button.addEventListener('click', scrollToForm);
        }
    });

    // Inicializar las animaciones
    initializeAnimations();
    
    // Cargar testimonios
    loadTestimonials();
});

// Manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    
    // Aquí puedes agregar la lógica para enviar los datos a tu servidor
    console.log('Datos del formulario:', { name, email, phone, country });
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    
    // Limpiar el formulario
    event.target.reset();
    
    return false;
}

// Validar el formulario
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }

    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Por favor ingresa un correo electrónico válido');
        return false;
    }

    if (field.type === 'tel' && !isValidPhone(field)) {
        showFieldError(field, 'Por favor ingresa un número de teléfono válido');
        return false;
    }

    clearFieldError(field);
    return true;
}

// Validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar teléfono
function isValidPhone(phoneInput) {
    if (window.intlTelInputGlobals) {
        const iti = window.intlTelInputGlobals.getInstance(phoneInput);
        return iti.isValidNumber();
    }
    return true;
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error en campo
function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Mostrar mensaje de éxito
function showSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.';
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Simular envío del formulario
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

// Desplazamiento suave al formulario
function scrollToForm() {
    const formSection = document.querySelector('.contact-form');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar animaciones
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.benefit-item').forEach(item => {
        observer.observe(item);
    });
}

// Cargar testimonios
function loadTestimonials() {
    const testimonials = [
        {
            name: "[Nombre 1]",
            company: "[Empresa 1]",
            text: "[Testimonio 1]",
            image: "#"
        },
        {
            name: "[Nombre 2]",
            company: "[Empresa 2]",
            text: "[Testimonio 2]",
            image: "#"
        },
        {
            name: "[Nombre 3]",
            company: "[Empresa 3]",
            text: "[Testimonio 3]",
            image: "#"
        }
    ];

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        testimonials.forEach(testimonial => {
            const testimonialHTML = `
                <div class="testimonial-item">
                    <div class="placeholder-image">[Foto Testimonio]</div>
                    <h3>${testimonial.name}</h3>
                    <p class="company">${testimonial.company}</p>
                    <p class="text">${testimonial.text}</p>
                </div>
            `;
            testimonialsGrid.innerHTML += testimonialHTML;
        });
    }
}
