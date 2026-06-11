import React from "react";

export default function HeroDoodle() {
  return (
    <svg
      className="heroDoodle"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Cartoon illustration: laptop, cube blocks, and sparkles"
    >
      <defs>
        <filter id="roughen" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="0.7" />
        </filter>
      </defs>

      <g filter="url(#roughen)">
        {/* Sparkles */}
        <g className="doodleSparkles">
          <path d="M82 70l8 10 12 4-12 4-8 10-8-10-12-4 12-4 8-10Z" />
          <path d="M430 64l6 8 10 3-10 3-6 8-6-8-10-3 10-3 6-8Z" />
          <path d="M454 210l7 9 11 3-11 3-7 9-7-9-11-3 11-3 7-9Z" />
        </g>

        {/* Laptop */}
        <g className="doodleLaptop">
          <rect x="128" y="74" width="264" height="166" rx="18" />
          <rect x="150" y="96" width="220" height="122" rx="12" className="fillAccent2" />
          <path d="M170 132h90" />
          <path d="M170 156h150" />
          <path d="M170 180h120" />
          <path d="M108 250h304" />
          <path d="M92 250h336c0 22-18 40-40 40H132c-22 0-40-18-40-40Z" className="fillPaper" />
        </g>

        {/* Cube blocks */}
        <g className="doodleCubes">
          <path d="M68 212l64-22 64 22-64 22-64-22Z" className="fillAccent1" />
          <path d="M68 212v58l64 22v-58l-64-22Z" className="fillAccent3" />
          <path d="M196 212v58l-64 22v-58l64-22Z" className="fillAccent2" />

          <path d="M356 212l52-18 52 18-52 18-52-18Z" className="fillAccent2" />
          <path d="M356 212v50l52 18v-50l-52-18Z" className="fillAccent3" />
          <path d="M460 212v50l-52 18v-50l52-18Z" className="fillAccent1" />
        </g>
      </g>
    </svg>
  );
}

