---
tags: [saa-c03, s3, questoes]
servico: Amazon S3
atualizado: 2026-11-08
---

# Amazon S3 — Questões

> [!question]- Q1. Logs são lidos muito nos primeiros 30 dias, raramente nos 11 meses seguintes, e precisam ficar 7 anos com acesso em até 12 h. Lifecycle mais econômico?
> **A)** Standard → Standard-IA (30 d) → Glacier Instant Retrieval (1 ano) → expira em 7 anos
> **B)** **Standard → Standard-IA (30 d) → Glacier Flexible Retrieval (1 ano) → Deep Archive → expira em 7 anos** ✅
> **C)** Standard → One Zone-IA (30 d) → Deep Archive (1 ano)
> **D)** Intelligent-Tiering desde o início
>
> **Por que B**: respeita a cascata, usa IA no período de acesso raro e desce para arquivamento. Deep Archive atende "até 12 h" com Standard retrieval e é a classe mais barata.
> **A errada**: Glacier IR é mais caro que FR/Deep para dado raramente lido, e desperdiça o requisito folgado de 12 h.
> **C errada**: One Zone-IA para log de compliance é 1 AZ — risco inaceitável.
> **D errada**: o padrão de acesso é **conhecido**; a taxa de monitoramento por objeto é desperdício.

> [!question]- Q2. Objetos de auditoria não podem ser apagados por 7 anos, por ninguém, incluindo administradores. O que configurar?
> **A)** Versionamento + MFA Delete
> **B)** **Object Lock em modo Compliance, com retenção de 7 anos, em bucket com versionamento** ✅
> **C)** Bucket policy com `Deny` em `s3:DeleteObject`
> **D)** Glacier Deep Archive com lifecycle
>
> **Por que B**: só o modo Compliance impede o root — *"can't be overwritten or deleted by any user, including the root user"* (não pode ser sobrescrito nem apagado por nenhum usuário, inclusive o usuário raiz).
> **A errada**: quem tem o MFA do root apaga.
> **C errada**: um administrador com poder de editar a policy remove o Deny.
> **D errada**: classe de armazenamento é custo, não imutabilidade.

> [!question]- Q3. O acervo existente de um bucket precisa ser replicado para outra região, além das gravações novas. O que fazer?
> **A)** Habilitar CRR — ela cobre os objetos existentes
> **B)** **Habilitar CRR para os novos e rodar S3 Batch Replication para os existentes** ✅
> **C)** Usar o DataSync entre os dois buckets
> **D)** Habilitar S3 Replication Time Control
>
> **Por que B**: a replicação "live" não alcança objetos anteriores à regra; o acervo exige Batch Replication.
> **A errada**: é exatamente a suposição que a prova testa.
> **C errada**: resolveria a cópia, mas é esforço a mais havendo recurso nativo e contínuo.
> **D errada**: RTC adiciona SLA de 15 min aos objetos **novos**, e *"S3 RTC does not apply to Batch Replication"* (o S3 RTC não se aplica à Batch Replication).

> [!question]- Q4. Uma regra de lifecycle move para Glacier Instant Retrieval no dia 5 e para Deep Archive no dia 30. A AWS rejeita. Por quê?
> **A)** Glacier IR não transiciona para Deep Archive
> **B)** **O mínimo de 90 dias do Glacier IR não foi respeitado: a transição precisa ser no dia 95 ou depois** ✅
> **C)** Deep Archive exige versionamento
> **D)** Só é permitida uma transição por regra
>
> **Por que B**: 5 + 90 = **95**. Não se transiciona antes do mínimo da classe atual.
> **A errada**: Glacier IR **pode** ir para Glacier FR e Deep Archive.
> **C errada**: não exige.
> **D errada**: várias transições por regra são normais.

> [!question]- Q5. Um bucket com versionamento cresceu 4x em um ano, apesar do volume de dados novos ser estável. Causa e correção?
> **A)** Falta compressão
> **B)** **Versões antigas acumulando; criar lifecycle com `NoncurrentVersionTransition` e `NoncurrentVersionExpiration`** ✅
> **C)** Replicação duplicando objetos
> **D)** Mudar para One Zone-IA
>
> **Por que B**: cada versão é cobrada como um objeto completo.
> **A errada**: o S3 não comprime objetos.
> **C errada**: replicação iria para outro bucket.
> **D errada**: reduz o preço por GB, não o **volume** — que é o problema.

