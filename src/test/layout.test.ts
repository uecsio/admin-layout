import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AdminLayout from "@/components/AdminLayout.vue";
import AdminSidebar from "@/components/AdminSidebar.vue";
import SidebarItem from "@/components/SidebarItem.vue";
import type { MenuItem } from "@/types";

const sampleItems: MenuItem[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "products",
    label: "Products",
    children: [
      { id: "list", label: "All Products", href: "/products", active: true },
      { id: "categories", label: "Categories", href: "/categories" },
    ],
  },
  { id: "settings", label: "Settings", href: "/settings" },
];

describe("AdminLayout", () => {
  it("renders header with title", () => {
    const wrapper = mount(AdminLayout, {
      props: { menuItems: sampleItems, title: "Test App" },
    });
    expect(wrapper.text()).toContain("Test App");
  });

  it("renders slot content", () => {
    const wrapper = mount(AdminLayout, {
      props: { menuItems: sampleItems },
      slots: { default: "<p>Page Content</p>" },
    });
    expect(wrapper.text()).toContain("Page Content");
  });

  it("renders footer slot", () => {
    const wrapper = mount(AdminLayout, {
      props: { menuItems: sampleItems },
      slots: { footer: "<footer>© 2026</footer>" },
    });
    expect(wrapper.text()).toContain("© 2026");
  });

  it("renders logo slot", () => {
    const wrapper = mount(AdminLayout, {
      props: { menuItems: sampleItems },
      slots: { logo: "<img alt='Logo' /><span>My App</span>" },
    });
    expect(wrapper.text()).toContain("My App");
  });
});

describe("AdminSidebar", () => {
  it("renders all menu items", () => {
    const wrapper = mount(AdminSidebar, {
      props: { menuItems: sampleItems },
    });
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("Products");
    expect(wrapper.text()).toContain("Settings");
  });
});

describe("SidebarItem", () => {
  it("renders a simple item", () => {
    const wrapper = mount(SidebarItem, {
      props: { item: { id: "test", label: "Test Item", href: "/test" } },
    });
    expect(wrapper.text()).toContain("Test Item");
  });

  it("expands children with active child by default", () => {
    const item: MenuItem = {
      id: "parent",
      label: "Parent",
      children: [
        { id: "child1", label: "Child 1", href: "/c1", active: true },
        { id: "child2", label: "Child 2", href: "/c2" },
      ],
    };
    const wrapper = mount(SidebarItem, { props: { item } });
    expect(wrapper.text()).toContain("Child 1");
    expect(wrapper.text()).toContain("Child 2");
  });

  it("toggles children on click", async () => {
    const item: MenuItem = {
      id: "parent",
      label: "Parent",
      children: [
        { id: "child1", label: "Child 1", href: "/c1" },
      ],
    };
    const wrapper = mount(SidebarItem, { props: { item } });
    // Children hidden initially (no active child)
    expect(wrapper.text()).not.toContain("Child 1");

    // Click to expand
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Child 1");

    // Click to collapse
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).not.toContain("Child 1");
  });

  it("emits navigate on click for items without children", async () => {
    const item: MenuItem = { id: "test", label: "Test", href: "/test" };
    const wrapper = mount(SidebarItem, { props: { item } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("navigate")).toEqual([["/test"]]);
  });

  it("emits navigate on child click", async () => {
    const item: MenuItem = {
      id: "parent",
      label: "Parent",
      children: [
        { id: "child1", label: "Child 1", href: "/c1", active: true },
      ],
    };
    const wrapper = mount(SidebarItem, { props: { item } });
    // Click the child button (second button in the DOM)
    const buttons = wrapper.findAll("button");
    await buttons[1].trigger("click");
    expect(wrapper.emitted("navigate")).toEqual([["/c1"]]);
  });
});
