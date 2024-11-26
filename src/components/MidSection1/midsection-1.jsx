import './midsection-1.css';

const MidSection1 = () => {
    const scrollIntoView = () => {
        const element = document.getElementById('left');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container-new">
            <div className="content-new">
                <div className="image-grid-new">
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/1.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/2.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/3.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/4.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/5.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/6.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/7.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                    <div className="image-item-new">
                        <img src="/assets/Hompage_gal/8.jpg" alt="Interior Design" />
                        <div className="quote-text">
                            <button onClick={scrollIntoView}>Get a Quote</button>
                        </div>
                    </div>
                </div>
                <div className="text-overlay">
                    <h3>We&apos;re here to help you transform your home
                        <i className="fa fa-home" aria-hidden="true"></i></h3>
                    <p>Discover how we can make your dream interior a reality</p>
                </div>
            </div>
        </div>
    );
};

export default MidSection1;
