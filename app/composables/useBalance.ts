export const useBalance = () => {
  const saldo = useState<number>("saldo", () => 1000);

  const comprar = (valor: number): boolean => {
    if (saldo.value < valor) return false;
    saldo.value -= valor;
    return true;
  };

  return { saldo, comprar };
};
