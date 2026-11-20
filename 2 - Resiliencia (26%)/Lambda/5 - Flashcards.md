---
servico: AWS Lambda
fonte: "[[2 - Resiliencia (26%)/Lambda/2 - Decorar|2 - Decorar]]"
---

# Lambda — Flashcards

#flashcards/saa-c03/d2-resiliencia/lambda

Faixa de memória de uma função Lambda?::**128 MB a 10.240 MB**, em passos de 1 MB

Quanta memória equivale a 1 vCPU no Lambda?::**1.769 MB**

Timeout máximo do Lambda?::**900 s (15 min)**

Faixa de tamanho do /tmp no Lambda?::**512 MB a 10.240 MB**

Limites do pacote .zip e da imagem de container no Lambda?::.zip: **50 MB** comprimido e **250 MB** descomprimido (com layers). Imagem: **10 GB**

Payload máximo de invocação síncrona e assíncrona no Lambda?::Síncrona **6 MB** (request e response); assíncrona **1 MB**

Máximo de layers por função e tamanho total das variáveis de ambiente?::**5 layers**; **4 KB** de variáveis

Concorrência padrão do Lambda por região?::**1.000** (pode subir para dezenas de milhares)

Velocidade de escala de uma função Lambda?::**1.000** ambientes a cada **10 s**, por função

Como eliminar cold start no Lambda?::**Provisioned concurrency** (ambientes pré-inicializados, com custo adicional)

Como garantir ou limitar a cota de concorrência de uma função, sem custo extra?::**Reserved concurrency** (valor **0** desliga a função)

Quantos retries o Lambda faz numa invocação assíncrona?::**2 retries**, depois DLQ ou destination

Quais fontes usam event source mapping (poll) no Lambda?::**SQS**, **Kinesis**, **DynamoDB Streams** e **MSK**

Throttle padrão do API Gateway × concorrência padrão do Lambda?::API Gateway **10.000 req/s**; Lambda **1.000** de concorrência
