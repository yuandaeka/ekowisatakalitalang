import React from 'react';

interface ElevationProfileProps {
  points: number[]; // Array of values, e.g. [20, 35, 60, 80, 100, 90, ...]
  height?: number;
  width?: number;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({
  points,
  height = 70,
  width = 300,
  className = '',
  strokeColor = '#72A422', // Komoot green
  fillColor,
}) => {
  if (!points || points.length === 0) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const paddingY = 8;
  const usableHeight = height - paddingY * 2;
  const stepX = width / (points.length - 1);

  // Compute SVG coordinates
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const normalizedY = (p - min) / range;
    const y = height - paddingY - normalizedY * usableHeight;
    return { x, y };
  });

  // Build path strings
  const pathD = coords.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="komootElevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor || strokeColor} stopOpacity="0.32" />
            <stop offset="100%" stopColor={fillColor || strokeColor} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <path d={areaD} fill="url(#komootElevationGrad)" />

        {/* Stroke line */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start dot */}
        <circle
          cx={coords[0].x}
          cy={coords[0].y}
          r="3"
          fill="#FFFFFF"
          stroke={strokeColor}
          strokeWidth="2"
        />

        {/* Peak dot */}
        {coords.length > 1 && (
          <circle
            cx={coords[coords.length - 1].x}
            cy={coords[coords.length - 1].y}
            r="3"
            fill={strokeColor}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </div>
  );
};
