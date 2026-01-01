<template>
    <main class="flex-1 vault-container py-16 space-y-16">
        <div class="space-y-4">
            <h1 class="vault-title text-7xl">Inventário</h1>
            <p class="text-gray-500 text-lg max-w-xl">Visualização de todos os itens e recursos processados pelo sistema.</p>
        </div>

        <div class="grid grid-cols-5 gap-3">
            <div v-for="nivel in niveis" class="vault-surface w-full">
                <div class="w-full h-1" :style="{ background: nivel.cor }"></div>

                <div class="flex items-center justify-between p-3">
                    <span class="vault-label">{{ nivel.nome }}</span>
                    <span class="text-xs font-bold text-white">{{ contarItens(nivel.nome) }}</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-7 gap-3">
            <div v-for="(item, index) in inventario" :key="index" class="vault-surface w-full h-52 flex flex-col relative p-4">
                <div class="absolute top-0 left-0 right-0 h-1" :style="{ background: item.nivel.cor }"></div>

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
    </main>
</template>

<script setup lang="ts">
const { inventario, niveis, moeda, venderItem, contarItens } = useGame();
</script>
