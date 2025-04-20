
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { getAllPosts, ForumPost, createPost } from "@/lib/community";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, MessageSquare, Heart, Calendar, Tag, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const Community = () => {
  const { user, isOffline } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tagsInput: ""
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load community posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!user) {
      toast.error("You need to login to create a post");
      return;
    }
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    const tags = newPost.tagsInput
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
    
    try {
      const createdPost = await createPost(
        user.id,
        user.name,
        newPost.title.trim(),
        newPost.content.trim(),
        tags
      );
      
      setPosts([createdPost, ...posts]);
      setNewPost({ title: "", content: "", tagsInput: "" });
      setDialogOpen(false);
      toast.success("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-gray-600 mt-1">
            Connect with fellow drivers and share experiences
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <MessageSquare size={16} className="mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>
                Share tips, road alerts, or ask for help from the community
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="content"
                  placeholder="Write your post content..."
                  rows={5}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  Tags (comma separated)
                </label>
                <Input
                  id="tags"
                  placeholder="e.g., truck, maintenance, delhi-mumbai"
                  value={newPost.tagsInput}
                  onChange={(e) => setNewPost({ ...newPost, tagsInput: e.target.value })}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>Create Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isOffline && (
        <div className="bg-warning/20 border border-warning rounded-lg p-4 mb-6 flex items-center">
          <AlertTriangle size={20} className="text-warning mr-2" />
          <p>You're offline. You can view existing posts but cannot create new posts or comments.</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={30} className="animate-spin text-trust" />
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-sm">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{post.userName}</span>
                  </div>
                  
                  <div className="flex items-center ml-4">
                    <Heart size={14} className="mr-1" />
                    <span>{post.likes} likes</span>
                  </div>
                  
                  <div className="flex items-center ml-4">
                    <MessageSquare size={14} className="mr-1" />
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-700">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {post.comments.length > 0 && (
                  <div className="mt-6">
                    <Separator className="mb-4" />
                    <h3 className="text-sm font-medium mb-2">Comments</h3>
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{comment.userName}</span>
                            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <Button variant="outline" size="sm">
                    <MessageSquare size={14} className="mr-1" />
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No posts yet. Be the first to create a post!</p>
          <Button onClick={() => setDialogOpen(true)}>Create New Post</Button>
        </div>
      )}
    </div>
  );
};

export default Community;
