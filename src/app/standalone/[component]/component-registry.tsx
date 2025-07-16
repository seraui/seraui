// Component imports
import ButtonView from '@/app/docs/button/button-view';
import SocialButton from '@/app/docs/button/social-button';
import ActionButton from '@/app/docs/button/action';
import RightIconButton from '@/app/docs/button/righticon';
import OnlyIconButton from '@/app/docs/button/only';
import CommerceButton from '@/app/docs/button/commerce';
import OthersButton from '@/app/docs/button/others';
import CardView from '@/app/docs/card/card-view';
import FlipwordsView from '@/app/docs/flipwords/flipwords-view';
import TwoStep from '@/app/docs/twostep/twostep';
import Search from '@/app/docs/search/search';
import PasswordInput from '@/app/docs/password/password';
import StrongPassword from '@/app/docs/password/strongPassword';
import Prompt from '@/app/docs/prompt/prompt';
import VercelV0Chat from '@/app/docs/prompt/v0';
import Dropdown from '@/app/docs/dropdown/dropdown';
import SimpleDropdown from '@/app/docs/dropdown/simple-dropdown';
import UserProfileDropdown from '@/app/docs/dropdown/user-profile-dropdown';
import NotificationDropdown from '@/app/docs/dropdown/notification-dropdown';
import Dock from '@/app/docs/dock/dock';
import FloatingDock from '@/app/docs/dock/floating-dock';
import MinimalDock from '@/app/docs/dock/minimal-dock';
import ColorfulDock from '@/app/docs/dock/colorful-dock';
import SimpleDock from '@/app/docs/dock/simple-dock';
import AccordionPage from '@/app/docs/accordion/accordion-view';
import AccordionLast from '@/app/docs/accordion-last/accordion-last';
import AmazonGiftCard from '@/app/docs/amazongift/amazongift';
import CodeProfile from '@/app/docs/codeprofile/codeprofile';
import DecryptingText from '@/app/docs/decrypting/decrypting';
import FuzzySearch from '@/app/docs/fuzzy/fuzzy';
import Login from '@/app/docs/login/login';
import Pricing from '@/app/docs/pricing/pricing';
import Pricing2 from '@/app/docs/pricing/pricing2';
import SimplePricing from '@/app/docs/pricing/pricing3';
import TabsView from '@/app/docs/tabs/tabs-view';
import TabsClassicView from '@/app/docs/tabs-classic/tabs-view-classic';
import TabsFancyView from '@/app/docs/tabs-fancy/tabs-view-fancy';
import TextReveal from '@/app/docs/textreveal/textreveal';
import Carousel from '@/app/docs/carousel/carousel';
import EnhancedCarousel from '@/app/docs/carousel/enhanced-carousel';
import CustomAccordion from '@/app/docs/accordion/customAccordion';
import Testimonial from '@/app/docs/testimonial/testimonial';
import Testimonial2 from '@/app/docs/testimonial/testimonial2';
import Footer from '@/app/docs/footer/footer';
import Footer2 from '@/app/docs/footer/footer2';
import ToastView from '@/app/docs/toast/toast-view';
import BadgeView from '@/app/docs/badge/badge-view';
import CopyButton from '@/app/docs/copybutton/copybutton';
import CopyButton2 from '@/app/docs/copybutton/copybutton2';
import FileTree from '@/app/docs/filetree/filetree';
import FileTree2 from '@/app/docs/filetree/filetree2';
import ForgotPassword from '@/app/docs/forgotpassword/forgotpassword';
import GradientView from '@/app/docs/gradient/gradient-view';
import MagicCardView from '@/app/docs/magic/magiccard-view';
import MarqueeView from '@/app/docs/marquee/marquee-view';
import Navbar from '@/app/docs/navbar/navbar';
import Header from '@/app/docs/navbar/header';
import Header2 from '@/app/docs/navbar/header2';
import Network from '@/app/docs/network/network';
import Shimmer from '@/app/docs/shimmer/shimmer';
import DocTabs from '@/app/docs/doctabs/doctabs';
import { GradientTabsDemo } from '@/app/docs/doctabs/doctabs-gradient';
import { VerticalTabsDemo } from '@/app/docs/doctabs/doctabs-vertical';
import NexusOrb from '@/app/docs/integrations/nexusorb';
import NexusOrbSup from '@/app/docs/integrations/nexusorbsup';
import Spider from '@/app/docs/integrations/spider';
import HeroSection from '@/app/docs/hero/hero';
import Hero2 from '@/app/docs/hero/hero2';
import CoderProfileCard from "@/app/docs/portfolio/portfolio"
import Portfolio2Page from "@/app/docs/portfolio/portfolio2"
import Portfolio3Page from "@/app/docs/portfolio/portfolio3"



