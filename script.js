/* =================================================================
   SoundBridge - Landing Page Interactivity (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Mobile Hamburger Menu Toggle */
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
            mobileToggle.textContent = isExpanded ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }

    /* 2. Dark / Light Mode Switcher (Keeps Background Colors Unchanged) */
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        [data-theme="dark"] {
            --primary-color: #0f172a;
            --text-main: #1e293b;
            --text-muted: #475569;
            --border-color: #cbd5e1;
            /* Background variables (--bg-light and --bg-white) are intentionally omitted 
               so the background color never changes when dark mode is toggled. */
        }
    `;
    document.head.appendChild(darkModeStyles);

    let themeToggleBtn = document.querySelector('.theme-toggle');
    if (!themeToggleBtn) {
        themeToggleBtn = document.createElement('button');
        themeToggleBtn.className = 'theme-toggle';
        themeToggleBtn.setAttribute('aria-label', 'Toggle Mode');
        themeToggleBtn.style.position = 'fixed';
        themeToggleBtn.style.bottom = '2rem';
        themeToggleBtn.style.right = '2rem';
        themeToggleBtn.style.zIndex = '9999';
        themeToggleBtn.style.width = '50px';
        themeToggleBtn.style.height = '50px';
        themeToggleBtn.style.borderRadius = '50%';
        themeToggleBtn.style.backgroundColor = 'var(--accent-color)';
        themeToggleBtn.style.color = '#ffffff';
        themeToggleBtn.style.border = 'none';
        themeToggleBtn.style.fontSize = '1.25rem';
        themeToggleBtn.style.cursor = 'pointer';
        themeToggleBtn.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
        themeToggleBtn.style.display = 'flex';
        themeToggleBtn.style.alignItems = 'center';
        themeToggleBtn.style.justifyContent = 'center';
        themeToggleBtn.style.transition = 'transform 0.3s ease';
        
        themeToggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        document.body.appendChild(themeToggleBtn);
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '☀️';
        }
    });

    /* 3. Interactive CTA Modal & Signup Flow */
    const ctaButtons = document.querySelectorAll('a.btn-primary, .pricing-card .btn');

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <h2>Start Your SoundBridge Trial</h2>
            <p>Empower your music studio with purpose-built remote tools.</p>
            <form id="signup-form">
                <div class="form-group" style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.35rem;">Full Name</label>
                    <input type="text" required placeholder="Helen Lee" style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-white); color:var(--text-main);">
                </div>
                <div class="form-group" style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.35rem;">Work Email</label>
                    <input type="email" required placeholder="helen@soundbridge.io" style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-white); color:var(--text-main);">
                </div>
                <div class="form-group" style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.35rem;">Studio Size</label>
                    <select style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-white); color:var(--text-main); font-size:1rem;">
                        <option>1 - 15 Students (Solo Tier)</option>
                        <option>16 - 30+ Students (Pro Tier)</option>
                        <option>Commercial Academy (Multi-Seat)</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1rem;">Launch Free Trial</button>
            </form>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px);
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 10000;
        }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal-content {
            background: var(--bg-white); color: var(--text-main); padding: 2.5rem;
            border-radius: 12px; width: 90%; max-width: 440px; position: relative;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); text-align: left;
            transform: translateY(20px); transition: transform 0.3s ease;
            border: 1px solid var(--border-color);
        }
        .modal-overlay.active .modal-content { transform: translateY(0); }
        .modal-close {
            position: absolute; top: 1.25rem; right: 1.25rem; background: none; border: none;
            font-size: 1.5rem; cursor: pointer; color: var(--text-muted);
        }
        .modal-close:hover { color: var(--accent-color); }
    `;
    document.head.appendChild(modalStyles);

    const closeModalBtn = modalOverlay.querySelector('.modal-close');
    const signupForm = document.getElementById('signup-form');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
        });
    });

    closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Welcome to SoundBridge! Your account has been initialized and onboarding instructions have been sent.');
        modalOverlay.classList.remove('active');
        signupForm.reset();
    });

});