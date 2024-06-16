<script lang="ts" setup>
</script>

<template>
    <aside class="px-5 py-5 bg-background h-full relative w-full border-r border-r-border flex flex-col gap-4">
        <NuxtLink to="/" class="mb-10 block">
            <h1 class="text-4xl font-bold text-center">Nuxt CRM</h1>
        </NuxtLink>
        <LayoutMenu />
        <div class="flex">
          <LayoutLogout />
        </div>
    </aside>
</template>