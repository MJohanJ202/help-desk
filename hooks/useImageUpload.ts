"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  DragEvent,
} from "react";

export interface UseImageUploadOptions {
  maxSizeMB?: number;
  validTypes?: string[];
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const {
    maxSizeMB = 2,
    validTypes = ["image/png", "image/jpeg", "image/webp", "image/jpg"],
  } = options;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handlePreview = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleCloseFullScreen = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleCloseFullScreen);
    return () => window.removeEventListener("keydown", handleCloseFullScreen);
  }, [isExpanded]);

  const handleFile = (file: File) => {
    setErrorMsg(null);

    if (!validTypes.includes(file.type)) {
      setErrorMsg("Formato no válido. Usa PNG, JPEG, JPG o WEBP.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`El archivo excede el tamaño máximo de ${maxSizeMB}MB.`);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsExpanded(false);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    selectedFile,
    previewUrl,
    isExpanded,
    handlePreview,
    isDragging,
    errorMsg,
    fileInputRef,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
  };
}
