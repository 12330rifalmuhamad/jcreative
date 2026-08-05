'use client';

export default function Team() {
  const teamMembers = [
    {
      name: 'M. Rifaldi',
      role: 'Executive Producer & Director',
      bio: 'Sutradara spesialis iklan komersial & film brand dengan pengalaman 10+ tahun dalam visual storytelling berkelas dunia.',
      highlights: '120+ Commercials Directed',
    },
    {
      name: 'Reza V.',
      role: 'Director of Photography (DP)',
      bio: 'Pakar sinematografi anamorphic 8K dengan spesialisasi pencahayaan tinggi untuk otomotif dan video musik.',
      highlights: 'ARRI & RED Master Certified',
    },
    {
      name: 'Dimas A.',
      role: 'Senior Colorist & Post Lead',
      bio: 'Colorist senior lulusan London Film Academy yang menangani master grade film bioskop & video musik internasional.',
      highlights: 'DaVinci Certified Color Master',
    },
    {
      name: 'Siti N.',
      role: 'Production Designer & Art Director',
      bio: 'Pengarah artistik dengan keahlian membangun set komersial mewah dan atmosfer surealis untuk kampanye brand.',
      highlights: '50+ Custom Sets Built',
    },
  ];

  return (
    <section className="py-24 bg-[#09090d] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              CREATIVE DIRECTORS &amp; CREW
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              TIM KREATIF <span className="text-slate-400">UTAMA</span>
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
              className="bg-[#121218] border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-xl text-white mb-6 group-hover:scale-110 transition-transform">
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-xl font-extrabold text-white">{member.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 mb-4">
                  {member.role}
                </p>

                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  ★ {member.highlights}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
