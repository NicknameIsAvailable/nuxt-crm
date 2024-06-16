<script setup lang="ts">

import {useLoadingStore} from "~/store/loading.store";
import {account} from "~/lib/appwrite";
import {useAuthStore} from "~/store/auth.store";
import {ID} from "appwrite";

useHead({
  title: "Login | Nuxt CRM",
})

const emailRef = ref("")
const nameRef = ref("")
const passwordRef = ref("")

const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const router = useRouter()

const login = async () => {
  try {
    loadingStore.set(true)
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
    const response = await account.get()

    if (response) {
      const {email, name, status} = response

      authStore.set({
        email,
        name,
        status,
      })
    }

    emailRef.value = ""
    passwordRef.value = ""

    await router.push("/")
  } catch (e) {
    console.log(e)
  } finally {
    loadingStore.set(false)
  }
}

const register = async () => {
  try {
    loadingStore.set(true)
    await account.create(ID.unique(), emailRef.value, passwordRef.value, nameRef.value)
    await login()
  } catch (e) {
    console.log(e)
  } finally {
    loadingStore.set(false)
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <Card class="p-4 flex flex-col gap-4 w-80">
      <h1 class="text-2xl font-bold text-center">Auth</h1>
      <form class="flex flex-col gap-4">
        <Input placeholder="email" type="email" v-model="emailRef"/>
        <Input placeholder="name" type="text" v-model="nameRef"/>
        <Input placeholder="password" type="password" v-model="passwordRef"/>
        <div class="flex gap-4">
          <Button class="flex-1" @click="login">Login</Button>
          <Button class="flex-1" @click="register">Register</Button>
        </div>
      </form>
    </Card>
  </div>
</template>
