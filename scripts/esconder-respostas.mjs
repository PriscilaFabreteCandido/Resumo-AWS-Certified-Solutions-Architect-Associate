// Converte as questões das notas "4 - Questoes.md" para o formato em que
// as alternativas ficam visíveis e a resposta fica num callout recolhido.
//
// Uso (na raiz do vault):  node scripts/esconder-respostas.mjs [--dry-run]
//
// - Idempotente: questões já convertidas são ignoradas.
// - Questões fora do padrão não são alteradas e são listadas no final.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry-run");

const OPTION_RE = /^> \*\*([A-Z])\)\*\*\s?(.*)$/;
const HEAD_RE = /^> \[!question\]-?\s*(.*)$/;

function findFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) findFiles(p, out);
    else if (name === "4 - Questoes.md") out.push(p);
  }
  return out;
}

function convertBlock(block) {
  // block[0] é o cabeçalho; o resto são linhas que começam com ">"
  if (block.some((l) => l.startsWith("> > [!success]"))) return { status: "ja" };

  const sep = block.findIndex((l, i) => i > 0 && l.trim() === ">");
  if (sep === -1) return { status: "anomalia", motivo: "sem linha '>' separando alternativas da explicação" };

  // linhas antes da primeira alternativa fazem parte do enunciado (ex.: bloco de código)
  const firstOpt = block.findIndex((l, i) => i > 0 && i < sep && OPTION_RE.test(l));
  if (firstOpt === -1) return { status: "anomalia", motivo: "nenhuma alternativa encontrada" };
  const enunciadoExtra = block.slice(1, firstOpt);
  if (enunciadoExtra.some((l) => l.includes("✅")))
    return { status: "anomalia", motivo: "✅ antes das alternativas" };
  const optionLines = block.slice(firstOpt, sep);
  if (!optionLines.every((l) => OPTION_RE.test(l)))
    return { status: "anomalia", motivo: "bloco de alternativas fora do padrão" };

  const corretas = [];
  const novasOpcoes = optionLines.map((l) => {
    const [, letra, textoBruto] = l.match(OPTION_RE);
    let texto = textoBruto;
    if (texto.includes("✅")) {
      corretas.push(letra);
      texto = texto.replace(/\s*✅\s*/g, " ").trim();
    }
    // tira todo negrito do texto da alternativa: o negrito marcava a certa
    texto = texto.replace(/\*\*/g, "").trim();
    return `> **${letra})** ${texto}`;
  });
  if (corretas.length === 0) return { status: "anomalia", motivo: "nenhuma alternativa marcada com ✅" };

  const titulo = block[0].match(HEAD_RE)[1];
  const explicacao = block.slice(sep + 1).map((l) => (l.trim() === ">" ? "> >" : "> " + l));
  while (explicacao.length && explicacao[explicacao.length - 1] === "> >") explicacao.pop();

  return {
    status: "ok",
    linhas: [
      `> [!question] ${titulo}`,
      ...enunciadoExtra,
      ...novasOpcoes,
      ">",
      "> > [!success]- Resposta",
      `> > **Resposta: ${corretas.join(", ")}**`,
      ...(explicacao.length ? ["> >", ...explicacao] : []),
    ],
  };
}

const resumo = { ok: 0, ja: 0, anomalias: [] };

for (const file of findFiles(ROOT)) {
  const raw = readFileSync(file, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = raw.split(/\r?\n/);
  const out = [];
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    if (!HEAD_RE.test(lines[i])) {
      out.push(lines[i]);
      continue;
    }
    const block = [lines[i]];
    while (i + 1 < lines.length && lines[i + 1].startsWith(">")) block.push(lines[++i]);
    const r = convertBlock(block);
    if (r.status === "ok") {
      out.push(...r.linhas);
      resumo.ok++;
      changed = true;
    } else {
      out.push(...block);
      if (r.status === "ja") resumo.ja++;
      else resumo.anomalias.push(`${relative(ROOT, file)} :: ${block[0].slice(0, 70)} -> ${r.motivo}`);
    }
  }

  if (changed && !DRY) writeFileSync(file, out.join(eol), "utf8");
}

console.log(`convertidas: ${resumo.ok} | já no formato novo: ${resumo.ja} | anomalias: ${resumo.anomalias.length}`);
for (const a of resumo.anomalias) console.log("  ANOMALIA " + a);
if (DRY) console.log("(dry-run: nada foi gravado)");
