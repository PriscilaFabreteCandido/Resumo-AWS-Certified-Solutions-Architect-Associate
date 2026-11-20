---
servico: Amazon EFS
fonte: "[[3 - Performance (24%)/EFS/2 - Decorar|2 - Decorar]]"
---

# EFS — Flashcards

#flashcards/saa-c03/d3-performance/efs

Modo de throughput recomendado do EFS para carga irregular, com picos?::**Elastic** (razão média/pico de **5% ou menos**)

Modo de throughput do EFS para carga constante e previsível?::**Provisioned** (razão média/pico de **5% ou mais**)

No modo Bursting do EFS, o throughput escala com o quê?::Com a **quantidade de armazenamento**

Baseline e burst do modo Bursting do EFS?::Baseline **50 MiBps por TiB**; burst até **100 MiBps por TiB** (mínimo de 100 MiBps)

Por que o Bursting é ruim para um EFS pequeno com muito I/O?::O baseline é **por TiB armazenado**; FS pequeno tem baseline minúsculo

Modo de performance padrão do EFS e o usado pelo One Zone?::**General Purpose** (One Zone usa **sempre** General Purpose)

Restrições do modo Max I/O do EFS?::É de **geração anterior**; não suportado em **One Zone** nem com **Elastic**

Latência de primeiro byte do EFS Standard?::**~1 ms** leitura e **~2,7 ms** escrita

Latência das classes EFS IA e EFS Archive?::**Dezenas de milissegundos**

Ordem das classes de armazenamento do EFS no lifecycle?::**Standard → IA → Archive**

Throughput máximo por cliente no EFS Elastic e o requisito?::**1.500 MiBps**; exige `amazon-efs-utils` v2.0+ ou o **EFS CSI driver**

Throughput de leitura por file system no EFS Regional Elastic?::**20 a 60 GiBps**

Como cada requisição NFS é medida na cobrança do EFS?::Mínimo de **4 KB** ou o tamanho real (o maior); **sem** cobrança separada de IOPS

Depois de mudar para Provisioned, quanto tempo fica preso sem voltar ou reduzir?::**24 horas**
