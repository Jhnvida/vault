<template>
    <main class="flex-1 vault-container py-16 space-y-16">
        <div class="space-y-4">
            <h1 class="vault-title text-7xl">Mercado</h1>
            <p class="text-gray-500 text-lg max-w-xl">Adquira caixas e gerencie seus recursos de forma eficiente.</p>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <Card v-for="caixa in caixas" :key="caixa.id" :caixa="caixa" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame();
</script>
