<template>
    <header class="w-full border-b border-border-default bg-surface-base/95 backdrop-blur-md sticky top-0 z-50">
        <div class="vault-container h-16 flex items-center justify-between gap-6">
            <NuxtLink to="/" class="no-underline group shrink-0">
                <span class="vault-title text-base">Vault</span>
            </NuxtLink>

            <nav class="hidden md:flex items-center gap-6 flex-1 justify-center">
                <NuxtLink to="/" class="vault-nav-link" active-class="vault-nav-active">Mercado</NuxtLink>
                <NuxtLink to="/inventario" class="vault-nav-link" active-class="vault-nav-active">Inventário</NuxtLink>
            </nav>

            <div class="vault-surface flex items-center gap-2.5 px-3.5 py-2 rounded-lg shrink-0">
                <Icon name="lucide:wallet" class="w-3.5 h-3.5 text-text-muted" />
                <span class="text-sm font-bold text-text-primary tabular-nums">{{ moeda(saldo) }}</span>
            </div>
        </div>

        <nav class="flex md:hidden border-t border-border-subtle bg-surface-raised">
            <NuxtLink
                to="/"
                class="vault-nav-link flex flex-col items-center gap-1 py-3 flex-1 text-center"
                active-class="vault-nav-active"
            >
                <Icon name="lucide:shopping-bag" class="w-4 h-4" />
                <span class="text-[10px]">Mercado</span>
            </NuxtLink>
            <NuxtLink
                to="/inventario"
                class="vault-nav-link flex flex-col items-center gap-1 py-3 flex-1 text-center"
                active-class="vault-nav-active"
            >
                <Icon name="lucide:package" class="w-4 h-4" />
                <span class="text-[10px]">Inventário</span>
            </NuxtLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
const { saldo, moeda } = useGame();
</script>
