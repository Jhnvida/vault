export interface Nivel {
  nome: string;
  chance: number;
  cor: string;
  multiplicador: number;
}

export interface Caixa {
  id: string;
  nome: string;
  custo: number;
  descricao: string;
}

export interface Item {
  id: string;
  nivel: Nivel;
  valor: number;
}
