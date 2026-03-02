<script setup lang="ts">
import { ref, computed } from "vue";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";
import MenuIcon from "./MenuIcon.vue";

const props = defineProps<{
  item: MenuItem;
}>();

const emit = defineEmits<{
  navigate: [href: string];
}>();

const hasChildren = computed(
  () => props.item.children && props.item.children.length > 0
);
const hasActiveChild = computed(
  () => props.item.children?.some((c) => c.active) ?? false
);
const open = ref(hasActiveChild.value);

function handleClick() {
  if (hasChildren.value) {
    open.value = !open.value;
  } else if (props.item.href) {
    emit("navigate", props.item.href);
  }
}

function handleChildClick(child: MenuItem) {
  if (child.href) {
    emit("navigate", child.href);
  }
}
</script>

<template>
  <div>
    <button
      :class="
        cn(
          'flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors',
          'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          !hasChildren && 'cursor-pointer'
        )
      "
      @click="handleClick"
    >
      <slot name="item-icon" :item="item">
        <MenuIcon :icon="item.icon" />
      </slot>
      <span class="flex-1 text-left">{{ item.label }}</span>
      <svg
        v-if="hasChildren"
        :class="
          cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <div v-if="hasChildren && open" class="bg-sidebar-accent/50">
      <button
        v-for="child in item.children"
        :key="child.id"
        :class="
          cn(
            'flex w-full items-center gap-3 py-2.5 pl-11 pr-4 text-sm transition-colors',
            child.active
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )
        "
        @click="handleChildClick(child)"
      >
        <slot name="item-icon" :item="child">
          <MenuIcon :icon="child.icon" />
        </slot>
        <span>{{ child.label }}</span>
      </button>
    </div>
  </div>
</template>
