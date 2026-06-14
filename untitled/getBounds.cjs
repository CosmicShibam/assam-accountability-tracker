const fs = require('fs');
const india = require('@svg-maps/india');
const locs = india.default.locations;
const assam = locs.find(l => l.name.toLowerCase().includes('assam'));

if (assam) {
  const getBounds = require('svg-path-bounds');
  const path = assam.path;
  const [minX, minY, maxX, maxY] = getBounds(path);
  const width = maxX - minX;
  const height = maxY - minY;
  console.log(`VIEWBOX: ${minX} ${minY} ${width} ${height}`);
  fs.writeFileSync('assam_path_2.txt', path);
} else {
  console.log("no assam");
}
