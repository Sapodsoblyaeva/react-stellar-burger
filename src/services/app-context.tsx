import React from 'react'

export type Scroll = {
  scrollCoordinate: string
  setScrollCoordinate: React.Dispatch<React.SetStateAction<string>>
}

export const ScrollContext = React.createContext<Scroll | null>(null)
