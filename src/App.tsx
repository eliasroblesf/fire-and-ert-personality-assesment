/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KSIA Fire & ERT Brigade Personality & Role Assessment
 * King Salman International Airport Emergency Response Directorate
 * 
 * Aligned with International Standards:
 * - NFPA 1081 / NFPA 1561 Industrial Fire Brigade Qualifications
 * - ICAO Doc 9137 / Annex 14 Airport Rescue & Fire Fighting (ARFF)
 * - FEMA ICS-100/200 Incident Command Protocols
 * - ILCOR / AHA 2020 Basic Life Support Guidelines
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Building2, 
  User, 
  Award, 
  RotateCcw,
  CheckCircle2,
  FileText,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';
import { AssessmentView } from './components/AssessmentView';
import { AssessmentResultView } from './components/AssessmentResultView';
import { StudentProfile, AssessmentResult } from './types/assessment';
import { calculateAssessmentResult } from './utils/assessmentScoring';
import { ASSESSMENT_QUESTIONS } from './data/assessmentQuestions';

type AppPhase = 'SPLASH' | 'ASSESSMENT' | 'RESULT';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('SPLASH');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Exact 30-minute timer (1800 seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(1800);
  const timerIntervalRef = useRef<any>(null);

  // Auto-submit when time expires (at exactly 0)
  const handleTimeExpired = () => {
    if (!studentProfile) return;

    const computedResult = calculateAssessmentResult(studentProfile, answers);
    computedResult.timedOut = true;
    computedResult.timeSpentSeconds = 1800;

    setResult(computedResult);
    setPhase('RESULT');
  };

  // 30-Minute Countdown Clock: Starts as soon as student starts the first question after splash screen
  useEffect(() => {
    if (phase === 'ASSESSMENT') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [phase, answers, studentProfile]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start Assessment from Splash Screen (Timer starts immediately!)
  const handleStartFromSplash = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setAnswers({});
    setResult(null);
    setTimeRemaining(1800); // Exactly 30 minutes
    setPhase('ASSESSMENT');
  };

  // Quick-Fill Demo (Activated only via Code 2809)
  const handleQuickFillDemo = (profile: StudentProfile) => {
    setStudentProfile(profile);
    const demoAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {};
    const samplePattern: ('A' | 'B' | 'C' | 'D')[] = ['A', 'C', 'D', 'B', 'A'];

    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      demoAnswers[q.id] = samplePattern[idx % samplePattern.length];
    });

    setAnswers(demoAnswers);
    const computedResult = calculateAssessmentResult(profile, demoAnswers);
    computedResult.timeSpentSeconds = 1800 - timeRemaining;
    setResult(computedResult);
    setPhase('RESULT');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Option selection (DOES NOT auto-advance; student can change mind freely)
  const handleAnswerChange = (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Submit and calculate results (when finished before 30 mins)
  const handleSubmitAssessment = () => {
    if (!studentProfile) return;
    const computedResult = calculateAssessmentResult(studentProfile, answers);
    computedResult.timeSpentSeconds = 1800 - timeRemaining;
    setResult(computedResult);
    setPhase('RESULT');

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Retake current student assessment
  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setTimeRemaining(1800);
    setPhase('ASSESSMENT');
  };

  // Return to Splash for next student
  const handleReturnToSplash = () => {
    setStudentProfile(null);
    setAnswers({});
    setResult(null);
    setTimeRemaining(1800);
    setPhase('SPLASH');
  };

  const isLowTime = timeRemaining <= 300; // 5 minutes or less

  return (
    <div className="min-h-screen bg-[#05080f] text-slate-200 selection:bg-amber-500/30">
      <OfflineIndicator />

      {/* Main Top Header */}
      <header className="border-b border-slate-800 bg-[#0a0f1a] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              KSIA ERT BRIGADE ASSESSMENT
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400 border border-slate-700 font-mono">
                STANDALONE
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.18em]">
              King Salman International Airport | Fire &amp; ERT Directorate
            </p>
          </div>
        </div>

        {/* Header Right: UPPER RIGHT CORNER 30-MINUTE TIMER & CADET PILL */}
        <div className="flex items-center gap-3">
          {/* Active 30-Minute Timer in Upper Right Corner */}
          {phase === 'ASSESSMENT' && (
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono transition-all ${
                isLowTime
                  ? 'bg-rose-950/50 border-rose-500/60 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
                  : 'bg-slate-900 border-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
              }`}
            >
              <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400' : 'text-amber-400'}`} />
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs sm:text-sm font-black tracking-widest">
                  {formatTimer(timeRemaining)}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400">
                  30:00 Limit
                </span>
              </div>
            </div>
          )}

          {studentProfile && phase !== 'SPLASH' && (
            <div className="hidden md:flex items-center gap-2.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white truncate max-w-[130px]">{studentProfile.name}</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                {studentProfile.studentId}
              </span>
              <button
                onClick={handleReturnToSplash}
                title="Change Cadet / Return to Splash"
                className="text-[10px] text-slate-400 hover:text-amber-400 underline ml-0.5"
              >
                Change
              </button>
            </div>
          )}

          <PWAInstallButton />
        </div>
      </header>

      {/* Main Content Body */}
      <main className="p-4 sm:p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {/* 1. SPLASH SCREEN */}
          {phase === 'SPLASH' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <SplashScreen
                onStart={handleStartFromSplash}
                onQuickFillDemo={handleQuickFillDemo}
              />
            </motion.div>
          )}

          {/* 2. 25-QUESTION PSYCHOMETRIC ASSESSMENT SCREEN */}
          {phase === 'ASSESSMENT' && studentProfile && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <AssessmentView
                student={studentProfile}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onSubmit={handleSubmitAssessment}
                onEditProfile={() => setPhase('SPLASH')}
                timeRemaining={timeRemaining}
              />
            </motion.div>
          )}

          {/* 3. RESULT & ACCREDITATION DOSSIER SCREEN */}
          {phase === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <AssessmentResultView
                result={result}
                onRetake={handleRetake}
                onReturnToSplash={handleReturnToSplash}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 bg-[#070b13] py-4 px-6 text-center text-xs text-slate-500 font-mono">
        King Salman International Airport (KSIA) | Administrative Personnel Volunteer Emergency Response Assessment | 30-Minute Timed Evaluation
      </footer>
    </div>
  );
}
