import React from 'react'

function TextSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="wrapper bg-black">
      <div className="container py-8 py-md-10">
        <div className="row gx-md-8 gx-xl-12 gy-6 align-items-center">
          <div className="col-lg-12 text-white">
            <div className="about-text">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TextSection
