import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EditPhotosTab = ({ photos: initialPhotos = [], onPhotosChange }) => {
  const [photos, setPhotos] = useState(initialPhotos?.length > 0 ? initialPhotos : [
    {
      id: 1,
      url: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Finished chocolate chip cookies",
      isPrimary: true,
      uploadDate: "2025-09-15"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      caption: "Cookie dough with chocolate chips",
      isPrimary: false,
      uploadDate: "2025-09-15"
    },
    {
      id: 3,
      url: "https://images.pixabay.com/photo/2017/07/16/15/39/cookies-2509781_960_720.jpg",
      caption: "Cookies baking in the oven",
      isPrimary: false,
      uploadDate: "2025-09-15"
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event?.target?.files);
    
    files?.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Math.max(...photos?.map(p => p?.id), 0) + 1,
          url: e?.target?.result,
          caption: "",
          isPrimary: photos?.length === 0,
          uploadDate: new Date()?.toISOString()?.split('T')?.[0]
        };
        const updated = [...photos, newPhoto];
        setPhotos(updated);
        onPhotosChange?.(updated);
      };
      reader?.readAsDataURL(file);
    });
  };

  const updatePhoto = (id, field, value) => {
    const updated = photos?.map(photo =>
      photo?.id === id ? { ...photo, [field]: value } : photo
    );
    setPhotos(updated);
    onPhotosChange?.(updated);
  };

  const removePhoto = (id) => {
    const photoToRemove = photos?.find(p => p?.id === id);
    let updated = photos?.filter(photo => photo?.id !== id);
    
    // If removing primary photo, make first remaining photo primary
    if (photoToRemove?.isPrimary && updated?.length > 0) {
      updated[0].isPrimary = true;
    }
    
    setPhotos(updated);
    onPhotosChange?.(updated);
  };

  const setPrimaryPhoto = (id) => {
    const updated = photos?.map(photo => ({
      ...photo,
      isPrimary: photo?.id === id
    }));
    setPhotos(updated);
    onPhotosChange?.(updated);
  };

  const handleDragStart = (e, photo) => {
    setDraggedItem(photo);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPhoto) => {
    e?.preventDefault();
    if (!draggedItem || draggedItem?.id === targetPhoto?.id) return;

    const draggedIndex = photos?.findIndex(p => p?.id === draggedItem?.id);
    const targetIndex = photos?.findIndex(p => p?.id === targetPhoto?.id);

    const newPhotos = [...photos];
    newPhotos?.splice(draggedIndex, 1);
    newPhotos?.splice(targetIndex, 0, draggedItem);

    setPhotos(newPhotos);
    onPhotosChange?.(newPhotos);
    setDraggedItem(null);
  };

  return (
    <div 
      id="photos-panel" 
      role="tabpanel" 
      aria-labelledby="photos-tab"
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground mb-1">
              Edit Recipe Photos
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload, reorder, and manage your recipe photos
            </p>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="photo-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              iconName="Upload"
              iconPosition="left"
            >
              Upload Photos
            </Button>
          </div>
        </div>

        {photos?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos?.map((photo) => (
              <div
                key={photo?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, photo)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, photo)}
                className="group relative bg-muted/30 rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-all duration-200 cursor-move"
              >
                {/* Primary Badge */}
                {photo?.isPrimary && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-1 text-xs font-caption font-medium bg-primary text-primary-foreground rounded-full">
                      Primary
                    </span>
                  </div>
                )}

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-center w-6 h-6 bg-background/80 text-foreground rounded backdrop-blur-sm">
                    <Icon name="GripVertical" size={14} />
                  </div>
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={photo?.url}
                    alt={photo?.caption || "Recipe photo"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Photo Info */}
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Add a caption..."
                    value={photo?.caption}
                    onChange={(e) => updatePhoto(photo?.id, 'caption', e?.target?.value)}
                    className="w-full px-2 py-1 text-sm bg-transparent border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(photo.uploadDate)?.toLocaleDateString()}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      {!photo?.isPrimary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPrimaryPhoto(photo?.id)}
                          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Set Primary
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePhoto(photo?.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Camera" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-medium text-lg text-foreground mb-2">
              No photos yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Upload photos to showcase your recipe
            </p>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Upload First Photo
            </Button>
          </div>
        )}

        {/* Upload Tips */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-body font-medium text-sm text-foreground mb-2">
            Photo Tips
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload high-quality images for best results</li>
            <li>• The primary photo will be used as the main recipe image</li>
            <li>• Drag photos to reorder them</li>
            <li>• Add captions to describe each photo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditPhotosTab;