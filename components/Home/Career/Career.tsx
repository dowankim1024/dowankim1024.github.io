import { experiences, education, awards, certifications } from './Career.constants'

export default function Career() {
  return (
    <section id="career" className="relative bg-[#1b1e26] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-5xl mb-12 text-center text-white max-md:text-3xl max-md:mb-8">Career</h2>
        
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <h3 className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl">Experience</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {experiences.map((exp, index) => (
                <li key={index} className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <span className="text-lg font-bold text-white">{exp.company}</span>
                    <span className="text-sm text-[#03e8f9] font-medium">{exp.period}</span>
                  </div>
                  {exp.role && <p className="text-[0.95rem] text-white/80 m-0 leading-relaxed">{exp.role}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <h3 className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl">Education</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {education.map((edu, index) => (
                <li key={index} className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <span className="text-lg font-bold text-white">{edu.school}</span>
                    <span className="text-sm text-[#03e8f9] font-medium">{edu.period}</span>
                  </div>
                  {Array.isArray(edu.major) ? (
                    <div className="text-[0.95rem] text-white/80 leading-relaxed [&>div]:mb-1 [&>div:last-child]:mb-0">
                      {edu.major.map((majorItem, majorIndex) => (
                        <div key={majorIndex}>{majorItem}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[0.95rem] text-white/80 m-0 leading-relaxed">{edu.major}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <h3 className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl">Awards</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {awards.map((award, index) => (
                <li key={index} className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <span className="text-base font-bold text-[#03e8f9]">{award.year}</span>
                    <span className="text-sm text-[#fd6413] font-bold bg-[rgba(253,100,19,0.1)] px-3 py-1 rounded">{award.award}</span>
                  </div>
                  <p className="text-[0.95rem] text-white/80 m-0 leading-relaxed">{award.title}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050a13] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 hover:border-[#03e8f9] hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)] max-md:p-6">
            <h3 className="text-2xl mb-6 text-[#03e8f9] font-bold border-b-2 border-[#03e8f9] pb-2 max-md:text-xl">Certification</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {certifications.map((cert, index) => (
                <li key={index} className="p-4 bg-[rgba(3,232,249,0.05)] rounded-lg border-l-[3px] border-[#03e8f9] transition-all duration-[250ms] hover:bg-[rgba(3,232,249,0.1)] hover:translate-x-1">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2 max-md:flex-col max-md:items-start">
                    <span className="text-lg font-bold text-white">{cert.name}</span>
                    <span className="text-sm text-[#03e8f9] font-medium">{cert.period}</span>
                  </div>
                  <p className="text-[0.95rem] text-white/80 m-0 leading-relaxed">{cert.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

