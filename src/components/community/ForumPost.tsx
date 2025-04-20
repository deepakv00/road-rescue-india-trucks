
import { motion } from "framer-motion";
import { MessageSquare, Heart, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ForumPost as ForumPostType } from "@/lib/community";
import { useState } from "react";

interface ForumPostProps {
  post: ForumPostType;
  onComment: () => void;
}

export const ForumPost = ({ post, onComment }: ForumPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start justify-between"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="flex items-center text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span className="text-sm">{formatDate(post.createdAt)}</span>
            </div>
          </motion.div>

          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-primary" 
              onClick={handleLike}
            >
              <Heart 
                size={14} 
                className={`mr-1 transition-colors ${isLiked ? 'fill-primary text-primary' : ''}`} 
              />
              <span>{likesCount} likes</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="hover:text-primary ml-2"
              onClick={onComment}
            >
              <MessageSquare size={14} className="mr-1" />
              <span>{post.comments.length} comments</span>
            </Button>
          </div>

          <p className="mt-4 text-gray-700">{post.content}</p>

          {post.tags.length > 0 && (
            <motion.div 
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {post.tags.map((tag, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="flex items-center hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}

          {post.comments.length > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Separator className="mb-4" />
              <h3 className="text-sm font-medium mb-2">Comments</h3>
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{comment.userName}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div 
            className="mt-4 pt-4 border-t flex justify-end"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              variant="outline" 
              size="sm"
              onClick={onComment}
              className="hover:bg-primary hover:text-white transition-colors"
            >
              <MessageSquare size={14} className="mr-1" />
              Comment
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
