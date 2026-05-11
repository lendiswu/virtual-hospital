import React, { createContext, useState, useContext } from 'react';

const I18nContext = createContext();

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    clinicalMissions: "Clinical Missions",
    virtualPatients: "Virtual Patients",
    vrSimulationWard: "VR Simulation Ward",
    medicalRecordsSystem: "Medical Records System",
    orderEntrySystem: "Order Entry System",
    teamSimulation: "Team Simulation",
    portfolio: "Portfolio",
    advancingProject: "Advancing Project",
    settings: "Settings",
    
    // Faculty Navigation
    facultyDashboard: "Faculty Dashboard",
    missionBuilder: "Mission Builder",
    learnerAnalytics: "Learner Analytics",
    competencyTracking: "Competency Tracking",
    teamSimulationReview: "Team Simulation Review",
    aiAssessment: "AI Assessment",
    courseManagement: "Course Management",
    portfolioReview: "Portfolio Review",
    researchAnalytics: "Research Analytics",
    
    // Roles
    switchRole: "Switch Role",
    learnerView: "Learner View",
    facultyView: "Faculty View",
    
    // Learner Dashboard
    currentClinicalMission: "Current Clinical Mission",
    missionTimeline: "Mission Progression Timeline",
    initialTriage: "Initial Triage",
    medicalRecordReview: "Medical Record Review",
    virtualPatientInterview: "Virtual Patient Interview",
    admissionAssessment: "Admission Assessment",
    diagnosticOrderEntry: "Diagnostic Order Entry",
    acuteDeterioration: "Acute Deterioration Management",
    patientCommunication: "Patient Communication",
    escalationToAttending: "Escalation to Attending",
    
    // Competencies
    acgmeCompetencies: "ACGME Core Competencies",
    patientCare: "Patient Care",
    medicalKnowledge: "Medical Knowledge",
    interpersonalSkills: "Interpersonal & Communication",
    professionalism: "Professionalism",
    practiceBasedLearning: "Practice-based Learning",
    systemsBasedPractice: "Systems-based Practice",
    
    // Dashboard Cards
    level: "Level",
    xp: "XP",
    aiStrengths: "AI-Generated Strengths",
    improvementRecommendations: "Improvement Recommendations",
    
    // Learning Activities
    learningActivities: "Clinical Missions",
    estimatedTime: "Est. Time",
    difficulty: "Difficulty",
    competencyFocus: "Focus",
    startMission: "Start Mission",
    
    // Mission Builder
    workflowBuilder: "Mission Workflow Builder",
    aiRecommendations: "AI Recommendations",
    patientIntro: "Patient Introduction",
    infoGathering: "Information Gathering",
    decisionMaking: "Clinical Decision Making",
    emergencyEvents: "Emergency Events",
    reflectionDebrief: "Reflection & Debriefing",
    
    // Faculty Dashboard
    cohortCompetency: "Cohort Competency Overview",
    activeMissions: "Active Clinical Missions",
    aiLearningAnalytics: "AI Learning Analytics",
    learnerRiskDetection: "Learner Risk Detection",
    curriculumInsights: "Curriculum Insights",
  },
  zh: {
    // Navigation
    dashboard: "學習儀表板",
    clinicalMissions: "臨床任務",
    virtualPatients: "虛擬病人",
    vrSimulationWard: "VR模擬病房",
    medicalRecordsSystem: "電子病歷系統",
    orderEntrySystem: "醫囑輸入系統",
    teamSimulation: "團隊模擬",
    portfolio: "學習歷程檔案",
    advancingProject: "進階計畫",
    settings: "設定",
    
    // Faculty Navigation
    facultyDashboard: "教師儀表板",
    missionBuilder: "任務建構器",
    learnerAnalytics: "學習者分析",
    competencyTracking: "能力追蹤",
    teamSimulationReview: "團隊模擬回顧",
    aiAssessment: "AI評估",
    courseManagement: "課程管理",
    portfolioReview: "學習歷程審查",
    researchAnalytics: "研究分析",
    
    // Roles
    switchRole: "切換角色",
    learnerView: "學習者視角",
    facultyView: "教師視角",
    
    // Learner Dashboard
    currentClinicalMission: "目前臨床任務",
    missionTimeline: "任務進度時間軸",
    initialTriage: "初步檢傷",
    medicalRecordReview: "病歷查閱",
    virtualPatientInterview: "虛擬病人問診",
    admissionAssessment: "入院評估",
    diagnosticOrderEntry: "診斷醫囑輸入",
    acuteDeterioration: "急性惡化處理",
    patientCommunication: "醫病溝通",
    escalationToAttending: "回報主治醫師",
    
    // Competencies
    acgmeCompetencies: "ACGME 核心能力",
    patientCare: "病人照護",
    medicalKnowledge: "醫學知識",
    interpersonalSkills: "人際與溝通技巧",
    professionalism: "專業素養",
    practiceBasedLearning: "從實作中學習與改進",
    systemsBasedPractice: "制度下的臨床實作",
    
    // Dashboard Cards
    level: "等級",
    xp: "經驗值",
    aiStrengths: "AI分析優勢",
    improvementRecommendations: "改進建議",
    
    // Learning Activities
    learningActivities: "臨床任務",
    estimatedTime: "預估時間",
    difficulty: "難度",
    competencyFocus: "核心能力",
    startMission: "開始任務",
    
    // Mission Builder
    workflowBuilder: "任務流程建構器",
    aiRecommendations: "AI 建議與對應",
    patientIntro: "病人背景介紹",
    infoGathering: "資訊收集",
    decisionMaking: "臨床決策",
    emergencyEvents: "緊急事件處置",
    reflectionDebrief: "反思與回饋",
    
    // Faculty Dashboard
    cohortCompetency: "學員群體能力概況",
    activeMissions: "進行中的臨床任務",
    aiLearningAnalytics: "AI學習數據分析",
    learnerRiskDetection: "學習風險偵測",
    curriculumInsights: "課程成效洞察",
  }
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('learner'); // 'learner' or 'faculty'

  const t = (key) => {
    return translations[lang][key] || key;
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const toggleRole = () => {
    setRole(prev => prev === 'learner' ? 'faculty' : 'learner');
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, toggleLang, role, toggleRole }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
