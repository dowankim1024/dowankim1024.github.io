import Image from 'next/image'
import { aboutDescriptions, majors, jobs } from './About.constants'

export default function About() {
  return (
    <section id="about" className="py-16 text-center">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-5xl mb-12">About me</h2>
        {aboutDescriptions.map((sentence) => (
          <p key={sentence} className="text-2xl my-2 max-md:text-xl">
            {sentence}
          </p>
        ))}
        <ul className="flex gap-4 my-10 flex-col md:flex-row">
          {majors.map((major) => (
            <li key={major.title} className="flex-1 bg-[#1b1e26] px-4 py-8 text-white rounded-2xl cursor-default shadow-[4px_8px_8px_rgba(0,0,0,0.38)] transition-all duration-300 hover:[&_i]:-rotate-[15deg] hover:[&_i]:scale-125">
              <i className={`${major.iconClass} text-6xl my-4 text-[#03e8f9] transition-all duration-300`}></i>
              <p className="text-2xl font-bold mb-4">{major.title}</p>
              <p>{major.description}</p>
            </li>
          ))}
        </ul>
        <ul className="text-left">
          {jobs.map((job) => (
            <li key={job.name} className="flex items-center gap-2 mb-4">
              <Image
                className="w-10 h-10 object-cover"
                src={job.logo}
                alt={job.alt}
                width={70}
                height={70}
              />
              <div>
                <p className="text-white">{job.name}</p>
                <p className="text-white text-sm">{job.period}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

