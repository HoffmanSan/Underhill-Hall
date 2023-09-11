// Imports
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// Styles
import './contactUs.scss';

export default function ContactUs() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState('')

	// Form inputs reset
	const resetForm = () => {
		setName('');
		setEmail('');
		setMessage('');
	};

	// EmailJS - email sending process
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
		.then((result) => {
			console.log(result.text);
			setStatus('success');
		}, (error) => {
			console.log(error.text);
			setStatus('error');
		});
		resetForm();
		setTimeout(() => {
			setStatus('');
		}, 5000);
	};

  return (
	<div className="contact">
		<div className="contact-container">

			{/* Phone/Correspondence contact information */}
			<h2>How can we help?</h2>
			<div className="contact-options">
				<div className="contact-hotline">
					<h3>Hotline</h3>
					<p>9am - 9pm <br /> Monday - Friday <br /><a href="tel:+48111222333">+48 111 222 333</a></p>
				</div>
				<div className="contact-correspondence">
					<h3>Correspondence</h3>
					<p>Underhill Hall <br /> Jana Pawła II st. <br /> 21-370 Papieżogród</p>
				</div>
			</div>

			{/* Email form template */}
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

				<button className="form-button" type="submit" value="Send">Send</button>
			</form>

			{/* Success/Error element render based on submit process outcome */}
			{status === 'success' && <div className="success-popup">Email sent successfully</div>}
			{status === 'error' && <div className="error-popup">Email sending failed <br />Please try again</div>}
		</div>
	</div>
  )
}
