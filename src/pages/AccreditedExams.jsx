import { useState } from 'react';
import { accreditedExams } from '../data/accreditedExams';

const getDifficultyColor = (difficulty) => {
  if (difficulty <= 2) return '#22c55e';
  if (difficulty <= 3) return '#f59e0b';
  if (difficulty <= 4) return '#ef4444';
  return '#7c3aed';
};

const getDifficultyLabel = (difficulty) => {
  if (difficulty <= 1) return 'Beginner';
  if (difficulty <= 2) return 'Intermediate';
  if (difficulty <= 3) return 'Advanced';
  if (difficulty <= 4) return 'Expert';
  return 'Master';
};

export default function AccreditedExams() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Exams');
  const [region, setRegion] = useState('Global');

  const categories = ['All Exams', ...new Set(accreditedExams.map(e => e.category))];
  const regions = ['Global', 'USA', 'UK', 'Europe', 'Australia', 'Canada', 'Arab States', 'MENA', 'Asia', 'New Zealand'];

  const filtered = accreditedExams.filter(exam => {
    const matchSearch = search === '' ||
      exam.name.toLowerCase().includes(search.toLowerCase()) ||
      exam.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All Exams' || exam.category === category;
    const matchRegion = region === 'Global' || (exam.countries && exam.countries.includes(region));
    return matchSearch && matchCategory && matchRegion;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1e293b', marginBottom: 12 }}>
            Accredited Exams Worldwide
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 600, margin: '0 auto' }}>
            Discover and compare language proficiency tests, university entrance exams, and professional certifications recognized globally.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Search Exams</label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Region</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: '#64748b' }}>
            Showing <strong>{filtered.length}</strong> exams
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 24 }}>
          {filtered.map(exam => {
            const isPending = exam.status === 'pending';
            return (
              <div
                key={exam.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: isPending ? '0 0 0 2px #7c3aed, 0 4px 20px rgba(124,58,237,0.15)' : '0 2px 12px rgba(0,0,0,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isPending && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '4px 0',
                    letterSpacing: 1
                  }}>
                    ✦ PATHWAYS ORIGINAL · ACCREDITATION IN PROGRESS ✦
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: isPending ? 20 : 0 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0, flex: 1, paddingRight: 8 }}>
                    {exam.name}
                  </h3>
                  <span style={{
                    background: '#ede9fe',
                    color: '#6d28d9',
                    borderRadius: 20,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>
                    {exam.category}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    background: getDifficultyColor(exam.difficulty) + '22',
                    color: getDifficultyColor(exam.difficulty),
                    borderRadius: 20,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {getDifficultyLabel(exam.difficulty)} (Difficulty: {exam.difficulty}/5)
                  </span>
                  {isPending && (
                    <span style={{
                      background: '#f3e8ff',
                      color: '#7c3aed',
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      🕐 Pending Accreditation
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 14, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  {exam.description}
                </p>

                {isPending && exam.levels && (
                  <div style={{ background: '#faf5ff', borderRadius: 10, padding: 12, border: '1px solid #e9d5ff' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', margin: '0 0 8px 0' }}>EXAM LEVELS</p>
                    {exam.levels.map(l => (
                      <div key={l.level} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ background: '#7c3aed', color: '#fff', borderRadius: 4, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>
                          {l.cefr}
                        </span>
                        <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 600 }}>{l.name}</span>
                        <span style={{ fontSize: 12, color: '#7c3aed', fontFamily: 'serif' }}>{l.arabic}</span>
                        <span style={{ fontSize: 11, color: '#64748b' }}>· {l.audience}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 12, fontSize: 13 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    <span style={{ color: '#64748b' }}>Type: <strong style={{ color: '#1e293b' }}>{exam.type}</strong></span>
                    <span style={{ color: '#64748b' }}>Level: <strong style={{ color: '#1e293b' }}>{exam.level}</strong></span>
                    <span style={{ color: '#64748b' }}>Cost: <strong style={{ color: '#1e293b' }}>{exam.cost}</strong></span>
                    <span style={{ color: '#64748b' }}>Availability: <strong style={{ color: '#1e293b' }}>{exam.availability}</strong></span>
                  </div>
                </div>

                {exam.countries && (
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 6px 0' }}>Countries:</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {exam.countries.map(c => (
                        <span key={c} style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 20, padding: '2px 9px', fontSize: 12, fontWeight: 500 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {exam.recognizedBy && (
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                    Recognized by: <strong style={{ color: '#1e293b' }}>{exam.recognizedBy}</strong>
                  </p>
                )}

                {exam.prepResources && exam.prepResources.length > 0 && (
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 6px 0' }}>
                      {isPending ? 'Try It Now:' : 'Prep Resources:'}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {exam.prepResources.map((r, i) => (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: isPending ? '#7c3aed' : '#2563eb',
                            fontSize: 13,
                            textDecoration: 'none',
                            fontWeight: isPending && i === 0 ? 700 : 400
                          }}
                        >
                          {isPending && i === 0 ? '▶ ' : ''}{r.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={exam.url || (isPending ? 'https://claude.ai/public/artifacts/130ad91f-9ec4-42a3-8f5d-479aef8a5b59' : '#')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '11px',
                    borderRadius: 10,
                    background: isPending ? 'linear-gradient(90deg, #7c3aed, #a855f7)' : '#1d4ed8',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    marginTop: 'auto'
                  }}
                >
                  {isPending ? 'Take Free Exam →' : 'Learn More →'}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
