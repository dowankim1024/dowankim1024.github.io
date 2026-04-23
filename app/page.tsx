import Header from '@/components/Home/Header'
import ScatterPhysicsZone from '@/components/Home/Scatter/ScatterPhysicsZone'
import HomeAboutWaveSurface from '@/components/Home/HomeAboutWaveSurface'
import Home from '@/components/Home/Home'
import About from '@/components/Home/About'
import Career from '@/components/Home/Career'
import Work from '@/components/Home/Work'
import Contact from '@/components/Home/Contact'
import ArrowUp from '@/components/Home/ArrowUp'

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <ScatterPhysicsZone>
          <HomeAboutWaveSurface>
            <Home />
            <About />
          </HomeAboutWaveSurface>
          <Career />
        </ScatterPhysicsZone>
        <Work />
        <ArrowUp />
      </main>
      <Contact />
    </>
  )
}
