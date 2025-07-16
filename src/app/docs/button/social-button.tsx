import Button from "./button"
import {
  GoogleIcon,
  GitHubIcon,
  FacebookIcon,
  EmailIcon,
  XIcon2,
  AppleIcon,
  MicrosoftIcon,
  SlackIcon,
  LinkedInIcon,
} from "./icons"

const SocialButton = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Social Media Login Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" iconLeft={<EmailIcon />}>
                    Login with Email
                </Button>
                <Button variant="outline" iconLeft={<GoogleIcon />}>
                    Continue with Google
                </Button>
                <Button variant="outline" iconLeft={<GitHubIcon />}>
                    Continue with GitHub
                </Button>
                <Button variant="outline" iconLeft={<FacebookIcon />}>
                    Login with Facebook
                </Button>
                <Button variant="outline" iconLeft={<XIcon2 />}>
                    Login with X
                </Button>
                <Button variant="outline" iconLeft={<AppleIcon />}>
                    Login with Apple
                </Button>
                <Button variant="outline" iconLeft={<MicrosoftIcon />}>
                    Login with Microsoft
                </Button>
                <Button variant="outline" iconLeft={<SlackIcon />}>
                    Login with Slack
                </Button>
                <Button variant="outline" iconLeft={<LinkedInIcon />}>
                    Login with LinkedIn
                </Button>
            </div>
          </div>

      </div>
    );
  }
  
  export default SocialButton;
  