// Component registry mapping component names to their view components
export const ComponentRegistry: Record<string, React.ComponentType> = {
  'button-view': ButtonView,
  'social-button': SocialButton,
  'action-button': ActionButton,
  'right-icon-button': RightIconButton,
  'icon-only-button': OnlyIconButton,
  'commerce-button': CommerceButton,
  'other-buttons': OthersButton,
  'card': CardView,
  'flipwords': FlipwordsView,
  'twostep': TwoStep,
  'search': Search,
  'password': PasswordInput,
  'strong-password': StrongPassword,
  'prompt': Prompt,
  'vercel-v0-chat': VercelV0Chat,
  'dropdown': Dropdown,
  'simple-dropdown': SimpleDropdown,
  'user-profile-dropdown': UserProfileDropdown,
  'notification-dropdown': NotificationDropdown,
  'dock': Dock,
  'floating-dock': FloatingDock,
  'minimal-dock': MinimalDock,
  'colorful-dock': ColorfulDock,
  'simple-dock': SimpleDock,
  'accordion': AccordionPage,
  'accordion-last': AccordionLast,
  'amazongift': AmazonGiftCard,
  'amazon-gift-card': AmazonGiftCard,
  'codeprofile': CodeProfile,
  'code-profile': CodeProfile,
  'decrypting': DecryptingText,
  'decrypting-text': DecryptingText,
  'fuzzy': FuzzySearch,
  'fuzzy-search': FuzzySearch,
  'login': Login,
  'pricing': Pricing,
  'pricing-2': Pricing2,
  'pricing-3': SimplePricing,
  'tabs': TabsView,
  'tabs-classic': TabsClassicView,
  'classic-tabs': TabsClassicView,
  'tabs-fancy': TabsFancyView,
  'fancy-tabs': TabsFancyView,
  'textreveal': TextReveal,
  'text-reveal': TextReveal,
  'carousel': Carousel,
  'enhanced-carousel': EnhancedCarousel,
  'customAccordion': CustomAccordion,
  'testimonial': Testimonial,
  'testimonial-2': Testimonial2,
  'footer': Footer,
  'footer-2': Footer2,
  'toast': ToastView,
  'badge': BadgeView,
  'copy-button': CopyButton,
  'copy-button-2': CopyButton2,
  'file-tree': FileTree,
  'file-tree-2': FileTree2,
  'forgot-password': ForgotPassword,
  'gradient': GradientView,
  'magic-card': MagicCardView,
  'marquee': MarqueeView,
  'navbar': Navbar,
  'header': Header,
  'header-2': Header2,
  'network': Network,
  'shimmer': Shimmer,
  'doc-tabs': DocTabs,
  'doc-tabs-gradient': GradientTabsDemo,
  'doc-tabs-vertical': VerticalTabsDemo,
  'nexus-orb': NexusOrb,
  'nexus-orb-sup': NexusOrbSup,
  'spider': Spider,
  'hero': HeroSection,
  'hero-2': Hero2,
  'CoderProfileCard': CoderProfileCard,
  'Portfolio2Page': Portfolio2Page,
  'Portfolio3Page': Portfolio3Page
  };
