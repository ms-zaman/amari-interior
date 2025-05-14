import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./Contact.css";
import "./ModernSectionTitle.css";

const Contact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;

        gsap.fromTo(
            section.querySelector(".contact-form"),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
            }
        );

        gsap.fromTo(
            section.querySelector(".contact-info"),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        alert(
            "Form submitted! This is a demo, so no actual submission occurs."
        );
    };

    return (
        <section className="section contact" ref={sectionRef} id="contact">
            <div className="container">
                <div className="section-title">
                    <h2>Contact Us</h2>
                    <p>Get in touch to start your transformation journey</p>
                </div>

                <div className="contact-container">
                    <div className="contact-form">
                        <h3>Send Us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="tel" placeholder="Your Phone" />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="icon">📍</i>
                            </div>
                            <div className="info-content">
                                <h4>Our Location</h4>
                                <p>123 Design Street, Creative City, 10001</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="icon">📱</i>
                            </div>
                            <div className="info-content">
                                <h4>Phone Number</h4>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="icon">✉️</i>
                            </div>
                            <div className="info-content">
                                <h4>Email Address</h4>
                                <p>info@amariinterior.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="icon">🕒</i>
                            </div>
                            <div className="info-content">
                                <h4>Working Hours</h4>
                                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
