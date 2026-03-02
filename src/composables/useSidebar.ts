import { ref } from "vue";

const sidebarOpen = ref(false);

export function useSidebar() {
  function toggle() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function open() {
    sidebarOpen.value = true;
  }

  function close() {
    sidebarOpen.value = false;
  }

  return {
    isOpen: sidebarOpen,
    toggle,
    open,
    close,
  };
}
