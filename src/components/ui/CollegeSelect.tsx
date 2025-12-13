'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

// Popular Indian Engineering Colleges (fallback)
const DEFAULT_COLLEGES = [
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'IIT Kharagpur',
  'IIT Roorkee',
  'IIT Guwahati',
  'IIT Hyderabad',
  'BITS Pilani',
  'NIT Trichy',
  'NIT Warangal',
  'NIT Surathkal',
  'DTU Delhi',
  'NSUT Delhi',
  'VIT Vellore',
  'Manipal Institute of Technology',
  'SRM Institute of Science and Technology',
  'Amity University',
  'Lovely Professional University',
  'Thapar Institute of Engineering and Technology',
].sort()

interface CollegeSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function CollegeSelect({ value, onChange, placeholder = 'Select your college' }: CollegeSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddNew, setShowAddNew] = useState(false)
  const [newCollege, setNewCollege] = useState('')
  const [colleges, setColleges] = useState<string[]>(DEFAULT_COLLEGES)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges')
        if (res.ok) {
          const data = await res.json()
          const collegeNames = data.docs.map((doc: { name: string }) => doc.name).sort()
          // Merge with defaults and remove duplicates
          const allColleges = Array.from(new Set([...DEFAULT_COLLEGES, ...collegeNames])).sort()
          setColleges(allColleges)
        }
      } catch (error) {
        console.error('Failed to fetch colleges:', error)
      }
    }
    fetchColleges()
  }, [])

  const filteredColleges = colleges.filter((college) =>
    college.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const showAddNewOption = searchTerm.length > 0 && !filteredColleges.some(
    (college) => college.toLowerCase() === searchTerm.toLowerCase()
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowAddNew(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (college: string) => {
    onChange(college)
    setIsOpen(false)
    setSearchTerm('')
    setShowAddNew(false)
  }

  const handleAddNew = async () => {
    if (!newCollege.trim()) return
    
    setIsLoading(true)
    try {
      // Save to backend
      const res = await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCollege.trim() }),
      })

      if (res.ok) {
        const savedCollege = newCollege.trim()
        // Add to local state
        setColleges(prev => Array.from(new Set([...prev, savedCollege])).sort())
        onChange(savedCollege)
        setIsOpen(false)
        setSearchTerm('')
        setShowAddNew(false)
        setNewCollege('')
      }
    } catch (error) {
      console.error('Failed to add college:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Selected Value / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-16 px-6 border-4 border-background bg-foreground text-background font-mono text-lg text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-accent"
      >
        <span className={value ? '' : 'opacity-50'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-[9999] w-full mt-2 border-4 border-background bg-foreground text-background shadow-[8px_8px_0px_hsl(var(--background))] flex flex-col" style={{ maxHeight: '320px' }}>
          {/* Search Input */}
          <div className="p-4 border-b-2 border-background bg-foreground">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search colleges..."
              className="w-full px-4 py-2 border-2 border-background bg-foreground text-background font-mono placeholder:text-background placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto flex-1">
            {filteredColleges.map((college) => (
              <button
                key={college}
                type="button"
                onClick={() => handleSelect(college)}
                className="w-full px-6 py-3 text-left hover:bg-accent hover:text-foreground transition-colors font-mono border-b border-background/20 last:border-b-0"
              >
                {college}
              </button>
            ))}

            {/* Add New Option */}
            {showAddNewOption && !showAddNew && (
              <button
                type="button"
                onClick={() => setShowAddNew(true)}
                className="w-full px-6 py-3 text-left hover:bg-accent hover:text-foreground transition-colors font-mono flex items-center gap-2 border-t-2 border-background bg-foreground"
              >
                <Plus className="w-4 h-4" />
                <span>Add &quot;{searchTerm}&quot;</span>
              </button>
            )}

            {/* Add New Form */}
            {showAddNew && (
              <div className="p-4 border-t-2 border-background bg-foreground">
                <input
                  type="text"
                  value={newCollege}
                  onChange={(e) => setNewCollege(e.target.value)}
                  placeholder="Enter college name"
                  className="w-full px-4 py-2 mb-2 border-2 border-background bg-foreground text-background font-mono placeholder:text-background placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddNew}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-accent text-foreground font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddNew(false)}
                    className="flex-1 px-4 py-2 border-2 border-background hover:bg-background/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {filteredColleges.length === 0 && !showAddNewOption && (
              <div className="px-6 py-8 text-center text-background/60 font-mono">
                No colleges found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
