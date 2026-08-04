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
import classicToonImg from "@/assets/style-classictoon.jpg";
import yellowToonImg from "@/assets/style-yellowtoon.jpg";
import springfieldImg from "@/assets/style-springfield.jpg";
import paperCutoutImg from "@/assets/style-papercutout.jpg";
import stickerImg from "@/assets/style-sticker.jpg";
import pirateImg from "@/assets/style-pirate.jpg";
import zombieImg from "@/assets/style-zombie.jpg";
import toonPunkImg from "@/assets/style-toonpunk.jpg";
import donutDadImg from "@/assets/style-donutdad.jpg";
import shonenImg from "@/assets/style-shonen.jpg";
import shojoImg from "@/assets/style-shojo.jpg";
import mechaImg from "@/assets/style-mecha.jpg";
import magicalGirlImg from "@/assets/style-magicalgirl.jpg";
import vaporwaveImg from "@/assets/style-vaporwave.jpg";
import noirImg from "@/assets/style-noir.jpg";
import steampunkImg from "@/assets/style-steampunk.jpg";
import cottagecoreImg from "@/assets/style-cottagecore.jpg";
import crayonImg from "@/assets/style-crayon.jpg";
import lowPolyImg from "@/assets/style-lowpoly.jpg";
import vectorImg from "@/assets/style-vector.jpg";
import graffitiImg from "@/assets/style-graffiti.jpg";
import neonTokyoImg from "@/assets/style-neontokyo.jpg";
import ninjaImg from "@/assets/style-ninja.jpg";
import spaceHeroImg from "@/assets/style-spacehero.jpg";
import halloweenImg from "@/assets/style-halloween.jpg";
import cyborgImg from "@/assets/style-cyborg.jpg";
import webtoonImg from "@/assets/style-webtoon.jpg";
import ukiyoeImg from "@/assets/style-ukiyoe.jpg";
import royalImg from "@/assets/style-royal.jpg";
import sportStarImg from "@/assets/style-sportstar.jpg";
import idolImg from "@/assets/style-idol.jpg";
import dreamcoreImg from "@/assets/style-dreamcore.jpg";
import skaterBoyImg from "@/assets/style-skaterboy.jpg";
import blueHairMomImg from "@/assets/style-bluehairmom.jpg";
import couchGagImg from "@/assets/style-couchgag.jpg";
import pacifierBabyImg from "@/assets/style-pacifierbaby.jpg";
import saxGirlImg from "@/assets/style-saxgirl.jpg";
import tvClownImg from "@/assets/style-tvclown.jpg";
import goodNeighborImg from "@/assets/style-goodneighbor.jpg";
import grandpaToonImg from "@/assets/style-grandpatoon.jpg";
import tavernKeeperImg from "@/assets/style-tavernkeeper.jpg";
import nuclearBossImg from "@/assets/style-nuclearboss.jpg";
import schoolBullyImg from "@/assets/style-schoolbully.jpg";
import toonChiefImg from "@/assets/style-toonchief.jpg";

