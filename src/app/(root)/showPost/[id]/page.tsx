"use client"
import PostCard from "@/components/cards/PostCard";
import { useEffect, useState } from "react";



const showPost: React.FC<any> = ({ params }) => {
    const apiUrl = '/api/post';
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<any>({});
    const id = params.id;
    const getUserDetails = () => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
    };


    useEffect(() => {
        getUserDetails();
        fetchPostData(id);
    }, [id]);

    const fetchPostData = async (id: any) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/getPostById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.status === 200) {
                const res = await response.json();
                setPost(res.post);
            } else {
                throw new Error('Error fetching post data');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {loading ? <p className="text-center text-gray-500">Logging in...</p> :
                <>
                    <h1 className='head-text text-left'>Post</h1>

                    <section className='mt-9 flex flex-col gap-10'>
                        <div className="p-4 shadow-[0_35px_60px_-20px_rgba(0.3,0.2,0.2,0.2)]">
                            <PostCard
                                key={post.id}
                                id={post.id}
                                content={post.content}
                                title={post.title}
                                user={user}
                            />
                        </div>
                    </section>
                </>
            }
        </>
    );
}
export  default showPost;