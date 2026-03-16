<template>
    <main class="flex-1 vault-container py-10 md:py-16 flex flex-col gap-10 md:gap-14">
        <div class="flex flex-col gap-3">
            <h1 class="vault-title text-5xl md:text-7xl">Mercado</h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <Card v-for="(caixa, i) in caixas" :key="caixa.id" :caixa="caixa" :index="i + 1" />
        </div>
    </main>
</template>

<script setup lang="ts">
const { caixas } = useGame();
</script>
