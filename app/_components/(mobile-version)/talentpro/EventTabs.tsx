import React, { useEffect, useState } from 'react'

export function EventTabs({ setActiveTab, activeTab }: any) {
    return (
        <div className="flex-1">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center space-x-4 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-6 py-2 text-lg font-medium transition-colors duration-200
                    ${activeTab === 'upcoming'
                                ? 'border-b-2 border-[#350ABC] text-[#350ABC]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('myevents')}
                        className={`px-6 py-2 text-lg font-medium transition-colors duration-200
                    ${activeTab === 'myevents'
                                ? 'border-b-2 border-[#350ABC] text-[#350ABC]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        My Events
                    </button>
                </div>
            </div>
        </div>
    );
}
