import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Circle, 
  BrainCircuit, 
  MessageSquare, 
  Send,
  Activity,
  FileText,
  AlertTriangle
} from 'lucide-react';
import './MissionWorkflow.css';

const MissionWorkflow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [activeStep, setActiveStep] = useState(3); // Virtual Patient Interview

  const steps = [
    { id: 1, title: 'initialTriage', status: 'completed' },
    { id: 2, title: 'medicalRecordReview', status: 'completed' },
    { id: 3, title: 'virtualPatientInterview', status: 'active' },
    { id: 4, title: 'admissionAssessment', status: 'pending' },
    { id: 5, title: 'diagnosticOrderEntry', status: 'pending' },
    { id: 6, title: 'acuteDeterioration', status: 'pending' },
  ];

  const chatHistory = [
    { sender: 'doctor', text: lang === 'en' ? 'Hello, I am Dr. Chen. What brings you to the emergency department today?' : '你好，我是陳醫師。今天是什麼原因來急診？' },
    { sender: 'patient', text: lang === 'en' ? 'My stomach hurts really bad... right here in the middle. And I feel nauseous.' : '我肚子很痛...就在正中間這裡。而且我覺得很噁心。' },
    { sender: 'doctor', text: lang === 'en' ? 'When did the pain start? Have you vomited?' : '痛多久了？有吐嗎？' },
    { sender: 'patient', text: lang === 'en' ? 'It started last night. I threw up twice this morning. I also feel really thirsty.' : '昨晚開始的。今天早上吐了兩次。而且我一直覺得口渴。' }
  ];

  return (
    <div className="workflow-container">
      <div className="workflow-header">
        <button className="btn-back flex-gap" onClick={() => navigate('/')}>
          <ChevronLeft size={20} /> Back to Dashboard
        </button>
        <div className="mission-title-bar">
          <h2 className="mission-name">Emergency Department Challenge: DKA</h2>
          <span className="badge difficulty">Hard</span>
        </div>
        <div className="mission-timer text-accent-gradient">42:15</div>
      </div>

      <div className="workflow-grid">
        {/* Left: Progression Map */}
        <div className="progression-map glass-panel">
          <h3 className="panel-title">{t('missionTimeline')}</h3>
          <div className="vertical-timeline">
            {steps.map((step, index) => (
              <div key={step.id} className={`v-step ${step.status} ${activeStep === step.id ? 'current' : ''}`}>
                <div className="v-step-indicator">
                  {step.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>
                <div className="v-step-content">
                  <span className="v-step-title">{t(step.title)}</span>
                </div>
                {index < steps.length - 1 && <div className="v-step-line" />}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Active Activity (Virtual Patient) */}
        <div className="active-activity glass-panel">
          <div className="activity-header flex-between">
            <h3 className="panel-title flex-gap"><MessageSquare size={18} /> {t('virtualPatientInterview')}</h3>
            <div className="patient-vitals flex-gap">
              <span className="vital"><Activity size={14} className="text-accent-teal" /> HR: 112</span>
              <span className="vital"><Activity size={14} className="text-accent-cyan" /> BP: 100/65</span>
              <span className="vital"><AlertTriangle size={14} style={{color: '#F59E0B'}} /> RR: 24</span>
            </div>
          </div>
          
          <div className="chat-interface">
            <div className="chat-messages">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.sender}`}>
                  {msg.sender === 'patient' && <div className="avatar patient-avatar">PT</div>}
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
            </div>
            
            <div className="chat-input-area">
              <div className="ai-suggestions">
                <span className="suggestion-pill">Ask about past medical history</span>
                <span className="suggestion-pill">Ask about urination</span>
              </div>
              <div className="input-box">
                <input type="text" placeholder={lang === 'en' ? "Type your question..." : "輸入你的問題..."} />
                <button className="btn-send"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Assistant & Competency */}
        <div className="ai-assistant-panel glass-panel">
          <h3 className="panel-title flex-gap text-accent-gradient"><BrainCircuit size={18} /> AI Mentor</h3>
          
          <div className="ai-feedback-box">
            <h4 className="feedback-title flex-gap"><FileText size={14} /> Clinical Reasoning</h4>
            <p className="feedback-text">
              The patient's polydipsia (thirst), tachycardia, and tachypnea are highly suspicious for a metabolic derangement. 
              <strong>Consider asking about their diabetes history.</strong>
            </p>
          </div>

          <div className="competency-tracker">
            <h4 className="feedback-title">Current Competency Impact</h4>
            <div className="comp-impact-item">
              <div className="comp-label flex-between">
                <span>{t('medicalKnowledge')}</span>
                <span className="text-accent-teal">+15 XP</span>
              </div>
              <div className="progress-bar-bg" style={{height: '4px'}}><div className="progress-bar-fill" style={{width: '60%', background: 'var(--accent-teal)'}}></div></div>
            </div>
            <div className="comp-impact-item">
              <div className="comp-label flex-between">
                <span>{t('interpersonalSkills')}</span>
                <span className="text-accent-cyan">+10 XP</span>
              </div>
              <div className="progress-bar-bg" style={{height: '4px'}}><div className="progress-bar-fill" style={{width: '45%', background: 'var(--accent-cyan)'}}></div></div>
            </div>
          </div>
          
          <button className="btn-primary" style={{width: '100%', marginTop: 'auto'}} onClick={() => setActiveStep(4)}>
            Complete Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionWorkflow;
