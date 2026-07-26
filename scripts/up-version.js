const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkgPath = path.join(process.cwd(), 'package.json');

try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const current = pkg.version || '0.0.0';
  const parts = current.split('.').map(Number);
  parts[2] = (parts[2] || 0) + 1;
  const newVersion = parts.join('.');

  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  console.log(`Version updated from ${current} to ${newVersion}`);
  console.log('Committing version update...');

  execSync('git add package.json');
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    execSync('git add yarn.lock');
  }
  if (fs.existsSync(path.join(process.cwd(), 'package-lock.json'))) {
    execSync('git add package-lock.json');
  }
  execSync(`git commit -m "chore: bump version to ${newVersion}"`);

  console.log('Ready for push!');
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
