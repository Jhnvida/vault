<template>
    <main class="flex-1 vault-container py-16 space-y-16">
        <div class="space-y-4">
            <h1 class="vault-title text-7xl">Inventário</h1>
            <p class="text-gray-500 text-lg max-w-xl">Visualização de todos os itens e recursos processados pelo sistema.</p>
        </div>

        <div v-for="item in inventario">
            {{ item.valor }}
        </div>
    </main>
</template>

<script setup lang="ts">
const { inventario } = useGame();
</script>
