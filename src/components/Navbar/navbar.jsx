import { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const heroRef = useRef(null); // Ref for the hero section
    const heroImages = [
        'assets/heroimage1.jpg',
        '/assets/heroimage2.jpg',
        '/assets/heroimage3.jpg',
    ];

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        // IntersectionObserver to detect when the hero section comes into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !imageLoaded) {
                        setImageLoaded(true); // Mark image as loaded
                    }
                });
            },
            { threshold: 0.5 } // Load when 50% of the hero section is in view
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(heroRef.current);
            }
        };
    }, [imageLoaded]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);  // Apply dark mode to the body
    };

    return (
        <div className="content">
            <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark-mode' : ''}`}>
                <div className="logo">
                    <a href='/'>  <img src="assets/Logo.png" alt="RADHEY SMART INTERIORS" />
                        <div className="logotxt">
                            <a>
                                <p style={{ color: '#f39c12', fontFamily: 'Times New Roman' }}>RADHEY</p>
                            </a>
                            <a>
                                <p style={{ color: '#f39c12', fontFamily: 'Times New Roman' }}>SMART</p>
                            </a>
                            <a>
                                <p style={{ color: '#f39c12', fontFamily: 'Times New Roman' }}>INTERIORS</p>
                            </a>
                        </div>
                    </a>

                </div>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><a href='/'>Home</a></li>
                    <li>
                        <a
                            href="#gallery"
                            onClick={() => {
                                const servicesSection = document.querySelector('.image-container');
                                servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Gallery
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            onClick={() => {
                                const servicesSection = document.querySelector('.about');
                                servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#services"
                            onClick={() => {
                                const servicesSection = document.querySelector('.services');
                                servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            onClick={() => {
                                const servicesSection = document.querySelector('.footer');
                                servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Contact
                        </a>
                    </li>
                    <li>
                        <a
                            href="#quote"
                            className="quote-btn"
                            onClick={() => {
                                const form = document.querySelector('.contact-form');
                                form.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get a Quote
                        </a>
                    </li>
                    {/* New AllPhotos link */}
                    <li>
                        <a href="/all-photos">All Photos</a>
                    </li>
                </ul>

                <div
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={handleMenuToggle}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Dark Mode Toggle Button */}
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? '🌞' : '🌙'}
                </button>
            </nav >

            <div
                className="hero"
                ref={heroRef}
                style={{
                    backgroundImage: imageLoaded ? `url(${heroImages[currentImageIndex]})` : 'none',
                    transition: 'background-image 1s ease-in-out',
                }}
            >
                <div className="hero-content">
                    <h2>Your Dream Interior Awaits</h2>
                    <p>We create spaces that inspire and transform your lifestyle.</p>
                    <div className='quote1'>
                        <a href="#quote" onClick={() => {
                            const form = document.querySelector('.contact-form');
                            form.scrollIntoView({ behavior: 'smooth' });
                        }}>

                            <a href={window.location.pathname === '/all-photos' ? '/' : '#quote'} onClick={() => {
                                if (window.location.pathname === '/') {
                                    const form = document.querySelector('.contact-form');
                                    form.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>
                                <button >Get a Quote</button>
                            </a>

                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
