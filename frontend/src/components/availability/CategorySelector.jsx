import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { mockInterests } from '../../data/mockData';
import { Check } from 'lucide-react';

const CategorySelector = ({ 
  isOpen, 
  onClose, 
  selected, 
  onToggle, 
  onClear 
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[600px] flex flex-col rounded-t-xl">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Match Preferences</SheetTitle>
          <SheetDescription>
            Select interests to find people with similar vibes.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Selected: {selected.length}
            </span>
            {selected.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClear}
                className="text-red-500 hover:text-red-600 h-auto p-0"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-wrap gap-2">
              {mockInterests.map((interest) => {
                const isSelected = selected.includes(interest);
                return (
                  <div
                    key={interest}
                    onClick={() => onToggle(interest)}
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

        <SheetFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onClose(false)}>
            Done ({selected.length})
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySelector;
