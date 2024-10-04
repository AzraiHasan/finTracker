<template>
  <UForm :state="formState" :schema="transactionSchema" @submit="onSubmit">
    <UFormGroup label="Date" name="date" class="mb-6">
      <UInput v-model="formState.date" type="date" size="lg" />
    </UFormGroup>

    <UFormGroup label="Amount (MYR)" name="amount" class="mb-6">
      <UInput v-model="formState.amount" type="number" step="0.05" size="lg" />
    </UFormGroup>

    <UFormGroup label="Transaction Type" name="type" class="mb-6">
      <USelect v-model="formState.type" :options="types" size="lg" />
    </UFormGroup>

    <UFormGroup label="Notes" name="notes" class="mb-6">
      <UTextarea v-model="formState.notes" size="lg" />
    </UFormGroup>

    <UButton type="submit" size="lg">Submit</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { transactionSchema, type TransactionFormData } from '~/schemas/TransactionSchema';
import { useForm } from '@/composables/useForm';

const types = ['Cash In', 'Cash Out'] as const;

const initialState: TransactionFormData = {
  date: new Date().toISOString().split('T')[0],
  amount: 0,
  type: 'Cash In',
  notes: ''
};

const { formState, onSubmit } = useForm<TransactionFormData>(initialState, {
  schema: transactionSchema,
  onSubmit: async (data) => {
    console.log('Validated data:', data);
    // Here you would typically send the data to your backend or perform other actions
  }
});
</script>