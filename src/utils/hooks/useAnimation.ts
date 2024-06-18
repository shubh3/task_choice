import { useEffect, useState } from 'react'

const useAnimation = (dependency: any) => {
    
    const [animateState, changeAnimateState] = useState(false);

    
    useEffect(() => {
        changeAnimateState(true);
        const timeout = setTimeout(() => {
            changeAnimateState(false);
        }, 300); // Adjust the duration (300ms) as per your animation timing
    
        return () => clearTimeout(timeout);
      }, [...dependency]);

      return animateState;
}

export default useAnimation;
