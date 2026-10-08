// Render compiler-generated DOT without adding dependencies to the website.
// Install tools from the repository root:
// npm install --prefix docs/how-to/clone-model-components/_draft/diagram-tools --no-package-lock --no-save @viz-js/viz@3.31.0 @resvg/resvg-js
// Export the model graph first:
// heta build docs/how-to/clone-model-components/example --export="SBML,Dot" --skip-updates
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const toolModules = path.join(__dirname, '..', '_draft', 'diagram-tools', 'node_modules');
const { instance } = require(path.join(toolModules, '@viz-js', 'viz', 'dist', 'viz.cjs'));
const { Resvg } = require(path.join(toolModules, '@resvg', 'resvg-js'));

async function main() {
  const outputDir = path.join(__dirname, '..', 'img');
  const previewDir = path.join(__dirname, '..', '_draft', 'diagram-previews');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(previewDir, { recursive: true });

  const xml = fs.readFileSync(path.join(__dirname, 'dist', 'sbml', 'nameless.xml'), 'utf8');
  const ids = tag => [...xml.matchAll(new RegExp(`<${tag}\\b[^>]*\\bid="([^"]+)"`, 'g'))].map(match => match[1]);
  assert.deepEqual(new Set(ids('compartment')), new Set(['blood', 'cell_vol_type1', 'cell_vol_type2', 'cell_vol_type3']));
  assert.equal(ids('species').length, 10);
  assert.equal(ids('species').filter(id => id === 'm3').length, 1);
  assert.equal(ids('reaction').length, 12);

  const viz = await instance();
  for (const [space, filename] of [['cell_template', 'cell-template'], ['nameless', 'three-cell-types']]) {
    const dot = fs.readFileSync(path.join(__dirname, 'dist', 'dot', `${space}.dot`), 'utf8')
      .replace(/label="(?:cell_template|nameless) model"/, 'label=""')
      .replace('fontname="times-bold"', 'fontname="Arial"')
      .replace('labeljust=r', 'labeljust=l')
      .replace('fillcolor=lightgray', 'fillcolor="#edf3fa"');
    const svg = viz.renderString(dot, {
      format: 'svg', engine: 'dot',
      graphAttributes: { bgcolor: 'white', pad: '0.2', rankdir: space === 'cell_template' ? 'LR' : 'TB' },
      nodeAttributes: { fontname: 'Arial', fontsize: '13', color: '#42546b' },
      edgeAttributes: { color: '#42546b' }
    });
    fs.writeFileSync(path.join(outputDir, `${filename}.svg`), svg);
    const preview = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
    fs.writeFileSync(path.join(previewDir, `${filename}.png`), preview.render().asPng());
    console.log(`Rendered ${filename}.svg from ${space}.dot`);
  }
  console.log('Verified three cell blocks, four compartments, and one shared m3 species.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
