'use client'
import { motion } from "framer-motion"
import { forwardRef, useState, useEffect } from "react";

interface RandomTextRevealProps{
  text:string;
  duration?:number;
  onHover?:boolean;
  onScroll?:boolean;
  className?:string;
  onClick?:() => void;

}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const RandomTextReveal = forwardRef<HTMLHeadingElement, RandomTextRevealProps>(({ text,onScroll = false,onHover = true, duration = 50, ...props }, ref) => {

  const [displayText, setDisplayText] =  useState(text);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Ensure display text is set correctly on client
    setDisplayText(text);
  }, [text]);

  const randomText = () => {
    if (!isClient) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
          text.split("").map((char,index) => {
            if(iteration > index){
              return text[index]
            }
            if(char == " "){ // if there is a white space in the original text return a white space no change
              return " "
            }
            return letters[Math.floor(Math.random() * 26)]//return a random character from the string array [letter]
          }).join("")
      );
      iteration += 1 / 2;//speed control
      if(iteration >= text.length){
        //Return to the original letter
        clearInterval(interval)
        setDisplayText(text)
      }
    
    },duration) //duration
  }

  return (
    
      <motion.span
      ref={ref}
      onHoverStart={() => onHover && randomText()}
      onAnimationStart={() => !onHover && randomText()}
      onViewportEnter={() => onScroll && randomText()}
      {...props}
      >
        {displayText}
      </motion.span>
  )
})
RandomTextReveal.displayName = "RandomTextReveal";
export default RandomTextReveal