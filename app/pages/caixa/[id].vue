<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-20">
        <NuxtLink to="/"
            class="flex items-center gap-4 text-xs font-black uppercase opacity-30 hover:opacity-100 transition-all no-underline w-fit">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            <span>Voltar</span>
        </NuxtLink>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 bg-[#0c0c0c] p-12 space-y-12 border border-white/5">
                <div class="space-y-4">
                    <h2 class="text-5xl font-black uppercase italic">{{ caixa?.nome }}</h2>
                    <p class="text-xs text-white opacity-30 font-bold uppercase">{{ caixa?.descricao }}</p>
                </div>

                <div class="space-y-6">
                    <h4 class="text-[12px] uppercase font-black opacity-30 italic">Taxas de Sucesso</h4>

                    <div class="space-y-4">
                        <div v-for="nivel in niveis" :key="nivel.nome"
                            class="flex justify-between items-center text-[10px] font-black uppercase">
                            <span class="flex items-center gap-4">
                                <div class="w-3 h-3" :style="{ background: nivel.cor }"></div>
                                <span class="opacity-40 tracking-widest">{{ nivel.nome }}</span>
                            </span>

                            <span class="mono opacity-30">{{ nivel.chance }}</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-[10px] uppercase font-black opacity-30">Unidades</span>

                        <div class="flex gap-2">
                            <button v-for="n in 5" :key="n"
                                class="w-11 h-11 bg-white/5 text-[12px] font-black transition-all hover:bg-white/10 opacity-30">
                                {{ n }}
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-8 bg-white/5">
                        <span class="text-[10px] uppercase font-black opacity-30">Investimento</span>
                        <span class="mono text-2xl font-bold text-white">${{ caixa?.custo }}</span>
                    </div>

                    <button
                        class="bg-white font-bold text-black uppercase w-full py-7 text-xs cursor-pointer hover:bg-gray-200 transition-colors">
                        Iniciar Execução
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { niveis, caixas } = useGame();

const caixa = computed(() => {
    return caixas.find(c => c.id === route.params.id);
});
</script>