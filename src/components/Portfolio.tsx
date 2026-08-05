'use client';

import { useState } from 'react';

interface Project {
  title: string;
  category: string;
  client: string;
  image: string;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'THE VELOCITY OF SILENCE',
      category: 'Commercial Film',
      client: 'Apex Motors',
      image: '/images/work_commercial.png',
    },
    {
      title: 'SOLITUDE IN HARMONY',
      category: 'Music Video',
      client: 'Universal Music',
      image: '/images/work_music_video.png',
    },
    {
      title: 'CRAFTSMEN OF ETERNITY',
      category: 'Brand Documentary',
      client: 'Heritage Atelier',
      image: '/images/work_documentary.png',
    },
    {
      title: 'NIGHT REEL // METROPOLIS',
      category: 'Commercial Film',
      client: 'Omni Cybernetics',
      image: '/images/bts_set.png',
    },
  ];

  return (
    <section id="karya" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
            SELECTED WORKS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white">
            KARYA PILIHAN
          </h2>
        </div>
      </div>

      {/* Clean 2x2 Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-[#0f0f14] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {project.category} • {project.client}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="relative w-full max-w-2xl bg-[#0e0e13] border border-white/20 rounded-2xl overflow-hidden">
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full aspect-video object-cover" />
            <div className="p-6">
              <span className="text-xs font-mono text-slate-400 block mb-1">{selectedProject.category}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-xs text-slate-300">Klien: {selectedProject.client}</p>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