> [!question]- Q6. A aplicação recebe erros 503 Slow Down ao gravar milhares de objetos por segundo, todos no mesmo caminho. O que fazer?
> **A)** Abrir ticket para aumentar o limite do bucket
> **B)** **Distribuir as chaves em vários prefixos e aplicar retry com backoff exponencial** ✅
> **C)** Habilitar Transfer Acceleration
> **D)** Migrar para o S3 Express One Zone
>
> **Por que B**: o limite é **por prefixo** (3.500 escritas/s), e *"There are no limits to the number of prefixes in a bucket"* (não há limite para a quantidade de prefixos num bucket).
> **A errada**: não existe limite por bucket para aumentar.
> **C errada**: acelera upload de longe; não muda a taxa por prefixo.
> **D errada**: é a resposta para centenas de milhares de req/s com latência de 1 dígito de ms — exagero aqui, e muda a classe/custo.

> [!question]- Q7. Qual opção mantém o bucket privado e servido só pelo CloudFront, com objetos criptografados em SSE-KMS?
> **A)** Origin Access Identity (OAI)
> **B)** **Origin Access Control (OAC) + bucket policy com principal `cloudfront.amazonaws.com` e condição `AWS:SourceArn`, com Object Ownership em "Bucket owner enforced", e key policy do KMS liberando o CloudFront** ✅
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada pelo backend
>
> **Por que B**: a doc lista **SSE-KMS** como capacidade que **só o OAC** tem (OAI é *"legacy, not recommended"* (geração antiga, não recomendado)).
> **A errada**: OAI não suporta SSE-KMS nem regiões novas.
> **C errada**: viola o requisito.
> **D errada**: dá acesso direto ao S3, não "via CloudFront".

> [!question]- Q-lc 1. Objetos em **S3 One Zone-IA** precisam ir para arquivamento com acesso em **milissegundos**. Qual regra de lifecycle usar?
> **A)** One Zone-IA → S3 Glacier Instant Retrieval
> **B)** **Nenhuma: One Zone-IA só transiciona para Glacier Flexible Retrieval ou Deep Archive. Para chegar a Glacier IR seria preciso copiar o objeto** ✅
> **C)** One Zone-IA → Standard-IA → Glacier Instant Retrieval
> **D)** One Zone-IA → Intelligent-Tiering, que arquiva sozinho
>
> **Por que B**: a doc lista, para One Zone-IA, apenas *"the S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive storage classes"* (as classes S3 Glacier Flexible Retrieval ou S3 Glacier Deep Archive). **Glacier Instant Retrieval não está na lista** — é a seta que falta no meio do waterfall.
> **C e D erradas**: o modelo é **cascata**, só desce. Não dá para subir de One Zone-IA para Standard-IA nem para Intelligent-Tiering.

> [!question]- Q-lc 2. Objetos em **S3 Standard** devem ir para **Deep Archive** após 30 dias. Quantas transições a regra precisa?
> **A)** Três: Standard → IA → Glacier FR → Deep Archive
> **B)** **Uma: Standard transiciona direto para Deep Archive** ✅
> **C)** Duas: Standard → Glacier FR → Deep Archive
> **D)** Não é possível pular classes
>
> **Por que B**: o texto oficial lista, para S3 Standard, *"the S3 Standard-IA, S3 Intelligent-Tiering, S3 One Zone-IA, S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, or S3 Glacier Deep Archive"* (o S3 Standard-IA, o S3 Intelligent-Tiering, o S3 One Zone-IA, o S3 Glacier Instant Retrieval, o S3 Glacier Flexible Retrieval ou o S3 Glacier Deep Archive) — **todas**. A cascata permite **pular etapas**; o que ela proíbe é **subir**.
> ⚠️ Passar por classes intermediárias seria **mais caro**: cada transição cobra por objeto, e cada classe tem mínimo de dias.

