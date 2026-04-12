import { Outfit, Playfair_Display, Inter } from 'next/font/google'

export const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-outfit',
    display: 'swap',
})

export const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-playfair',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-inter',
    display: 'swap',
})
