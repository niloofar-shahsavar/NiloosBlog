const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About Niloo's Blog
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to our blog community! This is a space where ideas come to
              life, stories are shared, and knowledge is exchanged.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Whether you're interested in technology, health, education, or any
              of our many categories, you'll find thoughtful content and
              engaging discussions here.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Join our community by creating an account and sharing your own
              perspectives with readers around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
