import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
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
        if (prev.length >= 20) return prev; // Max limit if needed, or remove
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
      <SheetContent side="bottom" className="h-[90vh] sm:h-[600px] flex flex-col rounded-t-xl bg-white p-0 [&>button]:hidden">
        <SheetHeader className="px-4 py-3 relative border-b border-gray-100 flex items-center justify-center shrink-0">
          <div className="text-center w-full">
            <SheetTitle className="text-lg font-bold text-gray-900">Select any choice</SheetTitle>
            <SheetDescription className="text-xs text-gray-500 mt-0.5">
              Find your vibe
            </SheetDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onClose(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 hover:bg-red-50 font-medium"
          >
            Cancel
          </Button>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Selected: {localSelected.length}
            </span>
            {localSelected.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="text-red-500 hover:text-red-600 h-auto p-0"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-full pr-4 pb-20">
            <div className="flex flex-wrap gap-2">
              {mockInterests.map((interest) => {
                const isSelected = localSelected.includes(interest);
                return (
                  <div
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`
                      cursor-pointer px-3 py-2 rounded-full text-sm font-medium border transition-all
                      flex items-center gap-1.5
                      ${isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }
                    `}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {interest}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <SheetFooter className="px-6 pb-8 pt-4 border-t border-gray-100 bg-white flex gap-3 flex-row sm:justify-end">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none h-12 text-lg font-medium border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900" 
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 sm:flex-none sm:min-w-[150px] bg-blue-600 hover:bg-blue-700 h-12 text-lg font-medium shadow-md" 
            onClick={handleApply}
          >
            Apply ({localSelected.length})
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySelector;
