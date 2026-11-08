---
tags: [saa-c03, rds-proxy, detalhes]
servico: Amazon RDS Proxy
atualizado: 2026-11-08
---

# RDS Proxy — Detalhes

## 1. Por que o pool de conexões importa

Um banco relacional aloca memória por conexão. Com 500 conexões ociosas, uma parte significativa da RAM do servidor está reservada sem fazer nada — e a latência de **abrir** conexão (handshake TCP + TLS + autenticação) se soma a cada invocação.

Aplicações **serverless** pioram isso: cada ambiente de execução Lambda abre a sua conexão, e o Lambda escala *1.000 ambientes a cada 10 segundos por função*. O banco vira o gargalo.

O proxy mantém um **pool quente** de conexões reais ao banco e multiplexa as conexões da aplicação sobre ele. Para a aplicação, nada muda além do endpoint.

E quando o limite é atingido, o proxy **protege o banco**: *"If connection requests exceed the limits you specify, RDS Proxy rejects application connections (that is, it sheds load)."* Melhor rejeitar na borda que derrubar o banco.

## 2. Failover mais rápido

Sem proxy, no failover a aplicação precisa:
1. Detectar que a conexão morreu
2. Resolver o DNS de novo — e aqui está o problema: o **cache de DNS** do cliente (ou da JVM) pode manter o IP antigo por minutos
3. Reconectar

Com proxy: ele *"bypasses Domain Name System (DNS) caches to reduce failover times by up to 66% for Aurora Multi-AZ databases"*, e *"automatically connecting to a standby DB instance while preserving application connections"* — a conexão da aplicação com o **proxy** permanece aberta.

Também ajuda em manutenção: reduz o downtime de upgrade de minor version de Multi-AZ DB cluster a *"one second or less"*.

## 3. Segurança — eliminando a senha da aplicação

A combinação completa:

```
Lambda / ECS                RDS Proxy                 RDS / Aurora
     │                          │                           │
     │── conecta com IAM ──────>│                           │
     │   (sem senha)            │── busca credencial ──> Secrets Manager
     │                          │── conecta ───────────────>│
```

Ganhos:
- A aplicação **não** tem senha
- A credencial fica no **Secrets Manager**, com rotação automática
- O proxy aceita até **200 secrets**, ou seja, até 200 contas de usuário diferentes
- Auditoria via IAM/CloudTrail

⚠️ Para **SQL Server**, há limites: *"RDS Proxy doesn't support connections that use Active Directory"* e *"does not support end-to-end IAM authentication for RDS for SQL Server"*.

## 4. Pinning — quando o proxy deixa de multiplexar

Em algumas situações o proxy **fixa** (pin) a conexão da aplicação a uma conexão de banco específica, perdendo o benefício do pool. Causas típicas: uso de temporary tables, prepared statements em alguns modos, variáveis de sessão, transações longas — e, documentado, statement **maior que 16 KB**.

Em prova isso aparece como "o proxy não está reduzindo as conexões": a causa é pinning.

## 5. Limites de arquitetura

| Limite | Implicação |
|---|---|
| **20 proxies por conta** | Planeje por banco crítico, não por microsserviço |
| **Só o writer** | Para escalar leitura, a aplicação aponta direto para o **reader endpoint** |
| **Não é público** | A aplicação precisa estar na VPC (Lambda em VPC, ECS, EC2) |
| Endpoint padrão em **2 AZs** | Para mais, crie endpoints adicionais (até 20) |

## 6. RDS Proxy × as alternativas

| Abordagem | Problema |
|---|---|
| Aumentar `max_connections` | Consome RAM do banco; só adia |
| Pool na aplicação | Não funciona em serverless (cada ambiente tem o seu) |
| **Reserved concurrency** na Lambda | Estrangula a aplicação em vez de resolver |
| **Aurora Serverless v2** | Escala o banco, mas não resolve a explosão de conexões |
| **DynamoDB** | Resolve de raiz (HTTP, sem conexão persistente) — mas é mudança de arquitetura |
| **RDS Proxy** | Resolve sem mudar a aplicação |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[RDS]] · [[Aurora]] · [[Lambda]] · [[Secrets Manager]] · [[DynamoDB]]
