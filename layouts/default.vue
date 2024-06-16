<script lang="ts" setup>
import {useLoadingStore} from "~/store/loading.store";
import {useAuthStore} from "~/store/auth.store";
import {account} from "~/lib/appwrite";

const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    loadingStore.set(true)
    const user = await account.get()
    if (user) authStore.set(user)
  } catch {
    await router.replace("/auth")
  } finally {
    loadingStore.set(false)
  }
})

</script>

<template>
  <LayoutLoader v-if="loadingStore.isLoading" />
  <section v-else :class="{ grid: authStore.isAuth }" style="min-height: 100vh; overflow-y: hidden">
    <LayoutSidebar v-if="authStore.isAuth" />
    <main class="bg-background">
      <div class="container mx-auto overflow-y-auto max-h-screen">
        <slot/>
      </div>
    </main>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
