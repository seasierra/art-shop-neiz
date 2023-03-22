import Link from 'next/link'
import { useState } from 'react'

export default function Menu() {
  const [show, setShow] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg center-nav transparent position-absolute navbar-dark">
      <div className="container flex-lg-row flex-nowrap align-items-center">
        <div className="navbar-brand w-100">
          <Link href="/" className="text-brand nav-link">
            neiz.vesten
          </Link>
        </div>
        <div
          className={`navbar-collapse visible offcanvas offcanvas-nav offcanvas-start ${
            show ? 'show' : ''
          }`}
        >
          <div className="offcanvas-header d-lg-none">
            <h3 className="text-white fs-30 mb-0">neiz.vesten</h3>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => setShow(false)}
            ></button>
          </div>
          <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active show"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  works
                </a>
                <ul className="dropdown-menu active show">
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="#offline">
                      offline art
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="#digital">
                      digital art
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="#clothes">
                      clothes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="#collaborations">
                      collaborations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="#tattoos">
                      tattoos
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" href="/product/design">
                      designs
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link scroll" href="#about">
                  about
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scroll" href="#contact">
                  contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-other ms-lg-4">
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item d-lg-none">
              <button
                className="hamburger offcanvas-nav-btn"
                onClick={() => setShow(true)}
              >
                <span></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
