import { useState, useEffect } from "react";

export function useLocalStorageState (initalState, key) {
    // retrieve stored watched movies from local storage  
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem((key));
        return storedValue ? JSON.parse(storedValue) : initalState;
    });

    // store watched movies in local storage  
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    },[value, key]);

    return [value, setValue];  
}