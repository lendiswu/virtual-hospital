import React from 'react';
import { useI18n } from '../i18n';
import { BrainCircuit, Star, Target, ArrowRight } from 'lucide-react';
import './LearnerDashboard.css';

const AdvancingProjectPage = () => {
  const { lang, t } = useI18n();

  const recentActivities = [
    {
      id: 1,
      title: lang === 'en' ? 'Emergency Department Challenge: DKA' : '急診室挑戰：DKA',
      date: '2026-05-10',
      summary: lang === 'en' 
        ? 'Successfully identified the metabolic derangement and initiated fluid resuscitation. However, communication with the attending physician was slightly delayed.' 
        : '成功辨識出代謝異常並啟動輸液復甦。但在與主治醫師的溝通回報上稍有延遲。',
      strengths: ['Medical Knowledge', 'Patient Care'],
      improvements: ['Interpersonal Skills', 'Systems-Based Practice']
    },
    {
      id: 2,
      title: lang === 'en' ? 'Communication with Difficult Patients' : '困難醫病溝通',
      date: '2026-05-08',
      summary: lang === 'en'
        ? 'Maintained professional demeanor during escalating situation. Could improve on using the teach-back method to ensure patient understanding.'
        : '在情況升級時保持了專業態度。可加強使用「教導回饋法（Teach-back method）」以確保病人理解。',
      strengths: ['Professionalism'],
      improvements: ['Patient Communication']
    }
  ];

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <section className="activities-section" style={{ marginTop: '20px' }}>
        <h2 className="section-title text-gradient flex-gap">
          <BrainCircuit size={28} /> {t('advancingProject')}
        </h2>
        <p className="subtitle" style={{marginBottom: '32px'}}>
          {lang === 'en' ? 'AI-driven analysis of your recent activities and personalized strengthening suggestions.' : 'AI 驅動的近期活動分析與個人化強化建議。'}
        </p>

        <div className="ai-feedback-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {recentActivities.map(activity => (
            <div key={activity.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
              <div className="flex-between">
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{activity.title}</h3>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: 'none' }}>
                  {activity.date}
                </span>
              </div>
              
              <div style={{ padding: '16px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{activity.summary}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '8px' }}>
                  <h4 className="flex-gap" style={{ color: '#10B981', margin: '0 0 12px 0', fontSize: '0.9rem' }}>
                    <Star size={16} /> {lang === 'en' ? 'Demonstrated Strengths' : '展現出的優勢'}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {activity.strengths.map((s, i) => <li key={i} style={{ marginBottom: '4px' }}>{s}</li>)}
                  </ul>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '16px', borderRadius: '8px' }}>
                  <h4 className="flex-gap" style={{ color: '#F59E0B', margin: '0 0 12px 0', fontSize: '0.9rem' }}>
                    <Target size={16} /> {lang === 'en' ? 'Suggested Improvements' : '建議強化方向'}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {activity.improvements.map((s, i) => <li key={i} style={{ marginBottom: '4px' }}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-secondary flex-gap">
                  {lang === 'en' ? 'View Full Debrief' : '查看完整回饋'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvancingProjectPage;
