"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface Props {
  id: number;
  title: string;
  content: string;
  user: {
    username: string;
    image: string;
    id: string;
  };
}

function ThreadCard({
  id,
  title,
  content,
}: Props) {
  const router = useRouter();
  const apiUrl = '/api/post';
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = async () => {
    try {
      setLoading(true);
      console.log("this is delete id ", id);

      const response = await fetch(`${apiUrl}/deletePost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      if (response.status === 200) {
        console.log("delete successfully");
        window.location.reload();
      } else {
        throw new Error('Error signing in');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }finally{
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? <p className="text-center text-gray-500">Logging in...</p> :
        <>
          <article
            className={`flex w-full flex-col rounded-xl`}
          >
            <div className='flex items-start justify-between'>
              <div className='flex w-full flex-1 flex-row gap-4'>
                <div className='flex flex-col items-center'>
                  <div className='relative h-11 w-11'>
                    <h1>🙋‍♂️</h1>
                  </div>

                  <div className='thread-card_bar' />
                </div>

                <div className='flex w-full flex-col'>
                  <div className='w-fit'>
                    <h4 className='text-base-semibold text-dark-1'>
                      {title}
                    </h4>
                  </div>

                  <p dangerouslySetInnerHTML={{ __html: content }} className='mt-2 text-small-regular text-dark-2' />
                </div>
              </div>

              <Image
                src='/assets/edit.svg'
                alt='logout'
                className="mr-2 cursor-pointer"
                width={18}
                height={18}
                onClick={() => router.push(`/editPost/${id}`)}
              />

              <Image
                src='/assets/delete.svg'
                alt='delte'
                width={18}
                height={18}
                className='cursor-pointer object-contain'
                onClick={() => deletePost()}
              />


            </div>
          </article>
        </>
      }
    </>
  );
}

export default ThreadCard;
