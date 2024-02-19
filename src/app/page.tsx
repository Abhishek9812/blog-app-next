"use client"
import PostCard from "@/components/cards/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = '/api/post';
  const [user, setUser] = useState<any>();
  const [result, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserData = async () => {
    const userData = await JSON.parse(localStorage.getItem('user') || '{}');
    console.log("userData ", userData);

    setUser(userData);
  }

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/getPosts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        let resData: any = await response.json();
        console.log(resData);
        setResults(resData);
      } else {
        throw new Error('Error signing in');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getUserData();
    getAllPosts();
  }, [])
  return (
    <>

      {loading ? <p className="text-center text-gray-500">Logging in...</p> :
        <>
          <h1 className='head-text text-left'>Home</h1>

          <section className='mt-9 flex flex-col gap-10'>
            {result && result.length === 0 ? (
              <p className='no-result'>No Posts found</p>
            ) : (
              <>
                {result && result.posts.map((post: any) => (
                  <div className="p-4 shadow-[0_35px_60px_-20px_rgba(0.3,0.2,0.2,0.2)]">
                    <PostCard
                      key={post._id}
                      id={post.id}
                      content={post.content}
                      title={post.title}
                      user={user}
                    />
                  </div>
                ))}
              </>
            )}
          </section>
        </>
      }
    </>
  );
}
