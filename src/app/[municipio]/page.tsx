import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'
import { Dashboard } from '@/components/Dashboard'
import type { MunicipioData } from '@/types/contracts'

const MUNICIPIOS_DISPONIVEIS = ['arouca']

interface Props {
  params: Promise<{ municipio: string }>
}

async function getData(municipio: string): Promise<MunicipioData | null> {
  const candidates = [
    path.join(process.cwd(), '..', 'data', `contratos_base_${municipio}.json`),
    path.join(process.cwd(), 'public', `${municipio}.json`),
  ]
  for (const filePath of candidates) {
    try {
      const raw = await readFile(filePath, 'utf-8')
      return JSON.parse(raw)
    } catch {
      continue
    }
  }
  return null
}

export function generateStaticParams() {
  return MUNICIPIOS_DISPONIVEIS.map(municipio => ({ municipio }))
}

export default async function MunicipioPage({ params }: Props) {
  const { municipio } = await params

  if (!MUNICIPIOS_DISPONIVEIS.includes(municipio)) notFound()

  const data = await getData(municipio)
  if (!data) notFound()

  return <Dashboard data={data} />
}
