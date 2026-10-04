import React, { useState } from 'react';
import { Shield, User, Award, Users, ChevronRight, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types/assessment';

interface StudentIntakeModalProps {
  isOpen: boolean;
  onStart: (profile: StudentProfile) => void;
  initialProfile?: StudentProfile;
}

export const StudentIntakeModal: React.FC<StudentIntakeModalProps> = ({
  isOpen,
  onStart,
  initialProfile,
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [studentId, setStudentId] = useState(initialProfile?.studentId || '');
  const [cohort, setCohort] = useState(initialProfile?.cohort || 'KSIA Airside Syndicate 1');
  const [assessorName, setAssessorName] = useState(initialProfile?.assessorName || 'Capt. Tariq Al-Ghamdi (Lead Instructor)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onStart({
      name: name.trim(),
      studentId: studentId.trim() || `CADET-${Math.floor(1000 + Math.random() * 9000)}`,
      cohort: cohort.trim(),
      assessorName: assessorName.trim(),
    });
  };

  const handleQuickFill = () => {
    setName('Faisal Al-Otaibi');
    setStudentId('KSIA-ERT-7419');
    setCohort('Alpha Syndicate - Terminal 1');
    setAssessorName('Capt. Tariq Al-Ghamdi (Lead Instructor)');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
              KSIA ERT CADET INTAKE
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Brigade Personality & Role Assessment
            </h2>
          </div>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
          Welcome to the 40-question situational judgment evaluation. This standard NFPA & ICAO-aligned 
          assessment determines your optimal operational role within the King Salman International Airport 
          Emergency Response Brigade and issues your official PDF classification dossier.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-amber-400" /> Full Candidate Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faisal Al-Otaibi"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Student / Badge ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. KSIA-ERT-7419"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Cohort / Syndicate Cell
              </label>
              <input
                type="text"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                placeholder="e.g. Alpha Syndicate"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Assessor / Lead Instructor
            </label>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              placeholder="e.g. Capt. Tariq Al-Ghamdi"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-amber-500/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Quick-Fill Demo Candidate
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              Begin 40-Question Assessment
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
