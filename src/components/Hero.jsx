import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
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

    // Initialize the background image on component mount
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.backgroundImage = `url(${slides[0].image})`;
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        if (!sliderRef.current) return;

        const tl = gsap.timeline();

        tl.to(sliderRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
        })
            .set(sliderRef.current, {
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            })
            .to(sliderRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.in",
            });

        // Animate text elements
        gsap.fromTo(
            ".hero-content h1, .hero-content p",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, [currentSlide, slides]);

    return (
        <section
            className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
            id="hero"
        >
            {/* Background Image Slider */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 will-change-[opacity,background-image]"
                ref={sliderRef}
                style={{ backgroundImage: `url(${slides[0].image})` }}
                aria-label={slides[currentSlide].alt}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 to-black/30 z-[1]"></div>

            {/* Content Container */}
            <div className="w-[90%] max-w-[1200px] mx-auto px-4 relative z-[2]">
                {/* Hero Text Content */}
                <div className="relative max-w-[700px] text-white px-0 md:px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-5 font-bold">
                        Transforming Spaces into Art with Amari Interior
                        Renovation
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90">
                        Complete Interior Design & Renovation Services Tailored
                        for Your Lifestyle and Budget
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-6 py-3 md:px-7 md:py-3 bg-primary text-white font-semibold uppercase text-sm tracking-wider rounded-custom transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg"
                    >
                        Get a Free Design Consultation
                    </a>
                </div>

                {/* Slider Navigation Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? "bg-primary scale-110"
                                    : "bg-white/50 hover:bg-white/70"
                            }`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
