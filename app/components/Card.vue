<template>
    <NuxtLink
        :to="`/caixa/${caixa.id}`"
        class="vault-surface vault-surface-hover p-6 md:p-8 cursor-pointer flex flex-col justify-between min-h-70 no-underline group"
    >
        <div class="space-y-6">
            <div
                class="w-10 h-10 border border-white/3 flex items-center justify-center text-gray-700 group-hover:text-white transition-colors"
            >
                <Icon name="lucide:box" class="w-4 h-4" />
            </div>

            <div class="space-y-2">
                <h3 class="vault-title text-xl text-white">{{ caixa.nome }}</h3>

                <p class="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                    {{ caixa.descricao }}
                </p>
            </div>
        </div>

        <div class="flex justify-between items-end border-t border-white/3 pt-6 mt-4">
            <div class="flex flex-col">
                <span class="vault-label opacity-40 mb-1">Custo</span>

                <span class="text-lg font-black text-white italic tracking-tighter">
                    {{ moeda(caixa.custo) }}
                </span>
            </div>

            <Icon name="lucide:arrow-right" class="w-3 h-3 text-gray-800 group-hover:text-white transition-all" />
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Caixa } from "~/composables/useGame";
const { moeda } = useGame();

defineProps<{ caixa: Caixa }>();
</script>
