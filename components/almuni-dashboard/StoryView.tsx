'use client';

import { useState } from 'react';
import { mockStories, removeStory, type AlumniStory } from '@/lib/mock-stories';
import StoryCard from './StoryCard';

export default function StoryView() {
  const [stories, setStories] = useState<AlumniStory[]>(() => [...mockStories]);

  const handleDismiss = (id: string) => {
    removeStory(id);
    setStories([...mockStories]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} onDismiss={() => handleDismiss(story.id)} />
      ))}

      {stories.length === 0 && (
        <p className="text-center text-sm text-[#8B87A3] py-10">No stories to show.</p>
      )}
    </div>
  );
}