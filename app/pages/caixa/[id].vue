<template>
    <main class="flex-1 vault-container py-12 space-y-12">
        <NuxtLink to="/" class="flex items-center gap-3 vault-nav-link w-fit group">
            <Icon name="lucide:arrow-left" class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Mercado</span>
        </NuxtLink>

        <div class="grid grid-cols-12 gap-12">
            <div class="col-span-4 space-y-10">
                <div class="space-y-4">
                    <h2 class="vault-title text-5xl">{{ caixa?.nome }}</h2>
                    <p class="text-gray-400 leading-relaxed">{{ caixa?.descricao }}</p>
                </div>

                <div class="space-y-6">
                    <h4 class="vault-label border-b border-white/10 pb-2">Probabilidades</h4>

                    <div class="space-y-3">
                        <div v-for="nivel in niveis" :key="nivel.nome" class="flex justify-between items-center">
                            <span class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full" :style="{ background: nivel.cor }"></div>
                                <span class="text-xs font-bold uppercase text-gray-300">{{ nivel.nome }}</span>
                            </span>

                            <span class="text-xs font-mono text-gray-500">{{ nivel.chance }}</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <h4 class="vault-label border-b border-white/10 pb-2">Quantidade</h4>

                    <div class="grid grid-cols-5 gap-3">
                        <button
                            v-for="n in 5"
                            :key="n"
                            @click="quantidade = n"
                            class="h-10 vault-btn-outline"
                            :class="{ active: quantidade === n }"
                        >
                            {{ n }}
                        </button>
                    </div>
                </div>

                <div class="space-y-6">
                    <h4 class="vault-label border-b border-white/10 pb-2">Investimento</h4>

                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold uppercase text-gray-300">Total</span>
                        <span class="text-2xl font-bold uppercase text-gray-300">${{ total }}</span>
                    </div>
                </div>
                <button class="vault-btn w-full">Confirmar</button>
            </div>

            <div class="col-span-8">
                <div class="vault-surface h-full w-full min-h-125 flex items-center justify-center bg-[#080808]"></div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const quantidade = useState("quantidade", () => 1);
const { niveis, caixas } = useGame();

const caixa = computed(() => {
    return caixas.find((c) => c.id === route.params.id);
});

const total = computed(() => {
    return (caixa.value?.custo ?? 0) * quantidade.value;
});
</script>
