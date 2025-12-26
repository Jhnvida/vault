<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-20">
        <div class="space-y-4">
            <h1 class="text-7xl font-black tracking-tighter uppercase italic">Mercado</h1>
            <p class="text-white/20 text-xl font-medium tracking-tight">Escolha seu vetor de entrada. O risco define a recompensa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card v-for="caixa in caixas" :key="caixa.id" :caixa="caixa" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame()
</script>