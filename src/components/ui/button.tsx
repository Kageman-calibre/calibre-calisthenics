
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-[1.02]",
        destructive:
          "bg-red-500/20 text-red-100 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 shadow-lg hover:shadow-xl",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/10 hover:text-white text-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-[1.02]",
        secondary:
          "bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-white/10 hover:text-white text-white/80 backdrop-blur-sm",
        link: "text-white underline-offset-4 hover:underline hover:text-white/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Floating glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
        <div className="relative z-10 flex items-center gap-2">
          {props.children}
        </div>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
