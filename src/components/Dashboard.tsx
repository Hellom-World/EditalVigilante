'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SummaryCards } from './SummaryCards'
import { CategoryCard } from './CategoryCard'
import { EmpresasGrid } from './EmpresasGrid'
import { YearDropdown } from './YearDropdown'
import { ThemeToggle } from './ThemeToggle'
import { buildEmpresas } from '@/lib/empresas'
import type { MunicipioData } from '@/types/contracts'

type Tab = 'departamento' | 'fornecedor' | 'empresas'

const TABS: { key: Tab; label: string; sub: string }[] = [
  { key: 'departamento', label: 'Departamento', sub: 'Como a câmara organiza o investimento' },
  { key: 'fornecedor',   label: 'Fornecedor',   sub: 'Que tipo de empresa pode concorrer' },
  { key: 'empresas',     label: 'Empresas',     sub: 'Adjudicatárias por valor total recebido' },
]

interface Props {
  data: MunicipioData
}

export function Dashboard({ data }: Props) {
  const anoInicial = String(data.anos[data.anos.length - 1])
  const [ano, setAno] = useState(anoInicial)
  const [tab, setTab] = useState<Tab>('departamento')
  const [search, setSearch] = useState('')

  const bloco = data.por_ano[ano]
  const empresas = useMemo(() => buildEmpresas(bloco), [bloco])
  const anoOptions = ['todos', ...data.anos.slice().reverse().map(String)]

  const activeTab = TABS.find(t => t.key === tab)!

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">

      {/* Header */}
      <header className="bg-blue-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-black">EV</span>
              </div>
              <span className="font-bold tracking-tight hidden sm:block">Edital Vigilante</span>
            </Link>
            <span className="text-blue-300 text-sm hidden sm:block">/</span>
            <span className="text-blue-100 text-sm font-medium">{data.municipio}</span>
          </div>

          <div className="flex items-center gap-2">
            <YearDropdown
              options={anoOptions}
              value={ano}
              onChange={(val) => { setAno(val); setSearch('') }}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">

        <SummaryCards municipio={data.municipio} ano={ano} bloco={bloco} />

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar por objeto ou empresa…"
            className="w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-100 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-1 overflow-x-auto scrollbar-none">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 -mb-px transition-all whitespace-nowrap ${
                tab === t.key
                  ? 'text-blue-500 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-5 mt-3 font-medium">{activeTab.sub}</p>

        {/* Content */}
        <div className="flex flex-col gap-3">
          {tab !== 'empresas'
            ? (tab === 'departamento' ? bloco.por_departamento : bloco.por_fornecedor).map((cat, i) => (
                <CategoryCard key={cat.categoria} cat={cat} index={i} searchTerm={search} />
              ))
            : <EmpresasGrid empresas={empresas} searchTerm={search} />
          }
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>
            Dados:{' '}
            <a href="https://dados.gov.pt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Portal BASE
            </a>{' '}
            · Câmara Municipal de {data.municipio}
          </span>
          <span>
            <strong className="text-gray-500">Edital Vigilante</strong>
          </span>
        </div>
      </footer>
    </div>
  )
}
