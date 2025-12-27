<template>
    <header class="px-10 py-8 border-b border-white/5 bg-vault-bg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <NuxtLink to="/" class="text-2xl uppercase italic font-black">Vault</NuxtLink>

            <nav class="flex items-center gap-8">
                <NuxtLink to="/" class="nav-link" active-class="nav-ativo">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="nav-link" active-class="nav-ativo">Inventário</NuxtLink>
            </nav>

            <div class="flex flex-col items-end">
                <span class="text-[12px] uppercase font-black opacity-30">Saldo Disponível</span>
                <span class="text-white text-2xl font-bold">${{ saldo.toFixed(2) }}</span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { saldo } = useGame();
</script>

<style scoped>
@reference "~/assets/css/main.css";

.nav-link {
    @apply text-[12px] uppercase font-black opacity-30 hover:opacity-100 transition-all no-underline;
}

.nav-ativo {
    @apply opacity-100 text-white;
}
</style>