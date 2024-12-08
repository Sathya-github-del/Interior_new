// import { useState } from 'react';
import './footer.css';
import { FaFacebook, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaAddressBook } from 'react-icons/fa';

const Footer = () => {
    // const [email, setEmail] = useState("");

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    // const handleEmailSubmit = (e) => {
    //     e.preventDefault();
    //     alert("Subscribed successfully!");
    // };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>RADHEY SMART INTERIORS</h2>
                    <p>Transforming spaces, transforming lives.</p>
                </div>
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <li><a href="/">Home</a></li>
                    <li>
                        <a
                            href="#about"
                            onClick={() => {
                                const servicesSection = document.querySelector('.gallery-container');
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
                            style={{ backgroundColor: "#333", borderRadius: '8px', padding: "5px 5px", border: '2px solid orange' }}
                        >
                            Get a Quote
                        </a>
                    </li>
                </div>
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><FaPhoneAlt /> +917019565765</p>
                    <p><FaEnvelope /> info@radheysmartinteriors.com</p>
                    <p><FaAddressBook />Bangalore, India</p>
                </div>
                {/* <div className="footer-newsletter">
                    <h4>Subscribe to our Newsletter</h4>
                    <form onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div> */}

                <div className="footer-social">
                    <h4>Connect with Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com/rooparam.devashi" target="_blank" rel="noopener noreferrer"><FaFacebook size={40} /></a>
                        <a href="https://wa.me/+917019565765" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={40} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Radhey Smart Interiors | All Rights Reserved</p>
                {/* <p><a href="/privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p> */}
            </div>
        </footer>
    );
};

export default Footer;
