import sharp from 'sharp';

const concepts = ['frame', 'studio', 'city'];
const names = ['hero', 'one', 'two', 'three'];
const boards = process.argv.slice(2);
if (boards.length !== concepts.length) throw new Error('Pass contact sheets in frame, studio, city order.');

for (const [index, board] of boards.entries()) {
  const meta = await sharp(board).metadata();
  const width = Math.floor(meta.width / 2);
  const center = index === 2 ? 488 : Math.floor(meta.height / 2);
  for (const [slotIndex, name] of names.entries()) {
    await sharp(board)
      .extract({ left: slotIndex % 2 * width + 2, top: (slotIndex < 2 ? 0 : center) + 2, width: width - 4, height: (slotIndex < 2 ? center : meta.height - center) - 4 })
      .webp({ quality: 84 })
      .toFile('public/media/' + concepts[index] + '-' + name + '.webp');
  }
}
