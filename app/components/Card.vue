<template>
    <div
        class="bg-[#0c0c0c] p-10 cursor-pointer flex flex-col justify-between min-h-95 border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:-translate-y-1">
        <div class="space-y-4">
            <div class="w-12 h-12 bg-white/5 flex items-center justify-center">
                <Icon name="lucide:box" class="w-5 h-5 opacity-40" />
            </div>

            <div class="space-y-2">
                <h3 class="text-2xl font-black tracking-tighter uppercase">{{ caixa.nome }}</h3>
                <p class="text-[11px] text-white/30 font-bold uppercase">{{ caixa.descricao }}</p>
            </div>
        </div>

        <div class="flex justify-between items-end border-t border-white/5 pt-8">
            <span class="text-xl font-bold text-white">${{ caixa.custo }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Caixa {
    id: string;
    nome: string;
    custo: number;
    descricao: string;
}

defineProps<{ caixa: Caixa }>()
</script>