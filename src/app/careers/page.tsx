import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Careers | Offline Living",
  description: "Join the Offline Living team and help us build the world's best platform for preserving memories.",
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "New York, NY or Remote",
      type: "Full-time"
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote (Global)",
      type: "Full-time"
    },
    {
      title: "Print Production Manager",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-theme-ivory pt-40 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-serif text-theme-black mb-4">Join Our Team</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            We're on a mission to bring digital memories back into the real world. Help us build the future of physical storytelling.
          </p>
        </div>

        <div className="mb-20">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=400&fit=crop" 
            alt="Team collaborating" 
            className="w-full h-80 object-cover rounded-2xl shadow-sm border border-theme-black/10"
            loading="lazy" 
            data-placeholder="true"
          />
        </div>

        <h2 className="text-3xl font-serif text-theme-black mb-8">Open Positions</h2>
        
        <div className="space-y-4 mb-20">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-theme-black/10 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-medium text-theme-black group-hover:underline decoration-1 underline-offset-4">{job.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-theme-black/60">
                  <span className="bg-theme-black/5 px-2 py-1 rounded">{job.department}</span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {job.location}
                  </span>
                  <span>&bull;</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <button className="text-theme-black border border-theme-black/20 rounded px-4 py-2 hover:bg-theme-black hover:text-white transition-colors text-sm font-medium">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center bg-white p-12 rounded-2xl border border-theme-black/10 shadow-sm">
          <h3 className="text-2xl font-serif text-theme-black mb-4">Don't see a fit?</h3>
          <p className="text-theme-black/70 mb-6 max-w-lg mx-auto">
            We're always looking for talented individuals who are passionate about our mission. Send us your resume and we'll keep you in mind for future openings.
          </p>
          <a href="mailto:careers@offlineliving.com" className="inline-block bg-theme-black text-white px-6 py-3 rounded hover:bg-black transition-colors">
            Email Us
          </a>
        </div>

      </div>
    </div>
  );
}
