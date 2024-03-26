import React, { useState, useEffect } from 'react';

const ImagePreview = ({ url }: { url: string }) => {
    const [isImage, setIsImage] = useState<boolean>(false);

    useEffect(() => {
        const isValidImage = (url: string): boolean => {
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
            const lowercasedUrl = url.toLowerCase();
            return imageExtensions.some((ext) => lowercasedUrl.endsWith(ext));
        };

        if (isValidImage(url)) {
            const img = new Image();
            img.onload = () => setIsImage(true);
            img.onerror = () => setIsImage(false);
            img.src = url;
        } else {
            setIsImage(false);
        }
    }, [url]);

    return isImage ? <img src={url} alt="Preview" /> : <span>{url}</span>;
};

export default ImagePreview;
