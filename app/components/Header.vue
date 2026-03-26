<template>
    <header class="w-full sticky top-0 z-50 bg-surface-base/95 backdrop-blur-md border-b border-border-default">
        <div class="h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

        <div class="vault-container h-14 flex items-center justify-between gap-4">
            <NuxtLink to="/" class="no-underline shrink-0">
                <span class="vault-title text-base">Vault</span>
            </NuxtLink>

            <nav class="hidden md:flex items-center gap-1">
                <NuxtLink to="/" class="vault-nav-item" exact-active-class="vault-nav-active">
                    <Icon name="lucide:shopping-bag" class="w-3.5 h-3.5 shrink-0" />
                    <span>Mercado</span>
                </NuxtLink>

                <NuxtLink to="/inventario" class="vault-nav-item" exact-active-class="vault-nav-active">
                    <Icon name="lucide:package" class="w-3.5 h-3.5 shrink-0" />
                    <span>Inventário</span>
                </NuxtLink>
            </nav>

            <div class="vault-surface flex items-center gap-2.5 px-3.5 py-2 rounded-lg shrink-0">
                <Icon name="lucide:wallet" class="w-3.5 h-3.5 text-text-muted" />
                <span class="text-sm font-bold text-text-primary tabular-nums">{{ moeda(saldo) }}</span>
            </div>
        </div>

        <nav class="flex md:hidden border-t border-border-subtle px-3 py-2 gap-2">
            <NuxtLink to="/" class="vault-nav-item flex-1 justify-center" exact-active-class="vault-nav-active">
                <Icon name="lucide:shopping-bag" class="w-3.5 h-3.5 shrink-0" />
                <span>Mercado</span>
            </NuxtLink>

            <NuxtLink to="/inventario" class="vault-nav-item flex-1 justify-center" exact-active-class="vault-nav-active">
                <Icon name="lucide:package" class="w-3.5 h-3.5 shrink-0" />
                <span>Inventário</span>
            </NuxtLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
const { saldo } = useBalance();
</script>