export type AnimeStyle = {
  id: string;
  name: string;
  img: string;
  prompt: string;
  category: "Anime" | "Cartoon" | "Comic" | "Artistic" | "Simpsons";
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
  { id: "shonen", name: "Shonen Hero", img: shonenImg, category: "Anime", prompt: "shonen battle anime style, dynamic action lines, powerful aura, spiky hair energy" },
  { id: "shojo", name: "Shojo Dream", img: shojoImg, category: "Anime", prompt: "shojo manga style, sparkling starry eyes, flower petals, soft romantic pastel glow" },
  { id: "mecha", name: "Mecha Pilot", img: mechaImg, category: "Anime", prompt: "mecha anime style, futuristic pilot suit, giant robot cockpit background, hard surface detail" },
  { id: "magicalgirl", name: "Magical Girl", img: magicalGirlImg, category: "Anime", prompt: "magical girl anime style, transformation sparkles, ribbons, pastel magic aura, wand" },
  { id: "vaporwave", name: "Vaporwave", img: vaporwaveImg, category: "Artistic", prompt: "vaporwave aesthetic anime style, pink and cyan gradients, retro grid, chrome glow" },
  { id: "noir", name: "Noir Ink", img: noirImg, category: "Comic", prompt: "film noir ink illustration, high contrast black and white, dramatic venetian blind shadows" },
  { id: "steampunk", name: "Steampunk", img: steampunkImg, category: "Artistic", prompt: "steampunk illustration style, brass gears, goggles, victorian attire, sepia tones" },
  { id: "cottagecore", name: "Cottagecore", img: cottagecoreImg, category: "Artistic", prompt: "cozy cottagecore painterly style, warm sunlight, flowers, rustic countryside palette" },
  { id: "disneyclassic", name: "Classic Toon", img: classicToonImg, category: "Cartoon", prompt: "classic hand-drawn animation style, smooth inked lines, warm painted background, timeless cartoon look" },
  { id: "simpsonstyle", name: "Yellow Toon", img: yellowToonImg, category: "Simpsons", prompt: "flat American sitcom cartoon style like The Simpsons, bright yellow skin, huge round white eyes with small pupils, overbite, simple bold black outlines, flat colors, suburban background" },
  { id: "springfield", name: "Springfield", img: springfieldImg, category: "Simpsons", prompt: "Simpsons-inspired Springfield cartoon style, yellow skin, spiky hair, big round eyes, living room couch scene, flat bright colors, bold outlines" },
  { id: "donutdad", name: "Donut Dad", img: donutDadImg, category: "Simpsons", prompt: "yellow-skinned sitcom dad cartoon style, white shirt and blue trousers, five o'clock shadow, donut, nuclear plant background, flat colors" },
  { id: "skaterboy", name: "Skater Kid", img: skaterBoyImg, category: "Simpsons", prompt: "Simpsons-inspired mischievous kid cartoon style, yellow skin, spiky hair, orange t-shirt, skateboard, bold black outlines, flat bright colors, suburban street" },
  { id: "bluehairmom", name: "Blue Hair Mom", img: blueHairMomImg, category: "Simpsons", prompt: "Simpsons-inspired mom cartoon style, yellow skin, tall blue beehive hair, green dress, huge round eyes, flat colors, kitchen background" },
  { id: "couchgag", name: "Couch Gag", img: couchGagImg, category: "Simpsons", prompt: "Simpsons-style couch gag scene, yellow-skinned family cartoon character sitting on an orange couch in front of a TV, flat bright colors, bold black outlines" },
  { id: "pacifierbaby", name: "Pacifier Baby", img: pacifierBabyImg, category: "Simpsons", prompt: "Simpsons-inspired baby cartoon style, bright yellow skin, curl of spiky hair, big pacifier in mouth, huge round white eyes, blue onesie, bold black outlines, flat colors" },
  { id: "saxgirl", name: "Sax Girl", img: saxGirlImg, category: "Simpsons", prompt: "Simpsons-inspired smart girl cartoon style, yellow skin, spiky star-shaped hair, red dress, playing a saxophone, huge round white eyes, bold black outlines, flat colors" },
  { id: "tvclown", name: "TV Clown", img: tvClownImg, category: "Simpsons", prompt: "Simpsons-inspired TV clown cartoon style, yellow skin, huge green-red clown hair, white face paint, red nose, ruffled collar, television studio, flat bright colors, bold outlines" },
  { id: "goodneighbor", name: "Good Neighbor", img: goodNeighborImg, category: "Simpsons", prompt: "Simpsons-inspired friendly neighbor cartoon style, yellow skin, thick moustache, round glasses, green sweater, cheerful smile, suburban porch, flat colors, bold black outlines" },
  { id: "grandpatoon", name: "Grandpa Toon", img: grandpaToonImg, category: "Simpsons", prompt: "Simpsons-inspired old grandpa cartoon style, yellow skin, bald head with white hair tufts, glasses, brown cardigan, droopy eyelids, flat colors, bold black outlines" },
  { id: "tavernkeeper", name: "Tavern Keeper", img: tavernKeeperImg, category: "Simpsons", prompt: "Simpsons-inspired grumpy bartender cartoon style, yellow skin, thinning hair, white apron, dim tavern with beer taps, flat colors, bold black outlines" },
  { id: "nuclearboss", name: "Nuclear Boss", img: nuclearBossImg, category: "Simpsons", prompt: "Simpsons-inspired elderly tycoon cartoon style, pale yellow skin, bald head, tiny round glasses, green suit, thin bony hands, nuclear power plant office, flat colors, bold outlines" },
  { id: "schoolbully", name: "School Bully", img: schoolBullyImg, category: "Simpsons", prompt: "Simpsons-inspired school bully cartoon style, yellow skin, spiky brown hair, striped shirt, smirking, schoolyard background, flat bright colors, bold black outlines" },
  { id: "toonchief", name: "Toon Chief", img: toonChiefImg, category: "Simpsons", prompt: "Simpsons-inspired police chief cartoon style, yellow skin, blue uniform and cap, big moustache, round belly, police station background, flat colors, bold black outlines" },
  { id: "southparkstyle", name: "Paper Cutout", img: paperCutoutImg, category: "Cartoon", prompt: "paper cutout construction-paper cartoon style, simple geometric shapes, flat colors" },
  { id: "animecrayon", name: "Crayon Toon", img: crayonImg, category: "Artistic", prompt: "crayon and colored pencil children drawing style, textured strokes, playful colors" },
  { id: "lowpoly", name: "Low Poly", img: lowPolyImg, category: "Artistic", prompt: "low poly 3D render style, faceted geometric shapes, flat shading, vibrant gradient lighting" },
  { id: "vector", name: "Vector Flat", img: vectorImg, category: "Artistic", prompt: "flat vector illustration style, clean geometric shapes, minimal shading, modern brand colors" },
  { id: "graffiti", name: "Graffiti", img: graffitiImg, category: "Comic", prompt: "street graffiti spray paint art style, bold outlines, urban wall texture, vivid tags" },
  { id: "sticker", name: "Sticker Pop", img: stickerImg, category: "Cartoon", prompt: "die-cut sticker cartoon style, thick white outline, glossy vivid colors, playful" },
  { id: "neontokyo", name: "Neon Tokyo", img: neonTokyoImg, category: "Anime", prompt: "neon Tokyo night anime style, glowing signage reflections, wet streets, cinematic bloom" },
  { id: "ninja", name: "Ninja", img: ninjaImg, category: "Anime", prompt: "stealth ninja anime style, dark shinobi outfit, moonlight, smoke and shuriken" },
  { id: "pirate", name: "Pirate", img: pirateImg, category: "Cartoon", prompt: "adventurous pirate cartoon style, tricorn hat, ocean and ship background, bold shapes" },
  { id: "spacehero", name: "Space Hero", img: spaceHeroImg, category: "Comic", prompt: "sci-fi space hero comic style, futuristic armor, starfield background, chrome highlights" },
  { id: "zombie", name: "Toon Zombie", img: zombieImg, category: "Cartoon", prompt: "funny cartoon zombie style, green skin, exaggerated features, spooky but cute" },
  { id: "halloween", name: "Halloween", img: halloweenImg, category: "Artistic", prompt: "halloween illustration style, pumpkins, orange and purple palette, spooky moonlight" },
  { id: "cyborg", name: "Cyborg", img: cyborgImg, category: "Anime", prompt: "cyborg anime style, mechanical plating, glowing circuitry, chrome and neon detail" },
  { id: "kdrama", name: "Webtoon", img: webtoonImg, category: "Anime", prompt: "korean webtoon illustration style, soft digital shading, clean lineart, glossy skin tones" },
  { id: "ukiyoe", name: "Ukiyo-e", img: ukiyoeImg, category: "Artistic", prompt: "traditional Japanese ukiyo-e woodblock print style, flat inked outlines, wave patterns" },
  { id: "royal", name: "Royal Portrait", img: royalImg, category: "Artistic", prompt: "renaissance royal oil painting style with cartoon features, ornate robes, gold frame lighting" },
  { id: "toonpunk", name: "Toon Punk", img: toonPunkImg, category: "Cartoon", prompt: "punk cartoon style, wild colorful hair, studded jacket, energetic graffiti backdrop" },
  { id: "sportstar", name: "Sport Star", img: sportStarImg, category: "Comic", prompt: "sports anime style, athletic uniform, stadium lights, motion speed lines, sweat and energy" },
  { id: "idol", name: "Pop Idol", img: idolImg, category: "Anime", prompt: "j-pop idol anime style, stage lights, glitter, colorful concert outfit, confetti" },
  { id: "dreamcore", name: "Dreamcore", img: dreamcoreImg, category: "Artistic", prompt: "dreamy surreal pastel style, floating clouds, soft glow, ethereal hazy atmosphere" },
];
