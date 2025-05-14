import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./ModernSectionTitle.css";
import "./Testimonials.css";

const Testimonials = () => {
    const sectionRef = useRef(null);
    const testimonialsRef = useRef([]);
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const testimonials = [
        {
            name: "Sarah Johnson",
            position: "Homeowner",
            quote: "Amari Interior transformed our house into a dream home. Their attention to detail and understanding of our vision was exceptional. We couldn't be happier with the results!",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
        },
        {
            name: "Michael Chen",
            position: "Restaurant Owner",
            quote: "Working with Amari Interior for our restaurant renovation was a fantastic experience. They created a space that perfectly captures our brand and has received countless compliments from our customers.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
        },
        {
            name: "Emily Rodriguez",
            position: "Office Manager",
            quote: "The team at Amari Interior redesigned our office space to be both functional and inspiring. The productivity and morale boost has been remarkable. Highly recommended!",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 4,
        },
        {
            name: "David Wilson",
            position: "Boutique Hotel Manager",
            quote: "Amari Interior's design for our boutique hotel has been a game-changer. The elegant yet functional spaces have received rave reviews from our guests. Their team was professional and delivered on time.",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            rating: 5,
        },
        {
            name: "Sophia Kim",
            position: "Apartment Owner",
            quote: "I was amazed by how Amari Interior maximized the space in my small apartment. They created a stylish, multifunctional living area that feels much larger than it actually is. Worth every penny!",
            image: "https://randomuser.me/api/portraits/women/90.jpg",
            rating: 5,
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const testimonialCards = testimonialsRef.current;
        const title = section.querySelector(".section-title h2");
        const subtitle = section.querySelector(".section-title p");
        const progressBar = section.querySelector(".progress-bar-fill");

        // Animate the title and subtitle
        gsap.fromTo(
            [title, subtitle],
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            }
        );

        // Animate the testimonial cards
        gsap.fromTo(
            testimonialCards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
            }
        );

        // Animate the progress bar
        gsap.to(progressBar, {
            width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
            duration: 0.4,
            ease: "power2.out",
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [activeIndex, testimonials.length]);

    const nextTestimonial = () => {
        if (activeIndex < testimonials.length - 1) {
            setActiveIndex(activeIndex + 1);
            scrollToTestimonial(activeIndex + 1);
        }
    };

    const prevTestimonial = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            scrollToTestimonial(activeIndex - 1);
        }
    };

    const scrollToTestimonial = (index) => {
        if (testimonialsRef.current[index]) {
            const slider = sliderRef.current;
            const testimonial = testimonialsRef.current[index];

            const scrollPosition =
                testimonial.offsetLeft -
                (slider.offsetWidth - testimonial.offsetWidth) / 2;

            gsap.to(slider, {
                scrollLeft: scrollPosition,
                duration: 0.8,
                ease: "power3.out",
            });
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        // Find the closest testimonial to snap to
        const slider = sliderRef.current;
        const scrollPosition = slider.scrollLeft;
        const cardWidth = slider.offsetWidth;

        const closestIndex = Math.round(scrollPosition / cardWidth);
        const boundedIndex = Math.max(
            0,
            Math.min(closestIndex, testimonials.length - 1)
        );

        setActiveIndex(boundedIndex);
        scrollToTestimonial(boundedIndex);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scrolling speed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i < rating ? "filled" : "empty"}`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <section
            className="section testimonials"
            ref={sectionRef}
            id="testimonials"
        >
            <div className="testimonials-bg-pattern"></div>
            <div className="container">
                <div className="section-title">
                    <h2>Client Testimonials</h2>
                    <p>What our clients say about our work</p>
                </div>

                <div className="testimonials-wrapper">
                    <div
                        className="testimonials-slider"
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                className={`testimonial-card ${
                                    index === activeIndex ? "active" : ""
                                }`}
                                key={index}
                                ref={(el) =>
                                    (testimonialsRef.current[index] = el)
                                }
                            >
                                <div className="testimonial-card-inner">
                                    <div className="quote-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                                        </svg>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>{testimonial.quote}</p>
                                    </div>
                                    <div className="testimonial-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <div className="testimonial-author">
                                        <div className="author-image">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                            />
                                        </div>
                                        <div className="author-info">
                                            <h4>{testimonial.name}</h4>
                                            <p>{testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="testimonials-controls">
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{
                                    width: `${
                                        ((activeIndex + 1) /
                                            testimonials.length) *
                                        100
                                    }%`,
                                }}
                            ></div>
                        </div>
                        <div className="control-buttons">
                            <button
                                className={`control-btn prev ${
                                    activeIndex === 0 ? "disabled" : ""
                                }`}
                                onClick={prevTestimonial}
                                disabled={activeIndex === 0}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 12H5"></path>
                                    <path d="M12 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <div className="testimonial-counter">
                                <span className="current">
                                    {activeIndex + 1}
                                </span>
                                <span className="separator">/</span>
                                <span className="total">
                                    {testimonials.length}
                                </span>
                            </div>
                            <button
                                className={`control-btn next ${
                                    activeIndex === testimonials.length - 1
                                        ? "disabled"
                                        : ""
                                }`}
                                onClick={nextTestimonial}
                                disabled={
                                    activeIndex === testimonials.length - 1
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
