const fs = require('fs');
let code = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');
const p = fs.readFileSync('assam_path_2.txt', 'utf8').trim();
const target = `<svg viewBox="0 0 100 100" className="w-full h-full text-primary drop-shadow-sm z-10" fill="currentColor">
                 {/* Stylized geometric Assam contour */}
                 <path d="M 15 55 L 20 40 L 35 45 L 50 40 L 65 30 L 80 25 L 90 30 L 95 40 L 85 45 L 80 40 L 65 55 L 70 70 L 60 85 L 50 75 L 55 60 L 45 55 L 30 65 L 20 60 Z" opacity="0.9" />
                 <path d="M 13 57 L 18 42 L 33 47 L 48 42 L 63 32 L 78 27 L 88 32 L 93 42 L 83 47 L 78 42 L 63 57 L 68 72 L 58 87 L 48 77 L 53 62 L 43 57 L 28 67 L 18 62 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
              </svg>`;
const replacement = `<svg viewBox="450 250 100 80" className="w-full h-full text-primary drop-shadow-sm z-10" fill="currentColor">
                 <path d="${p}" />
              </svg>`;
if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/HeroSection.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
