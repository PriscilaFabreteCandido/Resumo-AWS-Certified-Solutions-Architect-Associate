---
tags: [saa-c03, efs, detalhes]
servico: Amazon EFS
atualizado: 2026-11-08
---

# EFS — Detalhes

## 1. Por que EFS e não EBS

Um volume EBS pertence a **uma** instância e a **uma** AZ. Se dez instâncias precisam dos mesmos arquivos, o EBS não resolve: Multi-Attach existe só em io1/io2, é limitado a uma AZ, e entrega **disco bruto** (exigindo file system de cluster).

O EFS é um **file system POSIX** de verdade, montado por NFS, acessível de **várias AZs** ao mesmo tempo, com capacidade elástica. Você não provisiona tamanho.

Casos canônicos de prova: CMS com uploads compartilhados, diretório `home` de usuários, aplicação legada que espera caminho de arquivo, build artifacts compartilhados, dados compartilhados entre tasks do ECS/EKS.

## 2. Escolhendo o modo de throughput

A doc dá um critério numérico, que é o que a prova usa:

| Relação média/pico | Modo |
|---|---|
| *"5% or less"* (carga irregular, picos altos) | **Elastic** |
| *"5% or more"* (carga constante) | **Provisioned** |
| Throughput deve escalar com o **tamanho** | **Bursting** |

O **Elastic** é o recomendado e cobre a maioria dos casos: entrega até **20–60 GiBps** de leitura por file system e cobra pelo que você usa.

O **Bursting** é a armadilha: o baseline é **50 MiBps por TiB armazenado**. Um file system pequeno (dezenas de GiB) com muito I/O esgota os créditos e cai para um baseline muito baixo.

⚠️ E a restrição operacional: depois de mudar para **Provisioned**, você fica **24 h** sem poder voltar nem reduzir.

## 3. Modos de performance

**General Purpose** é o padrão e tem a **menor latência por operação**. É o certo para quase tudo.

**Max I/O** é *"previous generation performance type"*: mais throughput agregado, mas **latência maior por operação**. E tem duas restrições importantes: *"not supported for One Zone file systems or file systems that use Elastic throughput"*.

Consequência: se o enunciado menciona **Elastic** ou **One Zone**, Max I/O está fora.

## 4. Regional × One Zone

**Regional** replica entre AZs — sobrevive à perda de uma AZ. É o padrão para produção.

**One Zone** fica numa AZ, custa menos, e *"always use the General Purpose performance mode"*. Não suporta Elastic nem Max I/O.

A lógica é a mesma do **S3 One Zone-IA**: só para dado **reproduzível** ou não crítico. Se o enunciado diz *highly available*, One Zone está errado.

## 5. Classes de armazenamento e lifecycle

| Classe | Latência | Custo |
|---|---|---|
| **EFS Standard** | ~1 ms leitura / ~2,7 ms escrita | Maior |
| **EFS Infrequent Access (IA)** | *"tens of milliseconds"* (dezenas de milissegundos) | Menor |
| **EFS Archive** | *"tens of milliseconds"* (dezenas de milissegundos) | Menor ainda |

O **lifecycle management** move arquivos automaticamente conforme o tempo sem acesso. É a alavanca de custo principal do EFS — equivalente ao lifecycle do S3.

## 6. Acesso e segurança

| Controle | Detalhe |
|---|---|
| **Mount target** | Uma ENI por AZ, com **security group** |
| **Access point** | Ponto de entrada com UID/GID e diretório raiz forçados — isola aplicações no mesmo FS |
| **File system policy** | Política de recurso (como bucket policy) |
| **IAM** | Autorização de montagem e de operações |
| **Criptografia** | Em repouso (KMS) e em trânsito (TLS, via `amazon-efs-utils`) |
| **On-premises** | Montável via **Direct Connect** ou **VPN** |

O SG do **mount target** precisa liberar **NFS (2049)** vindo do SG dos clientes — é o erro de configuração mais comum.

## 7. Custo

| Alavanca | Detalhe |
|---|---|
| **Lifecycle para IA/Archive** | Maior economia |
| **One Zone** | Para dado não crítico |
| **Elastic** em vez de Provisioned | Se a carga é irregular |
| Medição | Requisição NFS conta como **4 KB** ou o tamanho real, o maior; **sem** cobrança de IOPS |
| Leitura | Medida a **1/3** da taxa de escrita |

## Links

- [[3 - Performance (24%)/EFS/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EFS/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EFS/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EBS/1 - O que e|EBS]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[2 - Resiliencia (26%)/ECS/1 - O que e|ECS]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]]
