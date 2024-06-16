<script setup lang="ts">
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "~/components/ui/dialog";
import type {IDeal} from "~/types/deals.types";
import {type MutationFunction, useMutation} from "@tanstack/vue-query";
import {DB} from "~/lib/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import {ID} from "appwrite";
import type {MaybeRefDeep} from "@tanstack/vue-query/build/modern/types";
interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customers: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: ''
  }, refetch: {
    type: Function,
  }
})

const { handleSubmit, defineField } = useForm<IDealFormState>({
  initialValues: {
    status: props.status
  }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customers.email')
const [customerName, customerNameAttrs] = defineField('customers.name')

const {mutate, isPending} = useMutation({
  mutationKey: ['create a new deal'],
  mutationFn: (data: IDealFormState): MaybeRefDeep<MutationFunction<IDealFormState, IDealFormState> | undefined> =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, ID.unique(), data),
  onSuccess: () => {
    props.refetch && props.refetch()
  }
})

const onSubmit = handleSubmit(async (data: IDealFormState) => {
  console.log(data)
  mutate(data);
})

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm" variant="outline" class="w-full flex gap-2">
        Add a new deal
        <Icon name="material-symbols:add"/>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Create deal
        </DialogTitle>
      </DialogHeader>
      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <Input v-model="name" placeholder="Name" v-bind="nameAttrs" type="text"/>
        <Input v-model="price" placeholder="Price" v-bind="priceAttrs" type="number"/>
        <Input v-model="customerEmail" placeholder="Customer E-Mail" v-bind="customerEmailAttrs" type="email"/>
        <Input v-model="customerName" placeholder="Customer name" v-bind="customerNameAttrs" type="text"/>
        <DialogFooter>
          <Button :disabled="isPending">{{ isPending ? "Saving..." : "Save" }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>