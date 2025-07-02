const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public/characters');
const outputPath = path.join(__dirname, '../data/characters.json');

function toTitleCase(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1));
}

type Character = {
  name: string;
  anime: string;
  image: string;
  power: number;
};

const characters: Character[] = [];

const animeDirs = fs.readdirSync(publicDir);

animeDirs.forEach((animeFolder: string) => {
  const animePath = path.join(publicDir, animeFolder);
  const files = fs.readdirSync(animePath);

  files.forEach((file: string) => {

    const characterName = toTitleCase(path.basename(file, path.extname(file)));
    characters.push({
      name: characterName,
      anime: toTitleCase(animeFolder),
      image: `/characters/${animeFolder}/${file}`,
      power: 0
    });
  });
});


fs.writeFileSync(outputPath, JSON.stringify(characters, null, 2));
console.log(`✅ Generated ${characters.length} characters to ${outputPath}`);
///npx ts-node scripts/generate-characters.ts
