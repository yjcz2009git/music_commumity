'use client';

import { useState } from 'react';

export default function CollaborationSpace() {
  const [meetingId, setMeetingId] = useState('');
  const [isInMeeting, setIsInMeeting] = useState(false);

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId.trim()) {
      setIsInMeeting(true);
    }
  };

  const createMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(7);
    setMeetingId(newMeetingId);
    setIsInMeeting(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">创作空间</h1>

          {!isInMeeting ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">加入会议</h2>
                  <form onSubmit={joinMeeting} className="space-y-4">
                    <input
                      type="text"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                      placeholder="输入会议 ID"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      加入会议
                    </button>
                  </form>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">创建新会议</h2>
                  <p className="text-gray-600 mb-4">创建一个新的创作空间，邀请其他音乐人加入</p>
                  <button
                    onClick={createMeeting}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    创建会议
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">会议 ID: {meetingId}</h3>
                    <p className="text-sm text-gray-600">分享此 ID 邀请其他参与者</p>
                  </div>
                  <button
                    onClick={() => setIsInMeeting(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    离开会议
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">主画面</span>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">参与者 1</span>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">参与者 2</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 