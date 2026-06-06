export interface ContractItem {
  id_base: string
  objeto: string
  adjudicatario: string
  valor: number
  data: string | null
  cpv: string
  tipo_contrato: string
  tipo_procedimento: string
  local: string
}

export interface Category {
  categoria: string
  contratos: number
  valor_total: number
  percentagem: number
  itens: ContractItem[]
}

export interface YearBlock {
  total_contratos: number
  total_valor: number
  por_departamento: Category[]
  por_fornecedor: Category[]
}

export interface MunicipioData {
  municipio: string
  fonte: string
  anos: number[]
  por_ano: Record<string, YearBlock>
}

export interface EmpresaAgregada {
  nome: string
  contratos: number
  valor_total: number
  percentagem: number
  itens: (ContractItem & { categoria: string })[]
}
