import jimp from 'jimp';

export const compareImages = async (path1, path2) => {
  const originalImage = await jimp.read(path1);
  const outputPath = await jimp.read(path2);
  return jimp.diff(originalImage, outputPath).percent;
};

export const rotateImage = async (inPath, outPath, angle) => {
  const image = await jimp.read(inPath);
  const { width, height } = image.bitmap;
  await image.rotate(angle, true).resize(height, width, jimp.RESIZE_BICUBIC).writeAsync(outPath);
};
