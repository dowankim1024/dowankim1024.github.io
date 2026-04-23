import Image from 'next/image'
import { IBM_Plex_Sans_KR } from 'next/font/google'
import { aboutDescriptions, majors, jobs } from './About.constants'
import ScatterLetterText from '@/components/Home/Scatter/ScatterLetterText'
import ScatterBlock from '@/components/Home/Scatter/ScatterBlock'

const aboutDescriptionFont = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function About() {
  return (
    <section id="about" className="py-16 text-center">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScatterLetterText
          as="h2"
          text="About me"
          className="text-5xl mb-12 text-white max-md:text-4xl"
          segmentLocale="en"
        />
        {aboutDescriptions.map((sentence) => (
          <ScatterLetterText
            key={sentence}
            text={sentence}
            className={`${aboutDescriptionFont.className} m-0 text-2xl my-2 max-md:text-xl`}
            segmentLocale="ko"
          />
        ))}
        <ul className="flex gap-4 my-10 flex-col md:flex-row">
          {majors.map((major) => (
            <li
              key={major.title}
              className="flex-1 bg-[#1b1e26] px-4 py-8 text-white rounded-2xl cursor-default shadow-[4px_8px_8px_rgba(0,0,0,0.38)] transition-all duration-300 hover:[&_i]:-rotate-[15deg] hover:[&_i]:scale-125"
            >
              <ScatterBlock>
                <i
                  className={`${major.iconClass} text-6xl my-4 text-[#03e8f9] transition-all duration-300 block`}
                />
              </ScatterBlock>
              <ScatterLetterText
                as="p"
                text={major.title}
                className="m-0 text-2xl font-bold mb-4 text-white"
                segmentLocale="en"
              />
              <ScatterLetterText
                as="p"
                text={major.description}
                className="m-0 text-white/90"
                segmentLocale="en"
              />
            </li>
          ))}
        </ul>
        <ul className="text-left">
          {jobs.map((job) => (
            <li key={job.name} className="mb-4 flex items-center gap-2">
              <ScatterBlock className="flex shrink-0 items-center gap-2">
                <Image
                  className="w-10 h-10 object-cover shrink-0"
                  src={job.logo}
                  alt={job.alt}
                  width={70}
                  height={70}
                />
                <div>
                  <ScatterLetterText
                    as="p"
                    text={job.name}
                    className="m-0 text-white"
                    segmentLocale="en"
                  />
                  <ScatterLetterText
                    as="p"
                    text={job.period}
                    className="m-0 text-white text-sm"
                    segmentLocale="en"
                  />
                </div>
              </ScatterBlock>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
