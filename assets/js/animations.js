/* --- PREMIUM ANIM.JS (GSAP 3.12.5 + ScrollTrigger) --- */

document.addEventListener('DOMContentLoaded', () => {

            /* --- 1. Custom Cursor Logic (Premium Trail) --- */
            const cursor = document.querySelector('.custom-cursor');
            const follower = document.querySelector('.cursor-follower');

            // Check if device is desktop and prefers motion
            const prefersMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
            const isPointerFine = window.matchMedia("(pointer: fine)").matches;

            if (prefersMotion && isPointerFine && cursor && follower) {

                        let mouseX = 0;
                        let mouseY = 0;
                        let followerX = 0;
                        let followerY = 0;

                        // Smooth Follower Loop (RAF)
                        function animateCursor() {
                                    // Smooth ease for follower (0.15 = lag factor)
                                    followerX += (mouseX - followerX) * 0.15;
                                    followerY += (mouseY - followerY) * 0.15;

                                    // Apply positions
                                    if (cursor) cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
                                    if (follower) follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

                                    requestAnimationFrame(animateCursor);
                        }

                        // Start animation loop
                        animateCursor();

                        // Mouse Move Listener
                        document.addEventListener('mousemove', (e) => {
                                    mouseX = e.clientX;
                                    mouseY = e.clientY;
                        });

                        // Hover Effect on clickable elements
                        const hoverTargets = document.querySelectorAll('a, button, .feature-card, .btn-primary, .profile-card, .tech-card, .infra-card, .lang-btn, .hamburger');

                        hoverTargets.forEach(target => {
                                    target.addEventListener('mouseenter', () => {
                                                document.body.classList.add('is-hovering');
                                                // Optional GSAP punch for the dot
                                                gsap.to(cursor, { scale: 0.5, duration: 0.2, backgroundColor: '#f59e0b' });
                                    });
                                    target.addEventListener('mouseleave', () => {
                                                document.body.classList.remove('is-hovering');
                                                // Reset dot
                                                gsap.to(cursor, { scale: 1, duration: 0.2, backgroundColor: 'var(--accent-teal)' });
                                    });
                        });

                        // Click Effect (Pulse)
                        document.addEventListener('mousedown', () => {
                                    gsap.to(cursor, { scale: 0.8, duration: 0.1 });
                                    gsap.to(follower, { scale: 0.9, duration: 0.1 });
                        });

                        document.addEventListener('mouseup', () => {
                                    gsap.to(cursor, { scale: 1, duration: 0.2 });
                                    gsap.to(follower, { scale: 1, duration: 0.2 });
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

            if (navbar) {
                        window.addEventListener('scroll', () => {
                                    if (window.scrollY > 100) {
                                                navbar.classList.add('scrolled');
                                                if (window.scrollY > lastScrollY) {
                                                            navbar.style.transform = 'translateY(-100%)'; // Hide
                                                } else {
                                                            navbar.style.transform = 'translateY(0)'; // Show
                                                }
                                    } else {
                                                navbar.classList.remove('scrolled');
                                                navbar.style.transform = 'translateY(0)';
                                    }
                                    lastScrollY = window.scrollY;
                        });
            }

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
            if (document.querySelector(".profile-card")) {
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
            }

            // Solutions Hero Parallax
            if (document.querySelector(".solutions-hero")) {
                        gsap.to(".solutions-hero-content", {
                                    scrollTrigger: {
                                                trigger: ".solutions-hero",
                                                start: "top top",
                                                end: "bottom top",
                                                scrub: 1
                                    },
                                    y: 50,
                                    opacity: 0.8
                        });
            }

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
                                                }
                                    });
                        }
            });

            // Bento Grid Stagger
            if (document.querySelector(".bento-grid")) {
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
            }

            // Solutions Page: Stagger Animations
            const solutionBlocks = document.querySelectorAll('.solution-block');
            solutionBlocks.forEach((block, index) => {
                        gsap.from(block.children, {
                                    scrollTrigger: {
                                                trigger: block,
                                                start: "top 75%",
                                                toggleActions: "play none none reverse"
                                    },
                                    opacity: 0,
                                    y: 50,
                                    stagger: 0.2,
                                    duration: 0.8,
                                    ease: "power2.out"
                        });
            });

            // Tech Grid Stagger
            if (document.querySelector(".tech-grid")) {
                        gsap.from(".tech-card", {
                                    scrollTrigger: {
                                                trigger: ".tech-grid",
                                                start: "top 85%"
                                    },
                                    opacity: 0,
                                    scale: 0.8,
                                    stagger: 0.05,
                                    duration: 0.5,
                                    ease: "back.out(1.5)"
                        });
            }

            // Infra Cards Stagger
            if (document.querySelector(".infra-container")) {
                        gsap.from(".infra-card", {
                                    scrollTrigger: {
                                                trigger: ".infra-container",
                                                start: "top 80%"
                                    },
                                    opacity: 0,
                                    y: 30,
                                    stagger: 0.15,
                                    duration: 0.8,
                                    ease: "power2.out"
                        });
            }

});
