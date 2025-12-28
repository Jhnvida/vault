<template>
    <header class="px-10 py-8 border-b border-white/5">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <NuxtLink to="/" class="vault-title text-2xl text-white no-underline">Vault</NuxtLink>

            <nav class="flex items-center gap-8">
                <NuxtLink to="/" class="vault-nav-link" active-class="vault-nav-active">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="vault-nav-link" active-class="vault-nav-active">Inventário</NuxtLink>
            </nav>

            <div class="flex flex-col items-end">
                <span class="vault-label">Saldo Disponível</span>
                <span class="text-white text-2xl font-bold">${{ saldo }}</span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { saldo } = useGame();
</script>