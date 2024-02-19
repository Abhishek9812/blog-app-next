"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Styles for Quill editor
import { useRouter } from 'next/navigation';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface PostFormState {
    title: string;
    category: string;
    content: string;
}

const EditPost: React.FC<any> = ({ params }) => {
    const router = useRouter();
    const id = params.id;

    const [formState, setFormState] = useState<PostFormState>({
        title: '',
        category: '',
        content: '',
    });
    const apiUrl = '/api/post';
    const [user, setUser] = useState<any>();

    const getUserDetails = () => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
    };

    useEffect(() => {
        getUserDetails();
        // Fetch post data based on postId and populate the form
        fetchPostData(id);
    }, [id]);

    const fetchPostData = async (id: any) => {
        try {
            const response = await fetch(`${apiUrl}/getPostById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.status === 200) {
                const res = await response.json();

                setFormState({
                    title: res.post.title,
                    category: res.post.category,
                    content: res.post.content,
                });
            } else {
                throw new Error('Error fetching post data');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

    const handleSave = async () => {
        try {
            let data = {
                title: formState.title,
                category: formState.category,
                content: formState.content,
                userId: user?.id,
                id
            };

            if (!(user || user.id)) return;

            const response = await fetch(`${apiUrl}/updatePost`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                router.push('/');
            } else {
                throw new Error('Error updating post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleCancel = () => {
        router.push('/') // Implement your cancel logic here
    };

    return (
        <>
            <h1 className='head-text text-left'>Edit Post</h1>

            <section className='mt-9 flex flex-col gap-10'>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Title:</label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={formState.title}
                            required
                            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Category:</label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={formState.category}
                            required
                            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Content:</label>
                        <QuillEditor
                            value={formState.content}
                            onChange={(value) => setFormState({ ...formState, content: value })}
                        />
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-cyan-500 text-dark-2 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            type="button"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditPost;
