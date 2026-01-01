<template>
    <header class="w-full border-b border-white/10 bg-[#050505]">
        <div class="vault-container h-24 flex items-center justify-between">
            <NuxtLink to="/" class="vault-title text-2xl no-underline">Vault</NuxtLink>

            <nav class="flex items-center gap-10">
                <NuxtLink to="/" class="vault-nav-link" active-class="vault-nav-active">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="vault-nav-link" active-class="vault-nav-active">Inventário</NuxtLink>
            </nav>

            <div class="flex flex-col items-end">
                <span class="vault-label mb-1">Saldo</span>
                <span class="text-white text-2xl font-bold">{{ moeda(saldo) }}</span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { saldo, moeda } = useGame();
</script>
