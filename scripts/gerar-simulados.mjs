// Gera a pasta "06 - Simulados" com questões misturadas de vários serviços.
//
// Uso (na raiz do vault):  node scripts/gerar-simulados.mjs
//
// Pré-requisito: as questões já estão no formato de scripts/esconder-respostas.mjs.
// As notas geradas são sobrescritas a cada execução: edite as questões nas notas
// "4 - Questoes.md" de origem e rode o script de novo.

import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, rmSync } from "node:fs";
import { join, relative, dirname, basename, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "06 - Simulados");
const SEED = 20261120;
const GERAIS = 5;

const DOMINIOS = [
  { pasta: "1 - Seguranca (30%)", nome: "Dominio 1 (Seguranca)", cota: 18 },
  { pasta: "2 - Resiliencia (26%)", nome: "Dominio 2 (Resiliencia)", cota: 16 },
  { pasta: "3 - Performance (24%)", nome: "Dominio 3 (Performance)", cota: 15 },
  { pasta: "4 - Custo (20%)", nome: "Dominio 4 (Custo)", cota: 12 },
  { pasta: "9 - Fundamentos e apoio", nome: "Fundamentos", cota: 4 },
]; // 18+16+15+12+4 = 65 questões por simulado geral

// PRNG determinístico (mulberry32)
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function findFiles(dir, out = []) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) findFiles(p, out);
    else if (name === "4 - Questoes.md") out.push(p);
  }
  return out;
}

function lerQuestoes(dominio) {
  const qs = [];
  for (const file of findFiles(join(ROOT, dominio.pasta))) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    const servico = basename(dirname(file));
    const link = relative(ROOT, file).split(sep).join("/").replace(/\.md$/, "");
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith("> [!question]")) continue;
      const block = [lines[i]];
      while (i + 1 < lines.length && lines[i + 1].startsWith(">")) block.push(lines[++i]);
      if (!block.some((l) => l.startsWith("> > [!success]")))
        throw new Error(`Questão não convertida em ${link}: rode esconder-respostas.mjs antes`);
      const enunciado = block[0].replace(/^> \[!question\]-?\s*(Q\d+\.\s*)?/, "");
      qs.push({ enunciado, corpo: block.slice(1), servico, link });
    }
  }
  return qs;
}

function renderQuestao(q, n) {
  return [
    `> [!question] ${n}. ${q.enunciado}`,
    ...q.corpo,
    "> >",
    `> > Fonte: [[${q.link}|${q.servico}]]`,
    "",
  ].join("\n");
}

function nota(titulo, descricao, questoes) {
  const corpo = questoes.map((q, i) => renderQuestao(q, i + 1)).join("\n");
  return `---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# ${titulo}

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota \`4 - Questoes\` de origem (o link está na resposta) e rode \`node scripts/gerar-simulados.mjs\`.

${descricao}

**${questoes.length} questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

${corpo}`;
}

const rand = rng(SEED);
const pools = DOMINIOS.map((d) => ({ ...d, questoes: lerQuestoes(d) }));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Simulados por domínio: todas as questões do domínio, embaralhadas
for (const p of pools) {
  writeFileSync(
    join(OUT, `Simulado - ${p.nome}.md`),
    nota(
      `Simulado — ${p.nome}`,
      "Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.",
      shuffle(p.questoes, rand)
    ),
    "utf8"
  );
}

// Simulados gerais: 65 questões na proporção da prova, sem repetir até esgotar o domínio
const filas = pools.map((p) => ({ ...p, fila: shuffle(p.questoes, rand) }));
const repetidas = new Set();
for (let s = 1; s <= GERAIS; s++) {
  let escolhidas = [];
  for (const f of filas) {
    for (let k = 0; k < f.cota; k++) {
      if (f.fila.length === 0) {
        // recomeça o domínio, sem repetir questão dentro do mesmo simulado
        f.fila = shuffle(f.questoes.filter((q) => !escolhidas.includes(q)), rand);
        repetidas.add(f.nome);
      }
      escolhidas.push(f.fila.shift());
    }
  }
  escolhidas = shuffle(escolhidas, rand);
  const nn = String(s).padStart(2, "0");
  writeFileSync(
    join(OUT, `Simulado geral ${nn}.md`),
    nota(
      `Simulado geral ${nn}`,
      "65 questões no formato da prova, na proporção dos domínios (30% / 26% / 24% / 20%, com algumas de fundamentos). Faça de uma vez, cronometrado, e só confira as respostas no final.\n\n> [!note] O domínio 4 (Custo) tem poucas questões próprias, então elas se repetem entre os simulados gerais.",
      escolhidas
    ),
    "utf8"
  );
}

for (const p of pools) console.log(`${p.nome}: ${p.questoes.length} questões`);
console.log(`total: ${pools.reduce((s, p) => s + p.questoes.length, 0)} | simulados gerais: ${GERAIS} x 65`);
if (repetidas.size) console.log(`domínios que repetem entre simulados gerais: ${[...repetidas].join(", ")}`);
