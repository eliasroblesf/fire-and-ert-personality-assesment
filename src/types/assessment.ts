import { RoleScores, CompetencyScores } from '../data/assessmentQuestions';

export interface StudentProfile {
  name: string;
  studentId: string;
  cohort: string;
  email?: string;
  assessorName?: string;
}

export interface AssessmentResult {
  student: StudentProfile;
  completedAt: string;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  primaryRole: keyof RoleScores;
  primaryRoleScore: number;
  secondaryRole: keyof RoleScores;
  secondaryRoleScore: number;
  allRoleScores: Record<keyof RoleScores, { raw: number; percentage: number }>;
  competencies: Record<keyof CompetencyScores, { raw: number; percentage: number }>;
  totalAnswered: number;
  strengths: string[];
  developmentAreas: string[];
  synergyAnalysis: string;
  timedOut?: boolean;
  timeSpentSeconds?: number;
}

export interface SyndicateMember {
  studentId: string;
  name: string;
  cohort: string;
  assignedRole: keyof RoleScores;
  primaryFit: keyof RoleScores;
  primaryPercentage: number;
  secondaryFit: keyof RoleScores;
  secondaryPercentage: number;
  completedAt: string;
}
