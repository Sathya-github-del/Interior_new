import { useState } from 'react';
import './midsection.css';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'; // Social Icons

const MidSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        cityName: '',
        office: '',
        message: ''

    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        cityName: '',
        office: '',
        message: ''
    });

    console.log(formData);
    console.log(errors);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prevState => ({
                ...prevState, [name]: cleanedValue
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData, [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.`;
                isValid = false;
            } else {
                newErrors[field] = '';
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    const handlewhatsaapsubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).every(value => value === '')) {
            alert('Please fill out the form before submitting via WhatsApp.');
            return;
        }
        const whatsappNumber = "+917019565765";
        const message = `Hello, I'd like to inquire about your services. Here are my details:\n\nName: ${formData.firstName} ${formData.lastName}\nPhone Number: ${formData.phoneNumber}\nEmail: ${formData.email}\nCity: ${formData.cityName}\nOffice/Home: ${formData.office}\nMessage: ${formData.message}`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handlefacebooksubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).every(value => value === '')) {
            alert('Please fill out the form before submitting via Facebook.');
            return;
        }
        const facebookUsername = "rooparam.devashi";
        const message = `Hello, I'd like to inquire about your services. Here are my details:\n\nName: ${formData.firstName} ${formData.lastName}\nPhone Number: ${formData.phoneNumber}\nEmail: ${formData.email}\nCity: ${formData.cityName}\nOffice/Home: ${formData.office}\nMessage: ${formData.message}`;
        const url = `https://m.me/${facebookUsername}?message=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Prepare the form data to send to the backend
            const formDataToSend = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                cityName: formData.cityName,
                office: formData.office,
                message: formData.message,
            };

            // Send the form data to the Flask backend
            fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert('Form submitted successfully!');
                    } else {
                        alert('Error submitting form: ' + data.error);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('There was an error with your submission.');
                });
        }
    };

    return (
        <div className="container">
            <div className="left" id="left">
                <form onSubmit={handleSubmit} className="contact-form">
                    <h2>Contact Details</h2>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="+91"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                maxLength="10"
                                pattern="\d{10}"
                                className="input"
                            />
                            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                    </div>
                    <h2>Address</h2>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="cityName"
                                placeholder="City Name"
                                value={formData.cityName}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.cityName && <p className="error-text">{errors.cityName}</p>}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="office"
                                placeholder="Office/Home"
                                value={formData.office}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.office && <p className="error-text">{errors.office}</p>}
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="textarea"
                        ></textarea>
                        {errors.message && <p className="error-text">{errors.message}</p>}
                    </div>
                    <br />
                    {/* <div className='input-wrapper'>
                        <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginTop: '-20px', backgroundColor: ' #0000008a', fontFamily: 'Helvetica' }}>Schedule a Unique Meeting Experience:</p>
                        <input
                            type="date"
                            name="Date"
                            placeholder="Date"
                            value={formData.Date}
                            onChange={handleInputChange}
                            className="input"
                        />
                        {errors.Date && <p className="error-text">{errors.Date}</p>}
                    </div> */}
                    <button type="submit" className="button">Submit</button>
                    <button type='submit' className='whatsaapbutton' onClick={handlewhatsaapsubmit} style={{ padding: ' 1px 1px 1px 1px' }}><FaWhatsapp size={40} /><p style={{ color: "#fff" }}>Need Quick reply</p></button>
                    <button type='submit' className='fbbutton' onClick={handlefacebooksubmit} style={{ padding: '1px 1px 1px 1px ' }}><FaFacebook size={40} /></button>
                </form>
            </div>

            <div className="black-box-container">
                <div className="black-box">
                    <h2 className="animated-heading">Transform Your Space</h2>
                    <p className="animated-paragraph">Get a quote today and start turning your dream into reality with our expert interior design services.</p>
                </div>
                <div className="black-box">
                    <h2 className="animated-heading">Why Choose Us?</h2>
                    <p className="animated-paragraph">We provide personalized and innovative design solutions tailored to your style and needs. Let&apos;s make your dream space a reality.</p>
                </div>
            </div>
        </div>
    );
};

export default MidSection;
