<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";
import { useSidebar } from "@/composables/useSidebar";
import SidebarItem from "./SidebarItem.vue";

defineProps<{
  menuItems: MenuItem[];
}>();

const emit = defineEmits<{
  navigate: [href: string];
}>();

const { isOpen, close } = useSidebar();

function handleNavigate(href: string) {
  close();
  emit("navigate", href);
}
</script>

<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
    @click="close"
  />

  <aside
    :class="
      cn(
        'fixed top-14 left-0 z-40 flex h-[calc(100%-3.5rem)] w-64 flex-col bg-sidebar overflow-y-auto transition-transform duration-300',
        'lg:static lg:translate-x-0 lg:z-auto lg:min-h-[calc(100vh-3.5rem)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )
    "
  >
    <nav class="flex-1">
      <SidebarItem
        v-for="item in menuItems"
        :key="item.id"
        :item="item"
        @navigate="handleNavigate"
      >
        <template #item-icon="{ item: menuItem }">
          <slot name="item-icon" :item="menuItem" />
        </template>
      </SidebarItem>
    </nav>

    <slot name="sidebar-footer" />
  </aside>
</template>
