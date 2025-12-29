<template>
    <NuxtLink
        :to="`/caixa/${caixa.id}`"
        class="vault-surface vault-surface-hover p-8 cursor-pointer flex flex-col justify-between min-h-80 no-underline text-white group"
    >
        <div class="space-y-6">
            <div class="flex justify-between items-start">
                <div class="vault-icon-box group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Icon name="lucide:box" class="w-5 h-5" />
                </div>
            </div>

            <div class="space-y-2">
                <h3 class="vault-title text-2xl">{{ caixa.nome }}</h3>
                <p class="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{{ caixa.descricao }}</p>
            </div>
        </div>

        <div class="flex justify-between items-center border-t border-white/10 pt-6 mt-4">
            <span class="vault-label text-gray-600">Custo</span>
            <span class="text-xl font-bold text-white">${{ caixa.custo }}</span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Caixa } from "~/composables/useGame";
defineProps<{ caixa: Caixa }>();
</script>
