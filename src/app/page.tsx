import Link from 'next/link'
import { readFile } from 'fs/promises'
import path from 'path'
import { MUNICIPIOS } from '@/lib/municipios'
import { formatCurrency } from '@/lib/formatters'
import type { MunicipioData } from '@/types/contracts'

async function getMunicipioStats(slug: string) {
  const candidates = [
    path.join(process.cwd(), '..', 'data', `contratos_base_${slug}.json`),
    path.join(process.cwd(), 'public', `${slug}.json`),
  ]
  for (const filePath of candidates) {
    try {
      const raw = await readFile(filePath, 'utf-8')
      const data: MunicipioData = JSON.parse(raw)
      const todos = data.por_ano['todos']
      return {
        total_contratos: todos.total_contratos,
        total_valor: todos.total_valor,
        anos: data.anos,
      }
    } catch {
      continue
    }
  }
  return null
}

export default async function LandingPage() {
  const statsAtivos = await Promise.all(
    MUNICIPIOS.filter(m => m.ativo).map(async m => ({
      ...m,
      stats: await getMunicipioStats(m.slug),
    }))
  )

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="px-6 h-16 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">EV</span>
            </div>
            <span className="font-bold text-gray-900 tracking-tight">Edital Vigilante</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#municipios" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Municípios
            </a>
            <Link
              href="/arouca"
              className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Portal BASE · dados.gov.pt
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Transparência na<br />
          <span className="text-blue-600">contratação pública</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Acompanha adjudicações, classifica fornecedores e identifica padrões de despesa
          nos municípios portugueses — tudo num só lugar.
        </p>

        <a
          href="#municipios"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          Explorar municípios →
        </a>
      </section>

      {/* Municipality cards */}
      <section id="municipios" className="bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Municípios disponíveis</p>
            <h2 className="text-2xl font-extrabold text-gray-900">Escolhe um município</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Active municipalities */}
            {statsAtivos.map(m => (
              <Link
                key={m.slug}
                href={`/${m.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {m.nome}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.distrito}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Ativo
                  </span>
                </div>

                {m.stats && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">Contratos</p>
                      <p className="text-base font-extrabold text-gray-900">
                        {m.stats.total_contratos.toLocaleString('pt-PT')}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">Valor total</p>
                      <p className="text-base font-extrabold text-gray-900">
                        {formatCurrency(m.stats.total_valor)}
                      </p>
                    </div>
                  </div>
                )}

                {m.stats && (
                  <p className="text-xs text-gray-400">
                    Histórico {m.stats.anos[0]}–{m.stats.anos[m.stats.anos.length - 1]}
                  </p>
                )}

                <div className="mt-4 text-xs font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                  Ver dashboard <span>→</span>
                </div>
              </Link>
            ))}

            {/* Inactive municipalities */}
            {MUNICIPIOS.filter(m => !m.ativo).map(m => (
              <div
                key={m.slug}
                className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 opacity-60"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-gray-500">{m.nome}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.distrito}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                    Em breve
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Contratos</p>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Valor total</p>
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20 w-full">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center mb-12">
          O que podes fazer
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: '🔍', title: 'Pesquisa instantânea', desc: 'Filtra contratos por objeto ou empresa em tempo real, sem esperar por carregamentos.' },
            { icon: '📊', title: 'Análise por categoria', desc: 'Classifica automaticamente a despesa por departamento municipal e perfil de fornecedor.' },
            { icon: '🏢', title: 'Ranking de empresas', desc: 'Identifica quais as empresas que mais recebem em adjudicações e em que áreas.' },
          ].map(f => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 text-center text-xs text-gray-400">
        © 2025 Edital Vigilante · Dados:{' '}
        <a href="https://dados.gov.pt" className="hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
          Portal BASE / dados.gov.pt
        </a>
      </footer>
    </div>
  )
}
