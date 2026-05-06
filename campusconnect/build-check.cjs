const { execSync } = require('child_process');
const fs = require('fs');

try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log("Build Success");
} catch (error) {
  fs.writeFileSync('clean-build-log.txt', error.stdout.toString() + '\\n' + error.stderr.toString());
  console.log("Build failed, wrote to clean-build-log.txt");
}
