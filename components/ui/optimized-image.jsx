var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Image from 'next/image';
import { useEffect, useState } from 'react';
/**
 * OptimizedImage component with progressive loading, blur-up effect, and fallback
 *
 * @param src - Image source URL
 * @param alt - Alternative text for accessibility
 * @param width - Image width
 * @param height - Image height
 * @param fallbackSrc - Fallback image to display on error
 * @param lowQualitySrc - Low quality image to show while loading (or use blurDataURL)
 * @param className - CSS class for the image
 * @param wrapperClassName - CSS class for the wrapper div
 * @param loadingClassName - CSS class to apply during loading
 * @param onLoad - Callback function when image loads
 * @param props - Other Next/Image props
 */
export function OptimizedImage(_a) {
    var { src, alt, width, height, fallbackSrc, lowQualitySrc, className = '', wrapperClassName = '', loadingClassName = 'animate-pulse bg-gray-200 dark:bg-gray-800', onLoad } = _a, props = __rest(_a, ["src", "alt", "width", "height", "fallbackSrc", "lowQualitySrc", "className", "wrapperClassName", "loadingClassName", "onLoad"]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);
    // Reset loading state when src changes
    useEffect(() => {
        setIsLoading(true);
        setError(false);
        setImageSrc(src);
    }, [src]);
    // Handle image load error
    const handleError = () => {
        if (fallbackSrc && !error) {
            setError(true);
            setImageSrc(fallbackSrc);
        }
    };
    // Handle image load complete
    const handleLoadingComplete = () => {
        setIsLoading(false);
        if (onLoad)
            onLoad();
    };
    return (<div className={`relative overflow-hidden ${wrapperClassName}`}>
      {isLoading && (<div className={`absolute inset-0 ${loadingClassName}`} style={{
                zIndex: 1,
                opacity: isLoading ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }} aria-hidden="true"/>)}
      <Image src={imageSrc} alt={alt} width={width} height={height} className={`transition-opacity duration-300 ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`} onLoadingComplete={handleLoadingComplete} onError={handleError} placeholder={props.blurDataURL || lowQualitySrc ? "blur" : "empty"} blurDataURL={props.blurDataURL || lowQualitySrc} loading={props.priority ? "eager" : "lazy"} {...props}/>
    </div>);
}
