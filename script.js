document.addEventListener('DOMContentLoaded', () => {
    // Copy Email Feature
    const emailBtn = document.getElementById('email-btn');
    const emailText = document.getElementById('email-text');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', async () => {
            const email = emailBtn.getAttribute('data-email');
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Visual Feedback
                const originalText = emailText.innerText;
                const originalIcon = emailBtn.innerHTML;
                
                emailText.innerText = 'Copied!';
                emailBtn.classList.add('copied');
                
                setTimeout(() => {
                    emailText.innerText = originalText;
                    emailBtn.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                emailText.innerText = 'Failed :(';
                setTimeout(() => emailText.innerText = 'Copy Email', 2000);
            }
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass, .section-title, .hero-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Dynamic styles for revealed elements
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
