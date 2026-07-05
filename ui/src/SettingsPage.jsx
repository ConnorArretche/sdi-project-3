import Cookies from 'js-cookie'
import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from './SettingsContext'

function SettingsPage(){
    const {theme, setTheme, richMode, setRichMode} = useContext(SettingsContext)

    return (
        <div>
            <p>Current Theme: {theme}</p>
            <button onClick={() => setTheme(theme === 'light' ? 'dark': 'light')}>Toggle Theme</button>
            <p>Rich Mode: {richMode}</p>
            <button onClick={() => setRichMode(richMode === 'Rich Mode' ? 'Normal Mode': 'Rich Mode')}>Toggle Rich Mode</button>
        </div>
    )

}
export default SettingsPage