> [!question]- Q-lc 3. Uma regra manda objetos para **Glacier Instant Retrieval no dia 4** e para **Deep Archive no dia 20**. O que acontece?
> **A)** Funciona normalmente
> **B)** **A regra é inválida: Glacier IR tem mínimo de 90 dias, então a transição para Deep Archive tem de ser no dia 94 ou depois** ✅
> **C)** Funciona, mas cobra o dobro
> **D)** O objeto fica preso em Glacier IR
>
> **Por que B**: é o exemplo literal da doc — *"In this case the S3 Glacier Deep Archive transition must occur after at least 94 days."* (nesse caso, a transição para o S3 Glacier Deep Archive precisa ocorrer depois de pelo menos 94 dias)
> 💡 A doc acrescenta uma saída: *"You can specify two rules to accomplish this, but you pay the minimum duration storage charges."* (você pode usar duas regras para conseguir isso, mas paga as cobranças de duração mínima de armazenamento)

> [!question]- Q-lc 4. Um objeto está no **Deep Archive Access tier** do Intelligent-Tiering. Para onde o lifecycle pode movê-lo?
> **A)** Qualquer classe, como qualquer objeto em Intelligent-Tiering
> **B)** Glacier IR, Glacier FR ou Deep Archive
> **C)** **Só para S3 Glacier Deep Archive** ✅
> **D)** Para nenhuma — Intelligent-Tiering não transiciona
>
> **Por que C**: as transições para fora do Intelligent-Tiering **dependem do access tier**, e o Deep Archive Access é o mais frio — só resta o Deep Archive. É por isso que, no diagrama oficial, as setas do Intelligent-Tiering são **tracejadas**: elas são condicionais.
> **D errada**: Intelligent-Tiering transiciona, sim — e pode ser **origem** e **destino** de lifecycle.

## ⚠️ Armadilhas do S3

| Parece | É |
|---|---|
| One Zone-IA é só "IA mais barato" | É **1 AZ** |
| Standard-IA tem 1 AZ | Tem **≥ 3**. One Zone-IA é que tem 1 |
| Glacier Instant Retrieval precisa de restore | **Não.** `GET` direto em ms |
| Deep Archive tem Expedited | **Não existe** |
| Intelligent-Tiering é sempre mais barato | Cobra monitoramento **por objeto**; objeto < 128 KB nunca sai do Frequent Access |
| Apagar antes do mínimo economiza | **Cobra o período inteiro** |
| Replicação cobre o acervo | Só o que vem **depois**. Acervo = Batch Replication |
| Replicação precisa de versionamento só na origem | **Nos dois** |
| Versionamento pode ser desligado | Só **suspenso** |
| Bucket policy ganha do Block Public Access | **BPA ganha** (combinação mais restritiva) |
| Object Lock funciona sem versionamento | **Exige** versionamento |
| Governance mode é imutável | Quem tem `s3:BypassGovernanceRetention` apaga |
| Mudar o default recriptografa o acervo | Só objetos **novos** |
| SSE-C pode ser default do bucket | **Não.** Só por requisição |
| Transfer Acceleration acelera download | É **upload** |
| Requester Pays transfere o custo de armazenamento | Transfere **requisição e download**; e **proíbe acesso anônimo** |
| Multipart incompleto não custa | **Custa** até ser completado ou abortado |
| Limite de requisição é por bucket | É **por prefixo** |
| A cascata obriga a passar classe por classe | **Pode pular**: Standard vai **direto** para Deep Archive |
| One Zone-IA transiciona para Glacier Instant Retrieval | **Não.** Só **Glacier FR** e **Deep Archive** |
| Intelligent-Tiering transiciona para qualquer classe sempre | Depende do **access tier** atual; no Deep Archive Access só resta **Deep Archive** |
| Dá para voltar de Glacier para Standard com lifecycle | **Não.** Só **restore + copy**, que é operação sua |

## Links

- [[3 - Performance (24%)/S3/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/S3/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/S3/3 - Detalhes|3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
