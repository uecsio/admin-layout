<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  icon?: string;
}>();

const isImage = computed(() => {
  if (!props.icon) return false;
  return (
    props.icon.startsWith("/") ||
    props.icon.startsWith("http://") ||
    props.icon.startsWith("https://") ||
    props.icon.startsWith("data:") ||
    /\.\w{2,4}$/.test(props.icon)
  );
});
</script>

<template>
  <img
    v-if="icon && isImage"
    :src="icon"
    alt=""
    class="h-4 w-4 shrink-0 object-contain"
  />
  <i v-else-if="icon" :class="[icon, 'h-4 w-4 shrink-0 text-center leading-4']" />
</template>
