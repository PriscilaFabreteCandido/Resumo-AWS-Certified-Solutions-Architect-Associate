---
tags: [saa-c03, cloudformation, questoes]
servico: AWS CloudFormation
atualizado: 2026-11-08
---

# CloudFormation — Questões

> [!question]- Q1. Apagar a stack não pode apagar o banco RDS de produção.
> **A)** Stack policy negando delete
> **B)** **`DeletionPolicy: Retain` (ou `Snapshot`) no recurso do RDS** ✅
> **C)** Termination protection na stack
> **D)** Mover o RDS para outra stack
>
> **Por que B**: a `DeletionPolicy` governa o que acontece com o recurso quando a stack é apagada.
> **A errada**: stack policy protege contra **update**, não contra delete da stack.
> **C errada**: impede apagar a stack por acidente, mas não protege o recurso se o delete for intencional.

> [!question]- Q2. Distribuir a mesma baseline (Config, CloudTrail, roles) para 40 contas e 3 regiões, com contas novas recebendo automaticamente.
> **A)** Executar o template em cada conta
> **B)** **CloudFormation StackSets com alvo em OUs da organização** ✅
> **C)** Service Catalog
> **D)** SCP
>
> **Por que B**: StackSets aplica a mesma stack a N contas e regiões, com *automatic deployment* para contas novas da OU.
> **C errada**: Service Catalog publica produtos para os **times lançarem**; não aplica baseline por cima.
> **D errada**: SCP nega ações; não cria recursos.

> [!question]- Q3. Antes de aplicar uma mudança, o time precisa saber se o banco será recriado.
> **A)** Drift detection
> **B)** **Change set** ✅
> **C)** Stack policy
> **D)** Rollback configuration
>
> **Por que B**: o change set classifica cada mudança e indica **Replacement** — o caso em que o recurso é recriado com novo ID.
> **A errada**: drift detection compara o estado atual com o template; não prevê o efeito de uma mudança futura.

> [!question]- Q4. A senha do banco não pode aparecer no template nem nos parâmetros em texto claro.
> **A)** Parâmetro com `Default` vazio
> **B)** **`{{resolve:secretsmanager:...}}` (ou `NoEcho: true` com o valor fora do repositório)** ✅
> **C)** Mappings
> **D)** Outputs
>
> **Por que B**: o CloudFormation resolve o segredo no deploy, sem armazená-lo no template.
> **D errada**: `Outputs` **expõe** valores — o oposto do que se quer.

> [!question]- Q5. Garantir que a infraestrutura em produção corresponde ao template versionado.
> **A)** Change set
> **B)** **Drift detection (e AWS Config para monitoramento contínuo)** ✅
> **C)** Rollback
> **D)** Nested stacks
>
> **Por que B**: drift detection encontra alterações feitas fora do CloudFormation.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CloudFormation é cobrado | **Grátis**; você paga os recursos |
| Update nunca recria recurso | **Replacement** recria com novo ID (⚠️ perda de dados) |
| Apagar a stack preserva os dados | Apaga tudo, **exceto** o que tem `DeletionPolicy: Retain`/`Snapshot` |
| Stack policy impede delete da stack | Protege contra **update**. Para delete, é `DeletionPolicy` / termination protection |
| AWS CDK cai na prova | **Fora de escopo** na SAA-C03 |
| `Fn::ImportValue` é desacoplado | Cria dependência: a stack exportadora **não pode** ser apagada |
| Drift detection é contínuo | É **sob demanda**. Contínuo é **AWS Config** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
