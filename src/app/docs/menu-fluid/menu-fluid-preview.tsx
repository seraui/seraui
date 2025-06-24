import { MenuFluid } from "@/components/core/menu-fluid";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];
const MenuFluidPreview = () => {
  return <MenuFluid menuItems={menuItems} />;
};

export default MenuFluidPreview;
