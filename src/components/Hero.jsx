import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import "./Hero.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef(null);
    const slidesContainerRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const ctaRef = useRef(null);
    const slideRefs = useRef([]);
    const textSplitRef = useRef(null);
    const decorativeCircleRef = useRef(null);
    const decorativePathRef = useRef(null);
    const decorativeDotRef = useRef(null);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1800&auto=format&fit=crop",
            alt: "Modern living room interior design by Amari Interior Renovation",
        },
        {
            image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1800&auto=format&fit=crop",
            alt: "Elegant kitchen renovation by Amari Interior Renovation",
        },
        {
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
            alt: "Luxury bedroom design by Amari Interior Renovation",
        },
    ];

    // Initialize animations on component mount
    useEffect(() => {
        // Initial page reveal animation
        const tl = gsap.timeline();

        // Split text for animations
        if (headingRef.current && !textSplitRef.current) {
            textSplitRef.current = new SplitType(headingRef.current, {
                types: "lines, words",
                lineClass: "line",
                wordClass: "word",
            });

            // Hide words initially
            gsap.set(".word", {
                y: "100%",
                opacity: 0,
            });
        }

        // Animate decorative circle using DrawSVGPlugin
        if (decorativeCircleRef.current) {
            gsap.set(decorativeCircleRef.current, { drawSVG: "0%" });

            tl.to(decorativeCircleRef.current, {
                drawSVG: "100%",
                duration: 1.2,
                ease: "power2.inOut",
                delay: 0.5,
            });
        }

        // Cleaner reveal animation sequence
        tl.fromTo(
            sliderRef.current,
            {
                opacity: 0,
                scale: 1.05,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
            },
            0 // Start at the beginning of the timeline
        )
            .to(
                ".word",
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.02,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .fromTo(
                paragraphRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(
                ctaRef.current,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(
                ".slider-controls",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            );

        // Add subtle parallax effect to slides
        if (slideRefs.current.length > 0) {
            slideRefs.current.forEach((slide) => {
                if (!slide) return;

                ScrollTrigger.create({
                    trigger: sliderRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        gsap.to(slide, {
                            y: self.progress * 50, // Reduced parallax effect for subtlety
                            duration: 0.5,
                            ease: "none",
                            overwrite: "auto",
                        });
                    },
                });
            });
        }

        // Setup automatic slide transition
        const interval = setInterval(() => {
            if (!isAnimating) {
                goToNextSlide();
            }
        }, 6000);

        return () => {
            clearInterval(interval);
            if (textSplitRef.current) {
                textSplitRef.current.revert();
            }
            // Clean up ScrollTrigger instances
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);

        const direction = index > currentSlide ? 1 : -1;
        const currentSlideEl = slideRefs.current[currentSlide];
        const nextSlideEl = slideRefs.current[index];

        // Prepare next slide - improved positioning
        gsap.set(nextSlideEl, {
            xPercent: 0,
            yPercent: 0,
            opacity: 0,
            scale: 1.05,
            zIndex: 1,
        });

        // Animation timeline - smoother transitions
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentSlide(index);
                setIsAnimating(false);

                // Reset positions after animation
                gsap.set(
                    slideRefs.current.filter((_, i) => i !== index),
                    {
                        xPercent: 0,
                        yPercent: 0,
                        opacity: 0,
                        scale: 1,
                        zIndex: 0,
                    }
                );
            },
        });

        // Animate text out - smoother fade
        tl.to([headingRef.current, paragraphRef.current], {
            y: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power1.inOut",
        });

        // Animate current slide out with fade
        tl.to(
            currentSlideEl,
            {
                opacity: 0,
                scale: 1.02,
                duration: 0.7,
                ease: "power2.inOut",
            },
            "-=0.2"
        );

        // Animate next slide in with crossfade
        tl.to(
            nextSlideEl,
            {
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power2.out",
            },
            "-=0.7"
        );

        // Animate text back in with new content - smoother entrance
        tl.to(
            [headingRef.current, paragraphRef.current],
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
            },
            "-=0.4"
        );
    };

    const goToNextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    };

    const goToPrevSlide = () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    };

    return (
        <section
            className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
            id="hero"
            ref={sliderRef}
        >
            {/* Simplified decorative elements - less distracting */}
            <svg
                className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none opacity-30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Single decorative circle that draws itself */}
                <circle
                    ref={decorativeCircleRef}
                    cx="90"
                    cy="10"
                    r="5"
                    fill="none"
                    stroke="rgba(244, 123, 32, 0.4)"
                    strokeWidth="0.5"
                />
            </svg>

            {/* Modern Slider Container */}
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                ref={slidesContainerRef}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        ref={(el) => (slideRefs.current[index] = el)}
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat slide-transition parallax-bg will-change-transform"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            opacity: index === 0 ? 1 : 0,
                            zIndex: index === 0 ? 1 : 0,
                        }}
                        aria-label={slide.alt}
                    >
                        {/* Slide inner content - can add per-slide elements here */}
                    </div>
                ))}
            </div>

            {/* Overlay Gradient - more dynamic with blend mode */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-[2] mix-blend-multiply"></div>

            {/* Content Container - Improved alignment */}
            <div className="w-[90%] max-w-[1200px] mx-auto px-4 relative z-[3] flex flex-col justify-center h-full">
                {/* Hero Text Content */}
                <div className="hero-content relative max-w-[650px] text-white px-0 md:px-4 mt-[-50px]">
                    <h1
                        ref={headingRef}
                        className="text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-6 font-bold overflow-hidden"
                    >
                        Transforming Spaces into Art with Amari Interior
                        Renovation
                    </h1>
                    <p
                        ref={paragraphRef}
                        className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-[550px]"
                    >
                        Complete Interior Design & Renovation Services Tailored
                        for Your Lifestyle and Budget
                    </p>
                    <a
                        ref={ctaRef}
                        href="#contact"
                        className="inline-block px-6 py-3 md:px-8 md:py-4 bg-primary text-white font-semibold uppercase text-sm tracking-wider rounded-custom transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:translate-y-[-2px]"
                    >
                        Get a Free Design Consultation
                    </a>
                </div>

                {/* Improved Slider Controls - Better positioning and styling */}
                <div className="slider-controls absolute bottom-8 left-0 w-full flex justify-center items-center z-10">
                    {/* Combined Navigation Controls */}
                    <div className="flex items-center gap-6 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full">
                        {/* Previous Button */}
                        <button
                            onClick={goToPrevSlide}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-primary hover:text-white"
                            aria-label="Previous slide"
                            disabled={isAnimating}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Slider Navigation Dots/Indicators */}
                        <div className="flex gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`relative h-[3px] transition-all duration-300 ${
                                        index === currentSlide
                                            ? "w-12 bg-primary"
                                            : "w-6 bg-white/40 hover:bg-white/60"
                                    }`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    disabled={isAnimating}
                                >
                                    {index === currentSlide && (
                                        <span className="absolute top-0 left-0 h-full w-full bg-primary origin-left animate-progress"></span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNextSlide}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-primary hover:text-white"
                            aria-label="Next slide"
                            disabled={isAnimating}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
