---
tags: [saa-c03, glacier, questoes]
servico: S3 Glacier
atualizado: 2026-11-08
---

# S3 Glacier — Questões

> [!question]- Q1. 500 TB de imagens médicas ficam 10 anos; acesso quase nulo e, quando ocorre, pode esperar 24 horas.
> **A)** Glacier Flexible Retrieval com Bulk
> **B)** **Glacier Deep Archive** ✅
> **C)** One Zone-IA
> **D)** Intelligent-Tiering com Deep Archive Access ativado
>
> **Por que B**: é a classe mais barata, e 24 h cabe folgado (Standard **até 12 h**, Bulk **até 48 h**).
> **A errada**: custa mais que Deep Archive, e o requisito não precisa da velocidade.
> **C errada**: 1 AZ — risco inaceitável para dado médico de retenção longa.
> **D errada**: adiciona taxa de monitoramento por objeto sem ganho; o padrão de acesso é **conhecido**.

> [!question]- Q2. Um objeto no Glacier **Deep Archive** precisa ser recuperado em 2 horas.
> **A)** Restore com tier Expedited
> **B)** **Não é possível: Deep Archive não tem Expedited (Standard até 12 h, Bulk até 48 h)** ✅
> **C)** Comprar provisioned capacity
> **D)** Mudar a classe para Glacier IR primeiro
>
> **Por que B**: a tabela oficial marca Expedited como **não disponível** no Deep Archive.
> **C errada**: provisioned capacity só se aplica ao **Glacier Flexible Retrieval**.
> **D errada**: de Deep Archive **não se sai** por lifecycle, e mudar a classe exigiria restaurar primeiro.

> [!question]- Q3. Arquivos de auditoria são lidos raramente, mas quando pedidos precisam estar disponíveis em **milissegundos**.
> **A)** Glacier Flexible Retrieval com Expedited
> **B)** **Glacier Instant Retrieval** ✅
> **C)** Deep Archive
> **D)** Standard-IA
>
> **Por que B**: *"Data in this storage class is available for real-time access"* — `GET` direto, sem restore.
> **A errada**: Expedited leva **1-5 minutos**, não milissegundos.
> **D errada**: funciona, mas custa mais para dado acessado ~1x por trimestre.

> [!question]- Q4. Uma empresa precisa garantir que os restores Expedited **nunca** sejam recusados em pico de demanda.
> **A)** Usar o tier Standard
> **B)** **Comprar provisioned capacity (Glacier Flexible Retrieval)** ✅
> **C)** Mudar para Deep Archive
> **D)** Usar S3 Batch Operations
>
> **Por que B**: *"Provisioned capacity helps ensure that your retrieval capacity for Expedited retrievals... is available when you need it."*

> [!question]- Q5. Arquivar 20 milhões de arquivos de log de ~15 KB cada no Deep Archive. Qual o problema?
> **A)** Deep Archive não aceita objetos pequenos
> **B)** **O overhead de 40 KB por objeto (32 KB Glacier + 8 KB Standard) pode custar mais que o dado; agregue antes de arquivar** ✅
> **C)** O mínimo de 180 dias não se aplica
> **D)** Falta habilitar versionamento
>
> **Por que B**: 20 M × 40 KB = 800 GB de overhead, contra 300 GB de dado. A resposta de arquitetura é **empacotar**.

> [!question]- Q6. Uma regra de lifecycle move para Glacier IR no dia 10 e para Deep Archive no dia 60. É aceita?
> **A)** Sim
> **B)** **Não: o mínimo de 90 dias do Glacier IR exige a transição no dia 100 ou depois** ✅
> **C)** Sim, se o objeto tiver mais de 128 KB
> **D)** Não, porque Glacier IR não transiciona para Deep Archive
>
> **Por que B**: 10 + 90 = **100**.
> **D errada**: Glacier IR **pode** ir para Flexible Retrieval e Deep Archive.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Glacier Instant Retrieval precisa de restore | **Não.** `GET` direto em ms |
| Deep Archive tem Expedited | **Não existe** |
| Bulk é sempre cobrado | **Grátis** no Glacier Flexible Retrieval e no Intelligent-Tiering |
| Provisioned capacity vale para Deep Archive | Só para **Glacier Flexible Retrieval** |
| O dono do bucket compra a provisioned capacity | É do **requisitante** |
| Glacier FR transiciona para qualquer classe | **Só Deep Archive** |
| Apagar antes do mínimo economiza | Cobra **90 / 180 dias** integralmente |
| Objeto pequeno arquiva barato | **40 KB de overhead** por objeto |
| A classe de arquivo garante imutabilidade | Imutabilidade é **Object Lock** (modo Compliance) |

## Links

- [[3 - Performance (24%)/S3 Glacier/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/S3 Glacier/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/S3 Glacier/3 - Detalhes|3 - Detalhes]]
