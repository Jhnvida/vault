<template>
    <main class="flex-1 vault-container py-8 md:py-12 space-y-8 md:space-y-12">
        <NuxtLink to="/" class="flex items-center gap-3 vault-nav-link w-fit group">
            <Icon name="lucide:chevron-left" class="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Mercado</span>
        </NuxtLink>

        <div class="w-full flex flex-col gap-4 overflow-hidden py-4">
            <div
                v-for="(linha, lIndex) in linhas"
                :key="lIndex"
                class="relative w-full h-60 md:h-64 bg-white/2 border-y border-white/5 flex items-center overflow-hidden"
            >
                <div class="absolute left-1/2 top-0 bottom-0 w-px bg-white/50 z-20 pointer-events-none -translate-x-1/2"></div>

                <div
                    class="flex gap-3 px-[50%] transition-transform duration-[4.5s] ease-[cubic-bezier(0.15, 0, 0.05, 1)]"
                    :style="
                        girando || finalizado
                            ? { transform: `translateX(calc(-45 * (160px + 12px) - 80px))` }
                            : { transform: 'translateX(0px)' }
                    "
                >
                    <div
                        v-for="(item, iIndex) in linha"
                        :key="item.id"
                        class="vault-surface w-40 h-48 md:h-52 shrink-0 flex flex-col relative p-5 transition-all duration-700"
                        :class="[
                            (girando || finalizado) && iIndex !== 45 ? 'opacity-10 grayscale scale-95' : 'opacity-100 scale-100',
                            finalizado && iIndex === 45 ? 'border-white/30 ring-1 ring-inset ring-white/10' : '',
                        ]"
                    >
                        <div class="absolute top-0 left-0 right-0 h-1" :style="{ background: item.nivel.cor }"></div>

                        <span class="text-[9px] font-black uppercase tracking-tighter" :style="{ color: item.nivel.cor }">
                            {{ item.nivel.nome }}
                        </span>

                        <div class="flex-1 flex items-center justify-center py-4">
                            <Icon
                                name="lucide:box"
                                :style="{ color: item.nivel.cor }"
                                class="w-10 h-10 transition-all duration-1000"
                                :class="finalizado && iIndex === 45 ? 'opacity-100' : 'opacity-40'"
                            />
                        </div>

                        <div class="mt-2 pt-4 border-t border-white/5 flex flex-col gap-1">
                            <span class="vault-label text-[8px] opacity-40">Valor Estimado</span>
                            <span class="text-xs font-black text-white italic">{{ moeda(item.valor) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 space-y-12">
                <div class="space-y-4">
                    <h2 class="vault-title text-4xl md:text-5xl">{{ caixa?.nome }}</h2>
                    <p class="text-gray-500 leading-relaxed text-sm max-w-2xl">{{ caixa?.descricao }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-6">
                        <h4 class="vault-label border-b border-white/5 pb-3">Probabilidades</h4>

                        <div class="space-y-4">
                            <div v-for="nivel in niveis" :key="nivel.nome" class="flex justify-between items-center group/prob">
                                <span class="flex items-center gap-3">
                                    <div class="w-1.5 h-1.5 rotate-45" :style="{ background: nivel.cor }"></div>
                                    <span
                                        class="text-[10px] font-black uppercase text-gray-400 group-hover/prob:text-white transition-colors"
                                        >{{ nivel.nome }}</span
                                    >
                                </span>

                                <span class="text-[10px] font-mono text-gray-500">{{ chance(nivel.chance) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <h4 class="vault-label border-b border-white/5 pb-3">Lote de Abertura</h4>

                        <div class="grid grid-cols-5 gap-2">
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
            </div>

            <div class="flex flex-col gap-6">
                <div class="vault-surface p-8 space-y-8">
                    <div class="space-y-6">
                        <h4 class="vault-label border-b border-white/5 pb-3">Resumo da Ordem</h4>

                        <div class="space-y-4">
                            <div class="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
                                <span>Quantidade</span>
                                <span class="text-white">{{ quantidade }}x</span>
                            </div>

                            <div class="flex justify-between items-end">
                                <span class="vault-label opacity-40">Total</span>
                                <span class="text-3xl font-black italic tracking-tighter text-white">{{ moeda(total) }}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        @click="abrirCaixa"
                        class="vault-btn w-full disabled:opacity-20 disabled:grayscale transition-all"
                        :disabled="!compravel || girando"
                    >
                        <span>Confirmar</span>
                    </button>
                </div>
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

const caixa = computed(() => caixas.find((c) => c.id === route.params.id));
const total = computed(() => (caixa.value?.custo ?? 0) * quantidade.value);
const compravel = computed(() => (saldo.value ?? 0) >= total.value);

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
        }, 4600);
    }
};
</script>
