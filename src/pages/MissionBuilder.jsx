import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { 
  Plus, 
  Settings, 
  BrainCircuit, 
  User, 
  Stethoscope, 
  Activity, 
  AlertCircle, 
  Save, 
  Play
} from 'lucide-react';
import './MissionBuilder.css';

const MissionBuilder = () => {
  const { t, lang } = useI18n();
  const [nodes, setNodes] = useState([
    { id: 1, type: 'patientIntro', x: 50, y: 50 },
    { id: 2, type: 'infoGathering', x: 250, y: 50 },
    { id: 3, type: 'decisionMaking', x: 450, y: 150 },
  ]);

  const availableNodes = [
    { type: 'patientIntro', icon: <User size={16} />, label: t('patientIntro'), color: 'var(--accent-teal)' },
    { type: 'infoGathering', icon: <Stethoscope size={16} />, label: t('infoGathering'), color: 'var(--accent-cyan)' },
    { type: 'decisionMaking', icon: <BrainCircuit size={16} />, label: t('decisionMaking'), color: '#8B5CF6' },
    { type: 'emergencyEvents', icon: <AlertCircle size={16} />, label: t('emergencyEvents'), color: '#EF4444' },
    { type: 'reflectionDebrief', icon: <Activity size={16} />, label: t('reflectionDebrief'), color: '#F59E0B' },
  ];

  return (
    <div className="builder-container">
      <div className="builder-header flex-between">
        <div>
          <h1 className="hero-title" style={{fontSize: '1.8rem', margin: 0}}>{t('missionBuilder')}</h1>
          <p className="hero-subtitle" style={{margin: '4px 0 0 0'}}>Designing the future clinical learning experience</p>
        </div>
        <div className="builder-actions flex-gap">
          <button className="btn-secondary flex-gap"><Settings size={18} /> Configure Settings</button>
          <button className="btn-secondary flex-gap"><Play size={18} /> Preview</button>
          <button className="btn-primary flex-gap"><Save size={18} /> Save Mission</button>
        </div>
      </div>

      <div className="builder-workspace">
        {/* Left: Node Palette */}
        <div className="builder-sidebar glass-panel">
          <h3 className="panel-title">Workflow Components</h3>
          <div className="node-palette">
            {availableNodes.map(node => (
              <div key={node.type} className="palette-item" style={{borderLeftColor: node.color}}>
                <div className="palette-icon" style={{color: node.color}}>{node.icon}</div>
                <span className="palette-label">{node.label}</span>
                <Plus size={14} className="add-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="builder-canvas">
          <div className="canvas-grid">
            {/* Simulated Nodes on Canvas */}
            {nodes.map((node, index) => {
              const nodeDef = availableNodes.find(n => n.type === node.type);
              return (
                <div 
                  key={node.id} 
                  className="canvas-node glass-panel"
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="node-header" style={{backgroundColor: `${nodeDef?.color}20`}}>
                    <span style={{color: nodeDef?.color}}>{nodeDef?.icon}</span>
                    <span className="node-title">{nodeDef?.label}</span>
                  </div>
                  <div className="node-body">
                    <div className="node-detail">Objective: Assess initial symptoms</div>
                    <div className="node-detail">Competency: MK, PC</div>
                  </div>
                  {/* Connectors */}
                  <div className="connector-in"></div>
                  <div className="connector-out"></div>
                </div>
              );
            })}
            
            {/* SVG Lines (Simulated) */}
            <svg className="canvas-connections">
              <path d="M 210 100 C 230 100, 230 100, 250 100" stroke="var(--border-glass)" strokeWidth="2" fill="none" />
              <path d="M 410 100 C 430 100, 430 200, 450 200" stroke="var(--border-glass)" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Right: AI Config */}
        <div className="builder-config glass-panel">
          <h3 className="panel-title flex-gap text-accent-gradient"><BrainCircuit size={18} /> {t('aiRecommendations')}</h3>
          
          <div className="config-section">
            <h4 className="config-label">Competency Alignment</h4>
            <div className="flex-gap" style={{flexWrap: 'wrap'}}>
              <span className="badge">Patient Care (Primary)</span>
              <span className="badge">Medical Knowledge</span>
              <span className="badge" style={{borderColor: 'rgba(239,68,68,0.3)', color: '#EF4444'}}>Missing: Communication</span>
            </div>
            <p className="ai-hint">AI Suggests: Add a "Patient Communication" node to address interpersonal skills.</p>
          </div>

          <div className="config-section">
            <h4 className="config-label">Estimated Workload</h4>
            <div className="workload-meter">
              <div className="meter-fill" style={{width: '65%'}}></div>
            </div>
            <p className="ai-hint text-center" style={{marginTop: '8px'}}>Moderate Difficulty (Est. 45 mins)</p>
          </div>

          <div className="config-section">
            <h4 className="config-label">Node Configuration</h4>
            <div className="config-form">
              <div className="form-group">
                <label>Adaptive Difficulty</label>
                <select className="form-select">
                  <option>Enabled (AI Driven)</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Feedback Criteria</label>
                <textarea className="form-textarea" rows="3" placeholder="Define what the AI should look for..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionBuilder;
