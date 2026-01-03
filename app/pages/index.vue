<template>
    <main class="flex-1 vault-container py-12 md:py-24 space-y-12 md:space-y-24">
        <div class="space-y-4 max-w-xl">
            <h1 class="vault-title text-5xl md:text-8xl">Mercado</h1>
            <p class="text-gray-600 text-sm md:text-base leading-relaxed">Adquira caixas e gerencie seus recursos de forma eficiente.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            <Card v-for="caixa in caixas" :key="caixa.id" :caixa="caixa" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame();
</script>
