import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotosTab = ({ photos, onAddPhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction) => {
    if (lightboxIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % photos?.length
      : (lightboxIndex - 1 + photos?.length) % photos?.length;
    
    setLightboxIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (lightboxIndex === null) return;
    
    switch (e?.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft': navigateLightbox('prev');
        break;
      case 'ArrowRight': navigateLightbox('next');
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const photoCategories = [
    { id: 'all', label: 'All Photos', count: photos?.length },
    { id: 'process', label: 'Process', count: photos?.filter(p => p?.category === 'process')?.length },
    { id: 'final', label: 'Final Result', count: photos?.filter(p => p?.category === 'final')?.length },
    { id: 'ingredients', label: 'Ingredients', count: photos?.filter(p => p?.category === 'ingredients')?.length }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos?.filter(photo => photo?.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {photoCategories?.map(category => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            className="text-sm"
          >
            {category?.label} ({category?.count})
          </Button>
        ))}
      </div>
      {/* Add Photo Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Recipe Photos ({filteredPhotos?.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddPhoto}
          iconName="Plus"
          iconPosition="left"
        >
          Add Photo
        </Button>
      </div>
      {/* Photos Grid */}
      {filteredPhotos?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos?.map((photo, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer border border-border hover:border-primary transition-all duration-200"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={photo?.url}
                alt={photo?.caption || `Recipe photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                />
              </div>

              {/* Category Badge */}
              {photo?.category && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 text-xs font-caption bg-background/90 text-foreground rounded-full backdrop-blur-sm">
                    {photo?.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            No Photos Yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Add photos to document your cooking process and final results
          </p>
          <Button
            variant="outline"
            onClick={onAddPhoto}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Photo
          </Button>
        </div>
      )}
      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
            >
              <Icon name="X" size={20} />
            </Button>

            {/* Navigation Buttons */}
            {photos?.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </>
            )}

            {/* Image */}
            <Image
              src={photos?.[lightboxIndex]?.url}
              alt={photos?.[lightboxIndex]?.caption || `Recipe photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Caption */}
            {photos?.[lightboxIndex]?.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm">{photos?.[lightboxIndex]?.caption}</p>
              </div>
            )}

            {/* Photo Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-mono backdrop-blur-sm">
              {lightboxIndex + 1} / {photos?.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosTab;