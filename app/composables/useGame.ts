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

export const Niveis: Nivel[] = [
    { nome: "Comum", chance: 70, cor: "#4b5563", multiplicador: 0.7 },
    { nome: "Incomum", chance: 20, cor: "#3b82f6", multiplicador: 1.5 },
    { nome: "Raro", chance: 7, cor: "#a855f7", multiplicador: 4 },
    { nome: "Épico", chance: 2.5, cor: "#f43f5e", multiplicador: 15 },
    { nome: "Relíquia", chance: 0.5, cor: "#fbbf24", multiplicador: 60 },
];

export const Caixas: Caixa[] = [
    { id: "alpha", nome: "Caixa Alpha", custo: 10, descricao: "Ponto de entrada para processamento básico." },
    { id: "beta", nome: "Caixa Beta", custo: 35, descricao: "Equilíbrio otimizado entre custo e probabilidade." },
    { id: "gamma", nome: "Caixa Gamma", custo: 100, descricao: "Filtros avançados para identificação de ativos." },
    { id: "delta", nome: "Caixa Delta", custo: 300, descricao: "Protocolo de extração de média performance." },
    { id: "epsilon", nome: "Caixa Epsilon", custo: 850, descricao: "Algoritmos de busca de alta frequência." },
    { id: "zeta", nome: "Caixa Zeta", custo: 2500, descricao: "Sintetização de dados de nível corporativo." },
    { id: "sigma", nome: "Caixa Sigma", custo: 5000, descricao: "Otimização máxima de recursos raros." },
];

export const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
};

export const formatarChance = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 1 }).format(valor / 100);
};

export const useGame = () => {
    const saldo = useState<number>("saldo", () => Math.round(Math.random() * 500));
    const inventario = useState<Item[]>("inventario", () => []);

    const formatadores = {
        moeda: (v: number) => formatarMoeda(v),
        chance: (v: number) => formatarChance(v),
    };

    const sortearNivel = (): Nivel => {
        const random = Math.random() * 100;
        let acumulada = 0;

        for (const nivel of Niveis) {
            acumulada += nivel.chance;
            if (random < acumulada) return nivel;
        }

        return Niveis[0]!;
    };

    const gerarItem = (caixa: Caixa, nivel: Nivel): Item => ({
        id: crypto.randomUUID(),
        nivel,
        valor: Math.round(caixa.custo * nivel.multiplicador),
    });

    const gerarLinha = (caixa: Caixa): Item[] => {
        return Array.from({ length: 50 }, () => {
            const nivel = sortearNivel();
            return gerarItem(caixa, nivel);
        });
    };

    return { saldo, inventario, niveis: Niveis, caixas: Caixas, gerarLinha, ...formatadores };
};
