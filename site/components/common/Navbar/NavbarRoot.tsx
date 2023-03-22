import { FC, useState, useEffect, ReactNode } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.css'
import { useRouter } from 'next/router'

const NavbarRoot: FC<{ children?: ReactNode }> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const { route } = useRouter()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <div
      className={cn(
        s.root,
        !hasScrolled && route !== '/' ? 'text-white' : 'text-black',
        {
          'shadow-magical': hasScrolled,
          'bg-white': hasScrolled,
        }
      )}
    >
      {children}
    </div>
  )
}

export default NavbarRoot
