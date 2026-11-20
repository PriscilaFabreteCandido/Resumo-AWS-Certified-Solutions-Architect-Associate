---
servico: AWS CloudFormation
fonte: "[[2 - Resiliencia (26%)/CloudFormation/2 - Decorar|2 - Decorar]]"
---

# CloudFormation — Flashcards

#flashcards/saa-c03/d2-resiliencia/cloudformation

Quanto custa o CloudFormation?::O serviço é **grátis**; paga só os recursos criados

Como ver o diff de uma stack antes de aplicar e saber se algo será substituído?::**Change set**

Como implantar a mesma stack em N contas e regiões?::**StackSets** (usa Organizations)

Como descobrir mudanças feitas fora do CloudFormation?::**Drift detection**

Como proteger o banco de dados quando a stack for apagada?::**DeletionPolicy** com `Retain` ou `Snapshot`

Valores possíveis de DeletionPolicy?::**Retain**, **Snapshot** e **Delete**

Como proteger recursos de uma stack contra update acidental?::**Stack policy**

Como passar valores de uma stack para outra?::**Outputs** na stack de origem + a função **ImportValue** na de destino

Como usar segredos no template sem escrevê-los nele?::Referências dinâmicas **resolve:ssm** e **resolve:secretsmanager**

Qual tipo de update recria o recurso com novo ID e pode perder dados?::**Replacement**

O que acontece quando a criação ou atualização de uma stack falha?::**Rollback** para o estado anterior

Como reutilizar componentes de template entre stacks?::**Nested stacks**

Serviço para publicar templates aprovados como produtos, com launch role?::**Service Catalog**

O AWS CDK cai na SAA-C03?::**Não**, está **fora de escopo** (embora gere CloudFormation)
