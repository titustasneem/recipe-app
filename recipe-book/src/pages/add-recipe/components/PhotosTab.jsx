import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PhotosTab = ({ 
  photos = [], 
  onPhotosChange, 
  errors = {} 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => file?.type?.startsWith('image/'));
    
    validFiles?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: e?.target?.result,
          name: file?.name,
          size: file?.size,
          type: file?.type,
          isMain: photos?.length === 0 // First photo becomes main
        };
        onPhotosChange([...photos, newPhoto]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = e?.dataTransfer?.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    handleFileSelect(files);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    
    // If we removed the main photo, make the first remaining photo main
    if (updatedPhotos?.length > 0) {
      const removedPhoto = photos?.find(photo => photo?.id === photoId);
      if (removedPhoto?.isMain) {
        updatedPhotos[0].isMain = true;
      }
    }
    
    onPhotosChange(updatedPhotos);
  };

  const setMainPhoto = (photoId) => {
    const updatedPhotos = photos?.map(photo => ({
      ...photo,
      isMain: photo?.id === photoId
    }));
    onPhotosChange(updatedPhotos);
  };

  const movePhoto = (photoId, direction) => {
    const currentIndex = photos?.findIndex(photo => photo?.id === photoId);
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= photos?.length) return;
    
    const updatedPhotos = [...photos];
    [updatedPhotos[currentIndex], updatedPhotos[newIndex]] = 
    [updatedPhotos?.[newIndex], updatedPhotos?.[currentIndex]];
    
    onPhotosChange(updatedPhotos);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recipe Photos
          </h3>
          <p className="text-sm text-muted-foreground">
            Add photos to showcase your recipe
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fileInputRef?.current?.click()}
          iconName="ImagePlus"
          iconPosition="left"
          iconSize={16}
        >
          Add Photos
        </Button>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Icon 
          name="Upload" 
          size={48} 
          className={`mx-auto mb-4 ${dragOver ? 'text-primary' : 'text-muted-foreground'}`} 
        />
        <h4 className="font-heading font-medium text-foreground mb-2">
          {dragOver ? 'Drop photos here' : 'Drag & drop photos here'}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse your files
        </p>
        <Button
          variant="default"
          onClick={() => fileInputRef?.current?.click()}
          iconName="FolderOpen"
          iconPosition="left"
          iconSize={16}
        >
          Choose Files
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Supports: JPG, PNG, GIF up to 10MB each
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />
      {/* Photos Grid */}
      {photos?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-medium text-foreground">
              Uploaded Photos ({photos?.length})
            </h4>
            <p className="text-sm text-muted-foreground">
              Click on a photo to set it as the main image
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos?.map((photo, index) => (
              <div
                key={photo?.id}
                className={`relative group bg-card border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-soft ${
                  photo?.isMain ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                {/* Main Photo Badge */}
                {photo?.isMain && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-1 text-xs font-caption font-medium bg-primary text-primary-foreground rounded-full">
                      Main Photo
                    </span>
                  </div>
                )}

                {/* Photo */}
                <div 
                  className="aspect-[4/3] cursor-pointer"
                  onClick={() => setMainPhoto(photo?.id)}
                >
                  <Image
                    src={photo?.url}
                    alt={photo?.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Photo Info */}
                <div className="p-3">
                  <p className="text-sm font-body font-medium text-foreground truncate">
                    {photo?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(photo?.size)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => movePhoto(photo?.id, 'left')}
                    disabled={index === 0}
                    className="h-8 w-8 p-0 bg-background/90 hover:bg-background backdrop-blur-sm"
                  >
                    <Icon name="ChevronLeft" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => movePhoto(photo?.id, 'right')}
                    disabled={index === photos?.length - 1}
                    className="h-8 w-8 p-0 bg-background/90 hover:bg-background backdrop-blur-sm"
                  >
                    <Icon name="ChevronRight" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhoto(photo?.id)}
                    className="h-8 w-8 p-0 bg-background/90 hover:bg-destructive text-foreground hover:text-destructive-foreground backdrop-blur-sm"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {photos?.length === 0 && (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <Icon name="Camera" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="font-heading font-medium text-foreground mb-2">
            No photos added yet
          </h4>
          <p className="text-sm text-muted-foreground">
            Photos help make your recipe more appealing and easier to follow
          </p>
        </div>
      )}
      {errors?.photos && (
        <p className="text-sm text-error">{errors?.photos}</p>
      )}
    </div>
  );
};

export default PhotosTab;