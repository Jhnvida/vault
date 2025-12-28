<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-12">
        <NuxtLink to="/" class="flex items-center gap-4 vault-nav-link w-fit group">
            <Icon name="lucide:arrow-left" class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar</span>
        </NuxtLink>

        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-4 vault-surface p-12 space-y-10">
                <div class="space-y-4">
                    <h2 class="vault-title text-5xl">{{ caixa?.nome }}</h2>
                    <p class="vault-label">{{ caixa?.descricao }}</p>
                </div>

                <div class="space-y-6">
                    <h4 class="vault-label italic opacity-50">Taxas de Sucesso</h4>

                    <div class="space-y-3">
                        <div v-for="nivel in niveis" :key="nivel.nome"
                            class="flex justify-between items-center text-[10px] font-black uppercase">
                            <span class="flex items-center gap-4">
                                <div class="w-3 h-3 rounded-sm" :style="{ background: nivel.cor }"></div>
                                <span class="opacity-40 tracking-widest">{{ nivel.nome }}</span>
                            </span>
                            
                            <span class="font-mono opacity-50">{{ nivel.chance }}</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-6 pt-6 border-t border-white/5">
                    <div class="flex flex-col items-center gap-3">
                        <span class="vault-label">Unidades</span>

                        <div class="flex gap-2">
                            <button v-for="n in 5" :key="n"
                                class="w-11 h-11 bg-white/5 text-xs font-black transition-all hover:bg-white/10 opacity-30 focus:opacity-100 focus:bg-white/20">
                                {{ n }}
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-6 bg-white/5 rounded-sm">
                        <span class="vault-label">Investimento</span>
                        <span class="font-mono text-2xl font-bold text-white">${{ caixa?.custo }}</span>
                    </div>

                    <button class="vault-btn">Iniciar Execução</button>
                </div>
            </div>

            <div class="col-span-8">
                <div class="vault-surface h-full"></div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { niveis, caixas } = useGame();

const caixa = computed(() => {
    return caixas.find(c => c.id === route.params.id);
});
</script>