import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { VisionMission } from './components/sections/VisionMission'
import Pyramid  from './components/sections/Pyramid'
import { Manifesto } from './components/sections/Manifesto'
import { Events } from './components/sections/Events'
import { FAQ } from './components/sections/FAQ'
import { Contact } from './components/sections/Contact'
import { CallToAction } from './components/sections/CallToAction'
import { Whypurple } from './components/sections/Whypurple'

export default function HomePage() {
  return (
    <div className=" w-full min-h-screen bg-black text-white">
      <Navbar />
      <main className='w-full'>
        <Hero />
        <VisionMission />
        <Whypurple/>
        <Pyramid />
        <Manifesto />
        <Events />
        <FAQ />
        <Contact />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}