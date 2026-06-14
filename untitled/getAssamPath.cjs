const india = require('@svg-maps/india');
const as = india.default.locations.find(l => l.id === 'as');
if (!as) {
  Object.keys(india.default.locations).forEach(k => console.log(india.default.locations[k].id, india.default.locations[k].name))
} else {
  require('fs').writeFileSync('assam_path.txt', as.path);
}
