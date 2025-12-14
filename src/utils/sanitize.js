import DOMPurify from 'dompurify';

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';

  // Trim whitespace
  const trimmed = input.trim();

  // Sanitize HTML and scripts
  const sanitized = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: [], // No HTML tags allowed, plain text only
    ALLOWED_ATTR: [],
  });

  return sanitized;
};

/**
 * Validates post data
 * @param {object} post - Post object with title and content
 * @returns {object} - { isValid: boolean, errors: array }
 */
export const validatePost = (post) => {
  const errors = [];

  const title = sanitizeInput(post.title);
  const content = sanitizeInput(post.content);

  if (!title || title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (!content || content.length < 10) {
    errors.push('Content must be at least 10 characters long');
  }

  if (content.length > 5000) {
    errors.push('Content must be less than 5000 characters');
  }

  if (!post.category) {
    errors.push('Category is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      title,
      content,
      category: post.category,
    },
  };
};

/**
 * Validates comment data
 * @param {string} comment - Comment text
 * @returns {object} - { isValid: boolean, errors: array, sanitizedText: string }
 */
export const validateComment = (comment) => {
  const errors = [];
  const sanitizedText = sanitizeInput(comment);

  if (!sanitizedText || sanitizedText.length < 1) {
    errors.push('Comment cannot be empty');
  }

  if (sanitizedText.length > 1000) {
    errors.push('Comment must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedText,
  };
};
