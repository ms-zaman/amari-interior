import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./SimpleFooter.css";

gsap.registerPlugin(ScrollTrigger);

const SimpleFooter = () => {
    const footerRef = useRef(null);
    const socialIconsRef = useRef(null);
    const contactInfoRef = useRef(null);
    const footerLogoRef = useRef(null);

    useEffect(() => {
        // Social icons animation
        const socialIcons =
            socialIconsRef.current.querySelectorAll(".social-icon");

        gsap.fromTo(
            socialIcons,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: socialIconsRef.current,
                    start: "top bottom-=100",
                },
            }
        );

        // Contact info animation
        const contactItems =
            contactInfoRef.current.querySelectorAll(".contact-item");

        gsap.fromTo(
            contactItems,
            {
                x: -30,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contactInfoRef.current,
                    start: "top bottom-=100",
                },
            }
        );

        // Logo animation
        gsap.fromTo(
            footerLogoRef.current,
            {
                scale: 0.8,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: footerLogoRef.current,
                    start: "top bottom-=50",
                },
            }
        );

        // Hover animations for social icons
        socialIcons.forEach((icon) => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    y: -8,
                    duration: 0.3,
                    ease: "power1.out",
                });
                gsap.to(icon.querySelector("img"), {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power1.out",
                });
            });

            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                });
                gsap.to(icon.querySelector("img"), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.out",
                });
            });
        });

        return () => {
            // Cleanup event listeners
            socialIcons.forEach((icon) => {
                icon.removeEventListener("mouseenter", () => {});
                icon.removeEventListener("mouseleave", () => {});
            });
        };
    }, []);

    return (
        <footer className="footer" ref={footerRef}>
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-about">
                            <div className="footer-logo" ref={footerLogoRef}>
                                <h2>Amari Interior</h2>
                            </div>
                            <p>
                                Transforming spaces into extraordinary
                                experiences. We create interiors that inspire,
                                comfort, and elevate your lifestyle.
                            </p>
                            <div className="social-icons" ref={socialIconsRef}>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="Facebook"
                                >
                                    <img
                                        src="/icons/facebook.svg"
                                        alt="Facebook"
                                    />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="Instagram"
                                >
                                    <img
                                        src="/icons/instagram.svg"
                                        alt="Instagram"
                                    />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="LinkedIn"
                                >
                                    <img
                                        src="/icons/linkedin.svg"
                                        alt="LinkedIn"
                                    />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="Twitter"
                                >
                                    <img
                                        src="/icons/twitter.svg"
                                        alt="Twitter"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                                <li>
                                    <a href="#projects">Projects</a>
                                </li>
                                <li>
                                    <a href="#about">About Us</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-services">
                            <h3>Our Services</h3>
                            <ul>
                                <li>
                                    <a href="#services">Interior Design</a>
                                </li>
                                <li>
                                    <a href="#services">Renovation</a>
                                </li>
                                <li>
                                    <a href="#services">Architecture</a>
                                </li>
                                <li>
                                    <a href="#services">Space Planning</a>
                                </li>
                                <li>
                                    <a href="#services">Consultation</a>
                                </li>
                            </ul>
                        </div>

                        <div
                            className="footer-contact-info"
                            ref={contactInfoRef}
                        >
                            <h3>Contact Us</h3>
                            <div className="contact-items">
                                <div className="contact-item">
                                    <img
                                        src="/icons/location.svg"
                                        alt="Address"
                                    />
                                    <p>
                                        123 Design Street, Creative City, 10001
                                    </p>
                                </div>
                                <div className="contact-item">
                                    <img src="/icons/phone.svg" alt="Phone" />
                                    <p>+1 (555) 123-4567</p>
                                </div>
                                <div className="contact-item">
                                    <img src="/icons/email.svg" alt="Email" />
                                    <p>info@amariinterior.com</p>
                                </div>
                                <div className="contact-item">
                                    <img src="/icons/clock.svg" alt="Hours" />
                                    <p>Mon-Fri: 9am-6pm, Sat: 10am-4pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>
                            &copy; {new Date().getFullYear()} Amari Interior.
                            All Rights Reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SimpleFooter;
