import { MenuVertical } from "@/components/core/menu-vertical";

const MenuVerticalSkew = () => {
  return (
    <MenuVertical
      color="#00c951"
      skew={-20}
      menuItems={[
        {
          label: "Blog",
          href: "#",
        },
        {
          label: "Careers",
          href: "#",
        },
        {
          label: "Support",
          href: "#",
        },
      ]}
    />
  );
};

export default MenuVerticalSkew;
