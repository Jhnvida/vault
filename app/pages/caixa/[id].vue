<template>
    <main class="flex-1 vault-container py-12 space-y-12">
        <NuxtLink to="/" class="flex items-center gap-3 vault-nav-link w-fit group">
            <Icon name="lucide:arrow-left" class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Mercado</span>
        </NuxtLink>

        <div class="w-full flex flex-col gap-6 overflow-hidden py-4">
            <div
                v-for="(linha, lIndex) in linhas"
                :key="lIndex"
                class="relative w-full h-60 bg-black/20 border-y border-white/5 flex items-center overflow-hidden"
            >
                <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 z-10 pointer-events-none"></div>

                <div
                    class="flex gap-3 px-[50%] transition-transform duration-4000 ease-[cubic-bezier(0.1, 0, 0, 1)]"
                    :style="
                        girando || finalizado
                            ? { transform: `translateX(calc(-45 * (160px + 12px) - 80px))` }
                            : { transform: 'translateX(0px)' }
                    "
                >
                    <div
                        v-for="(item, iIndex) in linha"
                        :key="item.id"
                        class="vault-surface w-40 h-52 shrink-0 flex flex-col relative p-4"
                        :class="{ 'opacity-40': (girando || finalizado) && iIndex !== 45 && linhas.length > 0 }"
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
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <div class="space-y-10">
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
                            v-for="n in [1, 2, 3, 5, 10]"
                            :key="n"
                            @click="quantidade = n"
                            class="h-10 vault-btn-outline"
                            :class="{ active: quantidade === n }"
                        >
                            {{ n }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col justify-between">
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
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const quantidade = ref(1);
const girando = ref(false);
const finalizado = ref(false);
const linhas = ref<Item[][]>([]);

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

watch(
    () => route.params.id,
    () => {
        quantidade.value = 1;
        linhas.value = [];
        girando.value = false;
        finalizado.value = false;
    }
);

const abrirCaixa = async () => {
    if (!caixa.value || !compravel.value || girando.value) return;

    if (processarCompra(total.value)) {
        girando.value = false;
        finalizado.value = false;
        linhas.value = [];

        await nextTick();

        const novas = Array.from({ length: quantidade.value }, () => gerarLinha(caixa.value!));
        linhas.value = novas;

        setTimeout(() => {
            girando.value = true;
        }, 50);

        setTimeout(() => {
            novas.forEach((linha) => {
                const vencedor = linha[45];
                adicionarInventario(vencedor!);
            });

            girando.value = false;
            finalizado.value = true;
        }, 4100);
    }
};
</script>
