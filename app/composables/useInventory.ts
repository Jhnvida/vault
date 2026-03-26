import type { Item } from "~/types/game";

export const useInventory = () => {
  const inventario = useState<Item[]>("inventario", () => []);
  const { saldo } = useBalance();

  const adicionar = (item: Item) => inventario.value.push(item);

  const venderItem = (item: Item) => {
    saldo.value += item.valor;
    inventario.value = inventario.value.filter((i) => i.id !== item.id);
  };

  const contarItens = (nome: string) => inventario.value.filter((i) => i.nivel.nome === nome).length;

  return { inventario, adicionar, venderItem, contarItens };
};
