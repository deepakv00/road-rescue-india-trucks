
export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: ForumComment[];
  tags: string[];
}

export interface ForumComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// Mock community posts
const mockPosts: ForumPost[] = [
  {
    id: "post-1",
    userId: "user-123",
    userName: "TruckDriver123",
    title: "Best garages on Mumbai-Pune highway?",
    content: "I regularly drive between Mumbai and Pune. Can experienced drivers recommend reliable garages on this route? Especially ones that service Tata trucks at reasonable prices.",
    createdAt: "2023-10-15T08:30:00Z",
    likes: 24,
    comments: [
      {
        id: "comment-1",
        userId: "user-456",
        userName: "HighwayHelper",
        content: "Try Highway Truck Services near the 45km marker. They have great service for Tata trucks and fair pricing.",
        createdAt: "2023-10-15T09:15:00Z"
      },
      {
        id: "comment-2",
        userId: "user-789",
        userName: "ExpressTrucker",
        content: "I've had good experiences with Truck Masters. They're open 24/7 and have skilled mechanics.",
        createdAt: "2023-10-15T10:20:00Z"
      }
    ],
    tags: ["mumbai-pune", "garage-recommendation", "tata-trucks"]
  },
  {
    id: "post-2",
    userId: "user-456",
    userName: "HighwayHelper",
    title: "Warning: Road construction on NH8",
    content: "Heavy construction ongoing on NH8 between Delhi and Jaipur. Expect delays of 1-2 hours. Alternative routes recommended for the next 2 weeks.",
    createdAt: "2023-10-16T14:45:00Z",
    likes: 56,
    comments: [
      {
        id: "comment-3",
        userId: "user-123",
        userName: "TruckDriver123",
        content: "Thanks for the heads up! I'll take the NH48 instead.",
        createdAt: "2023-10-16T15:10:00Z"
      }
    ],
    tags: ["road-alert", "nh8", "delhi-jaipur"]
  },
  {
    id: "post-3",
    userId: "user-789",
    userName: "ExpressTrucker",
    title: "Tips for maintaining truck brakes during monsoon",
    content: "I've been driving for 15 years and have learned that brake maintenance is crucial during monsoon season. Here are some tips to avoid brake failure on wet roads...",
    createdAt: "2023-10-17T11:20:00Z",
    likes: 89,
    comments: [],
    tags: ["maintenance-tips", "truck-brakes", "monsoon-driving"]
  }
];

// Get all community posts
export const getAllPosts = async (): Promise<ForumPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockPosts;
};

// Get post by ID
export const getPostById = async (id: string): Promise<ForumPost | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPosts.find(post => post.id === id);
};

// Create a new post
export const createPost = async (
  userId: string,
  userName: string,
  title: string,
  content: string,
  tags: string[] = []
): Promise<ForumPost> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newPost: ForumPost = {
    id: "post-" + Date.now(),
    userId,
    userName,
    title,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: [],
    tags
  };
  
  // Save to localStorage
  const posts = await getAllPosts();
  posts.unshift(newPost);
  localStorage.setItem('vehiclemate_forum', JSON.stringify(posts));
  
  return newPost;
};

// Add comment to post
export const addComment = async (
  postId: string,
  userId: string,
  userName: string,
  content: string
): Promise<ForumComment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newComment: ForumComment = {
    id: "comment-" + Date.now(),
    userId,
    userName,
    content,
    createdAt: new Date().toISOString()
  };
  
  const posts = await getAllPosts();
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex !== -1) {
    posts[postIndex].comments.push(newComment);
    localStorage.setItem('vehiclemate_forum', JSON.stringify(posts));
  }
  
  return newComment;
};
