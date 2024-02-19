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
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";


import { sidebarLinks } from "@/constants";
import { useEffect, useState } from "react";

function Bottombar() {
  const pathname = usePathname();
  const apiUrl = '/api/post';
  const router = useRouter();
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
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className='object-contain'
              />

              <p className='text-subtle-medium text-dark-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
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
                  <DropdownMenuRadioItem onClick={() => handleSidebarClick(title.id)} value={title.title}>{title.title}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}


      </div>
    </section>
  );
}

export default Bottombar;
