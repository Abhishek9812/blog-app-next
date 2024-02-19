"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { sidebarLinks } from "@/constants";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const apiUrl = '/api/post';
  const router = useRouter();
  const pathname = usePathname();
  const [posts, setPosts] = useState<any>([]);


  useEffect(() => {
    getAllPosts();
  }, [])

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/getPosts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        let resData: any = await response.json();
        const postArray = resData.posts.reduce((result: any, post: any) => {
          const { category, title, id } = post;

          if (!result[category]) {
            result[category] = [];
          }

          result[category].push({title, id});

          return result;
        }, {});

        console.log("postArray  ", postArray);

        setPosts(postArray);
      } else {
        throw new Error('Error signing in');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };


  const handleClick = (path: any) => {
    router.push(path);
  }


  const handleSidebarClick = (id: any) => {
    console.log("id mil gyi ", id);
    
    router.push(`${window.location.origin}/showPost/${id}`);
  }



  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              onClick={() => handleClick(link.route)}
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-dark-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}


        {Object.entries(posts).map(([category, titles]: [any, any]) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{category}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-dark-2 text-light-2">
              <DropdownMenuLabel>Title </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup className="bg-dark-2 text-light-2" value={"title"}>
                {titles.map((title: any, index: any) => (
                  <DropdownMenuRadioItem onClick={()=>handleSidebarClick(title.id)} value={title.title}>{title.title}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
