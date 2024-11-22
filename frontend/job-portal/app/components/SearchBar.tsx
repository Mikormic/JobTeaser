"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Recherche pour :", query)
    // Implémentez votre logique de recherche ici
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-10'}`}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-0 top-0 bottom-0 z-10 bg-transparent hover:bg-transparent"
            onClick={toggleExpand}
          >
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Rechercher</span>
          </Button>
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`pl-10 pr-10 py-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            placeholder="Rechercher..."
            aria-label="Champ de recherche"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 bottom-0 z-10 bg-transparent hover:bg-transparent"
              onClick={() => setQuery('')}
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Effacer la recherche</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}