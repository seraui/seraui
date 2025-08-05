import TextHighlighter from './text-highlighter';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center text-black dark:text-white p-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
          Welcome to <TextHighlighter direction="rtl">Sera UI</TextHighlighter>
        </h1>

        <p className="mt-6 text-lg md:text-xl leading-relaxed">
          <TextHighlighter>Sera UI</TextHighlighter> is an open-source React component library
          designed for building{' '}
          <TextHighlighter>modern, responsive, and customizable</TextHighlighter> user interfaces
          with ease. It leverages <TextHighlighter>Tailwind CSS</TextHighlighter> for styling and
          focuses on simplicity, accessibility, and developer experience.
        </p>

        <p className="mt-4 text-lg md:text-xl leading-relaxed">
          Sera UI offers a collection of <TextHighlighter>pre-built components</TextHighlighter>{' '}
          like buttons, cards, modals, inputs, and advanced UI patterns, enabling{' '}
          <TextHighlighter>faster development</TextHighlighter> without sacrificing design quality.
          Ideal for both personal projects and{' '}
          <TextHighlighter>production-grade apps</TextHighlighter>, it emphasizes clean design and
          modular architecture.
        </p>

        <p className="mt-4 text-lg md:text-xl leading-relaxed">
          Developers can{' '}
          <TextHighlighter highlightColor="linear-gradient(45deg, #3b82f6, #8b5cf6)">
            Gradient highlight
          </TextHighlighter>{' '}
          easily to match brand requirements. With{' '}
          <TextHighlighter>active community support</TextHighlighter> and detailed documentation,
          Sera UI aims to{' '}
          <TextHighlighter color="blue">
            streamline frontend development efficiently
          </TextHighlighter>
          .
        </p>
      </div>
    </div>
  );
}
