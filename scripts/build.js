const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const args = process.argv.slice(2);
const shouldUpdateVersion = args.includes('--uv');

if (shouldUpdateVersion) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;
  const versionParts = currentVersion.split('.');
  
  versionParts[1] = (parseInt(versionParts[1]) + 1).toString();
  versionParts[2] = '0';
  
  const newVersion = versionParts.join('.');
  packageJson.version = newVersion;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log(`Version updated from ${currentVersion} to ${newVersion}`);
  execSync('git add .');
  execSync(`git commit -m "chore: bump version to ${newVersion}"`);
  execSync(`git push`);
}

try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
