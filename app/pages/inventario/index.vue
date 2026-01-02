<template>
    <main class="flex-1 vault-container py-16 space-y-16">
        <div class="flex justify-between items-end gap-4">
            <div class="space-y-4">
                <h1 class="vault-title text-7xl">Inventário</h1>
                <p class="text-gray-500 text-lg max-w-xl">Visualização de todos os itens e recursos processados pelo sistema.</p>
            </div>

            <div v-if="inventario.length > 0" class="flex gap-3">
                <button
                    @click="venderFiltrados"
                    class="vault-btn-outline uppercase px-6 h-10 text-red-400 border-red-500/30 hover:bg-red-500/10"
                >
                    Vender {{ filtro ? "Filtrados" : "Tudo" }}
                </button>
            </div>
        </div>

        <div class="grid grid-cols-5 gap-3">
            <div v-for="nivel in niveis" :key="nivel.nome" class="vault-surface w-full transition-all duration-300">
                <div class="w-full h-0.5" :style="{ background: nivel.cor }"></div>

                <div class="flex items-center justify-between p-3">
                    <span class="vault-label">{{ nivel.nome }}</span>
                    <span class="text-xs font-bold text-white">{{ contarItens(nivel.nome) }}</span>
                </div>
            </div>
        </div>

        <div v-if="itensExibidos.length > 0" class="grid grid-cols-7 gap-3">
            <div
                v-for="(item, index) in itensExibidos"
                :key="item.id || index"
                class="vault-surface w-full h-52 flex flex-col relative p-4"
            >
                <div class="absolute top-0 left-0 right-0 h-0.5" :style="{ background: item.nivel.cor }"></div>

                <span class="text-[11px] font-black uppercase" :style="{ color: item.nivel.cor }">
                    {{ item.nivel.nome }}
                </span>

                <div class="flex-1 flex items-center justify-center">
                    <Icon name="lucide:box" :style="{ color: item.nivel.cor }" class="w-14 h-14 drop-shadow-lg opacity-70" />
                </div>

                <div class="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1">
                    <span class="text-[10px] text-gray-500 font-bold uppercase">Valor Estimado</span>
                    <span class="text-xs font-bold text-white">{{ moeda(item.valor) }}</span>
                </div>

                <button
                    @click="venderItem(item)"
                    class="text-[10px] bg-white/5 hover:bg-red-500/20 hover:text-red-400 px-2 py-1 transition-colors uppercase font-bold mt-4"
                >
                    Vender
                </button>
            </div>
        </div>

        <div v-else class="py-20 flex flex-col items-center justify-center border border-dashed border-white/5 bg-white/2">
            <Icon name="lucide:package-open" class="w-12 h-12 text-white/10 mb-4" />

            <span class="text-gray-500 uppercase font-bold text-xs tracking-widest">
                {{ inventario.length === 0 ? "O seu inventário está vazio" : "Nenhum item corresponde ao filtro" }}
            </span>

            <button v-if="filtro" @click="filtro = null" class="mt-4 text-xs text-white/40 hover:text-white underline">
                Limpar filtros
            </button>
        </div>
    </main>
</template>

<script setup lang="ts">
const { inventario, niveis, moeda, venderItem, contarItens } = useGame();

const filtro = ref<string | null>(null);

const itensExibidos = computed(() => {
    let lista = [...inventario.value];

    if (filtro.value) {
        lista = lista.filter((i) => i.nivel.nome === filtro.value);
    }

    return lista;
});

const venderFiltrados = () => {
    const itensParaVender = [...itensExibidos.value];
    itensParaVender.forEach((item) => {
        venderItem(item);
    });
};
</script>
