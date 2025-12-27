<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-20">
        <h1 class="text-7xl font-black uppercase italic">Mercado</h1>

        <div class="grid grid-cols-4 gap-4">
            <Card v-for="caixa in caixas" :key="caixa.id" :caixa="caixa" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame()
</script>