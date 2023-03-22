import Link from 'next/link'
import cn from 'clsx'
import s from './MenuSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

{
  /* <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
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
                    <a className="dropdown-item scroll" href="/#offline">
                      offline art
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="/#digital">
                      digital art
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="/#clothes">
                      clothes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="/#collaborations">
                      collaborations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item scroll" href="/#tattoos">
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
        </div> */
}

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const { closeSidebar } = useUI()

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search">catalog</Link>
            </li>
            <li className={s.item}>
              <h4>works</h4>
              <ul className="ml-4 text-sm">
                {[
                  { name: 'offline art', href: '/#offline' },
                  { name: 'digital art', href: '/#digital' },
                  { name: 'clothes', href: '/#clothes' },
                  { name: 'collaborations', href: '/#collaborations' },
                  { name: 'tattoos', href: '/#tattoos' },
                  { name: 'designs', href: '/product/design' },
                ].map((l: any) => (
                  <li
                    key={l.href}
                    className={cn(s.item, 'text-sm')}
                    onClick={() => closeSidebar()}
                  >
                    <Link href={l.href}>{l.name}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className={s.item}>
              <Link href="/#about">about</Link>
            </li>
            <li className={s.item}>
              <Link href="/#contact">contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

MenuSidebarView
