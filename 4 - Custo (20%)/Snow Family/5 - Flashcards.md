---
servico: AWS Snow Family
fonte: "[[4 - Custo (20%)/Snow Family/2 - Decorar|2 - Decorar]]"
---

# Snow Family — Flashcards

#flashcards/saa-c03/d4-custo/snow-family

Snowball Edge Storage Optimized 210 TB: storage utilizável e compute?::**210 TB** utilizáveis; **104 vCPUs** e **416 GB** de RAM

Snowball Edge Compute Optimized: storage para instâncias e compute?::**28 TB** NVMe SSD; até **104 vCPUs** e **416 GB** de memória utilizável

Quantos dispositivos Snowball Edge cabem num cluster?::De **3 a 16**

Quais protocolos o Snowball Edge suporta?::**NFSv3, NFSv4, NFSv4.1** e **S3 sobre HTTP/HTTPS**

Velocidade máxima de rede do Snowball Edge?::Até **100 Gbit/s**

Data de fim do suporte da Snow Family nas regiões comerciais?::**31/12/2026** (já fechada para novos clientes)

Quais alternativas a AWS aponta para substituir a Snow Family?::**DataSync** (online), **Data Transfer Terminal** (físico), parceiros; e **Outposts** para computação na borda

Banda insuficiente para mover dezenas/centenas de TB no prazo: qual serviço?::**Snow Family**

Mover dados pela rede, uma vez ou agendado: qual serviço?::**DataSync**

On-premises precisa continuar acessando os dados guardados na AWS: qual serviço?::**Storage Gateway**

Terceiro precisa enviar arquivos por SFTP/FTPS/FTP/AS2: qual serviço?::**Transfer Family**

Upload global de clientes para um bucket: qual serviço?::**S3 Transfer Acceleration**

Fórmula para decidir entre rede e Snow?::**Tempo ≈ Volume ÷ Banda útil**

Quanto tempo leva mover 80 TB numa banda de 100 Mbps?::**Mais de 70 dias**
