<template>
    <main class="flex-1 vault-container py-12 md:py-20 space-y-12">
        <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div class="space-y-4">
                <h1 class="vault-title text-5xl md:text-7xl italic">Inventário</h1>
                <p class="text-gray-500 text-sm md:text-base max-w-xl opacity-80">
                    Visualização de todos os itens processados pelo sistema.
                </p>
            </div>

            <div v-if="inventario.length > 0" class="flex items-center gap-6">
                <div class="hidden md:flex flex-col items-end border-r border-white/10 pr-6">
                    <span class="vault-label opacity-40">Total em Ativos</span>
                    <span class="text-xl font-black italic text-white">{{ moeda(valorTotal) }}</span>
                </div>

                <button @click="venderFiltrados" class="vault-btn py-3 px-8 bg-white text-black hover:bg-gray-200">
                    Vender {{ filtro ? "Seleção" : "Tudo" }}
                </button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
            <button
                v-for="nivel in niveis"
                :key="nivel.nome"
                @click="alternarFiltro(nivel.nome)"
                class="vault-surface w-full p-4 transition-all duration-300 text-left relative"
                :class="[
                    filtro === nivel.nome ? 'bg-white/5 border-white/20' : 'opacity-60 hover:opacity-100',
                    contarItens(nivel.nome) === 0 ? 'grayscale pointer-events-none opacity-10' : '',
                ]"
            >
                <div class="absolute top-0 left-0 w-full h-0.5" :style="{ background: nivel.cor }"></div>

                <div class="flex flex-col gap-1">
                    <span class="vault-label text-[8px] opacity-70" :style="{ color: nivel.cor }">{{ nivel.nome }}</span>
                    <span class="text-xl font-black italic text-white">{{ contarItens(nivel.nome) }}</span>
                </div>
            </button>
        </div>

        <div v-if="itensExibidos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <div
                v-for="(item, index) in itensExibidos"
                :key="item.id || index"
                class="vault-surface flex flex-col relative p-5 group animate-in fade-in duration-500"
            >
                <div class="absolute top-0 left-0 right-0 h-0.5" :style="{ background: item.nivel.cor }"></div>

                <span class="text-[9px] font-black uppercase tracking-wider mb-4" :style="{ color: item.nivel.cor }">
                    {{ item.nivel.nome }}
                </span>

                <div class="flex-1 flex items-center justify-center py-4">
                    <Icon
                        name="lucide:box"
                        :style="{ color: item.nivel.cor }"
                        class="w-10 h-10 opacity-60 group-hover:opacity-100 transition-all"
                    />
                </div>

                <div class="space-y-4 pt-4 border-t border-white/5">
                    <div class="flex flex-col">
                        <span class="vault-label text-[7px] opacity-40">Valor</span>
                        <span class="text-xs font-black text-white italic">{{ moeda(item.valor) }}</span>
                    </div>

                    <button
                        @click="venderItem(item)"
                        class="w-full text-[9px] bg-white/5 hover:bg-white hover:text-black py-2.5 transition-all uppercase font-black"
                    >
                        Vender
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="py-32 flex flex-col items-center justify-center border border-white/5 bg-white/1">
            <Icon name="lucide:box" class="w-12 h-12 text-white/5 mb-4" />
            <h3 class="text-white/30 font-black italic uppercase text-lg">Vazio</h3>
        </div>
    </main>
</template>

<script setup lang="ts">
const { inventario, niveis, moeda, venderItem, contarItens } = useGame();

const filtro = ref<string | null>(null);
const valorTotal = computed(() => inventario.value.reduce((acc, item) => acc + item.valor, 0));

const itensExibidos = computed(() => {
    let lista = [...inventario.value];
    if (filtro.value) lista = lista.filter((i) => i.nivel.nome === filtro.value);
    return lista.sort((a, b) => b.valor - a.valor);
});

const alternarFiltro = (nome: string) => (filtro.value = filtro.value === nome ? null : nome);
const venderFiltrados = () => [...itensExibidos.value].forEach((item) => venderItem(item));
</script>
