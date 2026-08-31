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
      location: 'Paris Atelier (6th Arr.)',
      type: 'Full-Time • On-Site',
      description: 'Lead high-profile private residential commissions from initial concept sketch and statutory approval to structural handover. Requires 7+ years in high-end European residential architecture and deep expertise in stone construction.',
      requirements: ['Master of Architecture (DESA / HMONP / RIBA Part III)', 'Proven mastery of French stone construction & detailing', 'Fluency in French & English'],
    },
    {
      id: 'interior-designer',
      title: 'Senior Interior Architect & Joinery Specialist',
      location: 'London Atelier (Mayfair)',
      type: 'Full-Time • Hybrid',
      description: 'Design bespoke millwork suites, curate gallery-grade FF&E, source unlacquered metals, and produce exhaustive 1:5 construction joinery packages for luxury estates in the UK and Alps.',
      requirements: ['5+ years in high-end interior architecture', 'Expertise in custom millwork detailing and natural stone extraction', 'AutoCAD, Rhino, & Adobe Creative Suite mastery'],
    },
    {
      id: 'bim-computational',
      title: 'Computational Design & 3D Spatial Visualizer',
      location: 'Geneva Atelier',
      type: 'Full-Time • On-Site',
      description: 'Author evocative, painterly architectural renderings, physical 3D printed topographical mockups, and parametric solar envelope calculations.',
      requirements: ['Expertise in Rhino, Grasshopper, Corona / V-Ray, and Unreal Engine', 'Strong sensibility for natural daylight simulation', 'Background in architecture or fine arts'],
    },
    {
      id: 'apprentice-fellow',
      title: 'Studio Model-Making & Material Research Fellow',
      location: 'Paris Atelier',
      type: '6-Month Paid Fellowship',
      description: 'Work directly alongside our founding partners casting plaster models, preparing physical timber/stone sample boards, and archiving lithic samples from European quarries.',
      requirements: ['Enrolled or recent graduate in Architecture or Fine Art', 'Exceptional physical craftsmanship and plaster casting skills', 'Keen eye for tactile material composition'],
    },
  ];

  const culturePillars = [
    {
      icon: Compass,
      title: 'Slowness & Craft Dedication',
      desc: 'We purposefully take on a strictly limited number of commissions per year to give every detail the rigor and quiet contemplation it deserves.',
    },
    {
      icon: Sparkles,
      title: 'Material Geographies',
      desc: 'Our architects regularly travel directly to stone quarries in Burgundy, Vals, and Istria, fostering direct relationships with master stonemasons.',
    },
    {
      icon: Shield,
      title: 'Acoustic & Ecological Rigor',
      desc: 'We pioneer zero-carbon heavy stone construction, passive climate designs, and natural lime-washed environments that nurture human wellbeing.',
    },
    {
      icon: Award,
      title: 'Autonomy & Authorship',
      desc: 'Project architects carry direct ownership of commissions, presenting directly to discerning international patrons with studio partner guidance.',
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
    if (!formData.message.trim()) newErrors.message = 'Please provide a brief statement of interest.';

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
        title="Careers & Atelier Fellowship"
        description="Join Atelier Vauquelin. Explore open architectural, interior design, and computational modeling positions across Paris, London, and Geneva."
      />

      {/* 1. CAREERS HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="editorial-eyebrow mb-3 block">Join the Atelier</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary mb-6">
              Cultivating an Architecture of Quiet Permanence
            </h1>
            <p className="text-ink-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              We seek visionary architects, interior artisans, and computational researchers who value material honesty over transient trends. Explore active openings in Paris, London, and Geneva.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STUDIO CULTURE & ENVIRONMENT (#FAF9F5 with #FFFFFF Tiles) */}
      <Section
        variant="default"
        spacing="loose"
        eyebrow="Studio Environment"
        title="Culture, Values & Methodology"
        subtitle="How we collaborate, research materials, and maintain a rigorous standard of spatial excellence."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {culturePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-bg-surface border border-border-light shadow-subtle space-y-4 hover:border-accent-brass transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Icon className="w-6 h-6 text-accent-brass" />
                  <h3 className="font-editorial text-2xl text-ink-primary font-normal">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border-light font-sans text-[10px] uppercase tracking-widest text-accent-brass font-semibold">
                  Core Atelier Value
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 3. ACTIVE OPEN POSITIONS LIST (#FFFFFF Surface Section with #FAF9F5 Job Rows) */}
      <Section
        variant="surface"
        spacing="loose"
        eyebrow="Active Opportunities"
        title="Open Studio Positions"
        subtitle="We review portfolios on a rolling basis. Select a role below to review the requirements and submit your application."
      >
        <div className="space-y-6">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="p-6 sm:p-8 lg:p-10 bg-bg-primary border border-border-light space-y-6 hover:border-accent-brass transition-all duration-300 shadow-subtle"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border-light">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-accent-brass uppercase tracking-wider mb-2 font-semibold">
                    <span>{pos.location}</span>
                    <span>•</span>
                    <span className="text-ink-subtle font-normal">{pos.type}</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary font-normal">
                    {pos.title}
                  </h3>
                </div>

                <a
                  href="#apply-form"
                  onClick={() => setFormData((prev) => ({ ...prev, role: pos.title }))}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-surface border border-border-light hover:border-accent-brass text-ink-primary font-sans text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px] shrink-0"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-brass" />
                </a>
              </div>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                {pos.description}
              </p>

              <div className="pt-2">
                <h4 className="font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold mb-2">
                  Role Requirements:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-ink-muted font-light">
                  {pos.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-accent-brass shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. APPLICATION FORM (#F1ECE3 Warm Section with #FFFFFF Form Card) */}
      <section id="apply-form" className="bg-bg-warm py-20 lg:py-28 border-t border-border-warm/60">
        <div className="editorial-container max-w-3xl">
          <div className="bg-bg-surface p-6 sm:p-12 border border-border-light shadow-card space-y-8">
            
            <div className="text-center space-y-3 pb-6 border-b border-border-light">
              <span className="editorial-eyebrow">Direct Studio Submission</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary font-normal">
                Submit Your Portfolio & CV
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light max-w-lg mx-auto">
                Please include a link to your curated PDF portfolio or website. We review every submission personally within ten business days.
              </p>
            </div>

            {submitted ? (
              <div className="bg-bg-warm p-8 text-center space-y-4 border border-border-warm/60">
                <div className="w-12 h-12 bg-accent-brass text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl text-ink-primary font-normal">
                  Application Successfully Received
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light max-w-md mx-auto">
                  Thank you, <strong className="font-semibold text-ink-primary">{formData.fullName}</strong>. Your portfolio and introduction for the <strong className="font-semibold text-ink-primary">{formData.role}</strong> position have been registered with our partners.
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
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Charlotte Perriand"
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    />
                    {errors.fullName && (
                      <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="charlotte@studio.com"
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.email}</p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Target Role */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Role / Position Applied For
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    >
                      {positions.map((p) => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                      <option value="General Architectural Inquiry">General Speculative Inquiry</option>
                    </select>
                  </div>

                  {/* Portfolio Link */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Portfolio Link / Website
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://mywork.com or Issuu link"
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    />
                  </div>

                </div>

                {/* File Upload (Resume / PDF) */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Curriculum Vitae / Sample Portfolio (PDF, max 15MB)
                  </label>
                  <div className="relative border border-dashed border-border-warm p-6 text-center bg-bg-primary hover:border-accent-brass transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 text-accent-brass mx-auto mb-2" />
                    <p className="font-sans text-xs text-ink-primary font-medium">
                      {fileName ? `Attached: ${fileName}` : 'Click or drag PDF CV here to upload'}
                    </p>
                    <p className="text-[10px] text-ink-subtle mt-1 font-sans">
                      Max file size: 15MB. Please ensure all sensitive personal info is redacted.
                    </p>
                  </div>
                  {errors.file && (
                    <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.file}</p>
                  )}
                </div>

                {/* Statement of Interest */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Statement of Interest & Material Philosophy *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your design ethos, favorite architectural stone/material, and why you wish to join Atelier Vauquelin..."
                    className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" arrow className="w-full justify-center">
                    Submit Formal Application
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
