const fs = require('fs');
const path = require('path');

describe('Public HTML page', () => {
  const indexPath = path.join(__dirname, '../public/index.html');

  test('index.html exists', () => {
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  test('index.html has expected title and heading', () => {
    const html = fs.readFileSync(indexPath, 'utf8');
    expect(html).toContain('<title>Backend2 Frontend</title>');
    expect(html).toContain('<h1 id="app-title">Welcome to Backend2 Frontend</h1>');
  });
});
