import AppLayout from '~/layouts/app-layout'
import Feature from '~/sections/feature'
import Hero from '~/sections/hero'

export default function () {
  return (
    <AppLayout>
      <Hero />
      <Feature />
    </AppLayout>
  )
}
