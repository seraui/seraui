"use client";
import React from "react";

// --- Caching Mechanism ---
// Use a Map to cache API results for the duration of the session.
const apiCache = new Map<string, { data: Icon[]; pages: number }>();

// --- Custom Hook for Dark Mode ---
function useDarkMode() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
}

// --- Types ---
interface Icon {
  id: string;
  title: string;
  text: string;
}

// --- Main App Component ---
export default function Svgicons() {
  const { theme } = useDarkMode();
  // State management for icons, search, loading, and pagination
  const [icons, setIcons] = React.useState<Icon[]>([]);
  const [searchTerm, setSearchTerm] = React.useState(""); // Current input value, starts empty
  const [activeQuery, setActiveQuery] = React.useState(""); // The submitted query, starts empty for random load
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  // --- API Fetching with Caching ---
  const fetchIcons = React.useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    let cacheKey, url;

    // If there's no active search query, fetch random icons. Otherwise, search for the query.
    if (!query) {
      url = `https://svg-fetch0.vercel.app/api/search?page=${page - 1}&limit=48&random=true`;
      cacheKey = `random-page-${page}`;
    } else {
      url = `https://svg-fetch0.vercel.app/api/search?search=${encodeURIComponent(query)}&page=${page - 1}&limit=48`;
      cacheKey = `${query}-page-${page}`;
    }

    // Check cache first
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      if (cachedData) {
        setIcons(cachedData.data);
        setTotalPages(cachedData.pages);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.data) {
        const responseData = { data: data.data, pages: data.pages };
        apiCache.set(cacheKey, responseData); // Cache the response
        setIcons(responseData.data);
        setTotalPages(responseData.pages);
      } else {
        setIcons([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError("Could not fetch icons. The API might be down.");
      console.error(err);
      setIcons([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch icons when the component mounts and when the active query or page changes.
  React.useEffect(() => {
    fetchIcons(activeQuery, currentPage);
  }, [activeQuery, currentPage, fetchIcons]);

  // --- Event Handlers ---
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Only trigger a new search if the term changes
    if (searchTerm.trim() !== activeQuery) {
      setActiveQuery(searchTerm.trim());
      setCurrentPage(1); // Reset to first page on new search
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  // --- Rendering ---
  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-800 dark:text-gray-300 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            SVG Icon Finder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-500">
            The ultimate icon library at your fingertips.
          </p>
        </header>

        <form
          onSubmit={handleSearchSubmit}
          className="relative mb-12 max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for 'arrow', 'user', 'settings'..."
            className="w-full p-4 pl-12 pr-12 bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 dark:backdrop-blur-sm transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>

        <main>
          {error && (
            <p className="text-center text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
              {error}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
              {Array.from({ length: 48 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : icons.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
              {icons.map((icon) => (
                <IconCard
                  key={`${icon.id}-${Math.random()}`}
                  icon={icon}
                  theme={theme}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-500 mt-16 text-lg">
              {activeQuery
                ? `No icons found for "${activeQuery}". Try another search.`
                : "No icons available."}
            </p>
          )}

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// --- Child Components ---

// Skeleton Card for Loading State
function SkeletonCard() {
  return (
    <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg aspect-square animate-pulse"></div>
  );
}

// Icon Card Component
interface IconCardProps {
  icon: Icon;
  theme: "light" | "dark";
}

function IconCard({ icon, theme }: IconCardProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  // Sanitize SVG to be theme-aware - smart color replacement
  const sanitizedSvg = React.useMemo(() => {
    const isDarkMode = theme === "dark";
    let svgText = icon.text;

    // Set standard width and height for consistency in the grid
    svgText = svgText.replace(/width="[^"]*"/, 'width="100%"');
    svgText = svgText.replace(/height="[^"]*"/, 'height="100%"');

    const targetColor = isDarkMode ? "#FFFFFF" : "#000000";
    const targetColorName = isDarkMode ? "white" : "black";

    // Smart color replacement - preserve icon structure
    if (isDarkMode) {
      // In dark mode: replace dark colors with white, keep light colors as white
      svgText = svgText.replace(/fill="[^"]*"/gi, (match) => {
        const color = match.toLowerCase();
        // Keep transparent/none fills as they are
        if (color.includes("none") || color.includes("transparent"))
          return match;
        return `fill="${targetColor}"`;
      });

      svgText = svgText.replace(/stroke="[^"]*"/gi, (match) => {
        const color = match.toLowerCase();
        // Keep transparent/none strokes as they are
        if (color.includes("none") || color.includes("transparent"))
          return match;
        return `stroke="${targetColor}"`;
      });
    } else {
      // In light mode: replace light colors with black, keep dark colors as black
      svgText = svgText.replace(/fill="[^"]*"/gi, (match) => {
        const color = match.toLowerCase();
        // Keep transparent/none fills as they are
        if (color.includes("none") || color.includes("transparent"))
          return match;
        return `fill="${targetColor}"`;
      });

      svgText = svgText.replace(/stroke="[^"]*"/gi, (match) => {
        const color = match.toLowerCase();
        // Keep transparent/none strokes as they are
        if (color.includes("none") || color.includes("transparent"))
          return match;
        return `stroke="${targetColor}"`;
      });
    }

    // Handle style attributes more carefully
    svgText = svgText.replace(/style="[^"]*"/gi, (match) => {
      let style = match;
      // Only replace fill if it's not none/transparent
      style = style.replace(/fill:\s*([^;]*)/gi, (fillMatch, fillValue) => {
        if (
          fillValue.toLowerCase().includes("none") ||
          fillValue.toLowerCase().includes("transparent")
        ) {
          return fillMatch;
        }
        return `fill:${targetColor}`;
      });
      // Only replace stroke if it's not none/transparent
      style = style.replace(
        /stroke:\s*([^;]*)/gi,
        (strokeMatch, strokeValue) => {
          if (
            strokeValue.toLowerCase().includes("none") ||
            strokeValue.toLowerCase().includes("transparent")
          ) {
            return strokeMatch;
          }
          return `stroke:${targetColor}`;
        }
      );
      return style;
    });

    // Replace hex colors but be more selective
    svgText = svgText.replace(/#[0-9a-fA-F]{6}/gi, () => {
      // Don't replace if it's in a comment or similar
      return targetColor;
    });
    svgText = svgText.replace(/#[0-9a-fA-F]{3}/gi, targetColor.substring(0, 4));

    // Replace color names but preserve none/transparent
    svgText = svgText.replace(
      /\b(black|red|blue|green|yellow|purple|orange|pink|brown|gray|grey|currentColor)\b/gi,
      targetColorName
    );
    svgText = svgText.replace(/\bwhite\b/gi, isDarkMode ? "white" : "black");

    // Handle currentColor and add default fill if needed
    svgText = svgText.replace(/currentColor/gi, targetColor);

    // Add default fill only if no fill is specified anywhere
    if (!svgText.includes("fill=") && !svgText.includes("fill:")) {
      svgText = svgText.replace("<svg", `<svg fill="${targetColor}"`);
    }

    return svgText;
  }, [icon.text, theme]);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(icon.text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = icon.text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className="relative bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-2 flex items-center justify-center aspect-square transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-gray-300 dark:hover:border-white/20 cursor-pointer group"
      title={icon.title}
    >
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
      />
      <button
        onClick={handleCopy}
        className="absolute top-1 right-1 p-1 rounded-full bg-white/50 dark:bg-black/30 text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-black/70 hover:text-black dark:hover:text-white focus:opacity-100 focus:outline-none backdrop-blur-sm transition-all duration-300"
        aria-label="Copy SVG"
      >
        {isCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="text-green-500 dark:text-green-400"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        )}
      </button>
      {isCopied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs bg-green-600 dark:bg-green-500 text-white rounded-md shadow-lg transition-all duration-300">
          Copied!
        </div>
      )}
    </div>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];
  const MAX_VISIBLE_PAGES = 5;

  let startPage, endPage;
  if (totalPages <= MAX_VISIBLE_PAGES) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrent = Math.floor(MAX_VISIBLE_PAGES / 2);
    const maxPagesAfterCurrent = Math.ceil(MAX_VISIBLE_PAGES / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrent) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGES;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const buttonClass =
    "px-4 py-2 rounded-md text-sm transition-colors duration-200";
  const inactiveClass =
    "bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10";
  const activeClass =
    "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-bold";
  const disabledClass = "opacity-50 cursor-not-allowed";

  return (
    <nav
      className="flex justify-center items-center space-x-2 mt-16"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonClass} ${inactiveClass} ${currentPage === 1 ? disabledClass : ""}`}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${buttonClass} ${inactiveClass}`}
          >
            1
          </button>
          {startPage > 2 && (
            <span className="text-gray-400 dark:text-gray-600">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${buttonClass} ${currentPage === page ? activeClass : inactiveClass}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400 dark:text-gray-600">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${buttonClass} ${inactiveClass}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonClass} ${inactiveClass} ${currentPage === totalPages ? disabledClass : ""}`}
      >
        Next
      </button>
    </nav>
  );
}
