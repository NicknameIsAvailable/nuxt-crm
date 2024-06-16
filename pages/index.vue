<script setup lang="ts">
  import {type IColumn, type ICard} from "~/components/kanban/types.kanban";
  import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";
  import dayjs from "dayjs"
  import {cn, convertCurrency} from "~/lib/utils";
  import {Badge} from "~/components/ui/badge";
  import CreateDeal from "~/components/kanban/CreateDeal.vue";
  useSeoMeta({
    title: "Home | Nuxt CRM"
  })
  const dragCardRef = ref<ICard | null>(null)
  const sourceColumnRef = ref<IColumn | null>(null)
  const { data, isLoading, refetch } = useKanbanQuery()
</script>

<template>
    <div class="pt-4 flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Nuxt CRM</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <div class="grid grid-cols-5">
            <Card :class="cn(index === 0 && 'rounded-l-lg', data && index === data?.length - 1 && 'rounded-r-lg', 'rounded-none backdrop-blur-md bg-opacity-30')" v-for="(column, index) in data" :key="index">
              <CardHeader class="flex justify-between">
                <Badge class="w-full flex justify-center items-center">
                  {{ column.name }}
                </Badge>
                <CreateDeal :refetch="refetch" :status="column.id" />
              </CardHeader>
              <CardContent class="flex flex-col gap-2">
                <Card draggable="true" v-for="card in column.items" :key="card.id">
                  <CardHeader role="button">{{ card.name }}</CardHeader>
                  <CardContent>
                    <span>
                      {{ card.companyName }}
                    </span>
                  </CardContent>
                  <CardFooter class="flex flex-col gap-2 justify-start items-start">
                    <span>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</span>
                    <Badge>{{ convertCurrency(card.price) }}</Badge>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </div>

        </div>
    </div>
</template>

<style scoped>

</style>