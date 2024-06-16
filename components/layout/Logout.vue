<script setup lang="ts">
import {account} from "~/lib/appwrite";
import {useAuthStore} from "~/store/auth.store";
import {useLoadingStore} from "~/store/loading.store";

const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const router = useRouter()

const logout = async () => {
  try {
    loadingStore.set(true)
    await account.deleteSession('current');
    authStore.clear()
    await router.push("/auth")
  } catch {
    await router.push("/")
  } finally {
    loadingStore.set(false)
  }
}
</script>

<template>
  <Button variant="destructive" @click="logout">
    <Icon name="line-md:logout" size="22"/>
  </Button>
</template>

<style scoped>

</style>