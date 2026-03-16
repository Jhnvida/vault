export interface Nivel {
  nome: string
  chance: number
  cor: string
  multiplicador: number
}

export interface Caixa {
  id: string
  nome: string
  custo: number
  descricao: string
}

export interface Item {
  id: string
  nivel: Nivel
  valor: number
}

export const Niveis: Nivel[] = [
  { nome: "Comum",    chance: 75,  cor: "#4b5563", multiplicador: 0.4  },
  { nome: "Incomum",  chance: 18,  cor: "#3b82f6", multiplicador: 1.2  },
  { nome: "Raro",     chance: 5,   cor: "#a855f7", multiplicador: 3.5  },
  { nome: "Épico",    chance: 1.5, cor: "#f43f5e", multiplicador: 12   },
  { nome: "Relíquia", chance: 0.5, cor: "#fbbf24", multiplicador: 45   },
]

export const Caixas: Caixa[] = [
  { id: "alpha",   nome: "Caixa Alpha",   custo: 10,     descricao: "Processamento básico de entrada."        },
  { id: "beta",    nome: "Caixa Beta",    custo: 50,     descricao: "Otimização de rotinas iniciais."         },
  { id: "gamma",   nome: "Caixa Gamma",   custo: 150,    descricao: "Filtros de busca aprimorados."           },
  { id: "delta",   nome: "Caixa Delta",   custo: 500,    descricao: "Protocolo de extração estável."          },
  { id: "epsilon", nome: "Caixa Epsilon", custo: 1200,   descricao: "Algoritmos de alta frequência."          },
  { id: "zeta",    nome: "Caixa Zeta",    custo: 3000,   descricao: "Sintetização de dados corporativos."     },
  { id: "iota",    nome: "Caixa Iota",    custo: 7500,   descricao: "Arquitetura de dados quânticos."         },
  { id: "sigma",   nome: "Caixa Sigma",   custo: 15000,  descricao: "Otimização máxima de recursos."          },
  { id: "omega",   nome: "Caixa Omega",   custo: 50000,  descricao: "O ápice do processamento de ativos."     },
  { id: "slow",    nome: "Caixa Slow",    custo: 100000, descricao: "Homenagem ao primeiro milionário."       },
]

const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
const fmtPct = new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 1 })

export const moeda = (v: number) => fmt.format(v)
export const chance = (v: number) => fmtPct.format(v / 100)

export const useGame = () => {
  const saldo = useState<number>("saldo", () => 1000)
  const inventario = useState<Item[]>("inventario", () => [])

  const rolarNivel = (): Nivel => {
    const n = Math.random() * 100
    let acc = 0
    for (const nivel of Niveis) {
      acc += nivel.chance
      if (n < acc) return nivel
    }
    return Niveis[0]!
  }

  const novoItem = (caixa: Caixa, nivel: Nivel): Item => ({
    id: crypto.randomUUID(),
    nivel,
    valor: Math.round(caixa.custo * nivel.multiplicador),
  })

  const gerarLinha = (caixa: Caixa): Item[] =>
    Array.from({ length: 50 }, () => novoItem(caixa, rolarNivel()))

  const adicionar = (item: Item) => inventario.value.push(item)

  const venderItem = (item: Item) => {
    saldo.value += item.valor
    inventario.value = inventario.value.filter((i) => i.id !== item.id)
  }

  const contarItens = (nome: string) =>
    inventario.value.filter((i) => i.nivel.nome === nome).length

  const comprar = (valor: number): boolean => {
    if (saldo.value < valor) return false
    saldo.value -= valor
    return true
  }

  return {
    saldo,
    inventario,
    niveis: Niveis,
    caixas: Caixas,
    gerarLinha,
    adicionar,
    venderItem,
    contarItens,
    comprar,
    moeda,
    chance,
  }
}
