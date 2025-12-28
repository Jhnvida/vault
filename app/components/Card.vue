<template>
    <NuxtLink :to="`/caixa/${caixa.id}`"
        class="vault-surface vault-surface-hover p-10 cursor-pointer flex flex-col justify-between min-h-96 no-underline text-white">
        <div class="space-y-6">
            <div class="vault-icon-box">
                <Icon name="lucide:box" class="w-5 h-5 opacity-40" />
            </div>

            <div class="space-y-2">
                <h3 class="vault-title text-2xl">{{ caixa.nome }}</h3>
                <p class="vault-label">{{ caixa.descricao }}</p>
            </div>
        </div>

        <div class="flex justify-between items-end border-t border-white/5 pt-8 mt-4">
            <span class="text-xl font-bold text-white">${{ caixa.custo }}</span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Caixa } from '~/composables/useGame';
defineProps<{ caixa: Caixa }>();
</script>