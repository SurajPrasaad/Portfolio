import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Facebook, Twitter, Linkedin, ArrowLeft } from 'react-feather';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import api from '../api/api';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blog/${id}`);
        setPost(response.data);
        setLikeCount(response.data.likes || 0);
        
        // Fetch related posts
        if (response.data.tags && response.data.tags.length > 0) {
          try {
            const relatedResponse = await api.get(
              `/blog/related?tags=${response.data.tags.join(',')}&limit=3&exclude=${response.data._id}`
            );
            setRelatedPosts(relatedResponse.data);
          } catch (err) {
            console.error('Error fetching related posts:', err);
          }
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await api.post(`/blog/${id}/like`);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    const text = post?.excerpt || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {error || 'Post not found'}
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(post.publishedAt);
  const formattedDate = format(publishedDate, 'MMMM d, yyyy');
  const readingTime = post.readingTime || Math.ceil((post.content || '').split(/\s+/).length / 200);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Blog
      </button>

      <article className="bg-white shadow overflow-hidden rounded-lg">
        {post.featuredImage && (
          <div className="h-64 md:h-96 bg-gray-200">
            <img
              className="w-full h-full object-cover"
              src={post.featuredImage}
              alt={post.title}
            />
          </div>
        )}

        <div className="px-6 py-8 sm:px-10">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <time dateTime={publishedDate.toISOString()}>
              {formattedDate}
            </time>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
            {post.updatedAt && new Date(post.updatedAt) > publishedDate && (
              <>
                <span className="mx-2">•</span>
                <span className="text-indigo-600">
                  Updated on {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-xl text-gray-500 mb-8">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center mb-8">
            <div className="flex-shrink-0">
              {post.author?.avatar ? (
                <img
                  className="h-12 w-12 rounded-full"
                  src={post.author.avatar}
                  alt={post.author.name}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 text-xl font-medium">
                    {(post.author?.name || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author?.name || 'Anonymous'}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <span>{post.author?.role || 'Writer'}</span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none prose-indigo prose-lg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                img: ({ node, ...props }) => (
                  <div className="my-6 rounded-lg overflow-hidden">
                    <img {...props} className="mx-auto" />
                  </div>
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="bg-gray-800 rounded-lg overflow-hidden my-6">
                      <div className="px-4 py-2 text-xs text-gray-300 bg-gray-700 flex justify-between items-center">
                        <span>{match[1]}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                          }}
                          className="text-gray-400 hover:text-white"
                          title="Copy to clipboard"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="m-0 p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
                disabled={isLiked}
              >
                <svg
                  className="h-6 w-6"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span>{likeCount}</span>
              </button>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-4">
              <button
                onClick={() => shareOnSocial('twitter')}
                className="text-gray-400 hover:text-blue-400"
                title="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                onClick={() => shareOnSocial('facebook')}
                className="text-gray-400 hover:text-blue-600"
                title="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => shareOnSocial('linkedin')}
                className="text-gray-400 hover:text-blue-700"
                title="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost._id}
                to={`/blog/${relatedPost.slug || relatedPost._id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
                  {relatedPost.featuredImage && (
                    <div className="h-40 bg-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-4 text-sm text-indigo-600 font-medium">
                      Read more →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
