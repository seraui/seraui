// Component imports
import ButtonView from '@/app/docs/button/button-view';
import CardView from '@/app/docs/card/card-view';
import FlipwordsView from '@/app/docs/flipwords/flipwords-view';
import TwoStep from '@/app/docs/twostep/twostep';
import Search from '@/app/docs/search/search';
import PasswordInput from '@/app/docs/password/password';
import Prompt from '@/app/docs/prompt/prompt';
import Dropdown from '@/app/docs/dropdown/dropdown';
import Dock from '@/app/docs/dock/dock';
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
import CustomAccordion from '@/app/docs/accordion/customAccordion';

// Component registry mapping component names to their view components
export const ComponentRegistry: Record<string, React.ComponentType> = {
  'button': ButtonView,
  'card': CardView,
  'flipwords': FlipwordsView,
  'twostep': TwoStep,
  'search': Search,
  'password': PasswordInput,
  'prompt': Prompt,
  'dropdown': Dropdown,
  'dock': Dock,
  'accordion': AccordionPage,
  'accordion-last': AccordionLast,
  'amazongift': AmazonGiftCard,
  'codeprofile': CodeProfile,
  'decrypting': DecryptingText,
  'fuzzy': FuzzySearch,
  'login': Login,
  'pricing': Pricing,
  'pricing2': Pricing2,
  'SimplePricing': SimplePricing,
  'tabs': TabsView,
  'tabs-classic': TabsClassicView,
  'tabs-fancy': TabsFancyView,
  'textreveal': TextReveal,
  'carousel': Carousel,
  'customAccordion': CustomAccordion,
};
