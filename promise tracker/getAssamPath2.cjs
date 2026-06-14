const india = require('@svg-maps/india');
const locs = india.default.locations;
locs.forEach(l => {
  if (l.name.toLowerCase().includes('assam')) {
    require('fs').writeFileSync('assam_path_2.txt', l.path);
    console.log("Found assam!");
  }
});
