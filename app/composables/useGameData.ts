import type { Nivel, Caixa } from "~/types/game";

export const Niveis: Nivel[] = [
  { nome: "Comum", chance: 75, cor: "#4b5563", multiplicador: 0.4 },
  { nome: "Incomum", chance: 18, cor: "#3b82f6", multiplicador: 1.2 },
  { nome: "Raro", chance: 5, cor: "#a855f7", multiplicador: 3.5 },
  { nome: "Épico", chance: 1.5, cor: "#f43f5e", multiplicador: 12 },
  { nome: "Relíquia", chance: 0.5, cor: "#fbbf24", multiplicador: 45 },
];

export const Caixas: Caixa[] = [
  { id: "alpha", nome: "Caixa Alpha", custo: 10, descricao: "Processamento básico de entrada." },
  { id: "beta", nome: "Caixa Beta", custo: 50, descricao: "Otimização de rotinas iniciais." },
  { id: "gamma", nome: "Caixa Gamma", custo: 150, descricao: "Filtros de busca aprimorados." },
  { id: "delta", nome: "Caixa Delta", custo: 500, descricao: "Protocolo de extração estável." },
  { id: "epsilon", nome: "Caixa Epsilon", custo: 1200, descricao: "Algoritmos de alta frequência." },
  { id: "zeta", nome: "Caixa Zeta", custo: 3000, descricao: "Sintetização de dados corporativos." },
  { id: "iota", nome: "Caixa Iota", custo: 7500, descricao: "Arquitetura de dados quânticos." },
  { id: "sigma", nome: "Caixa Sigma", custo: 15000, descricao: "Otimização máxima de recursos." },
  { id: "omega", nome: "Caixa Omega", custo: 50000, descricao: "O ápice do processamento de ativos." },
  { id: "slow", nome: "Caixa Slow", custo: 100000, descricao: "Homenagem ao primeiro milionário." },
];

export const useGameData = () => ({
  niveis: Niveis,
  caixas: Caixas,
});
