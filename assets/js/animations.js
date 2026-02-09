/* --- PREMIUM ANIM.JS (GSAP 3.12.5 + ScrollTrigger) --- */

document.addEventListener('DOMContentLoaded', () => {

            /* --- 1. Custom Cursor Logic (Premium Trail) --- */
            const cursor = document.querySelector('.custom-cursor');
            const follower = document.querySelector('.cursor-follower');

            if (cursor && follower) {
                        const prefersMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
                        const isPointerFine = window.matchMedia("(pointer: fine)").matches;

                        if (prefersMotion && isPointerFine) {
                                    let mouseX = 0;
                                    let mouseY = 0;
                                    let followerX = 0;
                                    let followerY = 0;

                                    function animateCursor() {
                                                followerX += (mouseX - followerX) * 0.15;
                                                followerY += (mouseY - followerY) * 0.15;

                                                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
                                                follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

                                                requestAnimationFrame(animateCursor);
                                    }

                                    animateCursor();

                                    document.addEventListener('mousemove', (e) => {
                                                mouseX = e.clientX;
                                                mouseY = e.clientY;
                                    });

                                    // Hover Effect
                                    const hoverTargets = document.querySelectorAll('a, button, .feature-card, .bento-card, .btn-primary-glow, .profile-card, .tech-card, .infra-card, .lang-btn, .hamburger');
                                    hoverTargets.forEach(target => {
                                                target.addEventListener('mouseenter', () => {
                                                            document.body.classList.add('is-hovering');
                                                });
                                                target.addEventListener('mouseleave', () => {
                                                            document.body.classList.remove('is-hovering');
                                                });
                                    });
                        }
            }

            /* --- 2. Scroll Progress Bar --- */
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                        window.addEventListener('scroll', () => {
                                    const scrollTop = document.documentElement.scrollTop;
                                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                                    const progress = (scrollTop / scrollHeight) * 100;
                                    progressBar.style.width = `${progress}%`;
                        });
            }

            /* --- 3. Navbar Polish (Shadow + Hide/Show) --- */
            const navbar = document.querySelector('.main-nav');
            let lastScrollY = window.scrollY;

            if (navbar) {
                        window.addEventListener('scroll', () => {
                                    if (window.scrollY > 50) {
                                                navbar.classList.add('scrolled');
                                                if (window.scrollY > lastScrollY && window.scrollY > 500) {
                                                            navbar.style.transform = 'translateY(-100%)';
                                                } else {
                                                            navbar.style.transform = 'translateY(0)';
                                                }
                                    } else {
                                                navbar.classList.remove('scrolled');
                                    }
                                    lastScrollY = window.scrollY;
                        });
            }

            /* --- 4. Mobile Menu Full Screen (GSAP) --- */
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            const navItems = document.querySelectorAll('.nav-links a, .lang-switch-wrapper, .theme-toggle');

            if (hamburger && navLinks) {
                        hamburger.addEventListener('click', () => {
                                    const isActive = navLinks.classList.contains('active');

                                    if (!isActive) {
                                                // Open Menu
                                                hamburger.classList.add('active');
                                                navLinks.classList.add('active');
                                                document.body.style.overflow = 'hidden'; // Prevent scroll

                                                gsap.fromTo(navItems,
                                                            { opacity: 0, x: 50 },
                                                            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.2 }
                                                );
                                    } else {
                                                // Close Menu
                                                hamburger.classList.remove('active');
                                                navLinks.classList.remove('active');
                                                document.body.style.overflow = '';
                                    }
                        });

                        // Close on link click
                        navItems.forEach(item => {
                                    item.addEventListener('click', () => {
                                                hamburger.classList.remove('active');
                                                navLinks.classList.remove('active');
                                                document.body.style.overflow = '';
                                    });
                        });
            }

            /* --- 5. Contact Form Validation & Success --- */
            const contactForm = document.getElementById('contactForm');
            const formSuccess = document.getElementById('formSuccess');

            if (contactForm) {
                        contactForm.addEventListener('submit', async (e) => {
                                    e.preventDefault();

                                    // Basic Validation
                                    let isValid = true;
                                    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

                                    inputs.forEach(input => {
                                                if (!input.value.trim()) {
                                                            input.classList.add('error');
                                                            isValid = false;
                                                } else {
                                                            input.classList.remove('error');

                                                            if (input.type === 'email') {
                                                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                                        if (!emailRegex.test(input.value)) {
                                                                                    input.classList.add('error');
                                                                                    isValid = false;
                                                                        }
                                                            }
                                                }
                                    });

                                    if (isValid) {
                                                const submitBtn = contactForm.querySelector('.btn-submit');
                                                submitBtn.disabled = true;
                                                submitBtn.innerText = 'Sending...';

                                                // Simulate form submission (Real form would use fetch)
                                                await new Promise(resolve => setTimeout(resolve, 1500));

                                                // Success Animation
                                                gsap.to(contactForm, {
                                                            opacity: 0,
                                                            y: -20,
                                                            duration: 0.5,
                                                            onComplete: () => {
                                                                        contactForm.style.display = 'none';
                                                                        formSuccess.classList.add('show');

                                                                        // GSAP Success Reveal
                                                                        gsap.from(".success-checkmark", { scale: 0, duration: 0.6, ease: "back.out(1.7)" });
                                                                        gsap.from(".success-text", { opacity: 0, y: 20, duration: 0.5, delay: 0.3 });
                                                            }
                                                });
                                    }
                        });

                        // Remove error on input
                        contactForm.querySelectorAll('input, textarea').forEach(input => {
                                    input.addEventListener('input', () => input.classList.remove('error'));
                        });
            }

            /* --- 6. ScrollSpy (Active Link Underline) --- */
            const sections = document.querySelectorAll('section[id]');
            const navLinksList = document.querySelectorAll('.nav-links a');

            function scrollSpy() {
                        const scrollY = window.pageYOffset;

                        sections.forEach(current => {
                                    const sectionHeight = current.offsetHeight;
                                    const sectionTop = current.offsetTop - 100;
                                    const sectionId = current.getAttribute('id');

                                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                                                navLinksList.forEach(link => {
                                                            link.classList.remove('active');
                                                            if (link.getAttribute('href') === `#${sectionId}` || (link.getAttribute('href').includes('index.html') && link.getAttribute('href').endsWith(`#${sectionId}`))) {
                                                                        link.classList.add('active');
                                                            }
                                                });
                                    }
                        });
            }

            if (sections.length > 0) {
                        window.addEventListener('scroll', scrollSpy);
            }

            /* --- 7. GSAP Reveal Animations --- */
            gsap.registerPlugin(ScrollTrigger);

            // Hero Reveal
            gsap.from(".hero-content > *", { opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: "power3.out" });

            // Staggered Reveals for Sections
            const revealElements = [
                        { selector: ".feature-card", trigger: ".features-grid" },
                        { selector: ".bento-card", trigger: ".bento-grid" },
                        { selector: ".timeline-item", trigger: ".timeline" },
                        { selector: ".about-content > *", trigger: ".about-grid" }
            ];

            revealElements.forEach(item => {
                        if (document.querySelector(item.selector)) {
                                    gsap.from(item.selector, {
                                                scrollTrigger: {
                                                            trigger: item.trigger,
                                                            start: "top 85%",
                                                            toggleActions: "play none none reverse"
                                                },
                                                opacity: 0,
                                                y: 40,
                                                duration: 0.8,
                                                stagger: 0.15,
                                                ease: "power2.out"
                                    });
                        }
            });

            // Special Case: Solutions Page Blocks
            if (document.querySelector('.solution-block')) {
                        gsap.utils.toArray('.solution-block').forEach(block => {
                                    gsap.from(block.children, {
                                                scrollTrigger: {
                                                            trigger: block,
                                                            start: "top 75%"
                                                },
                                                opacity: 0,
                                                y: 50,
                                                stagger: 0.2,
                                                duration: 0.8,
                                                ease: "power2.out"
                                    });
                        });
            }
});

