import React, { useState } from 'react';
import { Check, Upload, ArrowRight, Sparkles, Compass, Shield, Award } from 'lucide-react';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { studioInfo } from '../data/studioData';

export function Careers() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Senior Project Architect',
    portfolioUrl: '',
    message: '',
  });

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const positions = [
    {
      id: 'senior-architect',
      title: 'Senior Project Architect (Private Residences)',
      location: 'Mumbai Studio',
      type: 'Full-Time',
      description: 'Lead private residential home projects from concept sketch and municipal approvals through to site completion. Requires 7+ years of experience in high-end residential architecture and villa construction.',
      requirements: ['Master in Architecture or Council of Architecture (COA) registration', 'Strong experience with stone and RCC residential construction', 'Fluent in English; Hindi/Marathi is a plus'],
    },
    {
      id: 'interior-designer',
      title: 'Senior Interior Architect & Furniture Specialist',
      location: 'Bengaluru Studio',
      type: 'Full-Time',
      description: 'Design bespoke teakwood and brass joinery, select furniture and lighting, source authentic Indian stones and marbles, and create detailed interior drawings for luxury homes.',
      requirements: ['5+ years in luxury interior architecture and fit-outs', 'Experience in modular kitchens, wardrobes, and stone detailing', 'Proficient in AutoCAD, Rhino, and SketchUp'],
    },
    {
      id: 'bim-computational',
      title: '3D Architectural Visualizer & Artist',
      location: 'Hyderabad Studio / Remote',
      type: 'Full-Time',
      description: 'Create realistic 3D architectural renders, daylight simulations, and presentation models for residential and commercial projects.',
      requirements: ['Strong portfolio of photorealistic architectural renders', 'Proficient in 3ds Max / Corona / V-Ray / Lumion / Blender', 'Background in architecture or 3D design'],
    },
    {
      id: 'apprentice-fellow',
      title: 'Architecture & Model-Making Intern',
      location: 'Mumbai Studio',
      type: '6-Month Paid Internship',
      description: 'Work directly with our design team building physical study models, organizing material samples, and assisting with design presentations.',
      requirements: ['Enrolled in or recent graduate of B.Arch / Interior Design degree', 'Good physical model-making and drafting skills', 'Enthusiasm for materials, stone craft, and joinery'],
    },
  ];

  const culturePillars = [
    {
      icon: Compass,
      title: 'Focus on Quality',
      desc: 'We take on a limited number of projects each year so we can give every detail the care it deserves.',
    },
    {
      icon: Sparkles,
      title: 'Natural Materials',
      desc: 'We work directly with stone quarries, teakwood craftsmen, and master artisans across India.',
    },
    {
      icon: Shield,
      title: 'Sustainable Design',
      desc: 'We design climate-responsive homes with natural stone, solid timber, and passive cooling planning.',
    },
    {
      icon: Award,
      title: 'Team Growth',
      desc: 'Our architects work closely on all stages of design, collaborating directly with clients and partners.',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File exceeds 15MB limit.' }));
        setFileName('');
        return;
      }
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required.';
    if (!formData.message.trim()) newErrors.message = 'Please provide a brief message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('[Career Application Payload]:', {
      ...formData,
      fileName,
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Careers at Atelier Vauquelin"
        description="Join Atelier Vauquelin. Explore open architecture, interior design, and 3D visualization jobs in Mumbai, Bengaluru, and Hyderabad."
      />

      {/* 1. CAREERS HERO BANNER (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-20 lg:py-28 border-b border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-3 block">Join Our Team</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F3ED] mb-6">
              Build Your Architecture Career With Us
            </h1>
            <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              We are looking for creative architects, interior designers, and 3D visualizers who appreciate quality craftsmanship and good design. Explore open positions in Mumbai, Bengaluru, and Hyderabad.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STUDIO CULTURE & ENVIRONMENT (Warm Linen #EFEFEA) */}
      <div className="bg-[#EFEFEA] text-[#303A35] py-20 lg:py-28">
        <div className="editorial-container">
          <div className="mb-12 sm:mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-2 block">Studio Culture</span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#303A35] font-normal mb-4">Our Values & Studio Culture</h2>
            <p className="text-[#5C6661] text-base sm:text-lg font-light max-w-2xl">How we work together, research materials, and maintain high standards for our clients.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {culturePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] shadow-subtle space-y-4 hover:border-[#C27D66] transition-all duration-300 flex flex-col justify-between rounded-[2px]"
                >
                  <div className="space-y-3">
                    <Icon className="w-6 h-6 text-[#C27D66]" />
                    <h3 className="font-editorial text-2xl text-[#303A35] font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6661] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(48,58,53,0.12)] font-sans text-[10px] uppercase tracking-widest text-[#C27D66] font-semibold">
                    Studio Principle
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. ACTIVE OPEN POSITIONS LIST (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-20 lg:py-28 border-t border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="mb-12 sm:mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-2 block">Open Positions</span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5F3ED] font-normal mb-4">Current Job Openings</h2>
            <p className="text-[#A3ADA7] text-base sm:text-lg font-light max-w-2xl">We review applications on a regular basis. Select a role below to review the requirements and apply.</p>
          </div>

          <div className="space-y-6">
            {positions.map((pos) => (
              <div
                key={pos.id}
                className="p-6 sm:p-8 lg:p-10 bg-[#242C28] border border-[rgba(245,243,237,0.12)] space-y-6 hover:border-[#C27D66] transition-all duration-300 shadow-subtle rounded-[2px]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[rgba(245,243,237,0.10)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-[#C27D66] uppercase tracking-wider mb-2 font-semibold">
                      <span>{pos.location}</span>
                      <span>•</span>
                      <span className="text-[#A3ADA7] font-normal">{pos.type}</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F3ED] font-normal">
                      {pos.title}
                    </h3>
                  </div>

                  <a
                    href="#apply-form"
                    onClick={() => setFormData((prev) => ({ ...prev, role: pos.title }))}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D211F] border border-[rgba(245,243,237,0.15)] hover:border-[#C27D66] text-[#F5F3ED] font-sans text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px] shrink-0 rounded-[2px]"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C27D66]" />
                  </a>
                </div>

                <p className="text-sm sm:text-base text-[#A3ADA7] leading-relaxed font-light">
                  {pos.description}
                </p>

                <div className="pt-2">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-[#F5F3ED] font-semibold mb-2">
                    Key Requirements:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-[#A3ADA7] font-light">
                    {pos.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C27D66] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. APPLICATION FORM (Warm Linen #EFEFEA) */}
      <section id="apply-form" className="bg-[#EFEFEA] text-[#303A35] py-20 lg:py-28 border-t border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container max-w-3xl">
          <div className="bg-[#F5F5F0] p-6 sm:p-12 border border-[rgba(48,58,53,0.12)] shadow-subtle space-y-8 rounded-[2px]">
            
            <div className="text-center space-y-3 pb-6 border-b border-[rgba(48,58,53,0.12)]">
              <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Apply Online</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#303A35] font-normal">
                Submit Your Portfolio & CV
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6661] leading-relaxed font-light max-w-lg mx-auto">
                Please include a link to your portfolio or upload your CV. We review every application carefully.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#EAE8E1] p-8 text-center space-y-4 border border-[rgba(48,58,53,0.12)] rounded-[2px]">
                <div className="w-12 h-12 bg-[#C27D66] text-[#1D211F] flex items-center justify-center mx-auto rounded-[2px]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl text-[#303A35] font-normal">
                  Application Received
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6661] leading-relaxed font-light max-w-md mx-auto">
                  Thank you, <strong className="font-semibold text-[#303A35]">{formData.fullName}</strong>. We have received your application for the <strong className="font-semibold text-[#303A35]">{formData.role}</strong> role and will be in touch soon.
                </p>
                <div className="pt-4">
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Smith"
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                    />
                    {errors.fullName && (
                      <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                    />
                    {errors.email && (
                      <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.email}</p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Target Role */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Position Applied For
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                    >
                      {positions.map((p) => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                      <option value="General Inquiry">General Application</option>
                    </select>
                  </div>

                  {/* Portfolio Link */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Portfolio Link / Website
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://myportfolio.com"
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                    />
                  </div>

                </div>

                {/* File Upload */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                    Upload Resume / Portfolio (PDF, max 15MB)
                  </label>
                  <div className="relative border border-dashed border-[rgba(48,58,53,0.25)] p-6 text-center bg-[#FFFFFF] hover:border-[#C27D66] transition-colors rounded-[2px]">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 text-[#C27D66] mx-auto mb-2" />
                    <p className="font-sans text-xs text-[#303A35] font-medium">
                      {fileName ? `Attached: ${fileName}` : 'Click or drag PDF file here to upload'}
                    </p>
                    <p className="text-[10px] text-[#5C6661] mt-1 font-sans">
                      Max file size: 15MB.
                    </p>
                  </div>
                  {errors.file && (
                    <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.file}</p>
                  )}
                </div>

                {/* Statement of Interest */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                    Cover Note / Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us briefly about your experience, design interests, and why you would like to work with us..."
                    className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none resize-none rounded-[2px]"
                  />
                  {errors.message && (
                    <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" arrow className="w-full justify-center">
                    Submit Application
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;

