import { useEffect, useState, useRef } from 'react';

export default function MagicCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const bookRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    // 마우스 위치 추적
    useEffect(() => {
        let moveTimeout: ReturnType<typeof setTimeout>;

        const onMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current || !bookRef.current) return;

            // 커서 위치 이동
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            // 움직임 감지 상태 (커서 꼬리 효과를 위해)
            setIsMoving(true);
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => setIsMoving(false), 100);

            // 호버링 체크 (링크나 버튼 위)
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    // 모바일에서는 커서 숨김
    if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
            style={{ willChange: 'transform' }}
        >
            {/* 마법책 컨테이너 */}
            <div
                ref={bookRef}
                className={`relative -top-4 -left-4 transition-all duration-300 ease-out ${isHovering ? 'scale-125 rotate-[-5deg]' : 'scale-100'
                    }`}
            >
                {/* 책 SVG 아이콘 */}
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`drop-shadow-lg transition-transform duration-500 ${isMoving ? 'animate-book-flutter' : ''}`}
                >
                    {/* 책 표지 (Wood Brown) */}
                    <path
                        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V6.5A2.5 2.5 0 0 1 17.5 4H6.5A2.5 2.5 0 0 0 4 6.5V19.5Z"
                        fill="#5D4037"
                    />
                    {/* 책 페이지 (Cream) - 펼쳐지는 애니메이션 효과를 위해 패스 분리 */}
                    <path
                        d="M6.5 17H20"
                        stroke="#F5F1E8"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6.5 4H17.5"
                        stroke="#F5F1E8"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6 6.5V17"
                        stroke="#8D6E63"
                        strokeWidth="1.5"
                    />

                    {/* 마법 가루 효과 (호버 시 등장) */}
                    {isHovering && (
                        <g className="animate-pulse">
                            <circle cx="20" cy="4" r="2" fill="#FFB300" />
                            <circle cx="22" cy="8" r="1.5" fill="#FFB300" />
                            <circle cx="18" cy="2" r="1" fill="#FFB300" />
                        </g>
                    )}
                </svg>
            </div>

            {/* 커서 꼬리 효과 (Magic Trail) */}
            <div
                className={`absolute top-0 left-0 w-2 h-2 rounded-full bg-[#FFB300] opacity-50 blur-[2px] transition-all duration-100 delay-75 ${isMoving ? 'scale-100' : 'scale-0'}`}
            />
        </div>
    );
}
