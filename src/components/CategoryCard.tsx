'use client'

import { useState } from 'react'
import { formatCurrency, formatDate, decodeHtml } from '@/lib/formatters'
import type { Category } from '@/types/contracts'

const ICONS: Record<string, string> = {
  'Obras e Infraestruturas': '🏗️',
  'Ambiente e Floresta': '🌲',
  'Cultura, Desporto e Turismo': '🎭',
  'Educação': '📚',
  'Ação Social': '🤝',
  'Digital e Tecnologia': '💻',
  'Segurança': '🛡️',
  'Energia e Combustíveis': '⚡',
  'Administração e Suporte': '📋',
  'Construção Civil e Obras': '🏗️',
  'Serviços Ambientais e Florestais': '🌲',
  'Eventos, Cultura e Comunicação': '🎭',
  'Tecnologia e Software': '💻',
  'Segurança Privada': '🛡️',
  'Combustíveis e Materiais Betuminosos': '⛽',
  'Fornecimento de Materiais e Equipamentos': '📦',
  'Serviços Profissionais': '⚖️',
  'Serviços Sociais e Educação': '🤝',
  'Manutenção, Limpeza e Reparação': '🔧',
  'Arquivo e Documentação': '🗂️',
  'Outros': '📄',
}

const PALETTES = [
  { light: 'bg-blue-50',   text: 'text-blue-600',   bar: 'bg-blue-500',   border: 'border-l-blue-500' },
  { light: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500', border: 'border-l-emerald-500' },
  { light: 'bg-violet-50', text: 'text-violet-600',  bar: 'bg-violet-500', border: 'border-l-violet-500' },
  { light: 'bg-orange-50', text: 'text-orange-600',  bar: 'bg-orange-500', border: 'border-l-orange-500' },
  { light: 'bg-rose-50',   text: 'text-rose-600',    bar: 'bg-rose-500',   border: 'border-l-rose-500' },
  { light: 'bg-teal-50',   text: 'text-teal-600',    bar: 'bg-teal-500',   border: 'border-l-teal-500' },
  { light: 'bg-amber-50',  text: 'text-amber-600',   bar: 'bg-amber-500',  border: 'border-l-amber-500' },
  { light: 'bg-slate-50',  text: 'text-slate-600',   bar: 'bg-slate-500',  border: 'border-l-slate-500' },
  { light: 'bg-pink-50',   text: 'text-pink-600',    bar: 'bg-pink-500',   border: 'border-l-pink-500' },
  { light: 'bg-sky-50',    text: 'text-sky-600',     bar: 'bg-sky-500',    border: 'border-l-sky-500' },
  { light: 'bg-lime-50',   text: 'text-lime-600',    bar: 'bg-lime-500',   border: 'border-l-lime-500' },
]

interface Props {
  cat: Category
  index: number
  searchTerm: string
}

export function CategoryCard({ cat, index, searchTerm }: Props) {
  const [open, setOpen] = useState(false)
  const p = PALETTES[index % PALETTES.length]
  const icon = ICONS[cat.categoria] ?? '📄'

  const filteredItems = searchTerm
    ? cat.itens.filter(item =>
        `${item.objeto} ${item.adjudicatario}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cat.itens

  if (searchTerm && filteredItems.length === 0) return null

  const isOpen = open || (searchTerm.length > 0 && filteredItems.length > 0)

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden border-l-4 ${p.border}`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors text-left gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${p.light}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{cat.categoria}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{cat.contratos} contrato{cat.contratos !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1.5">
            <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${p.bar}`} style={{ width: `${cat.percentagem}%` }} />
            </div>
            <p className={`text-xs font-semibold ${p.text}`}>{cat.percentagem}%</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{formatCurrency(cat.valor_total)}</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          {filteredItems.map((item, i) => (
            <div
              key={item.id_base || i}
              className={`grid grid-cols-[1fr_auto] gap-x-4 px-5 py-3.5 ${i % 2 === 1 ? 'bg-gray-50/60 dark:bg-gray-800/40' : ''} ${i !== 0 ? 'border-t border-gray-50 dark:border-gray-800' : ''}`}
            >
              <div className="min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug font-medium">{decodeHtml(item.objeto)}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                  <span className="opacity-40">→</span>
                  {decodeHtml(item.adjudicatario)}
                </p>
              </div>
              <div className="text-right pl-2 flex-shrink-0">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">{formatCurrency(item.valor)}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 whitespace-nowrap">{formatDate(item.data)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
