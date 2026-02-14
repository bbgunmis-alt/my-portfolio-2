﻿/* --- PREMIUM ANIM.JS (GSAP 3.12.5 + ScrollTrigger) --- */

document.addEventListener('DOMContentLoaded', () => {

            // --- Global Page Load ---
            document.body.classList.add('loaded');

            /* --- 0. Helper Functions --- */
            const throttle = (func, limit) => {
                        let inThrottle;
                        return function () {
                                    const args = arguments;
                                    const context = this;
                                    if (!inThrottle) {
                                                func.apply(context, args);
                                                inThrottle = true;
                                                setTimeout(() => inThrottle = false, limit);
                                    }
                        }
            };

            /* --- 1. Custom Cursor Logic (Premium Trail) --- */
            try {
                        const cursor = document.querySelector('.custom-cursor');
                        const follower = document.querySelector('.cursor-follower');

                        if (cursor && follower) {
                                    const prefersMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
                                    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
                                    const isNotTouch = window.matchMedia("(hover: hover)").matches;

                                    if (prefersMotion && isPointerFine && isNotTouch) {
                                                let mouseX = 0;
                                                let mouseY = 0;
                                                let followerX = 0;
                                                let followerY = 0;
                                                let rafId = null;

                                                function animateCursor() {
                                                            followerX += (mouseX - followerX) * 0.15;
                                                            followerY += (mouseY - followerY) * 0.15;

                                                            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
                                                            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

                                                            rafId = requestAnimationFrame(animateCursor);
                                                }

                                                animateCursor();

                                                const handleMouseMove = throttle((e) => {
                                                            mouseX = e.clientX;
                                                            mouseY = e.clientY;
                                                }, 16);

                                                document.addEventListener('mousemove', handleMouseMove);

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
                                    } else {
                                                cursor.style.display = 'none';
                                                follower.style.display = 'none';
                                    }
                        }
            } catch (error) {
                        console.error("Cursor Animation Error:", error);
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

            /* --- 7. GSAP Reveal Animations --- */
            gsap.registerPlugin(ScrollTrigger);

            // Hero Reveal
            gsap.from(".hero-content > *", { opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: "power3.out" });

            // Staggered Reveals for Sections
            const revealElements = [
                        { selector: ".feature-card", trigger: ".features-grid" },
                        { selector: ".bento-card", trigger: ".bento-grid" },
                        { selector: ".timeline-item", trigger: ".timeline" },
                        { selector: ".about-content > *", trigger: ".about-grid" },
                        { selector: ".project-card", trigger: ".projects-grid" },
                        { selector: ".tech-item", trigger: ".tech-grid" },
                        { selector: ".gallery-item", trigger: ".about-gallery" },
                        { selector: ".contact-item", trigger: ".contact-grid" },
                        { selector: ".infra-card", trigger: ".infra-grid" }
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
            if (document.querySelector('.solution-bento') || document.querySelector('.solution-block')) {
                        gsap.utils.toArray('.solution-block, .bento-main, .bento-item').forEach(block => {
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
                        // Hero Parallax Effect
                        try {
                                    const heroParallax = document.querySelector('.parallax-target');
                                    if (heroParallax) {
                                                let pMouseX = 0;
                                                let pMouseY = 0;
                                                let targetX = 0;
                                                let targetY = 0;

                                                function animateParallax() {
                                                            targetX += (pMouseX - targetX) * 0.1;
                                                            targetY += (pMouseY - targetY) * 0.1;

                                                            heroParallax.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
                                                            requestAnimationFrame(animateParallax);
                                                }

                                                animateParallax();

                                                const handleParallaxMove = throttle((e) => {
                                                            pMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                                                            pMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                                                }, 16);

                                                document.addEventListener('mousemove', handleParallaxMove);
                                    }
                        } catch (error) {
                                    console.error("Parallax Animation Error:", error);
                        }
            }
});
