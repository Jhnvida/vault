export const useGame = () => {
    const saldo = useState<number>('saldo', () => 100);

    const caixas = [
        { id: 'alpha', nome: 'Caixa Alpha', custo: 25, descricao: 'Ponto de entrada para processamento.' },
        { id: 'beta', nome: 'Caixa Beta', custo: 80, descricao: 'Equilíbrio entre custo e probabilidade.' },
        { id: 'gamma', nome: 'Caixa Gamma', custo: 200, descricao: 'Filtros avançados para ativos raros.' },
        { id: 'delta', nome: 'Caixa Delta', custo: 550, descricao: 'Extração de alta performance.' },
        { id: 'omega', nome: 'Caixa Omega', custo: 1500, descricao: 'Potencial massivo de retorno.' }
    ];

    return { saldo, caixas };
};