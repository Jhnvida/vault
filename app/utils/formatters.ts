const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fmtPct = new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 1 });

export const moeda = (v: number) => fmt.format(v);
export const chance = (v: number) => fmtPct.format(v / 100);
