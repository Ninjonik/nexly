import React, { useState, useEffect } from 'react';

const ImagePreview = ({ url }: { url: string }) => {
    const [isImage, setIsImage] = useState<boolean>(false);

    useEffect(() => {
        // Define a function to check if the URL has a valid image extension
        const isValidImage = (url: string): boolean => {
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
            const lowercasedUrl = url.toLowerCase();
            return imageExtensions.some((ext) => lowercasedUrl.endsWith(ext));
        };

        // Check if the URL is a valid image or GIF
        if (isValidImage(url)) {
            const img = new Image();
            img.onload = () => setIsImage(true);
            img.onerror = () => setIsImage(false);
            img.src = url;
        } else {
            // If the URL doesn't have a valid image extension, set isImage to false
            setIsImage(false);
        }
    }, [url]);

    return isImage ? <img src={url} alt="Preview" /> : <span>{url}</span>;
};

export default ImagePreview;
