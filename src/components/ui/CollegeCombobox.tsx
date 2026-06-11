'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CollegeComboboxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CollegeCombobox({ value, onChange, placeholder = 'Select your college' }: CollegeComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [colleges, setColleges] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [showAddNew, setShowAddNew] = React.useState(false)
  const [newCollegeName, setNewCollegeName] = React.useState('')

  // Prefetch colleges on mount
  React.useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges')
        if (res.ok) {
          const data = await res.json()
          const collegeNames = data.docs.map((doc: { name: string }) => doc.name).sort()
          setColleges(collegeNames)
        }
      } catch (error) {
        console.error('Failed to fetch colleges:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchColleges()
  }, [])

  const handleAddNewCollege = async () => {
    if (!newCollegeName.trim()) return

    try {
      const res = await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCollegeName.trim() }),
      })

      if (res.ok) {
        const savedCollege = newCollegeName.trim()
        setColleges(prev => [...prev, savedCollege].sort())
        onChange(savedCollege)
        setNewCollegeName('')
        setShowAddNew(false)
        setOpen(false)
      }
    } catch (error) {
      console.error('Failed to add college:', error)
    }
  }

  const filteredColleges = colleges.filter(college =>
    college.toLowerCase().includes(searchValue.toLowerCase())
  )

  const showAddOption = searchValue.length > 0 && !filteredColleges.some(
    college => college.toLowerCase() === searchValue.toLowerCase()
  )

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="field-dark hover:bg-white/10 justify-between text-left font-normal data-[state=open]:border-energy/70"
        >
          <span className={value ? '' : 'opacity-45'}>{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] min-w-72 rounded-xl border border-border bg-card p-0 text-card-foreground shadow-xl"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Search colleges..."
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-12"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm">Loading colleges...</div>
              ) : (
                <div className="py-6 text-center text-sm">No college found.</div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredColleges.map((college) => (
                <CommandItem
                  key={college}
                  value={college}
                  onSelect={() => {
                    onChange(college)
                    setOpen(false)
                  }}
                  className="font-mono"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === college ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {college}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Add New Option */}
            {showAddOption && !showAddNew && (
              <CommandItem onSelect={() => setShowAddNew(true)} className="border-t border-border text-indigo">
                <Plus className="mr-2 h-4 w-4" />
                Add &quot;{searchValue}&quot;
              </CommandItem>
            )}

            {/* Add New Form */}
            {showAddNew && (
              <div className="border-t border-border p-4">
                <input
                  type="text"
                  value={newCollegeName}
                  onChange={(e) => setNewCollegeName(e.target.value)}
                  placeholder="Enter college name"
                  className="mb-2 w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddNewCollege}
                    className="btn-primary btn-md flex-1"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddNew(false)}
                    className="btn-ghost btn-md flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
