import { UserNav } from '@components/common'
import Link from 'next/link'
import { useState } from 'react'

export default function Menu() {
  const [show, setShow] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg center-nav transparent">
      <div className="container flex-lg-row flex-nowrap align-items-center">
        <div
          className={`navbar-collapse visible offcanvas offcanvas-nav offcanvas-start ${
            show ? 'show' : ''
          }`}
        >
          <div className="offcanvas-header d-lg-none">
            <h3 className="fs-30 mb-0 text-inherit">neiz.vesten</h3>
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
              <li className="nav-item">
                <Link className="nav-link text-current" href="/search">
                  catalog
                </Link>
              </li>
              <li className="nav-item  dropdown">
                <a
                  className="nav-link text-current dropdown-toggle active show"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  works
                </a>
                <ul className="dropdown-menu active show">
                  {[
                    { name: 'offline art', href: '/#offline' },
                    { name: 'digital art', href: '/#digital' },
                    { name: 'clothes', href: '/#clothes' },
                    { name: 'collaborations', href: '/#collaborations' },
                    { name: 'tattoos', href: '/#tattoos' },
                    { name: 'designs', href: '/product/design' },
                  ].map((l: any) => (
                    <li className="nav-item text-current" key={l.href}>
                      <Link className="dropdown-item scroll" href={l.href}>
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-current" href="/#about">
                  about
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-current" href="/#contact">
                  contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="navbar-other ms-lg-4">
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item text-current d-lg-none">
              <button
                className="hamburger !text-current offcanvas-nav-btn"
                onClick={() => setShow(true)}
              >
                <span></span>
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  )
}
