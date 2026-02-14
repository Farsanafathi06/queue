'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-200 via-pink-200 to-blue-200">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl mb-4 shadow-lg animate-pulse">
          <span className="text-2xl font-bold text-white">Q</span>
        </div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
}