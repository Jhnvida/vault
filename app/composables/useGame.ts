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

export const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
};

export const formatarChance = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 1 }).format(valor / 100);
};

export const useGame = () => {
    const saldo = useState<number>("saldo", () => 1000);
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

    const adicionarInventario = (item: Item) => {
        inventario.value.push(item);
    };

    const venderItem = (item: Item) => {
        saldo.value += item.valor;
        inventario.value = inventario.value.filter((i) => i.id !== item.id);
    };

    const contarItens = (nome: string) => {
        return inventario.value.filter((item) => item.nivel.nome === nome).length;
    };

    const processarCompra = (valor: number): boolean => {
        if (saldo.value >= valor) {
            saldo.value -= valor;
            return true;
        }

        return false;
    };

    return {
        saldo,
        inventario,
        niveis: Niveis,
        caixas: Caixas,
        gerarLinha,
        adicionarInventario,
        venderItem,
        contarItens,
        processarCompra,
        ...formatadores,
    };
};
