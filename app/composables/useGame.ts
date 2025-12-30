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
    nivel: Nivel;
    valor: number;
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
        { nome: "Comum", chance: 70, cor: "#4b5563", multiplicador: 0.7 },
        { nome: "Incomum", chance: 20, cor: "#3b82f6", multiplicador: 1.5 },
        { nome: "Raro", chance: 7, cor: "#a855f7", multiplicador: 4 },
        { nome: "Épico", chance: 2.5, cor: "#f43f5e", multiplicador: 15 },
        { nome: "Relíquia", chance: 0.5, cor: "#fbbf24", multiplicador: 60 },
    ];

    const caixas: Caixa[] = [
        { id: "alpha", nome: "Caixa Alpha", custo: 10, descricao: "Ponto de entrada para processamento básico." },
        { id: "beta", nome: "Caixa Beta", custo: 35, descricao: "Equilíbrio otimizado entre custo e probabilidade." },
        { id: "gamma", nome: "Caixa Gamma", custo: 100, descricao: "Filtros avançados para identificação de ativos." },
        { id: "delta", nome: "Caixa Delta", custo: 300, descricao: "Protocolo de extração de média performance." },
        { id: "epsilon", nome: "Caixa Epsilon", custo: 850, descricao: "Algoritmos de busca de alta frequência." },
        { id: "zeta", nome: "Caixa Zeta", custo: 2500, descricao: "Sintetização de dados de nível corporativo." },
        { id: "sigma", nome: "Caixa Sigma", custo: 5000, descricao: "Otimização máxima de recursos raros." },
    ];

    const formatadores = {
        moeda: (v: number) => formatarMoeda(v),
        chance: (v: number) => formatarChance(v),
    };

    function sortearNivel(): Nivel {
        const random = Math.random() * 100;
        let acumulada = 0;

        for (const nivel of niveis) {
            acumulada += nivel.chance;

            if (random < acumulada) {
                return nivel;
            }
        }

        return niveis[0]!;
    }

    function gerarItem(caixa: Caixa, nivel: Nivel): Item {
        return {
            nivel,
            valor: Math.round(caixa.custo * nivel.multiplicador),
        };
    }

    function gerarLinha(caixa: Caixa): Item[] {
        const linha: Item[] = [];

        for (let i = 0; i < 50; i++) {
            const nivel = sortearNivel();
            linha.push(gerarItem(caixa, nivel));
        }

        return linha;
    }

    return { saldo, niveis, caixas, gerarLinha, ...formatadores };
};
