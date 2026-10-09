import React, { useState } from 'react';
import { 
  Download, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Shield, 
  BookOpen, 
  Clock,
  Lock,
  MessageCircle,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';
import { AssessmentResult } from '../types/assessment';
import { BRIGADE_ROLES, ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { generateAssessmentPdf } from '../utils/generatePdfReport';

interface AssessmentResultViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onReturnToSplash: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onRetake,
  onReturnToSplash,
}) => {
  const [showDetailedAudit, setShowDetailedAudit] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [hasDownloadedPdf, setHasDownloadedPdf] = useState(false);

  const primaryDef = BRIGADE_ROLES[result.primaryRole];
  const secondaryDef = BRIGADE_ROLES[result.secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[result.tertiaryRole];

  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'suppressionLead':
        return <Flame className="w-6 h-6 text-rose-400" />;
      case 'casualtyCareLead':
        return <Stethoscope className="w-6 h-6 text-emerald-400" />;
      case 'evacuationSupportLead':
        return <DoorOpen className="w-6 h-6 text-blue-400" />;
      case 'externalLiaison':
        return <Radio className="w-6 h-6 text-purple-400" />;
      default:
        return <Shield className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generateAssessmentPdf(result);
      setHasDownloadedPdf(true);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Top Banner / Completion Header */}
      <div className="bg-gradient-to-r from-[#0a0f1a] via-[#111a2e] to-[#0a0f1a] border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {result.timedOut ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/15 border border-rose-500/40 rounded-full text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4 text-rose-400" />
            30-Minute Time Limit Reached ({result.totalAnswered} of 25 Questions Answered)
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            {result.totalAnswered} of 25 Psychometric Items Completed
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Administrative Personnel Volunteer Fit Dossier
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          Introductory assessment and natural aptitude classification for <strong className="text-white">{result.student.name}</strong> (Employee ID: <span className="font-mono text-amber-400">{result.student.studentId}</span> | Course Date: <span className="font-mono text-slate-300">{result.student.courseDate || result.student.cohort}</span>) to discover ideal volunteer emergency response brigade placement at King Salman International Airport.
        </p>

        {/* Primary Download & Finish Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className={`px-7 py-3.5 font-black rounded-xl text-sm flex items-center gap-2.5 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              hasDownloadedPdf
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-400/60 animate-bounce'
            }`}
          >
            {hasDownloadedPdf ? (
              <>
                <FileCheck2 className="w-4 h-4" />
                {downloading ? 'Compiling Dossier...' : 'PDF Downloaded (Click to Re-download)'}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {downloading ? 'Compiling Dossier...' : '1. Download Official PDF Report (Required)'}
              </>
            )}
          </button>

          {/* Locked Finish Button: Cannot finish until PDF downloaded */}
          {hasDownloadedPdf ? (
            <button
              onClick={onReturnToSplash}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-sm flex items-center gap-2 border border-slate-700 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Complete &amp; Assess Next Student
            </button>
          ) : (
            <div className="relative group">
              <button
                disabled
                className="px-6 py-3.5 bg-slate-900/80 text-slate-500 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-800 cursor-not-allowed opacity-60"
              >
                <Lock className="w-4 h-4 text-amber-500/70" />
                Complete Assessment (Locked)
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg text-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                You must download the official PDF report before finishing the assessment.
              </div>
            </div>
          )}

          <button
            onClick={onRetake}
            className="px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </button>
        </div>
      </div>

      {/* MANDATORY WHATSAPP SUBMISSION BANNER - Download only & Manual Share Reminder */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-[#075e54]/30 to-emerald-950/70 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border-2 border-[#25D366]/60 flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/10">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366]/15 border border-[#25D366]/30 rounded-full text-[#25D366] text-xs font-mono font-bold uppercase tracking-wider">
                Mandatory Manual Submission
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Send Your Downloaded PDF to the Class WhatsApp Group
              </h3>

              <p className="text-emerald-200/90 text-sm font-arabic font-semibold" dir="rtl">
                تنبيه إلزامي: يرجى إرسال ملف تقرير الـ PDF المُحمّل يدوياً إلى مجموعة واتساب الخاصة بالدورة التدريبية لتوثيق نتائجك وتوزيع الفرق التطوعية.
              </p>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed pt-1">
                To complete your evaluation and receive your official volunteer brigade badge, you must download your report using the button below and then manually share the PDF file into your cohort WhatsApp group.
              </p>
            </div>
          </div>

          {/* Download button only (no external WhatsApp link button) */}
          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`w-full sm:w-auto px-6 py-3.5 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
                hasDownloadedPdf
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
              }`}
            >
              {hasDownloadedPdf ? (
                <>
                  <FileCheck2 className="w-4 h-4" />
                  {downloading ? 'Compiling Dossier...' : 'PDF Downloaded (Click to Re-download)'}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {downloading ? 'Compiling Dossier...' : 'Download PDF Report'}
                </>
              )}
            </button>
            <div className="text-[11px] text-center text-emerald-300/80 font-mono">
              {hasDownloadedPdf ? '✓ Ready to share manually' : 'Download required first'}
            </div>
          </div>
        </div>

        {/* Instructions Steps - Clear reminder to manually share */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-emerald-500/20 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              1
            </span>
            <span>Download your official PDF report onto your device</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              2
            </span>
            <span>Open your training cohort WhatsApp chat group manually</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              3
            </span>
            <span>Manually attach and send the downloaded PDF file with Employee ID: <strong className="text-white font-mono">{result.student.studentId}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary Role (Hero Card) */}
      <div className="bg-[#0a0f1a] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 relative shadow-xl shadow-amber-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5" />
            Primary Recommended Volunteer Fit
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">Compatibility Score:</span>
            <span className="text-3xl font-mono font-extrabold text-amber-400">{result.primaryRoleScore}%</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl shrink-0">
            {getRoleIcon(result.primaryRole)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {primaryDef.name}
            </h2>
            <div className="text-base text-amber-400 font-arabic font-medium mb-1" dir="rtl">
              {primaryDef.arabicName}
            </div>
            <p className="text-sm text-slate-300 font-medium">{primaryDef.tagline}</p>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 mb-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Ideal Volunteer Fit: </strong>
          {primaryDef.idealPersonality}
        </div>

        {/* Duties & Key Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Core Volunteer Responsibilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {primaryDef.operationalDuties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Natural Behavioral Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {primaryDef.keyTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary & Third Role Capabilities (Two-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Secondary Role */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs uppercase font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-slate-400" />
              Secondary Volunteer Brigade Fit
            </span>
            <span className="text-xl font-mono font-bold text-slate-200">{result.secondaryRoleScore}%</span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              {getRoleIcon(result.secondaryRole)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{secondaryDef.name}</h3>
              <div className="text-xs text-slate-400 font-arabic" dir="rtl">{secondaryDef.arabicName}</div>
              <p className="text-xs text-slate-400 mt-0.5">{secondaryDef.tagline}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-200">Cross-Training &amp; Support Value:</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Provides essential support and backup capacity when your department or floor requires additional volunteer hands during drills or real disruptions.
            </p>
          </div>
        </div>

        {/* Third Role Capability */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs uppercase font-mono font-bold text-amber-400/90 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Third Volunteer Capability
            </span>
            <span className="text-xl font-mono font-bold text-amber-400/90">{result.tertiaryRoleScore}%</span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              {getRoleIcon(result.tertiaryRole)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{tertiaryDef.name}</h3>
              <div className="text-xs text-slate-400 font-arabic" dir="rtl">{tertiaryDef.arabicName}</div>
              <p className="text-xs text-slate-400 mt-0.5">{tertiaryDef.tagline}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-200">Auxiliary Readiness:</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Demonstrates broad personal versatility across emergency response functions, ensuring you can step in with confidence when unexpected assistance is needed.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Role Compatibility Matrix & 5 Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4 Brigade Roles Bar Charts */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            4 Volunteer Brigades Compatibility Breakdown
          </h3>
          <div className="space-y-4">
            {(Object.keys(result.allRoleScores) as (keyof typeof BRIGADE_ROLES)[]).map((roleKey) => {
              const def = BRIGADE_ROLES[roleKey];
              const scoreObj = result.allRoleScores[roleKey];
              const isPrimary = roleKey === result.primaryRole;
              const isSecondary = roleKey === result.secondaryRole;
              const isTertiary = roleKey === result.tertiaryRole;

              return (
                <div key={roleKey} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      {def.name}
                      {isPrimary && (
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                          PRIMARY
                        </span>
                      )}
                      {isSecondary && (
                        <span className="text-[10px] bg-slate-700 text-slate-200 px-1.5 py-0.2 rounded font-mono">
                          SECONDARY
                        </span>
                      )}
                      {isTertiary && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono">
                          THIRD
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-white">{scoreObj.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isPrimary
                          ? 'bg-amber-400'
                          : isSecondary
                          ? 'bg-blue-400'
                          : isTertiary
                          ? 'bg-purple-400'
                          : 'bg-slate-600'
                      }`}
                      style={{ width: `${scoreObj.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Core Competencies */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            5 Core Emergency Aptitudes
          </h3>
          <div className="space-y-3.5">
            {Object.entries(result.competencies).map(([compKey, compObj]) => {
              const compLabels: Record<string, string> = {
                decisiveness: 'Decisiveness & Rapid Action',
                physicalReadiness: 'Practical & Physical Initiative',
                traumaComposure: 'Composure Around Injury & Human Care',
                crowdControl: 'Floor Guidance & Orderly Movement',
                communicationProtocol: 'Communication Clarity & Reporting',
              };

              return (
                <div key={compKey} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{compLabels[compKey] || compKey}</span>
                    <span className="font-mono font-bold text-amber-400">{compObj.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500"
                      style={{ width: `${compObj.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Tactical Strengths & Development Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Observed Behavioral Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            {(result.strengths && result.strengths.length > 0 ? result.strengths : [
              `High natural affinity for ${primaryDef.name}`,
              'Steady composure and readiness to step up during unexpected office disruptions',
              'Collaborative attitude and clear alignment with safety guidance'
            ]).map((s, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Recommended Introductory Training
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            {(result.developmentAreas && result.developmentAreas.length > 0 ? result.developmentAreas : [
              `Foundational training in ${primaryDef.recommendedTrainingPath[0]}`,
              'Participation in building floor evacuation walk-throughs',
              'Basic workplace first-aid and safety orientation'
            ]).map((d, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Situational Audit Toggle (25 Items) */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
        <button
          onClick={() => setShowDetailedAudit(!showDetailedAudit)}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            25-Item Psychometric Response &amp; Self-Discovery Audit
          </span>
          {showDetailedAudit ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showDetailedAudit && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            {ASSESSMENT_QUESTIONS.map((q) => {
              const chosen = result.answers[q.id];
              const optObj = q.options.find((o) => o.id === chosen);

              return (
                <div key={q.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-mono font-bold text-amber-400">Question {q.id}</span>
                    <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-white">
                      Selected: Option {chosen || 'Unanswered'}
                    </span>
                  </div>
                  <div className="font-medium text-slate-200">{q.question}</div>
                  {optObj && (
                    <div className="text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-emerald-400 font-medium mb-1">Your Selected Response:</div>
                      <div>{optObj.text}</div>
                      <div className="mt-1 text-slate-400 text-[11px] font-mono italic">
                        Self-Discovery Insight: {optObj.learningInsight}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sticky Completion Bar if not yet downloaded */}
      {!hasDownloadedPdf && (
        <div className="sticky bottom-4 bg-amber-500/95 text-slate-950 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-amber-300 z-30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-slate-950 shrink-0" />
            <div className="text-xs sm:text-sm font-bold">
              Final Step: Download your PDF report to unlock assessment completion and manually send it to your class WhatsApp group!
            </div>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="px-5 py-2.5 bg-slate-950 text-white font-black text-xs sm:text-sm rounded-xl hover:bg-slate-900 transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            Download PDF Report Now
          </button>
        </div>
      )}
    </div>
  );
};
