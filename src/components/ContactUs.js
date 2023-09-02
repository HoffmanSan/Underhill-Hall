// imports
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState(false)

    // Form inputs reset after submiting
    const resetForm = () => {
        setName('');
        setEmail('');
        setMessage('');
    };

    // EmailJS configuration
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            setEmailSent(true);
        }, (error) => {
            console.log(error.text);
            setError(true);
        });
        resetForm();
        setTimeout(() => {
            setEmailSent(false);
            setError(false);
        }, 5000);
    };

  return (
    <div className="contact">
        <div className="contact-container">

            {/* Phone / Correspondence contact information */}
            <h2>How can we help?</h2>
            <div className="contact-options">
                <div className="contact-hotline">
                    <h3>Hotline</h3>
                    <p>9am - 9pm <br /> monday - friday <br /><a href="tel:+48111222333">+48 111 222 333</a></p>
                </div>
                <div className="contact-correspondence">
                    <h3>Correspondence</h3>
                    <p>Underhill Hall <br /> Jana Pawła II st. <br /> 21-370 Papieżogród</p>
                </div>
            </div>

            {/* Email sending form template */}
            <h1>Send us an email</h1>
                <form ref={form} onSubmit={sendEmail} autoComplete="off">

                        <label htmlFor='u_name'>
                            <h3>Name</h3>
                        </label>
                        <input type="text" name="user_name" id="u_name" onChange={(e) => setName(e.target.value)} value={name} required/>

                        <label htmlFor='u_email'>
                            <h3>Email</h3>
                        </label>
                        <input type="email" name="user_email" id="u_email" onChange={(e) => setEmail(e.target.value)} value={email} required/>

                        <label htmlFor='u_message'>
                            <h3>Message</h3>
                        </label>
                        <textarea name="message" id="u_message" onChange={(e) => setMessage(e.target.value)} value={message} required/>

                        <input className="form-button" type="submit" value="Send" />
                </form>

                {/* Success | Error element render based on submit process outcome */}
                {emailSent && <div className="success-popup">Email sent successfully</div>}
                {error && <div className="error-popup">Email sending failed <br />Please try again</div>}
        </div>
    </div>
  )
}
