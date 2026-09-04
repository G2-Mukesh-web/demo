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
    typology: 'Private Home / Residence',
    scope: 'Architecture & Interior Design',
    budget: '₹2.5 Crores – ₹5 Crores',
    timeline: 'Within 6–12 months',
    message: '',
    botFieldWebsite: '',
  });

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedAtelier, setSelectedAtelier] = useState('Mumbai');

  const typologies = [
    'Private Home / Residence',
    'Heritage Building & Renovation',
    'Wellness & Spa Retreat',
    'Gallery & Cultural Space',
    'Boutique Hotel & Commercial',
    'Interior Design & Custom Joinery Only',
  ];

  const budgetRanges = [
    'Under ₹1 Crore',
    '₹1 Crore – ₹2.5 Crores',
    '₹2.5 Crores – ₹5 Crores',
    '₹5 Crores – ₹10 Crores',
    '₹10 Crores+',
    'To Be Determined / Planning Phase',
  ];

  const timelines = [
    'Immediate (Within 3 months)',
    'Within 6–12 months',
    '1–2 years (Early planning)',
    'Land acquisition / exploring options',
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
    if (!formData.message.trim()) newErrors.message = 'Please provide a brief description of your project.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('[Contact Message Submission]:', {
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
      "telephone": "+912226401890",
      "email": "mumbai@ateliervauquelin.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Turner Road, Bandra West",
        "addressLocality": "Mumbai",
        "postalCode": "400050",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Contact Us & Project Enquiries"
        description="Get in touch with Atelier Vauquelin or schedule a consultation at our Mumbai, Bengaluru, or Hyderabad studios."
        schema={contactSchema}
      />

      {/* 1. CONTACT HERO BANNER (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] py-20 lg:py-28 border-b border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-3 block">Get in Touch</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F3ED] mb-6">
              Let's Discuss Your Project
            </h1>
            <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              We design private homes, luxury villas, heritage renovations, and commercial spaces across India. Reach out to our team directly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & STUDIOS SPLIT GRID (Warm Linen #EFEFEA) */}
      <section className="bg-[#EFEFEA] text-[#303A35] py-20 lg:py-28">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-[#F5F5F0] p-6 sm:p-12 border border-[rgba(48,58,53,0.12)] shadow-subtle space-y-8 rounded-[2px]">
              <div className="space-y-2 border-b border-[rgba(48,58,53,0.12)] pb-6">
                <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Project Form</span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#303A35] font-normal">
                  Tell Us About Your Project
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6661] leading-relaxed font-light">
                  Please share a few details below. One of our architects will review your enquiry and get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#EAE8E1] p-8 text-center space-y-4 border border-[rgba(48,58,53,0.12)] rounded-[2px]">
                  <div className="w-12 h-12 bg-[#C27D66] text-[#1D211F] flex items-center justify-center mx-auto rounded-[2px]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#303A35] font-normal">
                    Message Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6661] leading-relaxed font-light max-w-md mx-auto">
                    Thank you, <strong className="font-semibold text-[#303A35]">{formData.fullName}</strong>. We have received your project details and our team will get in touch with you within two business days.
                  </p>
                  <div className="pt-4">
                    <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                      Send Another Message
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
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. John Smith"
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] focus:border-[#C27D66] focus:outline-none p-3 text-xs sm:text-sm font-sans text-[#303A35] rounded-[2px] transition-colors duration-300 min-h-[44px]"
                      />
                      {errors.fullName && (
                        <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.fullName}</p>
                      )}
                    </div>

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
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] focus:border-[#C27D66] focus:outline-none p-3 text-xs sm:text-sm font-sans text-[#303A35] rounded-[2px] transition-colors duration-300 min-h-[44px]"
                      />
                      {errors.email && (
                        <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Site Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98201 45678"
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                        Project Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Hyderabad, Bengaluru, Mumbai, Goa, or Delhi NCR"
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                      />
                    </div>
                  </div>

                  {/* Project Typology Select */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Project Type
                    </label>
                    <select
                      name="typology"
                      value={formData.typology}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                    >
                      {typologies.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none min-h-[44px] rounded-[2px]"
                      >
                        {timelines.map((tl) => (
                          <option key={tl} value={tl}>{tl}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* File Attachment */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Attach Site Plans or Photos (PDF, JPG, ZIP, max 25MB)
                    </label>
                    <div className="relative border border-dashed border-[rgba(48,58,53,0.25)] p-5 text-center bg-[#FFFFFF] hover:border-[#C27D66] transition-colors rounded-[2px]">
                      <input
                        type="file"
                        accept=".pdf,.zip,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-5 h-5 text-[#C27D66] mx-auto mb-1.5" />
                      <p className="font-sans text-xs text-[#303A35] font-medium">
                        {fileName ? `Selected: ${fileName}` : 'Click to attach photos, floor plans, or site sketches'}
                      </p>
                      <p className="text-[10px] text-[#5C6661] mt-0.5 font-sans">
                        All uploaded files are kept confidential.
                      </p>
                    </div>
                    {errors.file && (
                      <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.file}</p>
                    )}
                  </div>

                  {/* Project Brief Message */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#303A35] font-semibold">
                      Project Details & Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, location, desired rooms, and any special ideas..."
                      className="w-full bg-[#FFFFFF] border border-[rgba(48,58,53,0.18)] p-3 text-xs sm:text-sm font-sans text-[#303A35] focus:border-[#C27D66] focus:outline-none resize-none rounded-[2px]"
                    />
                    {errors.message && (
                      <p className="text-[#C27D66] text-xs font-sans font-medium">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg" arrow className="w-full justify-center">
                      Send Message
                    </Button>
                  </div>
                </form>
              )}

            </div>

            {/* Right Column: Studio Addresses & Embedded Maps */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Atelier Selector Tabs */}
              <div className="bg-[#F5F5F0] p-6 sm:p-8 border border-[rgba(48,58,53,0.12)] shadow-subtle space-y-6 rounded-[2px]">
                <div className="flex items-center justify-between border-b border-[rgba(48,58,53,0.12)] pb-4">
                  <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold">Our Studios</span>
                  <div className="flex items-center gap-1">
                    {studioInfo.locations.map((loc) => (
                      <button
                        key={loc.city}
                        onClick={() => setSelectedAtelier(loc.city)}
                        className={`px-3 py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-colors min-h-[36px] rounded-[2px] ${
                          selectedAtelier === loc.city
                            ? 'bg-[#303A35] text-[#F5F3ED]'
                            : 'bg-[#EAE8E1] text-[#5C6661] hover:text-[#303A35]'
                        }`}
                      >
                        {loc.city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Studio Coordinates */}
                {(() => {
                  const loc = studioInfo.locations.find((l) => l.city === selectedAtelier) || studioInfo.locations[0];
                  return (
                    <div className="space-y-4">
                      <div className="space-y-2 font-sans text-xs">
                        <h3 className="font-editorial text-2xl text-[#303A35] font-normal">
                          {loc.city} Studio
                        </h3>
                        <p className="text-[#5C6661] text-sm font-light leading-relaxed">
                          {loc.address}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[rgba(48,58,53,0.12)] font-sans text-xs">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#C27D66] shrink-0" />
                          <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-[#303A35] hover:text-[#C27D66] transition-colors">
                            {loc.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#C27D66] shrink-0" />
                          <a href={`mailto:${loc.email}`} className="text-[#C27D66] hover:underline">
                            {loc.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#C27D66] shrink-0" />
                          <span className="text-[#5C6661]">{loc.hours}</span>
                        </div>
                      </div>

                      {/* Interactive Google Maps Frame */}
                      <div className="pt-2">
                        <div className="aspect-[16/10] w-full bg-[#EAE8E1] overflow-hidden border border-[rgba(48,58,53,0.12)] relative rounded-[2px]">
                          <iframe
                            title={`${loc.city} Studio Location Map`}
                            src={
                              loc.city === 'Mumbai'
                                ? "https://maps.google.com/maps?q=Turner+Road+Bandra+West+Mumbai+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                : loc.city === 'Bengaluru'
                                ? "https://maps.google.com/maps?q=100+Feet+Road+Indiranagar+Bengaluru+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                : "https://maps.google.com/maps?q=Road+No+36+Jubilee+Hills+Hyderabad+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            }
                            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                            allowFullScreen
                          />
                        </div>
                        <a
                          href={
                            loc.city === 'Mumbai'
                              ? "https://maps.google.com/?q=Turner+Road+Bandra+West+Mumbai+India"
                              : loc.city === 'Bengaluru'
                              ? "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru+India"
                              : "https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad+India"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-sans text-[#C27D66] uppercase font-semibold tracking-wider hover:underline mt-2"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Direct Press Inquiries */}
              <div className="p-6 sm:p-8 bg-[#EAE8E1] border border-[rgba(48,58,53,0.12)] space-y-4 rounded-[2px]">
                <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Press & Media</span>
                <h3 className="font-editorial text-2xl text-[#303A35] font-normal">
                  Press & Media Enquiries
                </h3>
                <p className="text-xs text-[#5C6661] leading-relaxed font-light">
                  For high-resolution photography, editorial interviews, or speaking engagements, please email us at <a href="mailto:press@ateliervauquelin.com" className="text-[#C27D66] underline font-medium">press@ateliervauquelin.com</a>.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
