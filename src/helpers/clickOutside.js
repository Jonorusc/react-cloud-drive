import { useEffect } from 'react'

const d = document

export default function useClickOutside(ref, fn) {
    useEffect(() => {
        const listener = e => {
            if(!ref.current || ref.current.contains(e.target)) {
                return
            }
            fn()
        }
        // listening 
        d.addEventListener('mousedown', listener)
        d.addEventListener('touchstart', listener)

        return () => {
            d.removeEventListener('mousedown', listener)
            d.removeEventListener('touchstart', listener)
        }
    }, [ref, fn])
}