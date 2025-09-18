import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

// ContactForm component now accepts setLoading and toast as props
const ContactForm = ({ setLoading, toast }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_b2kobwd",
        "template_6aj4f45",
        form.current,
        { publicKey: "PiuldxkokUNi2N_rt" }
      );
      // The toast function is now called from the prop
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ first_name: '', last_name: '', user_email: '', message: '' });
      // Clear form fields
      form.current.reset();
    } catch (error) {
      // The toast function is now called from the prop
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h3>Let's Work Together</h3>
        <p>Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
      </div>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="John"
              value={formData.first_name}
              onChange={handleInputChange}
              className={errors.first_name ? 'error' : ''}
              autoComplete="given-name"
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Doe"
              value={formData.last_name}
              onChange={handleInputChange}
              className={errors.last_name ? 'error' : ''}
              autoComplete="family-name"
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="user_email">Email Address</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="john.doe@example.com"
            value={formData.user_email}
            onChange={handleInputChange}
            className={errors.user_email ? 'error' : ''}
            autoComplete="email"
          />
          {errors.user_email && <span className="error-message">{errors.user_email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Tell me about your project, ideas, or just say hello..."
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? 'error' : ''}
          ></textarea>
          <div className="character-count">
            {formData.message.length}/500
          </div>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        <button type="submit" disabled={false} className="send-btn">
          <span>Send Message</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;