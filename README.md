# @uecsio/admin-layout

Vue 3 admin layout components — configurable header, collapsible sidebar, and content area. Styled with Tailwind CSS. No UI framework dependency.

## Install

```bash
npm install @uecsio/admin-layout
```

**Peer dependency:** Vue 3.4+

## Quick Start

Import the CSS and the layout component:

```vue
<script setup lang="ts">
import { AdminLayout } from '@uecsio/admin-layout'
import '@uecsio/admin-layout/style.css'
import type { MenuItem } from '@uecsio/admin-layout'

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-house', href: '/' },
  {
    id: 'products',
    label: 'Products',
    icon: 'fa-solid fa-cube',
    children: [
      { id: 'all', label: 'All Products', icon: 'fa-solid fa-list', href: '/products', active: true },
      { id: 'categories', label: 'Categories', icon: 'fa-solid fa-layer-group', href: '/categories' },
    ],
  },
  { id: 'orders', label: 'Orders', icon: 'fa-solid fa-clipboard-list', href: '/orders' },
  { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear', href: '/settings' },
]

function handleNavigate(href: string) {
  // Wire to your router: router.push(href)
  console.log('Navigate to:', href)
}
</script>

<template>
  <AdminLayout :menu-items="menuItems" @navigate="handleNavigate">
    <template #logo>
      <img src="/logo.svg" alt="Logo" class="h-8" />
    </template>

    <h1>Page Content</h1>

    <template #footer>
      <footer class="border-t px-4 py-3 text-xs text-muted-foreground">
        © 2026 My Company
      </footer>
    </template>
  </AdminLayout>
</template>
```

## Components

### `AdminLayout`

The main wrapper component. Composes header, sidebar, and content area.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `menuItems` | `MenuItem[]` | **Required.** Sidebar navigation items |
| `title` | `string` | Fallback text for the header when `#logo` slot is not used |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `navigate` | `string` (href) | Emitted when a menu item is clicked |

#### Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | — | Main content area |
| `logo` | — | Header logo/brand area. Falls back to `title` prop |
| `header-right` | — | Right side of the header (user menu, notifications, etc.) |
| `footer` | — | Footer area below the content |
| `sidebar-footer` | — | Bottom of the sidebar |
| `item-icon` | `{ item: MenuItem }` | Custom icon rendering for menu items |

### `AdminHeader`

Standalone header component with mobile menu toggle.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Fallback text when `#logo` slot is not used |

#### Slots

| Slot | Description |
|------|-------------|
| `logo` | Logo/brand area |
| `header-right` | Right side actions |

### `AdminSidebar`

Standalone sidebar component with navigation items.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `menuItems` | `MenuItem[]` | **Required.** Navigation items |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `navigate` | `string` | Emitted when a menu item is clicked |

#### Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `item-icon` | `{ item: MenuItem }` | Custom icon rendering |
| `sidebar-footer` | — | Bottom of the sidebar |

### `MenuIcon`

Renders an icon from a FontAwesome class or an image URL.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `string` | FA class (e.g. `"fa-solid fa-box"`) or image URL (e.g. `"/icon.png"`) |

**Auto-detection rules:**
- Strings starting with `/`, `http://`, `https://`, `data:`, or ending with a file extension → rendered as `<img>`
- Everything else → rendered as `<i>` with the string as CSS class

### `SidebarItem`

Individual menu item with expand/collapse for children. Used internally by `AdminSidebar`, but can be used standalone.

## Composables

### `useSidebar()`

Shared reactive sidebar state.

```ts
import { useSidebar } from '@uecsio/admin-layout'

const { isOpen, toggle, open, close } = useSidebar()
```

| Return | Type | Description |
|--------|------|-------------|
| `isOpen` | `Ref<boolean>` | Whether the sidebar is open (mobile) |
| `toggle` | `() => void` | Toggle sidebar open/close |
| `open` | `() => void` | Open sidebar |
| `close` | `() => void` | Close sidebar |

## Types

### `MenuItem`

```ts
interface MenuItem {
  id: string          // Unique identifier
  label: string       // Display text
  icon?: string       // FA class or image URL
  href?: string       // Navigation target
  active?: boolean    // Highlight as current page
  children?: MenuItem[] // Nested sub-items
}
```

## Usage with Vue Router

The layout is router-agnostic. Wire it to your router by handling the `navigate` event and computing `active` state from the current route:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AdminLayout } from '@uecsio/admin-layout'
import type { MenuItem } from '@uecsio/admin-layout'

const router = useRouter()
const route = useRoute()

const menuItems = computed<MenuItem[]>(() => [
  { id: 'home', label: 'Home', icon: 'fa-solid fa-house', href: '/', active: route.path === '/' },
  { id: 'users', label: 'Users', icon: 'fa-solid fa-users', href: '/users', active: route.path === '/users' },
])

function handleNavigate(href: string) {
  router.push(href)
}
</script>

<template>
  <AdminLayout :menu-items="menuItems" @navigate="handleNavigate">
    <router-view />
  </AdminLayout>
</template>
```

## Custom Icons via Slot

If you need full control over icon rendering (e.g. using `lucide-vue-next` or custom SVG components), use the `#item-icon` scoped slot:

```vue
<AdminLayout :menu-items="menuItems" @navigate="handleNavigate">
  <template #item-icon="{ item }">
    <component :is="iconMap[item.icon]" class="h-4 w-4 shrink-0" />
  </template>

  <router-view />
</AdminLayout>
```

## Styling

The package ships its own CSS (`@uecsio/admin-layout/style.css`) with Tailwind utility classes and HSL CSS variable tokens for theming. Override the variables in your own CSS to customize colors:

```css
:root {
  --primary: 199 69% 48%;
  --sidebar-background: 210 20% 20%;
  --sidebar-foreground: 210 14% 83%;
  --sidebar-primary: 199 69% 48%;
  --sidebar-accent: 210 20% 26%;
  /* ... see source for all variables */
}
```

## Development

```bash
npm install
npm run build     # Build library to dist/
npm run test      # Run tests
npm run lint      # Lint
```

## License

[MIT](LICENSE)
