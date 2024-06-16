<script lang="ts" setup>
    import {MENU_DATA} from "./menu.data"
</script>

<template>
    <div class="flex-1 flex flex-col gap-4 justify-center">
        <NuxtLink 
            v-for="item in MENU_DATA"
            :key="item.name"
            :to="item.url"
        >
            <Button variant="ghost" class="w-full flex gap-2 text-base">
                <Icon :name="item.icon" />
                {{ item.name }}
            </Button>
        </NuxtLink>
    </div>
</template>

<style scoped>

</style>