import type { YearBlock, EmpresaAgregada, ContractItem } from '@/types/contracts'

export function buildEmpresas(bloco: YearBlock): EmpresaAgregada[] {
  const map: Record<string, EmpresaAgregada> = {}

  bloco.por_departamento.forEach(cat => {
    cat.itens.forEach((item: ContractItem) => {
      const nome = item.adjudicatario
      if (!map[nome]) {
        map[nome] = { nome, contratos: 0, valor_total: 0, percentagem: 0, itens: [] }
      }
      map[nome].contratos++
      map[nome].valor_total += item.valor
      map[nome].itens.push({ ...item, categoria: cat.categoria })
    })
  })

  return Object.values(map)
    .map(e => ({
      ...e,
      percentagem: Math.round((e.valor_total / bloco.total_valor) * 1000) / 10,
    }))
    .sort((a, b) => b.valor_total - a.valor_total)
}
