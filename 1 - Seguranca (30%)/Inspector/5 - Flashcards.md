---
servico: Amazon Inspector
fonte: "[[1 - Seguranca (30%)/Inspector/2 - Decorar|2 - Decorar]]"
---

# Inspector — Flashcards

#flashcards/saa-c03/d1-seguranca/inspector

O que o Inspector faz?::**Gestão de vulnerabilidades**: varre workloads em busca de **CVE** e **exposição de rede** não intencional

Quais recursos o Inspector varre?::Instâncias **EC2**, imagens no **ECR** e funções **Lambda**

O que o Inspector procura em instâncias EC2?::CVE em pacotes do SO e da aplicação, e **exposição de rede** não intencional

O que o Inspector procura em funções Lambda?::CVE nas **dependências** do código e das **layers**

A varredura do Inspector é agendada por você?::Não: **descoberta automática** e varredura **contínua**

Inspector corrige a vulnerabilidade?::**Não**, só detecta; quem aplica o patch é o **Systems Manager Patch Manager**

Malware em volume EBS: Inspector ou outro serviço?::**GuardDuty** (Malware Protection)

Configuração fora de padrão: qual serviço?::**AWS Config**

Dado sensível em S3: qual serviço?::**Macie**

Porta aberta alcançável da internet ("exposição de rede não intencional"): qual serviço?::**Inspector**

Palavras "CVE", "CVSS", "pacote desatualizado" apontam para qual serviço?::**Inspector**
