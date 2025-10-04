import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageCircle, Flag, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Review {
  id: string;
  user: string;
  rating: number;
  review: string;
  monastery_id: string;
  date: string;
  helpful: number;
}

interface Post {
  id: string;
  user: string;
  title: string;
  content: string;
  location: string;
  likes: number;
  comments: { id: string; user: string; comment: string; date: string }[];
  date: string;
  is_reported: boolean;
  hidden: boolean;
  category: string;
}

interface Feedback {
  id: string;
  name: string;
  message: string;
  category: string;
  date: string;
}

const Community = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));

    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch("/data/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
      />
    ));
  };

  const filteredPosts = posts
    .filter((post) => !post.hidden)
    .filter((post) => filter === "all" || post.category === filter)
    .sort((a, b) => {
      if (sortBy === "popular") return b.likes - a.likes;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    toast.success("Post liked!");
  };

  const handleReport = (postId: string) => {
    toast.success("Post reported. Our team will review it.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-monastery text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gold" />
          <h1 className="text-4xl md:text-5xl font-bold monastery-heading mb-4 text-gradient-gold">
            Community Portal
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Share experiences, connect with fellow travelers, and contribute to our growing community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts">Visitor Posts</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            {/* Visitor Posts */}
            <TabsContent value="posts" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Festivals">Festivals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Trending Highlights */}
              {sortBy === "popular" && filteredPosts.length > 0 && (
                <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-gold">🔥 Trending Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">{filteredPosts[0].title}</h3>
                    <p className="text-muted-foreground mb-3">{filteredPosts[0].content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary">{filteredPosts[0].category}</Badge>
                      <span className="text-muted-foreground">{filteredPosts[0].location}</span>
                      <span className="text-gold">{filteredPosts[0].likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts Grid */}
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1">{post.title}</CardTitle>
                          <CardDescription>
                            by {post.user} • {new Date(post.date).toLocaleDateString()} • {post.location}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground">{post.content}</p>
                      
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReport(post.id)}
                          className="gap-2 ml-auto"
                        >
                          <Flag className="h-4 w-4" />
                          Report
                        </Button>
                      </div>

                      {/* Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3 pt-4 border-t">
                          <h4 className="font-semibold text-sm">Comments</h4>
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-sm font-medium">{comment.user}</p>
                              <p className="text-sm text-muted-foreground mt-1">{comment.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>Share your monastery experience with the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 cursor-pointer hover:fill-gold hover:text-gold" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Monastery</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select monastery" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rumtek">Rumtek Monastery</SelectItem>
                        <SelectItem value="pemayangtse">Pemayangtse Monastery</SelectItem>
                        <SelectItem value="tashiding">Tashiding Monastery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea placeholder="Share your experience..." rows={4} />
                  <Button className="w-full">Submit Review</Button>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{review.user}</CardTitle>
                          <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="flex gap-1">{renderStars(review.rating)}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-foreground">{review.review}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Feedback */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Feedback</CardTitle>
                  <CardDescription>Help us improve your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="appreciation">Appreciation</SelectItem>
                      <SelectItem value="issue">Report Issue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Your feedback..." rows={4} />
                  <Button className="w-full">Send Feedback</Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <h3 className="text-xl font-semibold">Recent Feedback</h3>
                {feedback.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium">{item.name}</p>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="text-muted-foreground">{item.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Community;
