---
tags: [saa-c03, criptografia, questoes]
conceito: Criptografia em repouso e em trânsito
atualizado: 2026-11-08
---

# Criptografia — Questões

> [!question] Q1. Um banco **RDS já em produção** não está cifrado. A auditoria exige criptografia em repouso.
> **A)** Habilitar a criptografia na instância pela console
> **B)** Modificar o parameter group
> **C)** Criar um snapshot, copiar o snapshot habilitando a criptografia, restaurar a cópia e apontar a aplicação para o novo endpoint
> **D)** Habilitar SSL/TLS nas conexões
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: no RDS a criptografia em repouso **só se habilita na criação**. O caminho oficial é snapshot → **cópia cifrada** → restore.
> > **D errada**: TLS é **em trânsito** — outra coisa.

> [!question] Q2. É preciso cifrar um arquivo de **10 MB** usando o KMS.
> **A)** Chamar `Encrypt` com o arquivo
> **B)** Chamar `GenerateDataKey`, cifrar o arquivo localmente com a data key e guardar a data key cifrada junto do arquivo
> **C)** Usar CloudHSM, pois o KMS não cifra arquivos
> **D)** Dividir o arquivo em blocos de 4 KB e chamar `Encrypt` em cada
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **envelope encryption**. O `Encrypt` do KMS aceita no máximo **4.096 bytes**.
> > **D errada**: tecnicamente funcionaria e é absurdo — 2.560 chamadas de API para um arquivo.

> [!question] Q3. Um snapshot EBS cifrado precisa ser compartilhado com outra conta AWS.
> **A)** Funciona com qualquer chave KMS
> **B)** Só funciona se o snapshot estiver cifrado com uma customer managed key, compartilhada via key policy
> **C)** É preciso descriptografar antes
> **D)** Snapshots cifrados não podem ser compartilhados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: snapshots cifrados com a chave **AWS managed** (`aws/ebs`) **não podem** ser compartilhados. Com CMK, você concede `kms:Decrypt`/`kms:CreateGrant` à outra conta na key policy.

> [!question] Q4. O requisito diz: *"as chaves devem ficar em HSM single-tenant validado em FIPS 140-3 nível 3, sob nosso controle exclusivo"*.
> **A)** KMS com customer managed key
> **B)** AWS CloudHSM
> **C)** Secrets Manager
> **D)** KMS com material de chave importado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: as palavras **single-tenant**, **FIPS nível 3** e **controle exclusivo** apontam para CloudHSM. No KMS o HSM é **multi-tenant**.
> > **D errada**: importar material no KMS dá controle sobre a **origem** da chave, mas o HSM continua sendo da AWS e compartilhado.

> [!question] Q5. Como garantir que **nenhum** acesso a um bucket S3 ocorra sem HTTPS?
> **A)** Habilitar SSE-KMS
> **B)** Bucket policy que nega quando `aws:SecureTransport` é `false`
> **C)** Ativar o Block Public Access
> **D)** Colocar o bucket atrás do CloudFront com HTTPS only
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a condição global que distingue requisição HTTP de HTTPS.
> > **A errada**: SSE-KMS é **em repouso**.
> > **D errada**: ajuda para o tráfego **via CloudFront**, mas o endpoint do bucket continuaria aceitando HTTP.

> [!question] Q6. É preciso **revogar imediatamente** o acesso a dados cifrados, com possibilidade de voltar atrás.
> **A)** Agendar a exclusão da KMS key
> **B)** Desabilitar a KMS key (ou ajustar a key policy)
> **C)** Deletar os objetos
> **D)** Rotacionar a chave
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: desabilitar é **imediato e reversível**.
> > **A errada**: a exclusão tem espera de **7 a 30 dias** e é **irreversível** ao final.
> > **D errada**: a rotação **mantém** o material antigo para decifrar o que já estava cifrado — não revoga nada.

> [!question] Q7. A equipe quer **criptografia de ponta a ponta** atrás de um ALB.
> **A)** Listener HTTPS no ALB basta
> **B)** Listener HTTPS no ALB e target group em HTTPS (ou NLB com passthrough TCP)
> **C)** Habilitar criptografia em repouso nas instâncias
> **D)** Usar Global Accelerator
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só terminar TLS no ALB deixa o trecho ALB→instância em claro.

> [!question] Q8. Um certificado do ACM precisa ser instalado num servidor web **em EC2**.
> **A)** Exportar o certificado público do ACM e instalar
> **B)** Não é possível exportar certificado público do ACM — use o ACM Private CA (exportável) ou importe um certificado de terceiros
> **C)** Associar o certificado à instância pela console
> **D)** Usar o ACM apenas com o IMDS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o ACM **não libera a chave privada** de certificados públicos; eles só se associam a serviços integrados (ALB, NLB, CloudFront, API Gateway). Para instalar num servidor, é **Private CA** ou certificado importado.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| O KMS cifra meus arquivos | Cifra **chaves**; o `Encrypt` aceita **4 KB**. Dados grandes → **envelope encryption** |
| Dá para cifrar um RDS existente | **Não** — snapshot → **cópia cifrada** → restore |
| Qualquer chave serve para compartilhar snapshot | Só **customer managed key** |
| Deletar a chave é o jeito de revogar | É **irreversível** e espera **7–30 dias**; para revogar já → **desabilitar** |
| Rotacionar a chave impede leitura do dado antigo | A rotação **preserva** o material antigo para decifrar |
| Preciso habilitar criptografia no S3 | Desde 2023 objetos novos já usam **SSE-S3** por padrão |
| HTTPS no ALB é end-to-end | Falta **HTTPS no target group** |
| Direct Connect é cifrado | **Não** — use **MACsec** ou VPN sobre o DX |
| Certificado público do ACM pode ser exportado | **Não**; só o do **Private CA** |
| Classe fria/Glacier não precisa de chave | Toda classe do S3 é cifrada; a escolha da chave continua sua |
| Secrets Manager e KMS fazem o mesmo | Secrets Manager **guarda e rotaciona segredos**; KMS gerencia **chaves** |

## Links

- [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/3 - Detalhes|3 - Detalhes]]
