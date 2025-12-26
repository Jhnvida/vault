<template>
    <main class="flex-1 max-w-7xl mx-auto w-full p-10 space-y-20">
        <div class="space-y-4">
            <h1 class="text-7xl font-black tracking-tighter uppercase italic">Mercado</h1>
            <p class="text-white/20 text-xl font-medium tracking-tight">Escolha seu vetor de entrada. O risco define a recompensa.</p>
        </div>

        <div class="grid grid-cols-4 gap-4">
            <div class="bg-[#0c0c0c] p-10 cursor-pointer flex flex-col justify-between min-h-[380px] border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:-translate-y-1" v-for="caixa in caixas" :key="caixa.id">
                <div class="space-y-4">
                    <div class="w-12 h-12 bg-white/5 flex items-center justify-center">
                        <Icon name="lucide:box" class="w-5 h-5 opacity-40" />
                    </div>

                    <div class="space-y-2">
                        <h3 class="text-2xl font-black tracking-tighter uppercase">{{ caixa.nome }}</h3>
                        <p class="text-[11px] text-white/30 font-bold uppercase">{{ caixa.desc }}</p>
                    </div>
                </div>

                <div class="flex justify-between items-end border-t border-white/5 pt-8">
                    <span class="text-xl font-bold text-white">${{ caixa.valor }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
interface Caixa {
    id: string;
    nome: string;
    valor: number;
    desc?: string;
}

const caixas: Caixa[] = [
    {
        id: 'alpha',
        nome: 'Caixa Alpha',
        valor: 25,
        desc: 'Ponto de entrada para processamento de ativos.'
    },
    {
        id: 'beta',
        nome: 'Caixa Beta',
        valor: 80,
        desc: 'Equilíbrio entre custo e probabilidade.'
    },
    {
        id: 'gamma',
        nome: 'Caixa Gamma',
        valor: 200,
        desc: 'Filtros avançados para ativos raros.'
    },
    {
        id: 'delta',
        nome: 'Caixa Delta',
        valor: 550,
        desc: 'Extração de alta performance para investidores.'
    },
    {
        id: 'omega',
        nome: 'Caixa Omega',
        valor: 1500,
        desc: 'Potencial massivo de retorno de capital.'
    }
];
</script>