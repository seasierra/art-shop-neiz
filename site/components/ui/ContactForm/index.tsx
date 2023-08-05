import React, { useState } from 'react'
import axios from 'axios'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/test', formData)
      console.log(response.data) // Optional: Process the response from the server
      // Add code here to handle a successful response, if needed
      setIsSubmitted(true) // Set the form submission status to true
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting the form:', error)
      // Add code here to handle errors, if needed
    }
  }

  return (
    <form
      className="contact-form needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: isSubmitted ? 1 : 0,
        }}
      >
        Form submitted successfully!
      </div>
      <div className="messages"></div>
      <div className="row gx-4">
        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              id="form_name"
              type="text"
              name="name"
              className="form-control rounded-0"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="form_name">Your name</label>
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Please enter your name</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              id="form_email"
              type="email"
              name="email"
              className="form-control rounded-0"
              placeholder="yourmail@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="form_email">Email*</label>
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Please enter correct email</div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-4">
            <textarea
              id="form_message"
              name="message"
              className="form-control rounded-0"
              placeholder="Your message"
              style={{ height: '150px' }}
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="form_message">Message*</label>
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Please enter your message</div>
          </div>
        </div>
        <div className="col-12">
          <input
            type="submit"
            className="btn btn-outline-white rounded-0 btn-send mb-3"
            value="Submit"
          />
        </div>
      </div>
    </form>
  )
}

export default ContactForm
