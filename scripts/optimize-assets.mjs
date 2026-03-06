import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();

const pipelines = [
  {
    name: 'clients',
    sourceDir: path.join(rootDir, 'public/clients'),
    outputDir: path.join(rootDir, 'public/optimized/clients'),
    widths: [240, 360],
    quality: {
      webp: 82,
      avif: 52
    }
  },
  {
    name: 'case-images',
    sourceDir: path.join(rootDir, 'public/landing/b2b'),
    outputDir: path.join(rootDir, 'public/optimized/landing/b2b'),
    widths: [640, 960, 1280],
    quality: {
      webp: 78,
      avif: 50
    }
  }
];

const VALID_EXT = new Set(['.png', '.jpg', '.jpeg']);

function sanitizeBaseName(fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  return base
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => VALID_EXT.has(path.extname(name).toLowerCase()));
}

async function optimizeOne(filePath, outDir, widths, quality) {
  const inputStat = await fs.stat(filePath);
  const fileName = path.basename(filePath);
  const sanitized = sanitizeBaseName(fileName);
  const metadata = await sharp(filePath).metadata();
  const sourceWidth = metadata.width || Math.max(...widths);
  const sourceHeight = metadata.height || 0;

  const selectedWidths = [...new Set(widths.map((w) => Math.min(w, sourceWidth)).filter((w) => w > 0))];

  const outputs = [];
  for (const width of selectedWidths) {
    for (const format of ['avif', 'webp']) {
      const outputName = `${sanitized}-${width}.${format}`;
      const outputPath = path.join(outDir, outputName);
      const transformer = sharp(filePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: quality[format] });

      await transformer.toFile(outputPath);
      const outputStat = await fs.stat(outputPath);

      outputs.push({
        file: path.relative(path.join(rootDir, 'public'), outputPath),
        width,
        format,
        bytes: outputStat.size
      });
    }
  }

  const smallest = outputs.reduce((min, item) => (item.bytes < min.bytes ? item : min), outputs[0]);

  return {
    source: path.relative(path.join(rootDir, 'public'), filePath),
    sourceBytes: inputStat.size,
    sourceWidth,
    sourceHeight,
    outputs,
    bestSavingsBytes: inputStat.size - smallest.bytes
  };
}

async function run() {
  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      sourceBytes: 0,
      optimizedBytes: 0,
      generatedFiles: 0,
      optimizedAssets: 0
    },
    assets: []
  };

  for (const pipeline of pipelines) {
    await ensureDir(pipeline.outputDir);
    const files = await listImageFiles(pipeline.sourceDir);

    for (const file of files) {
      const sourcePath = path.join(pipeline.sourceDir, file);
      const result = await optimizeOne(sourcePath, pipeline.outputDir, pipeline.widths, pipeline.quality);

      report.assets.push({
        type: pipeline.name,
        ...result
      });

      report.totals.sourceBytes += result.sourceBytes;
      report.totals.optimizedBytes += result.outputs.reduce((sum, out) => sum + out.bytes, 0);
      report.totals.generatedFiles += result.outputs.length;
      report.totals.optimizedAssets += 1;
    }
  }

  const reportDir = path.join(rootDir, 'public/optimized');
  await ensureDir(reportDir);
  const reportPath = path.join(reportDir, 'asset-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  const sourceKB = (report.totals.sourceBytes / 1024).toFixed(1);
  const generatedKB = (report.totals.optimizedBytes / 1024).toFixed(1);

  console.log(`Optimized ${report.totals.optimizedAssets} source images into ${report.totals.generatedFiles} files.`);
  console.log(`Source total: ${sourceKB} KB`);
  console.log(`Generated total: ${generatedKB} KB`);
  console.log(`Report: ${path.relative(rootDir, reportPath)}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
