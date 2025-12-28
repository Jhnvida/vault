<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-16">
        <div class="space-y-2">
            <h1 class="vault-title text-7xl">Mercado</h1>
            <p class="vault-label text-sm opacity-40">Adquira caixas misteriosas e multiplique seus recursos</p>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <Card v-for="caixa in caixas" :key="caixa.id" :caixa="caixa" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame()
</script>