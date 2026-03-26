<template>
    <main class="flex-1 vault-container py-10 md:py-16 flex flex-col gap-8 md:gap-10">
        <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="vault-title text-4xl md:text-6xl">Inventário</h1>
                <p class="text-text-tertiary text-sm leading-relaxed max-w-lg">Visualização de todos os itens processados pelo sistema.</p>
            </div>

            <div v-if="inventario.length > 0" class="flex items-center gap-3 shrink-0">
                <div class="vault-surface flex flex-col items-end px-4 py-2.5 rounded-lg">
                    <span class="vault-label text-[10px]">{{ filtro ? "Seleção" : "Total em Ativos" }}</span>
                    <span class="text-base font-bold text-text-primary tabular-nums">{{ moeda(total) }}</span>
                </div>

                <button @click="venderTodos" class="vault-btn">Vender {{ filtro ? "Seleção" : "Tudo" }}</button>
            </div>
        </div>

        <div class="flex flex-wrap gap-2">
            <button
                v-for="n in niveis"
                :key="n.nome"
                @click="filtro = filtro === n.nome ? null : n.nome"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold uppercase tracking-wide transition-all duration-200"
                :class="[
                    filtro === n.nome
                        ? 'bg-surface-overlay border-border-strong text-text-primary'
                        : 'bg-surface-raised border-border-subtle text-text-tertiary hover:border-border-default hover:text-text-secondary',
                    contarItens(n.nome) === 0 ? 'opacity-20 pointer-events-none grayscale' : '',
                ]"
            >
                <div class="w-1.5 h-1.5 rounded-sm shrink-0" :style="{ background: n.cor }" />
                <span>{{ n.nome }}</span>
                <span
                    class="tabular-nums font-bold text-[10px] leading-none rounded px-1 py-0.5 transition-all"
                    :style="filtro === n.nome ? { background: n.cor + '25', color: n.cor } : {}"
                    :class="filtro !== n.nome ? 'text-text-muted' : ''"
                >
                    {{ contarItens(n.nome) }}
                </span>
            </button>
        </div>

        <div v-if="items.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <InventoryItem v-for="item in items" :key="item.id" :item="item" @vender="venderItem" />
        </div>

        <div v-else class="py-24 flex flex-col items-center justify-center border border-border-subtle rounded-xl bg-surface-raised">
            <Icon name="lucide:box" class="w-10 h-10 text-text-muted mb-3" />
            <h3 class="text-text-muted font-bold uppercase text-sm tracking-wider">Inventário vazio</h3>
        </div>
    </main>
</template>

<script setup lang="ts">
const { inventario, venderItem, contarItens } = useInventory();
const { niveis } = useGameData();
const filtro = ref<string | null>(null);

const items = computed(() => {
    const lista = filtro.value ? inventario.value.filter((i) => i.nivel.nome === filtro.value) : [...inventario.value];
    return lista.sort((a, b) => b.valor - a.valor);
});

const total = computed(() => items.value.reduce((acc, i) => acc + i.valor, 0));
const venderTodos = () => [...items.value].forEach(venderItem);
</script>
