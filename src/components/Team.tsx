'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

export default function Team() {
  const { teamMembers } = useContent();

  return (
    <section id="members" className="py-24 bg-[#09090d] border-t border-white/10 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              CREATIVE DIRECTORS &amp; CREW
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              TIM &amp; <span className="text-slate-400">ANGGOTA KREATIF</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Dipimpin oleh sutradara dan profesional berpengalaman yang mendedikasikan presisi pada setiap detail sinematik.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#121218] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Profile Picture Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95 contrast-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent opacity-90" />
                  
                  {/* Role Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-extrabold text-slate-200 uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Name */}
                  <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-amber-400/90 transition-colors">
                    {member.name}
                  </h3>

                  {/* Motto Hidup / Quote */}
                  <div className="bg-white/[0.04] border-l-2 border-slate-400 p-3 rounded-r-xl">
                    <p className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider mb-1">
                      Motto Hidup
                    </p>
                    <p className="text-xs text-slate-200 font-light italic leading-relaxed">
                      &ldquo;{member.motto}&rdquo;
                    </p>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer / Highlights */}
              <div className="px-6 pb-6 pt-2 border-t border-white/10 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  <span>★ {member.highlights}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

