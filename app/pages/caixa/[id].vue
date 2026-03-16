<template>
    <main class="flex-1 vault-container py-8 md:py-12 flex flex-col gap-8">
        <NuxtLink to="/" class="flex items-center gap-2 vault-nav-link w-fit group">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Mercado</span>
        </NuxtLink>

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div class="flex flex-col gap-1.5">
                <h1 class="vault-title text-3xl md:text-4xl">{{ caixa?.nome }}</h1>
                <p class="text-sm text-text-tertiary leading-relaxed">{{ caixa?.descricao }}</p>
            </div>
            <div class="flex flex-col items-start sm:items-end gap-0.5 shrink-0">
                <span class="vault-label text-[11px]">Custo por unidade</span>
                <span class="text-2xl font-bold text-text-primary tabular-nums">{{ moeda(caixa?.custo ?? 0) }}</span>
            </div>
        </div>

        <div class="flex flex-col gap-3">
            <RouletteStrip v-for="(strip, i) in strips" :key="i" :items="strip" :active="girando || aberto" :finalizado="aberto" />

            <div v-if="strips.length === 0" class="vault-surface rounded-xl h-56 md:h-60 flex items-center justify-center">
                <div class="flex flex-col items-center gap-3">
                    <Icon name="lucide:box" class="w-8 h-8 text-text-muted" />
                    <span class="vault-label">Aguardando abertura</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="vault-surface p-5 flex flex-col gap-4">
                <h4 class="vault-label border-b border-border-subtle pb-3">Lote de Abertura</h4>
                <div class="grid grid-cols-5 gap-2">
                    <button
                        v-for="n in [1, 2, 3, 5, 10]"
                        :key="n"
                        @click="qtd = n"
                        class="h-10 vault-btn-outline"
                        :class="{ active: qtd === n }"
                    >
                        {{ n }}
                    </button>
                </div>
            </div>

            <div class="vault-surface p-5 flex flex-col gap-4">
                <h4 class="vault-label border-b border-border-subtle pb-3">Resumo da Ordem</h4>
                <div class="flex items-center justify-between gap-4 flex-1">
                    <div class="flex flex-col gap-0.5">
                        <span class="text-2xl font-bold text-text-primary tabular-nums">{{ moeda(total) }}</span>
                        <span class="text-xs text-text-muted">{{ qtd }}x {{ moeda(caixa?.custo ?? 0) }}</span>
                    </div>
                    <button
                        @click="abrir"
                        class="vault-btn disabled:opacity-20 disabled:grayscale shrink-0"
                        :disabled="!podeCom || girando"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>

        <div class="vault-surface p-5 flex flex-col gap-5">
            <h4 class="vault-label border-b border-border-subtle pb-3">Probabilidades</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                <div v-for="n in niveis" :key="n.nome" class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-sm shrink-0" :style="{ background: n.cor }" />
                        <span class="text-[10px] font-semibold uppercase tracking-wider" :style="{ color: n.cor }">{{ n.nome }}</span>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <span class="text-sm font-bold text-text-primary tabular-nums">{{ chance(n.chance) }}</span>
                        <span class="text-[10px] text-text-muted tabular-nums">×{{ n.multiplicador }}</span>
                    </div>
                    <div class="h-px rounded-full bg-border-subtle overflow-hidden">
                        <div
                            class="h-full rounded-full"
                            :style="{ background: n.cor, width: `${Math.min((n.chance / 75) * 100, 100)}%` }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { Item } from "~/composables/useGame";

const route = useRoute();
const qtd = ref(1);
const girando = ref(false);
const aberto = ref(false);
const strips = ref<Item[][]>([]);

const { saldo, niveis, caixas, gerarLinha, moeda, chance, comprar, adicionar } = useGame();

const caixa = computed(() => caixas.find((c) => c.id === route.params.id));
const total = computed(() => (caixa.value?.custo ?? 0) * qtd.value);
const podeCom = computed(() => saldo.value >= total.value);

watch(
    () => route.params.id,
    () => {
        qtd.value = 1;
        strips.value = [];
        girando.value = false;
        aberto.value = false;
    },
);

const abrir = async () => {
    if (!caixa.value || !podeCom.value || girando.value) return;
    if (!comprar(total.value)) return;

    girando.value = false;
    aberto.value = false;
    strips.value = [];

    await nextTick();
    const novas = Array.from({ length: qtd.value }, () => gerarLinha(caixa.value!));
    strips.value = novas;

    setTimeout(() => {
        girando.value = true;
    }, 50);

    setTimeout(() => {
        novas.forEach((s) => adicionar(s[45]!));
        girando.value = false;
        aberto.value = true;
    }, 4600);
};
</script>
