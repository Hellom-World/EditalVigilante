export interface MunicipioMeta {
  slug: string
  nome: string
  distrito: string
  ativo: boolean
}

export const MUNICIPIOS: MunicipioMeta[] = [
  { slug: 'arouca',    nome: 'Arouca',          distrito: 'Aveiro',    ativo: true  },
  { slug: 'porto',     nome: 'Porto',            distrito: 'Porto',     ativo: false },
  { slug: 'lisboa',    nome: 'Lisboa',           distrito: 'Lisboa',    ativo: false },
  { slug: 'braga',     nome: 'Braga',            distrito: 'Braga',     ativo: false },
  { slug: 'coimbra',   nome: 'Coimbra',          distrito: 'Coimbra',   ativo: false },
  { slug: 'setubal',   nome: 'Setúbal',          distrito: 'Setúbal',   ativo: false },
]

export const MUNICIPIOS_ATIVOS = MUNICIPIOS.filter(m => m.ativo)
