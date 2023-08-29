const fs = require('fs');
const yaml = require('js-yaml');

const lockFile = fs.readFileSync('yarn.lock', 'utf8');
const lockData = yaml.load(lockFile);

const packageVersions = {};

for (const [key, value] of Object.entries(lockData)) {
  const packageName = key.split('@')[0];
  const version = value.version;

  packageVersions[packageName] = packageVersions[packageName] || new Set();
  packageVersions[packageName].add(version);
}

for (const [packageName, versions] of Object.entries(packageVersions)) {
  if (versions.size > 1) {
    console.log(`Package: ${packageName}, Versions: ${Array.from(versions).join(', ')}`);
  }
}
