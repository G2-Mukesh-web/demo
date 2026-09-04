import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

/**
 * Editorial Team Card
 * Border: rgba(44, 53, 49, 0.12) -> #C27D66 (0.3s transition)
 * Geometry: Sharp 2px corners
 */
export function TeamCard({ member, className = '', expanded = false }) {
  const [showBio, setShowBio] = useState(false);

  if (!member) return null;

  return (
    <div
      className={`group bg-[#303A35] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] p-6 sm:p-7 shadow-subtle flex flex-col justify-between ${className}`}
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      <div>
        {/* Member Portrait with subtle zoom */}
        <div className="img-zoom-wrapper aspect-[3/4] bg-[#242C28] overflow-hidden mb-5 border border-[rgba(245,243,237,0.12)] rounded-[2px]">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-400"
          />
        </div>

        {/* Member Meta */}
        <div className="space-y-1">
          <span className="font-sans text-[10px] font-semibold text-[#C27D66] uppercase tracking-[0.2em] block">
            {member.role}
          </span>
          <h3 className="font-editorial text-2xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors duration-300 font-normal">
            {member.name}
          </h3>
          <p className="font-sans text-xs text-[#A3ADA7] font-light">
            {member.location}
          </p>
        </div>

        {/* Bio Text */}
        {(expanded || showBio) && member.bio && (
          <p className="mt-3.5 pt-3.5 border-t border-[rgba(245,243,237,0.12)] text-xs text-[#A3ADA7] leading-relaxed font-light transition-all duration-300">
            {member.bio}
          </p>
        )}
      </div>

      {/* Social / Direct Connect */}
      <div className="mt-5 pt-4 border-t border-[rgba(245,243,237,0.12)] flex items-center justify-between">
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#A3ADA7]">
          Connect
        </span>
        <div className="flex items-center gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F3ED] hover:text-[#C27D66] transition-colors p-1"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-[#F5F3ED] hover:text-[#C27D66] transition-colors p-1"
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
