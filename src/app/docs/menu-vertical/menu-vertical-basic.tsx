import { MenuVertical } from "@/components/core/menu-vertical";

const MenuVerticalBasic = () => {
  return (
    <MenuVertical
      menuItems={[
        {
          label: "Home",
          href: "#",
        },
        {
          label: "Pricing",
          href: "#",
        },
        {
          label: "Docs",
          href: "#",
        },
        {
          label: "About Us",
          href: "#",
        },
        {
          label: "Contact",
          href: "#",
        },
      ]}
    />
  );
};

export default MenuVerticalBasic;
