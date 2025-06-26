import Button from "./button"
import {
  DownloadIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  ShareIcon,
} from "./icons"

const ActionButton = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            
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
      </div>
    );
  }
  
  export default ActionButton;
  