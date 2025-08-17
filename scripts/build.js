const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const args = process.argv.slice(2);

const shouldUpdateMajor = args.includes('--major');
const shouldUpdateMinor = args.includes('--minor');
const shouldUpdatePatch = args.includes('--patch');

if (shouldUpdateMajor || shouldUpdateMinor || shouldUpdatePatch) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;
  const versionParts = currentVersion.split('.');
  
  if (shouldUpdateMajor) {
    versionParts[0] = (parseInt(versionParts[0]) + 1).toString();
    versionParts[1] = '0';
    versionParts[2] = '0';
  } else if (shouldUpdateMinor) {
    versionParts[1] = (parseInt(versionParts[1]) + 1).toString();
    versionParts[2] = '0';
  } else if (shouldUpdatePatch) {
    versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
  }
  
  const newVersion = versionParts.join('.');
  packageJson.version = newVersion;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  execSync('git add .');
  execSync(`git commit -m "chore: bump version to ${newVersion}"`);
  execSync(`git push`);

  console.log(`Version updated from ${currentVersion} to ${newVersion}`);
}

try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
