import React from 'react';

/**
 * Custom SVG divider — lotus flanks with a glowing ॐ at the centre.
 */
export default function OmDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <svg width="110" height="14" viewBox="0 0 110 14" className="text-golden/60">
        <path
          d="M0 7 H38 M72 7 H110"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        {/* lotus left */}
        <g fill="currentColor" opacity="0.9">
          <path d="M40 7 q2 -5 6 -5 q1 3 -3 5 q-2 0 -3 0 Z" />
          <path d="M40 7 q2 5 6 5 q1 -3 -3 -5 q-2 0 -3 0 Z" />
          <path d="M43 7 q1 -6 4 -6 q1 4 -2 6 Z" />
        </g>
        {/* lotus right */}
        <g fill="currentColor" opacity="0.9">
          <path d="M70 7 q-2 -5 -6 -5 q-1 3 3 5 q2 0 3 0 Z" />
          <path d="M70 7 q-2 5 -6 5 q-1 -3 3 -5 q2 0 3 0 Z" />
          <path d="M67 7 q-1 -6 -4 -6 q-1 4 2 6 Z" />
        </g>
      </svg>
      <span className="font-heading text-2xl leading-none text-shimmer">ॐ</span>
      <svg width="110" height="14" viewBox="0 0 110 14" className="text-golden/60 -scale-x-100">
        <path
          d="M0 7 H38 M72 7 H110"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <g fill="currentColor" opacity="0.9">
          <path d="M40 7 q2 -5 6 -5 q1 3 -3 5 q-2 0 -3 0 Z" />
          <path d="M40 7 q2 5 6 5 q1 -3 -3 -5 q-2 0 -3 0 Z" />
          <path d="M43 7 q1 -6 4 -6 q1 4 -2 6 Z" />
        </g>
        <g fill="currentColor" opacity="0.9">
          <path d="M70 7 q-2 -5 -6 -5 q-1 3 3 5 q2 0 3 0 Z" />
          <path d="M70 7 q-2 5 -6 5 q-1 -3 3 -5 q2 0 3 0 Z" />
          <path d="M67 7 q-1 -6 -4 -6 q-1 4 2 6 Z" />
        </g>
      </svg>
    </div>
  );
}
