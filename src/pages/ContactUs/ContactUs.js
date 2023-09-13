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
	const [emailMessage, setEmailMessage] = useState('')
	const [status, setStatus] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	// Form inputs reset
	const resetForm = () => {
		setName('');
		setEmail('');
		setEmailMessage('');
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
					<h3>Hotline</h3>
					<p>9am - 9pm <br /> Monday - Friday <br /><a href="tel:+48111222333">+48 111 222 333</a></p>
				</div>
				<div className="contact-correspondence">
					<h3>Correspondence</h3>
					<p>Underhill Hall <br /> 123 Entertainment Street <br /> 12-345 Town City</p>
				</div>
			</div>

			{/* Email form template */}
			<h2>Send us an email</h2>
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
				<textarea name="message" id="u_message" onChange={(e) => setEmailMessage(e.target.value)} value={emailMessage} required/>

				<button className="submit-button" type="submit" value="Send">Send</button>
			</form>

			{/* Success/Error element render based on submit process outcome */}
			{status !== '' && <Modal statusMessage={statusMessage} closeModal={closeModal} />}
		</div>
	</div>
  )
}
