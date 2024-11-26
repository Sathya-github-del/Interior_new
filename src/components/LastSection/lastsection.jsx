import './lastsection.css';

const LastSection = () => {
    return (
        <div className="last-section">
            <div className="about">
                <h2>About Us</h2>
                <p>
                    At Radhey Smart interiors, we believe in creating timeless and functional spaces that elevate your lifestyle. With a team of expert designers, we provide tailored interior solutions to meet your unique needs. Whether you&apos;re renovating a single room or designing an entire home, we bring your vision to life with quality and attention to detail.
                </p>
                <div className='dunki'>
                    <p style={{ color: 'red' }}>We provide A-Z service , from design to installation, ensuring a seamless experience for you.</p>
                </div>
            </div>

            <div className="services">
                <h2>Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <i className="fas fa-bed"></i>
                        <h3>Bedroom Design</h3>
                        <p>Customized bedroom designs for ultimate comfort and relaxation.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-arrows-alt"></i>
                        <h3>Space Saving Furniture</h3>
                        <p>Furniture solutions that help you optimize space in small apartments.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-tv"></i>
                        <h3>TV Units</h3>
                        <p>Custom TV units designed to blend with your living room style.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-pencil-ruler"></i>
                        <h3>Study Tables</h3>
                        <p>Functional study tables to create a perfect learning space.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-cogs"></i>
                        <h3>False Ceiling</h3>
                        <p>Elegant false ceiling designs to enhance your room&apos;s ambiance.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-lightbulb"></i>
                        <h3>Lights</h3>
                        <p>Lighting solutions to brighten your home with style.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-wallpaper"></i>
                        <h3>Wallpaper</h3>
                        <p>Wide range of wallpapers to add personality to your walls.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-paint-roller"></i>
                        <h3>Wall Paint</h3>
                        <p>Color consultations and professional painting for any room.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-bath"></i>
                        <h3>Bathroom</h3>
                        <p>Modern and functional bathroom designs to suit your needs.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-hands-helping"></i>
                        <h3>Pooja Unit</h3>
                        <p>Customized pooja units that blend spirituality with design.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-door-open"></i>
                        <h3>Foyer Designs</h3>
                        <p>Designs that create a welcoming atmosphere at the entrance.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-cogs"></i>
                        <h3>Movable Furniture</h3>
                        <p>Furniture that is easy to move and customize for your space.</p>
                    </div>

                    <div className="service-card">
                        <i className="fas fa-child"></i>
                        <h3>Kids Bedroom</h3>
                        <p>Design playful and functional spaces for your children&apos;s rooms.</p>
                    </div>
                    <div className="service-card">
                        <i className="fas fa-paint-brush"></i>
                        <h3>Interior Design Consultation</h3>
                        <p>Personalized consultation to create the perfect interior for your home or office.</p>
                    </div>
                    <div className='service-card'>
                        <i className="fas fa-tile"></i>
                        <h3>Tile Work</h3>
                        <p>Expert tile installation for kitchens, bathrooms, and more.</p>
                    </div>
                    <div className='service-card'>
                        <i className="fas fa-palette"></i>
                        <h3>Color Consultation</h3>
                        <p>Professional color consultations for any room.</p>
                    </div>
                    <div className='service-card'>
                        <i className='fas fa-painting'> </i>
                        <h3>Painting</h3>
                        <p>Professional painting services for interior and exterior spaces.</p>
                    </div>
                    <div className='service-card'>
                        <i className='fas fa-wood-polish'></i>
                        <h3>Wood Finishing and Polishing</h3>
                        <p>Expert wood finishing services for furniture and more.</p>
                    </div>
                </div>
            </div>
            <div id="price" className="pricing-section">
                <h2 className="pricing-title">Our Pricing</h2>
                <div className="price-card">
                    <h3>Customized Pricing Plans</h3>
                    <p>We offer flexible pricing plans tailored to your specific needs.</p>
                    <p style={{ color: 'red' }}>Note: These are just nearly Estimations</p>
                    <ul className="price-list">
                        <li className="price-item">
                            <span className="price-label">Basic Interior Works (1-2 rooms)</span>
                            <span className="price-range">Starting From ₹1000</span>
                        </li>
                        <li className="price-item">
                            <span className="price-label">Standard Interior Works (3-5 rooms)</span>
                            <span className="price-range">Starting From ₹3000</span>
                        </li>
                        <li className="price-item">
                            <span className="price-label">Premium Interior Works (6-10 rooms)</span>
                            <span className="price-range">Starting From ₹5000</span>
                        </li>
                        <li className="price-item">
                            <span className="price-label">Full Home Interior Works (11+ rooms)</span>
                            <span className="price-range">Starting From ₹10,000</span>
                        </li>
                        <li className="price-item">
                            <span className="price-label">Custom Interior Works (variable rooms)</span>
                            <span className="price-range">Vary based On the requirements</span>
                        </li>
                    </ul>
                    <div className='quote2'>
                        <a href="#quote" onClick={() => {
                            const form = document.querySelector('.contact-form');
                            form.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            <button>Get a Quote</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastSection;
