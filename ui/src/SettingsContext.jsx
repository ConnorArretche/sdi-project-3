import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'

export const SettingsContext = createContext();

export function SettingsProvider({children}){
        const [theme, setTheme] = useState(() => {
            return Cookies.get('app_theme') || 'Dark'
        })
        const [richMode, setRichMode] = useState(() => {
            return Cookies.get('rich_mode') || 'Normal Mode'
        })

        useEffect(() => {
            Cookies.set('app_theme', theme, {expires: 7, secure: true})
        }, [theme])

        useEffect(() => {
            Cookies.set('rich_mode', richMode, {expires: 7, secure: true})
        }, [richMode])

        return (
            <SettingsContext.Provider value={{theme, setTheme, richMode, setRichMode}}>
                {children}
            </SettingsContext.Provider>
        )
}