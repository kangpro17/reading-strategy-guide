import { useState } from 'react';

interface ImageModalProps {
    src: string;
    alt: string;
    fallbackText?: string;
}

export default function ImageModal({ src, alt, fallbackText = '이미지를 불러올 수 없습니다' }: ImageModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <>
            {/* 썸네일 */}
            <div
                className="relative cursor-pointer overflow-hidden rounded-xl glass card-hover"
                onClick={() => !hasError && setIsOpen(true)}
            >
                {hasError ? (
                    <div className="w-full h-48 flex items-center justify-center bg-[var(--color-surface-light)]">
                        <div className="text-center p-4">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="text-[var(--color-text-muted)] text-sm">{fallbackText}</p>
                            <p className="text-[var(--color-text-muted)] text-xs mt-1">나중에 이미지가 추가됩니다</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-48 object-cover"
                            onError={() => setHasError(true)}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white bg-black/50 px-4 py-2 rounded-lg text-sm">
                                🔍 클릭하여 확대
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* 모달 */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] animate-fadeIn">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-[var(--color-primary)] text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕ 닫기
                        </button>
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
