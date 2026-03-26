<template>
    <NuxtLink
        :to="`/caixa/${caixa.id}`"
        class="vault-surface vault-surface-hover p-5 flex flex-col justify-between min-h-52 no-underline group"
    >
        <div class="flex justify-between items-start">
            <div
                class="w-8 h-8 rounded border border-border-subtle flex items-center justify-center group-hover:border-border-strong transition-colors"
            >
                <Icon name="lucide:box" class="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
            </div>
            <span class="text-[11px] font-mono text-text-muted tabular-nums">{{ String(index).padStart(2, "0") }}</span>
        </div>

        <div class="flex flex-col gap-1 mt-4">
            <h3 class="vault-title text-lg">{{ caixa.nome }}</h3>
            <p class="text-xs text-text-tertiary leading-relaxed line-clamp-2">{{ caixa.descricao }}</p>
        </div>

        <div>
            <span class="vault-label text-[10px]">Custo</span>
            <p class="text-sm font-bold text-text-primary tabular-nums mt-0.5">{{ moeda(caixa.custo) }}</p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Caixa } from "~/types/game";

defineProps<{ caixa: Caixa; index: number }>();
</script>
