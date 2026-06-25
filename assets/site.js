/* FADE-UP on scroll */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 60); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    } else {
        document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }

    /* MOBILE MENU */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    function closeMobileMenu() { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }

    /* FAQ accordion */
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const open = item.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    /* INQUIRY FORM - Formspree endpoint preserved */
    function handleAuditForm(e) {
        e.preventDefault();
        const form = e.target;
        fetch('https://formspree.io/f/mdayrzzd', {
            method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                document.getElementById('formContent').style.display = 'none';
                document.getElementById('formSuccess').classList.add('visible');
            } else {
                alert("There was a problem submitting your form. Please email jwdigitaltx@gmail.com directly.");
            }
        }).catch(() => {
            alert("There was a problem submitting your form. Please email jwdigitaltx@gmail.com directly.");
        });
    }
