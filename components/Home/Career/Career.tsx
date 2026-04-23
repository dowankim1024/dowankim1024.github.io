import { experiences, education, awards, certifications } from './Career.constants'
import ScatterLetterText from '@/components/Home/Scatter/ScatterLetterText'

export default function Career() {
  return (
    <section id="career" className="relative bg-[#1b1e26] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScatterLetterText
          as="h2"
          text="Career"
          className="text-5xl mb-12 text-center text-white max-md:text-3xl max-md:mb-8"
          segmentLocale="en"
        />

        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <ScatterLetterText
              as="h3"
              text="Experience"
              className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl m-0"
              segmentLocale="en"
            />
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {experiences.map((exp, index) => (
                <li
                  key={index}
                  className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1"
                >
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <ScatterLetterText
                      as="span"
                      text={exp.company}
                      className="text-lg font-bold text-white"
                      segmentLocale="en"
                    />
                    <ScatterLetterText
                      as="span"
                      text={exp.period}
                      className="text-sm text-[#03e8f9] font-medium"
                      segmentLocale="en"
                    />
                  </div>
                  {exp.role && (
                    <ScatterLetterText
                      as="p"
                      text={exp.role}
                      className="text-[0.95rem] text-white/80 m-0 leading-relaxed"
                      segmentLocale="ko"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <ScatterLetterText
              as="h3"
              text="Education"
              className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl m-0"
              segmentLocale="en"
            />
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {education.map((edu, index) => (
                <li
                  key={index}
                  className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1"
                >
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <ScatterLetterText
                      as="span"
                      text={edu.school}
                      className="text-lg font-bold text-white"
                      segmentLocale="en"
                    />
                    <ScatterLetterText
                      as="span"
                      text={edu.period}
                      className="text-sm text-[#03e8f9] font-medium"
                      segmentLocale="en"
                    />
                  </div>
                  {Array.isArray(edu.major) ? (
                    <div className="text-[0.95rem] text-white/80 leading-relaxed [&>div]:mb-1 [&>div:last-child]:mb-0">
                      {edu.major.map((majorItem, majorIndex) => (
                        <ScatterLetterText
                          key={majorIndex}
                          as="div"
                          text={majorItem}
                          className=""
                          segmentLocale="ko"
                        />
                      ))}
                    </div>
                  ) : (
                    <ScatterLetterText
                      as="p"
                      text={edu.major}
                      className="text-[0.95rem] text-white/80 m-0 leading-relaxed"
                      segmentLocale="ko"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <ScatterLetterText
              as="h3"
              text="Awards"
              className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl m-0"
              segmentLocale="en"
            />
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {awards.map((award, index) => (
                <li
                  key={index}
                  className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1"
                >
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <ScatterLetterText
                      as="span"
                      text={award.year}
                      className="text-base font-bold text-[#03e8f9]"
                      segmentLocale="en"
                    />
                    <ScatterLetterText
                      as="span"
                      text={award.award}
                      className="text-sm text-[#fd6413] font-bold bg-[rgba(253,100,19,0.1)] px-3 py-1 rounded"
                      segmentLocale="ko"
                    />
                  </div>
                  <ScatterLetterText
                    as="p"
                    text={award.title}
                    className="text-[0.95rem] text-white/80 m-0 leading-relaxed"
                    segmentLocale="en"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <ScatterLetterText
              as="h3"
              text="Certification"
              className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl m-0"
              segmentLocale="en"
            />
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {certifications.map((cert, index) => (
                <li
                  key={index}
                  className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1"
                >
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <ScatterLetterText
                      as="span"
                      text={cert.name}
                      className="text-lg font-bold text-white"
                      segmentLocale="en"
                    />
                    <ScatterLetterText
                      as="span"
                      text={cert.period}
                      className="text-sm text-[#03e8f9] font-medium"
                      segmentLocale="en"
                    />
                  </div>
                  <ScatterLetterText
                    as="p"
                    text={cert.description}
                    className="text-[0.95rem] text-white/80 m-0 leading-relaxed"
                    segmentLocale="ko"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
