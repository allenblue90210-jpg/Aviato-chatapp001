import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { 
  ChevronLeft, 
  MessageSquare, 
  Lock, 
  Calendar, 
  Clock, 
  Users, 
  PauseCircle,
  MoreVertical,
  ThumbsUp,
  Star
} from 'lucide-react';
import { checkUserAvailability, getModeColor } from '../utils/availability';
import { AvailabilityMode } from '../data/mockData';

export default function MatchPage() {
  const navigate = useNavigate();
  const { users, currentUser, addSelection, currentSelections, findMatches } = useAppContext();

  // If we have selections, show matches. Otherwise show browsing.
  // Sort users by approval rating (highest first)
  const displayUsers = currentSelections.length >= 5 
    ? findMatches() 
    : [...users].sort((a, b) => b.approvalRating - a.approvalRating);

  const handleMessage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Aviato" className="h-8 w-8" onError={(e) => e.target.style.display = 'none'} />
          <span className="font-bold text-xl text-blue-600">Aviato</span>
        </div>
        <div className="flex gap-3">
           {/* Header actions */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {displayUsers.filter(u => u.id !== currentUser?.id).map(user => (
          <MatchCard 
            key={user.id} 
            user={user} 
            onMessage={() => handleMessage(user.id)} 
          />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ user, onMessage }) {
  const { available, reason, modeColor, statusText } = checkUserAvailability(user);
  
  // Custom logic for button state
  // Using the 'available' flag from checkUserAvailability which now handles all strict rules
  const canMessage = available;

  const getStatusIcon = () => {
    switch(user.availabilityMode) {
      case AvailabilityMode.RED: return <Lock className="w-4 h-4" />;
      case AvailabilityMode.GRAY: return <PauseCircle className="w-4 h-4" />;
      case AvailabilityMode.BLUE: return <Calendar className="w-4 h-4" />;
      case AvailabilityMode.YELLOW: return <Clock className="w-4 h-4" />;
      case AvailabilityMode.BROWN: return <Clock className="w-4 h-4" />;
      case AvailabilityMode.ORANGE: return <Users className="w-4 h-4" />;
      case AvailabilityMode.GREEN: return null; // Standard green dot
      default: return null; // Invisible
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex gap-4">
        {/* Avatar with Mode Indicator */}
        <div className="relative">
          <img 
            src={user.profilePic} 
            alt={user.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: modeColor }}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.vibe} • {user.location}</p>
            </div>
            {user.matchPercentage && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold">
                {user.matchPercentage}% Match
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3 text-gray-400" />
              <span>{user.approvalRating > 0 ? `+${user.approvalRating}` : user.approvalRating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{user.reviewRating} ({user.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status & Action */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          <span style={{ color: modeColor }} className="font-medium">
            {statusText || reason}
          </span>
        </div>

        <button
          onClick={onMessage}
          disabled={!canMessage}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors
            ${canMessage 
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {canMessage ? (
            <>
              <MessageSquare className="w-4 h-4" />
              Message
            </>
          ) : (
            'Unavailable'
          )}
        </button>
      </div>
    </div>
  );
}
