import Button from "./button"
import {
  GoogleIcon,
  GitHubIcon,
  TwitterIcon,
  FacebookIcon,
  DownloadIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  ShareIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  MailIcon,
  PhoneIcon
} from "./icons"

const ButtonView = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Basic Variants */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Basic Variants</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes and Loading */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Sizes & Loading States</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="lg">Large</Button>
                <Button variant="default" loading>Loading</Button>
                <Button variant="outline" loading>Loading</Button>
            </div>
          </div>

          {/* Social Media Login Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Social Media Login</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" iconLeft={<GoogleIcon />}>
                    Continue with Google
                </Button>
                <Button variant="outline" iconLeft={<GitHubIcon />}>
                    Continue with GitHub
                </Button>
                <Button variant="outline" iconLeft={<TwitterIcon />}>
                    Continue with Twitter
                </Button>
                <Button variant="outline" iconLeft={<FacebookIcon />}>
                    Continue with Facebook
                </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Action Buttons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" iconLeft={<DownloadIcon />}>
                    Download
                </Button>
                <Button variant="default" iconLeft={<ShoppingCartIcon />}>
                    Add to Cart
                </Button>
                <Button variant="outline" iconLeft={<HeartIcon />}>
                    Add to Wishlist
                </Button>
                <Button variant="secondary" iconLeft={<StarIcon />}>
                    Rate Product
                </Button>
                <Button variant="ghost" iconLeft={<ShareIcon />}>
                    Share
                </Button>
            </div>
          </div>

          {/* Buttons with Right Icons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Buttons with Right Icons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" iconRight={<ArrowRightIcon />}>
                    Next
                </Button>
                <Button variant="outline" iconRight={<ArrowRightIcon />}>
                    Continue
                </Button>
                <Button variant="secondary" iconRight={<CheckIcon />}>
                    Confirm
                </Button>
                <Button variant="ghost" iconRight={<SettingsIcon />}>
                    Settings
                </Button>
            </div>
          </div>

          {/* Icon Only Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Icon Only Buttons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" size="sm" iconLeft={<SearchIcon />} />
                <Button variant="outline" size="sm" iconLeft={<BellIcon />} />
                <Button variant="outline" size="sm" iconLeft={<MailIcon />} />
                <Button variant="outline" size="sm" iconLeft={<PhoneIcon />} />
                <Button variant="outline" size="sm" iconLeft={<SettingsIcon />} />
                <Button variant="outline" size="sm" iconLeft={<PlusIcon />} />
                <Button variant="outline" size="sm" iconLeft={<MinusIcon />} />
                <Button variant="outline" size="sm" iconLeft={<XIcon />} />
            </div>
          </div>

          {/* E-commerce Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">E-commerce Buttons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" iconLeft={<ShoppingCartIcon />}>
                    Buy Now
                </Button>
                <Button variant="outline" iconLeft={<HeartIcon />}>
                    Save for Later
                </Button>
                <Button variant="secondary" iconLeft={<StarIcon />}>
                    Write Review
                </Button>
                <Button variant="ghost" iconLeft={<ShareIcon />}>
                    Share Product
                </Button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Navigation Buttons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" iconLeft={<ArrowLeftIcon />}>
                    Previous
                </Button>
                <Button variant="default" iconRight={<ArrowRightIcon />}>
                    Next
                </Button>
                <Button variant="secondary" iconLeft={<ArrowLeftIcon />}>
                    Back
                </Button>
                <Button variant="ghost" iconRight={<ArrowRightIcon />}>
                    Forward
                </Button>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">Status Buttons</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button className="bg-green-500 dark:bg-green-500 dark:text-white dark:hover:bg-green-800" variant="default" iconLeft={<CheckIcon />}>
                    Success
                </Button>
                <Button variant="destructive" iconLeft={<XIcon />}>
                    Delete
                </Button>
                <Button variant="outline" iconLeft={<CheckIcon />}>
                    Approve
                </Button>
                <Button variant="secondary" iconLeft={<XIcon />} className="bg-red-500"> 
                    Reject
                </Button>
            </div>
          </div>
      </div>
    );
  }
  
  export default ButtonView;
  