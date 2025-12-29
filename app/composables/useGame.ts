export interface Nivel {
    nome: string;
    chance: number;
    cor: string;
}

export interface Caixa {
    id: string;
    nome: string;
    custo: number;
    descricao: string;
}

export const formatarMoeda = (valor: number, exibirSimbolo: boolean = true) => {
    return new Intl.NumberFormat("pt-BR", {
        style: exibirSimbolo ? "currency" : "decimal",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};

export const formatarChance = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(valor / 100);
};

export const useGame = () => {
    const saldo = useState<number>("saldo", () => Math.round(Math.random() * 10000));

    const niveis: Nivel[] = [
        { nome: "Comum", chance: 70, cor: "#4b5563" },
        { nome: "Incomum", chance: 20, cor: "#3b82f6" },
        { nome: "Raro", chance: 7, cor: "#a855f7" },
        { nome: "Épico", chance: 2.5, cor: "#f43f5e" },
        { nome: "Relíquia", chance: 0.5, cor: "#fbbf24" },
    ];

    const caixas: Caixa[] = [
        { id: "alpha", nome: "Caixa Alpha", custo: 25, descricao: "Ponto de entrada para processamento." },
        { id: "beta", nome: "Caixa Beta", custo: 80, descricao: "Equilíbrio entre custo e probabilidade." },
        { id: "gamma", nome: "Caixa Gamma", custo: 200, descricao: "Filtros avançados para ativos raros." },
        { id: "delta", nome: "Caixa Delta", custo: 550, descricao: "Extração de alta performance." },
        { id: "omega", nome: "Caixa Omega", custo: 1500, descricao: "Potencial massivo de retorno." },
    ];

    const formatadores = {
        moeda: (v: number) => formatarMoeda(v),
        chance: (v: number) => formatarChance(v),
    };

    return { saldo, niveis, caixas, ...formatadores };
};
