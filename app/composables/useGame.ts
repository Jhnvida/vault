export interface Nivel {
    nome: string;
    chance: string;
    cor: string;
}

export interface Caixa {
    id: string;
    nome: string;
    custo: number;
    descricao: string;
}

export const useGame = () => {
    const saldo = useState<number>('saldo', () => 100);

    const niveis: Nivel[] = [
        { nome: 'Comum', chance: '70.0%', cor: '#4b5563' },
        { nome: 'Incomum', chance: '20.0%', cor: '#3b82f6' },
        { nome: 'Raro', chance: '7.0%', cor: '#a855f7' },
        { nome: 'Épico', chance: '2.5%', cor: '#f43f5e' },
        { nome: 'Relíquia', chance: '0.5%', cor: '#fbbf24' }
    ];

    const caixas: Caixa[] = [
        { id: 'alpha', nome: 'Caixa Alpha', custo: 25, descricao: 'Ponto de entrada para processamento.' },
        { id: 'beta', nome: 'Caixa Beta', custo: 80, descricao: 'Equilíbrio entre custo e probabilidade.' },
        { id: 'gamma', nome: 'Caixa Gamma', custo: 200, descricao: 'Filtros avançados para ativos raros.' },
        { id: 'delta', nome: 'Caixa Delta', custo: 550, descricao: 'Extração de alta performance.' },
        { id: 'omega', nome: 'Caixa Omega', custo: 1500, descricao: 'Potencial massivo de retorno.' }
    ];

    return { saldo, niveis, caixas };
};