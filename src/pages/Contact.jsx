import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Upload, ArrowRight, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { studioInfo } from '../data/studioData';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    typology: 'Private Residential Sanctuary',
    scope: 'Architecture & Full Interior Fit-out',
    budget: '€1.5M – €3.0M',
    timeline: 'Within 6–12 months',
    message: '',
    botFieldWebsite: '',
  });

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedAtelier, setSelectedAtelier] = useState('Paris');

  const typologies = [
    'Private Residential Sanctuary',
    'Historical Restoration & Heritage Palazzo',
    'Alpine Wellness & Thermal Sanctuary',
    'Cultural Gallery or Pavilion',
    'Boutique Hospitality & Winery Estate',
    'Interior Architecture & Bespoke Joinery Only',
  ];

  const budgetRanges = [
    'Under €750k',
    '€750k – €1.5M',
    '€1.5M – €3.0M',
    '€3.0M – €6.0M',
    '€6.0M+',
    'To Be Determined / Feasibility Phase',
  ];

  const timelines = [
    'Immediate (Within 3 months)',
    'Within 6–12 months',
    '1–2 years (Early statutory planning)',
    'Speculative / Land acquisition stage',
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
      if (file.size > 25 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File exceeds 25MB limit.' }));
        setFileName('');
        return;
      }
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.botFieldWebsite) {
      console.warn('Spam submission detected and blocked.');
      setSubmitted(true);
      return;
    }

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'A valid email address is required.';
    if (!formData.message.trim()) newErrors.message = 'Please provide a brief description of your project or site.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('[Commission Brief Submission Payload]:', {
      ...formData,
      fileName,
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "ArchitecturalFirm",
      "name": "Atelier Vauquelin",
      "telephone": "+33142689010",
      "email": "paris@ateliervauquelin.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "18 Rue de l'Odéon",
        "addressLocality": "Paris",
        "postalCode": "75006",
        "addressCountry": "FR"
      }
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Contact & Commission Brief"
        description="Initiate an architectural brief or schedule a private consultation at our Paris, London, or Geneva ateliers."
        schema={contactSchema}
      />

      {/* 1. CONTACT HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="editorial-eyebrow mb-3 block">Commission Dialogue</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary mb-6">
              Initiate an Architectural Brief
            </h1>
            <p className="text-ink-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              We welcome private residential commissions, historical heritage transformations, and cultural pavilions across Europe and abroad. Contact our principals directly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & ATELIERS SPLIT GRID (#FAF9F5 with #FFFFFF Form Card) */}
      <Section variant="default" spacing="loose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Comprehensive Commission Form (#FFFFFF Surface) */}
          <div className="lg:col-span-7 bg-bg-surface p-6 sm:p-12 border border-border-light shadow-card space-y-8">
            <div className="space-y-2 border-b border-border-light pb-6">
              <span className="editorial-eyebrow">Project Questionnaire</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary font-normal">
                Tell Us About Your Vision
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                Please complete the parameters below. A studio principal will review your site topography and schedule a confidential consultation.
              </p>
            </div>

            {submitted ? (
              <div className="bg-bg-warm p-8 text-center space-y-4 border border-border-warm/60">
                <div className="w-12 h-12 bg-accent-brass text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary font-normal">
                  Commission Brief Received
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light max-w-md mx-auto">
                  Thank you, <strong className="font-semibold text-ink-primary">{formData.fullName}</strong>. Your project brief has been routed directly to Camille Vauquelin and our senior partners. We will respond within two business days.
                </p>
                <div className="pt-4">
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                    Submit Another Brief
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot Spam Field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botFieldWebsite">Do not fill this field</label>
                  <input
                    id="botFieldWebsite"
                    type="text"
                    name="botFieldWebsite"
                    value={formData.botFieldWebsite}
                    onChange={handleInputChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Baron Henri de Saint-Gilles"
                      className="w-full bg-[#FFFFFF] border border-[#EAE6DF] focus:border-[#D4AF37] focus:outline-none p-3 text-xs sm:text-sm font-sans rounded-[2px] transition-colors duration-300 min-h-[44px]"
                    />
                    {errors.fullName && (
                      <p className="text-[#D4AF37] text-xs font-sans font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="henri@domain.com"
                      className="w-full bg-[#FFFFFF] border border-[#EAE6DF] focus:border-[#D4AF37] focus:outline-none p-3 text-xs sm:text-sm font-sans rounded-[2px] transition-colors duration-300 min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Site Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Project Site Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Provence, London W1, or Lake Geneva"
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Project Typology Select */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Project Typology
                  </label>
                  <select
                    name="typology"
                    value={formData.typology}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                  >
                    {typologies.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Estimated Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Anticipated Construction Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Target Construction Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none min-h-[44px]"
                    >
                      {timelines.map((tl) => (
                        <option key={tl} value={tl}>{tl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* File Attachment */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Site Plans / Cadastral Survey / Photos (PDF, ZIP, max 25MB)
                  </label>
                  <div className="relative border border-dashed border-border-warm p-5 text-center bg-bg-primary hover:border-accent-brass transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.zip,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-accent-brass mx-auto mb-1.5" />
                    <p className="font-sans text-xs text-ink-primary font-medium">
                      {fileName ? `Selected: ${fileName}` : 'Click to attach architectural drawings or site imagery'}
                    </p>
                    <p className="text-[10px] text-ink-subtle mt-0.5 font-sans">
                      All submitted documents are handled under strict NDA confidentiality.
                    </p>
                  </div>
                  {errors.file && (
                    <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.file}</p>
                  )}
                </div>

                {/* Project Brief Message */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Project Brief & Narrative *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the site terrain, architectural ambitions, required living areas, and any historic conservation context..."
                    className="w-full bg-bg-primary border border-border-light p-3 text-xs sm:text-sm font-sans focus:border-accent-brass focus:outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-accent-terracotta text-xs font-sans font-medium">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" arrow className="w-full justify-center">
                    Submit Commission Brief
                  </Button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Atelier Addresses & Embedded Maps */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Atelier Selector Tabs (#FFFFFF Surface) */}
            <div className="bg-bg-surface p-6 sm:p-8 border border-border-light shadow-subtle space-y-6">
              <div className="flex items-center justify-between border-b border-border-light pb-4">
                <span className="editorial-eyebrow">Studio Ateliers</span>
                <div className="flex items-center gap-1">
                  {studioInfo.locations.map((loc) => (
                    <button
                      key={loc.city}
                      onClick={() => setSelectedAtelier(loc.city)}
                      className={`px-3 py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-colors min-h-[36px] ${
                        selectedAtelier === loc.city
                          ? 'bg-ink-primary text-white'
                          : 'bg-bg-warm text-ink-muted hover:text-ink-primary'
                      }`}
                    >
                      {loc.city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Atelier Coordinates */}
              {(() => {
                const loc = studioInfo.locations.find((l) => l.city === selectedAtelier) || studioInfo.locations[0];
                return (
                  <div className="space-y-4">
                    <div className="space-y-2 font-sans text-xs">
                      <h3 className="font-editorial text-2xl text-ink-primary font-normal">
                        {loc.city} Atelier
                      </h3>
                      <p className="text-ink-muted text-sm font-light leading-relaxed">
                        {loc.address}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border-light font-sans text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-accent-brass shrink-0" />
                        <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-ink-primary hover:text-accent-brass">
                          {loc.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-accent-brass shrink-0" />
                        <a href={`mailto:${loc.email}`} className="text-accent-brass hover:underline">
                          {loc.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-accent-brass shrink-0" />
                        <span className="text-ink-subtle">{loc.hours}</span>
                      </div>
                    </div>

                    {/* Interactive Google Maps Frame */}
                    <div className="pt-2">
                      <div className="aspect-[16/10] w-full bg-bg-warm overflow-hidden border border-border-light relative">
                        <iframe
                          title={`${loc.city} Atelier Location Map`}
                          src={
                            loc.city === 'Paris'
                              ? "https://maps.google.com/maps?q=18+Rue+de+l'Odeon+Paris+France&t=&z=15&ie=UTF8&iwloc=&output=embed"
                              : loc.city === 'London'
                              ? "https://maps.google.com/maps?q=24+Mount+Street+Mayfair+London+UK&t=&z=15&ie=UTF8&iwloc=&output=embed"
                              : "https://maps.google.com/maps?q=12+Rue+des+Granges+Geneva+Switzerland&t=&z=15&ie=UTF8&iwloc=&output=embed"
                          }
                          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                          allowFullScreen
                        />
                      </div>
                      <a
                        href={
                          loc.city === 'Paris'
                            ? "https://maps.google.com/?q=18+Rue+de+l'Odeon+Paris+France"
                            : loc.city === 'London'
                            ? "https://maps.google.com/?q=24+Mount+Street+Mayfair+London+UK"
                            : "https://maps.google.com/?q=12+Rue+des+Granges+Geneva+Switzerland"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans text-accent-brass uppercase font-semibold tracking-wider hover:underline mt-2"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Direct Telephone / Press Inquiries (#F1ECE3 Warm Box) */}
            <div className="p-6 sm:p-8 bg-bg-warm border border-border-warm/60 space-y-4">
              <span className="editorial-eyebrow">Press & Academic Inquiries</span>
              <h3 className="font-editorial text-2xl text-ink-primary font-normal">
                Monograph & Media Relations
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                For high-resolution uncompressed plate photography, editorial interviews, or lecture engagements, please contact our curatorial desk at <a href="mailto:press@ateliervauquelin.com" className="text-accent-brass underline font-medium">press@ateliervauquelin.com</a>.
              </p>
            </div>

          </div>

        </div>
      </Section>
    </div>
  );
}

export default Contact;
