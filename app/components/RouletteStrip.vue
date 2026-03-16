<template>
    <div class="relative w-full h-56 md:h-60 bg-surface-raised border border-border-default flex items-center overflow-hidden rounded-xl">
        <div class="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-surface-raised to-transparent z-10 pointer-events-none" />
        <div class="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-surface-raised to-transparent z-10 pointer-events-none" />

        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center">
            <div class="w-px flex-1 bg-white/15" />

            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-white/50 rounded-b-sm"
                style="clip-path: polygon(50% 100%, 0 0, 100% 0)"
            />

            <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-white/50 rounded-t-sm"
                style="clip-path: polygon(50% 0%, 0 100%, 100% 100%)"
            />
        </div>

        <div
            class="flex gap-3 px-[50%] transition-transform duration-[4.5s] ease-[cubic-bezier(0.15,0,0.05,1)]"
            :style="active ? { transform: `translateX(calc(-45 * (160px + 12px) - 80px))` } : { transform: 'translateX(0px)' }"
        >
            <div
                v-for="(item, i) in items"
                :key="item.id"
                class="vault-surface w-40 h-44 md:h-48 shrink-0 flex flex-col relative p-4 transition-all duration-700"
                :class="[
                    active && i !== 45 ? 'opacity-10 grayscale scale-95' : 'opacity-100 scale-100',
                    finalizado && i === 45 ? 'border-border-strong ring-1 ring-inset ring-white/10 scale-105' : '',
                ]"
            >
                <div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg" :style="{ background: item.nivel.cor }" />

                <span class="text-[10px] font-semibold uppercase tracking-wider" :style="{ color: item.nivel.cor }">
                    {{ item.nivel.nome }}
                </span>

                <div class="flex-1 flex items-center justify-center">
                    <Icon
                        name="lucide:box"
                        :style="{ color: item.nivel.cor }"
                        class="w-7 h-7 transition-all duration-1000"
                        :class="finalizado && i === 45 ? 'opacity-100' : 'opacity-40'"
                    />
                </div>

                <div class="pt-2.5 border-t border-border-subtle flex flex-col gap-0.5">
                    <span class="vault-label text-[10px]">Valor</span>
                    <span class="text-xs font-bold text-text-primary tabular-nums">{{ moeda(item.valor) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Item } from "~/composables/useGame";
const { moeda } = useGame();

defineProps<{
    items: Item[];
    active: boolean;
    finalizado: boolean;
}>();
</script>
