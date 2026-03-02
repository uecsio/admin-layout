<script setup lang="ts">
import type { MenuItem } from "@/types";
import AdminHeader from "./AdminHeader.vue";
import AdminSidebar from "./AdminSidebar.vue";

defineProps<{
  title?: string;
  menuItems: MenuItem[];
}>();

const emit = defineEmits<{
  navigate: [href: string];
}>();
</script>

<template>
  <div class="min-h-screen w-full">
    <AdminHeader :title="title">
      <template #logo>
        <slot name="logo">{{ title ?? "" }}</slot>
      </template>
      <template #header-right>
        <slot name="header-right" />
      </template>
    </AdminHeader>

    <div class="flex pt-14">
      <AdminSidebar :menu-items="menuItems" @navigate="emit('navigate', $event)">
        <template #item-icon="{ item }">
          <slot name="item-icon" :item="item" />
        </template>
        <template #sidebar-footer>
          <slot name="sidebar-footer" />
        </template>
      </AdminSidebar>

      <div class="flex flex-1 flex-col min-w-0 min-h-[calc(100vh-3.5rem)]">
        <main class="flex-1 p-4 md:p-6">
          <slot />
        </main>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
