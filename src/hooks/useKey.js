import { useEffect } from "react";

export function useKey(key, action, action2) {
    
     // listenting to a keypress
     useEffect(()=> {
        action2?.();
        function callback(e) {
            if(e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }                  
        }

        document.addEventListener('keydown', callback);

        return () => document.removeEventListener('keydown', callback);

    },[action, key, action2])
}