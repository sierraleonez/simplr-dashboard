import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../src/components/Auth/provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
