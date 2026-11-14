---
tags: [saa-c03, vpc-peering, detalhes]
servico: VPC Peering
atualizado: 2026-11-08
---

# VPC Peering — Detalhes

## 1. Por que ele é tão barato

> *"AWS uses the existing infrastructure of a VPC to create a VPC peering connection; it is neither a gateway nor a VPN connection, and does not rely on a separate piece of physical hardware."*

Não existe appliance no caminho. Consequências:

- **Sem custo de criação** nem de hora
- **Sem gargalo de banda**: *"no... bandwidth bottleneck"*
- **Sem ponto único de falha**: *"There is no single point of failure for communication"*
- Dados na **mesma AZ são grátis**, *"even if it's between different accounts"*

Isso faz do peering a opção **mais econômica** para poucas VPCs — e é exatamente o que a prova testa contra o TGW.

## 2. Não transitivo — o que isso significa na prática

Se A↔B e B↔C estão pareadas, **A não alcança C**. Não há roteamento através de B.

Também não é possível, por um peering:
- Usar o **internet gateway** da VPC pareada
- Usar o **NAT gateway** da VPC pareada
- Usar o **VPN/DX** da VPC pareada (sem configuração adicional nos gateways apropriados)
- Resolver DNS privado da outra VPC sem habilitar a opção de resolução DNS

Isso elimina, de uma vez, a ideia de "centralizar o NAT gateway via peering" — resposta errada que aparece em questões de custo.

## 3. CIDR sobreposto

O peering **não** faz NAT, então faixas sobrepostas tornam o roteamento ambíguo e a conexão não é permitida.

O whitepaper de conectividade recomenda, para toda arquitetura: *"VPC connectivity to remote customer networks is best achieved when using non-overlapping IP ranges for each network being connected... We recommend allocating a single, contiguous, non-overlapping CIDR block to be used by each VPC."*

Quando as faixas **já** se sobrepõem e renumerar é inviável, a saída é **PrivateLink**: ele expõe **um serviço** por uma ENI na VPC consumidora, sem rotear as redes — então o CIDR é irrelevante.

## 4. A matemática que justifica o TGW

| VPCs | Conexões (N(N-1)/2) |
|---|---|
| 3 | 3 |
| 5 | 10 |
| 10 | 45 |
| 12 | **66** |
| 50 | **1.225** |

Cada conexão exige: aceitar a solicitação, criar rota nas route tables de **ambas** as VPCs, e manter SGs. O custo operacional cresce em O(n²), enquanto o do TGW cresce linearmente.

Ponto de virada prático: **até 3-5 VPCs**, peering. **Acima disso**, ou com on-premises no desenho, **Transit Gateway**.

## 5. O que configurar

1. **Solicitar** o peering (conta/VPC de destino)
2. **Aceitar** na outra ponta
3. **Criar rotas** nas route tables das **duas** VPCs (destino = CIDR da outra, target = a peering connection)
4. **Ajustar os security groups** (podendo **referenciar o SG** da VPC pareada)
5. Opcionalmente, habilitar **resolução de DNS** privado entre elas

Esquecer o passo 3 num dos lados é a causa mais comum de "o peering está ativo mas não passa tráfego".

## 6. Cross-account e cross-Region

Cross-account é suportado — e o detalhe de custo importa: dados na **mesma AZ** são grátis *"even if it's between different accounts"*.

Cross-Region também: *"The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)"*, e o tráfego *"is encrypted before leaving AWS facilities"*.

⚠️ Mas referência de **security group** entre VPCs pareadas tem restrições em cenário cross-region.

## 7. Peering × as alternativas, em resumo

| Objetivo | Serviço |
|---|---|
| Conectar **2-3 VPCs** com o menor custo | **VPC peering** |
| Conectar **muitas** VPCs + on-premises, transitivo | **Transit Gateway** |
| **CIDR sobreposto**, ou expor **um serviço** | **PrivateLink** |
| Várias contas usando **a mesma** VPC | **VPC sharing (AWS RAM)** |
| Alcançar **S3/DynamoDB** sem internet | **Gateway endpoint** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Transit Gateway]] · [[VPC]] · [[VPC Endpoints e PrivateLink]] · [[AWS RAM]] · [[NAT Gateway]] · [[Custo de rede e transferencia de dados]]
