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

                            <span class="text-xs text-gray-500">{{ chance(nivel.chance) }}</span>
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
                        <span class="text-2xl font-bold uppercase text-white">{{ moeda(total) }}</span>
                    </div>
                </div>
                <button
                    @click="abrirCaixa"
                    class="vault-btn w-full disabled:opacity-30 disabled:grayscale transition-all duration-300"
                    :disabled="!compravel || girando"
                >
                    Confirmar
                </button>
            </div>

            <div class="col-span-8">
                <div class="vault-surface relative w-full min-h-full flex flex-col items-center justify-center gap-4 overflow-hidden py-3">
                    <div class="absolute top-0 bottom-0 w-0.5 h-full bg-white/5"></div>

                    <div v-for="(linha, index) in linhas" :key="index" class="flex items-center gap-3">
                        <div v-for="(item, index) in linha" :key="index" class="vault-surface w-40 h-52 flex flex-col relative p-4">
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
const girando = useState("girando", () => false);
const linhas = useState<Item[][]>("linhas", () => []);

const { saldo, niveis, caixas, gerarLinha, moeda, chance, processarCompra, adicionarInventario } = useGame();

const caixa = computed(() => {
    return caixas.find((c) => c.id === route.params.id);
});

const total = computed(() => {
    return (caixa.value?.custo ?? 0) * quantidade.value;
});

const compravel = computed(() => {
    return (saldo.value ?? 0) >= total.value;
});

const abrirCaixa = () => {
    if (!caixa.value || !compravel.value || girando.value) return;

    if (processarCompra(total.value)) {
        const novas = Array.from({ length: quantidade.value }, () => gerarLinha(caixa.value!));

        linhas.value = novas;
        girando.value = true;

        setTimeout(() => {
            girando.value = false;

            novas.forEach((linha) => {
                const vencedor = linha[45];
                adicionarInventario(vencedor!);
            });
        }, 4000);
    }
};
</script>
