import type { Caixa, Nivel, Item } from "~/types/game";
import { Niveis } from "~/composables/useGameData";

export const useRoulette = () => {
  const rolarNivel = (): Nivel => {
    const n = Math.random() * 100;
    let acc = 0;

    for (const nivel of Niveis) {
      acc += nivel.chance;
      if (n < acc) return nivel;
    }

    return Niveis[0]!;
  };

  const novoItem = (caixa: Caixa, nivel: Nivel): Item => ({
    id: crypto.randomUUID(),
    nivel,
    valor: Math.round(caixa.custo * nivel.multiplicador),
  });

  const gerarLinha = (caixa: Caixa): Item[] => Array.from({ length: 50 }, () => novoItem(caixa, rolarNivel()));

  return { rolarNivel, novoItem, gerarLinha };
};
