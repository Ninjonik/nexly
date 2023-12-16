const isValidImageUrl = (url: string): boolean => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const lowercasedUrl = url.toLowerCase();
    return imageExtensions.some((ext) => lowercasedUrl.endsWith(ext));
};

export { isValidImageUrl }; // Export the helper function
