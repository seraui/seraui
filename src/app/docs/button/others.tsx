import Button from "./button"
import {
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "./icons"

const OthersButton = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Navigation Buttons */}
          <div className="flex flex-col gap-4">
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
  
  export default OthersButton;
  