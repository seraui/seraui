"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';

// --- Constants ---
const CARD_WIDTH = 256;
const CARD_HEIGHT = 171;
const GALLERY_JSON_URL =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/gallery.json';

const NEIGHBOURS: [number, number][] = [
  [0, -1], [0, 1], [1, 0], [-1, 0],
  [1, 1], [-1, 1], [-1, -1], [1, -1]
];

// --- Types ---
interface GalleryItem {
  id?: number;
  thumb_src: string;
  title?: string;
  full_src?: string;
}

interface Offset {
  x: number;
  y: number;
}

interface CardProps {
  descriptor: GalleryItem;
  x: number;
  y: number;
}

interface InfiniteDraggableGridProps {
  gallery: GalleryItem[];
}

// --- Helper Functions ---
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const applyDamping = (velocity: number, deltaTime: number) => {
  const dampingRate = 0.0028;
  return velocity * Math.exp(-dampingRate * deltaTime);
};

const smoothStep = (
  current: number,
  target: number,
  deltaTime: number,
  speed = 0.15
) => current + (target - current) * (1 - Math.exp(-speed * deltaTime));

// --- Hooks ---
const useViewportSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
};

// --- Components ---
const Card = React.memo<CardProps>(({ descriptor, x, y }) => {
  const [opacity, setOpacity] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setOpacity(0);
    const img = new Image();
    img.src = descriptor.thumb_src;
    const fadeIn = () => {
      let start: number | null = null;
      const fade = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / 300);
        setOpacity(p);
        if (p < 1) requestAnimationFrame(fade);
      };
      requestAnimationFrame(fade);
    };

    if (img.decode) {
      img.decode().then(fadeIn).catch(fadeIn);
    } else {
      img.onload = fadeIn;
    }
  }, [descriptor]);

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        willChange: 'transform',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        maxWidth: CARD_WIDTH,
        maxHeight: CARD_HEIGHT,
        contain: 'layout style paint',
      }}
    >
      <img
        ref={imgRef}
        src={descriptor.thumb_src}
        alt={descriptor.title || 'Gallery image'}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          opacity,
          transition: 'opacity 0.3s ease-out',
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}, (prevProps, nextProps) =>
  prevProps.descriptor === nextProps.descriptor &&
  prevProps.x === nextProps.x &&
  prevProps.y === nextProps.y
);

Card.displayName = 'Card';

