<template>
  <router-view />
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { useAppMessageStore } from 'stores/app-message-store';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const appMessageStore = useAppMessageStore();
const { t } = useI18n();

watch(() => appMessageStore.showMessage, (messageData) => {
  if (!messageData) return;
  Notify.create({
    ...messageData.config,
    message: t(messageData.value)
  });
  appMessageStore.clearShowMessage();
});

</script>
