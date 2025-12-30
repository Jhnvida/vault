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
                                <div class="w-2 h-2" :style="{ background: nivel.cor }"></div>
                                <span class="text-xs font-bold uppercase text-gray-300">{{ nivel.nome }}</span>
                            </span>

                            <span class="text-xs font-mono text-gray-500">{{ chance(nivel.chance) }}</span>
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
                        <span class="text-2xl font-bold uppercase text-white">{{ total }}</span>
                    </div>
                </div>
                <button class="vault-btn w-full">Confirmar</button>
            </div>

            <div class="col-span-8">
                <div class="vault-surface w-full min-h-100 flex flex-col items-center justify-center gap-4 overflow-hidden py-3">
                    <div v-for="(linha, idx) in linhas" :key="idx" class="flex items-center gap-3">
                        <div v-for="(item, i) in linha" :key="i" class="vault-surface relative p-4 w-36 h-36 flex flex-col justify-between">
                            <div class="absolute top-0 left-0 right-0 h-1" :style="{ background: item.nivel.cor }"></div>

                            <span class="vault-label block mt-2" :style="{ color: item.nivel.cor }">
                                {{ item.nivel.nome }}
                            </span>

                            <div class="border-t border-white/10 pt-2">
                                <span class="text-lg font-bold text-white">
                                    {{ moeda(item.valor) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const quantidade = useState("quantidade", () => 1);
const { niveis, caixas, moeda, chance, gerarLinha } = useGame();

const caixa = computed(() => {
    return caixas.find((c) => c.id === route.params.id);
});

const total = computed(() => {
    return moeda((caixa.value?.custo ?? 0) * quantidade.value);
});

const linhas = computed(() => {
    if (!caixa.value) return [];
    return Array.from({ length: quantidade.value }, () => gerarLinha(caixa.value!));
});
</script>
