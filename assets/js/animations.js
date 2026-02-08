document.addEventListener('DOMContentLoaded', () => {

            /* --- 1. Custom Cursor Logic --- */
            const cursor = document.querySelector('.custom-cursor');
            const follower = document.querySelector('.cursor-follower');

            // Check if device is desktop
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            if (isDesktop && cursor && follower) {
                        document.addEventListener('mousemove', (e) => {
                                    gsap.to(cursor, {
                                                x: e.clientX,
                                                y: e.clientY,
                                                duration: 0.1,
                                                ease: "power2.out"
                                    });
                                    gsap.to(follower, {
                                                x: e.clientX,
                                                y: e.clientY,
                                                duration: 0.3,
                                                ease: "width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s"
                                    });
                        });

                        // Hover Effect on clickable elements
                        const hoverTargets = document.querySelectorAll('a, button, .feature-card, .btn-primary, .profile-card');
                        hoverTargets.forEach(target => {
                                    target.addEventListener('mouseenter', () => {
                                                gsap.to(follower, {
                                                            scale: 2,
                                                            backgroundColor: 'rgba(45, 212, 191, 0.1)',
                                                            borderColor: 'transparent',
                                                            duration: 0.3
                                                });
                                    });
                                    target.addEventListener('mouseleave', () => {
                                                gsap.to(follower, {
                                                            scale: 1,
                                                            backgroundColor: 'transparent',
                                                            borderColor: 'var(--accent-teal)',
                                                            duration: 0.3
                                                });
                                    });
                        });
            }

            /* --- 2. Scroll Progress Bar --- */
            const progressBar = document.querySelector('.scroll-progress');
            window.addEventListener('scroll', () => {
                        const scrollTop = document.documentElement.scrollTop;
                        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        const progress = (scrollTop / scrollHeight) * 100;
                        if (progressBar) progressBar.style.width = `${progress}%`;
            });

            /* --- 3. Navbar Hide/Show on Scroll --- */
            let lastScrollY = window.scrollY;
            const navbar = document.querySelector('.main-nav');

            window.addEventListener('scroll', () => {
                        if (window.scrollY > 100) {
                                    navbar.classList.add('scrolled');
                                    if (window.scrollY > lastScrollY) {
                                                // Scrolling down -> hide
                                                navbar.style.transform = 'translateY(-100%)';
                                    } else {
                                                // Scrolling up -> show
                                                navbar.style.transform = 'translateY(0)';
                                    }
                        } else {
                                    navbar.classList.remove('scrolled');
                                    navbar.style.transform = 'translateY(0)';
                        }
                        lastScrollY = window.scrollY;
            });

            /* --- 4. GSAP Animations (ScrollTrigger) --- */
            gsap.registerPlugin(ScrollTrigger);

            // Hero Section: Fade In & Parallax
            gsap.from(".hero-content > *", {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        delay: 0.2
            });

            // Profile Parallax Float
            gsap.to(".profile-card", {
                        scrollTrigger: {
                                    trigger: ".hero-section",
                                    start: "top top",
                                    end: "bottom top",
                                    scrub: 1
                        },
                        y: 100,
                        rotation: 3
            });

            // Features Section: Stagger Cards + Draw SVG
            const features = document.querySelectorAll('.feature-card');
            features.forEach((card, index) => {
                        // Fade Up Animation
                        gsap.fromTo(card,
                                    { opacity: 0, y: 50 },
                                    {
                                                opacity: 1,
                                                y: 0,
                                                duration: 0.8,
                                                ease: "power2.out",
                                                delay: index * 0.1,
                                                scrollTrigger: {
                                                            trigger: ".features-grid",
                                                            start: "top 80%",
                                                            toggleActions: "play none none reverse"
                                                }
                                    }
                        );

                        // SVG Draw Animation
                        const iconPath = card.querySelector('path');
                        if (iconPath) {
                                    const length = iconPath.getTotalLength();
                                    gsap.set(iconPath, { strokeDasharray: length, strokeDashoffset: length });

                                    ScrollTrigger.create({
                                                trigger: card,
                                                start: "top 85%",
                                                onEnter: () => {
                                                            gsap.to(iconPath, {
                                                                        strokeDashoffset: 0,
                                                                        duration: 1.5,
                                                                        ease: "power2.out"
                                                            });

                                                            // Highlight Text Counter Effect (Optional)
                                                            const highlight = card.querySelector('.highlight-text');
                                                            gsap.from(highlight, {
                                                                        scale: 0.8,
                                                                        color: '#fff',
                                                                        duration: 0.5,
                                                                        delay: 0.5
                                                            });
                                                }
                                    });
                        }
            });

            // Bento Grid Stagger
            gsap.from(".bento-card", {
                        scrollTrigger: {
                                    trigger: ".bento-grid",
                                    start: "top 80%"
                        },
                        opacity: 0,
                        y: 50,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "back.out(1.7)"
            });

});
