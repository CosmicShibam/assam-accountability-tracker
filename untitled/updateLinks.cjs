const fs = require('fs');

const file = 'src/lib/initialData.ts';
let code = fs.readFileSync(file, 'utf8');

const mapping = {
  "assam-2026-ucc": "https://newsonair.gov.in/assam-assembly-passes-ucc-bill-becoming-third-state-to-adopt-legislation/",
  "assam-2026-polygamy-ban": "https://timesofindia.indiatimes.com/india/assam-assembly-passes-ucc-bill-with-ban-on-polygamy-live-in-registration-rules/articleshow/131346393.cms",
  "assam-2026-economy-10lakhcr": "https://timesofindia.indiatimes.com/city/guwahati/will-work-to-make-state-10l-cr-economy-assam-cm/articleshow/131335127.cms",
  "assam-2026-2lakh-jobs": "https://timesofindia.indiatimes.com/elections/assembly-elections/assam/photos/assam-polls-2026-from-ucc-to-employment-what-bjp-manifesto-sankalpa-patra-promises/photostory/129917422.cms",
  "assam-2026-flood-18000cr": "https://timesofindia.indiatimes.com/elections/assembly-elections/assam/photos/assam-polls-2026-from-ucc-to-employment-what-bjp-manifesto-sankalpa-patra-promises/photostory/129917422.cms",
  "assam-2026-infra-5lakhcr": "https://timesofindia.indiatimes.com/elections/assembly-elections/assam/photos/assam-polls-2026-from-ucc-to-employment-what-bjp-manifesto-sankalpa-patra-promises/photostory/129917422.cms",
  "assam-2026-health-50000cr": "https://timesofindia.indiatimes.com/elections/assembly-elections/assam/photos/assam-polls-2026-from-ucc-to-employment-what-bjp-manifesto-sankalpa-patra-promises/photostory/129917422.cms",
  "assam-2025-orunodoi-3": "https://www.bjp.org/pressreleases/assam-election-manifesto-2026",
  "assam-2025-flight-3000": "https://www.bjp.org/pressreleases/assam-election-manifesto-2026",
  "assam-2025-investment-mous": "https://www.bjp.org/pressreleases/assam-election-manifesto-2026",
  "assam-2026-orunodoi-40lakh": "https://www.bjp.org/pressreleases/assam-election-manifesto-2026",
  "assam-land-reclamation-5lakh-bigha": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-welfare-expansion": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-free-education-kg-pg": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-education-city": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-new-colleges-expansion": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-11000-farmer-support": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-agriculture-modernisation": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-10lakh-entrepreneurs": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-sez-development": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-electronics-manufacturing": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-eastern-gateway": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-river-transport": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-new-airports": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-vande-bharat-connectivity": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-underwater-tunnel": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-flood-free-mission": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-modern-flood-forecasting": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-drainage-modernisation": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-proton-therapy-centre": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-medical-hub-northeast": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-love-jihad-law": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-anti-infiltration-law": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-indigenous-land-protection": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-women-entrepreneurship": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-startup-ecosystem": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-maritime-jobs": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf",
  "assam-aviation-sector-jobs": "https://www.bjp.org/files/inline-documents/Assam-Manifesto-2026-English.pdf"
};

// Replace existing urls completely or add new ones
let updatedCode = code;

for (const [id, url] of Object.entries(mapping)) {
  const targetStr = `    "id": "${id}",\n`;
  // First, check if sourceUrl already exists for this block
  const blockRegex = new RegExp(`("id": "${id}",\n\\s*"sourceUrl": ")[^"]+(")`);
  
  if (blockRegex.test(updatedCode)) {
    updatedCode = updatedCode.replace(blockRegex, `$1${url}$2`);
  } else {
    updatedCode = updatedCode.replace(targetStr, `    "id": "${id}",\n    "sourceUrl": "${url}",\n`);
  }
}

fs.writeFileSync(file, updatedCode);

let contextCode = fs.readFileSync('src/context/PromiseContext.tsx', 'utf8');
contextCode = contextCode.replace("localStorage.getItem('assam_promises_v2')", "localStorage.getItem('assam_promises_v3')");
contextCode = contextCode.replace("localStorage.setItem('assam_promises_v2'", "localStorage.setItem('assam_promises_v3'");
fs.writeFileSync('src/context/PromiseContext.tsx', contextCode);

console.log('done');
