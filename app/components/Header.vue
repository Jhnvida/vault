<template>
    <header class="w-full border-b border-white/10 bg-[#020202] sticky top-0 z-50">
        <div class="vault-container h-20 flex items-center justify-between">
            <NuxtLink to="/" class="vault-title text-xl no-underline">Vault</NuxtLink>

            <nav class="hidden md:flex items-center gap-10">
                <NuxtLink to="/" class="vault-nav-link" active-class="vault-nav-active">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="vault-nav-link" active-class="vault-nav-active">Inventário</NuxtLink>
            </nav>

            <div class="flex flex-col items-end">
                <span class="vault-label opacity-40">Saldo</span>
                <span class="text-white text-lg font-black italic tracking-tighter">{{ moeda(saldo) }}</span>
            </div>
        </div>

        <nav class="flex md:hidden border-t border-white/5 items-center justify-around py-3 bg-white/2">
            <NuxtLink to="/" class="vault-nav-link text-[9px]" active-class="vault-nav-active"><span>Mercado</span></NuxtLink>
            <NuxtLink to="/inventario" class="vault-nav-link text-[9px]" active-class="vault-nav-active"><span>Inventário</span></NuxtLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
const { saldo, moeda } = useGame();
</script>
