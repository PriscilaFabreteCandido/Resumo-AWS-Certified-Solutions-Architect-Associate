---
servico: AWS Direct Connect
fonte: "[[3 - Performance (24%)/Direct Connect/2 - Decorar|2 - Decorar]]"
---

# Direct Connect — Flashcards

#flashcards/saa-c03/d3-performance/direct-connect

Velocidades da dedicated connection do Direct Connect?::**1, 10, 100 e 400 Gbps**

Faixa de velocidades da hosted connection do Direct Connect?::De **50 Mbps a 25 Gbps**, provisionada por um **parceiro**

Quem provisiona dedicated × hosted connection?::Dedicated: **você** (console/CLI/API); hosted: **Direct Connect Partner**

Prazo para a AWS provisionar a porta de uma dedicated connection?::Até **72 horas úteis**

Dá para mudar a velocidade de uma dedicated connection existente?::**Não**: é preciso criar **nova conexão**

Private VIF alcança o quê?::Uma **VPC** por IPs privados (várias VPCs via **Direct Connect gateway**)

Public VIF alcança o quê?::**Todos os serviços públicos** da AWS por IPs públicos

Transit VIF alcança o quê?::Um ou mais **Transit Gateways** associados a Direct Connect gateways

Direct Connect gateway liga um private VIF a quê, e custa a mais?::A vários VGWs em **qualquer conta e Região**; **sem cobrança adicional**

Requisitos de camada física e roteamento do Direct Connect?::Fibra **monomodo**, VLAN **802.1Q**, **BGP** com **MD5**

Valores de MTU suportados no Direct Connect?::**1522 ou 9023 bytes**

Requisito para conexões num LAG do Direct Connect?::Mesmo **dispositivo AWS** e mesma **largura de banda**

Dois elementos de cobrança do Direct Connect?::**Horas de porta** e **transferência de dados de saída**

HA mais robusta em Direct Connect?::**Duas conexões** em **locais diferentes**

Opção de HA mais econômica para Direct Connect?::**DX + Site-to-Site VPN** de backup