const InfiniteDraggableGrid: React.FC<InfiniteDraggableGridProps> = ({ gallery }) => {
  const viewportSize = useViewportSize();
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [targetOffset, setTargetOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<
    { key: string; descriptor: GalleryItem; x: number; y: number }[]
  >([]);
  const [velocity, setVelocity] = useState<Offset>({ x: 0, y: 0 });

  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef<Offset>({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(Date.now());
  const picksRef = useRef<Record<string, GalleryItem>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const momentumRef = useRef<Offset>({ x: 0, y: 0 });

  // Detect if we're in fullscreen mode by checking parent container
  useEffect(() => {
    const checkFullscreen = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        const isInFullscreenContainer = parent?.classList.contains('fixed') &&
                                       parent?.classList.contains('inset-0');
        setIsFullscreen(isInFullscreenContainer || false);
      }
    };

    checkFullscreen();
    const observer = new MutationObserver(checkFullscreen);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  useAnimationFrame(
    useCallback(
      (deltaTime) => {
        if (!isDraggingRef.current) {
          momentumRef.current.x = applyDamping(momentumRef.current.x, deltaTime);
          momentumRef.current.y = applyDamping(momentumRef.current.y, deltaTime);

          if (Math.abs(momentumRef.current.x) < 0.01) momentumRef.current.x = 0;
          if (Math.abs(momentumRef.current.y) < 0.01) momentumRef.current.y = 0;

          setTargetOffset((prev) => ({
            x: prev.x + momentumRef.current.x,
            y: prev.y + momentumRef.current.y
          }));
        }
        setOffset((prev) => ({
          x: smoothStep(prev.x, targetOffset.x, deltaTime, isDraggingRef.current ? 0.4 : 0.18),
          y: smoothStep(prev.y, targetOffset.y, deltaTime, isDraggingRef.current ? 0.4 : 0.18)
        }));
      },
      [targetOffset]
    )
  );

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    momentumRef.current = { x: 0, y: 0 };
    const point = 'touches' in e ? e.touches[0] : e;
    lastPositionRef.current = { x: point.clientX, y: point.clientY };
    lastTimeRef.current = Date.now();
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, []);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const point = (e instanceof TouchEvent) ? e.touches[0] : e;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTimeRef.current;

    const deltaX = point.clientX - lastPositionRef.current.x;
    const deltaY = point.clientY - lastPositionRef.current.y;

    if (timeDelta > 0) {
      const vx = (deltaX / timeDelta) * 16;
      const vy = (deltaY / timeDelta) * 16;
      setVelocity((prev) => ({
        x: prev.x * 0.5 + vx * 0.5,
        y: prev.y * 0.5 + vy * 0.5
      }));
    }
    lastPositionRef.current = { x: point.clientX, y: point.clientY };
    lastTimeRef.current = currentTime;

    setTargetOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    momentumRef.current = {
      x: clamp(velocity.x, -30, 30),
      y: clamp(velocity.y, -30, 30)
    };
    setVelocity({ x: 0, y: 0 });
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  }, [velocity]);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => handleDragMove(e);
    const end = () => handleDragEnd();

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchend', end);
    };
  }, [handleDragMove, handleDragEnd]);

  const visibleCardsData = useMemo(() => {
    if (!gallery.length || viewportSize.width === 0) return [];
    const getGalleryDescriptor = (index: number) =>
      gallery[Math.abs(index % gallery.length)];
    const getRandomSafe = (col: number, row: number): GalleryItem => {
      let pick: GalleryItem | undefined;
      let tries = 0;
      while (pick === undefined) {
        const rnd = Math.floor(Math.random() * gallery.length);
        const item = getGalleryDescriptor(rnd);
        let isSafe = true;
        for (const offsets of NEIGHBOURS) {
          const key = `${col + offsets[0]}:${row + offsets[1]}`;
          if (picksRef.current[key] === item) {
            isSafe = false;
            break;
          }
        }
        if (tries++ > 20 || isSafe) {
          pick = item;
        }
      }
      return pick;
    };
    const getRandomDescriptor = (col: number, row: number) => {
      const key = `${col}:${row}`;
      if (!picksRef.current[key]) {
        picksRef.current[key] = getRandomSafe(col, row);
      }
      return picksRef.current[key];
    };
    const getCardPos = (col: number, row: number) => {
      const x = col * CARD_WIDTH + (Math.round(offset.x) % CARD_WIDTH) - CARD_WIDTH;
      const y = row * CARD_HEIGHT + (Math.round(offset.y) % CARD_HEIGHT) - CARD_HEIGHT;
      return [x, y] as const;
    };
    const isVisible = (x: number, y: number) => {
      const buffer = 100;
      return (
        x + CARD_WIDTH > -buffer &&
        y + CARD_HEIGHT > -buffer &&
        x < viewportSize.width + buffer &&
        y < viewportSize.height + buffer
      );
    };
    const viewCols = Math.ceil(viewportSize.width / CARD_WIDTH) + 4;
    const viewRows = Math.ceil(viewportSize.height / CARD_HEIGHT) + 4;
    const colOffset = Math.floor(offset.x / CARD_WIDTH) * -1;
    const rowOffset = Math.floor(offset.y / CARD_HEIGHT) * -1;

    const newVisibleCards: {
      key: string; descriptor: GalleryItem; x: number; y: number;
    }[] = [];

    for (let row = -2; row < viewRows; row++) {
      for (let col = -2; col < viewCols; col++) {
        const tCol = colOffset + col;
        const tRow = rowOffset + row;
        const desc = getRandomDescriptor(tCol, tRow);
        const [x, y] = getCardPos(col, row);
        if (isVisible(x, y)) {
          newVisibleCards.push({
            key: `${tCol}:${tRow}`,
            descriptor: desc,
            x, y
          });
        }
      }
    }
    return newVisibleCards;
  }, [gallery, offset, viewportSize]);

  useEffect(() => {
    setVisibleCards(visibleCardsData);
  }, [visibleCardsData]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full select-none cursor-grab overflow-hidden ${
        isFullscreen ? 'fixed inset-0' : 'relative'
      }`}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        touchAction: 'none',
        minHeight: isFullscreen ? '100vh' : '400px',
        height: isFullscreen ? '100vh' : '100%',
        width: isFullscreen ? '100vw' : '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {visibleCards.map((card) => (
          <Card key={card.key} descriptor={card.descriptor} x={card.x} y={card.y} />
        ))}
      </div>

      {/* Centered "drag me" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-white text-6xl font-bold tracking-wider opacity-80 select-none drop-shadow-2xl">
          drag me
        </h1>
      </div>
    </div>
  );
};

// --- Main App ---
// Fallback data with real gallery images
const FALLBACK_GALLERY: GalleryItem[] = [
  { id: 0, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/0.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_0.jpg", title: "Gallery Image 0" },
  { id: 1, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/1.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_1.jpg", title: "Gallery Image 1" },
  { id: 2, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/2.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_2.jpg", title: "Gallery Image 2" },
  { id: 3, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/3.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_3.jpg", title: "Gallery Image 3" },
  { id: 4, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/4.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_4.jpg", title: "Gallery Image 4" },
  { id: 5, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/5.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_5.jpg", title: "Gallery Image 5" },
  { id: 6, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/6.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_6.jpg", title: "Gallery Image 6" },
  { id: 7, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/7.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_7.jpg", title: "Gallery Image 7" },
  { id: 8, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/8.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_8.jpg", title: "Gallery Image 8" },
  { id: 9, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/9.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_9.jpg", title: "Gallery Image 9" },
  { id: 10, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/10.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_10.jpg", title: "Gallery Image 10" },
  { id: 11, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/11.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_11.jpg", title: "Gallery Image 11" },
  { id: 12, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/12.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_12.jpg", title: "Gallery Image 12" },
  { id: 13, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/13.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_13.jpg", title: "Gallery Image 13" },
  { id: 14, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/14.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_14.jpg", title: "Gallery Image 14" },
  { id: 15, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/15.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_15.jpg", title: "Gallery Image 15" },
  { id: 16, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/16.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_16.jpg", title: "Gallery Image 16" },
  { id: 17, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/17.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_17.jpg", title: "Gallery Image 17" },
  { id: 18, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/18.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_18.jpg", title: "Gallery Image 18" },
  { id: 19, full_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/19.jpg", thumb_src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/thumb_19.jpg", title: "Gallery Image 19" },
];

export default function Infinitegrid() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GALLERY_JSON_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: { images: GalleryItem[] } = await response.json();
        if (data.images && data.images.length > 0) {
          // Add titles to images that don't have them
          const imagesWithTitles = data.images.map((img, index) => ({
            ...img,
            title: img.title || `Gallery Image ${img.id ?? index}`
          }));
          setGalleryData(imagesWithTitles);
        }
      } catch (e) {
        console.warn('Failed to fetch gallery data, using fallback:', e);
        // Keep using fallback data instead of showing error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading && galleryData.length === 0) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white font-sans min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
          <div className="text-sm">Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black overflow-hidden m-0 min-h-[400px]">
      <InfiniteDraggableGrid gallery={galleryData} />
      {isLoading && (
        <div className="absolute top-2 right-2 text-white text-xs opacity-50">
          Updating...
        </div>
      )}
    </div>
  );
}