import classicImg from "@/assets/style-classic.jpg";
import mangaImg from "@/assets/style-manga.jpg";
import cyberpunkImg from "@/assets/style-cyberpunk.jpg";
import ghibliImg from "@/assets/style-ghibli.jpg";
import kawaiiImg from "@/assets/style-kawaii.jpg";
import samuraiImg from "@/assets/style-samurai.jpg";
import cartoon3dImg from "@/assets/style-cartoon3d.jpg";
import comicImg from "@/assets/style-comic.jpg";
import chibiImg from "@/assets/style-chibi.jpg";
import retroToonImg from "@/assets/style-retrotoon.jpg";
import watercolorImg from "@/assets/style-watercolor.jpg";
import pixelImg from "@/assets/style-pixel.jpg";
import gothicImg from "@/assets/style-gothic.jpg";
import superheroImg from "@/assets/style-superhero.jpg";
import clayImg from "@/assets/style-clay.jpg";
import fantasyImg from "@/assets/style-fantasy.jpg";

export type AnimeStyle = {
  id: string;
  name: string;
  img: string;
  prompt: string;
  category: "Anime" | "Cartoon" | "Comic" | "Artistic";
};

export const styles: AnimeStyle[] = [
  { id: "classic", name: "Classic Anime", img: classicImg, category: "Anime", prompt: "classic anime art style, clean cel shading, expressive anime eyes" },
  { id: "manga", name: "Manga", img: mangaImg, category: "Anime", prompt: "black and white manga illustration, screentones, sharp ink lines" },
  { id: "cyberpunk", name: "Cyberpunk", img: cyberpunkImg, category: "Anime", prompt: "cyberpunk anime style, neon lights, rainy futuristic city, glowing accents" },
  { id: "ghibli", name: "Ghibli", img: ghibliImg, category: "Anime", prompt: "soft Studio Ghibli inspired painterly anime style, warm watercolor tones" },
  { id: "kawaii", name: "Kawaii", img: kawaiiImg, category: "Anime", prompt: "kawaii pastel anime style, sparkles, soft pink tones, cute" },
  { id: "samurai", name: "Samurai", img: samuraiImg, category: "Anime", prompt: "epic samurai anime style, traditional Japanese ink and armor details" },
  { id: "cartoon3d", name: "3D Cartoon", img: cartoon3dImg, category: "Cartoon", prompt: "3D animated movie cartoon style, Pixar-like rendering, big expressive eyes, soft studio lighting" },
  { id: "comic", name: "Comic Pop", img: comicImg, category: "Comic", prompt: "western comic book style, bold ink outlines, halftone dots, pop art colors" },
  { id: "chibi", name: "Chibi", img: chibiImg, category: "Cartoon", prompt: "chibi cartoon style, super deformed big head, tiny body, sparkling eyes, cute" },
  { id: "retrotoon", name: "Retro Toon", img: retroToonImg, category: "Cartoon", prompt: "retro 90s saturday morning cartoon style, flat bold colors, thick outlines" },
  { id: "watercolor", name: "Watercolor", img: watercolorImg, category: "Artistic", prompt: "soft watercolor storybook cartoon illustration, painted paper texture, gentle pastel palette" },
  { id: "pixel", name: "Pixel Art", img: pixelImg, category: "Artistic", prompt: "16-bit pixel art character sprite, retro video game style, limited vibrant palette, crisp pixels" },
  { id: "gothic", name: "Gothic", img: gothicImg, category: "Anime", prompt: "dark gothic vampire anime style, moody purple lighting, dramatic shadows, elegant" },
  { id: "superhero", name: "Superhero", img: superheroImg, category: "Comic", prompt: "superhero comic style, heroic dynamic lighting, bold saturated colors, cape and costume" },
  { id: "clay", name: "Claymation", img: clayImg, category: "Cartoon", prompt: "claymation stop-motion style, plasticine clay texture, handmade look, studio lighting" },
  { id: "fantasy", name: "Fantasy Elf", img: fantasyImg, category: "Anime", prompt: "fantasy elf anime style, pointed ears, glowing magical forest, ethereal light" },
  { id: "shonen", name: "Shonen Hero", img: classicImg, category: "Anime", prompt: "shonen battle anime style, dynamic action lines, powerful aura, spiky hair energy" },
  { id: "shojo", name: "Shojo Dream", img: kawaiiImg, category: "Anime", prompt: "shojo manga style, sparkling starry eyes, flower petals, soft romantic pastel glow" },
  { id: "mecha", name: "Mecha Pilot", img: cyberpunkImg, category: "Anime", prompt: "mecha anime style, futuristic pilot suit, giant robot cockpit background, hard surface detail" },
  { id: "magicalgirl", name: "Magical Girl", img: kawaiiImg, category: "Anime", prompt: "magical girl anime style, transformation sparkles, ribbons, pastel magic aura, wand" },
  { id: "vaporwave", name: "Vaporwave", img: cyberpunkImg, category: "Artistic", prompt: "vaporwave aesthetic anime style, pink and cyan gradients, retro grid, chrome glow" },
  { id: "noir", name: "Noir Ink", img: mangaImg, category: "Comic", prompt: "film noir ink illustration, high contrast black and white, dramatic venetian blind shadows" },
  { id: "steampunk", name: "Steampunk", img: samuraiImg, category: "Artistic", prompt: "steampunk illustration style, brass gears, goggles, victorian attire, sepia tones" },
  { id: "cottagecore", name: "Cottagecore", img: ghibliImg, category: "Artistic", prompt: "cozy cottagecore painterly style, warm sunlight, flowers, rustic countryside palette" },
  { id: "disneyclassic", name: "Classic Toon", img: retroToonImg, category: "Cartoon", prompt: "classic hand-drawn animation style, smooth inked lines, warm painted background, timeless cartoon look" },
  { id: "simpsonstyle", name: "Yellow Toon", img: retroToonImg, category: "Cartoon", prompt: "flat American sitcom cartoon style, simple shapes, bold outlines, bright flat colors, big round eyes" },
  { id: "southparkstyle", name: "Paper Cutout", img: chibiImg, category: "Cartoon", prompt: "paper cutout construction-paper cartoon style, simple geometric shapes, flat colors" },
  { id: "animecrayon", name: "Crayon Toon", img: watercolorImg, category: "Artistic", prompt: "crayon and colored pencil children drawing style, textured strokes, playful colors" },
  { id: "lowpoly", name: "Low Poly", img: pixelImg, category: "Artistic", prompt: "low poly 3D render style, faceted geometric shapes, flat shading, vibrant gradient lighting" },
  { id: "vector", name: "Vector Flat", img: comicImg, category: "Artistic", prompt: "flat vector illustration style, clean geometric shapes, minimal shading, modern brand colors" },
  { id: "graffiti", name: "Graffiti", img: comicImg, category: "Comic", prompt: "street graffiti spray paint art style, bold outlines, urban wall texture, vivid tags" },
  { id: "sticker", name: "Sticker Pop", img: chibiImg, category: "Cartoon", prompt: "die-cut sticker cartoon style, thick white outline, glossy vivid colors, playful" },
  { id: "neontokyo", name: "Neon Tokyo", img: cyberpunkImg, category: "Anime", prompt: "neon Tokyo night anime style, glowing signage reflections, wet streets, cinematic bloom" },
  { id: "ninja", name: "Ninja", img: samuraiImg, category: "Anime", prompt: "stealth ninja anime style, dark shinobi outfit, moonlight, smoke and shuriken" },
  { id: "pirate", name: "Pirate", img: superheroImg, category: "Cartoon", prompt: "adventurous pirate cartoon style, tricorn hat, ocean and ship background, bold shapes" },
  { id: "spacehero", name: "Space Hero", img: superheroImg, category: "Comic", prompt: "sci-fi space hero comic style, futuristic armor, starfield background, chrome highlights" },
  { id: "zombie", name: "Toon Zombie", img: gothicImg, category: "Cartoon", prompt: "funny cartoon zombie style, green skin, exaggerated features, spooky but cute" },
  { id: "halloween", name: "Halloween", img: gothicImg, category: "Artistic", prompt: "halloween illustration style, pumpkins, orange and purple palette, spooky moonlight" },
  { id: "cyborg", name: "Cyborg", img: cyberpunkImg, category: "Anime", prompt: "cyborg anime style, mechanical plating, glowing circuitry, chrome and neon detail" },
  { id: "kdrama", name: "Webtoon", img: classicImg, category: "Anime", prompt: "korean webtoon illustration style, soft digital shading, clean lineart, glossy skin tones" },
  { id: "ukiyoe", name: "Ukiyo-e", img: samuraiImg, category: "Artistic", prompt: "traditional Japanese ukiyo-e woodblock print style, flat inked outlines, wave patterns" },
  { id: "royal", name: "Royal Portrait", img: fantasyImg, category: "Artistic", prompt: "renaissance royal oil painting style with cartoon features, ornate robes, gold frame lighting" },
  { id: "toonpunk", name: "Toon Punk", img: retroToonImg, category: "Cartoon", prompt: "punk cartoon style, wild colorful hair, studded jacket, energetic graffiti backdrop" },
  { id: "sportstar", name: "Sport Star", img: superheroImg, category: "Comic", prompt: "sports anime style, athletic uniform, stadium lights, motion speed lines, sweat and energy" },
  { id: "idol", name: "Pop Idol", img: kawaiiImg, category: "Anime", prompt: "j-pop idol anime style, stage lights, glitter, colorful concert outfit, confetti" },
  { id: "dreamcore", name: "Dreamcore", img: watercolorImg, category: "Artistic", prompt: "dreamy surreal pastel style, floating clouds, soft glow, ethereal hazy atmosphere" },
];
