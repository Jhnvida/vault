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
                                <div class="w-3 h-3" :style="{ background: nivel.cor }"></div>
                                <span class="opacity-40 tracking-widest">{{ nivel.nome }}</span>
                            </span>

                            <span class="font-mono opacity-50">{{ nivel.chance }}</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-6 pt-6 border-t border-white/5">
                    <div class="flex flex-col gap-4">
                        <span class="vault-label">Quantidade</span>

                        <div class="grid grid-cols-5 gap-2">
                            <button v-for="n in 5" :key="n" @click="quantidade = n"
                                class="h-12 text-sm font-mono font-bold transition-all duration-200 border"
                                :class="quantidade === n
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:bg-white/5'">
                                {{ n }}
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-6 bg-white/5">
                        <span class="vault-label">Investimento</span>
                        <span class="font-mono text-2xl font-bold text-white">${{ total }}</span>
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
const quantidade = useState('quantidade', () => 1);
const { niveis, caixas } = useGame();

const caixa = computed(() => {
    return caixas.find(c => c.id === route.params.id);
});

const total = computed(() => {
    return (caixa.value?.custo ?? 0) * quantidade.value;
});
</script>