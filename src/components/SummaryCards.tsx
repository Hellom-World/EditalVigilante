import { formatCurrency } from '@/lib/formatters'
import type { YearBlock } from '@/types/contracts'

interface Props {
  municipio: string
  ano: string
  bloco: YearBlock
}

export function SummaryCards({ municipio, ano, bloco }: Props) {
  const label = ano === 'todos' ? 'Todos os anos' : ano

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 col-span-2 sm:col-span-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Município</p>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">{municipio}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Câmara Municipal</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Período</p>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Selecionado</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Contratos</p>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">
          {bloco.total_contratos.toLocaleString('pt-PT')}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">registos Portal BASE</p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-sm p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Valor total</p>
        <p className="text-xl font-extrabold leading-none">
          {formatCurrency(bloco.total_valor)}
        </p>
        <p className="text-xs text-blue-200 mt-2">adjudicado</p>
      </div>
    </div>
  )
}
