export function getPhotoId(photo) {
  return `${photo.memoryId}-${photo.photoIndex}`;
}

export function getMemoryPhotos(memory) {
  return memory.photos.map((photo, photoIndex) => ({
    ...photo,
    memoryId: memory.id,
    memoryTitle: memory.title,
    memoryDate: memory.date,
    memoryLocation: memory.location,
    memoryAccent: memory.accent,
    mood: memory.mood,
    moodLabel: memory.moodLabel,
    photoIndex,
  }));
}

export function getAllPhotos(memories) {
  return memories.flatMap(getMemoryPhotos);
}

export function getRecentPhotos(memories, count = 3) {
  return getAllPhotos(memories).slice(-count).reverse();
}
