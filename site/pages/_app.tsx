import '@assets/static/css/plugins.css'
import '@assets/static/css/style.css'
import 'keen-slider/keen-slider.min.css'

import '@assets/main.css'
import '@assets/chrome-bug.css'

import { Analytics } from '@vercel/analytics/react'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import Menu from '@components/ui/Menu'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Menu />
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
      <Analytics />
    </>
  )
}
