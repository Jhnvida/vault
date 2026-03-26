<template>
    <div class="vault-surface flex flex-col relative p-4 group">
        <div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg" :style="{ background: item.nivel.cor }" />

        <span class="text-[10px] font-semibold uppercase tracking-wider mb-3" :style="{ color: item.nivel.cor }">
            {{ item.nivel.nome }}
        </span>

        <div class="flex-1 flex items-center justify-center py-4">
            <Icon
                name="lucide:box"
                :style="{ color: item.nivel.cor }"
                class="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity"
            />
        </div>

        <div class="flex flex-col gap-2.5 pt-3 border-t border-border-subtle">
            <div class="flex flex-col gap-0.5">
                <span class="vault-label text-[10px]">Valor</span>
                <span class="text-sm font-bold text-text-primary tabular-nums">{{ moeda(item.valor) }}</span>
            </div>

            <button
                @click="$emit('vender', item)"
                class="w-full text-[10px] rounded-md bg-white/5 hover:bg-text-primary hover:text-surface-base py-2 transition-all uppercase font-semibold tracking-wider"
            >
                Vender
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/game";

defineProps<{ item: Item }>();
defineEmits<{ vender: [item: Item] }>();
</script>
