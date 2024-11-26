const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());

// Create a Nodemailer transporter ( authentication step)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail for SMTP
    auth: {
        user: 'info.radheysmartinteriors@gmail.com', // Your email address
        pass: 'cjor mqpe pcrv emqr', // Your email password or app password
    },
});
console.log(transporter);

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {  // Add async here
    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        cityName,
        office,
        message,
    } = req.body;

    // Construct the email body (HTML format)
    const emailBody = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                width: 600px;
                margin: 0 auto;
                border: 1px solid #ccc;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 100px;
            }
            .header h1 {
                font-size: 24px;
                color: #333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
                color: #333;
            }
            td {
                background-color: #fff;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://i.ibb.co/y5zLDTc/logo.png" alt="RADHEY SMART INTERIORS">
                <h1>RADHEY SMART INTERIORS</h1>
            </div>

            <h2>New Form Submission</h2>
            <table>
                <tr><th>First Name</th><td>${firstName}</td></tr>
                <tr><th>Last Name</th><td>${lastName}</td></tr>
                <tr><th>Phone Number</th><td>${phoneNumber}</td></tr>
                <tr><th>Email</th><td>${email}</td></tr>
                <tr><th>City Name</th><td>${cityName}</td></tr>
                <tr><th>Office</th><td>${office}</td></tr>
                <tr><th>Message</th><td>${message}</td></tr>
            </table>

            <div class="footer">
                <p>New Form Received!</p>
            </div>
        </div>
    </body>
    </html>
  `;

    const customerEmailBody = `
    <html>
    <body>
        <h2>Thank You for Your Submission</h2>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for reaching out to Radhey Smart Interiors. We have received your message and will get back to you soon. Here are the details you submitted:</p>
       <table style="border: 1px solid #ddd; border-collapse: collapse;">
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">First Name</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${firstName}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Last Name</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${lastName}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Phone Number</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${phoneNumber}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Email</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${email}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">City Name</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${cityName}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Office</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${office}</td>
  </tr>
  <tr style="border: 1px solid #ddd;">
    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Message</th>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">${message}</td>
  </tr>
</table>
        </table>
        <p>Best regards,</p>
        <p>Radhey Smart Interiors</p>
    </body>
    </html>
  `;

    try {
        // Send email to the admin
        const adminMailOptions = {
            from: email, // Customer's email as the sender
            to: 'info.radheysmartinteriors@gmail.com', // Admin's email
            subject: 'New Form Submission',
            html: emailBody, // HTML body for admin
            replyTo: email, // Reply to customer's email
        };

        // Send email to the customer
        const customerMailOptions = {
            from: 'no-reply@radheysmartinteriors.com', // Company email
            to: email, // Send to customer's email
            subject: 'Thank you for contacting Radhey Smart Interiors, We will get back to you soon.',
            html: customerEmailBody, // HTML body for customer
        };

        // Send emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'There was an error with your submission.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
