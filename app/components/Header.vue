<template>
    <header class="px-10 py-8 border-b border-white/5 bg-vault-bg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <NuxtLink to="/" class="nav-label">Vault</NuxtLink>

            <nav class="flex items-center gap-8">
                <NuxtLink to="/" class="nav-link" active-class="nav-ativo">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="nav-link" active-class="nav-ativo">Inventário</NuxtLink>
            </nav>

            <div class="flex flex-col items-end">
                <span class="saldo-label">Saldo Disponível</span>
                <span class="saldo-valor">$0,00</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.nav-label {
    @apply text-2xl uppercase italic font-black;
}

.nav-link {
    @apply text-[10px] uppercase font-black tracking-[0.3em] opacity-30 hover:opacity-100 transition-all no-underline;
}

.nav-ativo {
    @apply opacity-100 text-white;
}

.saldo-label {
    @apply text-[10px] uppercase font-black tracking-[0.2em] opacity-20;
}

.saldo-valor {
    @apply text-white text-2xl font-bold tracking-tighter;
}
</style>