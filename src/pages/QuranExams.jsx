import { useState } from 'react';
import { Link } from 'react-router-dom';
import { accreditedExams } from '../data/accreditedExams';

const quranExams = accreditedExams.filter(e => e.category === 'Quran');

const DIFF_META = [
  { max: 1, label: 'Beginner',     color: '#16a34a', bg: '#dcfce7' },
  { max: 2, label: 'Intermediate', color: '#d97706', bg: '#fef3c7' },
  { max: 3, label: 'Advanced',     color: '#dc2626', bg: '#fee2e2' },
  { max: 4, label: 'Expert',       color: '#7c3aed', bg: '#ede9fe' },
  { max: 9, label: 'Master',       color: '#1d4ed8', bg: '#dbeafe' },
];

function getDiff(d) {
  return DIFF_META.find(m => d <= m.max) || DIFF_META[DIFF_META.length - 1];
}

function ExamCard({ exam }) {
  const [open, setOpen] = useState(false);
  const diff = getDiff(exam.difficulty);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 50%, #7c3aed 100%)',
          padding: '28px 24px 20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: 0, lineHeight: 1.3, flex: 1 }}>
            {exam.name}
          </h3>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(4px)',
            }}
          >
            {exam.type}
          </span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              background: diff.bg,
              color: diff.color,
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {diff.label} · {exam.difficulty}/5
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#e0e7ff',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {exam.level}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.7 }}>{exam.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Cost</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', margin: 0 }}>{exam.cost}</p>
          </div>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Availability</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', margin: 0 }}>{exam.availability}</p>
          </div>
        </div>

        {exam.countries && exam.countries.length > 0 && (
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 6px' }}>Recognized In</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {exam.countries.map(c => (
                <span
                  key={c}
                  style={{
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    borderRadius: 20,
                    padding: '2px 9px',
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {exam.recognizedBy && (
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
            <span style={{ fontWeight: 700, color: '#374151' }}>Recognized by: </span>
            {exam.recognizedBy}
          </p>
        )}

        <div>
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              color: '#1d4ed8',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{open ? '▾' : '▸'}</span>
            Prep Resources ({exam.prepResources ? exam.prepResources.length : 0})
          </button>
          {open && exam.prepResources && (
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                paddingLeft: 12,
                borderLeft: '2px solid #dbeafe',
              }}
            >
              {exam.prepResources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}
                >
                  → {r.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <a
          href={exam.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '12px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            marginTop: 'auto',
            letterSpacing: 0.2,
          }}
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}

export default function QuranExams() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eff6ff 0%, #f5f3ff 100%)', fontFamily: 'sans-serif' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 50%, #7c3aed 100%)',
          padding: '72px 20px 60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 30,
            padding: '6px 16px',
            marginBottom: 20,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: 18 }}>📖</span>
          <span style={{ color: '#c7d2fe', fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
            QURANIC CERTIFICATIONS
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 16px',
            lineHeight: 1.2,
          }}
        >
          Quran Exams &amp; Certifications
        </h1>
        <p style={{ fontSize: 16, color: '#a5b4fc', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.7 }}>
          From Tajweed fundamentals to the highest Ijazah in recitation and memorisation — find the right
          certification for your level.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/accredited-exams"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: 30,
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            ← All Exams
          </Link>
          <a
            href="https://quran.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#fff',
              color: '#1d4ed8',
              borderRadius: 30,
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Start on Quran.com →
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>
              {quranExams.length} Quranic Certifications
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Internationally recognized Islamic education credentials
            </p>
          </div>
          <Link
            to="/accredited-exams?category=Quran"
            style={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}
          >
            View in full exam list →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {quranExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            background: '#fff',
            borderRadius: 20,
            padding: '36px 32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 24, margin: '0 0 12px' }}>🕌</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: '0 0 10px' }}>
            About Quranic Certifications
          </h3>
          <p
            style={{
              fontSize: 15,
              color: '#475569',
              maxWidth: 680,
              margin: '0 auto 20px',
              lineHeight: 1.8,
            }}
          >
            These certifications represent centuries of Islamic scholarly tradition. An Ijazah carries an
            unbroken chain (isnad) of transmission back to the Prophet Muhammad (﴿﴾), through
            verified teachers and scholars.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://bayyinah.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#eff6ff',
                color: '#1d4ed8',
                borderRadius: 30,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Bayyinah Institute
            </a>
            <a
              href="https://tarteel.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#f5f3ff',
                color: '#7c3aed',
                borderRadius: 30,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Tarteel AI
            </a>
            <a
              href="https://quranacademy.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#eff6ff',
                color: '#1d4ed8',
                borderRadius: 30,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Quran Academy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
