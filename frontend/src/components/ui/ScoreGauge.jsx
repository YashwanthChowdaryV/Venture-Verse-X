import React from 'react';

const ScoreGauge = ({ score, size = 96, label = 'Score' }) => {
  const s = score ?? 0;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (s / 100) * circumference;

  // Color based on score using the warm palette
  const getColor = (val) => {
    if (val >= 80) return '#22C55E'; // green for strong
    if (val >= 60) return '#FFBF00'; // brand primary for good
    if (val >= 40) return '#FF7900'; // action/orange for medium
    return '#EF4444'; // red for low
  };

  const color = getColor(s);

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="5"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div
        className="score-gauge-inner"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: size * 0.28,
            fontWeight: 800,
            color: '#1E1E1E',
            lineHeight: 1,
          }}
        >
          {s}
        </span>
        {label && (
          <span
            style={{
              fontSize: Math.max(9, size * 0.1),
              color: '#5C5C5C',
              fontWeight: 600,
              marginTop: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreGauge;
