// Imports
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// Styles
import './contactUs.scss';

// Components
import { Modal } from '../../components';

export default function ContactUs() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [formMessage, setFormMessage] = useState('')
	const [status, setStatus] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	// Form inputs reset
	const resetForm = () => {
		setName('');
		setEmail('');
		setFormMessage('');
	};

	// EmailJS - email sending process
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID_1, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
		.then((result) => {
			console.log(result.text);
			setStatus('success');
			setStatusMessage('Email sent successfully');
		}, (error) => {
			console.log(error.text);
			setStatus('error');
			setStatusMessage('Email sending failed. Please try again');
		});
		resetForm();
		setTimeout(() => {
			setStatus('');
		}, 5000);
	};

	const closeModal = () => {
    setStatus('');
  };


  return (
	<div className="contact">
		<div className="contact-container">

			{/* Phone/Correspondence contact information */}
			<h2>How can we help?</h2>
			<div className="contact-options">
				<div className="contact-hotline">
					<h2>Hotline</h2>
					<p>9am - 9pm <br /> Monday - Friday <br /><a href="tel:+48111222333">+48 111 222 333</a></p>
				</div>
				<div className="contact-correspondence">
					<h2>Correspondence</h2>
					<p>Underhill Hall <br /> 123 Entertainment Street <br /> 12-345 Town City</p>
				</div>
			</div>

			{/* Email form template */}
			<h2>Send us an email</h2>
			<form ref={form} onSubmit={sendEmail} autoComplete="off">

				<label>
					<h3>Name</h3>
					<input type="text" name="user_name"onChange={(e) => setName(e.target.value)} value={name} required/>
				</label>

				<label>
					<h3>Email</h3>
					<input type="email" name="user_email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
				</label>

				<label>
					<h3>Message</h3>
					<textarea name="message" onChange={(e) => setFormMessage(e.target.value)} value={formMessage} required/>
				</label>

				<button type="submit" value="Send">Send</button>
			</form>

			{/* Success/Error element render based on submit process outcome */}
			{status !== '' && <Modal statusMessage={statusMessage} closeModal={closeModal} />}
		</div>
	</div>
  )
}
