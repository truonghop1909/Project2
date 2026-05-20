// hooks/useBuildingImages.ts

import { useState, useCallback, useEffect } from "react";
import { imageApi } from "../api/image.api";
import { SubImage } from "../types/building.type";


interface UseBuildingImagesOptions {
  maxSubImages?: number;
  buildingId?: number;
  autoLoad?: boolean;
}

export function useBuildingImages(options: UseBuildingImagesOptions = {}) {
  const { maxSubImages = 10, buildingId, autoLoad = true } = options;
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [subImages, setSubImages] = useState<SubImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ thumbnail?: string; subImages?: string }>({});

  const setSubImagesDirectly = useCallback((images: SubImage[]) => {
    setSubImages(images);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'Chỉ chấp nhận file ảnh (JPEG, PNG, WEBP, GIF)';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'Kích thước ảnh không được vượt quá 5MB';
    }
    return null;
  }, []);

  // Load ảnh từ server (khớp với BuildingImageEntity)
  const loadImages = useCallback(async (id: number) => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await imageApi.getSubImages(id);
      const images: SubImage[] = response.data || [];
      
      const existingSubImages: SubImage[] = images.map((img, index) => ({
        id: img.id,
        image: img.image,                              // Đường dẫn ảnh từ server
        preview: imageApi.getImageUrl(img.image),      // URL đầy đủ để hiển thị
        title: img.title || "",
        description: img.description || "",
        displayOrder: img.displayOrder !== undefined ? img.displayOrder : index,
        isNew: false,
        buildingId: id,
      }));
      
      existingSubImages.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      
      setSubImages(existingSubImages);
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      setErrors(prev => ({ ...prev, subImages: "Không thể tải danh sách ảnh" }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad && buildingId) {
      loadImages(buildingId);
    }
  }, [autoLoad, buildingId, loadImages]);

  const handleThumbnailChange = useCallback((file: File | null) => {
    if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    
    if (!file) {
      setThumbnailFile(null);
      setThumbnailPreview(thumbnailUrl || "");
      setErrors(prev => ({ ...prev, thumbnail: undefined }));
      return;
    }

    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, thumbnail: error }));
      return;
    }

    setErrors(prev => ({ ...prev, thumbnail: undefined }));
    setThumbnailFile(file);
    
    const preview = URL.createObjectURL(file);
    setThumbnailPreview(preview);
  }, [thumbnailPreview, thumbnailUrl, validateFile]);

  // Thêm ảnh mới (chưa có id, chưa có image path)
  const handleAddSubImages = useCallback((files: File[]) => {
    if (subImages.length + files.length > maxSubImages) {
      setErrors(prev => ({ 
        ...prev, 
        subImages: `Chỉ được phép tối đa ${maxSubImages} ảnh con (hiện tại ${subImages.length}/${maxSubImages})` 
      }));
      setTimeout(() => setErrors(prev => ({ ...prev, subImages: undefined })), 3000);
      return;
    }

    const newImages: SubImage[] = [];
    
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        setErrors(prev => ({ ...prev, subImages: error }));
        continue;
      }
      
      newImages.push({
        file,
        preview: URL.createObjectURL(file),
        title: "",
        description: "",
        isNew: true,
        displayOrder: subImages.length + newImages.length,
      });
    }
    
    if (newImages.length > 0) {
      setSubImages(prev => [...prev, ...newImages]);
      setErrors(prev => ({ ...prev, subImages: undefined }));
    }
  }, [subImages.length, maxSubImages, validateFile]);

  const handleRemoveSubImage = useCallback((index: number) => {
    const imageToRemove = subImages[index];
    if (imageToRemove.preview && imageToRemove.preview.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setSubImages(prev => prev.filter((_, i) => i !== index));
  }, [subImages]);

  const handleUpdateSubImage = useCallback((index: number, field: 'title' | 'description', value: string) => {
    setSubImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ));
  }, []);

  const cleanup = useCallback(() => {
    if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    subImages.forEach(image => {
      if (image.preview && image.preview.startsWith("blob:")) {
        URL.revokeObjectURL(image.preview);
      }
    });
  }, [thumbnailPreview, subImages]);

  const getNewImagesToUpload = useCallback((): SubImage[] => {
    return subImages.filter(img => img.isNew && img.file);
  }, [subImages]);

  const getDeletedImageIds = useCallback((originalImages: SubImage[]): number[] => {
    const currentIds = subImages.filter(img => img.id).map(img => img.id!).filter(id => id !== undefined);
    const originalIds = originalImages.filter(img => img.id).map(img => img.id!).filter(id => id !== undefined);
    return originalIds.filter(id => !currentIds.includes(id));
  }, [subImages]);

  const getUpdatedImages = useCallback((originalImages: SubImage[]): SubImage[] => {
    const updated: SubImage[] = [];
    subImages.forEach(currentImg => {
      if (currentImg.id) {
        const original = originalImages.find(orig => orig.id === currentImg.id);
        if (original && 
            (original.title !== currentImg.title || original.description !== currentImg.description)) {
          updated.push(currentImg);
        }
      }
    });
    return updated;
  }, [subImages]);

  const setExistingThumbnail = useCallback((url: string) => {
    setThumbnailUrl(url);
    setThumbnailPreview(url);
  }, []);

  return {
    thumbnailFile,
    thumbnailPreview,
    thumbnailUrl,
    subImages,
    loading,
    errors,
    handleThumbnailChange,
    handleAddSubImages,
    handleRemoveSubImage,
    handleUpdateSubImage,
    loadImages,
    cleanup,
    getNewImagesToUpload,
    getDeletedImageIds,
    getUpdatedImages,
    setExistingThumbnail,
    setSubImagesDirectly,
    setExistingSubImages: setSubImagesDirectly,
    maxSubImages,
    currentSubImageCount: subImages.length,
    canAddMoreSubImages: subImages.length < maxSubImages,
  };
}