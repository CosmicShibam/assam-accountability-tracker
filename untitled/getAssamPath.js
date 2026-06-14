const india = require('@svg-maps/india');
const assam = india.locations.find(l => l.id === 'assam');
require('fs').writeFileSync('assam_path.txt', assam.path);
