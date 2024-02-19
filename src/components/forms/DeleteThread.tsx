"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  postId: number;
}

function DeleteThread({
  postId,
}: Props) {
  const router = useRouter();
  const apiUrl = '/api/post';
  console.log("postId  ", postId);

  const deletePost = async () => {
    try {
      const response = await fetch(`${apiUrl}/deletePost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postId)
      });

      if (response.status === 200) {
        console.log("delete successfully");
        router.push('/');
      } else {
        throw new Error('Error signing in');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };



  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={() => deletePost}
    />
  );
}

export default DeleteThread;
