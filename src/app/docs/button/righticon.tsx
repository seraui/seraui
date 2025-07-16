import Button from "./button"
import {
  CheckIcon,
  ArrowRightIcon,
  SettingsIcon,
} from "./icons"

const RightIconButton = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Buttons with Right Icons */}
          <div className="flex flex-col gap-4">
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
      </div>
    );
  }
  
  export default RightIconButton;
  