import Button from "./button"
const ButtonView = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Basic Variants */}
          <div className="flex flex-col gap-4">
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
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="lg">Large</Button>
                <Button variant="default" loading>Loading</Button>
                <Button variant="outline" loading>Loading</Button>
            </div>
          </div>
      </div>
    );
  }
  
  export default ButtonView;
  