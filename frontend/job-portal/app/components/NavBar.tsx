"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import DesignSearchBar from './SearchBar'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-1">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-orangeSite dark:text-blue-400">Job Portal</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700  hover:bg-greenSite px-3 py-2 rounded-md text-sm font-medium">Trouve ton job</Link>
                <Link href="/compagnies" className="text-gray-700  hover:bg-greenSite px-3 py-2 rounded-md text-sm font-medium">Trouve ton entreprise</Link>
                <Link href="/login" className="text-gray-700  hover:bg-greenSite  px-3 py-2 rounded-md text-sm font-medium">Connexion</Link>
                <Link href="/register" className="text-gray-700  hover:bg-greenSite  px-3 py-2 rounded-md text-sm font-medium">Inscription</Link>
                <Link href="/userpage" className="text-gray-700 hover:bg-greenSite  px-3 py-2 rounded-md text-sm font-medium">Profil</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <DesignSearchBar />
          </div>
          <div className="flex md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:bg-greenSite dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Trouve ton job</Link>
            <Link href="/compagnies" className="text-gray-700 dark:text-gray-300 hover:bg-greenSite dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Trouve ton entreprise</Link>
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:bg-greenSite dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Connexion</Link>
            <Link href="/register" className="text-gray-700 dark:text-gray-300 hover:bg-greenSite dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Inscription</Link>
            <Link href="/userpage" className="text-gray-700 dark:text-gray-300 hover:bg-greenSite dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Profil</Link>
          </div>
          <div className="px-2 pt-2 pb-3">
            <DesignSearchBar />
          </div>
        </div>
      )}
    </nav>
  )
}