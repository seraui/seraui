import Button from "./button"
import {
  GoogleIcon,
  GitHubIcon,
  TwitterIcon,
  FacebookIcon,
} from "./icons"

const SocialButton = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Social Media Login Buttons */}
          <div className="flex flex-col gap-4">
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
       
      </div>
    );
  }
  
  export default SocialButton;
  