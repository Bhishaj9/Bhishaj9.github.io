document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // --- Mobile Menu Toggle ---
    const menuButton = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-menu');

    if (menuButton && navList) {
        console.log('Mobile menu elements found');
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent clicks from bubbling up
            navList.classList.toggle('active');
            console.log('Menu toggled. Active class present:', navList.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navList.classList.contains('active') && !navList.contains(e.target) && !menuButton.contains(e.target)) {
                navList.classList.remove('active');
                console.log('Menu closed by outside click');
            }
        });

        // Close menu when clicking a link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    } else {
        console.error('Mobile menu elements NOT found. Check .menu-toggle and .nav-menu classes.');
    }


    // --- Preserve existing functionality: Copy Email Feature ---
    const emailBtn = document.getElementById('email-btn');
    const emailText = document.getElementById('email-text');

    if (emailBtn) {
        emailBtn.addEventListener('click', async () => {
            const email = emailBtn.getAttribute('data-email');
            try {
                await navigator.clipboard.writeText(email);
                const originalText = emailText.innerText;

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

    // --- Preserve existing functionality: Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Preserve existing functionality: Reveal on Scroll ---
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

    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
