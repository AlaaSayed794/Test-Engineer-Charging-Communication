import { join } from 'path';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
const reportsDirectory = join(__dirname, '..', './reports');

export const exportFiles = (testId, inputPath, testPath, outputPath) => {
  copyFileSync(inputPath, reportsDirectory + `/${testId}input.bmp`);
  copyFileSync(testPath, reportsDirectory + `/${testId}expected.bmp`);
  copyFileSync(outputPath, reportsDirectory + `/${testId}actual.bmp`);
  const testMapPath = join(reportsDirectory, 'testMap.json');
  let testMap = {};
  if (existsSync(testMapPath)) {
    testMap = JSON.parse(readFileSync(testMapPath));
  }
  testMap[testId] = {
    inputImage: `./${testId}input.bmp`,
    expectedImage: `./${testId}expected.bmp`,
    actualImage: `./${testId}actual.bmp`
  };
  writeFileSync(testMapPath, JSON.stringify(testMap), 'utf-8');
};
