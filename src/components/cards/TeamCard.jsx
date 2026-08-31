import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

/**
 * Editorial Team Card
 * Border: #EAE6DF -> #D4AF37 (0.3s transition)
 * Geometry: Sharp 2px corners
 */
export function TeamCard({ member, className = '', expanded = false }) {
  const [showBio, setShowBio] = useState(false);

  if (!member) return null;

  return (
    <div
      className={`group bg-[#FFFFFF] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] p-6 sm:p-7 shadow-subtle flex flex-col justify-between ${className}`}
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      <div>
        {/* Member Portrait with subtle zoom */}
        <div className="img-zoom-wrapper aspect-[3/4] bg-[#F7F3EB] overflow-hidden mb-5 border border-[#EAE6DF] rounded-[2px]">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-400"
          />
        </div>

        {/* Member Meta */}
        <div className="space-y-1">
          <span className="font-sans text-[10px] font-semibold text-[#D4AF37] uppercase tracking-[0.2em] block">
            {member.role}
          </span>
          <h3 className="font-editorial text-2xl text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors duration-300">
            {member.name}
          </h3>
          <p className="font-sans text-xs text-[#5F6470] font-light">
            {member.location}
          </p>
        </div>

        {/* Bio Text */}
        {(expanded || showBio) && member.bio && (
          <p className="mt-3.5 pt-3.5 border-t border-[#EAE6DF] text-xs text-[#5F6470] leading-relaxed font-light transition-all duration-300">
            {member.bio}
          </p>
        )}
      </div>

      {/* Social / Direct Connect */}
      <div className="mt-5 pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#5F6470]">
          Connect
        </span>
        <div className="flex items-center gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B2A47] hover:text-[#D4AF37] transition-colors p-1"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-[#1B2A47] hover:text-[#D4AF37] transition-colors p-1"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
