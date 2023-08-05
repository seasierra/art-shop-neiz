import { UserNav } from '@components/common'
import Link from 'next/link'
import { useState } from 'react'

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg center-nav transparent">
      <div className="container flex-lg-row flex-nowrap align-items-center">
        <div
          className={`navbar-collapse visible offcanvas offcanvas-nav offcanvas-start`}
        >
          <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
            <ul className="navbar-nav">
              {/*
              <li className="nav-item">
                <Link className="nav-link text-current" href="/search">
                  shop
                </Link>
              </li>
  */}
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
                    { name: 'offline art', href: '/#offlineart' },
                    { name: 'digital art', href: '/#digitalart' },
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
      </div>
    </nav>
  )
}
