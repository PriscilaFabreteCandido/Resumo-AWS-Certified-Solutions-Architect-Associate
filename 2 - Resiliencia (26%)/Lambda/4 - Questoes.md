---
tags: [saa-c03, lambda, questoes]
servico: AWS Lambda
atualizado: 2026-11-08
---

# Lambda — Questões

> [!question]- Q1. Uma API precisa responder em menos de 100 ms, mas sofre cold start nos picos.
> **A)** Aumentar a memória da função
> **B)** **Provisioned concurrency** ✅
> **C)** Reserved concurrency
> **D)** Migrar para Fargate
>
> **Por que B**: ambientes pré-inicializados, *"designed to make functions available with double-digit millisecond response times"*.
> **A errada**: acelera a execução, mas não elimina a inicialização.
> **C errada**: reserved **limita** concorrência; não pré-inicializa nada. É a troca mais comum da prova.
> **D errada**: resolve, mas é mudança de arquitetura desnecessária.

> [!question]- Q2. Um processamento leva 25 minutos. Qual serviço?
> **A)** Lambda com timeout aumentado
> **B)** **Fargate, ECS ou AWS Batch (ou Step Functions orquestrando Lambdas menores)** ✅
> **C)** Lambda com provisioned concurrency
> **D)** Lambda com 10 GB de memória
>
> **Por que B**: o timeout máximo do Lambda é **900 s (15 min)** e não é ajustável acima disso.
> **C e D erradas**: não alteram o timeout.

> [!question]- Q3. Uma função CPU-bound com 512 MB leva 10 s. Como reduzir **custo e latência**?
> **A)** Reduzir para 256 MB
> **B)** **Aumentar a memória, medindo o tempo: mais CPU pode reduzir o tempo o suficiente para o custo total cair** ✅
> **C)** Provisioned concurrency
> **D)** Dividir em duas funções
>
> **Por que B**: o custo é `memória × tempo`, e a CPU é proporcional à memória (1.769 MB ≈ 1 vCPU). É a skill *"the amount of Lambda memory"* do guia.
> **A errada**: menos CPU → mais tempo → possivelmente **mais** custo.

> [!question]- Q4. Mensagens da fila SQS estão sendo processadas em duplicidade pela Lambda. O processamento leva 100 s.
> **A)** Mudar para fila FIFO
> **B)** **Aumentar o visibility timeout da fila para mais que o timeout da função** ✅
> **C)** Reduzir o batch size
> **D)** Habilitar provisioned concurrency
>
> **Por que B**: com visibility timeout menor que a duração, a mensagem reaparece no meio do processamento.
> **A errada**: FIFO resolve ordem e duplicata de entrega, mas não o timeout — e limita a 300 TPS.

> [!question]- Q5. Uma função não crítica está consumindo toda a cota de concorrência da conta e estrangulando a API de produção.
> **A)** Provisioned concurrency na função de produção
> **B)** **Reserved concurrency: limitar a função não crítica e reservar cota para a de produção** ✅
> **C)** Aumentar a cota da conta
> **D)** Mover para outra região
>
> **Por que B**: reserved define **teto e piso** de concorrência, sem custo adicional — exatamente para isolar funções.
> **C errada**: ajuda, mas não impede a função não crítica de consumir tudo de novo.

> [!question]- Q6. Uma Lambda em VPC precisa gravar no S3 e não consegue.
> **A)** Adicionar um Elastic IP
> **B)** **Criar um gateway endpoint para o S3 (ou um NAT gateway)** ✅
> **C)** Tirar a função da VPC
> **D)** Aumentar o timeout
>
> **Por que B**: função em VPC perde acesso à internet. Gateway endpoint é **grátis** e mantém o tráfego privado.
> **C errada**: resolveria o S3, mas quebraria o acesso aos recursos privados que motivaram pôr a função na VPC.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Lambda roda até 5 minutos | **15 minutos (900 s)** |
| Memória máxima é 3 GB | **10.240 MB** |
| Reserved concurrency evita cold start | **Provisioned** evita. Reserved limita cota |
| Reserved concurrency custa a mais | *"incurs no additional charges"* |
| Mais memória sempre custa mais | Pode custar **menos**, se o tempo cair |
| Payload de 10 MB cabe síncrono | **6 MB** síncrono, **1 MB** assíncrono |
| Lambda não roda em VPC | Roda — e aí consome ENIs e perde acesso à internet |
| Lambda em VPC alcança o S3 | Precisa de **endpoint** ou **NAT** |
| Pacote de 300 MB cabe no .zip | **250 MB** descompactado. Acima: **imagem de container (10 GB)** |
| Invocação assíncrona não tem retry | **2 retries** + DLQ/destination |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
