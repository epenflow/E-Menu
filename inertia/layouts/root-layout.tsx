import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Toaster } from '~/components/ui/sonner'
import FlashMessage from '~/components/utility/flash-message'

type RootLayoutProps = React.PropsWithChildren
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isClient, setClient] = React.useState<boolean>(false)

  React.useEffect(() => {
    setClient(true)
  }, [setClient])

  return isClient ? (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster richColors />
        {children}
        <FlashMessage />
      </ThemeProvider>
    </>
  ) : null
}
export default RootLayout
