import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent,
  SheetFooter
} from '../ui/sheet';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { mockInterests } from '../../data/mockData';
import { Check, X } from 'lucide-react';

const CategorySelector = ({ 
  isOpen, 
  onClose, 
  currentSelected, 
  onApply
}) => {
  const [localSelected, setLocalSelected] = useState([]);

  // Sync local state with prop when sheet opens
  useEffect(() => {
    if (isOpen) {
      setLocalSelected([...currentSelected]);
    }
  }, [isOpen, currentSelected]);

  const toggleInterest = (interest) => {
    setLocalSelected(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        if (prev.length >= 20) return prev; 
        return [...prev, interest];
      }
    });
  };

  const handleClear = () => {
    setLocalSelected([]);
  };

  const handleApply = () => {
    onApply(localSelected);
    onClose(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose(false)}>
      {/* 
         [&>button]:hidden hides the default Radix Close button (X) that comes from the SheetPrimitive.
         We are providing our own Cancel button in the header.
         !p-0 ensures no default padding interferes with our full-width header.
      */}
      <SheetContent 
        side="bottom" 
        className="h-[85vh] sm:h-[600px] flex flex-col rounded-t-xl bg-white !p-0 [&>button]:hidden gap-0"
      >
        
        {/* Custom Header */}
        <div className="flex-none h-16 px-4 border-b border-gray-100 flex items-center justify-center relative bg-white rounded-t-xl z-50">
          
          {/* Centered Title */}
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-lg font-bold text-black">Select any choice</h2>
            <p className="text-xs text-gray-500">Find your vibe</p>
          </div>

          {/* Cancel Button - Absolute Right */}
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onClose(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-600 hover:bg-red-50 h-9 px-3 text-sm font-semibold"
          >
            Cancel
          </Button>
        </div>
        
        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-hidden relative z-40 bg-white flex flex-col">
          {/* Header for selection count */}
          <div className="flex-none px-6 py-3 flex items-center justify-between bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-10">
            <span className="text-sm font-medium text-gray-600">
              Selected: <span className="text-blue-600 font-bold">{localSelected.length}</span>
            </span>
            {localSelected.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="text-red-500 hover:text-red-600 h-8 px-2 text-xs uppercase tracking-wide font-bold"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <ScrollArea className="flex-1 px-6 pb-4">
            <div className="flex flex-wrap gap-2 pb-4">
              {mockInterests.map((interest) => {
                const isSelected = localSelected.includes(interest);
                return (
                  <div
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`
                      cursor-pointer px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 select-none
                      flex items-center gap-2
                      ${isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }
                    `}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    {interest}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-none px-6 py-4 border-t border-gray-100 bg-white flex gap-3 flex-row justify-end z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Button 
            className="flex-1 sm:flex-none w-full sm:w-auto bg-black text-white hover:bg-gray-800 h-12 text-base font-semibold rounded-xl shadow-lg" 
            onClick={handleApply}
          >
            Apply Selection ({localSelected.length})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySelector;
