import type { Nivel, Caixa } from "~/types/game";

export const Niveis: Nivel[] = [
  { nome: "Comum", chance: 75, cor: "#4b5563", multiplicador: 0.4 },
  { nome: "Incomum", chance: 18, cor: "#3b82f6", multiplicador: 1.2 },
  { nome: "Raro", chance: 5, cor: "#a855f7", multiplicador: 3.5 },
  { nome: "Épico", chance: 1.5, cor: "#f43f5e", multiplicador: 12 },
  { nome: "Relíquia", chance: 0.5, cor: "#fbbf24", multiplicador: 45 },
];

export const Caixas: Caixa[] = [
  { id: "caixote", nome: "Caixote", custo: 10, descricao: "Simples e direta. Todo mundo começa aqui." },
  { id: "enferrujada", nome: "Enferrujada", custo: 50, descricao: "Velha e resistente. Ainda pode esconder surpresas." },
  { id: "lacrada", nome: "Lacrada", custo: 150, descricao: "Ninguém abriu antes de você. É tudo seu." },
  { id: "blindada", nome: "Blindada", custo: 500, descricao: "Construída pra guardar o que realmente vale." },
  { id: "cofre", nome: "Cofre", custo: 1200, descricao: "Mais do que uma caixa - é uma aposta séria." },
  { id: "preciosa", nome: "Preciosa", custo: 3000, descricao: "O nome já diz tudo." },
  { id: "cripta", nome: "Cripta", custo: 7500, descricao: "Guardada nas profundezas. Vale a pena escavar." },
  { id: "lendaria", nome: "Lendária", custo: 15000, descricao: "Rumores circulam. Fortunas foram ganhas aqui." },
  { id: "absurda", nome: "Absurda", custo: 50000, descricao: "Pra quem não tem medo de arriscar tudo." },
  { id: "absoluta", nome: "Absoluta", custo: 100000, descricao: "Não existe nada maior. Literalmente." },
];

export const useGameData = () => ({
  niveis: Niveis,
  caixas: Caixas,
});
