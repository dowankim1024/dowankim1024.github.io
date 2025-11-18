import Header from '@/components/Home/Header'
import Home from '@/components/Home/Home'
import About from '@/components/Home/About'
import Skills from '@/components/Home/Skills'
import Work from '@/components/Home/Work'
import Contact from '@/components/Home/Contact'
import ArrowUp from '@/components/Home/ArrowUp'

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Skills />
        <Work />
        <ArrowUp />
      </main>
      <Contact />
    </>
  )
}
