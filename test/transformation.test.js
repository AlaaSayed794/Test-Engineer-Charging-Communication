import { spawnSync } from 'child_process';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
import { compareImages, rotateImage } from '../lib/imageProcessing';
import { exportFiles } from '../lib/testFiles';
const toolDirectory = join(__dirname, '..', './testData');
const toolPath = join(toolDirectory, 'Transformation.exe');
const outputPath = join(toolDirectory, 'output.bmp');
const inputPath = join(toolDirectory, 'valid.bmp');
const testPath = join(toolDirectory, 'test.bmp');
const nonExistingInputPath = join(toolDirectory, 'nonexistingPath');
const invalidInputPath = join(toolDirectory, 'invalid.bmp');
const comparisonPrecision = 0.05;
const cleanUp = () => {
  if (existsSync(outputPath)) {
    rmSync(outputPath);
  }
  if (existsSync(testPath)) {
    rmSync(testPath);
  }
};
describe('invalid cases', () => {
  beforeEach(() => {
    cleanUp();
  });
  afterAll(() => {
    cleanUp();
  });

  it('001 call the tool with no argument', () => {
    const result = spawnSync(toolPath, [], { cwd: toolDirectory });
    expect(result.status).not.toEqual(0, 'expecting a non zero return code');
    expect(existsSync(outputPath), 'expecting no output file is generated from this operation').toBeFalsy();
  });

  it('002 call the tool with non existing file', () => {
    const result = spawnSync(toolPath, [nonExistingInputPath], { cwd: toolDirectory });
    expect(result.status).not.toEqual(0, 'expecting a non zero return code');
    expect(existsSync(outputPath), 'expecting no output file is generated from this operation').toBeFalsy();
  });

  it('003 call the tool with invalid format file', () => {
    const result = spawnSync(toolPath, [invalidInputPath], { cwd: toolDirectory });
    expect(result.status).not.toEqual(0, 'expecting a non zero return code');
    expect(existsSync(outputPath), 'expecting no output file is generated from this operation').toBeFalsy();
  });

  it('004 call the tool with non existing file and 1 argument', () => {
    const result = spawnSync(toolPath, [nonExistingInputPath, 1], { cwd: toolDirectory });
    expect(result.status).not.toEqual(0, 'expecting a non zero return code');
    expect(existsSync(outputPath), 'expecting no output file is generated from this operation').toBeFalsy();
  });

  it('005 call the tool with invalid format file and 1 argument', () => {
    const result = spawnSync(toolPath, [invalidInputPath, 1], { cwd: toolDirectory });
    expect(result.status).not.toEqual(0, 'expecting a non zero return code');
    expect(existsSync(outputPath), 'expecting no output file is generated from this operation').toBeFalsy();
  });
});

describe('valid cases', () => {
  beforeEach(() => {
    cleanUp();
  });
  afterAll(() => {
    cleanUp();
  });
  it('006 call the tool with valid file (clockwise test)', async () => {
    const result = spawnSync(toolPath, [inputPath], { cwd: toolDirectory });
    await rotateImage(inputPath, testPath, 270);
    expect(result.status).toEqual(0, 'expecting a zero return code');
    expect(existsSync(outputPath), 'expecting output file is generated from this operation').toBeTruthy();
    exportFiles('006', inputPath, testPath, outputPath);
    const compareImagesResults = await compareImages(outputPath, testPath);
    expect(compareImagesResults, 'expect image to be rotated by 90 deg clock wise by comparing diff with a test image').toBeLessThan(comparisonPrecision);
  });
  it('007 call the tool with valid file and 1 argument (counter clockwise test)', async () => {
    const result = spawnSync(toolPath, [inputPath, 1], { cwd: toolDirectory });
    await rotateImage(inputPath, testPath, 90);
    expect(result.status).toEqual(0, 'expecting a zero return code');
    expect(existsSync(outputPath), 'expecting output file is generated from this operation').toBeTruthy();
    exportFiles('007', inputPath, testPath, outputPath);
    const compareImagesResults = await compareImages(outputPath, testPath);
    expect(compareImagesResults, 'expect image to be rotated by 90 deg counter clock wise by comparing diff with a test image').toBeLessThan(
      comparisonPrecision
    );
  });
});
