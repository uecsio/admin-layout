<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";

defineProps<{
  title?: string;
}>(); // title is used as default fallback for the #logo slot

const { isOpen, toggle } = useSidebar();
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-card px-4 gap-4"
  >
    <!-- Mobile menu toggle -->
    <button
      class="p-1.5 rounded-md hover:bg-muted transition-colors lg:hidden"
      @click="toggle"
    >
      <!-- X icon when open -->
      <svg
        v-if="isOpen"
        class="h-5 w-5 text-foreground"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      <!-- Menu icon when closed -->
      <svg
        v-else
        class="h-5 w-5 text-foreground"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>

    <div class="text-lg font-bold text-primary lg:mr-auto absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
      <slot name="logo">
        {{ title ?? "" }}
      </slot>
    </div>

    <slot name="header-right" />
  </header>
</template>
