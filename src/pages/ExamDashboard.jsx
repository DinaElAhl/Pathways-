import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, SCHOOL_TYPES } from '../data/examData';

const LS_KEY = 'raqp_results';

function loadResults() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch(e) { return []; }
}

function clearAllResults() {
  if (window.confirm('Clear all exam records from this device? This cannot be undone.')) {
    localStorage.removeItem(LS_KEY);
    return true;
  }
  return false;
}

function LevelChip({ levelId, passed }) {
  const lv = LEVELS.find(l => l.id === levelId);
  if (!lv) return null;
  return (
    <span style={{
      display:'inline-block', padding:'2px 8px', borderRadius:12, fontSize:11, fontWeight:700,
      background: passed ? lv.bg : '#fee2e2', color: passed ? lv.color : '#b91c1c',
      margin:'0 2px',
    }}>
      {lv.cefr} {passed ? '✓' : '✕'}
    </span>
  );
}

export default function ExamDashboard() {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setResults(loadResults());
    const onStorage = () => setResults(loadResults());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function handleClear() {
    if (clearAllResults()) setResults([]);
  }

  function handleDeleteOne(id) {
    const updated = results.filter(r => r.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setResults(updated);
  }

  const filtered = results.filter(r => {
    const nameMatch = !search || (r.studentName || '').toLowerCase().includes(search.toLowerCase());
    const levelMatch = filter === 'all' || r.finalLevel === filter;
    return nameMatch && levelMatch;
  });

  const stats = {
    total: results.length,
    passed: results.filter(r => r.levelResults?.some(l => l.passed)).length,
    avgScore: results.length ? Math.round(
      results.reduce((sum, r) => sum + (r.levelResults?.filter(l => l.passed).length || 0), 0) / results.length * 10
    ) : 0,
    byLevel: LEVELS.map(lv => ({
      ...lv,
      count: results.filter(r => r.finalLevel === lv.id).length,
    })),
  };

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', paddingBottom:48 }}>
      <div style={{ background:'linear-gradient(135deg,#1e293b,#3b4f6b)', padding:'32px 24px', marginBottom:0 }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', margin:'0 0 4px' }}>
                📊 RAQP Exam Dashboard
              </h1>
              <p style={{ fontSize:13, color:'#94a3b8', margin:0 }}>
                Arabic & Quran Proficiency — Student Results (this device)
              </p>
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <Link to="/pathways-exam" style={{ background:'#7c3aed', color:'#fff', textDecoration:'none', borderRadius:10, padding:'8px 16px', fontSize:13, fontWeight:700 }}>
                + New Exam
              </Link>
              <button onClick={handleClear} style={{ background:'rgba(255,255,255,0.1)', color:'#f8fafc', border:'none', borderRadius:10, padding:'8px 14px', fontSize:13, cursor:'pointer' }}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'0 16px' }}>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, margin:'24px 0' }}>
          {[
            { label:'Total Exams', value:stats.total, color:'#1d4ed8', icon:'📋' },
            { label:'Exams with Pass', value:stats.passed, color:'#059669', icon:'✅' },
            { label:'Avg Levels Passed', value:(stats.avgScore/10).toFixed(1), color:'#7c3aed', icon:'🎯' },
            { label:'Device Storage', value:results.length + '/100', color:'#d97706', icon:'💾' },
          ].map((s,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:14, padding:'16px', border:'1px solid #e2e8f0', textAlign:'center', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize:24, marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level Distribution */}
        <div style={{ background:'#fff', borderRadius:14, padding:'16px 20px', marginBottom:20, border:'1px solid #e2e8f0' }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#374151', margin:'0 0 12px' }}>Level Distribution</h3>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {stats.byLevel.map(lv => (
              <div key={lv.id} style={{ background:lv.bg, color:lv.color, borderRadius:10, padding:'8px 14px', fontSize:13, fontWeight:700 }}>
                {lv.name} ({lv.cefr}): {lv.count}
              </div>
            ))}
            <div style={{ background:'#f1f5f9', color:'#64748b', borderRadius:10, padding:'8px 14px', fontSize:13, fontWeight:700 }}>
              In Progress / Incomplete: {results.filter(r => !r.finalLevel).length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:12, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
          <input
            type="text"
            placeholder="🔍 Search by student name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:200, border:'1.5px solid #e2e8f0', borderRadius:10, padding:'8px 14px', fontSize:13, outline:'none' }}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ border:'1.5px solid #e2e8f0', borderRadius:10, padding:'8px 12px', fontSize:13, background:'#fff' }}>
            <option value="all">All Levels</option>
            {LEVELS.map(lv => <option key={lv.id} value={lv.id}>{lv.name} ({lv.cefr})</option>)}
          </select>
        </div>

        {/* Results Table */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 20px', color:'#94a3b8' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
            <p style={{ fontSize:15, fontWeight:600 }}>{results.length === 0 ? 'No exam results yet.' : 'No results match your search.'}</p>
            <p style={{ fontSize:13 }}>{results.length === 0 ? 'Complete the RAQP Exam to see results here.' : 'Try a different filter or search term.'}</p>
            {results.length === 0 && (
              <Link to="/pathways-exam" style={{ display:'inline-block', marginTop:12, background:'#7c3aed', color:'#fff', textDecoration:'none', borderRadius:10, padding:'10px 24px', fontSize:13, fontWeight:700 }}>
                Start Exam Now
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display:'grid', gap:12 }}>
            {filtered.map((r) => {
              const school = SCHOOL_TYPES.find(s => s.id === r.schoolType);
              const finalLv = LEVELS.find(l => l.id === r.finalLevel);
              const date = r.date ? new Date(r.date).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : 'Unknown';
              const isOpen = expanded === r.id;
              return (
                <div key={r.id} style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div
                    onClick={() => setExpanded(isOpen ? null : r.id)}
                    style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', cursor:'pointer', gap:12, flexWrap:'wrap' }}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:36, height:36, borderRadius:99, background: finalLv?.bg || '#f1f5f9', color: finalLv?.color || '#64748b', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:13 }}>
                        {finalLv?.cefr?.split('')[0] || '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, color:'#1e293b', fontSize:14 }}>{r.studentName || 'Anonymous Student'}</div>
                        <div style={{ fontSize:12, color:'#64748b' }}>{school?.name || r.schoolType} • {date}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div>
                        {(r.levelResults || []).map(lr => (
                          <LevelChip key={lr.levelId} levelId={lr.levelId} passed={lr.passed} />
                        ))}
                      </div>
                      {finalLv && (
                        <span style={{ background:finalLv.bg, color:finalLv.color, padding:'4px 10px', borderRadius:12, fontSize:12, fontWeight:700 }}>
                          {finalLv.name}
                        </span>
                      )}
                      <span style={{ fontSize:16, color:'#94a3b8' }}>{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:'1px solid #f1f5f9', padding:'14px 18px', background:'#fafbfc' }}>
                      <div style={{ display:'grid', gap:8, marginBottom:12 }}>
                        {(r.levelResults || []).map(lr => {
                          const lv = LEVELS.find(l => l.id === lr.levelId);
                          return (
                            <div key={lr.levelId} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13 }}>
                              <span style={{ color:'#475569' }}>{lv?.name} ({lv?.cefr})</span>
                              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                <span style={{ color:'#1e293b', fontWeight:600 }}>{lr.score}/10 ({Math.round((lr.score/10)*100)}%)</span>
                                <span style={{ color: lr.passed ? '#059669' : '#dc2626', fontWeight:700, fontSize:12 }}>
                                  {lr.passed ? '✓ PASSED' : '✕ STOPPED'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteOne(r.id); }}
                        style={{ background:'#fee2e2', color:'#b91c1c', border:'none', borderRadius:8, padding:'6px 14px', fontSize:12, fontWeight:700, cursor:'pointer' }}
                      >
                        Delete Record
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop:24, padding:'14px 18px', background:'#fffbeb', borderRadius:12, border:'1px solid #fde68a', fontSize:12, color:'#92400e' }}>
          ⚠️ <strong>Note:</strong> Results are stored locally on this device. To track students across multiple devices, a backend integration is needed. All data shown here is from this browser only.
        </div>
      </div>
    </div>
  );
}
