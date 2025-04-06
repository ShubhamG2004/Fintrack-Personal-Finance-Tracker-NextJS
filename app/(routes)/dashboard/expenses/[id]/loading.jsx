import React from 'react'
import { Loader2 } from 'lucide-react'

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        <span className="text-gray-600">Loading...</span>
      </div>
    </div>
  )
}

export default Loading