import React from 'react'

function ContactForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target
    // handle form submission
  }

  return (
    <form
      className="contact-form needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
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
