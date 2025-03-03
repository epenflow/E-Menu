import { ThemeProvider } from 'next-themes'
import type React from 'react'
import { Toaster } from '~/components/ui/sonner'

export default function ({ children }: React.PropsWithChildren) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      />
      {children}
    </>
  )
}
